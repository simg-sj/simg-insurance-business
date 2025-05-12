import React from "react";

export default function MarketingDetails() {

    return (
        <div className={'my-2'}>
            <div className='flex flex-col mt-4 base_font text-[12px] px-4 space-y-4 bg-white'>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>마케팅 활용 동의에 관한 사항</p>
                    <p>º 회사는 원활하고 향상된 서비스를 제공하기 위해 개인정보 처리를 타인에게 위탁할 수 있습니다. 이에 회사는 사전에 각 사항 모두를 이용자에게 알리고 동의를 받습니다.
                        이용자는 개인(신용)정보의 선택적인 수집 및 이용, 제공에 대한 동의를 거부할 수 있습니다.<br/><br/>
                        다만, 동의하지 않는 경우 관련 편의 제공(보험 계약상담 및 상품소개, 재무설계서비스) 안내 등 이용 목적에 따른 혜택에 제한이 있을 수 있습니다. 그 밖에 계약과 관련된
                        불이익은 없습니다. 동의한 경우에도 귀하는 동의를 철회하거나 마케팅 목적으로 귀하에게 연락하는 것을 중지하도록 요청할 수 있습니다.</p>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>1. 제공 목적</p>
                    <p>º 이용자에 대한 편의 제공, 본 서비스에 대한 보험 계약상담 및 상품소개, 재무설계서비스, 보험계약 인수여부 판단 등의 목적으로 수집ㆍ이용<br/>
                        º 제휴사에서 운영하는 서비스의 원활한 이용과 마케팅 활용 목적으로 수집ㆍ이용<br/>
                    </p>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>2. 제공 항목</p>
                    <p>
                        º 개인식별정보 : 성명, 주민등록번호, 외국인등록번호, 여권번호, 유무선 전화번호
                    </p>
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold text-[14px]'>3. 보유 및 이용기간</p>
                    <p>동의일로부터 회원 탈퇴 혹은 마케팅 동의 해제 시까지 보유·이용.<br/>
                        단, 관련 법령의 규정에 따라 보존할 필요가 있는 경우, 해당 기간까지 보존함.</p>
                </div>
            </div>
        </div>
    )
}
