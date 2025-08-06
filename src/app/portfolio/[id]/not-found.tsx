// src/app/portfolio/[id]/not-found.tsx
import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-slate-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-slate-100 mb-4">
            프로젝트를 찾을 수 없습니다
          </h1>
          
          <p className="text-slate-300 mb-8">
            요청하신 프로젝트가 존재하지 않거나 삭제되었습니다.
            다른 프로젝트들을 확인해보세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portfolio">
              <Button variant="primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                포트폴리오로 돌아가기
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline">
                홈으로 가기
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}