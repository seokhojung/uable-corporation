// 문의 카테고리 타입
export type InquiryCategory = 
  | '웹 개발'
  | '모바일 앱 개발'
  | '3D 제품 컨피규레이터'
  | 'UI/UX 디자인'
  | '기타'

// 문의 상태 타입
export type InquiryStatus = 'new' | 'in_progress' | 'completed' | 'spam'

// 우선순위 타입
export type InquiryPriority = 'low' | 'normal' | 'high' | 'urgent'

// 문의 데이터 인터페이스
export interface InquiryData {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  category: InquiryCategory
}

// 문의 응답 인터페이스
export interface InquiryResponse {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  category: InquiryCategory
  status: InquiryStatus
  priority: InquiryPriority
  ipAddress?: string
  userAgent?: string
  createdAt: Date
  updatedAt: Date
}

// API 응답 인터페이스
export interface ApiResponse {
  success: boolean
  data?: any
  error?: string
  details?: string[]
}

// 스팸 방지 설정
export interface SpamProtection {
  maxRequestsPerMinute: number
  maxRequestsPerHour: number
  suspiciousKeywords: string[]
}

// 검증 규칙
export interface ValidationRules {
  name: { min: number; max: number }
  email: { pattern: RegExp }
  phone: { pattern: RegExp }
  subject: { min: number; max: number }
  message: { min: number; max: number }
} 