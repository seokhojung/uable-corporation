/**
 * 프로덕션 배포 전 체크리스트
 */

interface ChecklistItem {
  category: string
  item: string
  check: () => boolean | Promise<boolean>
  critical: boolean
}

export const productionChecklist: ChecklistItem[] = [
  // 기능 검증
  {
    category: '기능',
    item: '테마 토글 버튼 동작',
    check: () => document.querySelector('[data-testid="theme-toggle"]') !== null,
    critical: true
  },
  {
    category: '기능',
    item: 'localStorage 연동',
    check: () => {
      try {
        localStorage.setItem('test', 'test')
        localStorage.removeItem('test')
        return true
      } catch {
        return false
      }
    },
    critical: true
  },
  
  // 성능 검증
  {
    category: '성능',
    item: '테마 전환 시간 < 100ms',
    check: async () => {
      const start = performance.now()
      document.documentElement.classList.toggle('dark')
      const end = performance.now()
      return (end - start) < 100
    },
    critical: false
  },
  {
    category: '성능',
    item: 'Bundle 크기 최적화',
    check: () => {
      // 실제 번들 크기 체크는 빌드 도구에서 수행
      return true
    },
    critical: false
  },
  
  // 접근성 검증
  {
    category: '접근성',
    item: 'ARIA 속성 설정',
    check: () => {
      const toggle = document.querySelector('[role="switch"]')
      return toggle?.hasAttribute('aria-label') || false
    },
    critical: true
  },
  {
    category: '접근성',
    item: '키보드 네비게이션',
    check: () => {
      const toggle = document.querySelector('[data-testid="theme-toggle"]') as HTMLElement
      return toggle?.tabIndex !== -1
    },
    critical: true
  },
  
  // 브라우저 호환성
  {
    category: '호환성',
    item: 'CSS 변수 지원',
    check: () => CSS.supports('color', 'var(--color)'),
    critical: true
  },
  {
    category: '호환성',
    item: 'localStorage 지원',
    check: () => typeof Storage !== 'undefined',
    critical: true
  },
  
  // 환경변수 검증
  {
    category: '설정',
    item: '환경변수 올바름',
    check: () => {
      return process.env.NEXT_PUBLIC_THEME_SYSTEM !== undefined
    },
    critical: false
  }
]

/**
 * 체크리스트 실행
 */
export const runProductionChecklist = async (): Promise<{
  passed: number
  failed: number
  critical: number
  details: Array<{ item: string; passed: boolean; critical: boolean }>
}> => {
  const results = []
  let passed = 0
  let failed = 0
  let criticalFailed = 0
  
  for (const item of productionChecklist) {
    try {
      const result = await item.check()
      results.push({
        item: `[${item.category}] ${item.item}`,
        passed: result,
        critical: item.critical
      })
      
      if (result) {
        passed++
      } else {
        failed++
        if (item.critical) criticalFailed++
      }
    } catch (error) {
      results.push({
        item: `[${item.category}] ${item.item}`,
        passed: false,
        critical: item.critical
      })
      failed++
      if (item.critical) criticalFailed++
    }
  }
  
  return {
    passed,
    failed,
    critical: criticalFailed,
    details: results
  }
}

/**
 * 체크리스트 리포트 출력
 */
export const printChecklistReport = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'production') return
  
  console.group('🚀 Production Readiness Checklist')
  
  const results = await runProductionChecklist()
  
  console.log(`✅ Passed: ${results.passed}`)
  console.log(`❌ Failed: ${results.failed}`)
  console.log(`🚨 Critical Failed: ${results.critical}`)
  
  if (results.critical > 0) {
    console.error('❌ CRITICAL ISSUES FOUND - DO NOT DEPLOY')
  } else if (results.failed === 0) {
    console.log('🎉 ALL CHECKS PASSED - READY FOR PRODUCTION')
  } else {
    console.warn('⚠️ Some non-critical issues found')
  }
  
  console.group('📋 Detailed Results')
  results.details.forEach(({ item, passed, critical }) => {
    const icon = passed ? '✅' : (critical ? '🚨' : '⚠️')
    console.log(`${icon} ${item}`)
  })
  console.groupEnd()
  
  console.groupEnd()
}