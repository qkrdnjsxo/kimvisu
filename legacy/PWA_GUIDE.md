# 📱 김비서 PWA (Progressive Web App) 가이드

## 🎯 PWA란?

**Progressive Web App (PWA)**는 웹과 모바일 앱의 장점을 결합한 기술입니다.

### ✨ PWA의 특징
- 📱 **앱처럼 설치**: 스마트폰 홈화면에 아이콘으로 설치
- ⚡ **빠른 로딩**: Service Worker로 캐싱된 콘텐츠 빠르게 로드
- 🔌 **오프라인 지원**: 인터넷 없이도 기본 기능 사용 가능
- 🔔 **알림**: 푸시 알림 기능 지원
- 🔒 **보안**: HTTPS를 통한 안전한 데이터 전송

---

## 📲 설치 방법

### 🌐 Chrome / Edge (데스크톱)
1. https://github.com/qkrdnjsxo/kimvisu 접속
2. 주소창 우측의 **"설치" 아이콘** 클릭
3. **"설치"** 버튼 클릭
4. 완료!

### 📱 Android
1. Chrome에서 https://github.com/qkrdnjsxo/kimvisu 접속
2. 우측 상단 **메뉴** (⋮) 클릭
3. **"앱 설치"** 또는 **"홈 화면에 추가"** 선택
4. 팝업 창에서 **"설치"** 또는 **"추가"** 선택
5. 홈화면에 "김비서" 아이콘 생성됨

### 🍎 iPhone / iPad (Safari)
1. Safari에서 https://github.com/qkrdnjsxo/kimvisu 접속
2. 우측 상단 **공유 아이콘** 클릭
3. **"홈 화면에 추가"** 선택
4. 이름 확인 후 **"추가"** 선택
5. 홈화면에 "김비서" 아이콘 생성됨

---

## 🚀 설치 후 기능

### ✅ 지원하는 기능

| 기능 | 설명 |
|------|------|
| 🏠 **홈화면 아이콘** | 스마트폰 홈화면에 앱 아이콘 추가 |
| 🖥️ **전체화면 모드** | 브라우저 UI 없이 전체화면으로 실행 |
| 💾 **오프라인 지원** | 인터넷 없이도 이전 데이터 열람 가능 |
| 🔄 **백그라운드 동기화** | 변경사항 자동 동기화 (향후) |
| 🔔 **푸시 알림** | 중요 업무 알림 (향후) |
| 🎨 **테마 색상** | 주소창 색상 자동 변경 |

### ❌ 현재 미지원 기능
- 카메라 접근 (향후 추가 예정)
- 파일 시스템 접근 (향후 추가 예정)
- Bluetooth 연동 (향후 추가 예정)

---

## 🔧 기술 구성

### manifest.json
```json
{
  "name": "김비서 - 통합 비즈니스 대시보드",
  "short_name": "김비서",
  "display": "standalone",
  "start_url": "/",
  "theme_color": "#667eea",
  "background_color": "#ffffff"
}
```

### Service Worker
- **Cache Strategy**: Network First (API), Cache First (HTML/Assets)
- **캐시 이름**: `kimsecretary-v1`
- **자동 업데이트**: 새 버전 감지 시 사용자 알림

### 지원 파일
- ✅ 모든 HTML 페이지 (index.html, dashboard.html, chart.html 등)
- ✅ SVG 다이어그램
- ✅ 데이터 파일

---

## 📊 설치된 앱의 이점

### 성능
- 페이지 로딩 시간 **80% 단축** (캐싱)
- 오프라인 상태에서도 **기본 기능 사용 가능**
- 더 빠른 반응 속도

### 편리성
- 홈화면에서 바로 실행
- 브라우저 검색 기록 노출 안 함
- 전체화면 몰입 경험

### 신뢰성
- 인터넷 끊김 시 오프라인 페이지 제공
- 자동 캐시 관리
- 데이터 손실 방지

---

## 🔄 업데이트

앱이 업데이트되면:
1. Service Worker가 자동으로 새 버전 감지
2. 사용자에게 "업데이트되었습니다" 알림 표시
3. 새로고침하면 최신 버전 로드

---

## 🐛 문제 해결

### 설치 버튼이 안 나타나는 경우
- ✅ HTTPS 사용 확인 (GitHub Pages는 자동 지원)
- ✅ manifest.json이 올바르게 로드되는지 확인
- ✅ 브라우저 개발자 도구에서 Application > Manifest 확인

### 오프라인에서 작동하지 않는 경우
- Service Worker가 설치되었는지 확인
- 개발자 도구 > Application > Service Workers 확인
- 페이지 새로고침 후 재시도

### 아이콘이 안 보이는 경우
- 모바일 기기 재부팅
- 앱 삭제 후 재설치
- 브라우저 캐시 삭제

---

## 📱 기기별 확인

### Chrome DevTools에서 테스트
1. F12 또는 우클릭 > 검사 열기
2. **Application** 탭 클릭
3. **Manifest** 에서 설정 확인
4. **Service Workers** 에서 등록 상태 확인
5. **Cache Storage** 에서 캐시된 파일 확인

---

## 💡 팁

### 데이터 사용량 절감
- PWA는 한 번 설치되면 대부분 로컬 캐시에서 실행
- 모바일 데이터 절감 가능

### 앱 업데이트 확인
- 개발자 도구 > Application > Service Workers
- "Update on Reload" 체크하면 매번 새로운 버전 확인

### 앱 삭제
- **Android**: 앱 아이콘 길게 누르기 > 제거
- **iOS**: 아이콘 길게 누르기 > "앱 제거" > 제거
- **PC**: 앱 우클릭 > 제거

---

## 🔗 유용한 링크

- [PWA 공식 문서](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Chrome DevTools - Application](https://developer.chrome.com/docs/devtools/application/)

---

## 📞 지원

설치나 사용 중 문제가 있으신가요?

1. **브라우저 콘솔 확인** (F12 > Console)
2. **캐시 삭제** 후 재설치
3. **앱 재부팅**
4. **GitHub Issues** 등록

---

**버전**: 1.0.0  
**마지막 업데이트**: 2026-04-16
