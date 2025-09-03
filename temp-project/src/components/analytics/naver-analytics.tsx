'use client'

import Script from 'next/script'

export function NaverAnalytics() {
  return (
    <>
      <Script
        src="//wcs.pstatic.net/wcslog.js"
        strategy="afterInteractive"
      />
      <Script id="naver-analytics" strategy="afterInteractive">
        {`
          if(!wcs_add) var wcs_add = {};
          wcs_add["wa"] = "142a386ed14b120";
          if(window.wcs) {
            wcs_do();
          }
        `}
      </Script>
    </>
  )
}