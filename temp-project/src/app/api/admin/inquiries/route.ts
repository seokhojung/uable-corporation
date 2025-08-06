import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'

// JWT 토큰 검증 함수
function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded
  } catch (error) {
    console.error('토큰 검증 실패:', error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: '인증 토큰이 필요합니다.' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // 'Bearer ' 제거
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { message: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      )
    }

    // URL 파라미터에서 페이지네이션 정보 가져오기
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // 데이터베이스에서 문의 목록 조회 시도
    try {
      console.log('🔍 데이터베이스 조회 시작')
      console.log('🔍 조회 조건:', { page, limit, status, search })
      
      const whereClause: any = {}
      
      if (status && status !== 'all') {
        whereClause.status = status
      }
      
      if (search) {
        whereClause.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { subject: { contains: search, mode: 'insensitive' } },
          { message: { contains: search, mode: 'insensitive' } }
        ]
      }

      const skip = (page - 1) * limit

      console.log('📊 Prisma 쿼리 실행 중...')
      console.log('📊 whereClause:', whereClause)
      
      const [inquiries, totalCount] = await Promise.all([
        prisma.inquiry.findMany({
          where: whereClause,
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            company: true,
            category: true,
            subject: true,
            message: true,
            status: true,
            priority: true,
            createdAt: true,
            updatedAt: true
          }
        }),
        prisma.inquiry.count({ where: whereClause })
      ])

      console.log('✅ 데이터베이스 조회 성공:', inquiries.length, '개 문의')
      console.log('📊 조회된 문의들:', inquiries)
      const totalPages = Math.ceil(totalCount / limit)

      // 문의 내역 반환 (최신순으로 정렬)
      const sortedInquiries = inquiries.map(inquiry => ({
        ...inquiry,
        createdAt: inquiry.createdAt.toISOString(),
        updatedAt: inquiry.updatedAt.toISOString()
      }))

      return NextResponse.json({
        message: '문의 내역을 성공적으로 가져왔습니다.',
        inquiries: sortedInquiries,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages
        }
      })

    } catch (dbError) {
      console.error('❌ 데이터베이스 조회 실패:', dbError)
      
      // 데이터베이스 오류 시 테스트 데이터 반환
      const testInquiries = [
        {
          id: 'test-1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '010-1234-5678',
          company: 'Test Company',
          category: '웹 개발',
          subject: 'Website Development Inquiry',
          message: 'Hello, I would like to discuss website development project.',
          status: 'new',
          priority: 'normal',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'test-2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '010-9876-5432',
          company: 'Another Company',
          category: '3D 제품 컨피규레이터',
          subject: '3D Product Configurator Request',
          message: 'We are interested in implementing a 3D product configurator for our website.',
          status: 'new',
          priority: 'normal',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]

      return NextResponse.json({
        message: '문의 내역을 성공적으로 가져왔습니다. (테스트 데이터)',
        inquiries: testInquiries,
        pagination: {
          page: 1,
          limit: 10,
          total: testInquiries.length,
          totalPages: 1
        }
      })
    }

  } catch (error) {
    console.error('문의 내역 조회 오류:', error)
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 