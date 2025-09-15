# 02. 차트 컴포넌트

> **Framer Motion 12.23.12 + 실제 Tailwind 색상 시스템**

## 🎯 목표
기존 프로젝트 구조에 맞게 차트 컴포넌트들을 `src/components/ui` 폴더에 생성합니다.

## 📂 생성할 파일
- `src/components/ui/progress-chart.tsx`
- `src/components/ui/donut-chart.tsx`  
- `src/components/ui/gauge-chart.tsx`
- `src/components/ui/bar-chart.tsx`
- `src/components/ui/speedometer-chart.tsx`
- `src/components/ui/circular-chart.tsx`

## 🔧 핵심 구현

### Progress Chart (진행률 바)
```typescript
// src/components/ui/progress-chart.tsx
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

### Donut Chart (도넛형)
```typescript
// src/components/ui/donut-chart.tsx
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
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgb(226, 232, 240)"
            strokeWidth="8"
            fill="transparent"
          />
          
          {/* Progress circle */}
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
        
        {/* Center value */}
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

### Bar Chart (막대 차트)
```typescript
// src/components/ui/bar-chart.tsx
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
        {/* Baseline indicator */}
        {baseline && (
          <div 
            className="absolute w-full border-t-2 border-dashed border-slate-400"
            style={{ bottom: `${baselineHeight}%` }}
          />
        )}
        
        {/* Bar */}
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

### Gauge Chart (게이지)
```typescript
// src/components/ui/gauge-chart.tsx
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
  const angle = -90 + (percentage / 100) * 180 // -90도에서 90도까지
  
  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <div className="relative w-24 h-12">
        <svg width="96" height="48" viewBox="0 0 96 48">
          {/* Background arc */}
          <path
            d="M 8 40 A 32 32 0 0 1 88 40"
            stroke="rgb(226, 232, 240)"
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
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
          
          {/* Needle */}
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
          
          {/* Center dot */}
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

### 나머지 컴포넌트들 (Speedometer, Circular)
```typescript
// src/components/ui/speedometer-chart.tsx - 간단 버전
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

```typescript  
// src/components/ui/circular-chart.tsx - DonutChart 재사용
'use client'

import { DonutChart } from './donut-chart'

export function CircularChart(props: any) {
  return <DonutChart {...props} />
}
```

## ✅ 검증 포인트
1. Framer Motion 12.23.12 API 정확히 사용
2. 실제 Tailwind 색상값 적용
3. 기존 프로젝트 폴더 구조 준수
4. 반응형 및 접근성 고려

## 📋 다음 단계  
→ **03-visual-metrics-section.md** 진행