'use client'

import React from 'react'
import { Palette, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export const BrandThemeToggle: React.FC = () => {
  const { theme, setTheme, mounted } = useTheme()

  // SSR 방지
  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center"
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
      className={`
        w-10 h-10 rounded-lg border transition-all duration-200 flex items-center justify-center
        ${theme === 'brand'
          ? 'bg-brand-primary border-brand-primary text-white hover:bg-brand-darker'
          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-600 dark:text-gray-400 dark:hover:bg-slate-700'
        }
      `}
      title={theme === 'brand' ? '라이트 모드로 전환' : '브랜드 모드로 전환'}
    >
      {theme === 'brand' ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Palette className="w-4 h-4" />
      )}
    </button>
  )
}