'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lock, User, Eye, EyeOff, Trash2 } from 'lucide-react'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    console.log('로그인 시도:', { username, password })

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      console.log('응답 상태:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('로그인 성공:', data)
        localStorage.setItem('adminToken', data.token)
        setIsLoggedIn(true)
      } else {
        const errorData = await response.json()
        console.log('로그인 실패:', errorData)
        setError(errorData.message || '로그인에 실패했습니다.')
      }
    } catch (error) {
      console.error('로그인 오류:', error)
      setError('서버 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoggedIn) {
    return <AdminDashboard />
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <Card className="p-8 bg-slate-800/80 border-slate-700/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-slate-100" />
              </div>
              <Badge variant="primary" className="mb-4">
                관리자 로그인
              </Badge>
              <h1 className="text-2xl font-bold text-slate-100 mb-2">
                Uable 관리자
              </h1>
              <p className="text-slate-400">
                문의 내역을 확인하고 관리하세요
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                  사용자명
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/30 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="관리자 사용자명"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600/30 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    placeholder="비밀번호"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

                             <button
                 type="submit"
                 disabled={isLoading}
                 className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-slate-100 py-3 text-lg font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
                    로그인 중...
                  </div>
                                 ) : (
                   '로그인'
                 )}
               </button>
            </form>
          </Card>
        </motion.div>
      </Container>
    </div>
  )
}

function AdminDashboard() {
  const [inquiries, setInquiries] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      console.log('🔍 fetchInquiries 함수 시작')
      const token = localStorage.getItem('adminToken')
      console.log('🔑 토큰 확인:', token ? '토큰 있음' : '토큰 없음')
      
      const response = await fetch('/api/admin/inquiries', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      console.log('📡 API 응답 상태:', response.status)
      console.log('📡 API 응답 헤더:', response.headers)

      if (response.ok) {
        const data = await response.json()
        console.log('✅ API 응답 데이터:', data)
        setInquiries(data.inquiries)
        console.log('📊 설정된 문의 수:', data.inquiries?.length || 0)
      } else {
        console.error('❌ API 응답 실패:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('❌ 에러 내용:', errorText)
      }
    } catch (error) {
      console.error('💥 문의 내역을 불러오는데 실패했습니다:', error)
    } finally {
      setIsLoading(false)
      console.log('🏁 fetchInquiries 함수 종료')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    window.location.reload()
  }

  const handleDeleteInquiry = async (inquiryId: string) => {
    if (!confirm('정말로 이 문의를 삭제하시겠습니까?')) {
      return
    }

    try {
      console.log('🗑️ 문의 삭제 시도:', inquiryId)
      const token = localStorage.getItem('adminToken')
      
      const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        console.log('✅ 문의 삭제 성공')
        // 문의 목록 새로고침
        fetchInquiries()
      } else {
        const errorData = await response.json()
        console.error('❌ 문의 삭제 실패:', errorData)
        alert('문의 삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('💥 문의 삭제 오류:', error)
      alert('문의 삭제 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Container>
        <div className="py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                관리자 대시보드
              </h1>
              <p className="text-slate-400">
                문의 내역을 확인하고 관리하세요
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-slate-800/50 border-slate-600/30 text-slate-300 hover:bg-slate-700/50"
            >
              로그아웃
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid gap-6">
              <Card className="p-6 bg-slate-800/80 border-slate-700/20">
                <h2 className="text-xl font-bold text-slate-100 mb-4">
                  문의 내역 ({inquiries.length})
                </h2>
                {inquiries.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">
                    아직 문의 내역이 없습니다.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inquiry: any) => (
                      <div
                        key={inquiry.id}
                        className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-slate-100">
                            {inquiry.subject}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {inquiry.category}
                            </Badge>
                            <button
                              onClick={() => handleDeleteInquiry(inquiry.id)}
                              className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                              title="문의 삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">
                          {inquiry.message}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <div className="flex flex-col gap-1">
                            <span>{inquiry.name} ({inquiry.email})</span>
                            {inquiry.phone && (
                              <span className="text-slate-500">📞 {inquiry.phone}</span>
                            )}
                            {inquiry.company && (
                              <span className="text-slate-500">🏢 {inquiry.company}</span>
                            )}
                          </div>
                          <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
} 