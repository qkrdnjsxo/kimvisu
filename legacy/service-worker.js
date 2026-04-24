const CACHE_NAME = 'kimsecretary-v1';
const RUNTIME_CACHE = 'kimsecretary-runtime';

// 캐시할 파일 목록
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/chart.html',
  '/meeting-result.html',
  '/process.html',
  '/report.html',
  '/spreadsheet-report.html',
  '/기관별프로세스.html',
  '/diagram.svg',
  '/manifest.json'
];

// 설치 이벤트
self.addEventListener('install', (event) => {
  console.log('Service Worker 설치 중...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('캐시에 파일 추가 중...');
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        // 일부 파일이 없을 수 있으므로 에러를 무시하고 계속 진행
        console.log('일부 파일 캐싱 건너뜀');
      });
    })
  );
  self.skipWaiting();
});

// 활성화 이벤트
self.addEventListener('activate', (event) => {
  console.log('Service Worker 활성화 중...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('이전 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch 이벤트 - Network First 전략
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // GET 요청만 캐싱
  if (request.method !== 'GET') {
    return;
  }

  // 네비게이션 요청은 Cache First
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(request).then((response) => {
          // 응답이 유효한지 확인
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // 응답을 복사하여 캐시에 저장
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        }).catch(() => {
          // 네트워크 실패 시 캐시된 페이지 반환
          return caches.match('/index.html').then((response) => {
            return response || new Response('오프라인입니다. 인터넷 연결을 확인해주세요.', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
        });
      })
    );
    return;
  }

  // 그 외 요청은 Network First
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // 성공적인 응답을 캐시에 저장
        const responseToCache = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 찾기
        return caches.match(request).then((response) => {
          if (response) {
            return response;
          }

          // 이미지 요청인 경우 기본 이미지 반환
          if (request.destination === 'image') {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#f0f0f0" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dominant-baseline="middle" fill="#999">No image</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }

          // 기타 요청인 경우 오프라인 메시지
          return new Response('오프라인입니다. 인터넷 연결을 확인해주세요.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// 백그라운드 동기 (선택사항)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // 여기에 동기화 로직 추가 가능
      Promise.resolve()
    );
  }
});

// 메시지 처리
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
