/**
 * 테마 성능 모니터링 유틸리티
 */

interface PerformanceMetrics {
  themeTransitionTime: number
  bundleSize: number
  memoryUsage: number
  renderTime: number
}

/**
 * 성능 메트릭 수집
 */
export const collectPerformanceMetrics = (): Partial<PerformanceMetrics> => {
  const metrics: Partial<PerformanceMetrics> = {}
  
  // 메모리 사용량 (Chrome만 지원)
  if ('memory' in performance) {
    // @ts-ignore
    metrics.memoryUsage = performance.memory.usedJSHeapSize
  }
  
  // 렌더링 시간
  const paintEntries = performance.getEntriesByType('paint')
  const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
  if (fcp) {
    metrics.renderTime = fcp.startTime
  }
  
  return metrics
}

/**
 * Lighthouse 성능 점수 추정
 */
export const estimatePerformanceScore = (): number => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  
  if (!navigation) return 0
  
  const fcp = navigation.loadEventEnd - navigation.fetchStart
  const lcp = fcp // 근사치
  
  // 간단한 점수 계산 (실제 Lighthouse 알고리즘은 더 복잡)
  let score = 100
  
  if (fcp > 1800) score -= 20
  if (fcp > 3000) score -= 30
  if (lcp > 2500) score -= 25
  
  return Math.max(0, score)
}

/**
 * 번들 크기 분석
 */
export const analyzeBundleSize = (): Promise<number> => {
  return new Promise((resolve) => {
    if (typeof navigator !== 'undefined' && 'storage' in navigator) {
      navigator.storage.estimate().then(estimate => {
        resolve(estimate.usage || 0)
      }).catch(() => resolve(0))
    } else {
      resolve(0)
    }
  })
}

/**
 * 성능 리포트 생성
 */
export const generatePerformanceReport = async (): Promise<PerformanceMetrics> => {
  const metrics = collectPerformanceMetrics()
  const bundleSize = await analyzeBundleSize()
  
  return {
    themeTransitionTime: metrics.themeTransitionTime || 0,
    bundleSize,
    memoryUsage: metrics.memoryUsage || 0,
    renderTime: metrics.renderTime || 0
  }
}

/**
 * 성능 경고 시스템
 */
export const setupPerformanceWarnings = (): void => {
  if (process.env.NODE_ENV !== 'development') return
  
  // 긴 작업 감지
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(`🐌 Long task detected: ${entry.duration.toFixed(2)}ms`)
        }
      }
    })
    
    observer.observe({ entryTypes: ['longtask'] })
  }
  
  // 메모리 누수 감지
  setInterval(() => {
    if ('memory' in performance) {
      // @ts-ignore
      const memory = performance.memory as any
      if (memory?.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB 초과
        console.warn(`🧠 High memory usage: ${(memory?.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`)
      }
    }
  }, 30000) // 30초마다 체크
}