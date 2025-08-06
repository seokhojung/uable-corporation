// src/components/ui/theme-toggle.tsx
'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from './button'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const ThemeToggle = ({ className = '', size = 'md' }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  // 클라이언트 사이드에서만 실행
  useEffect(() => {
    setMounted(true)
    // 로컬 스토리지에서 테마 가져오기
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light'
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    // HTML 클래스 업데이트 (향후 CSS 변수 적용 시 사용)
    document.documentElement.classList.toggle('light', newTheme === 'light')
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  // 서버 사이드 렌더링 방지
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size={size}
        className={`w-10 h-10 p-0 ${className}`}
        disabled
      >
        <div className="w-4 h-4 bg-slate-300 rounded animate-pulse" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleTheme}
      className={`w-10 h-10 p-0 transition-all duration-300 hover:bg-slate-800/50 ${className}`}
      aria-label={`${theme === 'dark' ? '라이트' : '다크'} 모드로 전환`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-slate-300 hover:text-slate-100 transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 hover:text-slate-900 transition-colors" />
      )}
    </Button>
  )
}

// 테마 컨텍스트 (향후 전역 상태 관리용)
export const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light'
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return { theme, toggleTheme }
} 