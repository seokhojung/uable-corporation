# Story 4.1: 비주얼 메트릭스 기반 구조 설정

## 📋 Story 정보
- **Epic**: Epic 4 - 포트폴리오 비주얼 메트릭스 시스템
- **예상 소요 시간**: 2시간
- **우선순위**: 높음
- **담당자**: AI Developer

## 🎯 Story 목표
포트폴리오 상세 페이지에 시각화된 성과 지표를 표시하기 위한 기반 구조를 설정합니다. 기존 시스템과 100% 호환되는 타입 시스템과 유틸리티 함수를 구현합니다.

## ✅ 완료 조건 (Acceptance Criteria)
1. 기존 `PortfolioProject` 타입과 완벽 호환되는 타입 정의 완료
2. 차트 렌더링용 유틸리티 함수 구현
3. 색상 시스템 및 애니메이션 설정 정의
4. TypeScript 컴파일 에러 없음

## 📝 구현 태스크

### Task 1: 비주얼 메트릭스 유틸리티 라이브러리 생성
**파일**: `src/lib/visual-metrics.ts`

```typescript
// 기존 타입 재사용
import { PortfolioProject } from '@/types/portfolio'

// 타입 별칭 정의
export type CoreValue = NonNullable<PortfolioProject['visualMetrics']>['coreValues'][0]
export type Differentiator = NonNullable<PortfolioProject['visualMetrics']>['differentiators'][0]

// 색상 매핑
export const COLOR_MAP = {
  primary: 'rgb(14, 165, 233)',    // sky-500
  accent: 'rgb(217, 70, 239)',     // fuchsia-500  
  success: 'rgb(34, 197, 94)',     // green-500
  error: 'rgb(239, 68, 68)',       // red-500
  slate: 'rgb(100, 116, 139)'      // slate-500
} as const

// 차트 타입별 기본 색상
export function getDefaultColor(type: string): string {
  switch (type) {
    case 'progress':
    case 'gauge':
      return COLOR_MAP.primary
    case 'donut':
      return COLOR_MAP.accent
    case 'bar':
      return COLOR_MAP.success
    case 'speedometer':
      return COLOR_MAP.error
    case 'circular':
      return COLOR_MAP.primary
    default:
      return COLOR_MAP.slate
  }
}

// 값 포맷팅
export function formatValue(value: number, unit: string): string {
  switch (unit) {
    case '%':
      return `${Math.round(value)}%`
    case 'ms':
      return value < 1000 ? `${value}ms` : `${(value/1000).toFixed(1)}s`
    case 's':
      return `${value.toFixed(1)}s`
    case 'fps':
      return `${Math.round(value)}fps`
    case '도':
      return `${Math.round(value)}도`
    case '배':
      return `${value}배`
    case 'X':
      return `${value}X`
    case '점':
      return `${value}점`
    default:
      return `${value}${unit}`
  }
}

// 타입 가드
export function isValidCoreValue(item: any): item is CoreValue {
  return (
    item &&
    typeof item.label === 'string' &&
    typeof item.value === 'number' &&
    ['%', '배', 'X', '점'].includes(item.unit) &&
    ['donut', 'gauge', 'progress'].includes(item.type)
  )
}

export function isValidDifferentiator(item: any): item is Differentiator {
  return (
    item &&
    typeof item.label === 'string' &&
    typeof item.value === 'number' &&
    ['ms', 's', '%', '도', 'fps'].includes(item.unit) &&
    ['speedometer', 'circular', 'bar'].includes(item.type)
  )
}

// 애니메이션 설정
export const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
} as const

// 차트별 애니메이션 딜레이
export function getAnimationDelay(index: number): number {
  return index * 0.1
}
```

### Task 2: 패키지 의존성 확인
```bash
# Framer Motion이 설치되어 있는지 확인
npm list framer-motion

# 없다면 설치
npm install framer-motion@^12.23.12
```

## 🔍 테스트 시나리오
1. TypeScript 컴파일 성공 확인
2. 유틸리티 함수 단위 테스트
   - `formatValue()` 함수 테스트
   - `getDefaultColor()` 함수 테스트
   - 타입 가드 함수 테스트

## 📚 참고 문서
- [01-types-and-utils.md](../implementation/01-types-and-utils.md)
- [기존 portfolio.ts 타입 정의](../../../../data/portfolio.ts)

## ⚠️ 주의사항
- 기존 `PortfolioProject` 인터페이스 수정 금지
- 기존 타입과 100% 호환 유지
- RGB 색상값 직접 사용 (Tailwind 클래스 대신)

## 🏁 완료 체크리스트
- [ ] `visual-metrics.ts` 파일 생성
- [ ] 타입 정의 및 유틸리티 함수 구현
- [ ] TypeScript 컴파일 확인
- [ ] 기존 시스템과 충돌 없음 확인

---

**다음 스토리**: [Story 4.2 - 차트 컴포넌트 구현](./story-4.2-chart-components-implementation.md)