# Story 4.3: 비주얼 메트릭스 섹션 통합

## 📋 Story 정보
- **Epic**: Epic 4 - 포트폴리오 비주얼 메트릭스 시스템
- **예상 소요 시간**: 2시간
- **우선순위**: 높음
- **담당자**: AI Developer
- **선행 조건**: Story 4.1, 4.2 완료

## 🎯 Story 목표
차트 컴포넌트들을 통합하여 비주얼 메트릭스 섹션을 구성하고, 기존 ProjectDetails 컴포넌트와 연동합니다.

## ✅ 완료 조건 (Acceptance Criteria)
1. VisualMetricsSection 컴포넌트 구현 완료
2. 핵심 가치와 차별화 요소 섹션 구분
3. 적절한 차트 타입 자동 선택
4. ProjectDetails 컴포넌트와 통합
5. 데이터 없는 경우 graceful 처리

## 📝 구현 태스크

### Task 1: VisualMetricsSection 컴포넌트 생성
**파일**: `src/components/portfolio/visual-metrics-section.tsx`

```typescript
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PortfolioProject } from '@/types/portfolio'
import { 
  isValidCoreValue, 
  isValidDifferentiator,
  getDefaultColor,
  getAnimationDelay 
} from '@/lib/visual-metrics'

// 차트 컴포넌트들 import
import { ProgressChart } from '@/components/ui/progress-chart'
import { DonutChart } from '@/components/ui/donut-chart'
import { GaugeChart } from '@/components/ui/gauge-chart'
import { BarChart } from '@/components/ui/bar-chart'
import { SpeedometerChart } from '@/components/ui/speedometer-chart'
import { CircularChart } from '@/components/ui/circular-chart'

interface VisualMetricsSectionProps {
  visualMetrics: PortfolioProject['visualMetrics']
}

export function VisualMetricsSection({ visualMetrics }: VisualMetricsSectionProps) {
  if (!visualMetrics) return null

  // 데이터 검증
  const validCoreValues = visualMetrics.coreValues.filter(isValidCoreValue)
  const validDifferentiators = visualMetrics.differentiators.filter(isValidDifferentiator)

  if (validCoreValues.length === 0 && validDifferentiators.length === 0) {
    return null
  }

  // 차트 타입에 따른 컴포넌트 선택
  const renderChart = (metric: any, index: number) => {
    const color = metric.color || getDefaultColor(metric.type)
    const delay = getAnimationDelay(index)
    
    const chartProps = {
      value: metric.value,
      unit: metric.unit,
      color: color,
      className: ''
    }

    switch (metric.type) {
      case 'progress':
        return <ProgressChart {...chartProps} />
      case 'donut':
        return <DonutChart {...chartProps} />
      case 'gauge':
        return <GaugeChart {...chartProps} />
      case 'bar':
        return <BarChart {...chartProps} />
      case 'speedometer':
        return <SpeedometerChart {...chartProps} />
      case 'circular':
        return <CircularChart {...chartProps} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-16">
      {/* 핵심 가치 섹션 */}
      {validCoreValues.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">📊</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-100">핵심 성과 지표</h3>
              <p className="text-slate-400 text-sm mt-1">프로젝트의 주요 성과와 가치 제안</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validCoreValues.map((metric, index) => (
              <motion.div
                key={`core-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: getAnimationDelay(index),
                  duration: 0.6 
                }}
                className="bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition-colors"
              >
                <h4 className="text-sm font-medium text-slate-300 mb-4">
                  {metric.label}
                </h4>
                {renderChart(metric, index)}
                <p className="text-xs text-slate-400 mt-4 text-center">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 차별화 요소 섹션 */}
      {validDifferentiators.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">⚡</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-100">경쟁 우위 요소</h3>
              <p className="text-slate-400 text-sm mt-1">업계 대비 뛰어난 성능과 특장점</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {validDifferentiators.map((metric, index) => (
              <motion.div
                key={`diff-${index}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: getAnimationDelay(index),
                  duration: 0.6 
                }}
                className="bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition-colors"
              >
                <h4 className="text-sm font-medium text-slate-300 mb-4">
                  {metric.label}
                </h4>
                {renderChart(metric, index)}
                <p className="text-xs text-slate-400 mt-4 text-center">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
```

### Task 2: ProjectDetails 컴포넌트 수정
**파일**: `src/components/portfolio/project-details.tsx` (수정)

```typescript
// 상단에 import 추가
import { VisualMetricsSection } from './visual-metrics-section'

// Props 인터페이스 수정
interface ProjectDetailsProps {
  detailContent?: PortfolioProject['detailContent']
  visualMetrics?: PortfolioProject['visualMetrics'] // 추가
}

// 컴포넌트 시그니처 수정
export const ProjectDetails = ({ detailContent, visualMetrics }: ProjectDetailsProps) => {
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
            {/* 비주얼 메트릭스 섹션 추가 - 솔루션 개요 전에 배치 */}
            {visualMetrics && (
              <VisualMetricsSection visualMetrics={visualMetrics} />
            )}
            
            {/* 기존 프로젝트 개요 섹션 */}
            <div className="space-y-4">
              {/* ... 기존 코드 유지 ... */}
            </div>
            
            {/* ... 나머지 기존 섹션들 ... */}
          </div>
        </div>
      </Container>
    </section>
  )
}
```

### Task 3: portfolio-detail-client.tsx에서 Props 전달
**파일**: `src/app/portfolio/[id]/portfolio-detail-client.tsx` (수정)

```typescript
// ProjectDetails 컴포넌트 호출 부분 수정
<ProjectDetails 
  detailContent={project.detailContent}
  visualMetrics={project.visualMetrics} // 추가
/>
```

## 🔍 테스트 시나리오
1. visualMetrics 데이터가 있는 프로젝트 확인
2. visualMetrics 데이터가 없는 프로젝트 확인
3. 섹션별 애니메이션 순서 확인
4. 차트 렌더링 정확도 확인
5. 반응형 그리드 레이아웃 테스트

## 📚 참고 문서
- [03-visual-metrics-section.md](../implementation/03-visual-metrics-section.md)
- [05-integration-guide.md](../implementation/05-integration-guide.md)

## ⚠️ 주의사항
- 기존 ProjectDetails 로직 보존
- visualMetrics는 optional 필드
- 데이터 유효성 검증 필수
- 애니메이션 성능 최적화

## 🏁 완료 체크리스트
- [ ] VisualMetricsSection 컴포넌트 생성
- [ ] 차트 타입별 렌더링 로직 구현
- [ ] ProjectDetails 컴포넌트 수정
- [ ] portfolio-detail-client.tsx 수정
- [ ] 데이터 유효성 검증 확인
- [ ] 애니메이션 테스트
- [ ] TypeScript 컴파일 확인

---

**다음 스토리**: [Story 4.4 - 포트폴리오 데이터 업데이트](./story-4.4-portfolio-data-update.md)