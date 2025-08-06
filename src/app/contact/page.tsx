// src/app/contact/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  User,
  Building,
  MessageSquare
} from 'lucide-react'
import type { InquiryData, InquiryCategory } from '@/types/inquiry'

// 문의 카테고리 옵션
const categoryOptions: { value: InquiryCategory; label: string; description: string }[] = [
  {
    value: '웹 개발',
    label: '웹 개발',
    description: '웹사이트 및 웹 애플리케이션 개발'
  },
  {
    value: '모바일 앱 개발',
    label: '모바일 앱 개발',
    description: 'iOS/Android 앱 개발'
  },
  {
    value: '3D 제품 컨피규레이터',
    label: '3D 제품 컨피규레이터',
    description: '3D 제품 커스터마이징 솔루션'
  },
  {
    value: 'UI/UX 디자인',
    label: 'UI/UX 디자인',
    description: '사용자 인터페이스 및 경험 디자인'
  },
  {
    value: '기타',
    label: '기타',
    description: '기타 문의사항'
  }
]

// 연락처 정보
const contactInfo = [
  {
    icon: Mail,
    title: '이메일',
    value: 'admin@uable.co.kr',
    description: '24시간 내 답변'
  },
  {
    icon: Phone,
    title: '전화번호',
    value: '010-8983-6637',
    description: '평일 09:00-18:00'
  },
  {
    icon: MapPin,
    title: '주소',
    value: '서울특별시 강남구 언주로 97길 7',
    description: '5F'
  },
  {
    icon: Clock,
    title: '영업시간',
    value: '평일 09:00-18:00',
    description: '주말 및 공휴일 휴무'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState<InquiryData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    category: '웹 개발'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // 폼 데이터 업데이트
  const handleInputChange = (field: keyof InquiryData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // 에러 메시지 초기화
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // 폼 검증
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.'
    } else if (formData.name.length < 2) {
      newErrors.name = '이름은 2자 이상이어야 합니다.'
    }

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.'
    }

    // 제목 검증
    if (!formData.subject.trim()) {
      newErrors.subject = '제목을 입력해주세요.'
    } else if (formData.subject.length < 5) {
      newErrors.subject = '제목은 5자 이상이어야 합니다.'
    }

    // 메시지 검증
    if (!formData.message.trim()) {
      newErrors.message = '메시지를 입력해주세요.'
    } else if (formData.message.length < 10) {
      newErrors.message = '메시지는 10자 이상이어야 합니다.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 폼 제출 - Formspree 사용
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Formspree 엔드포인트
      const formspreeEndpoint = 'https://formspree.io/f/xqalynyy'
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          category: formData.category,
          _subject: `[문의] ${formData.subject} - ${formData.category}`
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          category: '웹 개발'
        })
      } else {
        setSubmitStatus('error')
        setErrors({ submit: '문의 전송에 실패했습니다.' })
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrors({ submit: '네트워크 오류가 발생했습니다.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Container>
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 text-center"
        >
          <Badge variant="primary" className="mb-4">
            문의하기
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
            프로젝트를 시작할 준비가 되셨나요?
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            최신 기술과 창의적인 솔루션으로 비즈니스의 디지털 혁신을 이끌어보세요.
            <br />
            언제든지 문의해주시면 빠른 시일 내에 답변드리겠습니다.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 pb-16">
          {/* 문의 양식 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 bg-slate-800/80 border-slate-700/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-slate-100" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">문의 양식</h2>
                  <p className="text-slate-400">필수 항목을 모두 입력해주세요</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 카테고리 선택 */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-3">
                    문의 유형 *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categoryOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange('category', option.value)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                          formData.category === option.value
                            ? 'border-slate-500 bg-slate-700/50 text-slate-100'
                            : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-700/30'
                        }`}
                      >
                        <div className="font-medium mb-1">{option.label}</div>
                        <div className="text-xs text-slate-400">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 이름 */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    이름 *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder="홍길동"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 이메일 */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    이메일 *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder="hong@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 전화번호 */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    전화번호
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>

                {/* 회사명 */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    회사명
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      placeholder="회사명 (선택사항)"
                    />
                  </div>
                </div>

                {/* 제목 */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                      errors.subject ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder="문의 제목을 입력해주세요"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* 메시지 */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    메시지 *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none ${
                        errors.message ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder="문의 내용을 자세히 입력해주세요..."
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-slate-100 py-4 text-lg font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
                      전송 중...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      문의 전송하기
                    </div>
                  )}
                </button>

                {/* 상태 메시지 */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>문의가 성공적으로 전송되었습니다!</span>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && errors.submit && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span>{errors.submit}</span>
                    </div>
                  </div>
                )}
              </form>
            </Card>
          </motion.div>

          {/* 연락처 정보 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* 연락처 카드들 */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Card className="p-6 bg-slate-800/80 border-slate-700/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-slate-100" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-100 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-slate-100 font-medium mb-1">
                        {info.value}
                      </p>
                      <p className="text-sm text-slate-400">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* 추가 정보 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Card className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/20">
                <h3 className="text-lg font-semibold text-slate-100 mb-4">
                  빠른 응답을 위한 팁
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                    프로젝트 규모와 예산 범위를 명시해주세요
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                    원하는 완료 시점을 알려주세요
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                    참고할 만한 사례나 예시가 있다면 첨부해주세요
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                    연락 가능한 시간대를 명시해주세요
                  </li>
                </ul>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  )
} 