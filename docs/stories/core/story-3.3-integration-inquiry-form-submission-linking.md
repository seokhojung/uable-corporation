# Story 3.3: [통합] 문의 양식 제출 기능 연동

## 스토리 개요 (Story Overview)
**As a** 개발자  
**I want to** 프론트엔드 문의 양식과 백엔드 API를 완전히 연동하여  
**So that** 사용자가 문의를 작성하고 제출할 때 안전하고 신뢰할 수 있는 데이터 전송이 이루어집니다.

## 기능적 요구사항 (Functional Requirements)

### 3.3.1 API 연동 구현
- **양식 제출 처리**
  - 프론트엔드 양식 데이터를 백엔드 API로 전송
  - 실시간 검증 및 오류 처리
  - 성공/실패 상태 관리
  - 로딩 상태 표시

### 3.3.2 데이터 검증 및 보안
- **클라이언트 사이드 검증**
  - 실시간 입력 검증
  - 필수 필드 검증
  - 데이터 형식 검증
  - XSS 방지

### 3.3.3 사용자 피드백 시스템
- **상태 표시**
  - 제출 중 로딩 표시
  - 성공 메시지 표시
  - 오류 메시지 표시
  - 진행률 표시

### 3.3.4 오류 처리 및 복구
- **오류 상황 처리**
  - 네트워크 오류 처리
  - 서버 오류 처리
  - 검증 오류 처리
  - 재시도 기능

## 비기능적 요구사항 (Non-Functional Requirements)

### 3.3.5 성능 요구사항
- **응답 시간**: API 호출 응답 시간 2초 이내
- **사용자 경험**: 부드러운 애니메이션과 전환
- **오프라인 지원**: 네트워크 오류 시 데이터 보존

### 3.3.6 보안 요구사항
- **데이터 보호**: 민감한 정보 암호화 전송
- **CSRF 방지**: 토큰 기반 CSRF 방지
- **입력 검증**: 클라이언트/서버 양쪽 검증

### 3.3.7 접근성 요구사항
- **키보드 네비게이션**: 모든 기능 키보드 접근 가능
- **스크린 리더**: 적절한 ARIA 라벨 및 상태
- **오류 알림**: 스크린 리더가 읽을 수 있는 오류 메시지

## 기술적 구현 세부사항 (Technical Implementation Details)

### 3.3.8 API 클라이언트 구현
```typescript
// lib/api/inquiry.ts
export interface InquiryData {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  category?: 'general' | 'project' | 'partnership' | 'other'
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface InquiryResponse {
  inquiryId: string
  message: string
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const submitInquiry = async (data: InquiryData): Promise<InquiryResponse> => {
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new ApiError(
        result.error || '문의 전송에 실패했습니다.',
        response.status,
        result
      )
    }

    return result
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError('네트워크 연결을 확인해주세요.', 0)
    }
    
    throw new ApiError('알 수 없는 오류가 발생했습니다.', 500)
  }
}
```

### 3.3.9 양식 훅 구현
```typescript
// hooks/use-inquiry-form.ts
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitInquiry, type InquiryData } from '@/lib/api/inquiry'

// 문의 양식 검증 스키마
const inquirySchema = z.object({
  name: z.string()
    .min(1, '이름을 입력해주세요')
    .max(100, '이름은 100자 이하여야 합니다')
    .regex(/^[가-힣a-zA-Z\s]+$/, '올바른 이름 형식을 입력해주세요'),
  
  email: z.string()
    .email('올바른 이메일 형식을 입력해주세요')
    .max(255, '이메일은 255자 이하여야 합니다'),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\d\s\-\+\(\)]+$/.test(val), {
      message: '올바른 전화번호 형식을 입력해주세요'
    }),
  
  company: z.string()
    .optional()
    .max(100, '회사명은 100자 이하여야 합니다'),
  
  subject: z.string()
    .min(1, '제목을 입력해주세요')
    .max(200, '제목은 200자 이하여야 합니다'),
  
  message: z.string()
    .min(10, '문의 내용은 최소 10자 이상 입력해주세요')
    .max(2000, '문의 내용은 2000자 이하여야 합니다'),
  
  category: z.enum(['general', 'project', 'partnership', 'other'])
    .optional()
    .default('general'),
})

type InquiryFormData = z.infer<typeof inquirySchema>

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export const useInquiryForm = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
    getValues,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    mode: 'onChange',
    defaultValues: {
      category: 'general',
    },
  })

  const watchedFields = watch()

  // 진행률 계산
  const calculateProgress = useCallback(() => {
    const requiredFields = ['name', 'email', 'subject', 'message']
    const completedFields = requiredFields.filter(field => {
      const value = watchedFields[field as keyof InquiryFormData]
      return value && value.trim().length > 0
    })
    return (completedFields.length / requiredFields.length) * 100
  }, [watchedFields])

  // 진행률 업데이트
  useState(() => {
    const newProgress = calculateProgress()
    setProgress(newProgress)
  }, [calculateProgress])

  // 자동 저장
  const saveToLocalStorage = useCallback((data: Partial<InquiryFormData>) => {
    try {
      localStorage.setItem('inquiryFormData', JSON.stringify(data))
    } catch (error) {
      console.error('양식 데이터 저장 실패:', error)
    }
  }, [])

  // 저장된 데이터 로드
  const loadFromLocalStorage = useCallback(() => {
    try {
      const savedData = localStorage.getItem('inquiryFormData')
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        Object.keys(parsedData).forEach(key => {
          if (parsedData[key]) {
            setValue(key as keyof InquiryFormData, parsedData[key])
          }
        })
        return true
      }
    } catch (error) {
      console.error('저장된 양식 데이터 로드 실패:', error)
    }
    return false
  }, [setValue])

  // 양식 제출 처리
  const onSubmit = useCallback(async (data: InquiryFormData) => {
    setSubmitStatus('submitting')
    setError(null)

    try {
      // 데이터 정제
      const cleanedData: InquiryData = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        subject: data.subject.trim(),
        message: data.message.trim(),
        category: data.category,
        ...(data.phone && { phone: data.phone.trim() }),
        ...(data.company && { company: data.company.trim() }),
      }

      const response = await submitInquiry(cleanedData)

      setSubmitStatus('success')
      reset()
      localStorage.removeItem('inquiryFormData')

      // 성공 후 3초 후 상태 초기화
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)

      return response
    } catch (error) {
      console.error('문의 제출 오류:', error)
      
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('알 수 없는 오류가 발생했습니다.')
      }
      
      setSubmitStatus('error')
    }
  }, [reset])

  // 재시도 기능
  const retry = useCallback(() => {
    setSubmitStatus('idle')
    setError(null)
  }, [])

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isDirty,
    submitStatus,
    error,
    progress,
    reset,
    retry,
    loadFromLocalStorage,
    saveToLocalStorage,
    watchedFields,
  }
}
```

### 3.3.10 개선된 문의 양식 컴포넌트
```typescript
// components/contact/contact-form-enhanced.tsx
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useInquiryForm } from '@/hooks/use-inquiry-form'

const categoryOptions = [
  { value: 'general', label: '일반 문의' },
  { value: 'project', label: '프로젝트 문의' },
  { value: 'partnership', label: '협업 제안' },
  { value: 'other', label: '기타' },
]

export const ContactFormEnhanced = () => {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    submitStatus,
    error,
    progress,
    retry,
    loadFromLocalStorage,
    saveToLocalStorage,
    watchedFields,
  } = useInquiryForm()

  // 컴포넌트 마운트 시 저장된 데이터 로드
  useEffect(() => {
    loadFromLocalStorage()
  }, [loadFromLocalStorage])

  // 양식 데이터 변경 시 자동 저장
  useEffect(() => {
    const subscription = watchedFields((value) => {
      saveToLocalStorage(value)
    })
    return () => subscription.unsubscribe()
  }, [watchedFields, saveToLocalStorage])

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
      {/* 진행률 표시 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary-700">양식 완성도</span>
          <span className="text-sm text-primary-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-primary-100 rounded-full h-2">
          <motion.div
            className="bg-accent-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* 양식 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이름 필드 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary-900 mb-2">
            이름 <span className="text-error-500">*</span>
          </label>
          <Input
            id="name"
            type="text"
            placeholder="이름을 입력해주세요"
            {...register('name')}
            className={errors.name ? 'border-error-500' : ''}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                id="name-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-error-500 mt-1"
                role="alert"
              >
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 이메일 필드 */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary-900 mb-2">
            이메일 <span className="text-error-500">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register('email')}
            className={errors.email ? 'border-error-500' : ''}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                id="email-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-error-500 mt-1"
                role="alert"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 전화번호 필드 */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary-900 mb-2">
            전화번호
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="010-1234-5678"
            {...register('phone')}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                id="phone-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-error-500 mt-1"
                role="alert"
              >
                {errors.phone.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 회사명 필드 */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-primary-900 mb-2">
            회사명
          </label>
          <Input
            id="company"
            type="text"
            placeholder="회사명을 입력해주세요"
            {...register('company')}
            aria-describedby={errors.company ? 'company-error' : undefined}
          />
          <AnimatePresence>
            {errors.company && (
              <motion.p
                id="company-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-error-500 mt-1"
                role="alert"
              >
                {errors.company.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 문의 카테고리 */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-primary-900 mb-2">
            문의 카테고리
          </label>
          <Select
            id="category"
            {...register('category')}
            aria-describedby={errors.category ? 'category-error' : undefined}
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <AnimatePresence>
            {errors.category && (
              <motion.p
                id="category-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-error-500 mt-1"
                role="alert"
              >
                {errors.category.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 제목 필드 */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-primary-900 mb-2">
            제목 <span className="text-error-500">*</span>
          </label>
          <Input
            id="subject"
            type="text"
            placeholder="문의 제목을 입력해주세요"
            {...register('subject')}
            className={errors.subject ? 'border-error-500' : ''}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          <AnimatePresence>
            {errors.subject && (
              <motion.p
                id="subject-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-error-500 mt-1"
                role="alert"
              >
                {errors.subject.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 문의 내용 필드 */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary-900 mb-2">
            문의 내용 <span className="text-error-500">*</span>
          </label>
          <Textarea
            id="message"
            placeholder="문의 내용을 자세히 입력해주세요 (최소 10자)"
            rows={6}
            {...register('message')}
            className={errors.message ? 'border-error-500' : ''}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p
                id="message-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-error-500 mt-1"
                role="alert"
              >
                {errors.message.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 제출 버튼 */}
        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={submitStatus === 'submitting' || !isValid}
            className="w-full"
            aria-describedby={submitStatus === 'submitting' ? 'submitting-status' : undefined}
          >
            {submitStatus === 'submitting' ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                전송 중...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                문의 전송하기
              </>
            )}
          </Button>
          {submitStatus === 'submitting' && (
            <p id="submitting-status" className="sr-only">
              문의를 전송하고 있습니다. 잠시만 기다려주세요.
            </p>
          )}
        </div>
      </form>

      {/* 제출 상태 표시 */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 bg-success-50 border border-success-200 rounded-lg flex items-center"
            role="alert"
            aria-live="polite"
          >
            <CheckCircle className="w-5 h-5 text-success-500 mr-3" />
            <span className="text-success-700 font-medium">
              문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.
            </span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 bg-error-50 border border-error-200 rounded-lg"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-error-500 mr-3 mt-0.5" />
              <div className="flex-1">
                <p className="text-error-700 font-medium mb-2">
                  문의 전송에 실패했습니다.
                </p>
                <p className="text-error-600 text-sm mb-3">
                  {error}
                </p>
                <Button
                  onClick={retry}
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  다시 시도
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

### 3.3.11 오류 처리 유틸리티
```typescript
// utils/error-handling.ts
export class NetworkError extends Error {
  constructor(message: string = '네트워크 연결을 확인해주세요.') {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class ServerError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ServerError'
  }
}

export const handleApiError = (error: any): Error => {
  if (error instanceof NetworkError || 
      error instanceof ValidationError || 
      error instanceof ServerError) {
    return error
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    return new NetworkError()
  }

  if (error.status === 429) {
    return new ServerError('너무 많은 요청입니다. 잠시 후 다시 시도해주세요.', 429)
  }

  if (error.status >= 500) {
    return new ServerError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', error.status)
  }

  if (error.status >= 400) {
    return new ValidationError(error.message || '입력 데이터가 올바르지 않습니다.')
  }

  return new Error('알 수 없는 오류가 발생했습니다.')
}
```

### 3.3.12 데이터 정제 유틸리티
```typescript
// utils/data-sanitization.ts
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // XSS 방지
    .replace(/\s+/g, ' ') // 연속 공백 제거
}

export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase()
}

export const sanitizePhone = (phone: string): string => {
  return phone.trim().replace(/[^\d\s\-\+\(\)]/g, '')
}

export const validateAndSanitizeInquiryData = (data: any) => {
  return {
    name: sanitizeString(data.name || ''),
    email: sanitizeEmail(data.email || ''),
    phone: data.phone ? sanitizePhone(data.phone) : undefined,
    company: data.company ? sanitizeString(data.company) : undefined,
    subject: sanitizeString(data.subject || ''),
    message: sanitizeString(data.message || ''),
    category: data.category || 'general',
  }
}
```

## 테스트 기준 (Testing Criteria)

### 3.3.13 통합 테스트
- **API 연동 테스트**
  - 정상적인 데이터 제출 시 성공 확인
  - 잘못된 데이터 제출 시 오류 처리 확인
  - 네트워크 오류 시 처리 확인
  - 서버 오류 시 처리 확인

### 3.3.14 사용성 테스트
- **사용자 경험 테스트**
  - 양식 제출 과정의 부드러운 진행 확인
  - 오류 메시지의 명확성 확인
  - 재시도 기능의 동작 확인
  - 자동 저장 기능 확인

### 3.3.15 보안 테스트
- **보안 테스트**
  - XSS 공격 방지 확인
  - CSRF 공격 방지 확인
  - 데이터 검증 정확성 확인

## 예상 소요 시간 (Estimated Time)
- **총 예상 시간**: 4-6시간
- **API 클라이언트 구현**: 1-2시간
- **양식 훅 구현**: 2-3시간
- **오류 처리 및 보안**: 1-2시간

## 의존성 (Dependencies)
- **Story 3.1 완료**: 백엔드 API 구현 완료
- **Story 3.2 완료**: 프론트엔드 UI 구현 완료
- **React Hook Form**: 양식 관리 라이브러리
- **Zod**: 데이터 검증 라이브러리

## 위험 요소 (Risks)
- **네트워크 불안정성**: 네트워크 오류로 인한 사용자 경험 저하
- **보안 취약점**: 클라이언트 사이드 검증 우회 가능성
- **성능 이슈**: 대용량 데이터 전송 시 성능 저하

## 다음 단계 (Next Steps)
- Story 3.4: [백엔드] 관리자 페이지 기본 인증 및 레이아웃 구현
- 이메일 알림 시스템 구현 고려
- 문의 통계 및 분석 기능 추가 