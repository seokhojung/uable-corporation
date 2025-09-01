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