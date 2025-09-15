# 03. VisualMetricsSection과 ProjectDetails 통합

> **기존 ProjectDetails 컴포넌트에 자연스럽게 통합**

## 🎯 목표
기존 ProjectDetails의 구조와 스타일을 유지하면서 새로운 시각화 섹션을 추가합니다.

## 📂 생성할 파일
- `src/components/portfolio/visual-metrics-section.tsx`

## 📂 수정할 파일  
- `src/components/portfolio/project-details.tsx` (기존 파일)

## 🔧 1단계: VisualMetricsSection 생성

```typescript
// src/components/portfolio/visual-metrics-section.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp } from 'lucide-react'
import { PortfolioProject } from '@/types/portfolio'
import { 
  CoreValue, 
  Differentiator, 
  getDefaultColor, 
  ANIMATION_CONFIG, 
  getAnimationDelay,
  isValidCoreValue,
  isValidDifferentiator
} from '@/lib/visual-metrics'

// 차트 컴포넌트들
import { ProgressChart } from '@/components/ui/progress-chart'
import { DonutChart } from '@/components/ui/donut-chart'
import { GaugeChart } from '@/components/ui/gauge-chart'
import { BarChart } from '@/components/ui/bar-chart'
import { SpeedometerChart } from '@/components/ui/speedometer-chart'
import { CircularChart } from '@/components/ui/circular-chart'

interface VisualMetricsSectionProps {
  visualMetrics?: PortfolioProject['visualMetrics']
}

// 차트 타입에 따른 컴포넌트 매핑
function renderChart(metric: CoreValue | Differentiator, index: number) {
  const color = metric.color || getDefaultColor(metric.type)
  const baseProps = {
    value: metric.value,
    unit: metric.unit,
    color,
    className: 'w-full'
  }

  switch (metric.type) {
    case 'progress':
      return <ProgressChart key={index} {...baseProps} />
    case 'donut':
      return <DonutChart key={index} {...baseProps} />
    case 'gauge':
      return <GaugeChart key={index} {...baseProps} />
    case 'bar':
      return <BarChart key={index} {...baseProps} />
    case 'speedometer':
      return <SpeedometerChart key={index} {...baseProps} />
    case 'circular':
      return <CircularChart key={index} {...baseProps} />
    default:
      return <ProgressChart key={index} {...baseProps} />
  }
}

export function VisualMetricsSection({ visualMetrics }: VisualMetricsSectionProps) {
  if (!visualMetrics) return null

  const validCoreValues = visualMetrics.coreValues?.filter(isValidCoreValue) || []
  const validDifferentiators = visualMetrics.differentiators?.filter(isValidDifferentiator) || []

  if (validCoreValues.length === 0 && validDifferentiators.length === 0) {
    return null
  }

  return (
    <div className="space-y-12">
      {/* 핵심 성과 지표 */}
      {validCoreValues.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-100">핵심 성과 지표</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validCoreValues.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors"
                initial={ANIMATION_CONFIG.initial}
                animate={ANIMATION_CONFIG.animate}
                transition={{
                  ...ANIMATION_CONFIG.transition,
                  delay: getAnimationDelay(index)
                }}
              >
                <div className="text-center space-y-4">
                  <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wide">
                    {metric.label}
                  </h4>
                  
                  <div className="py-4">
                    {renderChart(metric, index)}
                  </div>
                  
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 기술적 차별화 요소 */}
      {validDifferentiators.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-100">기술적 차별화 요소</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validDifferentiators.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors"
                initial={ANIMATION_CONFIG.initial}
                animate={ANIMATION_CONFIG.animate}
                transition={{
                  ...ANIMATION_CONFIG.transition,
                  delay: getAnimationDelay(validCoreValues.length + index)
                }}
              >
                <div className="text-center space-y-4">
                  <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wide">
                    {metric.label}
                  </h4>
                  
                  <div className="py-4">
                    {renderChart(metric, index)}
                  </div>
                  
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

## 🔧 2단계: ProjectDetails 통합 수정

```typescript
// src/components/portfolio/project-details.tsx (기존 파일 수정)
'use client'

import React from 'react'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, Award, TrendingUp } from 'lucide-react'
import { PortfolioProject } from '@/types/portfolio'
import { VisualMetricsSection } from './visual-metrics-section' // 새로 추가

interface ProjectDetailsProps {
  detailContent?: PortfolioProject['detailContent']
  visualMetrics?: PortfolioProject['visualMetrics'] // 새로 추가
}

export const ProjectDetails = ({ detailContent, visualMetrics }: ProjectDetailsProps) => {
  // detailContent가 없으면 렌더링하지 않음
  if (!detailContent) {
    return null
  }

  return (
    <section className="py-12 bg-slate-900">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">
            솔루션 상세보기
          </h2>
          
          <div className="space-y-12">
            {/* 프로젝트 개요 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100">솔루션 개요</h3>
              </div>
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <p className="text-slate-300 leading-relaxed">
                  {detailContent.background}
                </p>
              </div>
            </div>

            {/* 새로 추가: Visual Metrics Section */}
            {visualMetrics && (
              <VisualMetricsSection visualMetrics={visualMetrics} />
            )}

            {/* 기존 핵심 가치 (challenges) */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100">해결된 과제들</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {detailContent.challenges.map((challenge, index) => (
                  <div 
                    key={index}
                    className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1 text-xs">
                        과제 {index + 1}
                      </Badge>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {challenge}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 기존 차별화 요소 (solutions) */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100">구현한 솔루션</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {detailContent.solutions.map((solution, index) => (
                  <div 
                    key={index}
                    className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Badge variant="default" className="mt-1 text-xs bg-green-700 text-green-100">
                        솔루션
                      </Badge>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 기존 비즈니스 성과 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100">비즈니스 성과</h3>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-8 border border-slate-600">
                <p className="text-slate-200 leading-relaxed text-lg">
                  {detailContent.impact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
```

## ✅ 통합 결과
1. 기존 ProjectDetails 구조 완전 보존
2. 새로운 시각화 섹션이 자연스럽게 삽입 
3. 기존 스타일과 완벽 일치
4. visualMetrics 없는 프로젝트도 정상 작동

## 📋 다음 단계
→ **04-sample-data.md** 진행