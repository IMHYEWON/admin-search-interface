# Admin Search Interface

어드민용 서치바 인터페이스입니다. Next.js, pnpm, Antd를 사용하여 구축되었습니다.

## 기능

- 🔍 실시간 상품 검색 (AutoComplete)
- 📱 반응형 디자인
- 🎨 Antd 컴포넌트 기반 UI
- 🚀 Next.js 14 App Router 사용
- 📦 pnpm 패키지 매니저

## 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Library**: Ant Design 5
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Icons**: Ant Design Icons

## 설치 및 실행

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 빌드

```bash
pnpm build
```

### 4. 프로덕션 실행

```bash
pnpm start
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 글로벌 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── products/          # 상품 관련 페이지
│       └── [id]/          # 동적 라우트
│           └── page.tsx   # 상품 상세 페이지
├── components/            # 재사용 가능한 컴포넌트
│   └── Header.tsx         # 헤더 컴포넌트 (검색바 포함)
├── lib/                   # 유틸리티 함수
│   └── mockData.ts        # 모킹된 데이터
└── types/                 # TypeScript 타입 정의
    └── product.ts         # 상품 관련 타입
```

## 주요 기능

### 1. 실시간 검색
- 입력할 때마다 자동으로 상품을 검색합니다
- 최대 5개의 검색 결과를 표시합니다
- 300ms의 디바운싱으로 성능을 최적화했습니다

### 2. 상품 상태 표시
- **활성**: 녹색 라벨
- **비활성**: 주황색 라벨  
- **단종**: 빨간색 라벨

### 3. 상품 상세 페이지
- 검색 결과에서 상품을 클릭하면 상세 페이지로 이동
- 상품의 모든 정보를 표시
- 뒤로가기 기능 제공

## API 구조

### 상품 타입
```typescript
interface Product {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'discontinued';
}
```

### 검색 API
```typescript
searchProducts(query: string): Promise<Product[]>
```

## 커스터마이징

### 새로운 상품 추가
`src/lib/mockData.ts` 파일의 `mockProducts` 배열에 새로운 상품을 추가하세요.

### 스타일 수정
`src/app/globals.css` 파일에서 CSS 변수와 클래스를 수정할 수 있습니다.

### 검색 로직 변경
`src/lib/mockData.ts`의 `searchProducts` 함수를 수정하여 검색 로직을 변경할 수 있습니다.

## 라이선스

MIT License
