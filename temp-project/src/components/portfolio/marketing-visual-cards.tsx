'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/primitives/Card'
import { Badge } from '@/components/primitives/Badge'
import { CheckCircle, Target, Zap, TrendingUp } from 'lucide-react'

interface MarketingVisualCardsProps {
  challenges: string[]
  solutions: string[]
}

// 텍스트에서 키워드와 임팩트 추출하는 헬퍼 함수
function extractKeyword(text: string): string {
  // 핵심 키워드를 간단히 추출 (첫 번째 문장의 주요 키워드)
  const keywords = text.split(' ').slice(0, 4).join(' ')
  return keywords.length > 30 ? keywords.substring(0, 30) + '...' : keywords
}

function calculateImpactLevel(text: string, index: number): number {
  // 텍스트 길이와 키워드를 기반으로 임팩트 레벨 계산 (일관성 있게)
  const impactWords = ['혁신', '뛰어', '최고', '완벽', '획기적', '차별', '독창', '실시간', '360도', '원클릭']
  const hasImpact = impactWords.some(word => text.includes(word))
  const textLength = text.length
  
  // 일관된 값 생성 (서버와 클라이언트 동일)
  const baseScore = hasImpact ? 85 : 75
  const lengthBonus = Math.min(textLength / 10, 15) // 텍스트 길이 보너스
  const indexVariation = (index * 3) % 8 // 인덱스 기반 변형
  
  return Math.round(baseScore + lengthBonus + indexVariation)
}

export function MarketingVisualCards({ challenges, solutions }: MarketingVisualCardsProps) {
  if (!challenges?.length && !solutions?.length) return null

  return (
    <div className="space-y-12">
      
      {/* 해결한 과제들 - 카드 형태 */}
      {challenges?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <Target className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">해결한 핵심 과제</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">고객이 직면한 주요 문제점들</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="p-4 h-full border-red-100 dark:border-red-900/20 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Badge variant="error" className="text-xs px-2 py-1">
                        과제 {index + 1}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2 text-sm leading-tight">
                        {extractKeyword(challenge)}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {challenge}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 구현한 솔루션 - 프로그레스 + 카드 */}
      {solutions?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">혁신적 솔루션</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">차별화된 해결방안과 성과</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {solutions.map((solution, index) => {
              const impactLevel = calculateImpactLevel(solution, index)
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <Card className="p-5 border-green-100 dark:border-green-900/20 hover:shadow-md transition-all">
                    <div className="space-y-3">
                      {/* 솔루션 헤더 */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-1">
                            <Zap className="w-3 h-3 mr-1" />
                            솔루션 {index + 1}
                          </Badge>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm leading-tight flex-1">
                            {extractKeyword(solution)}
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            {Math.round(impactLevel)}%
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">효과</div>
                        </div>
                      </div>
                      
                      {/* 프로그레스 바 */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                          <span>구현도</span>
                          <span>{Math.round(impactLevel)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${impactLevel}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: index * 0.2, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                      
                      {/* 솔루션 설명 */}
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                        {solution}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
      
    </div>
  )
}