'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Mail, Calendar, Users, Award, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import { Card } from '@/components/primitives/Card'
import { portfolioProjects } from '@/data/portfolio'
import { PortfolioProject } from '@/types/portfolio'
import { PORTFOLIO_CATEGORIES } from '@/types/portfolio'
import { ImageGallery } from '@/components/portfolio/image-gallery'
import { ProjectDetails } from '@/components/portfolio/project-details'

interface PortfolioDetailClientProps {
  project: PortfolioProject
}

export function PortfolioDetailClient({ project }: PortfolioDetailClientProps) {
  
  // 영상 컨트롤 상태
  const [videoStates, setVideoStates] = useState<{ [key: number]: { isPlaying: boolean; isMuted: boolean } }>({})

  // 애니메이션을 위한 ref들
  const headerRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
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

    const sections = [headerRef.current, detailsRef.current, galleryRef.current, achievementsRef.current, relatedRef.current]
    sections.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const category = PORTFOLIO_CATEGORIES.find(cat => cat.value === project.category)

  // 영상 컨트롤 함수들
  const toggleVideoPlay = (videoIndex: number) => {
    setVideoStates(prev => ({
      ...prev,
      [videoIndex]: {
        ...prev[videoIndex],
        isPlaying: !prev[videoIndex]?.isPlaying
      }
    }))
  }

  const toggleVideoMute = (videoIndex: number) => {
    setVideoStates(prev => ({
      ...prev,
      [videoIndex]: {
        ...prev[videoIndex],
        isMuted: !prev[videoIndex]?.isMuted
      }
    }))
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

      {/* 프로젝트 상세 정보 */}
      <div ref={detailsRef} className="animate-slideUp">
        <ProjectDetails detailContent={project.detailContent} />
      </div>

      {/* 프로젝트 이미지 갤러리 */}
      <div ref={galleryRef} className="animate-slideUp">
        <section className="py-12 bg-slate-800">
          <Container>
            <h2 className="text-2xl font-bold text-slate-100 mb-8">프로젝트 갤러리</h2>
            <ImageGallery images={project.images} />
          </Container>
        </section>
      </div>

      {/* 프로젝트 영상 */}
      {project.videos && project.videos.length > 0 && (
        <section className="py-12 bg-slate-900">
          <Container>
            <h2 className="text-2xl font-bold text-slate-100 mb-8">프로젝트 영상</h2>
            <div className="space-y-8">
              {project.videos.map((video, index) => (
                <div key={index} className="space-y-4">
                  <div className="relative aspect-video bg-slate-700 rounded-lg overflow-hidden shadow-2xl border border-slate-700">
                                         <video
                       src={video.src}
                       className="w-full h-full object-cover"
                       muted={videoStates[index]?.isMuted ?? true}
                       loop
                       playsInline
                       autoPlay
                       onPlay={() => {
                         setVideoStates(prev => ({
                           ...prev,
                           [index]: { ...prev[index], isPlaying: true }
                         }))
                       }}
                       onPause={() => {
                         setVideoStates(prev => ({
                           ...prev,
                           [index]: { ...prev[index], isPlaying: false }
                         }))
                       }}
                     />
                    
                    {/* 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    {/* 컨트롤 버튼들 */}
                    <div className="absolute bottom-6 left-6 flex gap-3">
                                             <button 
                         onClick={() => {
                           const videoElement = document.querySelector(`video[src="${video.src}"]`) as HTMLVideoElement
                           if (videoElement) {
                             if (videoStates[index]?.isPlaying) {
                               videoElement.pause()
                             } else {
                               videoElement.play()
                             }
                           }
                         }}
                         className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                       >
                         {videoStates[index]?.isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                       </button>
                                             <button 
                         onClick={() => {
                           const videoElement = document.querySelector(`video[src="${video.src}"]`) as HTMLVideoElement
                           if (videoElement) {
                             videoElement.muted = !videoStates[index]?.isMuted
                             setVideoStates(prev => ({
                               ...prev,
                               [index]: { ...prev[index], isMuted: !prev[index]?.isMuted }
                             }))
                           }
                         }}
                         className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                       >
                         {videoStates[index]?.isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                       </button>
                    </div>
                    
                    {/* 영상 제목 오버레이 */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                        <h3 className="text-lg font-semibold">{video.alt}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

      {/* 다른 프로젝트 */}
      <section ref={relatedRef} className="py-12 bg-slate-800">
        <Container>
          <h2 className="text-2xl font-bold text-slate-100 mb-8">다른 프로젝트 둘러보기</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects
              .filter(p => p.id !== project.id)
              .slice(0, 5)
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