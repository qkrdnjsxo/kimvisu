# 🎯 김비서 대시보드 (Next.js 버전)

전사 매출, 프로젝트, 일정, 회의를 한곳에서 관리하는 통합 비즈니스 대시보드

**버전**: 0.1.0  
**상태**: 🚧 개발 중

---

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 3. 프로덕션 빌드
```bash
npm run build
npm start
```

---

## 📁 프로젝트 구조

```
kim-secretary-dashboard/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 메인 대시보드
│   └── globals.css              # 전역 스타일
│
├── components/                  # React 컴포넌트
│   ├── sections/                # 섹션 컴포넌트
│   ├── tasks/                   # 태스크 컴포넌트
│   └── schedule/                # 일정 컴포넌트
│
├── types/                       # TypeScript 타입 정의
├── data/                        # 데이터 파일
├── utils/                       # 유틸리티 함수
├── hooks/                       # 커스텀 훅
│
├── tailwind.config.ts           # Tailwind CSS 설정
├── tsconfig.json                # TypeScript 설정
├── next.config.js               # Next.js 설정
└── package.json                 # 의존성
```

---

## 🛠 사용 기술

- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 CSS
- **React 18** - UI 라이브러리

---

## ✨ 주요 기능

- 📊 **매출 대시보드** - 실시간 매출 현황
- 📋 **업무 관리** - 우선순위별 할 일 목록
- 📅 **일정 조회** - 주간 일정 관리
- 📈 **프로젝트 추적** - 진행률 시각화
- 🌓 **라이트/다크 모드** - 테마 전환
- 📱 **반응형 디자인** - 모든 기기 지원

---

## 📝 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (핫 리로드) |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 코드 검사 |
| `npm run type-check` | TypeScript 타입 검사 |

---

## 🎨 디자인

- **색상**: 보라색(`#667eea`) & 자주색(`#764ba2`)
- **패턴**: Glassmorphism
- **효과**: backdrop-filter blur(10px)
- **반응형**: 모바일 → 태블릿 → PC

---

## 📊 데이터 구조

### Task (업무)
```typescript
{
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'in_progress' | 'pending';
  assignee: string;
  dueDate: string;
  category: string;
}
```

### SalesData (매출)
```typescript
{
  date: string;
  product: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalSales: number;
  region: string;
}
```

### Project (프로젝트)
```typescript
{
  id: string;
  name: string;
  progress: number; // 0-100
  status: 'planning' | 'in_progress' | 'finishing' | 'completed';
  assignee: string;
  startDate: string;
  dueDate: string;
  budget: number;
  spent: number;
}
```

---

## 🔄 개발 로드맵

- [x] 프로젝트 초기화
- [x] TypeScript 설정
- [x] Tailwind CSS 설정
- [ ] 기본 컴포넌트 구현
- [ ] 데이터 레이어 구성
- [ ] 섹션 컴포넌트 개발
- [ ] 메인 페이지 통합
- [ ] 테마 시스템 구현
- [ ] API 연결
- [ ] 테스트

---

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [React 공식 문서](https://react.dev)

---

## 📄 라이선스

Private Project

---

**마지막 업데이트**: 2026-04-24
