// src/styles/design-tokens.ts
// 다크모드/라이트모드 색상 토큰 시스템

export const colorTokens = {
  // 다크모드 색상
  dark: {
    // 배경 색상
    background: {
      primary: 'bg-slate-900',
      secondary: 'bg-slate-800',
      tertiary: 'bg-slate-700',
      card: 'bg-slate-800/80',
      overlay: 'bg-slate-900/80',
      glass: 'bg-slate-800/20',
    },
    
    // 텍스트 색상
    text: {
      primary: 'text-slate-100',
      secondary: 'text-slate-300',
      tertiary: 'text-slate-400',
      muted: 'text-slate-500',
      inverse: 'text-slate-900',
    },
    
    // 테두리 색상
    border: {
      primary: 'border-slate-700',
      secondary: 'border-slate-600',
      accent: 'border-slate-500',
      subtle: 'border-slate-700/20',
    },
    
    // 버튼 색상
    button: {
      primary: 'bg-slate-600 hover:bg-slate-700 text-slate-100',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
      outline: 'border-slate-600 text-slate-100 hover:bg-slate-700',
      ghost: 'text-slate-100 hover:bg-slate-800',
    },
    
    // 배지 색상
    badge: {
      primary: 'bg-slate-700 text-slate-100 border-slate-600',
      secondary: 'bg-slate-600 text-slate-100 border-slate-500',
      outline: 'border-slate-600 text-slate-300',
    },
    
    // 그라데이션
    gradient: {
      primary: 'bg-gradient-to-r from-slate-600 to-slate-700',
      secondary: 'bg-gradient-to-r from-slate-500 to-slate-600',
      accent: 'bg-gradient-to-r from-slate-400 to-slate-500',
      background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    },
  },
  
  // 라이트모드 색상 (향후 구현)
  light: {
    // 배경 색상
    background: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      tertiary: 'bg-gray-100',
      card: 'bg-white/80',
      overlay: 'bg-white/80',
      glass: 'bg-white/20',
    },
    
    // 텍스트 색상
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      tertiary: 'text-gray-600',
      muted: 'text-gray-500',
      inverse: 'text-white',
    },
    
    // 테두리 색상
    border: {
      primary: 'border-gray-200',
      secondary: 'border-gray-300',
      accent: 'border-gray-400',
      subtle: 'border-gray-200/20',
    },
    
    // 버튼 색상
    button: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      outline: 'border-gray-300 text-gray-700 hover:bg-gray-50',
      ghost: 'text-gray-700 hover:bg-gray-100',
    },
    
    // 배지 색상
    badge: {
      primary: 'bg-blue-100 text-blue-800 border-blue-200',
      secondary: 'bg-gray-100 text-gray-800 border-gray-200',
      outline: 'border-gray-300 text-gray-700',
    },
    
    // 그라데이션
    gradient: {
      primary: 'bg-gradient-to-r from-blue-500 to-blue-600',
      secondary: 'bg-gradient-to-r from-gray-400 to-gray-500',
      accent: 'bg-gradient-to-r from-gray-300 to-gray-400',
      background: 'bg-gradient-to-br from-white via-gray-50 to-white',
    },
  },
}

// 현재 테마 (기본값: 다크모드)
export const currentTheme = 'dark'

// 테마별 색상 가져오기 함수
export const getThemeColors = (theme: 'dark' | 'light' = currentTheme) => {
  return colorTokens[theme]
}

// 조건부 클래스 생성 함수
export const getThemeClass = (
  darkClass: string,
  lightClass: string,
  theme: 'dark' | 'light' = currentTheme
) => {
  return theme === 'dark' ? darkClass : lightClass
}

// 색상 유틸리티 함수들
export const themeUtils = {
  // 배경 클래스
  bg: (variant: 'primary' | 'secondary' | 'tertiary' | 'card' | 'overlay' | 'glass') => 
    getThemeClass(
      colorTokens.dark.background[variant],
      colorTokens.light.background[variant]
    ),
  
  // 텍스트 클래스
  text: (variant: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'inverse') => 
    getThemeClass(
      colorTokens.dark.text[variant],
      colorTokens.light.text[variant]
    ),
  
  // 테두리 클래스
  border: (variant: 'primary' | 'secondary' | 'accent' | 'subtle') => 
    getThemeClass(
      colorTokens.dark.border[variant],
      colorTokens.light.border[variant]
    ),
  
  // 버튼 클래스
  button: (variant: 'primary' | 'secondary' | 'outline' | 'ghost') => 
    getThemeClass(
      colorTokens.dark.button[variant],
      colorTokens.light.button[variant]
    ),
  
  // 배지 클래스
  badge: (variant: 'primary' | 'secondary' | 'outline') => 
    getThemeClass(
      colorTokens.dark.badge[variant],
      colorTokens.light.badge[variant]
    ),
  
  // 그라데이션 클래스
  gradient: (variant: 'primary' | 'secondary' | 'accent' | 'background') => 
    getThemeClass(
      colorTokens.dark.gradient[variant],
      colorTokens.light.gradient[variant]
    ),
}

// CSS 변수 정의 (향후 사용)
export const cssVariables = {
  dark: {
    '--bg-primary': '#0f172a',
    '--bg-secondary': '#1e293b',
    '--bg-tertiary': '#334155',
    '--text-primary': '#f1f5f9',
    '--text-secondary': '#cbd5e1',
    '--text-tertiary': '#94a3b8',
    '--border-primary': '#334155',
    '--border-secondary': '#475569',
  },
  light: {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8fafc',
    '--bg-tertiary': '#f1f5f9',
    '--text-primary': '#0f172a',
    '--text-secondary': '#334155',
    '--text-tertiary': '#64748b',
    '--border-primary': '#e2e8f0',
    '--border-secondary': '#cbd5e1',
  },
} 