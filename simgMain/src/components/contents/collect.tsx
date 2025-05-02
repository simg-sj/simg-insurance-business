import React from "react";

export default function CollectDetails() {
    return (
        <div className={'my-2'}>
            <div className='flex flex-col mt-4 base_font text-[12px] px-4 space-y-4 bg-white'>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>개인(신용)정보의 수집, 이용에 관한 사항</p>
                    <p>당사는 「개인정보보호법」 및 「신용정보의 이용 및 보호에 관한 법률」에 따라 귀하의 개인(신용)정보를 다음과 같이 수집ㆍ이용하고자 합니다.</p>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>1. 개인(신용)정보의 수집 · 이용 목적</p>
                    <p>º 보험계약 상담, 재무설계서비스, 보험계약 인수여부 판단(건강진단 및 계약 적부조사 포함)• 실손형보험 중복확인 및 정액담보 가입사항 확인을 위한 보험사 가입조회, 보험가입
                        의무대상 확인, 민원 및 분쟁 관련대응, 보험료출수납업무</p>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>2. 수집 · 이용할 항목</p>
                    <p>
                        º 고유식별정보 : 주민등록번호, 외국인등록번호, 여권번호, 운전면허번호<br/>
                        º 민감정보 : 피보험자의 질병ㆍ상해에 관한 정보 (진료기록, 상병명, 기왕증, 흡연여부 등), 교통사고ㆍ교통법규위반정보(자동차보험에 한함)<br/>
                        º 개인(신용)정보<br/>
                        - 일반개인정보 : 성명, CI, 주소, 생년월일, 이메일, 유ㆍ무선 전화번호, 국적, 직업, 운전여부, 주행거리정보, 국내거소신고번호, 외국인체류자격·코드 , 상호명,
                        업종명,
                        보험가입 의무대상 일련번호<br/>
                        - 신용거래정보 : 본인계좌(카드)정보, 보험계약정보 (상품종류, 보험가입금액 등)ㆍ보험금정보 (보험금 지급사유, 지급금액, 사고정보 등), 계약 전 알릴 의무사항 -
                        신용능력정보
                        : 소득 및 신용도 판단 정보</p>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>3. 보유 및 이용 기간</p>
                    <p>º 동의일로부터 1년까지</p>
                </div>
            </div>
        </div>
    )
}
