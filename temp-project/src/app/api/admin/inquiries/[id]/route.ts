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

// GET: 개별 문의 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: '인증 토큰이 필요합니다.' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { message: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      )
    }

    const { id } = params

    // 데이터베이스에서 문의 조회
    const inquiry = await prisma.inquiry.findUnique({
      where: { id }
    })

    if (!inquiry) {
      return NextResponse.json(
        { message: '문의를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: '문의를 성공적으로 가져왔습니다.',
      inquiry: {
        ...inquiry,
        createdAt: inquiry.createdAt.toISOString(),
        updatedAt: inquiry.updatedAt.toISOString()
      }
    })

  } catch (error) {
    console.error('문의 조회 오류:', error)
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// PATCH: 문의 상태 업데이트
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: '인증 토큰이 필요합니다.' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { message: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()
    const { status, priority } = body

    // 업데이트할 데이터 준비
    const updateData: any = {}
    if (status) updateData.status = status
    if (priority) updateData.priority = priority

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: '업데이트할 데이터가 없습니다.' },
        { status: 400 }
      )
    }

    // 데이터베이스에서 문의 업데이트
    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      message: '문의가 성공적으로 업데이트되었습니다.',
      inquiry: {
        ...updatedInquiry,
        createdAt: updatedInquiry.createdAt.toISOString(),
        updatedAt: updatedInquiry.updatedAt.toISOString()
      }
    })

  } catch (error) {
    console.error('문의 업데이트 오류:', error)
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE 요청 처리 (문의 삭제)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params

    console.log('🗑️ 문의 삭제 시작:', id)

    try {
      // 문의 존재 여부 확인
      const existingInquiry = await prisma.inquiry.findUnique({
        where: { id }
      })

      if (!existingInquiry) {
        console.log('❌ 문의를 찾을 수 없음:', id)
        return NextResponse.json(
          { message: '문의를 찾을 수 없습니다.' },
          { status: 404 }
        )
      }

      // 문의 삭제
      await prisma.inquiry.delete({
        where: { id }
      })

      console.log('✅ 문의 삭제 완료:', id)

      return NextResponse.json({
        message: '문의가 성공적으로 삭제되었습니다.',
        deletedId: id
      })

    } catch (dbError) {
      console.error('❌ 문의 삭제 실패:', dbError)
      return NextResponse.json(
        { message: '문의 삭제 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('문의 삭제 오류:', error)
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 