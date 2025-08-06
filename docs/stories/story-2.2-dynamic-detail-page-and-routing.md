# Story 2.2: 동적 상세 페이지 구현 및 라우팅

## 개요 (Overview)
포트폴리오 프로젝트의 상세 정보를 표시하는 동적 페이지를 구현하고, Next.js의 동적 라우팅을 활용하여 각 프로젝트별 고유 URL을 제공합니다. 이 스토리는 사용자가 프로젝트의 성공 스토리를 깊이 있게 탐색할 수 있는 경험을 제공합니다.

## 기능적 요구사항 (Functional Requirements)

### 동적 라우팅 구현
- **동적 라우트** (`/portfolio/[id]`) 구현
- **프로젝트 ID 기반** 페이지 생성
- **404 에러 처리**: 존재하지 않는 프로젝트에 대한 처리
- **SEO 최적화**: 각 프로젝트별 메타데이터 설정

### 상세 페이지 콘텐츠
- **프로젝트 헤더 섹션**
  - 프로젝트 제목, 설명, 카테고리
  - 기술 스택 배지 표시
  - 프로젝트 기간, 팀 규모, 역할 정보
  - 외부 링크 (데모, GitHub, 케이스 스터디)

- **프로젝트 갤러리**
  - 고화질 이미지 슬라이더
  - 비디오 콘텐츠 재생
  - 3D 모델 뷰어 (WebGL 기반)
  - 이미지 확대/축소 기능

- **프로젝트 상세 정보**
  - 프로젝트 배경 및 목표
  - 해결한 문제점
  - 적용된 기술 및 솔루션
  - 프로젝트 성과 및 결과
  - 팀 구성 및 역할 분담

- **기술 스택 상세**
  - 사용된 기술별 상세 설명
  - 기술 선택 이유
  - 구현 과정에서의 도전과 해결책

- **프로젝트 성과**
  - 정량적 성과 지표
  - 고객 피드백 및 만족도
  - 기술적 성과 (성능 개선, 안정성 등)

### 인터랙티브 기능
- **이미지 갤러리**: 슬라이더, 확대/축소, 전체화면 모드
- **3D 모델 뷰어**: 회전, 확대/축소, 애니메이션 컨트롤
- **비디오 플레이어**: 재생/일시정지, 볼륨 조절, 전체화면
- **소셜 공유**: 프로젝트 페이지 공유 기능

### 네비게이션
- **브레드크럼**: 포트폴리오 > 프로젝트명
- **이전/다음 프로젝트**: 관련 프로젝트 추천
- **목록으로 돌아가기**: 포트폴리오 목록 페이지 링크

## 비기능적 요구사항 (Non-Functional Requirements)

### 성능 (Performance)
- **페이지 로딩 시간**: 3초 이내
- **이미지 최적화**: WebP/AVIF 포맷, 지연 로딩
- **3D 모델 로딩**: GLTF/GLB 포맷 최적화
- **비디오 스트리밍**: 적응형 비트레이트

### 접근성 (Accessibility)
- **WCAG AA 준수**: 키보드 네비게이션, 스크린 리더 지원
- **미디어 접근성**: 비디오 자막, 이미지 대체 텍스트
- **3D 뷰어 접근성**: 키보드 컨트롤, 스크린 리더 설명

### 반응형 디자인 (Responsive Design)
- **모바일**: 세로 레이아웃, 터치 친화적 인터페이스
- **태블릿**: 중간 크기 레이아웃
- **데스크톱**: 전체 레이아웃, 사이드바 네비게이션
- **대형 화면**: 와이드 레이아웃, 고해상도 이미지

## 기술적 세부사항 (Technical Details)

### 필요한 패키지
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "typescript": "^5.0.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.292.0",
    "react-image-gallery": "^1.3.0",
    "three": "^0.158.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "react-player": "^2.13.0",
    "next-seo": "^6.4.0"
  }
}
```

### 동적 라우팅 구현
```typescript
// pages/portfolio/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Calendar, Users, Award } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectGallery } from '@/components/portfolio/project-gallery'
import { ProjectDetails } from '@/components/portfolio/project-details'
import { TechnologyStack } from '@/components/portfolio/technology-stack'
import { ProjectAchievements } from '@/components/portfolio/project-achievements'
import { RelatedProjects } from '@/components/portfolio/related-projects'
import { portfolioProjects } from '@/data/portfolio'
import type { PortfolioProject } from '@/types/portfolio'

interface ProjectPageProps {
  project: PortfolioProject
  relatedProjects: PortfolioProject[]
}

const ProjectPage = ({ project, relatedProjects }: ProjectPageProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Container>
        {/* 브레드크럼 네비게이션 */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-6"
        >
          <div className="flex items-center gap-2 text-sm text-primary-600">
            <a href="/portfolio" className="hover:text-accent-600 transition-colors">
              포트폴리오
            </a>
            <span>/</span>
            <span className="text-primary-900">{project.title}</span>
          </div>
        </motion.nav>

        {/* 프로젝트 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 프로젝트 정보 */}
            <div>
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  {getCategoryLabel(project.category)}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                  {project.title}
                </h1>
                <p className="text-lg text-primary-600 mb-8">
                  {project.description}
                </p>
              </div>

              {/* 프로젝트 메타 정보 */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2 text-primary-600">
                  <Calendar className="w-5 h-5" />
                  <span>{project.duration.start} - {project.duration.end}</span>
                </div>
                <div className="flex items-center gap-2 text-primary-600">
                  <Users className="w-5 h-5" />
                  <span>팀 {project.teamSize}명</span>
                </div>
                <div className="flex items-center gap-2 text-primary-600">
                  <Award className="w-5 h-5" />
                  <span>{project.role}</span>
                </div>
              </div>

              {/* 기술 스택 미리보기 */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">사용 기술</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 5 && (
                    <Badge variant="secondary">
                      +{project.technologies.length - 5}
                    </Badge>
                  )}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex flex-col sm:flex-row gap-4">
                {project.externalLinks.demo && (
                  <Button size="lg" className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    라이브 데모 보기
                  </Button>
                )}
                <Button size="lg" variant="secondary">
                  프로젝트 자세히 보기
                </Button>
              </div>
            </div>

            {/* 프로젝트 썸네일 */}
            <div className="relative">
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
          className="mb-16"
        >
          <ProjectGallery project={project} />
        </motion.div>

        {/* 프로젝트 상세 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <ProjectDetails project={project} />
        </motion.div>

        {/* 기술 스택 상세 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <TechnologyStack project={project} />
        </motion.div>

        {/* 프로젝트 성과 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <ProjectAchievements project={project} />
        </motion.div>

        {/* 관련 프로젝트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <RelatedProjects projects={relatedProjects} currentProjectId={project.id} />
        </motion.div>
      </Container>
    </div>
  )
}

// 정적 경로 생성
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = portfolioProjects.map((project) => ({
    params: { id: project.id },
  }))

  return {
    paths,
    fallback: false, // 404 페이지로 리다이렉트
  }
}

// 정적 props 생성
export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ params }) => {
  const projectId = params?.id as string
  const project = portfolioProjects.find(p => p.id === projectId)

  if (!project) {
    return {
      notFound: true,
    }
  }

  // 관련 프로젝트 찾기 (같은 카테고리 또는 기술 스택)
  const relatedProjects = portfolioProjects
    .filter(p => p.id !== projectId)
    .filter(p => 
      p.category === project.category ||
      p.technologies.some(tech => project.technologies.includes(tech))
    )
    .slice(0, 3)

  return {
    props: {
      project,
      relatedProjects,
    },
    revalidate: 3600, // 1시간마다 재생성
  }
}

export default ProjectPage
```

### 프로젝트 갤러리 컴포넌트
```typescript
// components/portfolio/project-gallery.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { Model3DViewer } from '@/components/portfolio/model-3d-viewer'
import { VideoPlayer } from '@/components/portfolio/video-player'
import type { PortfolioProject } from '@/types/portfolio'

interface ProjectGalleryProps {
  project: PortfolioProject
}

const ProjectGallery = ({ project }: ProjectGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const allMedia = [
    ...project.images.map((img, index) => ({ ...img, type: 'image' as const, index })),
    ...(project.videos?.map((video, index) => ({ ...video, type: 'video' as const, index })) || []),
    ...(project.models3d?.map((model, index) => ({ ...model, type: '3d' as const, index })) || [])
  ]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }

  const currentMedia = allMedia[currentIndex]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary-900">프로젝트 갤러리</h2>
      
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
                width={currentMedia.width}
                height={currentMedia.height}
                className="w-full h-full object-cover"
                priority
              />
            )}
            
            {currentMedia.type === 'video' && (
              <VideoPlayer
                src={currentMedia.src}
                poster={currentMedia.poster}
                alt={currentMedia.alt}
              />
            )}
            
            {currentMedia.type === '3d' && (
              <Model3DViewer
                src={currentMedia.src}
                format={currentMedia.format}
                alt={currentMedia.alt}
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
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
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
          className="absolute top-4 right-4 bg-white/80 hover:bg-white"
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
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
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
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="relative max-w-7xl max-h-full p-4">
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

export default ProjectGallery
```

### 3D 모델 뷰어 컴포넌트
```typescript
// components/portfolio/model-3d-viewer.tsx
import { useRef, useEffect, useState } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PresentationControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface Model3DViewerProps {
  src: string
  format: 'gltf' | 'glb' | 'obj'
  alt: string
  fullscreen?: boolean
}

const Model3D = ({ src }: { src: string }) => {
  const gltf = useLoader(GLTFLoader, src)
  const meshRef = useRef<THREE.Mesh>(null)
  const [isAnimating, setIsAnimating] = useState(true)

  useFrame((state) => {
    if (meshRef.current && isAnimating) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <>
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <primitive object={gltf.scene} ref={meshRef} />
      </PresentationControls>
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </>
  )
}

const Model3DViewer = ({ src, format, alt, fullscreen = false }: Model3DViewerProps) => {
  const [isAnimating, setIsAnimating] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
  }, [src])

  return (
    <div className={`relative bg-secondary-100 rounded-lg overflow-hidden ${
      fullscreen ? 'w-full h-full' : 'aspect-video'
    }`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-600"></div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={() => setIsLoading(false)}
        className="w-full h-full"
      >
        <Model3D src={src} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>

      {/* 컨트롤 버튼 */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsAnimating(!isAnimating)}
          className="bg-white/80 hover:bg-white"
        >
          {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            // 카메라 리셋 로직
          }}
          className="bg-white/80 hover:bg-white"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default Model3DViewer
```

### 비디오 플레이어 컴포넌트
```typescript
// components/portfolio/video-player.tsx
import { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VideoPlayerProps {
  src: string
  poster: string
  alt: string
  fullscreen?: boolean
}

const VideoPlayer = ({ src, poster, alt, fullscreen = false }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* 컨트롤 오버레이 */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* 프로그레스 바 */}
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer mb-2"
          style={{
            background: `linear-gradient(to right, white 0%, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`
          }}
        />
        
        {/* 컨트롤 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleMute}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
```

### 프로젝트 상세 정보 컴포넌트
```typescript
// components/portfolio/project-details.tsx
import { motion } from 'framer-motion'
import { Target, Users, Calendar, Award } from 'lucide-react'
import type { PortfolioProject } from '@/types/portfolio'

interface ProjectDetailsProps {
  project: PortfolioProject
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary-900">프로젝트 상세 정보</h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 프로젝트 배경 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-primary-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent-600" />
            프로젝트 배경
          </h3>
          <p className="text-primary-600 leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* 팀 구성 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-primary-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-accent-600" />
            팀 구성
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-primary-600">팀 규모</span>
              <span className="font-semibold text-primary-900">{project.teamSize}명</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary-600">내 역할</span>
              <span className="font-semibold text-primary-900">{project.role}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary-600">프로젝트 기간</span>
              <span className="font-semibold text-primary-900">
                {project.duration.start} - {project.duration.end}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 주요 성과 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-primary-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-accent-600" />
          주요 성과
        </h3>
        <ul className="space-y-2">
          {project.achievements.map((achievement, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-primary-600">{achievement}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default ProjectDetails
```

## 테스트 기준 (Testing Criteria)

### 단위 테스트
- **동적 라우팅**: 올바른 프로젝트 ID로 페이지 렌더링
- **404 처리**: 존재하지 않는 프로젝트에 대한 처리
- **컴포넌트 렌더링**: 각 컴포넌트의 정상 렌더링 확인
- **미디어 로딩**: 이미지, 비디오, 3D 모델 로딩 테스트

### 통합 테스트
- **페이지 네비게이션**: 목록에서 상세 페이지 이동
- **미디어 인터랙션**: 갤러리 슬라이더, 3D 뷰어, 비디오 플레이어
- **반응형 디자인**: 다양한 화면 크기에서 레이아웃 확인
- **접근성**: 키보드 네비게이션, 스크린 리더 지원

### 성능 테스트
- **페이지 로딩**: 상세 페이지 로딩 시간 확인
- **미디어 최적화**: 이미지, 비디오, 3D 모델 성능 확인
- **메모리 사용량**: 3D 뷰어 메모리 누수 확인

## 예상 소요 시간 (Estimated Time)
- **개발**: 4-5일
- **테스트**: 1-2일
- **총 소요 시간**: 5-7일

## 의존성 (Dependencies)
- Story 2.1: 포트폴리오 데이터 구조 정의 및 목록 페이지 기본 구현

## 위험 요소 (Risks)
- **3D 모델 성능**: 복잡한 3D 모델로 인한 성능 저하
- **비디오 스트리밍**: 대용량 비디오 파일 로딩 이슈
- **미디어 최적화**: 다양한 미디어 포맷 지원 복잡성
- **접근성**: 3D 뷰어와 비디오 플레이어의 접근성 구현 