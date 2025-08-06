import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // 데이터베이스 연결 테스트
    const inquiryCount = await prisma.inquiry.count()
    
    return NextResponse.json({
      success: true,
      message: 'API가 정상적으로 작동합니다.',
      data: {
        inquiryCount,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Test API error:', error)
    
    return NextResponse.json({
      success: false,
      error: '데이터베이스 연결에 문제가 있습니다.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 