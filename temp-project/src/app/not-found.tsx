import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(30,41,59,0.8),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(2,6,23,0.7),transparent_50%)]" />
      <Container>
        <div className="relative flex min-h-[70vh] flex-col items-center justify-center text-center gap-8 px-4">
          <span className="inline-flex items-center rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-300 ring-1 ring-slate-700/50">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-slate-400/70" aria-hidden="true" />
            페이지 준비 중
          </span>

          <div className="w-full max-w-2xl rounded-2xl border border-slate-700/40 bg-slate-900/60 p-8 backdrop-blur-md shadow-xl shadow-black/30 animate-[fadeIn_600ms_ease-out]">
            <h1 className="text-3xl font-bold text-slate-100">페이지 준비 중입니다</h1>
            <p className="mt-3 text-slate-300">
              요청하신 페이지는 현재 준비 중입니다. <br/> 보다 나은 서비스 제공을 위해 작업을 진행하고 있습니다.
              <br/> 아래 버튼을 통해 다른 페이지를 이용해 주시기 바랍니다.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <Button className="bg-slate-700 hover:bg-slate-600">홈으로 이동</Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline">포트폴리오 보기</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">문의하기</Button>
              </Link>
            </div>
          </div>

          <p className="text-xs text-slate-500">코드: 404 · 페이지를 찾을 수 없습니다</p>
        </div>
      </Container>
    </div>
  )
}
