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
    <div ref={ref} className={`flex flex-col items-center ${className || ''}`}>
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