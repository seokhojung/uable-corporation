// src/components/portfolio/portfolio-card.tsx
'use client'

// import { motion } from 'framer-motion'
import { ExternalLink, Mail, Calendar, Users, Award } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { PortfolioProject } from '@/types/portfolio'

interface PortfolioCardProps {
  project: PortfolioProject
  index: number
}

export const PortfolioCard = ({ project, index }: PortfolioCardProps) => {
  const formatDuration = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth())
    return `${months}개월`
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '3d-visualization':
        return 'bg-slate-700 text-slate-200 border-slate-600'
      case 'ar-vr':
        return 'bg-slate-700 text-slate-200 border-slate-600'
      case 'webxr':
        return 'bg-slate-700 text-slate-200 border-slate-600'
      case 'web-development':
        return 'bg-slate-700 text-slate-200 border-slate-600'
      default:
        return 'bg-slate-700 text-slate-200 border-slate-600'
    }
  }

  return (
    <div
      className="group bg-slate-800/80 backdrop-blur-lg border border-slate-700/20 shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg rounded-xl overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
        {/* 썸네일 이미지 - The Tactile 글래스모피즘 */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
          {/* 배경 이미지 */}
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            width={400}
            height={225}
            className="w-full h-full object-cover"
            priority={index < 3}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600/70 to-slate-700/70 flex items-center justify-center backdrop-blur-sm">
            <div className="text-slate-100 text-center p-6">
              <div className="text-2xl font-bold mb-3 tracking-tight">{project.title}</div>
              <div className="text-sm opacity-95 leading-relaxed">{project.shortDescription}</div>
            </div>
          </div>
          {/* 글래스 오버레이 효과 */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/20 via-transparent to-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge variant="primary" className="bg-slate-600/90 text-slate-100 border-slate-500/30 shadow-lg backdrop-blur-sm">
                <Award className="w-3 h-3 mr-1" />
                추천
              </Badge>
            </div>
          )}
        </div>

        {/* 프로젝트 정보 - The Architect 정밀한 타이포그래피 */}
        <div className="p-8">
          {/* 제목 및 설명 */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-slate-300 transition-colors tracking-tight">
              {project.title}
            </h3>
            <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* 카테고리 및 기술 스택 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Badge 
                variant="outline" 
                className={`text-xs ${getCategoryColor(project.category)}`}
              >
                {project.category === '3d-visualization' && '3D 시각화'}
                {project.category === 'ar-vr' && 'AR/VR'}
                {project.category === 'webxr' && 'WebXR'}
                {project.category === 'web-development' && '웹 개발'}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
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

          {/* 프로젝트 메타 정보 */}
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDuration(project.duration.start, project.duration.end)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{project.teamSize}명</span>
            </div>
          </div>

          {/* 성과 요약 */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-200 mb-2">주요 성과:</h4>
            <ul className="space-y-1">
              {project.achievements.slice(0, 2).map((achievement, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex items-center gap-2">
            <Link href={`/portfolio/${project.id}`} className="flex-1">
              <Button size="sm" className="w-full">
                자세히 보기
              </Button>
            </Link>
            {project.links.demo && (
              <Button  size="sm" variant="outline">
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
            {project.links.contact && (
              <Button  size="sm" variant="outline">
                <a href={project.links.contact} target="_blank" rel="noopener noreferrer">
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
    </div>
  )
} 