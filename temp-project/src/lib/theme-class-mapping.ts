/**
 * 테마 클래스 매핑 정의
 */
export const themeClassMapping = {
  // 배경색 매핑
  backgrounds: {
    'bg-slate-900': 'bg-gray-50 dark:bg-slate-900',
    'bg-slate-900/80': 'bg-gray-50/95 dark:bg-slate-900/80',
    'bg-slate-800': 'bg-gray-100 dark:bg-slate-800',
    'bg-slate-800/20': 'bg-gray-50/20 dark:bg-slate-800/20',
    'bg-slate-700': 'bg-gray-100 dark:bg-slate-700',
    'bg-slate-700/30': 'bg-gray-200/30 dark:bg-slate-700/30',
    'bg-slate-600': 'bg-gray-200 dark:bg-slate-600',
    'bg-slate-600/20': 'bg-gray-200/20 dark:bg-slate-600/20',
    'bg-slate-600/10': 'bg-gray-200/10 dark:bg-slate-600/10',
    'bg-slate-500': 'bg-gray-300 dark:bg-slate-500',
    'bg-slate-500/20': 'bg-gray-300/20 dark:bg-slate-500/20',
    'bg-slate-500/10': 'bg-gray-300/10 dark:bg-slate-500/10',
    'bg-slate-400': 'bg-gray-400 dark:bg-slate-400',
    'bg-slate-400/20': 'bg-gray-400/20 dark:bg-slate-400/20',
    'bg-slate-400/10': 'bg-gray-400/10 dark:bg-slate-400/10',
    'bg-slate-200': 'bg-gray-700 dark:bg-slate-200',
    'bg-slate-100': 'bg-gray-800 dark:bg-slate-100',
    
    // 그라디언트 배경
    'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900': 
      'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
    'bg-gradient-to-br from-slate-900 to-slate-800':
      'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800',
    'bg-gradient-to-r from-slate-600 to-slate-700': 
      'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-600 dark:to-slate-700',
    'bg-gradient-to-r from-slate-700 to-slate-800': 
      'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-800',
    'bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900':
      'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900',
    'bg-gradient-to-r from-slate-600/10 to-slate-500/10':
      'bg-gradient-to-r from-gray-200/10 to-gray-300/10 dark:from-slate-600/10 dark:to-slate-500/10',
    'bg-gradient-to-r from-slate-500/10 to-slate-400/10':
      'bg-gradient-to-r from-gray-300/10 to-gray-400/10 dark:from-slate-500/10 dark:to-slate-400/10',
    'bg-gradient-to-r from-slate-500/20 to-slate-400/20':
      'bg-gradient-to-r from-gray-300/20 to-gray-400/20 dark:from-slate-500/20 dark:to-slate-400/20',
    'bg-gradient-to-r from-slate-600/20 to-slate-500/20':
      'bg-gradient-to-r from-gray-200/20 to-gray-300/20 dark:from-slate-600/20 dark:to-slate-500/20',
    'bg-gradient-to-r from-slate-300 to-slate-400':
      'bg-gradient-to-r from-gray-600 to-gray-500 dark:from-slate-300 dark:to-slate-400',
  },
  
  // 텍스트 색상 매핑
  text: {
    'text-white': 'text-gray-900 dark:text-white',
    'text-slate-100': 'text-gray-900 dark:text-slate-100',
    'text-slate-200': 'text-gray-800 dark:text-slate-200',
    'text-slate-300': 'text-gray-700 dark:text-slate-300',
    'text-slate-400': 'text-gray-600 dark:text-slate-400',
    'text-slate-500': 'text-gray-500 dark:text-slate-500',
    'text-slate-600': 'text-gray-400 dark:text-slate-600',
    'text-slate-700': 'text-gray-300 dark:text-slate-700',
    'text-slate-800': 'text-gray-200 dark:text-slate-800',
    'text-slate-900': 'text-gray-100 dark:text-slate-900',
  },
  
  // 테두리 매핑
  borders: {
    'border-slate-700': 'border-gray-200 dark:border-slate-700',
    'border-slate-700/30': 'border-gray-200/30 dark:border-slate-700/30',
    'border-slate-600': 'border-gray-300 dark:border-slate-600',
    'border-slate-500': 'border-gray-400 dark:border-slate-500',
    'border-slate-300': 'border-gray-600 dark:border-slate-300',
  },
  
  // 호버 상태 매핑
  hover: {
    'hover:bg-slate-800': 'hover:bg-gray-100 dark:hover:bg-slate-800',
    'hover:bg-slate-700': 'hover:bg-gray-200 dark:hover:bg-slate-700',
    'hover:bg-slate-600': 'hover:bg-gray-300 dark:hover:bg-slate-600',
    'hover:bg-slate-200': 'hover:bg-slate-700 dark:hover:bg-slate-200',
    'hover:text-slate-100': 'hover:text-gray-900 dark:hover:text-slate-100',
    'hover:text-slate-200': 'hover:text-gray-800 dark:hover:text-slate-200',
    'hover:text-slate-300': 'hover:text-gray-700 dark:hover:text-slate-300',
    'hover:from-slate-700': 'hover:from-gray-200 dark:hover:from-slate-700',
    'hover:to-slate-800': 'hover:to-gray-300 dark:hover:to-slate-800',
  }
} as const

/**
 * 클래스 변환 함수
 */
export const convertThemeClass = (originalClass: string): string => {
  // 모든 매핑 카테고리에서 검색
  for (const category of Object.values(themeClassMapping)) {
    if (category[originalClass as keyof typeof category]) {
      return category[originalClass as keyof typeof category]
    }
  }
  
  // 매핑되지 않은 클래스는 그대로 반환
  return originalClass
}

/**
 * 복합 클래스 문자열 변환 (개선된 버전)
 */
export const convertThemeClasses = (classString: string): string => {
  // 먼저 전체 그라디언트 패턴을 처리
  let result = classString
  
  // 그라디언트 매핑 적용
  Object.entries(themeClassMapping.backgrounds).forEach(([original, mapped]) => {
    if (original.includes('gradient') && result.includes(original)) {
      result = result.replace(original, mapped)
    }
  })
  
  // 나머지 개별 클래스 처리
  return result
    .split(' ')
    .map(cls => {
      const trimmed = cls.trim()
      // 이미 dark: 프리픽스가 있으면 그대로 반환
      if (trimmed.includes('dark:')) return trimmed
      // 매핑 찾기
      return convertThemeClass(trimmed)
    })
    .join(' ')
}

/**
 * 조건부 테마 클래스 적용
 */
export const applyThemeClasses = (
  baseClasses: string,
  enableThemeSystem: boolean = true
): string => {
  if (!enableThemeSystem) {
    return baseClasses
  }
  
  return convertThemeClasses(baseClasses)
}

/**
 * 컴포넌트별 테마 적용 상태 추적
 */
export const componentThemeStatus = {
  'Header': false,
  'Footer': false,
  'Hero': false,
  'Button': false,
  'Card': false,
  'Portfolio': false,
  'Service': false,
  'CTA': false,
} as const

export type ComponentName = keyof typeof componentThemeStatus