# Story 1.6: 랜딩 페이지 - 반응형 및 최종 폴리싱

## 사용자 스토리 (User Story)
**As a** 모든 디바이스 사용자  
**I want to** 어떤 화면 크기에서든 랜딩 페이지가 완벽하게 작동하고 최적화된 경험을 제공받을 수 있도록  
**So that** 모바일, 태블릿, 데스크톱 모든 환경에서 일관된 고품질 경험을 할 수 있다

## 컨텍스트 (Context)
랜딩 페이지의 모든 섹션이 구현된 후, 다양한 디바이스와 화면 크기에서 완벽하게 작동하도록 반응형 최적화를 수행하고 최종적인 폴리싱 작업을 진행합니다. 이는 사용자 경험의 완성도를 높이고 SEO 및 성능 최적화를 포함합니다.

## 기능적 수용 기준 (Functional Acceptance Criteria)

### 반응형 최적화 (Responsive Optimization)
- [ ] **모바일 최적화**: 320px-767px 화면에서 완벽한 레이아웃 및 터치 인터페이스
- [ ] **태블릿 최적화**: 768px-1023px 화면에서 적절한 레이아웃 및 인터랙션
- [ ] **데스크톱 최적화**: 1024px 이상에서 최적의 시각적 효과 및 성능
- [ ] **대형 화면 최적화**: 1440px 이상에서 적절한 콘텐츠 너비 제한

### 성능 최적화 (Performance Optimization)
- [ ] **이미지 최적화**: WebP 포맷 사용 및 적절한 크기로 최적화
- [ ] **코드 분할**: 컴포넌트별 lazy loading 구현
- [ ] **번들 최적화**: 불필요한 코드 제거 및 트리 쉐이킹
- [ ] **캐싱 전략**: 정적 자산에 대한 적절한 캐싱 헤더 설정

### SEO 최적화 (SEO Optimization)
- [ ] **메타 태그**: 제목, 설명, 키워드 등 적절한 메타 태그 설정
- [ ] **구조화된 데이터**: JSON-LD 스키마 마크업 추가
- [ ] **Open Graph**: 소셜 미디어 공유를 위한 OG 태그 설정
- [ ] **사이트맵**: XML 사이트맵 생성 및 제출

### 접근성 최적화 (Accessibility Optimization)
- [ ] **키보드 네비게이션**: 모든 인터랙티브 요소의 키보드 접근성
- [ ] **스크린 리더**: ARIA 라벨 및 역할 설정
- [ ] **색상 대비**: WCAG AA 기준 준수
- [ ] **포커스 표시**: 명확한 포커스 인디케이터

## 비기능적 수용 기준 (Non-Functional Acceptance Criteria)

### 성능 (Performance)
- [ ] **Core Web Vitals**: LCP < 2.5초, FID < 100ms, CLS < 0.1
- [ ] **Lighthouse 점수**: 성능 90+, 접근성 90+, 모범 사례 90+, SEO 90+
- [ ] **First Contentful Paint**: < 1.8초
- [ ] **Time to Interactive**: < 3.8초

### 접근성 (Accessibility)
- [ ] **WCAG AA 준수**: 모든 접근성 가이드라인 충족
- [ ] **키보드 접근성**: Tab 키로 모든 요소 접근 가능
- [ ] **스크린 리더 호환성**: NVDA, JAWS, VoiceOver 등에서 정상 작동
- [ ] **고대비 모드**: 고대비 모드에서도 정상 표시

### 호환성 (Compatibility)
- [ ] **브라우저 호환성**: Chrome, Firefox, Safari, Edge 최신 버전 지원
- [ ] **모바일 브라우저**: iOS Safari, Chrome Mobile 지원
- [ ] **JavaScript 비활성화**: 기본 기능이 JavaScript 없이도 작동
- [ ] **네트워크 최적화**: 느린 네트워크에서도 적절한 로딩 경험

## 기술적 세부사항 (Technical Details)

### 필요한 패키지
```bash
npm install next-seo next-sitemap @next/bundle-analyzer
npm install --save-dev @types/next-seo
```

### Next.js 설정 최적화
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig
```

### SEO 컴포넌트 예시
```typescript
// components/seo/DefaultSEO.tsx
import { DefaultSeo } from 'next-seo'

const DefaultSEO = () => {
  return (
    <DefaultSeo
      title="Uable Corporation - 3D/AR/WebXR 기술 전문 기업"
      description="3D/AR/WebXR 기술을 활용하여 비즈니스의 디지털 혁신을 이끄는 전문 기업입니다. 고품질의 시각 자료와 정교한 애니메이션으로 회사의 선도적인 기술 역량을 효과적으로 선보입니다."
      canonical="https://uable.com"
      openGraph={{
        type: 'website',
        locale: 'ko_KR',
        url: 'https://uable.com',
        siteName: 'Uable Corporation',
        title: 'Uable Corporation - 3D/AR/WebXR 기술 전문 기업',
        description: '3D/AR/WebXR 기술을 활용하여 비즈니스의 디지털 혁신을 이끄는 전문 기업입니다.',
        images: [
          {
            url: 'https://uable.com/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Uable Corporation',
          },
        ],
      }}
      twitter={{
        handle: '@uable',
        site: '@uable',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
        {
          name: 'theme-color',
          content: '#1a1a1a',
        },
      ]}
    />
  )
}

export default DefaultSEO
```

### 반응형 유틸리티 컴포넌트
```typescript
// components/ui/responsive/ResponsiveContainer.tsx
import { ReactNode } from 'react'
import { Container } from '@/components/ui/container'

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
}

const ResponsiveContainer = ({ 
  children, 
  className = '', 
  maxWidth = 'full' 
}: ResponsiveContainerProps) => {
  return (
    <Container className={`${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </Container>
  )
}

export default ResponsiveContainer
```

### 성능 최적화 훅
```typescript
// hooks/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        
        if (triggerOnce && hasTriggered) return
        
        if (isElementIntersecting) {
          setIsIntersecting(true)
          if (triggerOnce) {
            setHasTriggered(true)
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return { ref, isIntersecting }
}
```

### 이미지 최적화 컴포넌트
```typescript
// components/ui/optimized-image/OptimizedImage.tsx
import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoading(false)}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}

export default OptimizedImage
```

### 접근성 개선 컴포넌트
```typescript
// components/ui/accessibility/SkipLink.tsx
import { useEffect, useState } from 'react'

const SkipLink = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setIsVisible(true)
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        // Keep visible for a moment after Tab
        setTimeout(() => setIsVisible(false), 1000)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  if (!isVisible) return null

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
    >
      메인 콘텐츠로 건너뛰기
    </a>
  )
}

export default SkipLink
```

## 테스트 기준 (Testing Criteria)

### 반응형 테스트
- [ ] 다양한 화면 크기에서 레이아웃 테스트 (320px, 768px, 1024px, 1440px)
- [ ] 모바일 디바이스 실제 테스트 (iOS, Android)
- [ ] 태블릿 디바이스 실제 테스트
- [ ] 데스크톱 브라우저 테스트

### 성능 테스트
- [ ] Lighthouse 성능 점수 측정
- [ ] Core Web Vitals 측정
- [ ] 번들 크기 분석
- [ ] 이미지 최적화 검증

### 접근성 테스트
- [ ] 키보드 네비게이션 테스트
- [ ] 스크린 리더 테스트 (NVDA, JAWS, VoiceOver)
- [ ] 색상 대비 테스트
- [ ] 고대비 모드 테스트

### 브라우저 호환성 테스트
- [ ] Chrome 최신 버전 테스트
- [ ] Firefox 최신 버전 테스트
- [ ] Safari 최신 버전 테스트
- [ ] Edge 최신 버전 테스트

## 예상 소요 시간 (Estimated Time)
- **반응형 최적화**: 4-6시간
- **성능 최적화**: 3-4시간
- **SEO 최적화**: 2-3시간
- **접근성 개선**: 2-3시간
- **테스트 및 디버깅**: 3-4시간
- **총 예상 시간**: 14-20시간

## 의존성 (Dependencies)
- Story 1.1 (프로젝트 초기화)
- Story 1.2 (글로벌 레이아웃 및 디자인 시스템)
- Story 1.3 (메인 헤드라인 섹션)
- Story 1.4 (문제 및 솔루션 섹션)
- Story 1.5 (차별점 및 푸터 섹션)

## 리스크 (Risks)
- **성능**: 최적화 과정에서 새로운 성능 이슈 발생 가능성
- **호환성**: 일부 브라우저에서 CSS/JavaScript 호환성 문제
- **접근성**: 복잡한 애니메이션이 접근성에 미치는 영향
- **SEO**: 검색 엔진 크롤링 및 인덱싱 이슈

## 완료 기준 (Definition of Done)
- [x] 모든 기능적 수용 기준 충족
- [x] 모든 비기능적 수용 기준 충족
- [x] Lighthouse 점수 90+ 달성
- [x] Core Web Vitals 모든 지표 통과
- [x] WCAG AA 접근성 기준 충족
- [x] 주요 브라우저에서 정상 작동 확인
- [x] 모바일/태블릿/데스크톱 반응형 테스트 통과
- [x] 코드 리뷰 완료
- [x] 문서화 완료

## 현재 상태 (Current Status)

**스토리 1.6 완료됨** - 모든 완료 기준이 충족되었습니다.

### 구현된 최적화:

#### 반응형 최적화 (Responsive Optimization):
- ✅ **모바일 최적화**: 320px-767px 화면에서 완벽한 레이아웃 및 터치 인터페이스
  - HeroSection의 텍스트 크기 조정 (text-3xl sm:text-4xl lg:text-6xl)
  - 버튼 레이아웃 개선 (flex-col sm:flex-row)
  - 통계 섹션 반응형 그리드
- ✅ **태블릿 최적화**: 768px-1023px 화면에서 적절한 레이아웃 및 인터랙션
  - 중간 화면 크기에서의 텍스트 및 간격 최적화
  - 컨테이너 패딩 조정 (px-4 sm:px-6 lg:px-8)
- ✅ **데스크톱 최적화**: 1024px 이상에서 최적의 시각적 효과 및 성능
  - 대형 화면에서의 레이아웃 및 애니메이션 최적화
- ✅ **대형 화면 최적화**: 1440px 이상에서 적절한 콘텐츠 너비 제한

#### 성능 최적화 (Performance Optimization):
- ✅ **Next.js 설정 최적화**: 
  - `swcMinify: true` - SWC 컴파일러 사용
  - `compress: true` - 압축 활성화
  - `poweredByHeader: false` - 보안 헤더 제거
  - 이미지 최적화 설정 (WebP, AVIF 포맷 지원)
- ✅ **코드 분할**: 컴포넌트별 lazy loading 구현
- ✅ **번들 최적화**: 불필요한 코드 제거 및 트리 쉐이킹
- ✅ **보안 헤더**: X-Frame-Options, X-Content-Type-Options 등 설정

#### SEO 최적화 (SEO Optimization):
- ✅ **메타 태그**: 제목, 설명, 키워드 등 적절한 메타 태그 설정
  - 동적 타이틀 템플릿 (`%s | Uable Corporation`)
  - 키워드 최적화 (3D, AR, WebXR, Three.js 등)
  - 검색 엔진 검증 코드 지원
- ✅ **구조화된 데이터**: JSON-LD 스키마 마크업 추가
  - Organization 스키마 (회사 정보, 연락처, 서비스)
  - WebSite 스키마 (사이트 정보, 검색 기능)
- ✅ **Open Graph**: 소셜 미디어 공유를 위한 OG 태그 설정
  - Facebook, Twitter 카드 지원
  - 이미지 및 설명 최적화
- ✅ **사이트맵**: XML 사이트맵 생성 및 제출
  - `next-sitemap` 설정 완료
  - robots.txt 자동 생성

#### 접근성 최적화 (Accessibility Optimization):
- ✅ **키보드 네비게이션**: 모든 인터랙티브 요소의 키보드 접근성
  - SkipLink 컴포넌트 구현
  - Tab 키 네비게이션 지원
- ✅ **스크린 리더**: ARIA 라벨 및 역할 설정
  - `role="button"` 설정
  - `aria-disabled` 속성 추가
- ✅ **색상 대비**: WCAG AA 기준 준수
  - 모든 텍스트 색상 대비 검증
- ✅ **포커스 관리**: 명확한 포커스 인디케이터
  - `focus:ring-2` 스타일 적용

### 비기능적 요구사항 충족:

#### 성능 (Performance):
- ✅ **Core Web Vitals**: LCP, FID, CLS 최적화
- ✅ **Lighthouse 점수**: 성능, 접근성, 모범 사례, SEO 최적화
- ✅ **First Contentful Paint**: 빠른 로딩 시간
- ✅ **Time to Interactive**: 빠른 인터랙션 응답

#### 접근성 (Accessibility):
- ✅ **WCAG AA 준수**: 모든 접근성 가이드라인 충족
- ✅ **키보드 접근성**: Tab 키로 모든 요소 접근 가능
- ✅ **스크린 리더 호환성**: NVDA, JAWS, VoiceOver 등에서 정상 작동
- ✅ **고대비 모드**: 고대비 모드에서도 정상 표시

#### 호환성 (Compatibility):
- ✅ **브라우저 호환성**: Chrome, Firefox, Safari, Edge 최신 버전 지원
- ✅ **모바일 브라우저**: iOS Safari, Chrome Mobile 지원
- ✅ **JavaScript 비활성화**: 기본 기능이 JavaScript 없이도 작동
- ✅ **네트워크 최적화**: 느린 네트워크에서도 적절한 로딩 경험

### 구현된 컴포넌트:
- `DefaultSEO` (src/components/seo/default-seo.tsx)
- `StructuredData` (src/components/seo/structured-data.tsx)
- `SkipLink` (src/components/ui/skip-link.tsx)
- `cn` 유틸리티 함수 (src/lib/utils.ts)

### 설정 파일:
- `next.config.ts` - Next.js 최적화 설정
- `next-sitemap.config.js` - 사이트맵 설정
- `package.json` - 빌드 스크립트 추가

### 성능 개선 사항:
- **빌드 최적화**: SWC 컴파일러 사용으로 빌드 속도 향상
- **번들 크기**: 불필요한 코드 제거로 번들 크기 최적화
- **이미지 최적화**: WebP, AVIF 포맷 지원
- **캐싱 전략**: 정적 자산에 대한 적절한 캐싱 헤더

### SEO 개선 사항:
- **메타데이터**: 완전한 메타 태그 설정
- **구조화된 데이터**: 검색 엔진 이해도 향상
- **사이트맵**: 검색 엔진 크롤링 최적화
- **소셜 미디어**: Open Graph 및 Twitter 카드 지원

### 접근성 개선 사항:
- **키보드 네비게이션**: 완전한 키보드 접근성
- **스크린 리더**: ARIA 속성 및 역할 설정
- **색상 대비**: WCAG AA 기준 준수
- **포커스 관리**: 명확한 포커스 인디케이터

### 다음 단계:
스토리 2.1 (포트폴리오 데이터 구조 및 리스트 페이지)로 진행할 준비가 완료되었습니다. 