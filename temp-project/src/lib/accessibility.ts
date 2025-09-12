/**
 * 접근성 관련 유틸리티
 */

/**
 * WCAG AA 색상 대비 검증
 */
export const checkColorContrast = (
  foreground: string, 
  background: string
): { ratio: number; isAA: boolean; isAAA: boolean } => {
  // RGB 값 추출
  const getRGB = (color: string) => {
    const hex = color.replace('#', '')
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    }
  }
  
  // 상대 휘도 계산
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }
  
  const fgRGB = getRGB(foreground)
  const bgRGB = getRGB(background)
  
  const fgLuminance = getLuminance(fgRGB.r, fgRGB.g, fgRGB.b)
  const bgLuminance = getLuminance(bgRGB.r, bgRGB.g, bgRGB.b)
  
  const ratio = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                (Math.min(fgLuminance, bgLuminance) + 0.05)
  
  return {
    ratio,
    isAA: ratio >= 4.5,   // WCAG AA 기준
    isAAA: ratio >= 7.0   // WCAG AAA 기준
  }
}

/**
 * 테마별 색상 대비 검증
 */
export const validateThemeContrast = (theme: 'light' | 'dark'): boolean => {
  const colorPairs = theme === 'light' ? [
    { fg: '#0f172a', bg: '#ffffff' }, // 기본 텍스트
    { fg: '#334155', bg: '#f8fafc' }, // 부제목
    { fg: '#64748b', bg: '#ffffff' }, // 캡션
  ] : [
    { fg: '#f1f5f9', bg: '#0f172a' }, // 기본 텍스트  
    { fg: '#cbd5e1', bg: '#1e293b' }, // 부제목
    { fg: '#94a3b8', bg: '#0f172a' }, // 캡션
  ]
  
  return colorPairs.every(({ fg, bg }) => {
    const result = checkColorContrast(fg, bg)
    return result.isAA
  })
}

/**
 * 접근성 알림 설정
 */
export const announceThemeChange = (theme: 'light' | 'dark'): void => {
  if (typeof document === 'undefined') return
  
  // 스크린 리더용 알림 영역 생성
  let announcer = document.getElementById('theme-announcer')
  if (!announcer) {
    announcer = document.createElement('div')
    announcer.id = 'theme-announcer'
    announcer.setAttribute('aria-live', 'polite')
    announcer.setAttribute('aria-atomic', 'true')
    announcer.className = 'sr-only'
    document.body.appendChild(announcer)
  }
  
  // 테마 변경 알림
  announcer.textContent = `테마가 ${theme === 'light' ? '라이트' : '다크'} 모드로 변경되었습니다.`
  
  // 3초 후 알림 내용 제거
  setTimeout(() => {
    if (announcer) announcer.textContent = ''
  }, 3000)
}

/**
 * 키보드 접근성 개선
 */
export const enhanceKeyboardAccessibility = (): void => {
  if (typeof document === 'undefined') return
  
  // Tab 키 포커스 표시 개선
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation')
    }
  })
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation')
  })
}

/**
 * 접근성 CSS 추가
 */
export const injectAccessibilityCSS = (): void => {
  if (typeof document === 'undefined') return
  
  const css = `
    /* 스크린 리더 전용 */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    /* 키보드 네비게이션 시 포커스 표시 */
    .keyboard-navigation *:focus {
      outline: 2px solid #3b82f6 !important;
      outline-offset: 2px !important;
    }
    
    /* 고대비 모드 대응 */
    @media (prefers-contrast: high) {
      .theme-transition {
        transition: none !important;
      }
    }
    
    /* 애니메이션 비활성화 대응 */
    @media (prefers-reduced-motion: reduce) {
      .theme-transition,
      .theme-toggle * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    
    /* 포커스 표시 개선 */
    button:focus-visible,
    [role="button"]:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  `
  
  const style = document.createElement('style')
  style.textContent = css
  style.setAttribute('data-accessibility', 'true')
  document.head.appendChild(style)
}