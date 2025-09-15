'use client'

import { useRef, useEffect } from 'react'
import { Badge } from '@/components/primitives/Badge'
import { PortfolioCard } from '@/components/portfolio/portfolio-card'
import { TechScroll } from '@/components/ui/tech-scroll'
import { PortfolioProject } from '@/types/portfolio'
import { Star, Globe, Code, Award, ChevronRight } from 'lucide-react'

interface PortfolioListClientProps {
  projects: PortfolioProject[]
}

export function PortfolioListClient({ projects }: PortfolioListClientProps) {
  // 애니메이션을 위한 ref들
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const techScrollRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  // 주요 기술 스택 목록
  const techStacks = [
    'Three.js', 'Unity', 'WebXR', 'React', 'TypeScript', 
    'ARKit', 'ARCore', 'C#', 'WebGL', 'A-Frame',
    'Vuforia', 'iOS', 'Android', 'JavaScript', 'HTML5'
  ]

  // Intersection Observer를 사용한 스크롤 애니메이션
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, observerOptions)

    // 각 섹션에 observer 추가
    const sections = [heroRef.current, statsRef.current, techScrollRef.current, projectsRef.current]
    sections.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Portfolio Hero Section - 포트폴리오 전용 디자인 */}
      <div 
        ref={heroRef}
        className="relative h-screen md:h-[90vh] lg:h-[85vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 animate-hero-content"
      >
        {/* 동적 배경 요소 */}
        <div className="absolute inset-0">
          {/* 점 패턴 배경 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80"></div>
          
          {/* 움직이는 배경 요소들 */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-slate-600/30 to-slate-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-slate-500/30 to-slate-400/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-slate-500/30 to-slate-600/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* 추가 장식 요소들 */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-slate-300/10 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-slate-300/10 rounded-full animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
          
          {/* 선형 장식 */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-slate-400/50 to-transparent"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-slate-400/50 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <div className="text-center">
            {/* 메인 헤드라인 */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 dark:text-slate-100 mb-4 md:mb-6 tracking-tighter leading-tight">
                PORTFOLIO
              </h1>
              <div className="w-20 md:w-24 lg:w-32 h-0.5 md:h-1 bg-gradient-to-r from-slate-400 to-slate-300 mx-auto rounded-full"></div>
            </div>

            {/* 서브헤드라인 */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-slate-300 mb-8 md:mb-12 lg:mb-16 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
              혁신적인 <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400 font-bold">3D/AR/WebXR</span> 프로젝트들의{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400 font-bold">창의적 여정</span>을 확인하세요
            </p>

            {/* 프로젝트 카테고리 미리보기 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 lg:mb-16 px-4">
              <div className="relative bg-white/10 dark:bg-slate-800/10 backdrop-blur-lg border border-gray-200/20 dark:border-slate-700/20 rounded-2xl p-6 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-all duration-300 group overflow-hidden">
                {/* 카드 배경 효과 */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600/5 to-slate-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-slate-600 to-slate-500 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Globe className="w-6 h-6 md:w-8 md:h-8 text-gray-900 dark:text-slate-100" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-slate-100 mb-1 md:mb-2">3D 컨피규레이터</h3>
                  <p className="text-gray-600 dark:text-slate-300 text-xs md:text-sm">인터랙티브 제품 구성 도구</p>
                </div>
              </div>
              
              <div className="relative bg-white/10 dark:bg-slate-800/10 backdrop-blur-lg border border-gray-200/20 dark:border-slate-700/20 rounded-2xl p-6 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-all duration-300 group overflow-hidden">
                {/* 카드 배경 효과 */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-slate-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-slate-500 to-slate-400 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Code className="w-6 h-6 md:w-8 md:h-8 text-gray-900 dark:text-slate-100" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-slate-100 mb-1 md:mb-2">AR 애플리케이션</h3>
                  <p className="text-gray-600 dark:text-slate-300 text-xs md:text-sm">증강현실 체험 솔루션</p>
                </div>
              </div>
              
              <div className="relative bg-white/10 dark:bg-slate-800/10 backdrop-blur-lg border border-gray-200/20 dark:border-slate-700/20 rounded-2xl p-6 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-all duration-300 group overflow-hidden">
                {/* 카드 배경 효과 */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-slate-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-slate-500 to-slate-400 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-gray-900 dark:text-slate-100" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-slate-100 mb-1 md:mb-2">WebXR 갤러리</h3>
                  <p className="text-gray-600 dark:text-slate-300 text-xs md:text-sm">웹 기반 VR/AR 경험</p>
                </div>
              </div>
            </div>

            {/* 통계 */}
            <div 
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 pt-6 md:pt-8 border-t border-slate-700/20 animate-stats-section px-4"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-1 md:mb-2">{projects.length}</div>
                <p className="text-slate-400 text-xs md:text-sm font-medium">총 프로젝트</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-1 md:mb-2">12</div>
                <p className="text-slate-400 text-xs md:text-sm font-medium">기술 스택</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-1 md:mb-2">100%</div>
                <p className="text-slate-400 text-xs md:text-sm font-medium">성공률</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-1 md:mb-2">24/7</div>
                <p className="text-slate-400 text-xs md:text-sm font-medium">지원</p>
              </div>
            </div>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-300/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-300/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* 기술 스택 스크롤 섹션 */}
      <div className="py-4 md:py-6 lg:py-8 bg-gray-50 dark:bg-slate-800">
        <div className="w-full">
          <div 
            ref={techScrollRef}
            className="animate-filters-section"
          >
            <TechScroll 
              technologies={techStacks} 
              speed={0.5}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* 프로젝트 목록 섹션 */}
      <div className="py-8 md:py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          {/* 프로젝트 그리드 - The Architect 그리드 시스템 */}
          {projects.length > 0 ? (
            <div 
              ref={projectsRef}
              className="grid gap-4 md:gap-6 lg:gap-8 xl:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-projects-section"
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PortfolioCard
                    project={project}
                    index={index}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16 lg:py-20 animate-fade-in">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-gray-200/20 dark:border-slate-700/20 shadow-xl rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 max-w-sm md:max-w-md mx-auto">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-blue-500/60 dark:bg-slate-700/60 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-md">
                  <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-2 md:mb-3">
                  프로젝트를 찾을 수 없습니다
                </h3>
                <p className="text-gray-600 dark:text-slate-300 mb-6 md:mb-8 text-sm md:text-base lg:text-lg">
                  현재 표시할 프로젝트가 없습니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 