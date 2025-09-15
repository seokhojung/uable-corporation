# UI 리팩토링 워크플로우 프로세스

## 🎯 필수 작업 순서 (절대 건너뛰지 말 것!)

### 1단계: 스토리 분석 및 계획 수립
- [ ] 스토리 문서 읽기 및 분석
- [ ] 현재 상황 파악 (기존 구현 상태 확인)
- [ ] 구현 계획 수립 및 TodoWrite로 작업 목록 생성

### 2단계: 컴포넌트 구현
- [ ] 필요한 패키지 설치
- [ ] 각 컴포넌트 개발 (Radix UI 기반)
- [ ] index.ts 파일로 export 관리
- [ ] TodoWrite로 진행 상황 추적

### 3단계: 시각적 검증 환경 구축
- [ ] `/ui-test` 페이지에 새 컴포넌트 데모 섹션 추가
- [ ] 모든 변형(variant) 및 기능 시연
- [ ] 상호작용 가능한 예제 구현
- [ ] 개발 서버에서 동작 확인

### 4단계: 검증 문서 작성
- [ ] **위치**: `docs/stories/core/[스토리명]-verification.md`
- [ ] 구현된 컴포넌트 상세 설명
- [ ] 기능 체크리스트
- [ ] 코드 패턴 예시
- [ ] 기술적 검증 결과

### 5단계: 리뷰 문서 작성 ⚠️ **절대 빠뜨리지 말 것!**
- [ ] **위치**: `docs/ui-refactoring/reviews/[스토리명]-implementation-review.md`
- [ ] 실행 결과 요약
- [ ] 주요 성과 및 기술적 선택 근거
- [ ] 성능 메트릭 및 품질 검증
- [ ] 비즈니스 임팩트 분석
- [ ] 다음 단계 제안

## 📂 파일 구조 규칙

```
docs/
├── ui-refactoring/
│   ├── reviews/                    # 📍 리뷰는 여기!
│   │   ├── 01-story-review.md
│   │   ├── 02-story-review.md
│   │   └── [스토리명]-implementation-review.md
│   └── workflow-process.md         # 이 파일
├── stories/
│   ├── core/                       # 검증 문서는 여기
│   │   ├── 01-verification.md
│   │   └── [스토리명]-verification.md
│   └── features/
src/components/primitives/          # 구현 코드는 여기
```

## 🚨 자주 하는 실수들

### ❌ 절대 하지 말 것
1. **리뷰 문서를 다른 곳에 작성** → 반드시 `docs/ui-refactoring/reviews/`에!
2. **검증 없이 바로 리뷰 작성** → 검증 문서 먼저, 그 다음 리뷰!
3. **TodoWrite 사용 안함** → 진행 상황 추적 필수!
4. **시각적 검증 환경 구축 생략** → `/ui-test` 업데이트 필수!

### ✅ 반드시 확인할 것
1. **파일 경로가 올바른가?**
   - 검증: `docs/stories/core/`
   - 리뷰: `docs/ui-refactoring/reviews/`
2. **모든 단계를 완료했는가?**
   - 구현 → 시각적 검증 → 검증 문서 → 리뷰 문서
3. **TodoWrite로 진행 상황을 추적하고 있는가?**

## 📝 문서 템플릿

### 검증 문서 템플릿
```markdown
# [스토리명] - Implementation Verification Report

## 📋 Overview
## ✅ Completed Components  
## 🔧 Visual Testing Environment
## 📊 Technical Architecture
## ✅ Verification Checklist
## 🎯 Next Steps
## 📈 Impact Assessment
## 🏆 Summary
```

### 리뷰 문서 템플릿
```markdown
# [스토리명] Implementation Review & Summary

## 📊 실행 결과 요약
## 🎯 주요 성과
## 📁 파일 구조
## 🔧 핵심 기술 선택
## 🚀 특별한 기능
## 📊 성능 메트릭
## 🔍 품질 검증
## 🎯 다음 단계 제안
## 📈 비즈니스 임팩트
## 🏆 결론
```

## 🎯 체크리스트 (매번 확인!)

**스토리 구현 시작 전:**
- [ ] 이 워크플로우 문서를 다시 읽었는가?
- [ ] TodoWrite로 작업 계획을 세웠는가?

**구현 중:**
- [ ] 각 컴포넌트마다 TodoWrite 상태 업데이트하고 있는가?
- [ ] `/ui-test` 페이지에 데모를 추가하고 있는가?

**구현 완료 후:**
- [ ] 검증 문서를 `docs/stories/core/`에 작성했는가?
- [ ] 리뷰 문서를 `docs/ui-refactoring/reviews/`에 작성했는가?
- [ ] 두 문서 모두 완성되어야 진짜 완료!

## 💡 기억할 점

1. **순서가 중요하다**: 구현 → 검증 → 리뷰 순서 지키기
2. **위치가 중요하다**: 리뷰는 반드시 `docs/ui-refactoring/reviews/`에!
3. **추적이 중요하다**: TodoWrite로 진행 상황 계속 업데이트
4. **완성도가 중요하다**: 모든 단계 완료해야 진짜 끝

---

**이 문서를 매번 참조하여 실수하지 말자!** 🎯