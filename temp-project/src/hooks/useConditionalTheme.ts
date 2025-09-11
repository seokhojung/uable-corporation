'use client'

import { useMigrationContext } from '@/contexts/MigrationContext'
import { applyThemeClasses } from '@/lib/theme-class-mapping'

/**
 * 조건부 테마 적용 훅
 */
export const useConditionalTheme = () => {
  const { isMigrated } = useMigrationContext()
  
  const isThemeSystemEnabled = isMigrated('ThemeSystem') || 
                              process.env.NEXT_PUBLIC_THEME_SYSTEM !== 'false'
  
  /**
   * 컴포넌트별 테마 클래스 적용
   */
  const getThemeClasses = (
    originalClasses: string,
    componentName?: string
  ): string => {
    // 특정 컴포넌트가 마이그레이션되지 않은 경우 원본 유지
    if (componentName && !isMigrated(componentName)) {
      return originalClasses
    }
    
    return applyThemeClasses(originalClasses, isThemeSystemEnabled)
  }
  
  /**
   * 강제 테마 모드 확인
   */
  const getForcedTheme = (): 'light' | 'dark' | null => {
    if (process.env.NEXT_PUBLIC_FORCE_LIGHT_MODE === 'true') return 'light'
    if (process.env.NEXT_PUBLIC_FORCE_DARK_MODE === 'true') return 'dark'
    return null
  }
  
  /**
   * 디버그 모드 확인
   */
  const isDebugMode = process.env.NEXT_PUBLIC_THEME_DEBUG === 'true'
  
  return {
    isThemeSystemEnabled,
    getThemeClasses,
    getForcedTheme,
    isDebugMode,
    isMigrated
  }
}