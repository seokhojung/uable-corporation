'use client'

import { ArrowRight, Play, Pause, Star, Users, Award, CheckCircle, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { portfolioProjects } from '@/data/portfolio'
import { CountUp } from '@/components/ui/count-up'
import { ServiceScroll } from '@/components/ui/service-scroll'
import { PortfolioCard } from '@/components/portfolio/portfolio-card'

const stats = [
  { label: '완료 프로젝트', value: '150+', icon: Award },
  { label: '만족한 고객', value: '200+', icon: Users },
  { label: '평균 평점', value: '4.8+', icon: Star },
]



export function HomePageClient() {
  // 테마 시스템 기본 활성화(명시적으로 'false'인 경우만 비활성)
  const isThemeSystemEnabled = process.env.NEXT_PUBLIC_THEME_SYSTEM !== 'false'
  
  // 디버깅 로그
  console.log('🔍 DEBUG - isThemeSystemEnabled:', isThemeSystemEnabled)
  console.log('🔍 DEBUG - NEXT_PUBLIC_THEME_SYSTEM:', process.env.NEXT_PUBLIC_THEME_SYSTEM)
  
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroVisualRef = useRef<HTMLDivElement>(null)
  const serviceHeaderRef = useRef<HTMLDivElement>(null)
  const serviceCardsRef = useRef<HTMLDivElement>(null)
  const portfolioSectionRef = useRef<HTMLDivElement>(null)
  const processSectionRef = useRef<HTMLDivElement>(null)
  const effectsSectionRef = useRef<HTMLDivElement>(null)
  const ctaContentRef = useRef<HTMLDivElement>(null)
  
  // 동영상 컨트롤 상태
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // 동영상 컨트롤 함수들
  const toggleVideoPlay = async () => {
    if (videoRef.current) {
      try {
        if (isVideoPlaying) {
          videoRef.current.pause()
          setIsVideoPlaying(false)
        } else {
          await videoRef.current.play()
          setIsVideoPlaying(true)
        }
      } catch (error) {
        console.error('동영상 재생 오류:', error)
        // 자동재생이 차단된 경우 수동으로 재생 시도
        if (videoRef.current) {
          videoRef.current.muted = true
          try {
            await videoRef.current.play()
            setIsVideoPlaying(true)
          } catch (playError) {
            console.error('음소거 상태에서도 재생 실패:', playError)
          }
        }
      }
    }
  }

  const toggleVideoMute = () => {
    if (videoRef.current) {
      const newMutedState = !isVideoMuted
      videoRef.current.muted = newMutedState
      setIsVideoMuted(newMutedState)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const elements = [
      heroContentRef.current,
      heroVisualRef.current,
      serviceHeaderRef.current,
      serviceCardsRef.current,
      portfolioSectionRef.current,
      processSectionRef.current,
      effectsSectionRef.current,
      ctaContentRef.current
    ].filter(Boolean)

    elements.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section - VIVAR 스타일 참고 */}
      <section className="relative min-h-screen md:h-[90vh] lg:h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 md:pt-0">
        {/* 배경 요소 */}
        <div className="absolute inset-0 overflow-hidden">
                     <div className="absolute top-20 right-20 w-72 h-72 opacity-20 filter brightness-0" style={{animation: 'pulse 4s ease-in-out infinite'}}>
            <Image
              src="/UABLE-logo.png"
              alt="Uable Logo Background"
              width={288}
              height={288}
              className="object-contain max-w-full max-h-full w-auto h-auto"
            />
          </div>
                     <div className="absolute bottom-20 left-20 w-96 h-96 opacity-10 filter brightness-0" style={{animation: 'pulse 6s ease-in-out infinite', animationDelay: '1s'}}>
            <Image
              src="/UABLE-logo.png"
              alt="Uable Logo Background"
              width={384}
              height={384}
              className="object-contain max-w-full max-h-full w-auto h-auto"
            />
          </div>
                     <div className="absolute top-1/2 left-1/4 w-48 h-48 opacity-15 filter brightness-0" style={{animation: 'pulse 5s ease-in-out infinite', animationDelay: '2s'}}>
            <Image
              src="/UABLE-logo.png"
              alt="Uable Logo Background"
              width={192}
              height={192}
              className="object-contain max-w-full max-h-full w-auto h-auto"
            />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* 텍스트 콘텐츠 */}
            <div ref={heroContentRef} className="lg:col-span-7 text-center lg:text-left animate-hero-content py-8 lg:py-0">
              {/* 배지 */}
              <div className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded-full text-sm font-medium mb-8">
                <Star className="w-4 h-4 mr-2" />
                혁신적인 디지털 솔루션
              </div>

              {/* 메인 헤드라인 - VIVAR 스타일 */}
              <h1 className="text-4xl lg:text-6xl xl:text-6xl font-bold text-gray-900 dark:text-slate-100 mb-8 leading-tight">
                고객에게 필요한
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-slate-300 dark:to-slate-400">
                  제품은 모두 다릅니다.
                </span>
              </h1>

              {/* 서브헤드라인 */}
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                공정에 타협하지 않고 고객에게 필요한 제품을 전개하는 브랜드의 도전에{' '}
                <span className="font-semibold text-blue-600 dark:text-slate-300">Uable</span>이 함께하겠습니다.
              </p>

              {/* CTA 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link href="/portfolio">
                  <Button size="lg" className="text-lg px-12 py-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-slate-600 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-800 shadow-lg text-white">
                    포트폴리오 보기
                    {/* <ArrowRight className="w-5 h-5 ml-2" /> */}
                  </Button>
                </Link>

                <Link href="https://befunweb.vercel.app/">
                <Button variant="outline" size="lg" className="text-lg px-12 py-8 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700">
                  {/* <Play className="w-5 h-5 mr-2" /> */}
                  컨피규레이터 보기
                </Button>
              </Link>
              </div>
              {/* 통계 */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-slate-700">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-6 h-6 text-gray-600 dark:text-slate-300 mr-2" />
                      <span className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-slate-100">
                        {stat.value.includes('+') ? (
                          <CountUp 
                            end={parseFloat(stat.value.replace('+', ''))} 
                            suffix="+" 
                            duration={2000} 
                            decimal={stat.label === '평균 평점'}
                          />
                        ) : stat.value.includes('%') ? (
                          <CountUp 
                            end={parseFloat(stat.value.replace('%', ''))} 
                            suffix="%" 
                            duration={2000} 
                          />
                        ) : stat.value === '24/7' ? (
                          '24/7'
                        ) : (
                          <CountUp 
                            end={parseFloat(stat.value)} 
                            duration={2000} 
                          />
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-slate-300 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 시각적 요소 - VIVAR 스타일 */}
            <div ref={heroVisualRef} className="lg:col-span-5 relative animate-hero-visual py-8 lg:py-0 min-h-[200px] lg:min-h-auto">
              {/* 데스크톱에서만 ServiceScroll 표시 (CSS로 제어) */}
              <div className="hidden lg:block h-full">
                <ServiceScroll speed={0.8} />
              </div>
              
              {/* 모바일/태블릿용 대체 콘텐츠 */}
              <div className="lg:hidden flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-4xl mb-4"></div>
                  <p className="text-gray-600 dark:text-slate-300 text-sm">
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 소개 섹션 - VIVAR 스타일 */}
      <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          <div ref={serviceHeaderRef} className="max-w-4xl mx-auto text-center mb-16 animate-service-header">
            <Badge variant="outline" className="mb-8 px-6 py-3 text-lg">
              서비스 소개
            </Badge>
            <h2 className="text-4xl lg:text-6xl xl:text-6xl font-bold text-gray-900 dark:text-slate-100 mb-8 leading-tight">
              체험하고 구매하는{' '}
              <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-slate-300 dark:to-slate-400">
                3D 제품 컨피규레이터
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              색상 조합부터 모듈 추가까지, Uable 도입 문의하기
            </p>
          </div>
          
                     {/* 동영상 데모 섹션 - 실제 동영상 플레이어 */}
           <div className="mb-20">
             <div className="max-w-5xl mx-auto">
               <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-700">
                 <video
                   ref={videoRef}
                   src="/videos/inshowconfigurator.mp4"
                   className="w-full h-full object-cover"
                   muted={isVideoMuted}
                   loop
                   playsInline
                   autoPlay
                   onPlay={() => setIsVideoPlaying(true)}
                   onPause={() => setIsVideoPlaying(false)}
                   onLoadedData={() => console.log('동영상 로드 완료')}
                   onError={(e) => console.error('동영상 로드 오류:', e)}
                   onCanPlay={() => console.log('동영상 재생 가능')}
                 />
                 
                 {/* 오버레이 */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                 
                 {/* 컨트롤 버튼들 */}
                 <div className="absolute bottom-6 left-6 flex gap-3">
                   <button 
                     onClick={toggleVideoPlay}
                     className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                     title={isVideoPlaying ? '일시정지' : '재생'}
                   >
                     {isVideoPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                   </button>
                   <button 
                     onClick={toggleVideoMute}
                     className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                     title={isVideoMuted ? '음소거 해제' : '음소거'}
                   >
                     {isVideoMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                   </button>
                 </div>
                 
                 {/* 동영상 제목 오버레이 */}
                 <div className="absolute top-6 left-6">
                   <Badge variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
                     3D 제품 컨피규레이터
                   </Badge>
                 </div>
               </div>
               
               {/* 동영상 설명 */}
               <div className="mt-6 text-center">
                 <p className="text-gray-600 dark:text-slate-300 text-lg">
                   실제 3D 제품 컨피규레이터의 동작을 확인해보세요
                 </p>
               </div>
             </div>
           </div>
          
          <div ref={serviceCardsRef} className="grid lg:grid-cols-2 gap-12 animate-service-cards">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">기존 상세페이지</h3>
              <p className="text-gray-600 dark:text-slate-300 mb-6">
                복잡한 옵션과 조합을 가지고 있다면, 상세페이지는 점점 길어지고 고객은 주문에 어려움을 겪게 됩니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-red-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>복잡한 옵션 선택</span>
                </div>
                <div className="flex items-center text-red-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>긴 상세페이지</span>
                </div>
                <div className="flex items-center text-red-400">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>주문 어려움</span>
                </div>
              </div>
            </div>
            
            <div className={isThemeSystemEnabled 
              ? "bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700" 
              : "bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-700"
            }>
              <h3 className={isThemeSystemEnabled 
                ? "text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4" 
                : "text-2xl font-bold text-slate-100 mb-4"
              }>3D 제품 컨피규레이터</h3>
              <p className={isThemeSystemEnabled 
                ? "text-gray-600 dark:text-slate-300 mb-6" 
                : "text-slate-300 mb-6"
              }>
                기존 운영하던 제품 정보를 컨피규레이터에 연동해서 직관적으로 구매 경험을 제공할 수 있습니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span>직관적인 3D 체험</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span>실시간 옵션 변경</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  <span>쉬운 구매 프로세스</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 포트폴리오 섹션 */}
      <section ref={portfolioSectionRef} className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 animate-portfolio-section">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6">
              프로젝트 포트폴리오
            </Badge>
            <h2 className="text-3xl lg:text-6xl font-bold text-gray-900 dark:text-slate-100 mb-6">
              Uable의 3D/AR/WebXR 프로젝트 사례를 직접 확인해보세요
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-300 mb-8">
              Uable만의 최고의 퀄리티와 사용성으로 제품을 시뮬레이션하고, 
              비즈니스 성과를 직접 경험하고 있습니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {portfolioProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                <PortfolioCard project={project} index={0} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/portfolio">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-slate-600 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-800">
                전체 포트폴리오 보기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 도입 절차 섹션 */}
      <section ref={processSectionRef} className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 animate-process-section">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="primary" className="mb-6">
              도입 절차
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-6">
              간단한 3단계로 프로젝트를 시작하세요
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-300">
              전문가와 함께 단계별로 진행하여 안전하고 효율적으로 프로젝트를 완성합니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-slate-600 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white dark:text-slate-100">01</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">기획 & 견적 미팅</h3>
              <p className="text-gray-600 dark:text-slate-300 mb-4">
                직접 요구사항을 확인하고 프로젝트 범위를 정의합니다. 
                상세한 견적과 일정을 제공합니다.
              </p>
              <Badge variant="outline" className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 border-gray-300 dark:border-slate-600">
                무료
              </Badge>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-slate-600 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white dark:text-slate-100">02</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">디자인 & 개발</h3>
              <p className="text-gray-600 dark:text-slate-300 mb-4">
                UI/UX 디자인부터 개발까지 전문가가 직접 진행합니다. 
                실시간으로 진행상황을 공유합니다.
              </p>
              <Badge variant="outline" className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 border-gray-300 dark:border-slate-600">
                20~40일
              </Badge>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-slate-600 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white dark:text-slate-100">03</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">배포 & 유지보수</h3>
              <p className="text-gray-600 dark:text-slate-300 mb-4">
                안정적인 배포와 지속적인 유지보수를 제공합니다. 
                성능 모니터링과 업데이트를 지원합니다.
              </p>
              <Badge variant="outline" className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 border-gray-300 dark:border-slate-600">
                지속적
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 도입 효과 섹션 */}
      <section ref={effectsSectionRef} className="py-32 bg-white dark:bg-slate-800 animate-effects-section">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          {/* 헤드라인 섹션 */}
          <div className="max-w-5xl mx-auto mb-20 ">
            <div className="flex items-center mb-6">
              <div className="w-4 h-4 bg-gray-400 dark:bg-slate-400 rounded mr-3"></div>
              <Badge variant="outline" className="text-gray-600 dark:text-slate-300 border-gray-300 dark:border-slate-600">
                도입 효과
              </Badge>
            </div>
            <h2 className="text-3xl lg:text-6xl xl:text-2xl font-bold text-gray-900 dark:text-slate-100 mb-8 leading-tight text-center">
              무한한 구성과, 개인화 옵션의 제품은{' '}
              <span className="text-gray-600 dark:text-slate-300">
                기존의 방법으로 판매가 어렵습니다.
              </span>
              <br />
              3D 컨피규레이터로 문제를 해결하고{' '}
              <span className="text-gray-600 dark:text-slate-300">
                매출 상승을 직접 경험하세요.
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                <CountUp end={94} suffix="%" duration={2500} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">구매전환률</h3>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                제품을 3D와 AR로 결합하여 고객 구매의사 결정에 도움을 줍니다.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                <CountUp end={40} suffix="%" duration={2500} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">반품률 감소</h3>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                제품의 사이즈와 색상을 경험하고, AR로 제품을 원하는 위치에 배치해보는 것은 반품율을 줄일 수 있습니다.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                <CountUp end={73} suffix="%" duration={2500} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">고객 만족도 상승</h3>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                복잡한 옵션 선택 과정을 직관적인 3D 시뮬레이션으로 대체하여 고객의 구매 경험 만족도를 개선합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - 다크 테마 */}
      <section className="py-32 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-12">
          <div ref={ctaContentRef} className="max-w-4xl mx-auto text-center animate-cta-content">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8">
              프로젝트를 시작할 준비가 되셨나요?
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-300 mb-12">
              최신 기술과 창의적인 솔루션으로 비즈니스의 디지털 혁신을 이끌어보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/portfolio">
                <Button size="lg" variant="secondary" className="text-lg px-10 py-4 bg-white dark:bg-slate-100 text-gray-900 dark:text-slate-900 hover:bg-gray-100 dark:hover:bg-slate-200">
                  포트폴리오 보기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-lg px-10 py-4 border-2 border-gray-300 dark:border-slate-300 text-gray-900 dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200">
                  문의하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
