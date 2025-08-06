// src/components/ui/newsletter.tsx
'use client'

import { useState } from 'react'

export const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // 여기에 실제 구독 로직을 구현
    setTimeout(() => {
      setIsLoading(false)
      setEmail('')
      alert('구독해주셔서 감사합니다!')
    }, 1000)
  }

  return (
    <div className="w-full max-w-md transition-all duration-300 hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        뉴스레터 구독
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        최신 기술 트렌드와 프로젝트 소식을 받아보세요
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md disabled:opacity-50 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? '구독 중...' : '구독하기'}
        </button>
      </form>
    </div>
  )
}