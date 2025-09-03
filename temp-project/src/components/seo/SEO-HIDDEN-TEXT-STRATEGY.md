# 🎯 합법적 SEO 텍스트 전략 (Uable Corporation)

## 📊 현재 상황 분석
- 백링크 없음 (0개)
- 콘텐츠 양 부족
- 키워드 노출 부족
→ **합법적인 방법으로 키워드 밀도를 높여야 함**

## 🚀 즉시 적용 가능한 5대 전략

### 1️⃣ **구조화된 데이터 극대화**

#### A. Service Schema 확장
```json
{
  "@type": "Service",
  "name": "3D 제품 컨피규레이터 개발",
  "alternateName": ["Three.js 개발", "웹 3D 개발", "3D 뷰어 제작"],
  "description": "고객이 제품을 360도로 확인하고 커스터마이징할 수 있는 3D 솔루션",
  "provider": {
    "@type": "Organization",
    "name": "Uable Corporation"
  },
  "serviceType": ["3D Development", "WebGL Development", "Interactive 3D"],
  "areaServed": {
    "@type": "Place",
    "name": "서울특별시 강남구"
  }
}
```

#### B. FAQ Schema (Q&A 형식으로 키워드 노출)
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Three.js 개발 비용은 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Three.js를 활용한 3D 개발 비용은 프로젝트 규모에 따라..."
      }
    }
  ]
}
```

### 2️⃣ **이미지 Alt 텍스트 전략**

#### 현재 이미지들에 적용할 Alt 텍스트
```tsx
// 로고
alt="Uable Corporation - 3D AR WebXR 개발 전문 기업 로고"

// 포트폴리오 썸네일
alt="Three.js로 개발한 3D 제품 컨피규레이터 - 자동차 커스터마이징 사례"
alt="AR.js 활용 증강현실 가구 배치 앱 개발 사례"
alt="WebXR API 기반 가상 쇼룸 구축 프로젝트"

// 배경 이미지
alt="Uable 3D 개발 작업 환경 - Three.js React Three Fiber 개발"
```

### 3️⃣ **SR-Only 텍스트 배치 전략**

#### 각 페이지별 숨김 텍스트 배치
```tsx
// 홈페이지
<div className="sr-only">
  <h2>서울 강남 3D 개발 전문 업체</h2>
  <p>Three.js, React Three Fiber, AR.js 전문 개발팀</p>
  <p>언주로 위치, 강남구 3D AR 개발 회사</p>
</div>

// 포트폴리오 페이지
<div className="sr-only">
  <h2>3D 개발 포트폴리오 및 제작 사례</h2>
  <ul>
    <li>Three.js 3D 제품 뷰어 개발</li>
    <li>AR.js 웹 증강현실 구현</li>
    <li>WebXR 브라우저 VR 체험</li>
  </ul>
</div>

// 문의 페이지
<div className="sr-only">
  <h2>3D AR 개발 견적 문의</h2>
  <p>Three.js 개발 비용 상담</p>
  <p>AR 앱 제작 기간 문의</p>
</div>
```

### 4️⃣ **Aria-Label 활용**

```tsx
// 버튼
<button aria-label="3D 포트폴리오 더보기 - Three.js 개발 사례">
  더보기
</button>

// 링크
<Link 
  href="/portfolio" 
  aria-label="3D AR WebXR 개발 포트폴리오 보기"
>
  Portfolio
</Link>

// 네비게이션
<nav aria-label="Uable 3D 개발 서비스 메뉴">
  ...
</nav>
```

### 5️⃣ **메타데이터 세분화**

```typescript
// 각 포트폴리오 상세 페이지
export async function generateMetadata({ params }) {
  return {
    title: `${project.title} - Three.js 3D 개발 사례`,
    description: `${project.tech} 기술을 활용한 ${project.category} 개발. 강남 3D 개발 전문 Uable`,
    keywords: [
      project.tech, // 'Three.js'
      `${project.category} 개발`, // '3D 제품 컨피규레이터 개발'
      '강남 3D 개발',
      'WebGL 개발'
    ]
  }
}
```

## 📝 실행 우선순위

### 🔴 즉시 실행 (오늘)
1. **FAQ Schema 추가** → layout.tsx에 바로 적용
2. **이미지 Alt 텍스트** → 모든 이미지에 키워드 포함
3. **SR-Only 컴포넌트** → 각 페이지에 배치

### 🟡 단기 실행 (이번 주)
4. **Service Schema 확장** → 각 서비스별 상세 스키마
5. **Aria-Label 적용** → 모든 인터랙티브 요소
6. **포트폴리오 메타데이터** → 각 프로젝트별 최적화

### 🟢 지속 실행 (매주)
7. **콘텐츠 추가** → 블로그 섹션 구현
8. **FAQ 페이지** → 실제 페이지로 구현
9. **용어집 페이지** → 3D/AR 기술 용어 설명

## 💻 구현 코드 예시

### 1. FAQ Schema 즉시 적용
```typescript
// src/app/layout.tsx에 추가
const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Three.js 개발 비용은 얼마인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Three.js 3D 개발 비용은 프로젝트 복잡도에 따라 500만원부터 시작합니다.'
      }
    },
    {
      '@type': 'Question', 
      name: 'AR 앱 개발 기간은 얼마나 걸리나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AR.js를 활용한 웹 AR은 4주, 네이티브 AR 앱은 8-12주 소요됩니다.'
      }
    }
  ]
}
```

### 2. 홈페이지 SR-Only 적용
```tsx
// src/app/page.tsx
import { SeoHiddenText } from '@/components/seo/seo-hidden-text'

export default function HomePage() {
  return (
    <>
      <SeoHiddenText />
      <div className="sr-only">
        <h2>강남 3D 개발 전문 Uable Corporation</h2>
        <p>서울 강남구 언주로 위치한 Three.js 전문 개발 회사</p>
      </div>
      {/* 실제 콘텐츠 */}
    </>
  )
}
```

## 📈 예상 효과

| 전략 | 구글 효과 | 네이버 효과 | 구현 난이도 | 소요 시간 |
|------|-----------|-------------|------------|-----------|
| FAQ Schema | ⭐⭐⭐⭐ | ⭐⭐ | 쉬움 | 30분 |
| Alt 텍스트 | ⭐⭐⭐ | ⭐⭐⭐ | 쉬움 | 1시간 |
| SR-Only | ⭐⭐ | ⭐⭐ | 쉬움 | 30분 |
| Service Schema | ⭐⭐⭐⭐ | ⭐ | 보통 | 2시간 |
| Aria-Label | ⭐⭐ | ⭐ | 쉬움 | 1시간 |

## ⚠️ 주의사항

### DO ✅
- 자연스러운 문장 사용
- 사용자에게 도움되는 정보
- 접근성 개선과 병행
- 점진적 적용

### DON'T ❌
- 과도한 키워드 반복
- 무의미한 텍스트 나열
- CSS로 텍스트 숨기기
- JavaScript로 동적 생성

## 🎯 목표 키워드 집중

### 핵심 타겟 (모든 전략에 포함)
1. **Three.js 개발**
2. **AR 개발**
3. **WebXR 개발**
4. **3D 제품 컨피규레이터**
5. **강남 3D 개발**

### 보조 타겟
- React Three Fiber
- AR.js
- WebGL
- 브라우저 3D
- 웹 기반 AR

---

*작성일: 2025년 9월 2일*
*목표: 3개월 내 타겟 키워드 검색 1페이지 진입*