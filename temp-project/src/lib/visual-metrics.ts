// 기존 타입 재사용
import { PortfolioProject } from '@/types/portfolio'

// 타입 별칭 정의
export type CoreValue = NonNullable<PortfolioProject['visualMetrics']>['coreValues'][0]
export type Differentiator = NonNullable<PortfolioProject['visualMetrics']>['differentiators'][0]

// 색상 매핑
export const COLOR_MAP = {
  primary: 'rgb(14, 165, 233)',    // sky-500
  accent: 'rgb(217, 70, 239)',     // fuchsia-500  
  success: 'rgb(34, 197, 94)',     // green-500
  error: 'rgb(239, 68, 68)',       // red-500
  slate: 'rgb(100, 116, 139)'      // slate-500
} as const

// 차트 타입별 기본 색상
export function getDefaultColor(type: string): string {
  switch (type) {
    case 'progress':
    case 'gauge':
      return COLOR_MAP.primary
    case 'donut':
      return COLOR_MAP.accent
    case 'bar':
      return COLOR_MAP.success
    case 'speedometer':
      return COLOR_MAP.error
    case 'circular':
      return COLOR_MAP.primary
    default:
      return COLOR_MAP.slate
  }
}

// 값 포맷팅
export function formatValue(value: number, unit: string): string {
  switch (unit) {
    case '%':
      return `${Math.round(value)}%`
    case 'ms':
      return value < 1000 ? `${value}ms` : `${(value/1000).toFixed(1)}s`
    case 's':
      return `${value.toFixed(1)}s`
    case 'fps':
      return `${Math.round(value)}fps`
    case '도':
      return `${Math.round(value)}도`
    case '배':
      return `${value}배`
    case 'X':
      return `${value}X`
    case '점':
      return `${value}점`
    default:
      return `${value}${unit}`
  }
}

// 타입 가드
export function isValidCoreValue(item: any): item is CoreValue {
  return (
    item &&
    typeof item.label === 'string' &&
    typeof item.value === 'number' &&
    ['%', '배', 'X', '점'].includes(item.unit) &&
    ['donut', 'gauge', 'progress'].includes(item.type)
  )
}

export function isValidDifferentiator(item: any): item is Differentiator {
  return (
    item &&
    typeof item.label === 'string' &&
    typeof item.value === 'number' &&
    ['ms', 's', '%', '도', 'fps'].includes(item.unit) &&
    ['speedometer', 'circular', 'bar'].includes(item.type)
  )
}

// 애니메이션 설정
export const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
} as const

// 차트별 애니메이션 딜레이
export function getAnimationDelay(index: number): number {
  return index * 0.1
}