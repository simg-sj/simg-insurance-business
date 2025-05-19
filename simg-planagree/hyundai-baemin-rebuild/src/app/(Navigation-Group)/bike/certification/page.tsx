'use client';
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import Hyundai from "@/assets/images/logo/logo-hyundai.png";
import Back from "@/assets/images/icon-arrow-white.png";
import React from "react";
import PhoneVerification from "@/features/contents/phone-certification"
import {config} from "@/config";
import { handleRedirectWithParams } from "@/urils/pageRouterUtil"; /* 페이지 router 처리 유틸 */

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
    //링크이동
    const router = useRouter();
    const pathname = usePathname();

    //테마불러오기
    const insuCompany = searchParams.insuCompany;
    const plfNumber = searchParams.plfNumber;
    const theme = config[insuCompany || 'hyundai'];
    const plfNumberData = theme?.plfNumber?.[plfNumber];
    const plfParCnt = plfNumberData.parameters.parmeterCount; // 파라미터 갯수 확인
    const plfParNames = plfNumberData.parameters.parmeterNames; // 파라미터들 가져오기

    // 파라미터여부에 따라 동적으로 처리
    // 사용 방법 예시: handlerRedirect('agree');
    const handlerRedirect = (dynamicPath:string) => handleRedirectWithParams({
        pathname : pathname,
        dynamicPath: dynamicPath, // 동적 경로 전달
        insuCompany : insuCompany,
        plfNumber : plfNumber,
        plfParCnt : plfParCnt,
        plfParNames : plfParNames,
        searchParams : searchParams,
        router : router, // AppRouterInstance 전달
    });

    // 인증 성공 시 호출될 함수
    const handleVerificationSuccess = (phoneNumber: string) => {
        // console.log("인증 성공: " + phoneNumber);
        // 보험심사 신청 페이지로 이동
        // router.push(`/${pathname.split("/")[1]}/form?insuCompany=${insuCompany}&plfNumber=${plfNumber}&phone=${phoneNumber}`);
        handlerRedirect('form');
    };

    return (
        <div>
            <header className="header">
                <Image src={Back} alt="뒤로가기" width={20} height={20} className="icon-back" onClick={() => router.back()}/>
                <Image src={theme.logo} alt={`${theme.insuCompany} 로고`} width={200} height={100} className={'logo-main'}/>
            </header>

            <section className="section mb-28">
                <div className="text-style1 mb-2">보험심사 신청을 위해</div>
                <div className="text-style1 mb-12">휴대폰인증을 진행해주세요</div>
                {/*휴대폰인증 컴포넌트*/}
                <PhoneVerification onVerificationSuccess={handleVerificationSuccess} />
            </section>
        </div>
    );
}