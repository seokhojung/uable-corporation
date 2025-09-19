'use client'

import { useEffect } from 'react'

interface ClarityProps {
  projectId: string
}

export function ClarityAnalytics({ projectId }: ClarityProps) {
  useEffect(() => {
    // Project ID가 있으면 초기화 (개발/프로덕션 모두)
    if (projectId && typeof window !== 'undefined') {
      // Microsoft Clarity 동적 로딩
      const script = document.createElement('script')
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `
      document.head.appendChild(script)
      console.log('Clarity initialized with project ID:', projectId)
    }
  }, [projectId])

  return null
}