// src/components/portfolio/portfolio-card.tsx
'use client'

// import { motion } from 'framer-motion'
import { ExternalLink, Mail, Calendar, Users, Award } from 'lucide-react'
import { Badge } from '@/components/primitives/Badge'
import { Button } from '@/components/primitives/Button'
import Link from 'next/link'
import Image from 'next/image'
import { PortfolioProject } from '@/types/portfolio'
import { useTheme } from '@/contexts/ThemeContext'

interface PortfolioCardProps {
  project: PortfolioProject
  index: number
}

export const PortfolioCard = ({ project, index }: PortfolioCardProps) => {
  // 테마 컨텍스트 사용
  const { theme } = useTheme()

  const formatDuration = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                   (endDate.getMonth() - startDate.getMonth())
    return `${months}개월`
  }

  return (
    <div
      className={`group backdrop-blur-lg shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg rounded-xl overflow-hidden ${
        theme === 'light' ? 'bg-white/90 border border-gray-200' :
        theme === 'dark' ? 'bg-slate-800/90 border border-slate-700' :
        theme === 'brand' ? 'bg-custom-bg-200/90 border border-primary-100/20' :
        'bg-white/90 border border-gray-200'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
        {/* 썸네일 이미지 - The Tactile 글래스모피즘 */}
        <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${
          theme === 'light' ? 'from-gray-100 to-gray-200' :
          theme === 'dark' ? 'from-slate-700 to-slate-800' :
          theme === 'brand' ? 'from-custom-bg-200 to-custom-bg-300' :
          'from-gray-100 to-gray-200'
        }`}>
          {/* 배경 이미지 */}
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            width={400}
            height={225}
            className="w-full h-full object-cover"
            priority={index < 3}
          />
          <div className={`absolute inset-0 flex items-center justify-center ${
            theme === 'light' ? 'bg-gradient-to-br from-black/30 via-black/20 to-black/40' :
            theme === 'dark' ? 'bg-gradient-to-br from-black/40 via-black/30 to-black/50' :
            theme === 'brand' ? 'bg-gradient-to-br from-custom-bg-100/60 via-custom-bg-100/40 to-custom-bg-100/70' :
            'bg-gradient-to-br from-black/30 via-black/20 to-black/40'
          }`}>
            <div className="text-white text-center p-6">
              <div className="text-2xl font-bold mb-3 tracking-tight text-shadow">{project.title}</div>
              <div className="text-sm opacity-95 leading-relaxed text-shadow">{project.shortDescription}</div>
            </div>
          </div>
          {/* 글래스 오버레이 효과 */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/20 via-transparent to-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge className={`shadow-lg backdrop-blur-sm ${
                theme === 'light' ? 'bg-green-600 text-white hover:bg-green-700' :
                theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                theme === 'brand' ? 'bg-primary-100 text-custom-text-100 hover:bg-primary-200' :
                'bg-green-600 text-white hover:bg-green-700'
              }`}>
                <Award className="w-3 h-3" />
              </Badge>
            </div>
          )}
        </div>

        {/* 프로젝트 정보 - The Architect 정밀한 타이포그래피 */}
        <div className="p-8">
          {/* 제목 및 설명 */}
          <div className="mb-6">
            <h3 className={`text-xl font-semibold mb-3 transition-colors tracking-tight ${
              theme === 'light' ? 'text-gray-900' :
              theme === 'dark' ? 'text-slate-100' :
              theme === 'brand' ? 'text-custom-text-100' :
              'text-gray-900'
            }`}>
              {project.title}
            </h3>
            <p className={`text-sm line-clamp-2 leading-relaxed ${
              theme === 'light' ? 'text-gray-600' :
              theme === 'dark' ? 'text-slate-300' :
              theme === 'brand' ? 'text-custom-text-200' :
              'text-gray-600'
            }`}>
              {project.description}
            </p>
          </div>

          {/* 카테고리 및 기술 스택 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="outline"
                className={`text-xs ${
                  theme === 'light' ? 'bg-green-100 text-green-700 border-green-300' :
                  theme === 'dark' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                  theme === 'brand' ? 'bg-primary-100/10 text-primary-200 border-primary-100/30' :
                  'bg-green-100 text-green-700 border-green-300'
                }`}
              >
                {project.category === '3d-visualization' && '3D 시각화'}
                {project.category === 'ar-vr' && 'AR/VR'}
                {project.category === 'webxr' && 'WebXR'}
                {project.category === 'web-development' && '웹 개발'}
                {project.category === 'interactive-installation' && '인터렉티브 설치'}
                {project.category === '3d-platform' && '3D 플랫폼'}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="secondary" className={`text-xs ${
                  theme === 'light' ? 'bg-gray-100 text-gray-700' :
                  theme === 'dark' ? 'bg-slate-700 text-slate-300' :
                  theme === 'brand' ? 'bg-custom-bg-300 text-custom-text-200' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="secondary" className={`text-xs ${
                  theme === 'light' ? 'bg-gray-100 text-gray-700' :
                  theme === 'dark' ? 'bg-slate-700 text-slate-300' :
                  theme === 'brand' ? 'bg-custom-bg-300 text-custom-text-200' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  +{project.technologies.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* 프로젝트 메타 정보 */}
          <div className={`flex items-center gap-4 text-sm mb-4 ${
            theme === 'light' ? 'text-gray-500' :
            theme === 'dark' ? 'text-slate-400' :
            theme === 'brand' ? 'text-custom-text-200' :
            'text-gray-500'
          }`}>
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
            <h4 className={`text-sm font-semibold mb-2 ${
              theme === 'light' ? 'text-gray-900' :
              theme === 'dark' ? 'text-slate-100' :
              theme === 'brand' ? 'text-custom-text-100' :
              'text-gray-900'
            }`}>주요 성과:</h4>
            <ul className="space-y-1">
              {project.achievements.slice(0, 2).map((achievement, idx) => (
                <li key={idx} className={`text-xs flex items-start ${
                  theme === 'light' ? 'text-gray-600' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-600'
                }`}>
                  <div className={`w-1 h-1 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
                    theme === 'light' ? 'bg-green-500' :
                    theme === 'dark' ? 'bg-blue-500' :
                    theme === 'brand' ? 'bg-primary-200' :
                    'bg-green-500'
                  }`}></div>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex items-center gap-2">
            <Link href={`/portfolio/${project.id}`} className="flex-1">
              <Button size="sm" className={`w-full shadow-lg hover:shadow-xl transition-all duration-300 ${
                theme === 'light' ? 'bg-green-600 hover:bg-green-700 text-white' :
                theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                theme === 'brand' ? 'bg-gradient-to-r from-primary-100 to-accent-200 hover:from-accent-200 hover:to-primary-100 text-custom-text-100' :
                'bg-green-600 hover:bg-green-700 text-white'
              }`}>
                자세히 보기
              </Button>
            </Link>
            {project.links.demo && (
              <Button size="sm" variant="outline" className={`${
                theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-100' :
                theme === 'dark' ? 'border-slate-600 text-slate-200 hover:bg-slate-700' :
                theme === 'brand' ? 'border-primary-100/30 text-custom-text-100 hover:bg-custom-bg-300' :
                'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
            {project.links.contact && (
              <Button size="sm" variant="outline" className={`${
                theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-100' :
                theme === 'dark' ? 'border-slate-600 text-slate-200 hover:bg-slate-700' :
                theme === 'brand' ? 'border-primary-100/30 text-custom-text-100 hover:bg-custom-bg-300' :
                'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}>
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