// src/app/contact/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Badge } from '@/components/primitives/Badge'
import { Card } from '@/components/primitives/Card'
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

// 문의 카테고리 옵션 - 영문 value로 변경하여 Formspree 호환성 개선
const categoryOptions: { value: string; label: string; description: string; displayName: string }[] = [
  {
    value: 'web-development',
    label: '웹 개발',
    description: '웹사이트 및 웹 애플리케이션 개발',
    displayName: '웹 개발'
  },
  {
    value: 'mobile-app-development',
    label: '모바일 앱 개발',
    description: 'iOS/Android 앱 개발',
    displayName: '모바일 앱 개발'
  },
  {
    value: '3d-product-configurator',
    label: '3D 제품 컨피규레이터',
    description: '3D 제품 커스터마이징 솔루션',
    displayName: '3D 제품 컨피규레이터'
  },
  {
    value: 'ui-ux-design',
    label: 'UI/UX 디자인',
    description: '사용자 인터페이스 및 경험 디자인',
    displayName: 'UI/UX 디자인'
  },
  {
    value: 'other',
    label: '기타',
    description: '기타 문의사항',
    displayName: '기타'
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
    value: '02-557-6637',
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    category: 'web-development'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [hasConsented, setHasConsented] = useState(false)

  // 폼 데이터 업데이트
  const handleInputChange = (field: string, value: string) => {
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

    // 개인정보 수집 및 이용 동의 확인
    if (!hasConsented) {
      newErrors.consent = '개인정보 수집 및 이용에 동의해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 폼 제출 - Formspree HTML 폼 방식 사용
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // HTML FormData를 사용하여 표준 폼 제출 방식으로 변경
      const form = e.target as HTMLFormElement
      const formDataToSend = new FormData(form)

      const response = await fetch('https://formspree.io/f/xqalynyy', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      })

      await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          category: 'web-development'
        })
      } else {
        setSubmitStatus('error')
        setErrors({ submit: '문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.' })
      }
    } catch {
      setSubmitStatus('error')
      setErrors({ submit: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Container>
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 text-center"
        >
          <Badge variant="primary" className="mb-4 bg-gradient-to-r from-green-600 to-teal-600 text-white border-green-500">
            문의하기
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-6">
            프로젝트를 시작할 준비가 되셨나요?
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
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
            <Card className="p-8 bg-white dark:bg-slate-800/80 border-gray-200 dark:border-slate-700/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 dark:from-slate-600 dark:to-slate-700 rounded-xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">문의 양식</h2>
                  <p className="text-gray-600 dark:text-slate-400">필수 항목을 모두 입력해주세요</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden input for category - Formspree에서 인식할 수 있도록 */}
                <input type="hidden" name="category" value={formData.category} />
                <input type="hidden" name="_subject" value={`[문의] ${formData.subject} - ${categoryOptions.find(opt => opt.value === formData.category)?.displayName || formData.category}`} />
                
                {/* 카테고리 선택 */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-slate-200 mb-3">
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
                            ? 'border-green-500 dark:border-slate-500 bg-green-50 dark:bg-slate-700/50 text-green-900 dark:text-slate-100'
                            : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-gray-700 dark:text-slate-300 hover:border-gray-400 dark:hover:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-700/30'
                        }`}
                      >
                        <div className="font-medium mb-1">{option.label}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 이름 */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-slate-200 mb-2">
                    이름 *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700/50 border rounded-lg text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-slate-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                      placeholder="홍길동"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 이메일 */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-slate-200 mb-2">
                    이메일 *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700/50 border rounded-lg text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-slate-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'}`}
                      placeholder="hong@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 전화번호 */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-slate-200 mb-2">
                    전화번호
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-slate-500 focus:border-transparent"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>

                {/* 회사명 */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-slate-200 mb-2">
                    회사명
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-slate-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-slate-500 focus:border-transparent"
                      placeholder="회사명 (선택사항)"
                    />
                  </div>
                </div>

                {/* 제목 */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-slate-200 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={`w-full px-4 py-3 bg-white dark:bg-slate-700/50 border rounded-lg text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-slate-500 focus:border-transparent ${
                      errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                    }`}
                    placeholder="문의 제목을 입력해주세요"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* 메시지 */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-slate-200 mb-2">
                    메시지 *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-500 dark:text-slate-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700/50 border rounded-lg text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-slate-500 focus:border-transparent resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'
                      }`}
                      placeholder="문의 내용을 자세히 입력해주세요..."
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* 개인정보 수집 및 이용 동의 */}
                <div className="rounded-lg border border-gray-200 dark:border-slate-700/40 bg-gray-50 dark:bg-slate-800/40 p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasConsented}
                      onChange={(e) => {
                        setHasConsented(e.target.checked)
                        if (errors.consent) {
                          setErrors(prev => ({ ...prev, consent: '' }))
                        }
                      }}
                      className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-green-600 dark:text-slate-100 focus:ring-2 focus:ring-green-500 dark:focus:ring-slate-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-slate-300">
                      개인정보 수집 및 이용에 동의합니다. 수집항목: 이름, 이메일, 문의내용(선택: 전화번호, 회사명) / 이용목적: 문의 응답 및 상담 / 보유기간: 목적 달성 시까지. 자세한 내용은 <a href="/privacy" target="_blank" className="underline text-slate-200">개인정보처리방침</a>을 확인해주세요.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.consent}
                    </p>
                  )}
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-slate-600 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-800 text-white py-4 text-lg font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                <Card className="p-6 bg-white dark:bg-slate-800/80 border-gray-200 dark:border-slate-700/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 dark:from-slate-600 dark:to-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white dark:text-slate-100" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-900 dark:text-slate-100 font-medium mb-1">
                        {info.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-slate-400">
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
              <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 border-gray-200 dark:border-slate-700/20">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">
                  빠른 응답을 위한 팁
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 dark:bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                    프로젝트 규모와 예산 범위를 명시해주세요
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 dark:bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                    원하는 완료 시점을 알려주세요
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 dark:bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                    참고할 만한 사례나 예시가 있다면 첨부해주세요
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 dark:bg-slate-400 rounded-full mt-2 flex-shrink-0" />
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
