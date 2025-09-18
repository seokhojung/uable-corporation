'use client'

import { Container } from '@/components/ui/container'
import { useTheme } from '@/contexts/ThemeContext'

export default function PrivacyPolicyPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${
      theme === 'light' ? 'bg-white' :
      theme === 'dark' ? 'bg-slate-900' :
      theme === 'brand' ? 'bg-custom-bg-100' :
      'bg-white'
    }`}>
      <Container>
        <div className="py-12 max-w-4xl mx-auto">
          {/* 제목 */}
          <div className="mb-12 text-center">
            <h1 className={`text-3xl font-bold mb-4 ${
              theme === 'light' ? 'text-gray-900' :
              theme === 'dark' ? 'text-slate-100' :
              theme === 'brand' ? 'text-custom-text-100' :
              'text-gray-900'
            }`}>
              개인정보처리방침
            </h1>
            <p className={`${
              theme === 'light' ? 'text-gray-600' :
              theme === 'dark' ? 'text-slate-300' :
              theme === 'brand' ? 'text-custom-text-200' :
              'text-gray-600'
            }`}>
              시행일자: 2024년 8월 11일
            </p>
          </div>

          {/* 개인정보처리방침 내용 */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">

              {/* 1. 개인정보의 처리 목적 */}
              <section>
                <h2 className={`text-xl font-semibold mb-4 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  1. 개인정보의 처리 목적
                </h2>
                <p className={`mb-3 ${
                  theme === 'light' ? 'text-gray-700' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-700'
                }`}>
                  Uable Corporation은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                </p>
                <ul className={`list-disc pl-6 space-y-2 ${
                  theme === 'light' ? 'text-gray-700' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-700'
                }`}>
                  <li>홈페이지 회원가입 및 관리</li>
                  <li>재화 또는 서비스 제공</li>
                  <li>고충처리</li>
                  <li>마케팅 및 광고에의 활용</li>
                </ul>
              </section>

              {/* 2. 개인정보의 처리 및 보유기간 */}
              <section>
                <h2 className={`text-xl font-semibold mb-4 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  2. 개인정보의 처리 및 보유기간
                </h2>
                <p className={`mb-3 ${
                  theme === 'light' ? 'text-gray-700' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-700'
                }`}>
                  Uable Corporation은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                </p>
                <ul className={`list-disc pl-6 space-y-2 ${
                  theme === 'light' ? 'text-gray-700' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-700'
                }`}>
                  <li>홈페이지 회원가입 및 관리: 서비스 이용계약 또는 회원가입 해지시까지</li>
                  <li>재화 또는 서비스 제공: 재화·서비스 공급완료 및 요금결제·정산 완료시까지</li>
                  <li>고충처리: 목적 달성시까지</li>
                  <li>마케팅 및 광고에의 활용: 6개월</li>
                </ul>
              </section>

              {/* 3. 개인정보의 제3자 제공 */}
              <section>
                <h2 className={`text-xl font-semibold mb-4 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  3. 개인정보의 제3자 제공
                </h2>
                <p className={`mb-3 ${
                  theme === 'light' ? 'text-gray-700' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-700'
                }`}>
                  Uable Corporation은 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                </p>
              </section>

              {/* 4. 개인정보처리의 위탁 */}
              <section>
                <h2 className={`text-xl font-semibold mb-4 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  4. 개인정보처리의 위탁
                </h2>
                <p className={`mb-3 ${
                  theme === 'light' ? 'text-gray-700' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-700'
                }`}>
                  Uable Corporation은 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className={`min-w-full border ${
                    theme === 'light' ? 'border-gray-300' :
                    theme === 'dark' ? 'border-slate-600' :
                    theme === 'brand' ? 'border-primary-100/30' :
                    'border-gray-300'
                  }`}>
                    <thead>
                      <tr className={`${
                        theme === 'light' ? 'bg-gray-100' :
                        theme === 'dark' ? 'bg-slate-800' :
                        theme === 'brand' ? 'bg-custom-bg-200' :
                        'bg-gray-100'
                      }`}>
                        <th className={`border px-4 py-2 text-left text-sm font-medium ${
                          theme === 'light' ? 'border-gray-300 text-gray-900' :
                          theme === 'dark' ? 'border-slate-600 text-slate-100' :
                          theme === 'brand' ? 'border-primary-100/30 text-custom-text-100' :
                          'border-gray-300 text-gray-900'
                        }`}>위탁받는 자 (수탁자)</th>
                        <th className={`border px-4 py-2 text-left text-sm font-medium ${
                          theme === 'light' ? 'border-gray-300 text-gray-900' :
                          theme === 'dark' ? 'border-slate-600 text-slate-100' :
                          theme === 'brand' ? 'border-primary-100/30 text-custom-text-100' :
                          'border-gray-300 text-gray-900'
                        }`}>위탁하는 업무의 내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={`border px-4 py-2 text-sm ${
                          theme === 'light' ? 'border-gray-300 text-gray-700' :
                          theme === 'dark' ? 'border-slate-600 text-slate-300' :
                          theme === 'brand' ? 'border-primary-100/30 text-custom-text-200' :
                          'border-gray-300 text-gray-700'
                        }`}>Formspree</td>
                        <td className={`border px-4 py-2 text-sm ${
                          theme === 'light' ? 'border-gray-300 text-gray-700' :
                          theme === 'dark' ? 'border-slate-600 text-slate-300' :
                          theme === 'brand' ? 'border-primary-100/30 text-custom-text-200' :
                          'border-gray-300 text-gray-700'
                        }`}>이메일 전송 서비스</td>
                      </tr>
                      <tr>
                        <td className={`border px-4 py-2 text-sm ${
                          theme === 'light' ? 'border-gray-300 text-gray-700' :
                          theme === 'dark' ? 'border-slate-600 text-slate-300' :
                          theme === 'brand' ? 'border-primary-100/30 text-custom-text-200' :
                          'border-gray-300 text-gray-700'
                        }`}>Vercel</td>
                        <td className={`border px-4 py-2 text-sm ${
                          theme === 'light' ? 'border-gray-300 text-gray-700' :
                          theme === 'dark' ? 'border-slate-600 text-slate-300' :
                          theme === 'brand' ? 'border-primary-100/30 text-custom-text-200' :
                          'border-gray-300 text-gray-700'
                        }`}>웹사이트 호스팅 서비스</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 나머지 섹션들... */}
              <section>
                <h2 className={`text-xl font-semibold mb-4 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  5. 정보주체의 권리·의무 및 그 행사방법
                </h2>
                <p className={`mb-3 ${
                  theme === 'light' ? 'text-gray-700' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-700'
                }`}>
                  정보주체는 Uable Corporation에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                </p>
                <ul className={`list-disc pl-6 space-y-2 ${
                  theme === 'light' ? 'text-gray-700' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-700'
                }`}>
                  <li>개인정보 열람요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제요구</li>
                  <li>처리정지 요구</li>
                </ul>
              </section>

              {/* 개인정보 보호책임자 */}
              <section>
                <h2 className={`text-xl font-semibold mb-4 ${
                  theme === 'light' ? 'text-gray-900' :
                  theme === 'dark' ? 'text-slate-100' :
                  theme === 'brand' ? 'text-custom-text-100' :
                  'text-gray-900'
                }`}>
                  9. 개인정보 보호책임자
                </h2>
                <p className={`mb-3 ${
                  theme === 'light' ? 'text-gray-700' :
                  theme === 'dark' ? 'text-slate-300' :
                  theme === 'brand' ? 'text-custom-text-200' :
                  'text-gray-700'
                }`}>
                  Uable Corporation은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                </p>
                <div className={`p-4 rounded-lg border ${
                  theme === 'light' ? 'bg-gray-50 border-gray-200' :
                  theme === 'dark' ? 'bg-slate-800 border-slate-600' :
                  theme === 'brand' ? 'bg-custom-bg-200 border-primary-100/20' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`mb-2 ${
                    theme === 'light' ? 'text-gray-900' :
                    theme === 'dark' ? 'text-slate-100' :
                    theme === 'brand' ? 'text-custom-text-100' :
                    'text-gray-900'
                  }`}>
                    <strong>개인정보 보호책임자</strong>
                  </p>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-700' :
                    theme === 'dark' ? 'text-slate-300' :
                    theme === 'brand' ? 'text-custom-text-200' :
                    'text-gray-700'
                  }`}>
                    성명: [이진수]<br/>
                    직책: [대표]<br/>
                    연락처: admin@uable.co.kr
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* 문의 정보 */}
          <div className={`mt-12 p-6 rounded-lg border ${
            theme === 'light' ? 'bg-gray-50 border-gray-200' :
            theme === 'dark' ? 'bg-slate-800 border-slate-600' :
            theme === 'brand' ? 'bg-custom-bg-200 border-primary-100/20' :
            'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'light' ? 'text-gray-900' :
              theme === 'dark' ? 'text-slate-100' :
              theme === 'brand' ? 'text-custom-text-100' :
              'text-gray-900'
            }`}>
              개인정보 처리방침에 대한 문의
            </h3>
            <p className={`mb-4 ${
              theme === 'light' ? 'text-gray-700' :
              theme === 'dark' ? 'text-slate-300' :
              theme === 'brand' ? 'text-custom-text-200' :
              'text-gray-700'
            }`}>
              개인정보 처리방침에 관한 문의사항이 있으시면 아래로 연락주시기 바랍니다.
            </p>
            <div className={`text-sm ${
              theme === 'light' ? 'text-gray-600' :
              theme === 'dark' ? 'text-slate-400' :
              theme === 'brand' ? 'text-custom-text-300' :
              'text-gray-600'
            }`}>
              <p>이메일: admin@uable.co.kr</p>
              <p>전화: 02-557-6637</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}