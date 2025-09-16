'use client'

import { useMigrationContext } from '@/contexts/MigrationContext'
import { ThemeToggle as NewThemeToggle } from '@/components/primitives/ThemeToggle'
import { Sun, Moon } from 'lucide-react'
import { useTheme, useIsMounted } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'
import { announceThemeChange } from '@/lib/accessibility'

/**
 * Legacy 테마 토글 컴포넌트
 * 기존 스타일을 유지하여 디자인 영향을 최소화
 */
const LegacyThemeToggle = ({ 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) => {
  const { theme, toggleTheme, isTransitioning } = useTheme()
  const mounted = useIsMounted()

  // 접근성 개선된 토글 함수
  const handleToggle = async () => {
    if (isTransitioning) return

    // Brand 테마에서도 Light로 가도록 수정
    const newTheme = (theme === 'light' || theme === 'brand') ? 'dark' : 'light'

    // 테마 변경
    toggleTheme()

    // 스크린 리더 알림
    announceThemeChange(newTheme)
  }

  // SSR 중에는 기본 아이콘 표시
  if (!mounted) {
    return (
      <button 
        className={cn(
          'w-10 h-10 p-0 rounded-md bg-slate-700 text-slate-100 transition-all duration-300 hover:bg-slate-800/50',
          className
        )} 
        disabled
        aria-label="테마 설정 로딩 중..."
        {...props}
      >
        <Sun className="transition-transform duration-200" />
      </button>
    )
  }

  const isDark = theme === 'dark'
  const isBrand = theme === 'brand'
  const nextTheme = (isDark || isBrand) ? '라이트' : '다크'

  return (
    <button
      onClick={handleToggle}
      disabled={isTransitioning}
      className={cn(
        'w-10 h-10 p-0 rounded-md transition-all duration-300 hover:bg-slate-800/50',
        isTransitioning && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={`${nextTheme} 모드로 전환`}
      title={`현재: ${isDark ? '다크' : isBrand ? '브랜드' : '라이트'} 모드 (클릭하여 ${nextTheme} 모드로 전환)`}
      role="switch"
      aria-checked={isDark}
      type="button"
      {...props}
    >
      {(isDark || isBrand) ? (
        <Sun
          className={cn(
            'w-4 h-4 text-yellow-500 transition-all duration-200',
            'rotate-0 scale-100 hover:rotate-12',
            isTransitioning && 'animate-pulse'
          )}
          aria-hidden="true"
        />
      ) : (
        <Moon
          className={cn(
            'w-4 h-4 text-slate-700 dark:text-slate-300 transition-all duration-200',
            'rotate-0 scale-100 hover:-rotate-12',
            isTransitioning && 'animate-pulse'
          )}
          aria-hidden="true"
        />
      )}
      
      {/* 스크린 리더용 텍스트 */}
      <span className="sr-only">
        현재 {isDark ? '다크' : isBrand ? '브랜드' : '라이트'} 모드, {nextTheme} 모드로 전환하려면 클릭하세요
      </span>
    </button>
  )
}

/**
 * 어댑터 패턴을 사용한 테마 토글 컴포넌트
 * 
 * MigrationContext를 통해 점진적으로 새로운 컴포넌트로 전환됩니다.
 * Feature Flag가 활성화되면 새로운 CVA 기반 컴포넌트를 사용하고,
 * 그렇지 않으면 기존 스타일을 유지합니다.
 */
export const ThemeToggle = (props: any) => {
  const { isMigrated } = useMigrationContext()
  
  // Feature Flag와 Migration 상태 확인
  // 테마 시스템 기본 활성화(명시적으로 'false'인 경우만 비활성)
  const showThemeSystem = process.env.NEXT_PUBLIC_THEME_SYSTEM !== 'false'
  const useNewToggle = process.env.NEXT_PUBLIC_THEME_TOGGLE_MIGRATED === 'true' && isMigrated('ThemeToggle')
  
  // 테마 시스템이 비활성화된 경우 null 반환
  if (!showThemeSystem) {
    return null
  }
  
  // 새로운 컴포넌트 사용
  if (useNewToggle) {
    return <NewThemeToggle {...props} />
  }
  
  // 기존 컴포넌트 사용 (현재는 이 경로로 동작)
  return <LegacyThemeToggle {...props} />
}

// 이전 useTheme 훅은 제거됨 - ThemeContext의 useTheme를 대신 사용
