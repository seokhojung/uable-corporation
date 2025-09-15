# Story 4.2: 차트 컴포넌트 구현

## 📋 Story 정보
- **Epic**: Epic 4 - 포트폴리오 비주얼 메트릭스 시스템
- **예상 소요 시간**: 3시간
- **우선순위**: 높음
- **담당자**: AI Developer
- **선행 조건**: Story 4.1 완료

## 🎯 Story 목표
비주얼 메트릭스 데이터를 시각화할 6개의 차트 컴포넌트를 구현합니다. Framer Motion을 활용한 애니메이션과 반응형 디자인을 적용합니다.

## ✅ 완료 조건 (Acceptance Criteria)
1. 6개 차트 타입 모두 구현 완료
   - Progress Chart
   - Donut Chart
   - Gauge Chart
   - Bar Chart
   - Speedometer Chart
   - Circular Chart
2. Framer Motion 애니메이션 적용
3. 반응형 및 접근성 고려
4. 모든 컴포넌트 정상 렌더링

## 📝 구현 태스크

### Task 1: Progress Chart 구현
**파일**: `src/components/ui/progress-chart.tsx`

```typescript
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { formatValue } from '@/lib/visual-metrics'

interface ProgressChartProps {
  value: number
  unit: string
  color?: string
  className?: string
}

export function ProgressChart({ value, unit, color = 'rgb(14, 165, 233)', className }: ProgressChartProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const percentage = unit === '%' ? value : Math.min((value / 100) * 100, 100)
  
  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${percentage}%` : 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <div className="mt-2 text-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {formatValue(value, unit)}
        </span>
      </div>
    </div>
  )
}
```

### Task 2: Donut Chart 구현
**파일**: `src/components/ui/donut-chart.tsx`

```typescript
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { formatValue } from '@/lib/visual-metrics'

interface DonutChartProps {
  value: number
  unit: string
  color?: string
  size?: number
  className?: string
}

export function DonutChart({ 
  value, 
  unit, 
  color = 'rgb(217, 70, 239)', 
  size = 120,
  className 
}: DonutChartProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const percentage = unit === '%' ? value : Math.min((value / 100) * 100, 100)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (circumference * percentage) / 100
  
  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          className="transform -rotate-90"
        >
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgb(226, 232, 240)"
            strokeWidth="8"
            fill="transparent"
          />
          
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ 
              strokeDashoffset: isInView ? strokeDashoffset : circumference 
            }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold" style={{ color }}>
            {formatValue(value, unit)}
          </span>
        </div>
      </div>
    </div>
  )
}
```

### Task 3: Gauge Chart 구현
**파일**: `src/components/ui/gauge-chart.tsx`

```typescript
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { formatValue } from '@/lib/visual-metrics'

interface GaugeChartProps {
  value: number
  unit: string
  color?: string
  maxValue?: number
  className?: string
}

export function GaugeChart({ 
  value, 
  unit, 
  color = 'rgb(14, 165, 233)',
  maxValue = 100,
  className 
}: GaugeChartProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const percentage = Math.min((value / maxValue) * 100, 100)
  const angle = -90 + (percentage / 100) * 180
  
  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <div className="relative w-24 h-12">
        <svg width="96" height="48" viewBox="0 0 96 48">
          <path
            d="M 8 40 A 32 32 0 0 1 88 40"
            stroke="rgb(226, 232, 240)"
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
          />
          
          <motion.path
            d="M 8 40 A 32 32 0 0 1 88 40"
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ 
              strokeDashoffset: isInView ? 100 - (percentage * 100) / 100 : 100 
            }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
          />
          
          <motion.line
            x1="48"
            y1="40"
            x2="48"
            y2="18"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ transform: 'rotate(-90deg)' }}
            animate={{ 
              transform: isInView ? `rotate(${angle}deg)` : 'rotate(-90deg)' 
            }}
            style={{ transformOrigin: '48px 40px' }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          />
          
          <circle cx="48" cy="40" r="2" fill={color} />
        </svg>
      </div>
      
      <div className="mt-2 text-center">
        <span className="text-lg font-bold" style={{ color }}>
          {formatValue(value, unit)}
        </span>
      </div>
    </div>
  )
}
```

### Task 4: Bar Chart 구현
**파일**: `src/components/ui/bar-chart.tsx`

```typescript
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { formatValue } from '@/lib/visual-metrics'

interface BarChartProps {
  value: number
  unit: string
  color?: string
  maxValue?: number
  baseline?: number
  className?: string
}

export function BarChart({ 
  value, 
  unit, 
  color = 'rgb(34, 197, 94)',
  maxValue = 100,
  baseline,
  className 
}: BarChartProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const height = Math.min((value / maxValue) * 100, 100)
  const baselineHeight = baseline ? Math.min((baseline / maxValue) * 100, 100) : 0
  
  return (
    <div ref={ref} className={`flex flex-col items-center h-32 ${className}`}>
      <div className="flex-1 flex items-end justify-center w-16 relative">
        {baseline && (
          <div 
            className="absolute w-full border-t-2 border-dashed border-slate-400"
            style={{ bottom: `${baselineHeight}%` }}
          />
        )}
        
        <motion.div
          className="w-8 rounded-t-md"
          style={{ 
            backgroundColor: color,
            backgroundImage: `linear-gradient(to top, ${color}, ${color}dd)`
          }}
          initial={{ height: 0 }}
          animate={{ height: isInView ? `${height}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      
      <div className="mt-2 text-center">
        <span className="text-lg font-bold" style={{ color }}>
          {formatValue(value, unit)}
        </span>
      </div>
    </div>
  )
}
```

### Task 5: Speedometer & Circular Chart 구현
**파일**: `src/components/ui/speedometer-chart.tsx`

```typescript
'use client'

import { GaugeChart } from './gauge-chart'

interface SpeedometerChartProps {
  value: number
  unit: string
  color?: string
  className?: string
}

export function SpeedometerChart(props: SpeedometerChartProps) {
  return <GaugeChart {...props} maxValue={props.unit === 'fps' ? 60 : 1000} />
}
```

**파일**: `src/components/ui/circular-chart.tsx`

```typescript
'use client'

import { DonutChart } from './donut-chart'

export function CircularChart(props: any) {
  return <DonutChart {...props} />
}
```

## 🔍 테스트 시나리오
1. 각 차트 컴포넌트 개별 렌더링 테스트
2. 애니메이션 동작 확인
3. 다양한 값과 단위 테스트
4. 반응형 레이아웃 확인

## 📚 참고 문서
- [02-chart-components.md](../implementation/02-chart-components.md)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## ⚠️ 주의사항
- `'use client'` 지시어 필수
- RGB 색상값 직접 사용
- SVG viewBox 비율 유지
- 애니메이션 성능 최적화

## 🏁 완료 체크리스트
- [ ] Progress Chart 구현
- [ ] Donut Chart 구현
- [ ] Gauge Chart 구현
- [ ] Bar Chart 구현
- [ ] Speedometer Chart 구현
- [ ] Circular Chart 구현
- [ ] 모든 차트 애니메이션 확인
- [ ] TypeScript 타입 체크 통과

---

**다음 스토리**: [Story 4.3 - 비주얼 메트릭스 섹션 통합](./story-4.3-visual-metrics-section-integration.md)