'use client';
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import Hyundai from "@/assets/images/logo/logo-hyundai.png";
import Back from "@/assets/images/icon-arrow-white.png";
import React from "react";
import PhoneVerification from "@/features/contents/phone-certification"

export default function Page() {
    const router = useRouter();
    const pathname = usePathname();

    // 인증 성공 시 호출될 함수
    const handleVerificationSuccess = (phoneNumber: string) => {
        console.log("인증 성공: " + phoneNumber);
        // 보험심사 신청 페이지로 이동
        router.push(`/${pathname.split("/")[1]}/form?phone=${phoneNumber}`);
    };

    return (
        <div>
            <header className="header">
                <Image src={Back} alt="뒤로가기" width={20} height={20} className="icon-back" onClick={() => router.back()}/>
                <Image src={Hyundai} alt="현대해상로고" width={200} height={100} className={'logo-main'}/>
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