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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">핵심 성과 지표</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validCoreValues.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-colors"
                initial={ANIMATION_CONFIG.initial}
                animate={ANIMATION_CONFIG.animate}
                transition={{
                  ...ANIMATION_CONFIG.transition,
                  delay: getAnimationDelay(index)
                }}
              >
                <div className="text-center space-y-4">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-slate-300 uppercase tracking-wide">
                    {metric.label}
                  </h4>
                  
                  <div className="py-4">
                    {renderChart(metric, index)}
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">기술적 차별화 요소</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validDifferentiators.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-colors"
                initial={ANIMATION_CONFIG.initial}
                animate={ANIMATION_CONFIG.animate}
                transition={{
                  ...ANIMATION_CONFIG.transition,
                  delay: getAnimationDelay(validCoreValues.length + index)
                }}
              >
                <div className="text-center space-y-4">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-slate-300 uppercase tracking-wide">
                    {metric.label}
                  </h4>
                  
                  <div className="py-4">
                    {renderChart(metric, index)}
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
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