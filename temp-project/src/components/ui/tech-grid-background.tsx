'use client'

import { useTheme } from '@/contexts/ThemeContext'

interface TechGridBackgroundProps {
  className?: string
  enabled?: boolean
}

export function TechGridBackground({
  className = '',
  enabled = true
}: TechGridBackgroundProps) {
  const { theme } = useTheme()

  if (!enabled) return null

  // 테마별 색상 설정
  const getGridColor = () => {
    switch (theme) {
      case 'brand':
        return 'rgba(46, 139, 87, 0.03)' // 브랜드 그린
      case 'dark':
        return 'rgba(59, 130, 246, 0.03)' // 블루
      case 'light':
      default:
        return 'rgba(34, 197, 94, 0.03)' // 라이트 그린
    }
  }

  const getPulseColor = () => {
    switch (theme) {
      case 'brand':
        return 'rgba(46, 139, 87, 0.15)' // 브랜드 그린
      case 'dark':
        return 'rgba(59, 130, 246, 0.15)' // 블루
      case 'light':
      default:
        return 'rgba(34, 197, 94, 0.15)' // 라이트 그린
    }
  }

  return (
    <div
      className={`tech-grid-container absolute inset-0 ${className}`}
      style={{
        background: `
          linear-gradient(90deg, transparent 24px, ${getGridColor()} 25px, ${getGridColor()} 26px, transparent 27px),
          linear-gradient(transparent 24px, ${getGridColor()} 25px, ${getGridColor()} 26px, transparent 27px)
        `,
        backgroundSize: '25px 25px',
      }}
    >
    </div>
  )
}