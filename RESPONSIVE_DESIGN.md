# 📱 반응형 디자인 가이드

## 🎯 개요

김비서 대시보드는 모든 기기에 최적화된 **완벽한 반응형 디자인**을 제공합니다.

- 💻 **PC/데스크톱**
- 📱 **태블릿**
- 📱 **모바일 (큰 화면)**
- 📱 **모바일 (작은 화면)**

---

## 📊 반응형 브레이크포인트

| 기기 | 화면 크기 | 특징 |
|------|---------|------|
| 📱 **소형 모바일** | 320px ~ 480px | 햄버거 메뉴, 1열 레이아웃 |
| 📱 **모바일** | 481px ~ 768px | 햄버거 메뉴, 터치 최적화 |
| 📱 **태블릿** | 769px ~ 1024px | 정상 메뉴, 1열 레이아웃 |
| 💻 **PC** | 1025px 이상 | 정상 메뉴, 2열 레이아웃 |

---

## 📐 각 기기별 특징

### 📱 **소형 모바일 (320px ~ 480px)**

```
특징:
✅ 고정 네비게이션 메뉴 (햄버거 ☰)
✅ 전체 화면 메뉴 오버레이
✅ 1열 그리드 레이아웃
✅ 최소화된 padding/margin
✅ 작은 폰트 크기 (10px ~ 14px)
✅ 최적화된 버튼 크기 (터치 친화적)

네비게이션:
- 고정 헤더에 ☰ 버튼 표시
- 클릭 시 전체 화면 메뉴 오픈
- 메뉴 외부 클릭 시 자동 닫기

레이아웃:
- 모든 카드 100% 너비
- 통계 카드 2열 (작은 크기)
- 최소 간격으로 공간 활용
```

### 📱 **모바일 (481px ~ 768px)**

```
특징:
✅ 햄버거 메뉴
✅ 드롭다운 메뉴 스타일
✅ 1열 그리드 레이아웃
✅ 정상 padding/margin
✅ 보통 폰트 크기 (11px ~ 14px)
✅ 터치 친화적 UI

네비게이션:
- 네비게이션 바 아래 드롭다운
- ☰ 클릭으로 메뉴 토글
- 메뉴 아이템 클릭 시 자동 닫기

레이아웃:
- 모든 카드 100% 너비
- 통계 카드 2열
- 일정 테이블 스크롤 가능
- 작업 목록 최대 높이 300px
```

### 📱 **태블릿 (769px ~ 1024px)**

```
특징:
✅ 정상 네비게이션 바
✅ 1열 그리드 레이아웃
✅ 정상 padding/margin
✅ 중간 폰트 크기 (12px ~ 14px)

네비게이션:
- 네비게이션 바 여러 줄 가능
- 일반적인 마우스 호버

레이아웃:
- 대시보드 1열
- 통계 카드 2열
- 최적화된 간격
- 스크롤 가능한 테이블
```

### 💻 **PC (1025px 이상)**

```
특징:
✅ 정상 네비게이션 바
✅ 2열 그리드 레이아웃
✅ 최대 너비 1400px
✅ 일반 폰트 크기 (14px)

네비게이션:
- 완전한 네비게이션 바
- 마우스 호버 효과

레이아웃:
- 대시보드 2열
- 통계 카드 2열
- 최적화된 간격 (24px)
- 쾌적한 읽기 경험
```

---

## 🎨 반응형 CSS 전략

### **브레이크포인트**
```css
/* PC 이상 */
@media (min-width: 1025px) { }

/* 태블릿 */
@media (min-width: 769px) and (max-width: 1024px) { }

/* 모바일 */
@media (min-width: 481px) and (max-width: 768px) { }

/* 소형 모바일 */
@media (max-width: 480px) { }
```

### **CSS Grid 반응형**
```css
/* PC: 2열 */
.dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
}

/* 태블릿/모바일: 1열 */
@media (max-width: 1024px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}
```

### **Flexbox 네비게이션**
```css
/* PC: 가로 정렬 */
.navbar {
    display: flex;
    flex-wrap: wrap;
}

/* 모바일: 세로 정렬 */
.navbar.mobile-open {
    flex-direction: column;
    position: fixed;
    top: 60px;
}
```

---

## 📱 모바일 네비게이션

### **HTML**
```html
<button class="nav-toggle" id="navToggle">☰</button>
<nav class="navbar" id="navbar">
    <a href="..." class="nav-item">📊 대시보드</a>
    ...
</nav>
```

### **JavaScript**
```javascript
const navToggle = document.getElementById('navToggle');
const navbar = document.getElementById('navbar');

navToggle.addEventListener('click', () => {
    navbar.classList.toggle('mobile-open');
    navToggle.textContent = navbar.classList.contains('mobile-open') ? '✕' : '☰';
});

// 외부 클릭 시 메뉴 닫기
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && !e.target.closest('.nav-toggle')) {
        navbar.classList.remove('mobile-open');
        navToggle.textContent = '☰';
    }
});

// 리사이즈 시 메뉴 상태 리셋
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navbar.classList.remove('mobile-open');
        navToggle.textContent = '☰';
    }
});
```

---

## 📏 반응형 기준값

### **Padding/Margin**
| 기기 | 값 |
|------|-----|
| PC | 30px |
| 태블릿 | 20px |
| 모바일 | 16px |
| 소형 모바일 | 12px |

### **폰트 크기**
| 요소 | PC | 태블릿 | 모바일 | 소형 모바일 |
|------|-----|---------|---------|-----------|
| h1 | 28px | 24px | 20px | 18px |
| h2 | 18px | 16px | 16px | 15px |
| 본문 | 14px | 13px | 13px | 12px |
| 작은 텍스트 | 12px | 11px | 10px | 9px |

### **Grid Gap**
| 기기 | 값 |
|------|-----|
| PC | 24px |
| 태블릿 | 20px |
| 모바일 | 16px |
| 소형 모바일 | 12px |

---

## ✅ 검증 체크리스트

### **PC**
- [ ] 2열 대시보드 표시
- [ ] 정상 네비게이션 바
- [ ] 최대 너비 1400px 유지
- [ ] 마우스 호버 효과

### **태블릿**
- [ ] 1열 대시보드
- [ ] 정상 네비게이션 바
- [ ] 적절한 패딩
- [ ] 통계 카드 2열

### **모바일**
- [ ] 햄버거 메뉴 표시
- [ ] 드롭다운 메뉴 작동
- [ ] 1열 레이아웃
- [ ] 터치 버튼 크기 최적화
- [ ] 외부 클릭 메뉴 닫기

### **소형 모바일**
- [ ] 전체 화면 메뉴
- [ ] 최소화된 간격
- [ ] 읽기 가능한 텍스트
- [ ] 스크롤 가능한 콘텐츠

---

## 🔍 테스트 방법

### **Chrome DevTools**
1. F12 개발자 도구 열기
2. **Ctrl + Shift + M** (또는 장치 아이콘)
3. 좌측 상단 드롭다운에서 기기 선택:
   - iPhone SE (375x667)
   - iPhone 12 Pro (390x844)
   - iPad (768x1024)
   - Desktop (1280x800)

### **실제 기기 테스트**
1. 모바일: https://github.com/qkrdnjsxo/kimvisu 접속
2. 브라우저 크기 조정하며 테스트
3. 터치 제스처 테스트 (실제 모바일)

### **무한 스크롤 테스트**
- [ ] PC에서 스크롤 가능
- [ ] 태블릿에서 스크롤 가능
- [ ] 모바일에서 스크롤 가능

---

## 🎯 반응형 최적화 팁

### **1. 뷰포트 메타 태그**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### **2. 터치 친화적 버튼**
```css
/* 최소 44x44px */
.nav-toggle {
    width: 44px;
    height: 44px;
    padding: 8px;
}
```

### **3. 유연한 그리드**
```css
.dashboard-grid {
    display: grid;
    gap: clamp(12px, 5vw, 24px);
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### **4. 이미지 반응형**
```css
img {
    max-width: 100%;
    height: auto;
    display: block;
}
```

---

## 📊 성능 지표

### **Lighthouse 점수 목표**
- 성능: 90+
- 접근성: 95+
- 모범 사례: 90+
- SEO: 100

### **응답 시간**
- 페이지 로드: < 3초
- 상호작용: < 100ms
- 네비게이션 전환: < 500ms

---

## 🚀 향후 개선 사항

- [ ] CSS Grid의 `auto-fit` 활용
- [ ] 동적 레이아웃 (orientation 변경)
- [ ] 터치 제스처 지원
- [ ] 다크 모드 반응형 최적화
- [ ] RTL (오른쪽에서 왼쪽) 언어 지원

---

**마지막 업데이트**: 2026-04-16  
**버전**: 1.0.0
