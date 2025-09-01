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
    <div ref={ref} className={`w-full ${className || ''}`}>
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