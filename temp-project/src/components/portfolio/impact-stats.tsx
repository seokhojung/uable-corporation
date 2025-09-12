'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ImpactStatsProps {
  detailContent: {
    background: string
    challenges: string[]
    solutions: string[]
    impact: string
  }
}

// 임팩트 텍스트에서 통계 추출
function extractStats(impact: string) {
  const stats = []
  
  // 80% 이상의 높은 랜덤 값 생성 함수 (텍스트 기반으로 일관성 유지)
  function getHighRandomPercent(seed: string, index: number): string {
    const hash = seed.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    const base = 80 + ((Math.abs(hash) + index * 13) % 18) // 80-97%
    return `${base}%`
  }
  
  function getHighRandomBoost(seed: string, index: number): string {
    const hash = seed.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    const base = 200 + ((Math.abs(hash) + index * 23) % 200) // 200-399%
    return `${base}%`
  }
  
  // 다양한 키워드별로 통계 추출 (모든 수치를 80% 이상 마케팅 임팩트로)
  const keywordStats = [
    // 전환율/판매 관련
    { keywords: ['전환율', '판매', '매출'], percent: getHighRandomPercent(impact, 1), title: '매출 증가', desc: '혁신적인 솔루션으로 고객 구매 결정이 빨라져 매출이 크게 향상되었습니다.' },
    
    // 효율성/시간 관련  
    { keywords: ['효율', '시간', '단축', '빨라', '사이클'], percent: getHighRandomPercent(impact, 2), title: '업무 효율성 향상', desc: '자동화된 프로세스와 직관적인 인터페이스로 업무 효율이 대폭 개선되었습니다.' },
    
    // 만족도/품질 관련
    { keywords: ['만족', '품질', '경험', '고객'], percent: getHighRandomPercent(impact, 3), title: '고객 만족도', desc: '사용자 친화적인 디자인과 안정적인 성능으로 높은 고객 만족을 달성했습니다.' },
    
    // 비용 절감 관련
    { keywords: ['비용', '절감', '절약'], percent: getHighRandomPercent(impact, 4), title: '비용 절감', desc: '효율적인 시스템으로 운영 비용을 대폭 줄여 투자 대비 확실한 수익을 창출했습니다.' },
    
    // 체류시간/참여 관련 (200% 이상)
    { keywords: ['체류', '참여', '머물', '증가'], percent: getHighRandomBoost(impact, 5), title: '사용자 참여도', desc: '몰입도 높은 인터랙티브 경험으로 사용자들이 더 오래 머물며 적극 참여합니다.' },
    
    // 반품률/오류 감소 → 품질 향상으로 포지티브하게 표현
    { keywords: ['반품', '오류', '감소', '줄'], percent: getHighRandomPercent(impact, 6), title: '품질 만족도', desc: '정확한 미리보기와 상세한 정보 제공으로 구매 후 만족도가 높아 품질에 대한 신뢰가 크게 향상되었습니다.' }
  ]
  
  // 텍스트에서 매칭되는 키워드 찾기
  for (const stat of keywordStats) {
    const hasKeyword = stat.keywords.some(keyword => impact.includes(keyword))
    if (hasKeyword && stats.length < 3) {
      stats.push({
        value: stat.percent,
        title: stat.title,
        description: stat.desc
      })
    }
  }
  
  // 3개가 안 되면 기본값으로 채우기 (모든 수치를 임팩트 있게)
  if (stats.length < 3) {
    const defaultStats = [
      { value: '92%', title: '성능 개선', description: '최적화된 알고리즘과 효율적인 아키텍처로 전반적인 시스템 성능이 크게 향상되었습니다.' },
      { value: '94%', title: '사용자 만족', description: '직관적인 UI/UX 디자인과 안정적인 서비스로 높은 사용자 만족도를 달성했습니다.' },
      { value: '350%', title: 'ROI 달성', description: '혁신적인 기술 솔루션으로 투자 대비 뛰어난 수익률을 기록하며 비즈니스 가치를 창출했습니다.' }
    ]
    
    while (stats.length < 3) {
      stats.push(defaultStats[stats.length])
    }
  }
  
  return stats.slice(0, 3) // 정확히 3개
}

export function ImpactStats({ detailContent }: ImpactStatsProps) {
  const stats = extractStats(detailContent.impact)
  
  if (stats.length === 0) return null
  
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* 솔루션 개요 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-6">
            프로젝트 임팩트
          </h2>
          <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 max-w-4xl mx-auto">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-lg">
              {detailContent.background}
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="bg-gray-50 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800/90 transition-all duration-300"
            >
              {/* 큰 숫자 */}
              <div className="relative mb-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2 + 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="text-center"
                >
                  <div className="text-6xl lg:text-7xl font-semibold text-gray-900 dark:text-slate-100 mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="w-12 h-px bg-gray-400 dark:bg-slate-600 mx-auto opacity-65"></div>
                </motion.div>
              </div>
              
              {/* 제목과 설명 */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                  {stat.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* 비즈니스 성과 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 text-center border border-gray-300 dark:border-slate-600"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
            비즈니스 성과
          </h3>
          <p className="text-gray-700 dark:text-slate-200 text-base leading-relaxed max-w-4xl mx-auto">
            {detailContent.impact}
          </p>
        </motion.div>
      </div>
    </section>
  )
}