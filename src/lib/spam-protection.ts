import type { InquiryData } from '@/types/inquiry'

interface SpamCheckData extends InquiryData {
  ipAddress: string
}

interface SpamCheckResult {
  allowed: boolean
  isSpam: boolean
  message?: string
}

// 스팸 키워드 목록
const spamKeywords = [
  'casino', 'viagra', 'loan', 'debt', 'credit', 'money',
  'make money fast', 'earn money', 'work from home',
  'click here', 'buy now', 'limited time', 'act now',
  'free', 'winner', 'prize', 'lottery', 'inheritance'
]

// 스팸 방지 체크 함수
export async function performSpamCheck(data: SpamCheckData): Promise<SpamCheckResult> {
  const content = `${data.subject} ${data.message}`.toLowerCase()
  
  // 스팸 키워드 체크
  const foundSpamKeywords = spamKeywords.filter(keyword => 
    content.includes(keyword.toLowerCase())
  )
  
  if (foundSpamKeywords.length > 0) {
    return {
      allowed: false,
      isSpam: true,
      message: '스팸으로 의심되는 내용이 포함되어 있습니다.'
    }
  }
  
  // 너무 짧은 메시지 체크
  if (data.message.length < 10) {
    return {
      allowed: false,
      isSpam: true,
      message: '메시지가 너무 짧습니다.'
    }
  }
  
  // 너무 긴 메시지 체크
  if (data.message.length > 2000) {
    return {
      allowed: false,
      isSpam: true,
      message: '메시지가 너무 깁니다.'
    }
  }
  
  // 기본적으로 허용
  return {
    allowed: true,
    isSpam: false
  }
} 