import type { InquiryData } from '@/types/inquiry'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// 데이터 정리 함수
export function sanitizeInquiryData(data: InquiryData): InquiryData {
  return {
    name: data.name?.trim() || '',
    email: data.email?.trim().toLowerCase() || '',
    phone: data.phone?.trim() || '',
    company: data.company?.trim() || '',
    subject: data.subject?.trim() || '',
    message: data.message?.trim() || '',
    category: data.category || '기타'
  }
}

// 데이터 검증 함수
export function validateInquiryData(data: InquiryData): ValidationResult {
  const errors: string[] = []

  // 이름 검증
  if (!data.name || data.name.length < 2) {
    errors.push('이름은 2자 이상이어야 합니다.')
  }
  if (data.name.length > 50) {
    errors.push('이름은 50자 이하여야 합니다.')
  }

  // 이메일 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('유효한 이메일 주소를 입력해주세요.')
  }
  if (data.email.length > 100) {
    errors.push('이메일은 100자 이하여야 합니다.')
  }

  // 전화번호 검증 (선택사항)
  if (data.phone) {
    const phoneRegex = /^[0-9\-\+\(\)\s]+$/
    if (!phoneRegex.test(data.phone)) {
      errors.push('유효한 전화번호를 입력해주세요.')
    }
    if (data.phone.length > 20) {
      errors.push('전화번호는 20자 이하여야 합니다.')
    }
  }

  // 회사명 검증 (선택사항)
  if (data.company && data.company.length > 100) {
    errors.push('회사명은 100자 이하여야 합니다.')
  }

  // 제목 검증
  if (!data.subject || data.subject.length < 5) {
    errors.push('제목은 5자 이상이어야 합니다.')
  }
  if (data.subject.length > 200) {
    errors.push('제목은 200자 이하여야 합니다.')
  }

  // 메시지 검증
  if (!data.message || data.message.length < 10) {
    errors.push('메시지는 10자 이상이어야 합니다.')
  }
  if (data.message.length > 2000) {
    errors.push('메시지는 2000자 이하여야 합니다.')
  }

  // 카테고리 검증
  const validCategories = [
    '웹 개발',
    '모바일 앱 개발',
    '3D 제품 컨피규레이터',
    'UI/UX 디자인',
    '기타',
    'general' // 기본값도 허용
  ]
  if (!validCategories.includes(data.category)) {
    errors.push('유효한 카테고리를 선택해주세요.')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
} 