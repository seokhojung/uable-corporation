'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'
import { useIsMounted } from '@/contexts/ThemeContext'

/**
 * ThemeToggle 컴포넌트의 스타일 변형 정의
 * CVA를 사용하여 다양한 크기와 스타일 지원
 */
const themeToggleVariants = cva(
  // 기본 스타일 - 모든 변형에 공통 적용
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 
          'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600',
        ghost: 
          'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-slate-800 dark:hover:text-slate-100',
        outline:
          'border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-100',
      },
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10', 
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

interface ThemeToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof themeToggleVariants> {
  /** 추가적인 CSS 클래스명 */
  className?: string
}

/**
 * 테마 토글 버튼 컴포넌트
 * 
 * 다크/라이트 모드를 전환할 수 있는 버튼 컴포넌트입니다.
 * CVA 패턴을 사용하여 다양한 스타일과 크기를 지원하며,
 * SSR 환경에서도 안전하게 동작합니다.
 * 
 * @example
 * ```tsx
 * <ThemeToggle variant="outline" size="lg" />
 * ```
 */
export const ThemeToggle = ({ 
  variant, 
  size, 
  className, 
  ...props 
}: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme()
  const mounted = useIsMounted()

  // SSR 중에는 기본 아이콘 표시 (Hydration mismatch 방지)
  if (!mounted) {
    return (
      <button 
        className={cn(themeToggleVariants({ variant, size }), className)} 
        disabled
        aria-label="테마 토글 (로딩 중)"
        {...props}
      >
        <Sun className="h-4 w-4" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(themeToggleVariants({ variant, size }), className)}
      aria-label={`${theme === 'light' ? '다크' : '라이트'} 모드로 전환`}
      title={`${theme === 'light' ? '다크' : '라이트'} 모드로 전환`}
      type="button"
      {...props}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300 transition-transform duration-200" />
      ) : (
        <Sun className="h-4 w-4 text-yellow-500 transition-transform duration-200" />
      )}
      <span className="sr-only">
        현재 {theme === 'light' ? '라이트' : '다크'} 모드, 클릭하여 {theme === 'light' ? '다크' : '라이트'} 모드로 전환
      </span>
    </button>
  )
}