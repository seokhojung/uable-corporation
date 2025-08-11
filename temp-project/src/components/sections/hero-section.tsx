// src/components/sections/hero-section.tsx
'use client'

import { ArrowRight, Play, Star, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { portfolioProjects } from '@/data/portfolio'

const stats = [
  { label: '완료 프로젝트', value: '150+', icon: Award },
  { label: '만족한 고객', value: '200+', icon: Users },
  { label: '평균 평점', value: '4.9', icon: Star },
]

export const HeroSection = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  
  // 추천 프로젝트들만 필터링
  const featuredProjects = portfolioProjects.filter(project => project.featured)
  
  // 자동 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length)
    }, 4000) // 4초마다 변경
    
    return () => clearInterval(interval)
  }, [featuredProjects.length])
  
  const currentProject = featuredProjects[currentProjectIndex]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 배경 요소 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-700 rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-600 rounded-full opacity-20 animate-pulse" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* 텍스트 콘텐츠 */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* 배지 */}
            <div className="mb-6">
              <Badge variant="primary" size="lg" className="inline-flex items-center">
                <Star className="w-4 h-4 mr-2" />
                혁신적인 디지털 솔루션
              </Badge>
            </div>

            {/* 메인 헤드라인 */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-slate-100 mb-4 sm:mb-6 leading-tight">
              비즈니스의{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400">
                디지털 혁신
              </span>
              을 이끌어갑니다
            </h1>

            {/* 서브헤드라인 */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              최신 기술과 창의적인 디자인으로 고객의 비전을 현실로 만듭니다. 
              웹 개발부터 모바일 앱, UI/UX 디자인까지 모든 디지털 솔루션을 제공합니다.
            </p>

            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button size="lg" className="w-full sm:w-auto">
                <Link href="/contact">
                  프로젝트 시작하기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Play className="w-4 h-4 mr-2" />
                데모 보기
              </Button>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-3 gap-4 mt-8 sm:mt-12 lg:mt-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-slate-300 mr-2" />
                    <span className="text-2xl sm:text-3xl font-bold text-slate-100">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 시각적 요소 */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            {currentProject && (
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* 포트폴리오 카드 */}
                <Link href={`/portfolio/${currentProject.id}`}>
                  <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 hover:-translate-y-2 transition-all duration-500 overflow-hidden group cursor-pointer">
                    {/* 브라우저 스타일 헤더 */}
                    <div className="flex items-center space-x-2 p-4 bg-slate-700/50">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="flex-1 text-center">
                        <div className="text-xs text-slate-300">{currentProject.title}</div>
                      </div>
                    </div>
                    
                    {/* 프로젝트 썸네일 */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={currentProject.thumbnail.src}
                        alt={currentProject.thumbnail.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      
                      {/* 프로젝트 정보 오버레이 */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge variant="primary" className="mb-2">
                          {currentProject.category === '3d-visualization' && '3D 시각화'}
                          {currentProject.category === 'ar-vr' && 'AR/VR'}
                          {currentProject.category === 'webxr' && 'WebXR'}
                          {currentProject.category === 'web-development' && '웹 개발'}
                          {currentProject.category === 'interactive-installation' && '인터렉티브 설치'}
                          {currentProject.category === '3d-platform' && '3D 플랫폼'}
                        </Badge>
                        <h3 className="text-white font-bold text-lg mb-1">{currentProject.title}</h3>
                        <p className="text-slate-200 text-sm line-clamp-2">{currentProject.shortDescription}</p>
                      </div>
                    </div>
                    
                    {/* 기술 스택 미리보기 */}
                    <div className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {currentProject.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {currentProject.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{currentProject.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* 플로팅 요소들 */}
                <div className="absolute -top-4 -right-4 bg-slate-700 rounded-lg p-3 shadow-lg animate-bounce">
                  <Star className="w-6 h-6 text-slate-200" />
                </div>

                <div className="absolute -bottom-4 -left-4 bg-slate-700 rounded-lg p-3 shadow-lg animate-bounce">
                  <Award className="w-6 h-6 text-slate-200" />
                </div>
                
                {/* 프로젝트 인디케이터 */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {featuredProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProjectIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentProjectIndex ? 'bg-slate-400' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}