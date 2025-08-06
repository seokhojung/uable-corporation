import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// 실제 프로덕션에서는 환경변수에서 가져와야 합니다
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'password'
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    console.log('로그인 시도:', { username, password })

    // 사용자명 확인
    if (username !== ADMIN_USERNAME) {
      console.log('사용자명 불일치:', username)
      return NextResponse.json(
        { message: '잘못된 사용자명입니다.' },
        { status: 401 }
      )
    }

    // 비밀번호 확인
    if (password !== ADMIN_PASSWORD) {
      console.log('비밀번호 불일치')
      return NextResponse.json(
        { message: '잘못된 비밀번호입니다.' },
        { status: 401 }
      )
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    console.log('로그인 성공:', username)

    return NextResponse.json({
      message: '로그인 성공',
      token,
      user: { username, role: 'admin' }
    })

  } catch (error) {
    console.error('로그인 오류:', error)
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 