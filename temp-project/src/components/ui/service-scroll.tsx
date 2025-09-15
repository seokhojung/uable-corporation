'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Calendar, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/primitives/Badge'
import { portfolioProjects } from '@/data/portfolio'
import { applyThemeClasses } from '@/lib/theme-class-mapping'

interface ServiceScrollProps {
  className?: string
  speed?: number
}

// 카테고리 라벨 함수
const getCategoryLabel = (category: string) => {
  switch (category) {
    case '3d-visualization': return '3D 시각화'
    case 'ar-vr': return 'AR/VR'
    case 'webxr': return 'WebXR'
    case 'web-development': return '웹 개발'
    case 'interactive-installation': return '인터렉티브 설치'
    case '3d-platform': return '3D 플랫폼'
    default: return category
  }
}

// 기간 계산 함수
const formatDuration = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                 (endDate.getMonth() - startDate.getMonth())
  return `${months}개월`
}

export const ServiceScroll = ({ className = '', speed = 1 }: ServiceScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [translateY, setTranslateY] = useState(0)
  const animationRef = useRef<number>()
  const isThemeSystemEnabled = process.env.NEXT_PUBLIC_THEME_SYSTEM !== 'false'

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) {
      return
    }

    // 모바일에서는 애니메이션 실행하지 않음
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop) {
      console.log('🚫 모바일에서 ServiceScroll 애니메이션 중단')
      return
    }

    // 이미 애니메이션이 실행 중이면 중단
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    let position = 0

    const animate = () => {
      position -= speed // 위로 이동
      
      // 리셋 예방: 카드가 화면 밖으로 나가면 아래로 재배치
      const firstSet = scrollElement.children[0] as HTMLElement
      const secondSet = scrollElement.children[1] as HTMLElement
      
      if (firstSet && secondSet) {
        // 첫 번째 세트의 실제 높이 측정
        const firstSetHeight = firstSet.offsetHeight
        
        // 예방적 재배치: 첫 번째 세트가 절반 이상 사라지면 부드럽게 조정
        if (Math.abs(position) >= firstSetHeight / 2) {
          console.log('🔄 예방적 재배치!', { position, threshold: firstSetHeight / 2 })
          // 절반만큼 이동한 것을 다시 되돌림 (시각적으로는 연속적)
          position = position + firstSetHeight / 2
        }
      }
      
      setTranslateY(position)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // 화면 크기 변경 감지
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1024
      if (!newIsDesktop && animationRef.current) {
        console.log('🚫 화면 축소로 인한 애니메이션 중단')
        cancelAnimationFrame(animationRef.current)
        animationRef.current = undefined
      } else if (newIsDesktop && !animationRef.current) {
        console.log('🚀 화면 확대로 인한 애니메이션 시작')
        animate()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [speed])

  return (
    <div className={`${applyThemeClasses("overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl", isThemeSystemEnabled)} ${className}`}>
      <div 
        ref={scrollRef}
        style={{ 
          transform: `translate3d(0px, ${translateY}px, 0px)`,
          transition: 'none'
        }}
      >
        {/* 첫 번째 세트 */}
        <div className="space-y-8">
          {portfolioProjects.map((project, index) => (
            <Link key={`first-${project.id}`} href={`/portfolio/${project.id}`}>
              <div className={applyThemeClasses("bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group", isThemeSystemEnabled)}>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={applyThemeClasses("text-xs bg-slate-700 text-slate-200 border-slate-600", isThemeSystemEnabled)}>
                        {getCategoryLabel(project.category)}
                      </Badge>
                      {project.featured && (
                        <Badge variant="primary" className="text-xs">
                          추천
                        </Badge>
                      )}
                    </div>
                    <h3 className={applyThemeClasses("text-lg font-semibold text-slate-100 mb-1 group-hover:text-slate-300 transition-colors", isThemeSystemEnabled)}>
                      {project.title}
                    </h3>
                    <p className={applyThemeClasses("text-slate-300 text-sm line-clamp-2 mb-3", isThemeSystemEnabled)}>{project.shortDescription}</p>
                    
                    {/* 프로젝트 메타 정보 */}
                    <div className={applyThemeClasses("flex items-center gap-4 text-xs text-slate-400", isThemeSystemEnabled)}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDuration(project.duration.start, project.duration.end)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{project.teamSize}명</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={applyThemeClasses("w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors", isThemeSystemEnabled)} />
                </div>
                
                {/* 프로젝트 썸네일 */}
                <div className="rounded-lg overflow-hidden">
                  <Image 
                    src={project.thumbnail.src}
                    alt={project.thumbnail.alt}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={index < 2}
                  />
                </div>
                
                {/* 기술 스택 */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* 두 번째 세트 (무한 스크롤을 위해 복제) */}
        <div className="space-y-8">
          {portfolioProjects.map((project, index) => (
            <Link key={`second-${project.id}`} href={`/portfolio/${project.id}`}>
              <div className={applyThemeClasses("bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group", isThemeSystemEnabled)}>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={applyThemeClasses("text-xs bg-slate-700 text-slate-200 border-slate-600", isThemeSystemEnabled)}>
                        {getCategoryLabel(project.category)}
                      </Badge>
                      {project.featured && (
                        <Badge variant="primary" className="text-xs">
                          추천
                        </Badge>
                      )}
                    </div>
                    <h3 className={applyThemeClasses("text-lg font-semibold text-slate-100 mb-1 group-hover:text-slate-300 transition-colors", isThemeSystemEnabled)}>
                      {project.title}
                    </h3>
                    <p className={applyThemeClasses("text-slate-300 text-sm line-clamp-2 mb-3", isThemeSystemEnabled)}>{project.shortDescription}</p>
                    
                    {/* 프로젝트 메타 정보 */}
                    <div className={applyThemeClasses("flex items-center gap-4 text-xs text-slate-400", isThemeSystemEnabled)}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDuration(project.duration.start, project.duration.end)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{project.teamSize}명</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={applyThemeClasses("w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors", isThemeSystemEnabled)} />
                </div>
                
                {/* 프로젝트 썸네일 */}
                <div className="rounded-lg overflow-hidden">
                  <Image 
                    src={project.thumbnail.src}
                    alt={project.thumbnail.alt}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={index < 2}
                  />
                </div>
                
                {/* 기술 스택 */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* 세 번째 세트 (완전한 리셋 예방을 위해) */}
        <div className="space-y-8">
          {portfolioProjects.map((project, index) => (
            <Link key={`third-${project.id}`} href={`/portfolio/${project.id}`}>
              <div className={applyThemeClasses("bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group", isThemeSystemEnabled)}>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={applyThemeClasses("text-xs bg-slate-700 text-slate-200 border-slate-600", isThemeSystemEnabled)}>
                        {getCategoryLabel(project.category)}
                      </Badge>
                      {project.featured && (
                        <Badge variant="primary" className="text-xs">
                          추천
                        </Badge>
                      )}
                    </div>
                    <h3 className={applyThemeClasses("text-lg font-semibold text-slate-100 mb-1 group-hover:text-slate-300 transition-colors", isThemeSystemEnabled)}>
                      {project.title}
                    </h3>
                    <p className={applyThemeClasses("text-slate-300 text-sm line-clamp-2 mb-3", isThemeSystemEnabled)}>{project.shortDescription}</p>
                    
                    {/* 프로젝트 메타 정보 */}
                    <div className={applyThemeClasses("flex items-center gap-4 text-xs text-slate-400", isThemeSystemEnabled)}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDuration(project.duration.start, project.duration.end)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{project.teamSize}명</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={applyThemeClasses("w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors", isThemeSystemEnabled)} />
                </div>
                
                {/* 프로젝트 썸네일 */}
                <div className="rounded-lg overflow-hidden">
                  <Image 
                    src={project.thumbnail.src}
                    alt={project.thumbnail.alt}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* 기술 스택 */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 