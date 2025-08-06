# Story 3.1: [백엔드] 문의 데이터 저장을 위한 API 및 데이터베이스 설정

## 스토리 개요 (Story Overview)
**As a** 개발자  
**I want to** 문의 데이터를 안전하게 저장할 수 있는 백엔드 API와 데이터베이스를 구축하고  
**So that** 방문자들의 문의 내용이 체계적으로 관리되고 추후 관리자 페이지에서 조회할 수 있습니다.

## 기능적 요구사항 (Functional Requirements)

### 3.1.1 데이터베이스 스키마 설계
- **문의 테이블 (inquiries) 구조 정의**
  - `id`: 고유 식별자 (UUID)
  - `name`: 문의자 이름 (필수)
  - `email`: 이메일 주소 (필수, 이메일 형식 검증)
  - `phone`: 전화번호 (선택)
  - `company`: 회사명 (선택)
  - `subject`: 문의 제목 (필수)
  - `message`: 문의 내용 (필수, 최소 10자)
  - `category`: 문의 카테고리 (선택: 'general', 'project', 'partnership', 'other')
  - `status`: 처리 상태 (기본값: 'new', 옵션: 'new', 'in_progress', 'completed', 'spam')
  - `priority`: 우선순위 (기본값: 'normal', 옵션: 'low', 'normal', 'high', 'urgent')
  - `created_at`: 생성일시 (자동)
  - `updated_at`: 수정일시 (자동)
  - `ip_address`: IP 주소 (스팸 방지용)
  - `user_agent`: 사용자 에이전트 (스팸 방지용)

### 3.1.2 API 엔드포인트 구현
- **POST /api/inquiries** - 문의 생성
  - 요청 본문 검증 (필수 필드, 이메일 형식, 내용 길이)
  - 스팸 방지 로직 (IP 기반, 내용 기반)
  - 데이터베이스 저장
  - 성공/실패 응답

### 3.1.3 데이터 검증 및 보안
- **입력 데이터 검증**
  - 필수 필드 검증
  - 이메일 형식 검증
  - XSS 방지 (입력 데이터 이스케이프)
  - SQL 인젝션 방지
  - 요청 크기 제한 (1MB)

### 3.1.4 스팸 방지 기능
- **기본 스팸 방지**
  - IP 기반 요청 제한 (1분당 3회)
  - 동일 이메일 제한 (1시간당 5회)
  - 의심스러운 키워드 필터링
  - reCAPTCHA 연동 준비

## 비기능적 요구사항 (Non-Functional Requirements)

### 3.1.5 성능 요구사항
- **응답 시간**: API 응답 시간 500ms 이내
- **동시 처리**: 최소 100명 동시 접속 처리
- **데이터베이스**: 쿼리 최적화 및 인덱싱

### 3.1.6 보안 요구사항
- **데이터 보호**: 개인정보 암호화 저장
- **접근 제어**: API 엔드포인트 보안
- **로깅**: 보안 이벤트 로깅

### 3.1.7 확장성 요구사항
- **데이터베이스**: 향후 대용량 데이터 처리 가능
- **API**: 버전 관리 및 확장 가능한 구조

## 기술적 구현 세부사항 (Technical Implementation Details)

### 3.1.8 데이터베이스 설정 (Prisma Schema)
```typescript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Inquiry {
  id          String   @id @default(cuid())
  name        String   @db.VarChar(100)
  email       String   @db.VarChar(255)
  phone       String?  @db.VarChar(20)
  company     String?  @db.VarChar(100)
  subject     String   @db.VarChar(200)
  message     String   @db.Text
  category    String?  @default("general") @db.VarChar(50)
  status      String   @default("new") @db.VarChar(20)
  priority    String   @default("normal") @db.VarChar(20)
  ipAddress   String?  @db.VarChar(45)
  userAgent   String?  @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([email])
  @@index([status])
  @@index([createdAt])
}
```

### 3.1.9 API 라우트 구현
```typescript
// pages/api/inquiries/index.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// 문의 데이터 검증 스키마
const inquirySchema = z.object({
  name: z.string().min(1, '이름은 필수입니다').max(100, '이름은 100자 이하여야 합니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, '제목은 필수입니다').max(200, '제목은 200자 이하여야 합니다'),
  message: z.string().min(10, '문의 내용은 최소 10자 이상이어야 합니다'),
  category: z.enum(['general', 'project', 'partnership', 'other']).optional(),
})

// 스팸 방지 함수
const isSpam = async (req: NextApiRequest) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const email = req.body.email

  // IP 기반 요청 제한 확인
  const recentRequests = await prisma.inquiry.count({
    where: {
      ipAddress: ip as string,
      createdAt: {
        gte: new Date(Date.now() - 60 * 1000) // 1분 내
      }
    }
  })

  if (recentRequests >= 3) {
    return true
  }

  // 이메일 기반 요청 제한 확인
  const recentEmailRequests = await prisma.inquiry.count({
    where: {
      email: email,
      createdAt: {
        gte: new Date(Date.now() - 60 * 60 * 1000) // 1시간 내
      }
    }
  })

  if (recentEmailRequests >= 5) {
    return true
  }

  return false
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 스팸 방지 확인
    const spamCheck = await isSpam(req)
    if (spamCheck) {
      return res.status(429).json({ 
        error: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.' 
      })
    }

    // 데이터 검증
    const validatedData = inquirySchema.parse(req.body)

    // 문의 데이터 생성
    const inquiry = await prisma.inquiry.create({
      data: {
        ...validatedData,
        ipAddress: req.headers['x-forwarded-for'] as string || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      }
    })

    // 성공 응답
    res.status(201).json({
      success: true,
      message: '문의가 성공적으로 접수되었습니다.',
      inquiryId: inquiry.id
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: '입력 데이터가 올바르지 않습니다.',
        details: error.errors
      })
    }

    console.error('문의 생성 오류:', error)
    res.status(500).json({
      error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    })
  }
}
```

### 3.1.10 유틸리티 함수
```typescript
// utils/validation.ts
import { z } from 'zod'

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // XSS 방지
    .trim()
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  return phoneRegex.test(phone)
}
```

### 3.1.11 환경 설정
```typescript
// lib/database.ts
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}
```

## 테스트 기준 (Testing Criteria)

### 3.1.12 단위 테스트
- **데이터 검증 테스트**
  - 필수 필드 누락 시 오류 반환
  - 잘못된 이메일 형식 시 오류 반환
  - 너무 짧은 메시지 시 오류 반환
  - 올바른 데이터 시 성공 반환

### 3.1.13 통합 테스트
- **API 엔드포인트 테스트**
  - POST /api/inquiries 정상 동작 확인
  - 데이터베이스 저장 확인
  - 스팸 방지 로직 확인

### 3.1.14 보안 테스트
- **보안 취약점 테스트**
  - SQL 인젝션 공격 방지 확인
  - XSS 공격 방지 확인
  - 요청 제한 기능 확인

## 예상 소요 시간 (Estimated Time)
- **총 예상 시간**: 8-12시간
- **데이터베이스 설계**: 2-3시간
- **API 구현**: 4-6시간
- **보안 및 검증**: 2-3시간

## 의존성 (Dependencies)
- **Epic 1 완료**: 프로젝트 기반 구축 완료
- **Prisma ORM**: 데이터베이스 ORM 설치
- **Zod**: 데이터 검증 라이브러리 설치

## 위험 요소 (Risks)
- **데이터베이스 성능**: 대용량 데이터 처리 시 성능 저하 가능성
- **보안 취약점**: 새로운 보안 위협에 대한 지속적 모니터링 필요
- **스팸 공격**: 정교한 스팸 공격에 대한 추가 방어 로직 필요

## 다음 단계 (Next Steps)
- Story 3.2: [프론트엔드] 문의하기 페이지 UI 및 양식 구현
- 관리자 페이지 인증 시스템 설계
- 이메일 알림 시스템 고려 