// src/components/layout/footer.tsx
import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'

const footerLinks = {
  company: [
    { label: '회사소개', href: '/about' },
    { label: '채용정보', href: '/careers' },
    { label: '뉴스', href: '/news' },
  ],
  services: [
    { label: '웹 개발', href: '/services/web-development' },
    { label: '모바일 앱', href: '/services/mobile-app' },
    { label: 'UI/UX 디자인', href: '/services/ui-ux-design' },

  ],
  resources: [
    { label: '포트폴리오', href: '/portfolio' },
    { label: '가이드', href: '/guides' },
    { label: '도구', href: '/tools' },
  ],
  support: [
    { label: '문의하기', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: '개인정보처리방침', href: '/privacy' },
  ],
}

const socialLinks = [
  { label: 'LinkedIn', href: '#', icon: Linkedin },
  { label: 'Twitter', href: '#', icon: Twitter },
  { label: 'GitHub', href: '#', icon: Github },
]

export const Footer = () => {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-lg text-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-slate-600/10 to-slate-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-slate-500/10 to-slate-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* 회사 정보 */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-slate-100 font-bold text-lg">U</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">Uable Corporation</span>
                <p className="text-sm text-slate-400">혁신적인 디지털 솔루션</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              혁신적인 디지털 솔루션을 제공하여 비즈니스의 성장을 돕습니다. 
              최신 기술과 창의적인 디자인으로 고객의 비전을 현실로 만듭니다.
            </p>
            
            {/* 연락처 정보 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-300 hover:text-slate-100 transition-colors group">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-600/20 to-slate-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span>admin@uable.co.kr</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 hover:text-slate-100 transition-colors group">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-500/20 to-slate-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <span>010-8983-6637</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 hover:text-slate-100 transition-colors group">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-500/20 to-slate-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>서울 강남구 언주로97길 7 5F</span>
              </div>
            </div>
          </div>

          {/* 링크 섹션 */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-slate-100">회사</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-slate-100 transition-colors relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-slate-100">서비스</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-slate-100 transition-colors relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

                     <div>
             <h3 className="text-lg font-semibold mb-6 text-slate-100">리소스</h3>
             <ul className="space-y-3">
               {footerLinks.resources.map((link) => (
                 <li key={link.href}>
                   <Link
                     href={link.href}
                     className="text-slate-300 hover:text-slate-100 transition-colors relative group"
                   >
                     <span className="relative">
                       {link.label}
                       <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 transition-all duration-300 group-hover:w-full"></span>
                     </span>
                   </Link>
                 </li>
               ))}
             </ul>
           </div>

           <div>
             <h3 className="text-lg font-semibold mb-6 text-slate-100">지원</h3>
             <ul className="space-y-3">
               {footerLinks.support.map((link) => (
                 <li key={link.href}>
                   <Link
                     href={link.href}
                     className="text-slate-300 hover:text-slate-100 transition-colors relative group"
                   >
                     <span className="relative">
                       {link.label}
                       <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 transition-all duration-300 group-hover:w-full"></span>
                     </span>
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
        </div>

        {/* 하단 섹션 */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 Uable Corporation. All rights reserved.
            </p>
            
            {/* 소셜 링크 */}
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-slate-400 hover:text-slate-100 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 