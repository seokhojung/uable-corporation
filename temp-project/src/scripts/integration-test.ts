/**
 * 최종 통합 테스트 스크립트
 */

import { runUserScenarioTests } from './user-scenario-test'
import { printChecklistReport } from './production-checklist'
import { generatePerformanceReport } from '../lib/performance-monitor'

/**
 * 전체 테스트 실행
 */
export const runIntegrationTests = async (): Promise<void> => {
  if (typeof window === 'undefined') return
  
  console.group('🧪 Integration Tests Starting...')
  
  try {
    // 1. 사용자 시나리오 테스트
    console.log('1️⃣ Running user scenario tests...')
    runUserScenarioTests()
    
    // 2. 성능 테스트
    console.log('2️⃣ Generating performance report...')
    const perfReport = await generatePerformanceReport()
    console.table(perfReport)
    
    // 3. 프로덕션 체크리스트
    console.log('3️⃣ Running production checklist...')
    await printChecklistReport()
    
    // 4. 브라우저 호환성 테스트
    console.log('4️⃣ Checking browser compatibility...')
    const compatibility = {
      cssVariables: CSS.supports('color', 'var(--color)'),
      localStorage: typeof Storage !== 'undefined',
      darkModeMedia: window.matchMedia('(prefers-color-scheme: dark)').matches !== undefined,
      intersectionObserver: 'IntersectionObserver' in window,
    }
    console.table(compatibility)
    
    console.log('✅ Integration tests completed successfully!')
    
  } catch (error) {
    console.error('❌ Integration tests failed:', error)
  } finally {
    console.groupEnd()
  }
}

// 개발 환경에서 자동 실행
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // 페이지 로드 후 3초 뒤 실행
  setTimeout(runIntegrationTests, 3000)
}