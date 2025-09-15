# Story 3.2: [프론트엔드] 문의하기 페이지 UI 및 양식 구현

## 스토리 개요 (Story Overview)
**As a** 방문자  
**I want to** 직관적이고 사용하기 쉬운 문의하기 페이지에서 문의를 작성할 수 있고  
**So that** 회사에 쉽게 연락하여 프로젝트나 협업에 대한 문의를 할 수 있습니다.

## 기능적 요구사항 (Functional Requirements)

### 3.2.1 문의하기 페이지 구조
- **페이지 경로**: `/contact` 또는 `/inquiry`
- **페이지 제목**: "문의하기" 또는 "Contact Us"
- **메타 정보**: SEO 최적화된 메타 태그 및 구조화된 데이터

### 3.2.2 문의 양식 필드
- **필수 필드**
  - 이름 (name): 텍스트 입력, 최대 100자
  - 이메일 (email): 이메일 형식 검증
  - 제목 (subject): 텍스트 입력, 최대 200자
  - 문의 내용 (message): 텍스트 영역, 최소 10자, 최대 2000자

- **선택 필드**
  - 전화번호 (phone): 전화번호 형식 검증
  - 회사명 (company): 텍스트 입력, 최대 100자
  - 문의 카테고리 (category): 드롭다운 선택

### 3.2.3 사용자 경험 (UX) 요구사항
- **실시간 검증**: 입력 시 즉시 오류 메시지 표시
- **진행률 표시**: 필수 필드 완성도에 따른 진행률 표시
- **자동 저장**: 임시 저장 기능 (localStorage 활용)
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원

### 3.2.4 반응형 디자인
- **모바일 최적화**: 터치 친화적 인터페이스
- **태블릿 지원**: 중간 화면 크기 최적화
- **데스크톱**: 전체 화면 활용한 레이아웃

## 비기능적 요구사항 (Non-Functional Requirements)

### 3.2.5 성능 요구사항
- **로딩 시간**: 페이지 로딩 2초 이내
- **양식 응답성**: 입력 지연 100ms 이내
- **애니메이션**: 부드러운 전환 효과 (60fps)

### 3.2.6 접근성 요구사항
- **WCAG AA 준수**: 웹 접근성 가이드라인 준수
- **키보드 네비게이션**: 모든 기능 키보드로 접근 가능
- **스크린 리더**: 적절한 ARIA 라벨 및 역할

### 3.2.7 브라우저 호환성
- **최신 브라우저**: Chrome, Firefox, Safari, Edge 지원
- **모바일 브라우저**: iOS Safari, Android Chrome 지원

## 기술적 구현 세부사항 (Technical Implementation Details)

### 3.2.8 페이지 컴포넌트 구조
```typescript
// pages/contact.tsx
import { NextPage } from 'next'
import { motion } from 'framer-motion'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'
import { Container } from '@/components/ui/container'
import { DefaultSEO } from '@/components/seo/default-seo'

const ContactPage: NextPage = () => {
  return (
    <>
      <DefaultSEO
        title="문의하기 - Uable Corporation"
        description="프로젝트 문의, 협업 제안, 기타 문의사항을 편리하게 전달해주세요."
        canonical="/contact"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-12 lg:py-20"
          >
            {/* 페이지 헤더 */}
            <div className="text-center mb-12 lg:mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl lg:text-5xl font-bold text-primary-900 mb-6"
              >
                문의하기
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-primary-600 max-w-2xl mx-auto"
              >
                프로젝트 문의, 협업 제안, 기타 문의사항을 편리하게 전달해주세요.
                빠른 시일 내에 답변드리겠습니다.
              </motion.p>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* 문의 양식 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="order-2 lg:order-1"
              >
                <ContactForm />
              </motion.div>

              {/* 연락처 정보 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="order-1 lg:order-2"
              >
                <ContactInfo />
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  )
}

export default ContactPage
```

### 3.2.9 문의 양식 컴포넌트
```typescript
// components/contact/contact-form.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

// 문의 양식 검증 스키마
const contactSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요').max(100, '이름은 100자 이하여야 합니다'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, '제목을 입력해주세요').max(200, '제목은 200자 이하여야 합니다'),
  message: z.string().min(10, '문의 내용은 최소 10자 이상 입력해주세요').max(2000, '문의 내용은 2000자 이하여야 합니다'),
  category: z.enum(['general', 'project', 'partnership', 'other']).optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

const categoryOptions = [
  { value: 'general', label: '일반 문의' },
  { value: 'project', label: '프로젝트 문의' },
  { value: 'partnership', label: '협업 제안' },
  { value: 'other', label: '기타' },
]

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [progress, setProgress] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  const watchedFields = watch()

  // 진행률 계산
  useEffect(() => {
    const requiredFields = ['name', 'email', 'subject', 'message']
    const completedFields = requiredFields.filter(field => 
      watchedFields[field as keyof ContactFormData] && 
      watchedFields[field as keyof ContactFormData]!.length > 0
    )
    setProgress((completedFields.length / requiredFields.length) * 100)
  }, [watchedFields])

  // 자동 저장
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        Object.keys(parsedData).forEach(key => {
          if (parsedData[key]) {
            // register로 등록된 필드에 값 설정
          }
        })
      } catch (error) {
        console.error('저장된 양식 데이터 로드 실패:', error)
      }
    }
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        localStorage.removeItem('contactFormData')
        
        // 성공 후 3초 후 상태 초기화
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 3000)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || '문의 전송에 실패했습니다.')
      }
    } catch (error) {
      console.error('문의 전송 오류:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-error-500 mt-1"
            >
              {errors.name.message}
            </motion.p>
          )}
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
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-error-500 mt-1"
            >
              {errors.email.message}
            </motion.p>
          )}
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
          />
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
          />
        </div>

        {/* 문의 카테고리 */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-primary-900 mb-2">
            문의 카테고리
          </label>
          <Select
            id="category"
            {...register('category')}
            defaultValue="general"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
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
          />
          {errors.subject && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-error-500 mt-1"
            >
              {errors.subject.message}
            </motion.p>
          )}
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
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-error-500 mt-1"
            >
              {errors.message.message}
            </motion.p>
          )}
        </div>

        {/* 제출 버튼 */}
        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !isValid}
            className="w-full"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                문의 전송하기
              </>
            )}
          </Button>
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
            className="mt-6 p-4 bg-error-50 border border-error-200 rounded-lg flex items-center"
          >
            <AlertCircle className="w-5 h-5 text-error-500 mr-3" />
            <span className="text-error-700 font-medium">
              문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

### 3.2.10 연락처 정보 컴포넌트
```typescript
// components/contact/contact-info.tsx
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: '이메일',
      value: 'contact@uable.com',
      description: '가장 빠른 응답을 받을 수 있습니다',
      badge: '추천',
    },
    {
      icon: Phone,
      title: '전화',
      value: '02-1234-5678',
      description: '업무시간 내 즉시 응답 가능',
      badge: '빠른 응답',
    },
    {
      icon: MessageSquare,
      title: '카카오톡',
      value: '@uable',
      description: '실시간 채팅으로 문의하세요',
      badge: '실시간',
    },
  ]

  const officeInfo = [
    {
      icon: MapPin,
      title: '주소',
      value: '서울특별시 강남구 테헤란로 123',
      description: 'Uable Tower 15층',
    },
    {
      icon: Clock,
      title: '업무시간',
      value: '월-금 09:00 - 18:00',
      description: '주말 및 공휴일 휴무',
    },
  ]

  return (
    <div className="space-y-8">
      {/* 연락처 방법 */}
      <div>
        <h3 className="text-2xl font-bold text-primary-900 mb-6">
          연락처 방법
        </h3>
        <div className="space-y-4">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-primary-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-accent-100 rounded-lg">
                    <method.icon className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-primary-900">
                        {method.title}
                      </h4>
                      {method.badge && (
                        <Badge variant="accent" size="sm">
                          {method.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg font-medium text-primary-700 mb-1">
                      {method.value}
                    </p>
                    <p className="text-sm text-primary-600">
                      {method.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 사무실 정보 */}
      <div>
        <h3 className="text-2xl font-bold text-primary-900 mb-6">
          사무실 정보
        </h3>
        <div className="space-y-4">
          {officeInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-primary-100"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <info.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">
                    {info.title}
                  </h4>
                  <p className="text-lg font-medium text-primary-700 mb-1">
                    {info.value}
                  </p>
                  <p className="text-sm text-primary-600">
                    {info.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ 링크 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl p-6 text-white"
      >
        <h4 className="text-xl font-bold mb-2">
          자주 묻는 질문
        </h4>
        <p className="text-accent-100 mb-4">
          일반적인 문의사항은 FAQ에서 빠르게 확인하세요.
        </p>
        <button className="bg-white text-accent-600 px-4 py-2 rounded-lg font-medium hover:bg-accent-50 transition-colors">
          FAQ 보기
        </button>
      </motion.div>
    </div>
  )
}
```

### 3.2.11 커스텀 UI 컴포넌트
```typescript
// components/ui/textarea.tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-primary-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
```

```typescript
// components/ui/select.tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-10 w-full rounded-md border border-primary-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

export { Select }
```

## 테스트 기준 (Testing Criteria)

### 3.2.12 기능 테스트
- **양식 검증 테스트**
  - 필수 필드 누락 시 오류 메시지 표시
  - 이메일 형식 검증 확인
  - 문의 내용 최소 길이 검증 확인
  - 양식 제출 성공/실패 처리 확인

### 3.2.13 사용성 테스트
- **사용자 경험 테스트**
  - 진행률 표시 정확성 확인
  - 자동 저장 기능 확인
  - 반응형 디자인 확인
  - 접근성 준수 확인

### 3.2.14 성능 테스트
- **성능 테스트**
  - 페이지 로딩 시간 확인
  - 양식 응답성 확인
  - 애니메이션 성능 확인

## 예상 소요 시간 (Estimated Time)
- **총 예상 시간**: 6-10시간
- **페이지 구조 설계**: 1-2시간
- **양식 컴포넌트 구현**: 3-4시간
- **UI/UX 최적화**: 2-4시간

## 의존성 (Dependencies)
- **Story 3.1 완료**: 백엔드 API 구현 완료
- **Epic 1 완료**: 디자인 시스템 및 기본 컴포넌트 완료
- **React Hook Form**: 양식 관리 라이브러리
- **Zod**: 데이터 검증 라이브러리

## 위험 요소 (Risks)
- **사용자 경험**: 복잡한 양식으로 인한 이탈률 증가 가능성
- **접근성**: 다양한 장애를 가진 사용자의 접근성 보장 필요
- **브라우저 호환성**: 다양한 브라우저에서의 일관된 동작 보장 필요

## 다음 단계 (Next Steps)
- Story 3.3: [통합] 문의 양식 제출 기능 연동
- SEO 최적화 및 메타데이터 설정
- 접근성 테스트 및 개선 