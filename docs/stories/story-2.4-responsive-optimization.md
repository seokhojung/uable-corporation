# Story 2.4: 반응형 최적화

## 개요 (Overview)
포트폴리오 기능의 모든 페이지와 컴포넌트를 다양한 디바이스와 화면 크기에서 최적화하여 일관된 사용자 경험을 제공합니다. 이 스토리는 모바일, 태블릿, 데스크톱, 대형 화면에서의 완벽한 반응형 디자인을 구현합니다.

## 기능적 요구사항 (Functional Requirements)

### 반응형 브레이크포인트 시스템
- **모바일**: 320px - 767px (세로 우선 레이아웃)
- **태블릿**: 768px - 1023px (중간 크기 레이아웃)
- **데스크톱**: 1024px - 1439px (전체 레이아웃)
- **대형 화면**: 1440px+ (와이드 레이아웃)

### 포트폴리오 목록 페이지 최적화
- **모바일**: 1열 그리드, 터치 친화적 인터페이스
- **태블릿**: 2열 그리드, 중간 크기 카드
- **데스크톱**: 3-4열 그리드, 전체 기능
- **대형 화면**: 4-5열 그리드, 고해상도 이미지

### 포트폴리오 상세 페이지 최적화
- **모바일**: 세로 스택 레이아웃, 터치 네비게이션
- **태블릿**: 2열 레이아웃, 중간 크기 미디어
- **데스크톱**: 전체 레이아웃, 사이드바 네비게이션
- **대형 화면**: 와이드 레이아웃, 고해상도 미디어

### 미디어 최적화
- **이미지**: 반응형 이미지 크기 및 포맷 최적화
- **비디오**: 적응형 비트레이트 및 해상도
- **3D 모델**: 디바이스 성능에 따른 품질 조정
- **로딩**: 지연 로딩 및 스켈레톤 UI

### 터치 인터페이스 최적화
- **터치 타겟**: 최소 44px 터치 영역
- **제스처**: 스와이프, 핀치 줌 지원
- **피드백**: 터치 시각적 피드백
- **접근성**: 터치 친화적 네비게이션

## 비기능적 요구사항 (Non-Functional Requirements)

### 성능 (Performance)
- **모바일 성능**: 3G 네트워크에서 3초 이내 로딩
- **이미지 최적화**: WebP/AVIF 포맷, 적응형 크기
- **코드 스플리팅**: 디바이스별 최적화된 번들
- **캐싱**: 브라우저 캐싱 및 CDN 활용

### 접근성 (Accessibility)
- **WCAG AA 준수**: 모든 화면 크기에서 접근성 유지
- **키보드 네비게이션**: 터치 디바이스에서도 키보드 지원
- **스크린 리더**: 모든 콘텐츠의 스크린 리더 지원
- **색상 대비**: 모든 화면 크기에서 최소 4.5:1 비율

### 사용자 경험 (User Experience)
- **일관성**: 모든 디바이스에서 일관된 브랜드 경험
- **직관성**: 디바이스별 최적화된 인터랙션 패턴
- **성능**: 빠른 로딩과 부드러운 애니메이션
- **접근성**: 모든 사용자가 쉽게 사용할 수 있는 인터페이스

## 기술적 세부사항 (Technical Details)

### 반응형 유틸리티 시스템
```typescript
// utils/responsive.ts
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  large: '1440px',
  xlarge: '1920px'
}

export const deviceTypes = {
  mobile: 'mobile',
  tablet: 'tablet',
  desktop: 'desktop',
  large: 'large'
} as const

export type DeviceType = typeof deviceTypes[keyof typeof deviceTypes]

// 반응형 훅
export const useResponsive = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      
      if (width < 768) {
        setDeviceType('mobile')
        setIsMobile(true)
        setIsTablet(false)
        setIsDesktop(false)
      } else if (width < 1024) {
        setDeviceType('tablet')
        setIsMobile(false)
        setIsTablet(true)
        setIsDesktop(false)
      } else {
        setDeviceType('desktop')
        setIsMobile(false)
        setIsTablet(false)
        setIsDesktop(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints
  }
}

// 반응형 이미지 훅
export const useResponsiveImage = (src: string, sizes: Record<string, string>) => {
  const { deviceType } = useResponsive()
  
  const getImageSrc = () => {
    switch (deviceType) {
      case 'mobile':
        return sizes.mobile || sizes.tablet || sizes.desktop || src
      case 'tablet':
        return sizes.tablet || sizes.desktop || src
      case 'desktop':
        return sizes.desktop || src
      default:
        return src
    }
  }

  return getImageSrc()
}
```

### 반응형 포트폴리오 목록 컴포넌트
```typescript
// components/portfolio/portfolio-list-responsive.tsx
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useResponsive } from '@/utils/responsive'
import { PortfolioCardEnhanced } from '@/components/portfolio/portfolio-card-enhanced'
import { PortfolioFiltersEnhanced } from '@/components/portfolio/portfolio-filters-enhanced'
import type { PortfolioProject, PortfolioFilters } from '@/types/portfolio'

interface PortfolioListResponsiveProps {
  projects: PortfolioProject[]
  filters: PortfolioFilters
  onFiltersChange: (filters: PortfolioFilters) => void
}

const PortfolioListResponsive = ({ 
  projects, 
  filters, 
  onFiltersChange 
}: PortfolioListResponsiveProps) => {
  const { isMobile, isTablet, isDesktop } = useResponsive()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // 디바이스별 그리드 설정
  const gridConfig = useMemo(() => {
    if (isMobile) {
      return {
        columns: 1,
        gap: '1rem',
        cardHeight: 'auto',
        showFilters: false
      }
    } else if (isTablet) {
      return {
        columns: 2,
        gap: '1.5rem',
        cardHeight: 'auto',
        showFilters: true
      }
    } else {
      return {
        columns: viewMode === 'grid' ? 3 : 1,
        gap: '2rem',
        cardHeight: 'auto',
        showFilters: true
      }
    }
  }, [isMobile, isTablet, isDesktop, viewMode])

  // 모바일에서 자동으로 리스트 뷰로 변경
  useEffect(() => {
    if (isMobile && viewMode === 'grid') {
      setViewMode('list')
    }
  }, [isMobile, viewMode])

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-8 sm:py-12 lg:py-16 text-center"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4 sm:mb-6">
            포트폴리오
          </h1>
          <p className="text-base sm:text-lg text-primary-600 max-w-2xl mx-auto px-4">
            다양한 산업 분야에서 3D/AR/WebXR 기술을 활용한 프로젝트들을 확인해보세요.
          </p>
        </motion.div>

        {/* 필터 섹션 */}
        {gridConfig.showFilters && (
          <PortfolioFiltersEnhanced
            filters={filters}
            onFiltersChange={onFiltersChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )}

        {/* 프로젝트 그리드 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pb-8 sm:pb-12 lg:pb-16"
        >
          {projects.length > 0 ? (
            <div 
              className={`grid gap-${gridConfig.gap} ${
                isMobile 
                  ? 'grid-cols-1' 
                  : isTablet 
                    ? 'grid-cols-2' 
                    : viewMode === 'grid'
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1'
              }`}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: 'easeOut'
                  }}
                >
                  <PortfolioCardEnhanced 
                    project={project} 
                    viewMode={viewMode}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-primary-600">
                검색 조건에 맞는 프로젝트가 없습니다.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default PortfolioListResponsive
```

### 반응형 포트폴리오 상세 페이지
```typescript
// pages/portfolio/[id].tsx (반응형 버전)
import { GetStaticPaths, GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import { useResponsive } from '@/utils/responsive'
import { Container } from '@/components/ui/container'
import { ProjectGallery } from '@/components/portfolio/project-gallery'
import { ProjectDetails } from '@/components/portfolio/project-details'
import { TechnologyStack } from '@/components/portfolio/technology-stack'
import { ProjectAchievements } from '@/components/portfolio/project-achievements'
import { RelatedProjects } from '@/components/portfolio/related-projects'
import type { PortfolioProject } from '@/types/portfolio'

interface ProjectPageProps {
  project: PortfolioProject
  relatedProjects: PortfolioProject[]
}

const ProjectPageResponsive = ({ project, relatedProjects }: ProjectPageProps) => {
  const { isMobile, isTablet, isDesktop } = useResponsive()

  return (
    <div className="min-h-screen bg-white">
      <Container>
        {/* 브레드크럼 네비게이션 */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-4 sm:py-6"
        >
          <div className="flex items-center gap-2 text-sm text-primary-600 overflow-x-auto">
            <a href="/portfolio" className="hover:text-accent-600 transition-colors whitespace-nowrap">
              포트폴리오
            </a>
            <span className="hidden sm:inline">/</span>
            <span className="text-primary-900 truncate">{project.title}</span>
          </div>
        </motion.nav>

        {/* 프로젝트 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 sm:mb-12"
        >
          <div className={`grid gap-6 sm:gap-8 lg:gap-12 ${
            isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'
          }`}>
            {/* 프로젝트 정보 */}
            <div className="order-2 lg:order-1">
              <div className="mb-4 sm:mb-6">
                <Badge variant="secondary" className="mb-3 sm:mb-4">
                  {getCategoryLabel(project.category)}
                </Badge>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-900 mb-4 sm:mb-6">
                  {project.title}
                </h1>
                <p className="text-base sm:text-lg text-primary-600 mb-6 sm:mb-8">
                  {project.description}
                </p>
              </div>

              {/* 프로젝트 메타 정보 */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-2 text-sm sm:text-base text-primary-600">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{project.duration.start} - {project.duration.end}</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base text-primary-600">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>팀 {project.teamSize}명</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base text-primary-600">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{project.role}</span>
                </div>
              </div>

              {/* 기술 스택 미리보기 */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-primary-900 mb-3">
                  사용 기술
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, isMobile ? 2 : 5).map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs sm:text-sm">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > (isMobile ? 2 : 5) && (
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                      +{project.technologies.length - (isMobile ? 2 : 5)}
                    </Badge>
                  )}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {project.externalLinks.demo && (
                  <Button size="lg" className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    라이브 데모 보기
                  </Button>
                )}
                <Button size="lg" variant="secondary">
                  프로젝트 자세히 보기
                </Button>
              </div>
            </div>

            {/* 프로젝트 썸네일 */}
            <div className="order-1 lg:order-2">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <img
                  src={project.thumbnail.src}
                  alt={project.thumbnail.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 프로젝트 갤러리 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <ProjectGallery project={project} />
        </motion.div>

        {/* 프로젝트 상세 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 sm:mb-16"
        >
          <ProjectDetails project={project} />
        </motion.div>

        {/* 기술 스택 상세 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 sm:mb-16"
        >
          <TechnologyStack project={project} />
        </motion.div>

        {/* 프로젝트 성과 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <ProjectAchievements project={project} />
        </motion.div>

        {/* 관련 프로젝트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <RelatedProjects projects={relatedProjects} currentProjectId={project.id} />
        </motion.div>
      </Container>
    </div>
  )
}

export default ProjectPageResponsive
```

### 반응형 미디어 컴포넌트
```typescript
// components/portfolio/responsive-media.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useResponsive } from '@/utils/responsive'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { Model3DViewer } from '@/components/portfolio/model-3d-viewer'
import { VideoPlayer } from '@/components/portfolio/video-player'
import type { PortfolioProject } from '@/types/portfolio'

interface ResponsiveMediaProps {
  project: PortfolioProject
}

const ResponsiveMedia = ({ project }: ResponsiveMediaProps) => {
  const { isMobile, isTablet, isDesktop } = useResponsive()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const allMedia = [
    ...project.images.map((img, index) => ({ ...img, type: 'image' as const, index })),
    ...(project.videos?.map((video, index) => ({ ...video, type: 'video' as const, index })) || []),
    ...(project.models3d?.map((model, index) => ({ ...model, type: '3d' as const, index })) || [])
  ]

  // 모바일에서 자동 재생 비활성화
  useEffect(() => {
    if (isMobile) {
      // 모바일에서 자동 재생 방지
    }
  }, [isMobile])

  const getMediaSize = () => {
    if (isMobile) {
      return { width: 320, height: 240 }
    } else if (isTablet) {
      return { width: 640, height: 480 }
    } else {
      return { width: 1200, height: 800 }
    }
  }

  const currentMedia = allMedia[currentIndex]
  const mediaSize = getMediaSize()

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-primary-900">프로젝트 갤러리</h2>
      
      {/* 메인 뷰어 */}
      <div className="relative aspect-video bg-secondary-100 rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {currentMedia.type === 'image' && (
              <OptimizedImage
                src={currentMedia.src}
                alt={currentMedia.alt}
                width={mediaSize.width}
                height={mediaSize.height}
                className="w-full h-full object-cover"
                priority
              />
            )}
            
            {currentMedia.type === 'video' && (
              <VideoPlayer
                src={currentMedia.src}
                poster={currentMedia.poster}
                alt={currentMedia.alt}
                autoPlay={!isMobile}
                muted={isMobile}
              />
            )}
            
            {currentMedia.type === '3d' && (
              <Model3DViewer
                src={currentMedia.src}
                format={currentMedia.format}
                alt={currentMedia.alt}
                quality={isMobile ? 'low' : isTablet ? 'medium' : 'high'}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* 네비게이션 버튼 */}
        {allMedia.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentIndex(prev => prev === 0 ? allMedia.length - 1 : prev - 1)}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCurrentIndex(prev => prev === allMedia.length - 1 ? 0 : prev + 1)}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* 전체화면 버튼 */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsFullscreen(true)}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/80 hover:bg-white"
        >
          전체화면
        </Button>
      </div>

      {/* 썸네일 네비게이션 */}
      {allMedia.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allMedia.map((media, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-md overflow-hidden border-2 transition-colors ${
                index === currentIndex
                  ? 'border-accent-500'
                  : 'border-secondary-200 hover:border-secondary-300'
              }`}
            >
              {media.type === 'image' && (
                <OptimizedImage
                  src={media.src}
                  alt={media.alt}
                  width={80}
                  height={64}
                  className="w-full h-full object-cover"
                />
              )}
              {media.type === 'video' && (
                <div className="w-full h-full bg-secondary-200 flex items-center justify-center">
                  <Play className="w-4 h-4 text-primary-600" />
                </div>
              )}
              {media.type === '3d' && (
                <div className="w-full h-full bg-secondary-200 flex items-center justify-center">
                  <span className="text-xs text-primary-600">3D</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 전체화면 모달 */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="relative max-w-7xl max-h-full">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <div className="aspect-video">
                {currentMedia.type === 'image' && (
                  <OptimizedImage
                    src={currentMedia.src}
                    alt={currentMedia.alt}
                    width={currentMedia.width}
                    height={currentMedia.height}
                    className="w-full h-full object-contain"
                  />
                )}
                {currentMedia.type === 'video' && (
                  <VideoPlayer
                    src={currentMedia.src}
                    poster={currentMedia.poster}
                    alt={currentMedia.alt}
                    fullscreen
                  />
                )}
                {currentMedia.type === '3d' && (
                  <Model3DViewer
                    src={currentMedia.src}
                    format={currentMedia.format}
                    alt={currentMedia.alt}
                    fullscreen
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ResponsiveMedia
```

### 터치 최적화 컴포넌트
```typescript
// components/portfolio/touch-optimized.tsx
import { useState, useRef, useEffect } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { useResponsive } from '@/utils/responsive'

interface TouchOptimizedProps {
  children: React.ReactNode
  onSwipe?: (direction: 'left' | 'right') => void
  className?: string
}

const TouchOptimized = ({ children, onSwipe, className = '' }: TouchOptimizedProps) => {
  const { isMobile } = useResponsive()
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !isDragging) return
    setCurrentX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!isMobile || !isDragging) return
    
    const diff = startX - currentX
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && onSwipe) {
        onSwipe('left')
      } else if (diff < 0 && onSwipe) {
        onSwipe('right')
      }
    }

    setIsDragging(false)
  }

  const handlePan = (event: any, info: PanInfo) => {
    if (!isMobile) return
    
    const { offset } = info
    const threshold = 100

    if (Math.abs(offset.x) > threshold) {
      if (offset.x > 0 && onSwipe) {
        onSwipe('right')
      } else if (offset.x < 0 && onSwipe) {
        onSwipe('left')
      }
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className={`touch-manipulation ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onPanEnd={handlePan}
      style={{
        touchAction: isMobile ? 'pan-y' : 'auto'
      }}
    >
      {children}
    </motion.div>
  )
}

export default TouchOptimized
```

### 성능 최적화 훅
```typescript
// hooks/use-performance-optimization.ts
import { useState, useEffect, useCallback } from 'react'
import { useResponsive } from '@/utils/responsive'

export const usePerformanceOptimization = () => {
  const { isMobile, isTablet } = useResponsive()
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const [isSlowConnection, setIsSlowConnection] = useState(false)

  // 성능 감지
  useEffect(() => {
    const checkPerformance = () => {
      // 메모리 사용량 확인
      if ('memory' in performance) {
        const memory = (performance as any).memory
        const usedMemory = memory.usedJSHeapSize / memory.jsHeapSizeLimit
        setIsLowPerformance(usedMemory > 0.8)
      }

      // 네트워크 속도 확인
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        if (connection.effectiveType) {
          setIsSlowConnection(['slow-2g', '2g', '3g'].includes(connection.effectiveType))
        }
      }
    }

    checkPerformance()
    const interval = setInterval(checkPerformance, 5000)
    return () => clearInterval(interval)
  }, [])

  // 이미지 품질 최적화
  const getImageQuality = useCallback(() => {
    if (isLowPerformance || isSlowConnection) {
      return 'low'
    } else if (isMobile) {
      return 'medium'
    } else {
      return 'high'
    }
  }, [isLowPerformance, isSlowConnection, isMobile])

  // 애니메이션 최적화
  const getAnimationSettings = useCallback(() => {
    if (isLowPerformance) {
      return {
        duration: 0.3,
        ease: 'easeOut'
      }
    } else {
      return {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }, [isLowPerformance])

  // 지연 로딩 설정
  const getLazyLoadingSettings = useCallback(() => {
    if (isSlowConnection) {
      return {
        threshold: 0.1,
        rootMargin: '50px'
      }
    } else {
      return {
        threshold: 0.5,
        rootMargin: '100px'
      }
    }
  }, [isSlowConnection])

  return {
    isLowPerformance,
    isSlowConnection,
    getImageQuality,
    getAnimationSettings,
    getLazyLoadingSettings
  }
}
```

## 테스트 기준 (Testing Criteria)

### 반응형 디자인 테스트
- **브레이크포인트**: 모든 브레이크포인트에서 레이아웃 확인
- **그리드 시스템**: 다양한 화면 크기에서 그리드 동작 확인
- **네비게이션**: 모바일에서 터치 네비게이션 확인
- **미디어**: 이미지, 비디오, 3D 모델의 반응형 동작 확인

### 성능 테스트
- **로딩 시간**: 각 디바이스별 로딩 시간 측정
- **메모리 사용량**: 모바일에서 메모리 사용량 확인
- **애니메이션 성능**: 저성능 디바이스에서 애니메이션 성능 확인
- **네트워크 최적화**: 느린 네트워크에서의 동작 확인

### 접근성 테스트
- **터치 접근성**: 터치 타겟 크기 및 간격 확인
- **키보드 네비게이션**: 모든 디바이스에서 키보드 지원 확인
- **스크린 리더**: 모든 화면 크기에서 스크린 리더 지원 확인
- **색상 대비**: 모든 디바이스에서 색상 대비 확인

## 예상 소요 시간 (Estimated Time)
- **개발**: 3-4일
- **테스트**: 1-2일
- **총 소요 시간**: 4-6일

## 의존성 (Dependencies)
- Story 2.1: 포트폴리오 데이터 구조 정의 및 목록 페이지 기본 구현
- Story 2.2: 동적 상세 페이지 구현 및 라우팅
- Story 2.3: 'The Architect + Tactile' 디자인 시스템 적용

## 위험 요소 (Risks)
- **성능 이슈**: 복잡한 반응형 레이아웃으로 인한 성능 저하
- **터치 인터페이스**: 다양한 터치 디바이스에서의 일관성 문제
- **미디어 최적화**: 다양한 디바이스에서 미디어 로딩 이슈
- **접근성**: 반응형 디자인과 접근성 간의 균형 