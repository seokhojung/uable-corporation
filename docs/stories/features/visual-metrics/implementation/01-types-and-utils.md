# 01. 타입 시스템 및 유틸리티

> **실제 프로젝트 기반 - 기존 코드와 100% 호환**

## 🎯 목표
기존 `PortfolioProject['visualMetrics']` 타입을 그대로 사용하면서 차트 렌더링에 필요한 유틸리티 함수만 추가합니다.

## 📂 생성할 파일
- `src/lib/visual-metrics.ts` (새 파일)

## 🔧 구현 내용

### 기존 타입 그대로 사용
```typescript
// src/lib/visual-metrics.ts
import { PortfolioProject } from '@/types/portfolio'

// 기존 타입 재사용 (변경 없음)
export type CoreValue = NonNullable<PortfolioProject['visualMetrics']>['coreValues'][0]
export type Differentiator = NonNullable<PortfolioProject['visualMetrics']>['differentiators'][0]

// 실제 Tailwind 색상 매핑 (기존 색상 시스템 활용)
export const COLOR_MAP = {
  // 기존 tailwind.config.ts의 색상 사용
  primary: 'rgb(14, 165, 233)',      // primary-500 (0ea5e9)
  accent: 'rgb(217, 70, 239)',       // accent-500 (d946ef)  
  success: 'rgb(34, 197, 94)',       // success-500 (22c55e)
  error: 'rgb(239, 68, 68)',         // error-500 (ef4444)
  slate: 'rgb(100, 116, 139)'        // slate-500
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

// 값 포맷팅 (실제 사용될 형태)
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

// 애니메이션 설정 (Framer Motion 12.23.12 호환)
export const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
} as const

// 차트별 애니메이션 딜레이
export function getAnimationDelay(index: number): number {
  return index * 0.1 // 100ms 간격
}
```

## ✅ 검증 포인트
1. 기존 타입 시스템과 완벽 호환
2. 실제 Tailwind 색상 사용 
3. Framer Motion 12.23.12 API 준수
4. 현실적인 유틸리티 함수

## 📋 다음 단계
→ **02-chart-components.md** 진행