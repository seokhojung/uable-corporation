# Story 3.5: [관리자] 문의 내역 조회 기능 구현

## 스토리 개요 (Story Overview)
**As a** 관리자  
**I want to** 접수된 모든 문의 내역을 조회하고 관리할 수 있는 기능을 사용할 수 있고  
**So that** 문의 처리 상태를 파악하고 적절한 조치를 취할 수 있습니다.

## 기능적 요구사항 (Functional Requirements)

### 3.5.1 문의 목록 조회
- **문의 목록 페이지**
  - 모든 문의 내역 표시
  - 페이지네이션 지원
  - 정렬 기능 (최신순, 오래된순, 상태별)
  - 검색 기능 (이름, 이메일, 제목, 내용)

### 3.5.2 필터링 및 검색
- **고급 필터링**
  - 상태별 필터 (신규, 처리중, 완료, 스팸)
  - 카테고리별 필터
  - 날짜 범위 필터
  - 우선순위별 필터

### 3.5.3 문의 상세 조회
- **문의 상세 페이지**
  - 문의 내용 전체 표시
  - 문의자 정보 표시
  - 처리 상태 변경 기능
  - 처리 메모 작성 기능

### 3.5.4 상태 관리
- **문의 상태 관리**
  - 상태 변경 (신규 → 처리중 → 완료)
  - 우선순위 설정
  - 스팸 표시 기능
  - 처리 완료 표시

## 비기능적 요구사항 (Non-Functional Requirements)

### 3.5.5 성능 요구사항
- **목록 로딩**: 문의 목록 로딩 2초 이내
- **검색 응답**: 검색 결과 응답 1초 이내
- **페이지네이션**: 대용량 데이터 처리 지원

### 3.5.6 사용성 요구사항
- **직관적인 인터페이스**: 관리자가 쉽게 사용할 수 있는 UI
- **실시간 업데이트**: 새로운 문의 실시간 알림
- **키보드 단축키**: 효율적인 작업을 위한 단축키 지원

### 3.5.7 접근성 요구사항
- **스크린 리더**: 문의 목록 및 상세 정보 스크린 리더 지원
- **키보드 네비게이션**: 모든 기능 키보드 접근 가능
- **고대비 모드**: 시각적 접근성 지원

## 기술적 구현 세부사항 (Technical Implementation Details)

### 3.5.8 문의 목록 API 엔드포인트
```typescript
// pages/api/admin/inquiries/index.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleware, AuthenticatedRequest } from '@/lib/auth/middleware'
import { prisma } from '@/lib/database'
import { logActivity } from '@/lib/auth/activity'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 인증 확인
    await new Promise<void>((resolve, reject) => {
      authMiddleware(req as AuthenticatedRequest, res, resolve)
    })

    const authenticatedReq = req as AuthenticatedRequest
    const { 
      page = '1', 
      limit = '20', 
      status, 
      category, 
      search, 
      sortBy = 'createdAt',
      sortOrder = 'desc',
      startDate,
      endDate,
      priority
    } = req.query

    // 페이지네이션 설정
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    // 필터 조건 구성
    const where: any = {}

    if (status) {
      where.status = status
    }

    if (category) {
      where.category = category
    }

    if (priority) {
      where.priority = priority
    }

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { subject: { contains: search as string, mode: 'insensitive' } },
        { message: { contains: search as string, mode: 'insensitive' } },
      ]
    }

    // 정렬 설정
    const orderBy: any = {}
    orderBy[sortBy as string] = sortOrder

    // 문의 목록 조회
    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          category: true,
          status: true,
          priority: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              activities: true,
            },
          },
        },
      }),
      prisma.inquiry.count({ where }),
    ])

    // 활동 로그
    await logActivity(
      authenticatedReq.admin!.id,
      'VIEW_INQUIRIES',
      'inquiry',
      null,
      {
        filters: { status, category, search, priority },
        page: pageNum,
        limit: limitNum,
      }
    )

    res.status(200).json({
      success: true,
      data: {
        inquiries,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    })

  } catch (error) {
    console.error('문의 목록 조회 오류:', error)
    res.status(500).json({ error: '문의 목록 조회 중 오류가 발생했습니다.' })
  }
}
```

### 3.5.9 문의 상세 조회 API
```typescript
// pages/api/admin/inquiries/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleware, AuthenticatedRequest } from '@/lib/auth/middleware'
import { prisma } from '@/lib/database'
import { logActivity } from '@/lib/auth/activity'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 인증 확인
    await new Promise<void>((resolve, reject) => {
      authMiddleware(req as AuthenticatedRequest, res, resolve)
    })

    const authenticatedReq = req as AuthenticatedRequest
    const { id } = req.query

    // 문의 상세 조회
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: id as string },
      include: {
        activities: {
          include: {
            admin: {
              select: {
                username: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!inquiry) {
      return res.status(404).json({ error: '문의를 찾을 수 없습니다.' })
    }

    // 활동 로그
    await logActivity(
      authenticatedReq.admin!.id,
      'VIEW_INQUIRY_DETAIL',
      'inquiry',
      inquiry.id,
      { inquiryId: inquiry.id }
    )

    res.status(200).json({
      success: true,
      data: inquiry,
    })

  } catch (error) {
    console.error('문의 상세 조회 오류:', error)
    res.status(500).json({ error: '문의 상세 조회 중 오류가 발생했습니다.' })
  }
}
```

### 3.5.10 문의 상태 업데이트 API
```typescript
// pages/api/admin/inquiries/[id]/status.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleware, AuthenticatedRequest } from '@/lib/auth/middleware'
import { prisma } from '@/lib/database'
import { logActivity } from '@/lib/auth/activity'
import { z } from 'zod'

const updateStatusSchema = z.object({
  status: z.enum(['new', 'in_progress', 'completed', 'spam']),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  note: z.string().optional(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 인증 확인
    await new Promise<void>((resolve, reject) => {
      authMiddleware(req as AuthenticatedRequest, res, resolve)
    })

    const authenticatedReq = req as AuthenticatedRequest
    const { id } = req.query
    const { status, priority, note } = updateStatusSchema.parse(req.body)

    // 문의 존재 확인
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: id as string },
    })

    if (!inquiry) {
      return res.status(404).json({ error: '문의를 찾을 수 없습니다.' })
    }

    // 상태 업데이트
    const updatedInquiry = await prisma.inquiry.update({
      where: { id: id as string },
      data: {
        status,
        ...(priority && { priority }),
      },
    })

    // 활동 로그
    await logActivity(
      authenticatedReq.admin!.id,
      'UPDATE_INQUIRY_STATUS',
      'inquiry',
      inquiry.id,
      {
        inquiryId: inquiry.id,
        oldStatus: inquiry.status,
        newStatus: status,
        priority,
        note,
      }
    )

    res.status(200).json({
      success: true,
      data: updatedInquiry,
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: '입력 데이터가 올바르지 않습니다.',
        details: error.errors,
      })
    }

    console.error('문의 상태 업데이트 오류:', error)
    res.status(500).json({ error: '문의 상태 업데이트 중 오류가 발생했습니다.' })
  }
}
```

### 3.5.11 문의 목록 페이지 컴포넌트
```typescript
// pages/admin/inquiries/index.tsx
import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Eye, MessageSquare } from 'lucide-react'
import { AdminLayout } from '@/components/admin/admin-layout'
import { InquiryList } from '@/components/admin/inquiry-list'
import { InquiryFilters } from '@/components/admin/inquiry-filters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface InquiryListPageProps {
  initialInquiries: any[]
  initialPagination: any
}

const InquiryListPage = ({ initialInquiries, initialPagination }: InquiryListPageProps) => {
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [pagination, setPagination] = useState(initialPagination)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    priority: '',
    search: '',
    startDate: '',
    endDate: '',
  })
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')

  const fetchInquiries = async (params: any = {}) => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: params.page || '1',
        limit: '20',
        sortBy,
        sortOrder,
        ...filters,
        ...params,
      })

      const response = await fetch(`/api/admin/inquiries?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setInquiries(data.data.inquiries)
        setPagination(data.data.pagination)
      }
    } catch (error) {
      console.error('문의 목록 조회 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [filters, sortBy, sortOrder])

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const handlePageChange = (page: number) => {
    fetchInquiries({ page: page.toString() })
  }

  return (
    <AdminLayout title="문의 관리">
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary-900">
              문의 관리
            </h2>
            <p className="text-primary-600 mt-1">
              총 {pagination.total}개의 문의가 있습니다.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              새 문의
            </Button>
          </div>
        </div>

        {/* 필터 및 검색 */}
        <InquiryFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={(search) => handleFilterChange({ search })}
        />

        {/* 문의 목록 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <InquiryList
            inquiries={inquiries}
            loading={loading}
            pagination={pagination}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            onPageChange={handlePageChange}
          />
        </motion.div>
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 서버 사이드에서 초기 데이터 로드
  // 실제 구현에서는 인증 확인 및 데이터 조회 로직 추가
  return {
    props: {
      initialInquiries: [],
      initialPagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
    },
  }
}

export default InquiryListPage
```

### 3.5.12 문의 목록 컴포넌트
```typescript
// components/admin/inquiry-list.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Ban,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Inquiry {
  id: string
  name: string
  email: string
  subject: string
  category: string
  status: string
  priority: string
  createdAt: string
  updatedAt: string
  _count: {
    activities: number
  }
}

interface InquiryListProps {
  inquiries: Inquiry[]
  loading: boolean
  pagination: any
  sortBy: string
  sortOrder: string
  onSortChange: (field: string) => void
  onPageChange: (page: number) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-800'
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-800'
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'spam':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800'
    case 'high':
      return 'bg-orange-100 text-orange-800'
    case 'normal':
      return 'bg-blue-100 text-blue-800'
    case 'low':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'general':
      return '일반 문의'
    case 'project':
      return '프로젝트 문의'
    case 'partnership':
      return '협업 제안'
    case 'other':
      return '기타'
    default:
      return category
  }
}

export const InquiryList = ({
  inquiries,
  loading,
  pagination,
  sortBy,
  sortOrder,
  onSortChange,
  onPageChange,
}: InquiryListProps) => {
  const [selectedInquiries, setSelectedInquiries] = useState<string[]>([])

  const handleSelectAll = () => {
    if (selectedInquiries.length === inquiries.length) {
      setSelectedInquiries([])
    } else {
      setSelectedInquiries(inquiries.map(inquiry => inquiry.id))
    }
  }

  const handleSelectInquiry = (id: string) => {
    setSelectedInquiries(prev =>
      prev.includes(id)
        ? prev.filter(inquiryId => inquiryId !== id)
        : [...prev, id]
    )
  }

  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button
      onClick={() => onSortChange(field)}
      className="flex items-center space-x-1 hover:text-accent-600 transition-colors"
    >
      <span>{children}</span>
      {sortBy === field ? (
        sortOrder === 'asc' ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )
      ) : (
        <ArrowUpDown className="w-4 h-4 opacity-50" />
      )}
    </button>
  )

  return (
    <div className="bg-white rounded-lg shadow">
      {/* 테이블 헤더 */}
      <div className="px-6 py-4 border-b border-primary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedInquiries.length === inquiries.length && inquiries.length > 0}
              onChange={handleSelectAll}
              className="rounded border-primary-300"
            />
            <span className="text-sm text-primary-600">
              {selectedInquiries.length}개 선택됨
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled={selectedInquiries.length === 0}>
              일괄 처리
            </Button>
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedInquiries.length === inquiries.length && inquiries.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-primary-300"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                <SortButton field="createdAt">접수일</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                문의자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                <SortButton field="subject">제목</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                카테고리
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                <SortButton field="status">상태</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                <SortButton field="priority">우선순위</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                활동
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-primary-200">
            <AnimatePresence>
              {inquiries.map((inquiry, index) => (
                <motion.tr
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-primary-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedInquiries.includes(inquiry.id)}
                      onChange={() => handleSelectInquiry(inquiry.id)}
                      className="rounded border-primary-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900">
                    {new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-primary-900">
                        {inquiry.name}
                      </div>
                      <div className="text-sm text-primary-500">
                        {inquiry.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-primary-900 max-w-xs truncate">
                      {inquiry.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary">
                      {getCategoryLabel(inquiry.category)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusColor(inquiry.status)}>
                      {inquiry.status === 'new' && <Clock className="w-3 h-3 mr-1" />}
                      {inquiry.status === 'in_progress' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {inquiry.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {inquiry.status === 'spam' && <Ban className="w-3 h-3 mr-1" />}
                      {inquiry.status === 'new' && '신규'}
                      {inquiry.status === 'in_progress' && '처리중'}
                      {inquiry.status === 'completed' && '완료'}
                      {inquiry.status === 'spam' && '스팸'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getPriorityColor(inquiry.priority)}>
                      {inquiry.priority === 'urgent' && '긴급'}
                      {inquiry.priority === 'high' && '높음'}
                      {inquiry.priority === 'normal' && '보통'}
                      {inquiry.priority === 'low' && '낮음'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                    {inquiry._count.activities}회
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/admin/inquiries/${inquiry.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        보기
                      </Button>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-primary-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-primary-600">
              {pagination.total}개 중 {(pagination.page - 1) * pagination.limit + 1}-
              {Math.min(pagination.page * pagination.limit, pagination.total)}개 표시
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === 1}
                onClick={() => onPageChange(pagination.page - 1)}
              >
                이전
              </Button>
              <span className="text-sm text-primary-600">
                {pagination.page} / {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => onPageChange(pagination.page + 1)}
              >
                다음
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

### 3.5.13 문의 필터 컴포넌트
```typescript
// components/admin/inquiry-filters.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface InquiryFiltersProps {
  filters: any
  onFilterChange: (filters: any) => void
  onSearch: (search: string) => void
}

export const InquiryFilters = ({ filters, onFilterChange, onSearch }: InquiryFiltersProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [searchValue, setSearchValue] = useState(filters.search || '')

  const handleSearch = () => {
    onSearch(searchValue)
  }

  const handleClearFilters = () => {
    onFilterChange({
      status: '',
      category: '',
      priority: '',
      search: '',
      startDate: '',
      endDate: '',
    })
    setSearchValue('')
  }

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* 기본 검색 */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-400" />
            <Input
              placeholder="이름, 이메일, 제목으로 검색..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
        </div>
        <Button onClick={handleSearch}>
          검색
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <Filter className="w-4 h-4 mr-2" />
          고급 필터
          {activeFiltersCount > 0 && (
            <Badge variant="accent" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* 고급 필터 */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-primary-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 상태 필터 */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  상태
                </label>
                <Select
                  value={filters.status}
                  onChange={(e) => onFilterChange({ status: e.target.value })}
                >
                  <option value="">모든 상태</option>
                  <option value="new">신규</option>
                  <option value="in_progress">처리중</option>
                  <option value="completed">완료</option>
                  <option value="spam">스팸</option>
                </Select>
              </div>

              {/* 카테고리 필터 */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  카테고리
                </label>
                <Select
                  value={filters.category}
                  onChange={(e) => onFilterChange({ category: e.target.value })}
                >
                  <option value="">모든 카테고리</option>
                  <option value="general">일반 문의</option>
                  <option value="project">프로젝트 문의</option>
                  <option value="partnership">협업 제안</option>
                  <option value="other">기타</option>
                </Select>
              </div>

              {/* 우선순위 필터 */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  우선순위
                </label>
                <Select
                  value={filters.priority}
                  onChange={(e) => onFilterChange({ priority: e.target.value })}
                >
                  <option value="">모든 우선순위</option>
                  <option value="urgent">긴급</option>
                  <option value="high">높음</option>
                  <option value="normal">보통</option>
                  <option value="low">낮음</option>
                </Select>
              </div>

              {/* 날짜 범위 필터 */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  날짜 범위
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => onFilterChange({ startDate: e.target.value })}
                    placeholder="시작일"
                  />
                  <Input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => onFilterChange({ endDate: e.target.value })}
                    placeholder="종료일"
                  />
                </div>
              </div>
            </div>

            {/* 필터 초기화 */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-primary-600">활성 필터:</span>
                  {filters.status && (
                    <Badge variant="secondary" className="flex items-center">
                      상태: {filters.status}
                      <X
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => onFilterChange({ status: '' })}
                      />
                    </Badge>
                  )}
                  {filters.category && (
                    <Badge variant="secondary" className="flex items-center">
                      카테고리: {filters.category}
                      <X
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => onFilterChange({ category: '' })}
                      />
                    </Badge>
                  )}
                  {/* 추가 필터 배지들 */}
                </div>
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  모든 필터 초기화
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

## 테스트 기준 (Testing Criteria)

### 3.5.14 기능 테스트
- **목록 조회 테스트**
  - 문의 목록 정상 표시 확인
  - 페이지네이션 동작 확인
  - 정렬 기능 확인
  - 검색 기능 확인

### 3.5.15 필터링 테스트
- **필터링 테스트**
  - 상태별 필터링 확인
  - 카테고리별 필터링 확인
  - 날짜 범위 필터링 확인
  - 복합 필터링 확인

### 3.5.16 사용성 테스트
- **사용자 경험 테스트**
  - 관리자 인터페이스 사용성 확인
  - 반응형 디자인 확인
  - 접근성 준수 확인

## 예상 소요 시간 (Estimated Time)
- **총 예상 시간**: 6-10시간
- **API 구현**: 2-3시간
- **UI 컴포넌트 구현**: 3-4시간
- **필터링 및 검색**: 1-3시간

## 의존성 (Dependencies)
- **Story 3.4 완료**: 관리자 인증 시스템 완료
- **Story 3.1 완료**: 문의 데이터베이스 스키마 완료
- **Epic 1 완료**: 기본 UI 컴포넌트 완료

## 위험 요소 (Risks)
- **성능 이슈**: 대용량 데이터 처리 시 성능 저하
- **사용자 경험**: 복잡한 필터링으로 인한 사용성 저하
- **보안**: 민감한 문의 정보 노출 위험

## 다음 단계 (Next Steps)
- Story 3.6: 문의하기 및 관리자 페이지 최종 폴리싱
- 문의 통계 및 분석 기능 추가
- 이메일 알림 시스템 구현 