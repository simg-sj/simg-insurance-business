import React from "react";

export default function ProvisionDetails() {

    return (
        <div className={'my-2'}>
            <div className='flex flex-col mt-4 base_font text-[12px] px-4 space-y-4 bg-white'>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>개인(신용)정보의 제공에 관한사항</p>
                    <p>당사는 「개인정보보호법」 및 「신용정보의 이용 및 보호에 관한 법률」에 따라 귀하의 개인(신용)정보를 다음과 같이 제3자에게 제공하고자 합니다.</p>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>1. 제공받는 자</p>
                    <p>에스아이엠지(보험모집업무/설계지원업무를 위탁받은 자(대리점, 설계사 등)), 신한EZ, 국내 재보험사, 종합신용정보집중기관, 생명ㆍ손해보험협 회,
                        보험요율산출기관(보험개발원),
                        금융거래기관, 코리안크레딧뷰로, 본인인증기관, 의보험 관계 법령의 소관부처 및 그 상ㆍ하급 정 부조직ㆍ공공기관
                    </p>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>2. 제공받는 자의 이용 목적</p>
                    <p>
                        º 에스아이엠지 : 보험계약 상담(보장분석포함), 가입설계, 가입설계지원<br/>
                        º 메리츠화재보험, 국내 재보험사 : 보험계약 인수여부 판단, 계약체결<br/>
                        º 종합신용 보집중기관, 생명ㆍ손해보험협회, 보험요율산출기관(보험개발원), 금융거래기관, 코리안크레딧뷰로, 본인인증기관, 의무보험 관계 법령의 소관부처 및 그 상ㆍ하급
                        정부조직ㆍ공공기관 : 개인(신용)정보 조회, 교통사고ㆍ교통법규위반정보(자동차보험에 한함)
                    </p>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>3. 제공항목</p>
                    <p>
                        º 고유식별정보 : 주민등록번호, 외국인등록번호, 여권번호, 운전면허번호<br/>
                        º 민감정보 : 피보험자의 질병ㆍ상해에 관한 정보* (진료기록, 상병명, 기왕증 등) * 국내 재보험사에게 제공하는 경우에 한함<br/>
                        º 개인(신용)정보<br/>
                        - 일반개인정보 : 성명, 국내거소신고번호, 주소, 유ㆍ무선 전화번호, 상호명, 업종명, 보험가입 의무대상 일련번호<br/>
                        - 신용거래정보 : 보험계약정보 (상품종류, 보험가입금액 등)ㆍ보험금정보 (보험금 지급사유, 지급금액 등) ㆍ계약 전 알릴의무사항 (취미 등)<br/>
                    </p>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>4. 보유 및 이용기간</p>
                    <p>
                        동의일로부터 1년까지
                    </p>
                </div>
            </div>
        </div>
    )
}
