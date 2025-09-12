import type { Theme } from '@/contexts/ThemeContext'

/**
 * 테마 스토리지 키
 */
export const THEME_STORAGE_KEY = 'theme'

/**
 * 테마 속성명
 */
export const THEME_ATTRIBUTE = 'data-theme'

/**
 * 초기 테마 감지 (클라이언트 전용)
 */
export const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch (error) {
    console.warn('localStorage access failed:', error)
  }
  
  // 시스템 설정 확인 (기본값은 다크)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'dark' // 기존 디자인 유지를 위해 기본값 다크
}

/**
 * 테마 적용 함수
 */
export const applyTheme = (theme: Theme): void => {
  if (typeof document === 'undefined') return
  
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
}

/**
 * 테마 저장 함수
 */
export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch (error) {
    console.warn('Failed to save theme:', error)
  }
}

/**
 * 시스템 테마 변경 감지
 */
export const watchSystemTheme = (callback: (theme: Theme) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {}
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light')
  }
  
  mediaQuery.addEventListener('change', handler)
  
  // 클린업 함수 반환
  return () => mediaQuery.removeEventListener('change', handler)
}

// =====================================================================
// Component Class Conversion Utilities for Gradual Migration
// =====================================================================

interface ClassMapping {
  light: string
  dark: string
}

/**
 * Common class mappings for theme conversion
 */
export const THEME_CLASS_MAPPINGS: Record<string, ClassMapping> = {
  // Background colors
  'bg-white': { light: 'bg-white', dark: 'dark:bg-slate-900' },
  'bg-gray-50': { light: 'bg-gray-50', dark: 'dark:bg-slate-800' },
  'bg-gray-100': { light: 'bg-gray-100', dark: 'dark:bg-slate-700' },
  'bg-slate-50': { light: 'bg-slate-50', dark: 'dark:bg-slate-800' },
  'bg-slate-100': { light: 'bg-slate-100', dark: 'dark:bg-slate-700' },
  'bg-slate-800': { light: 'bg-slate-800', dark: 'dark:bg-slate-200' },
  'bg-slate-900': { light: 'bg-slate-900', dark: 'dark:bg-white' },

  // Text colors
  'text-black': { light: 'text-black', dark: 'dark:text-white' },
  'text-white': { light: 'text-white', dark: 'dark:text-slate-900' },
  'text-gray-600': { light: 'text-gray-600', dark: 'dark:text-slate-300' },
  'text-gray-700': { light: 'text-gray-700', dark: 'dark:text-slate-200' },
  'text-gray-800': { light: 'text-gray-800', dark: 'dark:text-slate-100' },
  'text-gray-900': { light: 'text-gray-900', dark: 'dark:text-white' },
  'text-slate-100': { light: 'text-slate-100', dark: 'dark:text-slate-800' },
  'text-slate-200': { light: 'text-slate-200', dark: 'dark:text-slate-700' },
  'text-slate-300': { light: 'text-slate-300', dark: 'dark:text-slate-600' },
  'text-slate-600': { light: 'text-slate-600', dark: 'dark:text-slate-300' },
  'text-slate-700': { light: 'text-slate-700', dark: 'dark:text-slate-200' },
  'text-slate-800': { light: 'text-slate-800', dark: 'dark:text-slate-100' },
  'text-slate-900': { light: 'text-slate-900', dark: 'dark:text-white' },

  // Border colors
  'border-gray-200': { light: 'border-gray-200', dark: 'dark:border-slate-600' },
  'border-gray-300': { light: 'border-gray-300', dark: 'dark:border-slate-500' },
  'border-slate-200': { light: 'border-slate-200', dark: 'dark:border-slate-600' },
  'border-slate-300': { light: 'border-slate-300', dark: 'dark:border-slate-500' },
  'border-slate-600': { light: 'border-slate-600', dark: 'dark:border-slate-300' },
  'border-slate-700': { light: 'border-slate-700', dark: 'dark:border-slate-200' },

  // Hover states
  'hover:bg-gray-50': { light: 'hover:bg-gray-50', dark: 'dark:hover:bg-slate-800' },
  'hover:bg-gray-100': { light: 'hover:bg-gray-100', dark: 'dark:hover:bg-slate-700' },
  'hover:bg-slate-100': { light: 'hover:bg-slate-100', dark: 'dark:hover:bg-slate-700' },
  'hover:text-gray-900': { light: 'hover:text-gray-900', dark: 'dark:hover:text-white' },
  'hover:text-slate-900': { light: 'hover:text-slate-900', dark: 'dark:hover:text-white' },
}

/**
 * Convert a single CSS class to support dark mode
 */
export function convertClassToDarkMode(className: string): string {
  const mapping = THEME_CLASS_MAPPINGS[className]
  if (!mapping) {
    return className // Return as-is if no mapping found
  }
  
  // Combine light and dark classes
  return `${mapping.light} ${mapping.dark}`
}

/**
 * Convert a className string (space-separated classes) to support dark mode
 */
export function convertClassNameToDarkMode(classNames: string): string {
  return classNames
    .split(' ')
    .filter(Boolean)
    .map(convertClassToDarkMode)
    .join(' ')
}

/**
 * Theme-aware className builder utility
 */
export function themeClass(lightClass: string, darkClass: string): string {
  return `${lightClass} dark:${darkClass}`
}

/**
 * Utility for gradual component migration
 * Returns appropriate className based on migration status
 */
export function migratedClassName(
  isMigrated: boolean,
  legacyClasses: string,
  newClasses: string
): string {
  return isMigrated ? newClasses : legacyClasses
}

/**
 * Class name presets for common component patterns
 */
export const THEME_PRESETS = {
  card: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600',
  input: 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100',
  button: {
    primary: 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100',
    secondary: 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100'
  },
  text: {
    primary: 'text-slate-900 dark:text-slate-100',
    secondary: 'text-slate-600 dark:text-slate-400',
    muted: 'text-slate-500 dark:text-slate-500'
  }
} as const