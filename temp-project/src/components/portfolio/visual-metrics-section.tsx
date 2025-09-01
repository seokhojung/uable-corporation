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