
-----

# **3D/AR/WebXR 포트폴리오 웹사이트 풀스택 아키텍처 문서**

## **1. 소개 (Introduction)**

이 문서는 3D/AR/WebXR 포트폴리오 웹사이트 프로젝트의 전체 풀스택 아키텍처를 설명합니다. 여기에는 백엔드 시스템, 프론트엔드 구현 및 두 시스템 간의 통합에 대한 내용이 포함됩니다. 이 문서는 AI 기반 개발의 단일 진실 공급원(Single Source of Truth) 역할을 하여, 선택된 전체 기술 스택에 걸쳐 일관성을 보장하는 것을 목표로 합니다.

### **스타터 템플릿 또는 기존 프로젝트 (Starter Template or Existing Project)**

본 프로젝트는 특정 스타터 템플릿을 기반으로 하지는 않지만, PRD에서 합의된 바와 같이 **Next.js 프레임워크**를 기술적인 시작점으로 사용합니다. Next.js는 프론트엔드, 서버리스 백엔드, 라우팅 및 빌드 시스템에 대한 모범 사례를 제공하여 우리의 '스타터' 역할을 수행합니다.

### **변경 기록 (Change Log)**

| 날짜 | 버전 | 설명 | 작성자 |
| :--- | :--- | :--- | :--- |
| 2025-08-04 | 1.1 | 종합 검토를 통해 구조 개선안 반영 | Winston (Architect) |
| 2025-08-04 | 1.0 | 아키텍처 문서 작성 시작 | Winston (Architect) |

-----

## **2. 상위 수준 아키텍처 (High Level Architecture) - 개선안 반영**

### **기술 요약 (Technical Summary)**

본 프로젝트는 **Vercel 플랫폼**에 최적화된 **Next.js 풀스택 프레임워크**를 사용하여 구축합니다. 전체 코드는 **모노레포(Monorepo)** 구조로 관리되며, 그 안에서 **공개용 웹사이트(`web`)** 와 **내부용 대시보드(`admin`)** 를 별도의 애플리케이션으로 분리하여 성능과 유지보수성을 극대화합니다. 백엔드는 **서버리스 함수**로 구현되며, 데이터는 **Prisma(ORM)** 를 통해 **Vercel Postgres**에 저장합니다. 이 아키텍처는 고성능의 동적 웹사이트를 **무료 플랜**으로 운영해야 하는 핵심 제약 조건을 만족시키는 가장 현대적이고 실용적인 접근 방식입니다.

### **플랫폼 및 인프라 (Platform and Infrastructure)**

  * **플랫폼:** **Vercel**
  * **핵심 서비스:**
      * **Vercel Functions:** 서버리스 백엔드
      * **Vercel Postgres:** 서버리스 데이터베이스
      * **Vercel Edge Network:** CDN
  * **배포 호스트 및 지역:** Vercel의 글로벌 엣지 네트워크 (자동 관리)

### **리포지토리 구조 (Repository Structure)**

  * **구조:** **모노레포 (Monorepo)**
  * **모노레포 도구:** **npm Workspaces**

### **아키텍처 다이어그램 (Architecture Diagram)**

```mermaid
graph TD
    subgraph " "
        Visitor --> WebApp["공개용 웹사이트 (apps/web)"];
        Admin --> AdminApp["관리자 대시보드 (apps/admin)"];
    
        WebApp -- 문의 제출 --> API["API 계층 (Serverless Functions)"];
        AdminApp -- 데이터 요청 --> API;
    
        API --> Prisma["Prisma ORM (데이터 추상화)"];
        Prisma --> DB["Vercel Postgres DB"];
    end
```

### **아키텍처 패턴 (Architectural Patterns)**

  * **Jamstack 아키텍처:** 최고의 성능, 높은 보안, 뛰어난 확장성 제공.
  * **서버리스 함수 (Serverless Functions):** 비용 효율성 및 인프라 관리 부담 최소화.
  * **컴포넌트 기반 UI (Component-Based UI):** 개발 효율성, 유지보수 용이성 확보.

-----

## **3. 기술 스택 (Tech Stack)**

| 카테고리 | 기술 | 버전 | 목적 | 선택 근거 |
| :--- | :--- | :--- | :--- | :--- |
| **언어** | TypeScript | 5.5.x | 전체 개발 언어 | 코드 안정성 및 개발 생산성 극대화 |
| **프론트엔드 프레임워크** | Next.js | 15.x.x | 웹/관리자 앱 개발 | React 기반, 성능 최적화 및 풀스택 개발에 가장 이상적 |
| **UI 라이브러리** | Radix UI | 2.x.x | 헤드리스 UI 컴포넌트 | 디자인 자유도를 100% 보장하면서 기능성과 접근성을 제공 |
| **CSS 프레임워크** | Tailwind CSS | 3.5.x | 스타일링 | 빠른 속도와 일관된 스타일링, 커스텀 디자인 구현에 용이 |
| **상태 관리** | Zustand | 4.5.x | 프론트엔드 상태 관리 | 간단하고 가벼우며, 최소한의 코드로 상태 관리 가능 |
| **백엔드 프레임워크** | Next.js API Routes | 15.x.x | 서버리스 API 개발 | Next.js에 내장된 기능으로, Vercel 배포 시 자동 최적화 |
| **데이터베이스** | Vercel Postgres | 최신 | 문의 내역 저장 | Vercel 플랫폼과 완벽하게 통합되며, 무료 플랜 제공 |
| **ORM** | Prisma | 5.15.x | 데이터베이스 추상화 | DB 변경 유연성 확보 및 안전한 데이터베이스 접근 |
| **인증** | NextAuth.js | 5.x.x | 관리자 페이지 인증 | Next.js와의 통합이 매우 간편하고, 보안 기능이 강력함 |
| **단위/통합 테스트** | Jest, RTL | 29.x.x | 코드 품질 보증 | React/Next.js 생태계의 표준 테스트 도구 |
| **E2E 테스트** | Playwright | 1.45.x | 사용자 시나리오 테스트 | 실제 브라우저 환경에서 사용자 흐름을 자동 테스트 |
| **CI/CD 및 호스팅** | Vercel | N/A | 빌드/배포/호스팅 | Next.js 프로젝트를 위한 가장 최적화된 원클릭 솔루션 |
| **분석 및 모니터링** | Vercel Analytics | N/A | 트래픽 및 성능 분석 | Vercel에 내장된 기능으로, 추가 설정 없이 사용 가능 |

-----

## **4. 데이터 모델 (Data Models)**

### **Inquiry (문의 내역)**

  * **목적:** 웹사이트의 '문의하기' 양식을 통해 잠재 고객이 제출한 프로젝트 문의 내용을 체계적으로 저장하기 위한 데이터 모델입니다.
  * **TypeScript 인터페이스 (in `packages/shared`):**
    ```typescript
    export interface Inquiry {
      id: string;
      createdAt: Date;
      name: string;
      companyName?: string;
      phone?: string;
      email: string;
      inquiryType: 'CONFIGURATOR' | 'AR' | 'WEBXR' | 'UIUX' | 'SAAS' | 'OTHER';
      budget?: string;
      projectDetails: string;
      status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED';
    }
    ```

-----

## **5. API 명세 (API Specification)**

  * **형식:** OpenAPI 3.0
  * **핵심 엔드포인트:**
      * `POST /contact`: 신규 문의 제출 (reCAPTCHA v3 보호 적용)
      * `GET /inquiries`: 모든 문의 목록 조회 (관리자 전용, NextAuth.js 인증)
      * `PUT /inquiries/{id}`: 특정 문의 상태 업데이트 (관리자 전용, NextAuth.js 인증)
  * **보안:** NextAuth.js를 통한 세션 기반 인증 및 내장된 CSRF 보호 기능 활성화.

-----

## **6. 컴포넌트 (Components)**

  * **Web App:** 일반 방문자용 프론트엔드
  * **Admin App:** 관리자용 프론트엔드 대시보드
  * **API Service:** 서버리스 백엔드 로직
  * **Database Service:** Prisma를 통한 데이터 계층
  * **Shared Package:** 공통 타입 및 유틸리티 공유

-----

## **7. 외부 API (External APIs)**

  * **Google reCAPTCHA:** 문의 양식 스팸 및 악용 방지

-----

## **8. 핵심 워크플로우 (Core Workflows)**

  * **문의 제출:** 방문자 → 프론트엔드 → reCAPTCHA 토큰 발급 → 백엔드 → reCAPTCHA 검증 → 데이터베이스 저장 → 성공/실패 응답. (제출 버튼 클릭 시 로딩 상태 표시 UI 개선안 반영)

-----

## **9. 데이터베이스 스키마 (Database Schema)**

  * **형식:** Prisma Schema
  * **핵심 모델:** `Inquiry` 모델에 `status`, `inquiryType`, `email` 필드에 대한 데이터베이스 인덱스를 추가하여 관리자 페이지의 조회 성능을 향상시키고, 개인정보 수집 동의 절차를 UI에 추가할 것을 명시함.

-----

## **11. 체크리스트 결과 보고서 (Checklist Results Report)**

  * **검토 결과:** **개발 준비 완료 (Ready for Development)**. 본 아키텍처는 명확성, 확장성, 보안, 성능 및 개발 용이성 등 모든 핵심 항목에서 높은 점수를 받았습니다.

-----

## **12. 다음 단계 (Next Steps)**

  * **계획 단계 완료:** 이 아키텍처 문서를 끝으로, 프로젝트의 모든 공식적인 계획 및 설계 단계가 완료되었습니다.
  * **개발 단계로 전환:** IDE 환경에서 `po` 또는 `sm` 에이전트를 호출하여 완성된 문서를 잘게 나누고(Sharding) 첫 번째 개발 스토리 생성을 지시하는 것으로 시작됩니다.