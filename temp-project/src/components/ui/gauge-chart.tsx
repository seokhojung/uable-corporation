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
    <div ref={ref} className={`flex flex-col items-center ${className || ''}`}>
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