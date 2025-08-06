# 기술적인 가정 (Technical Assumptions)

## 리포지토리 구조 (Repository Structure): Monorepo
하나의 저장소(Repository) 안에서 프론트엔드와 백엔드를 함께 관리하는 방식입니다. 초기 설정이 간편하고, 코드 재사용이 용이하며, 소규모 팀이 빠르게 개발하기에 가장 효율적입니다.

## 서비스 아키텍처 (Service Architecture): Serverless
문의 양식 처리와 같이 간단하고 독립적인 백엔드 기능 구현에 가장 적합합니다. Vercel, Netlify와 같은 최신 호스팅 플랫폼의 무료 플랜과 가장 잘 맞으며, 별도의 서버를 항상 켜놓을 필요가 없어 비용 효율적입니다.

## 테스트 요구사항 (Testing Requirements): Unit + Integration
각각의 작은 기능(Unit)들이 정상적으로 동작하는지 확인하고, 이 기능들이 합쳐졌을 때(Integration), 예를 들어 '문의 양식 제출부터 데이터베이스 저장까지'의 과정이 문제없이 작동하는지를 검증합니다. 품질과 개발 속도 사이의 합리적인 균형점입니다.

## 추가 기술 가정 및 요청 (Additional Technical Assumptions and Requests)
* **핵심 프레임워크:** **Next.js (React 기반)** 사용을 강력히 권장합니다.
* **데이터베이스:** Vercel Postgres, Supabase 등 무료 플랜을 제공하는 서버리스 데이터베이스를 사용하여 문의 내역을 저장합니다. 