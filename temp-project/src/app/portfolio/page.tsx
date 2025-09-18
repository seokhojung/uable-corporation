'use client'

// src/app/portfolio/page.tsx
import { PortfolioCard } from '@/components/portfolio/portfolio-card'
import { TechScroll } from '@/components/ui/tech-scroll'
import { ImageOverlayStack } from '@/components/ui/image-overlay-stack'
import { ProductsSection } from '@/components/products/products-section'
import { portfolioProjects } from '@/data/portfolio'
import { Star, Award } from 'lucide-react'
import { Button } from '@/components/primitives/Button'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function PortfolioPage() {
  // 테마 시스템 사용
  const { theme } = useTheme()

  // 프로젝트 정렬 (추천 프로젝트 우선)
  const sortedProjects = [...portfolioProjects].sort((a, b) => {
    // 추천 프로젝트를 먼저 표시
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    
    // 그 다음 최신순
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  // 주요 기술 스택 목록
  const techStacks = [
    'Three.js', 'Unity', 'WebXR', 'React', 'TypeScript', 
    'ARKit', 'ARCore', 'WebGL', 'A-Frame', 'C#', 'iOS', 'Android'
  ]

  // 애니메이션을 위한 ref들
  const heroContentRef = useRef<HTMLDivElement>(null)
  const techCardsRef = useRef<HTMLDivElement>(null)
  const productsSectionRef = useRef<HTMLDivElement>(null)
  const projectsHeaderRef = useRef<HTMLDivElement>(null)
  const projectsCardsRef = useRef<HTMLDivElement>(null)

  // 공간 투어 이미지 데이터
  const spaceTourProject = portfolioProjects.find(p => p.id === 'interactive-space-tour')
  const spaceTourImages = spaceTourProject?.images.slice(0, 4) || []

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

    const sections = [
      heroContentRef.current,
      techCardsRef.current,
      productsSectionRef.current,
      projectsHeaderRef.current,
      projectsCardsRef.current
    ]
    
    sections.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className={
      theme === 'light' ? 'min-h-screen bg-white' :
      theme === 'dark' ? 'min-h-screen bg-slate-900' :
      theme === 'brand' ? 'min-h-screen bg-custom-bg-100' :
      'min-h-screen bg-white'
    }>
      {/* 히어로 섹션 */}
      <section className={`relative min-h-screen md:h-[90vh] lg:h-[85vh] flex items-center justify-center overflow-hidden md:pt-0 ${
        theme === 'light' ? 'bg-gradient-to-br from-gray-50 via-white to-gray-50' :
        theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' :
        theme === 'brand' ? 'bg-gradient-to-r from-custom-bg-100 via-custom-bg-100 to-custom-bg-200' :
        'bg-gray-50'
      }`}>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 텍스트 콘텐츠 */}
            <div ref={heroContentRef} className="text-center lg:text-left animate-hero-content">
            {/* 배지 */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 ${
              theme === 'light' ? 'bg-gray-200 text-gray-800' :
              theme === 'dark' ? 'bg-slate-700 text-slate-200' :
              theme === 'brand' ? 'bg-primary-100/10 text-primary-200' :
              'bg-gray-200 text-gray-800'
            }`}>
              <Star className="w-4 h-4 mr-2" />
              프로젝트 포트폴리오
            </div>

            {/* 메인 헤드라인 */}
            <h1 className={`text-4xl lg:text-6xl xl:text-6xl font-bold mb-8 leading-tight ${
              theme === 'light' ? 'text-gray-900' :
              theme === 'dark' ? 'text-slate-100' :
              theme === 'brand' ? 'text-custom-text-100' :
              'text-gray-900'
            }`}>
              Uable의 3D/AR/WebXR
              <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                theme === 'light' ? 'from-green-600 to-teal-600' :
                theme === 'dark' ? 'from-slate-300 to-slate-400' :
                theme === 'brand' ? 'from-primary-100 to-accent-100' :
                'from-green-600 to-teal-600'
              }`}>
                프로젝트 사례를 직접 확인해보세요
              </span>
            </h1>

            {/* 서브헤드라인 */}
            <p className={`text-xl lg:text-2xl mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed ${
              theme === 'light' ? 'text-gray-600' :
              theme === 'dark' ? 'text-slate-300' :
              theme === 'brand' ? 'text-custom-text-200' :
              'text-gray-600'
            }`}>
              인터랙티브 3D 컨피규레이터부터 증강현실 애플리케이션,
              <br />웹 기반 VR 갤러리까지 다양한 프로젝트를 소개합니다.
            </p>

            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button
                size="lg"
                onClick={() => {
                  const projectsSection = document.querySelector('[data-projects-gallery]')
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className={`text-lg px-16 py-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === 'light' ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-green-500/25 hover:shadow-green-500/30' :
                  theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25 hover:shadow-blue-500/30' :
                  theme === 'brand' ? 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100 shadow-primary-100/25 hover:shadow-primary-100/30' :
                  'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-green-500/25 hover:shadow-green-500/30'
                }`}
              >
                프로젝트 갤러리 보기
              </Button>

              <Button variant="outline" asChild size="lg" className={`text-lg px-12 py-4 ${
                theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-100' :
                theme === 'dark' ? 'border-slate-600 text-slate-200 hover:bg-slate-700' :
                theme === 'brand' ? 'border-primary-100/30 text-custom-text-100 hover:bg-custom-bg-300' :
                'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}>
                <a href="/webgl">
                  WebGL 체험하기
                </a>
              </Button>
            </div>

            {/* 통계 */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t ${
              theme === 'light' ? 'border-gray-200' :
              theme === 'dark' ? 'border-slate-700' :
              theme === 'brand' ? 'border-primary-100/20' :
              'border-gray-200'
            }`}>
              <div className="text-center">
                <div className={`text-3xl lg:text-4xl font-bold mb-2 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  {portfolioProjects.length}
                </div>
                <p className={`text-sm font-medium ${
                  theme === 'light' ? 'text-gray-600' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-600'
                }`}>총 프로젝트</p>
              </div>
              <div className="text-center">
                <div className={`text-3xl lg:text-4xl font-bold mb-2 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  {portfolioProjects.filter(p => p.featured).length}
                </div>
                <p className={`text-sm font-medium ${
                  theme === 'light' ? 'text-gray-600' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-600'
                }`}>추천 프로젝트</p>
              </div>
              <div className="text-center">
                <div className={`text-3xl lg:text-4xl font-bold mb-2 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  {new Set(portfolioProjects.map(p => p.category)).size}
                </div>
                <p className={`text-sm font-medium ${
                  theme === 'light' ? 'text-gray-600' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-600'
                }`}>카테고리</p>
              </div>
              <div className="text-center">
                <div className={`text-3xl lg:text-4xl font-bold mb-2 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  {portfolioProjects.reduce((sum, p) => sum + p.teamSize, 0)}
                </div>
                <p className={`text-sm font-medium ${
                  theme === 'light' ? 'text-gray-600' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-600'
                }`}>총 참여 인원</p>
              </div>
            </div>
            </div>

            {/* 이미지 오버레이 스택 */}
            <ImageOverlayStack images={spaceTourImages} />
          </div>

        </div>
      </section>



      {/* 기술 스택 스크롤 */}
      <section className={`py-12 ${
        theme === 'light' ? 'bg-white' :
        theme === 'dark' ? 'bg-slate-900' :
        theme === 'brand' ? 'bg-gradient-to-r from-custom-bg-100 via-custom-bg-100 to-custom-bg-200' :
        'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={techCardsRef} className="animate-service-cards">
            <TechScroll technologies={techStacks} />
          </div>
        </div>
      </section>

      {/* 자체 제품 섹션 */}
      <section className={`py-16 ${
        theme === 'light' ? 'bg-gray-50' :
        theme === 'dark' ? 'bg-slate-800' :
        theme === 'brand' ? 'bg-gradient-to-r from-custom-bg-100 via-custom-bg-100 to-custom-bg-200' :
        'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={productsSectionRef} className="animate-service-cards">
            <ProductsSection
              title="우리의 핵심 제품"
              description={`유에이블 코퍼레이션이 완성한 자체 제품들을 소개합니다.
실제 고객들이 사용하고 검증받은 혁신적인 3D 솔루션입니다.`}
            />
          </div>
        </div>
      </section>

      {/* 프로젝트 목록 */}
      <section className={`py-16 ${
        theme === 'light' ? 'bg-gray-50' :
        theme === 'dark' ? 'bg-slate-800' :
        theme === 'brand' ? 'bg-gradient-to-r from-custom-bg-100 via-custom-bg-100 to-custom-bg-200' :
        'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={projectsHeaderRef} className="flex items-center justify-between mb-12 animate-service-header" data-projects-gallery>
            <h2 className={`text-3xl md:text-4xl font-bold ${
              theme === 'light' ? 'text-gray-900' :
              theme === 'dark' ? 'text-slate-100' :
              theme === 'brand' ? 'text-custom-text-100' :
              'text-gray-900'
            }`}>
              프로젝트 갤러리
            </h2>
            <div className={`flex items-center ${
              theme === 'light' ? 'text-gray-600' :
              theme === 'dark' ? 'text-slate-300' :
              theme === 'brand' ? 'text-custom-text-200' :
              'text-gray-600'
            }`}>
              <Award className="w-5 h-5 mr-2" />
              <span className="text-sm">최신순 정렬</span>
            </div>
          </div>
          
          <div ref={projectsCardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-service-cards">
            {sortedProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}