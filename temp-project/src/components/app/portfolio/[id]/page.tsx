// src/app/portfolio/[id]/page.tsx
import { notFound } from 'next/navigation'
import { portfolioProjects } from '@/data/portfolio'
import { PortfolioDetailClient } from './portfolio-detail-client'

interface PortfolioDetailPageProps {
  params: {
    id: string
  }
}

// 정적 생성을 위한 경로 생성 함수
export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    id: project.id,
  }))
}

// 메타데이터 생성 함수
export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = portfolioProjects.find(p => p.id === params.id)
  
  if (!project) {
    return {
      title: '프로젝트를 찾을 수 없습니다',
      description: '요청하신 프로젝트를 찾을 수 없습니다.'
    }
  }

  return {
    title: `${project.title} - 포트폴리오`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.thumbnail.src],
    },
  }
}

export default function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const project = portfolioProjects.find(p => p.id === params.id)

  if (!project) {
    notFound()
  }

  return <PortfolioDetailClient project={project} />
}