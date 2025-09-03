# 🔍 구글 & 네이버 검색 노출 가이드

## 📋 즉시 해야 할 작업 체크리스트

### 1️⃣ Google Search Console 등록
- [x] 메타태그 인증 코드 설정 완료
- [ ] **사이트 등록**: https://search.google.com/search-console
- [ ] **사이트맵 제출**: `https://uable.co.kr/sitemap.xml`
- [ ] **robots.txt 확인**: `https://uable.co.kr/robots.txt`
- [ ] **색인 요청**: 주요 페이지 수동 색인 요청

### 2️⃣ 네이버 서치어드바이저 등록
- [ ] **사이트 등록**: https://searchadvisor.naver.com
- [ ] **소유권 확인**: HTML 태그 방식 선택
- [ ] **인증 코드 받기**: 네이버에서 제공하는 코드를 받아서 layout.tsx 수정
- [ ] **사이트맵 제출**: `https://uable.co.kr/sitemap.xml`
- [ ] **RSS 제출**: (블로그가 있을 경우)
- [ ] **웹마스터 도구 연동**

### 3️⃣ 네이버 전용 메타태그 추가 필요
```typescript
// src/app/layout.tsx의 verification 부분 수정
verification: {
  google: 'ZCH8fsrJ7tFRjaU10ACWwONt1JWELsc3751Pmsv8V-c',
  other: {
    'naver-site-verification': '실제_네이버_인증_코드_입력', // 이 부분 수정 필요!
  },
}
```

---

## 🚀 검색 노출 개선 전략

### 구글 최적화
1. **Core Web Vitals 개선**
   - LCP (Largest Contentful Paint): 2.5초 이내
   - FID (First Input Delay): 100ms 이내
   - CLS (Cumulative Layout Shift): 0.1 이하

2. **백링크 구축**
   - GitHub 프로젝트에 웹사이트 링크
   - LinkedIn 회사 페이지에 링크
   - 관련 디렉토리 사이트 등록

3. **콘텐츠 업데이트**
   - 블로그 섹션 추가 고려
   - 포트폴리오 정기 업데이트
   - FAQ 페이지 추가

### 네이버 최적화
1. **네이버 전용 태그**
   ```html
   <meta name="naver-site-verification" content="인증코드" />
   <meta property="naver:site:name" content="Uable Corporation" />
   <meta property="naver:site:type" content="website" />
   ```

2. **네이버 블로그/포스트**
   - 회사 네이버 블로그 개설
   - 포트폴리오 소개 글 작성
   - 웹사이트 링크 포함

3. **네이버 플레이스**
   - 네이버 지도에 회사 등록
   - 웹사이트 URL 연동

---

## 📊 모니터링 및 분석

### 설치 권장 도구
1. **Google Analytics 4**
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```

2. **네이버 애널리틱스**
   ```html
   <script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
   ```

### 주기적 확인 사항
- [ ] 주 1회: 색인 상태 확인
- [ ] 월 1회: 검색 순위 확인
- [ ] 월 1회: 크롤링 오류 확인
- [ ] 분기 1회: SEO 감사

---

## 💡 추가 최적화 팁

### 콘텐츠 SEO
1. **키워드 최적화**
   - 타겟 키워드: "3D 솔루션", "AR 개발", "WebXR 제작"
   - 롱테일 키워드: "3D 제품 컨피규레이터 제작", "증강현실 앱 개발 회사"

2. **콘텐츠 구조**
   - H1 태그: 페이지당 1개
   - H2-H3: 논리적 계층 구조
   - 내부 링크: 관련 페이지 연결

3. **이미지 SEO**
   - 파일명: `3d-product-configurator.jpg` (O)
   - Alt 텍스트: "3D 제품 컨피규레이터 예시"
   - 이미지 사이즈: 최적화 필수

### 기술적 SEO
1. **페이지 속도**
   - 이미지 최적화 (WebP 포맷)
   - JavaScript 번들 최소화
   - CDN 활용

2. **모바일 최적화**
   - 반응형 디자인 확인
   - 터치 타겟 크기 (48px 이상)
   - 텍스트 가독성

3. **SSL/보안**
   - HTTPS 필수
   - 보안 헤더 설정

---

## 📝 실행 순서 (Action Items)

### 오늘 당장 해야 할 일
1. **네이버 서치어드바이저 가입 및 사이트 등록**
2. **네이버 인증 코드 받아서 layout.tsx 업데이트**
3. **Google Search Console에서 사이트맵 제출**
4. **네이버 서치어드바이저에서 사이트맵 제출**

### 이번 주 내 완료
5. Google Analytics 4 설치
6. 네이버 애널리틱스 설치
7. 주요 페이지 색인 요청
8. robots.txt 최종 확인

### 이번 달 내 완료
9. 네이버 블로그 개설 및 콘텐츠 작성
10. 백링크 구축 시작
11. FAQ 페이지 추가
12. 블로그 섹션 기획

---

## 🔗 유용한 링크

### 등록 사이트
- [Google Search Console](https://search.google.com/search-console)
- [네이버 서치어드바이저](https://searchadvisor.naver.com)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [다음 검색등록](https://register.search.daum.net/index.daum)

### 검증 도구
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [네이버 웹 표준 검사](https://webmastertool.naver.com/standard/validator)

### 모니터링
- [Google Analytics](https://analytics.google.com)
- [네이버 애널리틱스](https://analytics.naver.com)
- [구글 검색 순위 확인](https://www.google.com/search?q=site:uable.co.kr)

---

## ⚠️ 주의사항

1. **인증 코드 보안**: 네이버/구글 인증 코드는 외부에 노출되지 않도록 주의
2. **사이트맵 업데이트**: 새 페이지 추가시 사이트맵 업데이트 필수
3. **중복 콘텐츠 방지**: canonical URL 설정 확인
4. **크롤링 제한**: robots.txt에서 admin, api 경로 차단 확인

---

*작성일: 2025년 9월 2일*