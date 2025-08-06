// src/app/portfolio/page.tsx
import { Badge } from '@/components/ui/badge'
import { PortfolioCard } from '@/components/portfolio/portfolio-card'
import { TechScroll } from '@/components/ui/tech-scroll'
import { portfolioProjects } from '@/data/portfolio'
import { Star, Globe, Code, Award } from 'lucide-react'

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

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 히어로 섹션 */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6">
              3D/AR/WebXR
              <span className="block text-blue-400">포트폴리오</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              혁신적인 3D, AR, WebXR 프로젝트들의 창의적 여정을 확인하세요. 
              인터랙티브 3D 컨피규레이터부터 증강현실 애플리케이션, 
              웹 기반 VR 갤러리까지 다양한 프로젝트를 소개합니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="primary" className="text-lg px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                추천 프로젝트
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                웹 기반
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Code className="w-4 h-4 mr-2" />
                최신 기술
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {portfolioProjects.length}
              </div>
              <div className="text-slate-300">총 프로젝트</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                {portfolioProjects.filter(p => p.featured).length}
              </div>
              <div className="text-slate-300">추천 프로젝트</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                {new Set(portfolioProjects.map(p => p.category)).size}
              </div>
              <div className="text-slate-300">카테고리</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
                {portfolioProjects.reduce((sum, p) => sum + p.teamSize, 0)}
              </div>
              <div className="text-slate-300">총 참여 인원</div>
            </div>
          </div>
        </div>
      </section>

      {/* 기술 스택 스크롤 */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 text-center mb-8">
            주요 기술 스택
          </h2>
          <TechScroll technologies={techStacks} />
        </div>
      </section>

      {/* 프로젝트 목록 */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
              프로젝트 갤러리
            </h2>
            <div className="flex items-center text-slate-400">
              <Award className="w-5 h-5 mr-2" />
              <span className="text-sm">최신순 정렬</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}