'use client'

import React from 'react'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/primitives/Badge'
import { CheckCircle, Star, Award, TrendingUp } from 'lucide-react'
import { PortfolioProject } from '@/types/portfolio'
import { ImpactStats } from './impact-stats'

interface ProjectDetailsProps {
  detailContent?: PortfolioProject['detailContent']
}

export const ProjectDetails = ({ detailContent }: ProjectDetailsProps) => {
  // detailContent가 없으면 렌더링하지 않음
  if (!detailContent) {
    return null
  }

  return (
    <section className="py-12 bg-white dark:bg-slate-900">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* 임팩트 통계 - 모든 정보를 하나로 통합 */}
          <ImpactStats detailContent={detailContent} />
        </div>
      </Container>
    </section>
  )
}