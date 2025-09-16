'use client'

import React, { useMemo } from 'react'
import { Palette, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import type { Theme } from '@/contexts/ThemeContext'

/**
 * 안전한 브랜드 테마 토글 버튼 (전략 1: 조건부 클래스 분할)
 * Light ↔ Brand 모드 전환
 */

interface BrandToggleThemeClasses {
  button: string
  icon: string
}

const getBrandToggleClasses = (theme: Theme | undefined): BrandToggleThemeClasses => {
  // 타입 안전성 보장
  if (!theme || !['light', 'dark', 'brand'].includes(theme)) {
    theme = 'light'
  }

  const themeClassMap: Record<Theme, BrandToggleThemeClasses> = {
    light: {
      button: 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50',
      icon: 'text-gray-600'
    },
    dark: {
      button: 'bg-slate-800 border-slate-600 text-gray-400 hover:bg-slate-700',
      icon: 'text-gray-400'
    },
    brand: {
      button: 'bg-primary-100 border-primary-100 text-custom-text-100 hover:bg-primary-200',
      icon: 'text-custom-text-100'
    }
  }

  return themeClassMap[theme]
}

export const BrandThemeToggle: React.FC = () => {
  const { theme, setTheme, mounted } = useTheme()

  // 성능 최적화: 테마 클래스 메모이제이션
  const themeClasses = useMemo(() => {
    const safeTheme = mounted ? theme : 'light'
    return getBrandToggleClasses(safeTheme)
  }, [theme, mounted])

  // SSR 안전성: 마운트 전에는 기본 버튼 표시
  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-lg border border-gray-300 bg-white flex items-center justify-center"
        disabled
      >
        <Sun className="w-4 h-4 text-gray-400" />
      </button>
    )
  }

  const toggleBrandLight = () => {
    const newTheme = theme === 'brand' ? 'light' : 'brand'
    setTheme(newTheme)
  }

  return (
    <button
      onClick={toggleBrandLight}
      className={`w-10 h-10 rounded-lg border transition-all duration-200 flex items-center justify-center ${themeClasses.button}`}
      title={theme === 'brand' ? '라이트 모드로 전환' : '브랜드 모드로 전환'}
    >
      {theme === 'brand' ? (
        <Sun className={`w-4 h-4 ${themeClasses.icon}`} />
      ) : (
        <Palette className={`w-4 h-4 ${themeClasses.icon}`} />
      )}
    </button>
  )
}