
-----

# **3D/AR/WebXR 포트폴리오 웹사이트 UI/UX 명세서**

## **1. 소개 (Introduction)**

이 문서는 3D/AR/WebXR 포트폴리오 웹사이트의 사용자 경험 목표, 정보 구조, 사용자 흐름 및 시각 디자인 사양을 정의합니다. 응집력 있고 사용자 중심적인 경험을 보장하여, 시각 디자인 및 프론트엔드 개발의 기반 역할을 합니다.

### **디자인 원칙 (Design Principles)**

1.  **명확한 구조로 신뢰를 구축한다 (Build Trust Through Clear Structure)**
2.  **의도적인 디테일로 가치를 더한다 (Add Value with Intentional Details)**
3.  **디자인이 사용자를 선도한다 (Design Leads the User)**
4.  **본질에 집중하는 단순함 (Simplicity Focused on the Essence)**

-----

## **2. 정보 구조 (Information Architecture)**

### **사이트맵 (Sitemap)**

```mermaid
graph TD
    A[홈 (랜딩 페이지)] --> B[포트폴리오];
    A --> C[문의하기];

    subgraph "관리자 영역"
        D[관리자 로그인] --> E[문의 내역 확인];
    end
```

### **네비게이션 구조 (Navigation Structure)**

  * **주요 네비게이션 (헤더):** 로고(홈), 포트폴리오, 문의하기(강조된 버튼)
  * **푸터 네비게이션:** 헤더와 동일한 주요 링크 포함
  * **브레드크럼:** 포트폴리오 상세 페이지에만 적용 (`홈 > 포트폴리오 > [프로젝트명]`)

-----

## **3. 사용자 흐름 (User Flows)**

### **흐름 1: 핵심 역량 탐색 및 신뢰 형성 흐름**

  * **사용자 목표:** 방문자가 회사의 기술력을 이해하고, 포트폴리오를 통해 신뢰를 얻어 '프로젝트 문의'까지 자연스럽게 이어지게 한다.
  * **흐름 다이어그램:**
    ```mermaid
    graph TD
        A[Start: 웹사이트 방문] --> B[랜딩 페이지 탐색];
        B --> C{실제 사례가 궁금한가?};
        C -->|Yes| D[포트폴리오 목록 페이지로 이동];
        C -->|No| E[랜딩 페이지 내 포트폴리오 확인];
        D --> F[프로젝트 목록 브라우징];
        E --> F;
        F --> G[특정 프로젝트 클릭];
        G --> H[포트폴리오 상세 페이지];
        H --> I{신뢰가 생겼는가?};
        I -->|Yes| J['문의하기' 버튼 클릭];
        I -->|No| K[사이트 이탈];
        J --> L([End: 문의하기 페이지 도착]);
    ```

### **흐름 2: 문의 양식 작성 및 제출 흐름**

  * **사용자 목표:** 방문자가 자신의 프로젝트 아이디어를 명확하고 편리하게 전달하고, 성공적으로 제출하여 응답을 기대할 수 있게 한다.
  * **흐름 다이어그램 (개선안 반영):**
    ```mermaid
    graph TD
        A[Start: '문의하기' 페이지 진입] --> B[양식 필드 입력];
        B --> C[제출 버튼 클릭];
        C --> C_loading[버튼 '전송 중...' 상태로 변경 & 로딩 표시];
        C_loading --> D{입력값 유효성 검사};
        D -- 실패 --> E[오류 메시지 표시];
        E --> C_end[버튼 기본 상태로 복원];
        C_end --> B;
        D -- 성공 --> F[백엔드 API로 데이터 전송];
        F --> G{API 처리 결과};
        G -- 성공 --> H[성공 메시지 표시];
        G -- 실패 --> I[실패 메시지 표시];
        H --> J([End: 플로우 종료]);
        I --> C_end;
    ```

-----

## **4. 와이어프레임 컨셉 (Wireframe Concepts)**

*(대화에서 확정된 랜딩 페이지, 포트폴리오 목록/상세 페이지, 문의하기 페이지의 텍스트 기반 레이아웃 설명)*

-----

## **5. 시각적 에셋 전략 (Visual Asset Strategy - 무료 플랜 버전)**

  * **아이콘:** `Material Symbols`, `Tabler Icons` 등 고품질 무료 SVG 라이브러리 중 하나를 일관되게 사용
  * **이미지/영상:** `Unsplash`, `Pexels` 등에서 엄격한 '시각적 스타일 가이드'에 따라 선별하여 사용

-----

## **6. 컴포넌트 아키텍처 (Component Architecture)**

### **현대적 컴포넌트 시스템 (2025-09-15 현재)**

  * **기반 기술:** CVA(Class Variance Authority) + Radix UI
  * **컴포넌트 구조:**
      * **`@/components/primitives/`**: 현대적 컴포넌트 시스템
        - Button, Badge, Card, Input, Modal, Select, Tabs 등
        - TypeScript 완전 지원, 접근성 내장
      * **`@/components/ui/`**: 특수 목적 컴포넌트
        - Charts, Container, ThemeToggle 등
      * **`@/components/layout/`**: 레이아웃 컴포넌트
        - Header, Footer 등
      * **`@/components/sections/`**: 페이지 섹션 컴포넌트
        - Hero, Problem, Solution 등

### **컴포넌트 패턴**

  * **Variant Pattern**: CVA를 통한 다양한 스타일 변형 지원
  * **Compound Pattern**: Card + CardHeader + CardContent 등
  * **Polymorphic Pattern**: asChild prop을 통한 유연한 렌더링
  * **Forward Ref Pattern**: DOM 요소 접근을 위한 ref 전달

### **상태 관리**

  * **테마 상태**: React Context를 통한 다크/라이트 모드
  * **폼 상태**: React Hook Form + Zod 검증
  * **컴포넌트 상태**: 로컬 useState 및 useReducer

-----

## **7. 디자인 시스템 (Design System)**

  * **색상:** 다크 모드 기반 (차콜, 오프화이트, 테크 블루 포인트)
  * **타이포그래피:**
      * **헤드라인:** `IBM Plex Sans KR` (산세리프)
      * **본문:** `Noto Sans KR` (산세리프)
  * **컴포넌트 변형:**
      * **Button:** primary, secondary, ghost, outline 등
      * **Badge:** default, success, warning, error 등
      * **Card:** default, elevated, outlined, ghost, glass 등

-----

## **8. 애니메이션 및 성능**

  * **원칙:** 핵심 요소에만 임팩트 있는 효과를, 나머지는 절제된 효과를 사용
  * **프로세스:** 모든 효과는 개발 중 지속적인 성능 테스트를 거쳐 승인 후 적용