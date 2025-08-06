'use client'

import React, { useState, useRef } from 'react'
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

interface PortfolioDetailClientProps {
  project: PortfolioProject
}

export function PortfolioDetailClient({ project }: PortfolioDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // 애니메이션을 위한 ref들
  const headerRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)
  const relatedRef = useRef<HTMLDivElement>(null)

  // Intersection Observer를 사용한 스크롤 애니메이션
  React.useEffect(() => {
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
              
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-4">
                {project.title}
              </h1>
              
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* 프로젝트 메타데이터 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center text-slate-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {project.duration.start} - {project.duration.end}
                  </span>
                </div>
                <div className="flex items-center text-slate-400">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{project.teamSize}명</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <Award className="w-4 h-4 mr-2" />
                  <span className="text-sm">{project.role}</span>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-3">사용 기술</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex flex-wrap gap-3">
                {project.links.demo && (
                  <Button asChild>
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      데모 보기
                    </a>
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href={project.links.contact || '/contact'}>
                    <Mail className="w-4 h-4 mr-2" />
                    문의하기
                  </Link>
                </Button>
              </div>
            </div>

            {/* 프로젝트 썸네일 */}
            <div className="relative">
              <Card className="overflow-hidden">
                <Image
                  src={project.thumbnail.src}
                  alt={project.thumbnail.alt}
                  width={project.thumbnail.width}
                  height={project.thumbnail.height}
                  className="w-full h-auto"
                  priority
                />
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* 프로젝트 이미지 갤러리 */}
      {project.images.length > 0 && (
        <section className="py-12 bg-slate-800">
          <Container>
            <h2 className="text-2xl font-bold text-slate-100 mb-8">프로젝트 갤러리</h2>
            <div className="relative">
              <div className="relative aspect-video bg-slate-700 rounded-lg overflow-hidden">
                <Image
                  src={project.images[currentImageIndex].src}
                  alt={project.images[currentImageIndex].alt}
                  fill
                  className="object-cover"
                />
                
                {/* 이미지 네비게이션 */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-slate-100 p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-slate-100 p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              
              {/* 이미지 인디케이터 */}
              {project.images.length > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-slate-400' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* 주요 성과 */}
      <section ref={achievementsRef} className="py-12 bg-slate-900">
        <Container>
          <h2 className="text-2xl font-bold text-slate-100 mb-8">주요 성과</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.achievements.map((achievement, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-slate-300 text-sm font-semibold">{index + 1}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{achievement}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 관련 프로젝트 */}
      <section ref={relatedRef} className="py-12 bg-slate-800">
        <Container>
          <h2 className="text-2xl font-bold text-slate-100 mb-8">관련 프로젝트</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects
              .filter(p => p.id !== project.id && p.category === project.category)
              .slice(0, 3)
              .map((relatedProject) => (
                <Card key={relatedProject.id} className="overflow-hidden hover:scale-105 transition-transform">
                  <Link href={`/portfolio/${relatedProject.id}`}>
                    <div className="relative aspect-video">
                      <Image
                        src={relatedProject.thumbnail.src}
                        alt={relatedProject.thumbnail.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-200 mb-2">{relatedProject.title}</h3>
                      <p className="text-sm text-slate-400 line-clamp-2">{relatedProject.shortDescription}</p>
                    </div>
                  </Link>
                </Card>
              ))}
          </div>
        </Container>
      </section>
    </div>
  )
} 