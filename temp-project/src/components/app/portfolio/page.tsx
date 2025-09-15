'use client'

// src/app/portfolio/page.tsx
import { PortfolioCard } from '@/components/portfolio/portfolio-card'
import { TechScroll } from '@/components/ui/tech-scroll'
import { portfolioProjects } from '@/data/portfolio'
import { Star, Award } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function PortfolioPage() {
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
  const projectsHeaderRef = useRef<HTMLDivElement>(null)
  const projectsCardsRef = useRef<HTMLDivElement>(null)

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
      projectsHeaderRef.current,
      projectsCardsRef.current
    ]
    
    sections.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 히어로 섹션 - 메인 페이지와 동일한 스타일 */}
      <section className="relative min-h-screen md:h-[90vh] lg:h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          <div ref={heroContentRef} className="text-center animate-hero-content">
            {/* 배지 */}
            <div className="inline-flex items-center px-4 py-2 bg-slate-700 text-slate-200 rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              프로젝트 포트폴리오
            </div>

            {/* 메인 헤드라인 */}
            <h1 className="text-4xl lg:text-6xl xl:text-6xl font-bold text-slate-100 mb-8 leading-tight">
              Uable의 3D/AR/WebXR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400">
                프로젝트 사례를 직접 확인해보세요
              </span>
            </h1>

            {/* 서브헤드라인 */}
            <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              인터랙티브 3D 컨피규레이터부터 증강현실 애플리케이션, 
              웹 기반 VR 갤러리까지 다양한 프로젝트를 소개합니다.
            </p>

            {/* 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-700 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-slate-100 mb-2">
                  {portfolioProjects.length}
                </div>
                <p className="text-sm text-slate-300 font-medium">총 프로젝트</p>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-slate-100 mb-2">
                  {portfolioProjects.filter(p => p.featured).length}
                </div>
                <p className="text-sm text-slate-300 font-medium">추천 프로젝트</p>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-slate-100 mb-2">
                  {new Set(portfolioProjects.map(p => p.category)).size}
                </div>
                <p className="text-sm text-slate-300 font-medium">카테고리</p>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-slate-100 mb-2">
                  {portfolioProjects.reduce((sum, p) => sum + p.teamSize, 0)}
                </div>
                <p className="text-sm text-slate-300 font-medium">총 참여 인원</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 기술 스택 스크롤 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={techCardsRef} className="animate-service-cards">
            <TechScroll technologies={techStacks} />
          </div>
        </div>
      </section>

      {/* 프로젝트 목록 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={projectsHeaderRef} className="flex items-center justify-between mb-12 animate-service-header">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
              프로젝트 갤러리
            </h2>
            <div className="flex items-center text-slate-400">
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
    </div>
  )
}