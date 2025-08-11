import { Metadata } from 'next'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: '개인정보처리방침 | Uable Corporation',
  description: 'Uable Corporation의 개인정보 수집, 이용, 보관 및 파기에 관한 정책입니다.',
  keywords: '개인정보처리방침, 개인정보보호, Uable, 프라이버시',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Container>
        <div className="py-12 max-w-4xl mx-auto">
          {/* 제목 */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-slate-100 mb-4">
              개인정보처리방침
            </h1>
            <p className="text-slate-300">
              시행일자: 2024년 8월 11일
            </p>
          </div>

          {/* 개인정보처리방침 내용 */}
          <div className="prose prose-lg max-w-none prose-invert">
            <div className="space-y-8">
              
              {/* 1. 개인정보의 처리 목적 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  1. 개인정보의 처리 목적
                </h2>
                <p className="text-slate-300 mb-3">
                  Uable Corporation은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                </p>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>홈페이지 회원가입 및 관리</li>
                  <li>재화 또는 서비스 제공</li>
                  <li>고충처리</li>
                  <li>마케팅 및 광고에의 활용</li>
                </ul>
              </section>

              {/* 2. 개인정보의 처리 및 보유기간 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  2. 개인정보의 처리 및 보유기간
                </h2>
                <p className="text-slate-300 mb-3">
                  Uable Corporation은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                </p>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>홈페이지 회원가입 및 관리: 서비스 이용계약 또는 회원가입 해지시까지</li>
                  <li>재화 또는 서비스 제공: 재화·서비스 공급완료 및 요금결제·정산 완료시까지</li>
                  <li>고충처리: 목적 달성시까지</li>
                  <li>마케팅 및 광고에의 활용: 6개월</li>
                </ul>
              </section>

              {/* 3. 개인정보의 제3자 제공 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  3. 개인정보의 제3자 제공
                </h2>
                <p className="text-slate-300 mb-3">
                  Uable Corporation은 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                </p>
              </section>

              {/* 4. 개인정보처리의 위탁 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  4. 개인정보처리의 위탁
                </h2>
                <p className="text-slate-300 mb-3">
                  Uable Corporation은 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-slate-600">
                    <thead>
                      <tr className="bg-slate-800">
                        <th className="border border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-100">위탁받는 자 (수탁자)</th>
                        <th className="border border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-100">위탁하는 업무의 내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-600 px-4 py-2 text-sm text-slate-300">Formspree</td>
                        <td className="border border-slate-600 px-4 py-2 text-sm text-slate-300">이메일 전송 서비스</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-600 px-4 py-2 text-sm text-slate-300">Vercel</td>
                        <td className="border border-slate-600 px-4 py-2 text-sm text-slate-300">웹사이트 호스팅 서비스</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 5. 정보주체의 권리·의무 및 그 행사방법 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  5. 정보주체의 권리·의무 및 그 행사방법
                </h2>
                <p className="text-slate-300 mb-3">
                  정보주체는 Uable Corporation에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                </p>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>개인정보 열람요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제요구</li>
                  <li>처리정지 요구</li>
                </ul>
                <p className="text-slate-300 mt-3">
                  제1항에 따른 권리 행사는 Uable Corporation에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 Uable Corporation은 이에 대해 지체 없이 조치하겠습니다.
                </p>
              </section>

              {/* 6. 처리하는 개인정보의 항목 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  6. 처리하는 개인정보의 항목
                </h2>
                <p className="text-slate-300 mb-3">
                  Uable Corporation은 다음의 개인정보 항목을 처리하고 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-slate-600">
                    <thead>
                      <tr className="bg-slate-800">
                        <th className="border border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-100">구분</th>
                        <th className="border border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-100">수집항목</th>
                        <th className="border border-slate-600 px-4 py-2 text-left text-sm font-medium text-slate-100">보유기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-600 px-4 py-2 text-sm text-slate-300">필수항목</td>
                        <td className="border border-slate-600 px-4 py-2 text-sm text-slate-300">이름, 이메일주소, 문의내용</td>
                        <td className="border border-slate-600 px-4 py-2 text-sm text-slate-300">목적 달성시까지</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-600 px-4 py-2 text-sm text-slate-300">선택항목</td>
                        <td className="border border-slate-600 px-4 py-2 text-sm text-slate-300">전화번호, 회사명</td>
                        <td className="border border-slate-600 px-4 py-2 text-sm text-slate-300">목적 달성시까지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 7. 개인정보의 파기 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  7. 개인정보의 파기
                </h2>
                <p className="text-slate-300 mb-3">
                  Uable Corporation은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                </p>
                <p className="text-slate-300 mb-3">
                  전자적 파일 형태의 정보는 기술적 방법을 사용하여 복구 및 재생할 수 없도록 안전하게 삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
                </p>
              </section>

              {/* 8. 개인정보의 안전성 확보 조치 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  8. 개인정보의 안전성 확보 조치
                </h2>
                <p className="text-slate-300 mb-3">
                  Uable Corporation은 개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를 취하고 있습니다.
                </p>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>개인정보의 암호화</li>
                  <li>해킹 등에 대비한 기술적 대책</li>
                  <li>개인정보에 대한 접근 제한</li>
                  <li>개인정보를 취급하는 직원의 최소화 및 교육</li>
                </ul>
              </section>

              {/* 9. 개인정보 보호책임자 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  9. 개인정보 보호책임자
                </h2>
                <p className="text-slate-300 mb-3">
                  Uable Corporation은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                </p>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
                  <p className="text-slate-100 mb-2">
                    <strong>개인정보 보호책임자</strong>
                  </p>
                  <p className="text-slate-300 text-sm">
                    성명: [이진수]<br/>
                    직책: [대표]<br/>
                    연락처: admin@uable.co.kr
                  </p>
                </div>
              </section>

              {/* 10. 개인정보 처리방침 변경 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  10. 개인정보 처리방침 변경
                </h2>
                <p className="text-slate-300 mb-3">
                  이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                </p>
              </section>

              {/* 11. 개인정보의 열람청구를 접수·처리하는 부서 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  11. 개인정보의 열람청구를 접수·처리하는 부서
                </h2>
                <p className="text-slate-300 mb-3">
                  정보주체는 개인정보보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.
                </p>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
                  <p className="text-slate-100 mb-2">
                    <strong>개인정보 열람청구 접수·처리부서</strong>
                  </p>
                  <p className="text-slate-300 text-sm">
                    부서명: [경영부]<br/>
                    담당자: [이진수]<br/>
                    연락처: admin@uable.co.kr
                  </p>
                </div>
              </section>

              {/* 12. 정보주체의 권익침해에 대한 구제방법 */}
              <section>
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  12. 정보주체의 권익침해에 대한 구제방법
                </h2>
                <p className="text-slate-300 mb-3">
                  정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 개인정보보호위원회, 개인정보보호위원회 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.
                </p>
                <p className="text-slate-300 mb-3">
                  이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
                </p>
                <ul className="list-disc pl-6 text-slate-300 space-y-2">
                  <li>개인정보분쟁조정위원회: 1833-6972</li>
                  <li>개인정보보호위원회: 02-2100-2499</li>
                  <li>대검찰청 사이버수사과: 02-3480-3573</li>
                  <li>경찰청 사이버안전국: 182</li>
                </ul>
              </section>
            </div>
          </div>

          {/* 문의 정보 */}
          <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-600">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              개인정보 처리방침에 대한 문의
            </h3>
            <p className="text-slate-300 mb-4">
              개인정보 처리방침에 관한 문의사항이 있으시면 아래로 연락주시기 바랍니다.
            </p>
            <div className="text-sm text-slate-400">
              <p>이메일: admin@uable.co.kr</p>
              <p>전화: 02-557-6637</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
