# SEO 최적화 작업 문서

## 📁 /src/components/seo 폴더 구조

```
src/components/seo/
├── default-seo.tsx          # 기본 SEO 메타태그 컴포넌트 (현재 미사용)
├── structured-data.tsx      # 구조화된 데이터 (Schema.org) 컴포넌트
└── SEO-DOCUMENTATION.md     # SEO 작업 문서 (현재 파일)
```

---

## 🔍 SEO 최적화 현황

### 1. 메타데이터 구현 위치 및 내용

#### 📍 전역 메타데이터 (src/app/layout.tsx)
Next.js 13+ App Router의 Metadata API를 활용하여 전역 SEO 설정을 구현했습니다.

**구현된 항목:**
- ✅ **기본 메타태그**
  - `title`: 기본 타이틀 및 템플릿 패턴 설정
  - `description`: 회사 소개 및 서비스 설명 (160자 이내)
  - `keywords`: 핵심 키워드 배열 (3D, AR, WebXR 등)
  - `authors`, `creator`, `publisher`: 회사 정보

- ✅ **Open Graph 태그**
  - `og:type`: website
  - `og:locale`: ko_KR
  - `og:site_name`: Uable Corporation
  - `og:image`: 1200x630 크기의 대표 이미지
  - `og:url`: https://uable.co.kr

- ✅ **Twitter Cards**
  - `twitter:card`: summary_large_image
  - `twitter:site`: @uablecorp
  - `twitter:creator`: @uablecorp

- ✅ **검색엔진 최적화**
  - `robots`: 인덱싱 허용, 팔로우 허용
  - `googleBot`: 상세 크롤링 설정
  - `verification`: Google Search Console 인증

- ✅ **PWA 및 모바일 최적화**
  - 다양한 크기의 favicon 및 apple-touch-icon
  - manifest 파일 연결
  - 테마 색상 설정

#### 📍 페이지별 메타데이터
각 주요 페이지에 layout.tsx를 생성하여 고유한 메타데이터를 설정했습니다.

**구현된 페이지:**
1. **Portfolio 페이지** (src/app/portfolio/layout.tsx)
   - 포트폴리오 전용 타이틀 및 설명
   - canonical URL: /portfolio

2. **Contact 페이지** (src/app/contact/layout.tsx)
   - 문의하기 전용 메타데이터
   - canonical URL: /contact

3. **Privacy 페이지** (src/app/privacy/layout.tsx)
   - 개인정보처리방침 메타데이터
   - robots: noindex, nofollow (개인정보 페이지 크롤링 방지)

4. **Portfolio 상세 페이지** (src/app/portfolio/[id]/page.tsx)
   - 동적 메타데이터 생성 (generateMetadata)
   - 프로젝트별 고유 타이틀, 설명, 이미지

---

### 2. 구조화된 데이터 (Schema.org)

#### 📍 structured-data.tsx 컴포넌트
Google과 다른 검색엔진이 웹사이트를 더 잘 이해할 수 있도록 구조화된 데이터를 제공합니다.

**구현된 스키마:**

#### Organization Schema
```json
{
  "@type": "Organization",
  "name": "Uable Corporation",
  "url": "https://uable.co.kr",
  "logo": "회사 로고 URL",
  "address": {
    "addressCountry": "KR",
    "addressLocality": "Seoul"
  },
  "contactPoint": {
    "telephone": "+82-10-1234-5678",
    "contactType": "customer service",
    "email": "contact@uable.co.kr"
  },
  "sameAs": ["SNS 링크들"],
  "knowsAbout": ["3D Technology", "AR", "VR", "WebXR"],
  "hasOfferCatalog": {
    "서비스 목록": [
      "3D Product Configurator",
      "AR Mobile App",
      "WebXR Web Experience"
    ]
  }
}
```

#### WebSite Schema
```json
{
  "@type": "WebSite",
  "name": "Uable Corporation",
  "url": "https://uable.co.kr",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "검색 URL 패턴"
  }
}
```

#### 📍 layout.tsx 내장 구조화 데이터
메인 레이아웃에 Organization Schema가 직접 삽입되어 있어 모든 페이지에서 회사 정보를 제공합니다.

---

### 3. 추가 구현된 SEO 컴포넌트

#### 📍 Breadcrumb 컴포넌트 (src/components/ui/breadcrumb.tsx)
- BreadcrumbList 구조화 데이터 자동 생성
- 페이지 계층 구조를 검색엔진에 제공
- 사용자 네비게이션 개선

#### 📍 OptimizedImage 컴포넌트 (src/components/ui/optimized-image.tsx)
- 이미지 lazy loading 자동화
- alt 텍스트 필수 설정
- WebP 포맷 지원
- 로딩 placeholder 효과

---

### 4. 크롤링 및 인덱싱 최적화

#### 📍 robots.txt (public/robots.txt)
```
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

Host: https://uable.co.kr
Sitemap: https://uable.co.kr/sitemap.xml
```

#### 📍 sitemap.xml (public/sitemap.xml)
- 모든 정적 페이지 포함
- 포트폴리오 상세 페이지 포함
- 업데이트 주기: weekly
- 우선순위: 0.7

#### 📍 next-sitemap 설정 (next-sitemap.config.js)
- 자동 사이트맵 생성
- admin/api 경로 제외
- robots.txt 자동 생성

---

### 5. 성능 최적화 (Core Web Vitals)

#### 📍 Next.js 설정 (next.config.js)
- 이미지 최적화 설정
- 콘솔 로그 제거 (production)
- 압축 활성화
- 불필요한 헤더 제거

---

## 📊 SEO 체크리스트

### ✅ 완료된 항목
- [x] 메타 태그 최적화 (title, description, keywords)
- [x] Open Graph 태그 구현
- [x] Twitter Cards 구현
- [x] 구조화된 데이터 (Schema.org)
- [x] 페이지별 고유 메타데이터
- [x] Sitemap.xml 생성
- [x] Robots.txt 설정
- [x] Canonical URL 설정
- [x] 404 페이지 개선
- [x] 이미지 alt 텍스트 및 lazy loading
- [x] Breadcrumb 구현
- [x] 모바일 최적화
- [x] PWA 기본 설정

### 🔄 향후 개선 사항
- [ ] 다국어 지원 (hreflang 태그)
- [ ] AMP 페이지 구현
- [ ] 동적 사이트맵 생성
- [ ] 검색 기능 구현
- [ ] FAQ Schema 추가
- [ ] Article/BlogPosting Schema 추가
- [ ] 이미지 사이트맵 추가
- [ ] 비디오 사이트맵 추가

---

## 🛠️ 사용 방법

### 페이지별 메타데이터 추가
```typescript
// 새 페이지의 layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '페이지 제목',
  description: '페이지 설명',
  openGraph: {
    title: 'OG 제목',
    description: 'OG 설명',
  },
  alternates: {
    canonical: '/page-url',
  },
}
```

### 구조화된 데이터 추가
```typescript
// 페이지 컴포넌트에서
import { getStructuredData } from '@/components/seo/structured-data'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  // ... 추가 스키마 데이터
}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

---

## 📈 SEO 모니터링 도구

### 추천 도구
1. **Google Search Console**: 인덱싱 상태 및 검색 성능 모니터링
2. **Google PageSpeed Insights**: Core Web Vitals 측정
3. **Google Rich Results Test**: 구조화된 데이터 검증
4. **Lighthouse**: 종합적인 SEO 및 성능 감사
5. **Naver Webmaster Tools**: 네이버 검색 최적화

### 검증 명령어
```bash
# 사이트맵 생성
npm run build
npm run postbuild

# SEO 검사 (Lighthouse)
npx lighthouse https://uable.co.kr --view

# 구조화된 데이터 테스트
# Google Rich Results Test 사용
# https://search.google.com/test/rich-results
```

---

## 📝 주의사항

1. **이미지 최적화**: 모든 이미지는 적절한 alt 텍스트를 포함해야 함
2. **URL 구조**: 의미 있는 URL 경로 사용 (예: /portfolio/3d-product)
3. **콘텐츠 품질**: 고유하고 가치 있는 콘텐츠 제공
4. **모바일 우선**: 모든 페이지가 모바일에서 완벽하게 작동해야 함
5. **로딩 속도**: 3초 이내 페이지 로드 목표

---

## 🔗 참고 자료

- [Next.js SEO 가이드](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google SEO 스타터 가이드](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org 문서](https://schema.org/)
- [Open Graph 프로토콜](https://ogp.me/)
- [Twitter Cards 문서](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

---

*최종 업데이트: 2025년 9월 2일*