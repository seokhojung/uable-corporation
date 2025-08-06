# Story 3.4: [백엔드] 관리자 페이지 기본 인증 및 레이아웃 구현

## 스토리 개요 (Story Overview)
**As a** 관리자  
**I want to** 안전한 인증 시스템을 통해 관리자 페이지에 접근할 수 있고  
**So that** 문의 내역을 관리하고 처리할 수 있는 전용 관리자 인터페이스를 사용할 수 있습니다.

## 기능적 요구사항 (Functional Requirements)

### 3.4.1 인증 시스템 구현
- **관리자 계정 관리**
  - 관리자 계정 생성 및 관리
  - 안전한 비밀번호 해싱 (bcrypt)
  - JWT 토큰 기반 인증
  - 세션 관리 및 만료 처리

### 3.4.2 관리자 페이지 구조
- **페이지 경로**: `/admin`
- **보호된 라우트**: 인증되지 않은 사용자 접근 차단
- **관리자 레이아웃**: 사이드바, 헤더, 메인 콘텐츠 영역

### 3.4.3 권한 관리
- **역할 기반 접근 제어 (RBAC)**
  - 관리자 (admin): 모든 기능 접근
  - 운영자 (operator): 문의 조회 및 처리
  - 뷰어 (viewer): 읽기 전용 접근

### 3.4.4 보안 기능
- **보안 강화**
  - 로그인 시도 제한
  - 세션 타임아웃
  - CSRF 토큰 보호
  - 로그아웃 기능

## 비기능적 요구사항 (Non-Functional Requirements)

### 3.4.5 보안 요구사항
- **데이터 보호**: 관리자 계정 정보 암호화 저장
- **접근 제어**: 인증되지 않은 접근 차단
- **감사 로그**: 관리자 활동 로깅

### 3.4.6 성능 요구사항
- **인증 응답**: 로그인 응답 시간 1초 이내
- **페이지 로딩**: 관리자 페이지 로딩 2초 이내
- **세션 관리**: 효율적인 세션 처리

### 3.4.7 사용성 요구사항
- **직관적인 인터페이스**: 관리자가 쉽게 사용할 수 있는 UI
- **반응형 디자인**: 다양한 화면 크기 지원
- **접근성**: 키보드 네비게이션 지원

## 기술적 구현 세부사항 (Technical Implementation Details)

### 3.4.8 데이터베이스 스키마 확장
```typescript
// prisma/schema.prisma (기존 스키마에 추가)
model Admin {
  id          String   @id @default(cuid())
  username    String   @unique @db.VarChar(50)
  email       String   @unique @db.VarChar(255)
  password    String   @db.VarChar(255)
  role        String   @default("admin") @db.VarChar(20)
  isActive    Boolean  @default(true)
  lastLoginAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([username])
  @@index([email])
  @@index([role])
}

model AdminSession {
  id        String   @id @default(cuid())
  adminId   String
  token     String   @unique @db.VarChar(500)
  expiresAt DateTime
  ipAddress String?  @db.VarChar(45)
  userAgent String?  @db.Text
  createdAt DateTime @default(now())

  admin Admin @relation(fields: [adminId], references: [id], onDelete: Cascade)

  @@index([adminId])
  @@index([token])
  @@index([expiresAt])
}

model AdminActivity {
  id          String   @id @default(cuid())
  adminId     String
  action      String   @db.VarChar(100)
  resource    String?  @db.VarChar(100)
  resourceId  String?  @db.VarChar(100)
  details     String?  @db.Text
  ipAddress   String?  @db.VarChar(45)
  userAgent   String?  @db.Text
  createdAt   DateTime @default(now())

  admin Admin @relation(fields: [adminId], references: [id], onDelete: Cascade)

  @@index([adminId])
  @@index([action])
  @@index([createdAt])
}

// 기존 Inquiry 모델에 관계 추가
model Inquiry {
  // ... 기존 필드들 ...
  
  // 관리자 활동과의 관계
  activities AdminActivity[] @relation("InquiryActivities")
}
```

### 3.4.9 인증 미들웨어 구현
```typescript
// lib/auth/middleware.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { verifyToken } from './jwt'
import { prisma } from '@/lib/database'

export interface AuthenticatedRequest extends NextApiRequest {
  admin?: {
    id: string
    username: string
    email: string
    role: string
  }
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: '인증 토큰이 필요합니다.' })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return res.status(401).json({ error: '유효하지 않은 토큰입니다.' })
    }

    // 관리자 정보 확인
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      }
    })

    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: '유효하지 않은 계정입니다.' })
    }

    // 세션 확인
    const session = await prisma.adminSession.findFirst({
      where: {
        adminId: admin.id,
        token: token,
        expiresAt: { gt: new Date() }
      }
    })

    if (!session) {
      return res.status(401).json({ error: '세션이 만료되었습니다.' })
    }

    req.admin = admin
    next()
  } catch (error) {
    console.error('인증 미들웨어 오류:', error)
    return res.status(500).json({ error: '인증 처리 중 오류가 발생했습니다.' })
  }
}

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
    if (!req.admin) {
      return res.status(401).json({ error: '인증이 필요합니다.' })
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ error: '접근 권한이 없습니다.' })
    }

    next()
  }
}
```

### 3.4.10 JWT 유틸리티
```typescript
// lib/auth/jwt.ts
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES_IN = '24h'

export interface TokenPayload {
  adminId: string
  username: string
  role: string
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
    return decoded
  } catch (error) {
    return null
  }
}

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload
  } catch (error) {
    return null
  }
}
```

### 3.4.11 인증 API 엔드포인트
```typescript
// pages/api/admin/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/database'
import { generateToken } from '@/lib/auth/jwt'
import { logActivity } from '@/lib/auth/activity'

const loginSchema = z.object({
  username: z.string().min(1, '사용자명을 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 입력 검증
    const { username, password } = loginSchema.parse(req.body)

    // 관리자 계정 확인
    const admin = await prisma.admin.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        role: true,
        isActive: true,
      }
    })

    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: '잘못된 사용자명 또는 비밀번호입니다.' })
    }

    // 비밀번호 확인
    const isValidPassword = await bcrypt.compare(password, admin.password)
    if (!isValidPassword) {
      await logActivity(admin.id, 'LOGIN_FAILED', 'auth', null, {
        username,
        ipAddress: req.headers['x-forwarded-for'] as string || req.socket.remoteAddress,
      })
      return res.status(401).json({ error: '잘못된 사용자명 또는 비밀번호입니다.' })
    }

    // JWT 토큰 생성
    const token = generateToken({
      adminId: admin.id,
      username: admin.username,
      role: admin.role,
    })

    // 세션 저장
    await prisma.adminSession.create({
      data: {
        adminId: admin.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24시간
        ipAddress: req.headers['x-forwarded-for'] as string || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      }
    })

    // 마지막 로그인 시간 업데이트
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() }
    })

    // 활동 로그
    await logActivity(admin.id, 'LOGIN_SUCCESS', 'auth', null, {
      ipAddress: req.headers['x-forwarded-for'] as string || req.socket.remoteAddress,
    })

    // 응답
    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: '입력 데이터가 올바르지 않습니다.',
        details: error.errors
      })
    }

    console.error('로그인 오류:', error)
    res.status(500).json({ error: '로그인 처리 중 오류가 발생했습니다.' })
  }
}
```

```typescript
// pages/api/admin/auth/logout.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleware, AuthenticatedRequest } from '@/lib/auth/middleware'
import { prisma } from '@/lib/database'
import { logActivity } from '@/lib/auth/activity'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 인증 확인
    await new Promise<void>((resolve, reject) => {
      authMiddleware(req as AuthenticatedRequest, res, resolve)
    })

    const authenticatedReq = req as AuthenticatedRequest
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (token) {
      // 세션 삭제
      await prisma.adminSession.deleteMany({
        where: { token }
      })

      // 활동 로그
      await logActivity(authenticatedReq.admin!.id, 'LOGOUT', 'auth', null, {
        ipAddress: req.headers['x-forwarded-for'] as string || req.socket.remoteAddress,
      })
    }

    res.status(200).json({ success: true, message: '로그아웃되었습니다.' })

  } catch (error) {
    console.error('로그아웃 오류:', error)
    res.status(500).json({ error: '로그아웃 처리 중 오류가 발생했습니다.' })
  }
}
```

### 3.4.12 활동 로깅 유틸리티
```typescript
// lib/auth/activity.ts
import { prisma } from '@/lib/database'

export const logActivity = async (
  adminId: string,
  action: string,
  resource?: string,
  resourceId?: string,
  details?: any
) => {
  try {
    await prisma.adminActivity.create({
      data: {
        adminId,
        action,
        resource,
        resourceId,
        details: details ? JSON.stringify(details) : null,
        ipAddress: details?.ipAddress,
        userAgent: details?.userAgent,
      }
    })
  } catch (error) {
    console.error('활동 로그 저장 실패:', error)
  }
}
```

### 3.4.13 관리자 페이지 레이아웃 컴포넌트
```typescript
// components/admin/admin-layout.tsx
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AdminSidebar } from './admin-sidebar'
import { AdminHeader } from './admin-header'

interface AdminLayoutProps {
  children: ReactNode
  title?: string
}

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-primary-50">
      <div className="flex">
        {/* 사이드바 */}
        <AdminSidebar />
        
        {/* 메인 콘텐츠 */}
        <div className="flex-1 flex flex-col">
          {/* 헤더 */}
          <AdminHeader title={title} />
          
          {/* 메인 콘텐츠 영역 */}
          <main className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
```

### 3.4.14 관리자 사이드바 컴포넌트
```typescript
// components/admin/admin-sidebar.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Home,
  MessageSquare,
  Users,
  Settings,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const menuItems = [
  {
    icon: Home,
    label: '대시보드',
    href: '/admin',
  },
  {
    icon: MessageSquare,
    label: '문의 관리',
    href: '/admin/inquiries',
  },
  {
    icon: Users,
    label: '사용자 관리',
    href: '/admin/users',
  },
  {
    icon: BarChart3,
    label: '통계',
    href: '/admin/analytics',
  },
  {
    icon: Settings,
    label: '설정',
    href: '/admin/settings',
  },
]

export const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      })

      if (response.ok) {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('로그아웃 오류:', error)
    }
  }

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="bg-white shadow-lg border-r border-primary-200"
    >
      <div className="flex flex-col h-full">
        {/* 로고 영역 */}
        <div className="p-6 border-b border-primary-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-primary-900"
              >
                관리자
              </motion.h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* 메뉴 영역 */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = router.pathname === item.href
              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-accent-500 text-white'
                          : 'text-primary-600 hover:bg-primary-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="ml-3 font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* 로그아웃 버튼 */}
        <div className="p-4 border-t border-primary-200">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-error-600 hover:text-error-700 hover:bg-error-50"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-3"
              >
                로그아웃
              </motion.span>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
```

### 3.4.15 관리자 헤더 컴포넌트
```typescript
// components/admin/admin-header.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, User, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface AdminHeaderProps {
  title?: string
}

export const AdminHeader = ({ title }: AdminHeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-primary-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* 제목 */}
        <div>
          <h1 className="text-2xl font-bold text-primary-900">
            {title || '관리자 대시보드'}
          </h1>
        </div>

        {/* 우측 메뉴 */}
        <div className="flex items-center space-x-4">
          {/* 알림 */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="w-5 h-5" />
              <Badge
                variant="error"
                className="absolute -top-1 -right-1 w-5 h-5 text-xs"
              >
                3
              </Badge>
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-primary-200 z-50"
                >
                  <div className="p-4">
                    <h3 className="font-semibold text-primary-900 mb-3">알림</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-primary-50 rounded-lg">
                        <p className="text-sm text-primary-700">
                          새로운 문의가 접수되었습니다.
                        </p>
                        <p className="text-xs text-primary-500 mt-1">
                          2분 전
                        </p>
                      </div>
                      {/* 추가 알림들 */}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 사용자 메뉴 */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <User className="w-5 h-5 mr-2" />
              관리자
            </Button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-primary-200 z-50"
                >
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-primary-700 hover:bg-primary-50 flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      설정
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-error-600 hover:bg-error-50 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      로그아웃
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
```

## 테스트 기준 (Testing Criteria)

### 3.4.16 인증 테스트
- **로그인 테스트**
  - 올바른 자격 증명으로 로그인 성공 확인
  - 잘못된 자격 증명으로 로그인 실패 확인
  - 비활성 계정 로그인 차단 확인

### 3.4.17 보안 테스트
- **보안 테스트**
  - 인증되지 않은 접근 차단 확인
  - 세션 만료 처리 확인
  - 권한 기반 접근 제어 확인

### 3.4.18 사용성 테스트
- **사용자 경험 테스트**
  - 관리자 인터페이스 사용성 확인
  - 반응형 디자인 확인
  - 접근성 준수 확인

## 예상 소요 시간 (Estimated Time)
- **총 예상 시간**: 8-12시간
- **인증 시스템 구현**: 4-6시간
- **관리자 레이아웃 구현**: 3-4시간
- **보안 및 테스트**: 1-2시간

## 의존성 (Dependencies)
- **Story 3.1 완료**: 데이터베이스 스키마 설정 완료
- **bcryptjs**: 비밀번호 해싱 라이브러리
- **jsonwebtoken**: JWT 토큰 라이브러리
- **Epic 1 완료**: 기본 UI 컴포넌트 완료

## 위험 요소 (Risks)
- **보안 취약점**: 인증 시스템 공격 가능성
- **세션 관리**: 세션 하이재킹 위험
- **권한 관리**: 권한 상승 공격 위험

## 다음 단계 (Next Steps)
- Story 3.5: [관리자] 문의 내역 조회 기능 구현
- 관리자 계정 생성 스크립트 개발
- 보안 감사 및 개선 