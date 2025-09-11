# 다크/라이트 모드 토글 구현 워크플로우

## 🎯 필수 작업 순서 (절대 건너뛰지 말 것!)

### 📖 Story 기반 구현 워크플로우

**각 Story는 독립적으로 완료해야 함**: 구현 → 검증 → 리뷰 → 다음 Story

### 1단계: Story 분석 및 계획 수립
- [ ] **해당 Story 문서 정독** (`stories/0X-[phase-name].md`의 개별 Story)
- [ ] **Story별 목표 및 완료 기준 확인**
- [ ] **TodoWrite로 Story별 세부 작업 목록 생성**
- [ ] **전제조건 충족 확인** (이전 Story 완료 상태)

### 2단계: Story 구현 실행
- [ ] **Story별 구현 작업 수행** (코드 작성, 파일 생성/수정)
- [ ] **각 단계마다 TodoWrite 상태 업데이트**
- [ ] **Story 완료 기준 체크리스트 확인**
- [ ] **실제 브라우저에서 동작 테스트**

### 3단계: Story 검증 환경 구축 ⚠️ **매 Story 완료 후 필수!**
- [ ] **구현된 기능의 실제 동작 확인**
- [ ] **UI 테스트 페이지에 데모 섹션 추가** (`/ui-test` 페이지 활용)
- [ ] **모바일/데스크톱 반응형 테스트**
- [ ] **Feature Flag 동작 검증**
- [ ] **접근성 및 키보드 네비게이션 테스트**

### 4단계: Story별 검증 문서 작성
- [ ] **위치**: `docs/Dark-Light-Mode-Toggle/verification/story-[X]-verification.md`
- [ ] **Story에서 구현된 기능 상세 설명**
- [ ] **실제 동작 스크린샷 또는 설명**
- [ ] **완료 기준 체크리스트 확인 결과**
- [ ] **발견된 이슈 및 해결책**
- [ ] **다음 Story 진행을 위한 전제조건 확인**

### 5단계: Story별 리뷰 문서 작성 ⚠️ **절대 빠뜨리지 말 것!**
- [ ] **위치**: `docs/ui-refactoring/reviews/theme-system-story-[X]-review.md`
- [ ] **Story 실행 결과 요약 및 성과 분석**
- [ ] **해당 Story의 기술적 선택 근거 분석**
- [ ] **MigrationContext 통합 효과** (해당되는 경우)
- [ ] **사용자 경험에 미친 영향**
- [ ] **다음 Story에 대한 추천사항 및 주의점**

### 6단계: Phase 완료 후 통합 검증 ⚠️ **각 Phase의 모든 Story 완료 후**
- [ ] **Phase 내 모든 Story 통합 동작 확인**
- [ ] **Phase별 종합 검증 문서 작성** (`phase-[X]-integration-verification.md`)
- [ ] **다음 Phase 진행 전제조건 확인**

### 7단계: 최종 통합 테스트 (모든 Phase 완료 후)
- [ ] **전체 시스템 통합 테스트 실행**
- [ ] **사용자 시나리오 기반 E2E 테스트**
- [ ] **프로덕션 체크리스트 실행 및 통과**
- [ ] **최종 성능 및 접근성 보고서 작성**
- [ ] **배포 준비 상태 확인**

---

## 📂 파일 구조 규칙

```
docs/Dark-Light-Mode-Toggle/
├── stories/                           # 📍 구현 가이드
│   ├── README.md                      # 전체 개요
│   ├── 01-infrastructure-setup.md     # Phase 1 가이드
│   ├── 02-ui-components.md           # Phase 2 가이드  
│   ├── 03-migration-system.md        # Phase 3 가이드
│   └── 04-optimization-testing.md    # Phase 4 가이드
├── verification/                      # 📍 Phase별 검증 문서
│   ├── phase-1-verification.md       # 인프라 검증
│   ├── phase-2-verification.md       # UI 컴포넌트 검증
│   ├── phase-3-verification.md       # 마이그레이션 검증
│   └── phase-4-verification.md       # 최적화 검증
└── implementation-strategy.md         # 전체 전략 문서

docs/ui-refactoring/reviews/           # 📍 Phase별 리뷰 문서
├── theme-system-phase-1-review.md    # 인프라 리뷰
├── theme-system-phase-2-review.md    # UI 컴포넌트 리뷰
├── theme-system-phase-3-review.md    # 마이그레이션 리뷰
├── theme-system-phase-4-review.md    # 최적화 리뷰
└── theme-system-final-review.md      # 최종 통합 리뷰

temp-project/src/
├── contexts/
│   ├── ThemeContext.tsx              # 테마 상태 관리
│   └── MigrationContext.tsx          # 기존 마이그레이션 (수정)
├── components/
│   ├── primitives/ThemeToggle/        # 새로운 컴포넌트
│   └── ui/theme-toggle.tsx           # 어댑터 컴포넌트
├── hooks/
│   ├── useTheme.ts                   # 테마 훅
│   └── useConditionalTheme.ts        # 조건부 테마 훅
├── lib/
│   ├── theme-utils.ts                # 테마 유틸리티
│   ├── theme-class-mapping.ts        # 클래스 변환
│   └── accessibility.ts             # 접근성 도구
└── app/ui-test/                      # 시각적 검증 환경
```

---

## 🚨 테마 시스템 구현 시 자주 하는 실수들

### ❌ 절대 하지 말 것
1. **Phase 순서 건너뛰기** → 인프라 없이 UI 컴포넌트 구현 금지!
2. **MigrationContext 무시** → 기존 시스템과 반드시 연동!
3. **Feature Flag 없이 구현** → 안전한 롤백 메커니즘 필수!
4. **SSR 고려 안함** → Hydration mismatch 반드시 방지!
5. **접근성 검증 생략** → WCAG 기준 준수 필수!
6. **성능 측정 안함** → 전환 시간 100ms 이하 목표!

### ✅ 반드시 확인할 것
1. **Phase별 완료 기준 체크리스트 모두 통과했는가?**
2. **환경변수로 Feature Flag 제어 가능한가?**
   ```bash
   NEXT_PUBLIC_THEME_SYSTEM=false  # 비활성화 테스트
   NEXT_PUBLIC_THEME_SYSTEM=true   # 활성화 테스트
   ```
3. **MigrationContext와 올바르게 통합되었는가?**
4. **모든 브라우저에서 No-Flash 스크립트 동작하는가?**
5. **키보드 네비게이션 완벽히 지원하는가?**

---

## 📝 Phase별 문서 템플릿

### Phase 검증 문서 템플릿
```markdown
# Phase [X] - [Phase Name] Verification Report

## 📋 Phase Overview
- **목표**: [해당 Phase의 주요 목표]
- **소요시간**: [실제 소요시간] / [예상 시간]
- **난이도**: [경험한 실제 난이도]

## ✅ 구현 완료 항목
- [ ] [구현 항목 1]
- [ ] [구현 항목 2]
- [ ] [구현 항목 3]

## 🔧 테스트 환경 구축
- **UI Test 페이지**: [스크린샷 또는 설명]
- **테스트 시나리오**: [주요 테스트 케이스]
- **디버깅 도구**: [사용한 디버깅 도구]

## 📊 기술적 검증
- **성능 메트릭**: [측정된 성능 데이터]
- **접근성 점수**: [WCAG 준수 여부]
- **브라우저 호환성**: [테스트 결과]

## 🐛 발견된 이슈 및 해결책
- **이슈 1**: [문제점] → [해결책]
- **이슈 2**: [문제점] → [해결책]

## ✅ Phase 완료 기준 체크리스트
[해당 Phase의 완료 기준 모두 체크]

## 🎯 다음 Phase 준비사항
[다음 Phase 진행을 위한 준비사항]

## 📈 Phase 영향 평가
[이 Phase로 인한 시스템 개선 효과]
```

### Phase 리뷰 문서 템플릿
```markdown
# Theme System Phase [X] Implementation Review

## 📊 Phase 실행 결과 요약
- **Phase**: [X] - [Phase Name]
- **실행 기간**: [시작일] ~ [완료일]
- **실제 소요시간**: [X]시간 ([예상 대비 %])
- **전체 진행률**: [X]% (4개 Phase 중 [X]번째 완료)

## 🎯 Phase 주요 성과
### 기능적 성과
- [주요 기능 구현 성과 1]
- [주요 기능 구현 성과 2]

### 기술적 성과  
- [기술적 선택의 효과]
- [아키텍처 개선 효과]

## 📁 구현된 파일 구조
[이 Phase에서 생성/수정된 파일 목록]

## 🔧 핵심 기술 선택 분석
### [기술 선택 1]
- **선택 이유**: [근거]
- **대안 대비 장점**: [비교 분석]
- **실제 효과**: [측정된 결과]

## 🚀 이 Phase의 특별한 기능
[해당 Phase에서 구현한 혁신적이거나 중요한 기능]

## 📊 성능 메트릭
- **테마 전환 시간**: [X]ms (목표: <100ms)
- **번들 크기 증가**: [X]KB
- **Lighthouse 점수**: [점수] (이전 대비 변화)
- **메모리 사용량**: [측정 결과]

## 🔍 품질 검증 결과
- **타입 안전성**: ✅/❌ [검증 결과]
- **단위 테스트**: [통과율]%
- **E2E 테스트**: [통과율]%
- **접근성 준수**: [WCAG 레벨] 준수

## ⚠️ 발견된 리스크 및 대응
[발견된 위험 요소와 대응 방안]

## 🎯 다음 Phase 추천사항
[다음 Phase 진행 시 고려할 점]

## 📈 비즈니스 임팩트 예측
[사용자 경험 개선, 개발 생산성 향상 등]

## 🏆 Phase 완료 평가
- **계획 대비 달성도**: [X]%
- **품질 수준**: [평가]
- **다음 Phase 준비도**: [준비 상태]
```

---

## 🎯 Phase별 실행 체크리스트

### Phase 1: 인프라 구축 (75분)
**시작 전 체크리스트:**
- [ ] 이 워크플로우 문서를 읽었는가?
- [ ] `01-infrastructure-setup.md` 스토리를 분석했는가?
- [ ] TodoWrite로 세부 작업 계획을 세웠는가?
- [ ] 현재 Tailwind 설정을 확인했는가?

**진행 중 체크리스트:**
- [ ] Tailwind `darkMode: 'class'` 설정 완료
- [ ] No-Flash 스크립트 적용 및 테스트
- [ ] ThemeContext 구현 및 SSR 안전 패턴 적용
- [ ] TodoWrite 상태를 실시간 업데이트하고 있는가?

**완료 후 체크리스트:**
- [ ] 기존 페이지가 깨지지 않고 다크 테마 유지되는가?
- [ ] 개발자 도구에서 `<html class="dark">` 확인되는가?
- [ ] `phase-1-verification.md` 문서 작성 완료
- [ ] `theme-system-phase-1-review.md` 리뷰 문서 작성 완료

### Phase 2: UI 컴포넌트 (65분)
**시작 전 체크리스트:**
- [ ] Phase 1이 완전히 완료되었는가?
- [ ] CVA 패키지가 설치되어 있는가?
- [ ] MigrationContext 구조를 이해했는가?

**진행 중 체크리스트:**
- [ ] ThemeToggle 새 컴포넌트 (CVA 패턴) 구현
- [ ] 어댑터 컴포넌트로 점진적 마이그레이션 지원
- [ ] Header에 테마 토글 버튼 통합
- [ ] 모바일 반응형 지원
- [ ] `/ui-test` 페이지에 테마 토글 데모 추가 ⚠️ **필수!**

**완료 후 체크리스트:**
- [ ] 테마 전환이 즉시 동작하는가?
- [ ] MigrationContext로 컴포넌트 전환 제어되는가?
- [ ] 접근성 속성이 올바르게 설정되었는가?
- [ ] `phase-2-verification.md` 문서 작성 완료
- [ ] `theme-system-phase-2-review.md` 리뷰 문서 작성 완료

### Phase 3: 마이그레이션 시스템 ✅ **완료** (실제 소요: 28분/예상 120분)
**시작 전 체크리스트:**
- [x] Phase 2 UI 컴포넌트가 완전히 동작하는가?
- [x] 클래스 변환 매핑 전략을 이해했는가?

**진행 중 체크리스트:**
- [x] **Story 5**: MigrationContext에 'ThemeToggle' 등록 (8분)
- [x] **Story 6**: 환경변수 활성화 시스템 구축 (5분)  
- [x] **Story 7**: 클래스 변환 유틸리티 시스템 구현 (15분)
- [x] Feature Flag로 ThemeToggle 활성화 (Phase 3: 70% 마이그레이션)
- [x] CVA 기반 새로운 ThemeToggle 컴포넌트 동작 확인

**완료 후 체크리스트:**
- [x] 새로운 CVA ThemeToggle이 완벽히 동작하는가? ✅
- [x] Feature Flag로 활성화/비활성화 제어되는가? ✅
- [x] MigrationContext를 통한 점진적 전환이 동작하는가? ✅
- [x] **Story 기반 검증 문서 작성 완료**:
  - [x] `story-5-verification.md` - MigrationContext 등록 검증 
  - [x] `story-6-verification.md` - 환경변수 활성화 검증
  - [x] `story-7-verification.md` - 클래스 변환 유틸리티 검증
- [x] **Story 기반 리뷰 문서 작성 완료**:
  - [x] `story-5-review.md` - MigrationContext 등록 성과 분석
  - [x] `story-6-review.md` - 환경변수 시스템 효과 분석  
  - [x] `story-7-review.md` - 유틸리티 시스템 완성도 평가

**Phase 3 주요 성과**:
- ✅ **완벽한 점진적 마이그레이션**: MigrationContext + Feature Flag 2중 제어
- ✅ **포괄적 클래스 변환 시스템**: 31개 Tailwind 클래스 매핑 + 4개 유틸리티 함수
- ✅ **Zero-Downtime 활성화**: 환경변수만으로 즉시 새 컴포넌트 사용
- ✅ **70% 마이그레이션 달성**: Button, Badge, ThemeToggle 완전 전환

### Phase 4: 최적화 및 테스트 (75분)
**시작 전 체크리스트:**
- [ ] Phase 3 마이그레이션이 모든 컴포넌트에 적용되었는가?
- [ ] 기본적인 테마 전환이 완벽히 동작하는가?

**진행 중 체크리스트:**
- [ ] CSS 변수 기반 성능 최적화
- [ ] WCAG 접근성 준수 검증 및 개선
- [ ] 자동화된 테스트 스위트 구현
- [ ] E2E 테스트 시나리오 작성 및 실행
- [ ] 프로덕션 체크리스트 실행

**완료 후 체크리스트:**
- [ ] 테마 전환 시간이 100ms 이하인가?
- [ ] Lighthouse 성능 점수 90+ 유지되는가?
- [ ] 모든 접근성 기준을 통과했는가?
- [ ] 프로덕션 배포 준비가 완료되었는가?
- [ ] `phase-4-verification.md` 문서 작성 완료
- [ ] `theme-system-phase-4-review.md` 리뷰 문서 작성 완료
- [ ] `theme-system-final-review.md` 최종 통합 리뷰 작성 완료

---

## 💡 기억할 핵심 원칙

### 1. **순서가 생명이다**
Phase 1(인프라) → Phase 2(UI) → Phase 3(마이그레이션) → Phase 4(최적화) 순서 절대 지키기

### 2. **MigrationContext 통합이 핵심이다**
기존 UI 리팩토링 시스템과 완벽 연동하여 안전한 점진적 전환 보장

### 3. **Feature Flag로 안전장치를 만든다**
언제든 롤백 가능한 환경변수 기반 제어 시스템 구축

### 4. **접근성은 타협하지 않는다**
WCAG AA 기준 준수, 키보드 네비게이션, 스크린 리더 호환성 필수

### 5. **성능은 측정 가능해야 한다**
전환 시간, Lighthouse 점수, 메모리 사용량 등 구체적 메트릭 기반 검증

### 6. **문서화가 완성도를 결정한다**
검증 문서 → 리뷰 문서 순서로 모든 Phase 완료 시 작성 필수

---

## 🚀 성공적인 테마 시스템 구현을 위한 최종 점검

**프로젝트 시작 전:**
- [ ] 이 워크플로우를 팀원과 공유했는가?
- [ ] 각 Phase별 예상 시간을 일정에 반영했는가?
- [ ] 기존 MigrationContext 시스템을 충분히 이해했는가?

**각 Phase 진행 중:**
- [ ] TodoWrite로 진행 상황을 실시간 추적하고 있는가?
- [ ] Phase별 완료 기준을 하나씩 체크하고 있는가?
- [ ] 문제 발생 시 즉시 문서화하고 해결책을 기록하고 있는가?

**전체 프로젝트 완료 후:**
- [ ] 모든 Phase의 검증 문서가 작성되었는가?
- [ ] 모든 Phase의 리뷰 문서가 작성되었는가?
- [ ] 최종 통합 리뷰 문서가 작성되었는가?
- [ ] 프로덕션 배포 준비가 완료되었는가?

---

**이 워크플로우를 따라 체계적으로 구현하면 안전하고 고품질의 테마 시스템을 구축할 수 있습니다!** 🎯