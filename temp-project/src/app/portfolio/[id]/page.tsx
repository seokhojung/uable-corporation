// src/app/portfolio/[id]/page.tsx
'use client'

import { notFound } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Globe, Mail, Calendar, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { portfolioProjects } from '@/data/portfolio'
import { PortfolioProject } from '@/types/portfolio'
import { PORTFOLIO_CATEGORIES } from '@/types/portfolio'

interface PortfolioDetailPageProps {
  params: {
    id: string
  }
}

export default function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState<PortfolioProject | null>(() => {
    return portfolioProjects.find(p => p.id === params.id) || null
  })

  // 애니메이션을 위한 ref들
  const headerRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)
  const relatedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const foundProject = portfolioProjects.find(p => p.id === params.id)
    if (foundProject !== project) {
      setProject(foundProject || null)
    }
    setIsLoading(false)
  }, [params.id, project])

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

    const sections = [headerRef.current, achievementsRef.current, relatedRef.current]
    sections.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400"></div>
      </div>
    )
  }

  if (!project) {
    notFound()
  }

  const category = PORTFOLIO_CATEGORIES.find(cat => cat.value === project.category)
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* 상단 네비게이션 */}
      <section className="bg-slate-800 border-b border-slate-700">
        <Container>
          <div className="py-4">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-slate-300 hover:text-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              포트폴리오로 돌아가기
            </Link>
          </div>
        </Container>
      </section>

      {/* 프로젝트 헤더 */}
      <section ref={headerRef} className="py-12 bg-gradient-to-br from-slate-900 to-slate-800 animate-slideUp">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* 프로젝트 정보 */}
            <div>
              <div className="mb-4">
                <Badge variant="primary" className="mb-2">
                  {category?.label}
                </Badge>
                {project.featured && (
                  <Badge variant="outline" className="ml-2">
                    <Award className="w-3 h-3 mr-1" />
                    추천 프로젝트
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4">
                {project.title}
              </h1>
              
              <p className="text-lg text-slate-300 mb-6">
                {project.description}
              </p>

              {/* 프로젝트 메타 정보 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-slate-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {project.duration.start} - {project.duration.end}
                  </span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    팀 {project.teamSize}명
                  </span>
                </div>
              </div>

              {/* 역할 */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-100 mb-2">담당 역할</h3>
                <p className="text-slate-300">{project.role}</p>
              </div>

              {/* 기술 스택 */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-100 mb-3">사용 기술</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 링크 버튼들 */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="primary" 
                  disabled={!project.links.demo}
                  className={!project.links.demo ? "opacity-60 cursor-not-allowed" : ""}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  데모 보기
                  {!project.links.demo && <span className="ml-2 text-xs">(준비중)</span>}
                </Button>
                
                <Button 
                  variant="outline"
                  disabled={!project.links.contact}
                  className={!project.links.contact ? "opacity-60 cursor-not-allowed" : ""}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  문의하기
                  {!project.links.contact && <span className="ml-2 text-xs">(준비중)</span>}
                </Button>
              </div>
            </div>

            {/* 프로젝트 이미지 갤러리 */}
            <div style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="aspect-video bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700">
                  <Image
                    src={project.images[currentImageIndex]?.src || project.thumbnail.src}
                    alt={project.images[currentImageIndex]?.alt || project.thumbnail.alt}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                
                {/* 이미지 네비게이션 */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/90 hover:bg-slate-700 rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-100" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/90 hover:bg-slate-700 rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-100" />
                    </button>
                    
                    {/* 이미지 인디케이터 */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex 
                              ? 'bg-slate-100' 
                              : 'bg-slate-100/50 hover:bg-slate-100/75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 주요 성과 */}
      <section ref={achievementsRef} className="py-16 bg-slate-800 animate-slideUp">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-100 mb-8 text-center">
              주요 성과
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {project.achievements.map((achievement, index) => (
                                                  <div key={index} className="p-6 text-center animate-slideUp bg-slate-700 border-slate-600 rounded-lg border" style={{ animationDelay: `${0.1 * index}s` }}>
                   <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Award className="w-6 h-6 text-slate-200" />
                   </div>
                   <p className="text-slate-200">{achievement}</p>
                 </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 관련 프로젝트 */}
      <section ref={relatedRef} className="py-16 bg-slate-900 animate-slideUp">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-100 mb-8 text-center">
              관련 프로젝트
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioProjects
                .filter(p => p.id !== project.id && p.category === project.category)
                .slice(0, 3)
                .map((relatedProject, index) => (
                  <Link
                    key={relatedProject.id}
                    href={`/portfolio/${relatedProject.id}`}
                    className="group animate-slideUp"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 bg-slate-800 border-slate-700">
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={relatedProject.thumbnail.src}
                          alt={relatedProject.thumbnail.alt}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-100 mb-2 group-hover:text-slate-300 transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-sm text-slate-300 line-clamp-2">
                          {relatedProject.shortDescription}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}