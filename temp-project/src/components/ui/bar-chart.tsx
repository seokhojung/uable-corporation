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
    <div ref={ref} className={`flex flex-col items-center h-32 ${className || ''}`}>
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