# Story 3.6: 문의하기 및 관리자 페이지 최종 폴리싱

## 스토리 개요 (Story Overview)
**As a** 개발자  
**I want to** 문의하기 페이지와 관리자 페이지의 모든 기능을 완성하고 최적화하여  
**So that** 사용자와 관리자 모두가 최고의 경험을 할 수 있는 완성도 높은 시스템을 제공할 수 있습니다.

## 기능적 요구사항 (Functional Requirements)

### 3.6.1 문의하기 페이지 최종 완성
- **사용자 경험 최적화**
  - 양식 자동 저장 및 복구 기능
  - 실시간 유효성 검사 개선
  - 성공/실패 피드백 강화
  - 접근성 완전 준수

### 3.6.2 관리자 페이지 최종 완성
- **관리자 경험 최적화**
  - 실시간 알림 시스템
  - 키보드 단축키 지원
  - 일괄 작업 기능
  - 데이터 내보내기 기능

### 3.6.3 성능 최적화
- **전체 시스템 최적화**
  - 로딩 성능 개선
  - 캐싱 전략 구현
  - 이미지 최적화
  - 번들 크기 최적화

### 3.6.4 보안 강화
- **보안 최종 점검**
  - 입력 검증 강화
  - XSS/CSRF 방지 완성
  - 세션 보안 강화
  - 로그 보안 강화

## 비기능적 요구사항 (Non-Functional Requirements)

### 3.6.5 성능 요구사항
- **페이지 로딩**: 모든 페이지 2초 이내 로딩
- **API 응답**: 모든 API 1초 이내 응답
- **사용자 경험**: 60fps 애니메이션 유지

### 3.6.6 접근성 요구사항
- **WCAG AA 완전 준수**: 모든 접근성 가이드라인 준수
- **키보드 네비게이션**: 모든 기능 키보드 접근 가능
- **스크린 리더**: 완전한 스크린 리더 지원

### 3.6.7 브라우저 호환성
- **최신 브라우저**: Chrome, Firefox, Safari, Edge 완전 지원
- **모바일 브라우저**: iOS Safari, Android Chrome 완전 지원
- **구형 브라우저**: IE 11 이상 지원

## 기술적 구현 세부사항 (Technical Implementation Details)

### 3.6.8 성능 최적화 구현
```typescript
// next.config.js - 성능 최적화 설정
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // 이미지 최적화
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 번들 최적화
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // 압축 설정
  compress: true,
  
  // 캐싱 설정
  generateEtags: false,
  
  // 보안 헤더
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
})
```

### 3.6.9 실시간 알림 시스템
```typescript
// hooks/use-realtime-notifications.ts
import { useState, useEffect, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

interface Notification {
  id: string
  type: 'new_inquiry' | 'status_update' | 'system'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export const useRealtimeNotifications = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      auth: {
        token: localStorage.getItem('adminToken'),
      },
    })

    newSocket.on('connect', () => {
      console.log('실시간 알림 연결됨')
    })

    newSocket.on('new_inquiry', (data) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'new_inquiry',
        title: '새로운 문의',
        message: `${data.name}님이 문의를 보냈습니다: ${data.subject}`,
        timestamp: new Date(),
        read: false,
      }
      
      setNotifications(prev => [notification, ...prev])
      setUnreadCount(prev => prev + 1)
      
      // 브라우저 알림
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
        })
      }
    })

    newSocket.on('status_update', (data) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'status_update',
        title: '상태 업데이트',
        message: `문의 #${data.inquiryId}의 상태가 ${data.newStatus}로 변경되었습니다.`,
        timestamp: new Date(),
        read: false,
      }
      
      setNotifications(prev => [notification, ...prev])
      setUnreadCount(prev => prev + 1)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
    setUnreadCount(0)
  }, [])

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}
```

### 3.6.10 키보드 단축키 시스템
```typescript
// hooks/use-keyboard-shortcuts.ts
import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

interface ShortcutConfig {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  action: () => void
  description: string
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
  const router = useRouter()

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key, ctrlKey, shiftKey, altKey } = event

    for (const shortcut of shortcuts) {
      const keyMatch = key.toLowerCase() === shortcut.key.toLowerCase()
      const ctrlMatch = shortcut.ctrl ? ctrlKey : !ctrlKey
      const shiftMatch = shortcut.shift ? shiftKey : !shiftKey
      const altMatch = shortcut.alt ? altKey : !altKey

      if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
        event.preventDefault()
        shortcut.action()
        break
      }
    }
  }, [shortcuts])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  // 기본 단축키 설정
  const defaultShortcuts: ShortcutConfig[] = [
    {
      key: 'n',
      ctrl: true,
      action: () => router.push('/admin/inquiries/new'),
      description: '새 문의 작성',
    },
    {
      key: 's',
      ctrl: true,
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="검색"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      },
      description: '검색창 포커스',
    },
    {
      key: 'f',
      ctrl: true,
      action: () => {
        const filterButton = document.querySelector('[data-testid="filter-button"]') as HTMLButtonElement
        if (filterButton) {
          filterButton.click()
        }
      },
      description: '필터 패널 토글',
    },
    {
      key: 'Escape',
      action: () => {
        // 모달 닫기, 드롭다운 닫기 등
        const modals = document.querySelectorAll('[data-modal]')
        modals.forEach(modal => {
          if (modal.classList.contains('open')) {
            modal.classList.remove('open')
          }
        })
      },
      description: '모달/드롭다운 닫기',
    },
  ]

  return { defaultShortcuts }
}
```

### 3.6.11 데이터 내보내기 기능
```typescript
// utils/export-data.ts
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

interface ExportOptions {
  format: 'csv' | 'xlsx' | 'json'
  dateRange?: {
    start: Date
    end: Date
  }
  filters?: any
}

export const exportInquiries = async (data: any[], options: ExportOptions) => {
  try {
    let processedData = data

    // 날짜 범위 필터링
    if (options.dateRange) {
      processedData = data.filter(item => {
        const itemDate = new Date(item.createdAt)
        return itemDate >= options.dateRange!.start && itemDate <= options.dateRange!.end
      })
    }

    // 필터 적용
    if (options.filters) {
      processedData = processedData.filter(item => {
        return Object.entries(options.filters!).every(([key, value]) => {
          if (!value) return true
          return item[key] === value
        })
      })
    }

    // 데이터 포맷팅
    const formattedData = processedData.map(item => ({
      '문의 ID': item.id,
      '문의자': item.name,
      '이메일': item.email,
      '전화번호': item.phone || '',
      '회사명': item.company || '',
      '제목': item.subject,
      '내용': item.message,
      '카테고리': item.category,
      '상태': item.status,
      '우선순위': item.priority,
      '접수일': new Date(item.createdAt).toLocaleString('ko-KR'),
      '수정일': new Date(item.updatedAt).toLocaleString('ko-KR'),
    }))

    switch (options.format) {
      case 'csv':
        exportAsCSV(formattedData)
        break
      case 'xlsx':
        exportAsXLSX(formattedData)
        break
      case 'json':
        exportAsJSON(formattedData)
        break
    }
  } catch (error) {
    console.error('데이터 내보내기 오류:', error)
    throw new Error('데이터 내보내기에 실패했습니다.')
  }
}

const exportAsCSV = (data: any[]) => {
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
  ].join('\n')

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, `inquiries_${new Date().toISOString().split('T')[0]}.csv`)
}

const exportAsXLSX = (data: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, '문의 내역')
  
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, `inquiries_${new Date().toISOString().split('T')[0]}.xlsx`)
}

const exportAsJSON = (data: any[]) => {
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  saveAs(blob, `inquiries_${new Date().toISOString().split('T')[0]}.json`)
}
```

### 3.6.12 접근성 개선 컴포넌트
```typescript
// components/accessibility/skip-link.tsx
import { motion } from 'framer-motion'

export const SkipLink = () => {
  return (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent-500 text-white px-4 py-2 rounded-lg z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileFocus={{ scale: 1.05 }}
    >
      메인 콘텐츠로 건너뛰기
    </motion.a>
  )
}

// components/accessibility/live-region.tsx
import { useEffect, useState } from 'react'

interface LiveRegionProps {
  message: string
  type?: 'polite' | 'assertive'
  timeout?: number
}

export const LiveRegion = ({ message, type = 'polite', timeout = 5000 }: LiveRegionProps) => {
  const [currentMessage, setCurrentMessage] = useState('')

  useEffect(() => {
    if (message) {
      setCurrentMessage(message)
      
      if (timeout) {
        const timer = setTimeout(() => {
          setCurrentMessage('')
        }, timeout)
        
        return () => clearTimeout(timer)
      }
    }
  }, [message, timeout])

  return (
    <div
      aria-live={type}
      aria-atomic="true"
      className="sr-only"
    >
      {currentMessage}
    </div>
  )
}
```

### 3.6.13 성능 모니터링
```typescript
// utils/performance-monitor.ts
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTimer(name: string): () => void {
    const startTime = performance.now()
    return () => {
      const duration = performance.now() - startTime
      this.recordMetric(name, duration)
    }
  }

  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    this.metrics.get(name)!.push(value)
  }

  getAverageMetric(name: string): number {
    const values = this.metrics.get(name)
    if (!values || values.length === 0) return 0
    
    return values.reduce((sum, value) => sum + value, 0) / values.length
  }

  reportMetrics(): void {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: Object.fromEntries(
        Array.from(this.metrics.entries()).map(([name, values]) => [
          name,
          {
            average: this.getAverageMetric(name),
            count: values.length,
            min: Math.min(...values),
            max: Math.max(...values),
          }
        ])
      )
    }

    // 개발 환경에서만 콘솔에 출력
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Report:', report)
    }

    // 프로덕션에서는 분석 서비스로 전송
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(report)
    }
  }

  private sendToAnalytics(report: any): void {
    // 실제 분석 서비스로 전송하는 로직
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    }).catch(console.error)
  }
}

// 사용 예시
export const usePerformanceMonitor = () => {
  const monitor = PerformanceMonitor.getInstance()

  const measureAsync = async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
    const stopTimer = monitor.startTimer(name)
    try {
      const result = await fn()
      return result
    } finally {
      stopTimer()
    }
  }

  const measureSync = <T>(name: string, fn: () => T): T => {
    const stopTimer = monitor.startTimer(name)
    try {
      return fn()
    } finally {
      stopTimer()
    }
  }

  return { measureAsync, measureSync }
}
```

### 3.6.14 최종 테스트 스위트
```typescript
// tests/integration/inquiry-system.test.ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import ContactPage from '@/pages/contact'
import InquiryListPage from '@/pages/admin/inquiries'

const server = setupServer(
  // 문의 제출 API 모킹
  rest.post('/api/inquiries', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        message: '문의가 성공적으로 접수되었습니다.',
        inquiryId: 'test-id',
      })
    )
  }),

  // 문의 목록 API 모킹
  rest.get('/api/admin/inquiries', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          inquiries: [
            {
              id: '1',
              name: '테스트 사용자',
              email: 'test@example.com',
              subject: '테스트 문의',
              status: 'new',
              createdAt: new Date().toISOString(),
            },
          ],
          pagination: {
            page: 1,
            limit: 20,
            total: 1,
            totalPages: 1,
          },
        },
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('문의 시스템 통합 테스트', () => {
  test('사용자가 문의를 성공적으로 제출할 수 있다', async () => {
    render(<ContactPage />)

    // 양식 작성
    fireEvent.change(screen.getByLabelText(/이름/), {
      target: { value: '테스트 사용자' },
    })
    fireEvent.change(screen.getByLabelText(/이메일/), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/제목/), {
      target: { value: '테스트 문의' },
    })
    fireEvent.change(screen.getByLabelText(/문의 내용/), {
      target: { value: '테스트 문의 내용입니다.' },
    })

    // 제출
    fireEvent.click(screen.getByText(/문의 전송하기/))

    // 성공 메시지 확인
    await waitFor(() => {
      expect(screen.getByText(/문의가 성공적으로 전송되었습니다/)).toBeInTheDocument()
    })
  })

  test('관리자가 문의 목록을 조회할 수 있다', async () => {
    render(<InquiryListPage />)

    // 문의 목록 로딩 확인
    await waitFor(() => {
      expect(screen.getByText('테스트 사용자')).toBeInTheDocument()
      expect(screen.getByText('테스트 문의')).toBeInTheDocument()
    })
  })

  test('접근성 요구사항을 준수한다', () => {
    render(<ContactPage />)

    // 스크린 리더 지원 확인
    expect(screen.getByLabelText(/이름/)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByLabelText(/이메일/)).toHaveAttribute('aria-required', 'true')

    // 키보드 네비게이션 확인
    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()
  })
})
```

## 테스트 기준 (Testing Criteria)

### 3.6.15 성능 테스트
- **로딩 성능 테스트**
  - 페이지 로딩 시간 2초 이내 확인
  - API 응답 시간 1초 이내 확인
  - 번들 크기 최적화 확인

### 3.6.16 접근성 테스트
- **접근성 완전 테스트**
  - WCAG AA 가이드라인 완전 준수 확인
  - 스크린 리더 호환성 확인
  - 키보드 네비게이션 확인

### 3.6.17 보안 테스트
- **보안 최종 테스트**
  - XSS 공격 방지 확인
  - CSRF 공격 방지 확인
  - 입력 검증 완전성 확인

## 예상 소요 시간 (Estimated Time)
- **총 예상 시간**: 8-12시간
- **성능 최적화**: 3-4시간
- **접근성 개선**: 2-3시간
- **보안 강화**: 2-3시간
- **테스트 및 검증**: 1-2시간

## 의존성 (Dependencies)
- **Story 3.1-3.5 완료**: 모든 문의 시스템 기능 완료
- **Epic 1 완료**: 기본 UI 컴포넌트 완료
- **Epic 2 완료**: 포트폴리오 기능 완료

## 위험 요소 (Risks)
- **성능 이슈**: 최적화 과정에서 새로운 성능 문제 발생 가능성
- **호환성 문제**: 다양한 브라우저에서의 일관성 보장 필요
- **보안 취약점**: 새로운 보안 위협에 대한 지속적 모니터링 필요

## 다음 단계 (Next Steps)
- Epic 4: 추가 기능 및 확장 (선택사항)
- 프로덕션 배포 준비
- 사용자 피드백 수집 및 개선 