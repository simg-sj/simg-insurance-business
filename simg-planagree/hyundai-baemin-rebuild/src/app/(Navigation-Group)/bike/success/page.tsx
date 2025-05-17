'use client';
import Image from "next/image";
import React from 'react';
import Back from "@/assets/images/icon-arrow-white.png";
import Hyundai from "@/assets/images/logo/logo-hyundai.png";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {config} from "@/config";

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
    //링크이동
    const router = useRouter();
    const pathname = usePathname();

    //테마불러오기
    const params = useSearchParams();
    const insuCompany = params.get('insuCompany');
    const plfNumber = params.get('plfNumber');
    const theme = config[insuCompany || 'hyundai'];

    return (
        <>
            <div>
                <header className="header">
                    <Image src={Back} alt="뒤로가기" width={20} height={20} className="icon-back" onClick={() => {router.back()}}/>
                    <Image src={theme.logo} alt={`${theme.insuCompany} 로고`} width={200} height={100} className={'logo-main'}/>
                </header>
                <section className="section mb-28">
                    <div className={'flex-center mb-12'}>
                    <div className={'font-semibold text-5xl w-20 h-20 text-center mr-4 mt-0.5 rounded-full bg-main text-white flex-center'}>✓</div>
                    </div>
                    <div className="text-style1 mb-8 text-center">신청해주셔서 감사합니다</div>
                    <div className="text-gray-500 text-xl font-medium mb-2 text-center break-keep">심사 결과는 1~2 영업일 내에 문자로 안내해드리며, <span className={'text-gray-700'}>'심사결과조회'</span> 를 통해 진행상황을 확인하실 수 있습니다.</div>
                    <div className={'mt-20'}>
                        <div className="text-black text-2xl font-medium mb-4">보험 변경사항은 꼭 알려주세요 !</div>
                            <div className={'text-box'}>
                                <div className={'text-box-title'}>이동수단 또는 보험료를 변경한다면 ?</div>
                                <div className={'text-box-contents break-keep'}>기존 커넥터님 중 <span className={'font-semibold'}>이동수단 또는 오토바이 개인유상보험을 변경</span>하시는 경우, 반드시 배민커넥트 카카오톡 채널을 통해 변경을 신청해주세요.</div>
                                <div className={'text-box-title mt-5'}>오토바이와 책임보험을 변경한다면 ?</div>
                                <div className={'text-box-contents break-keep'}>추후 시간제 보험 이용 중에  <span className={'font-semibold'}>오토바이와 책임보험에 변경 사항</span>이 있다면, 반드시 보험사에 알려주세요.</div>
                            </div>
                    </div>
                    <div className={'mt-10'}>
                        <div className="text-black text-2xl font-medium mb-4">보험 상품 및 심사는 여기로 문의해주세요</div>
                        <div className={'text-box'}>
                            <div className={'text-box-title'}>· 대표번호 : 1877 - 3006</div>
                            <div className={'text-box-title'}>· 운영시간 : 평일 오전 9시 ~ 6시</div>
                            <div className={'text-box-contents break-keep'}>본 심사는 보험 대리점 (주)SIMG 에서 심사를 진행합니다.<br/> (보험대리점 등록번호 2014110098)</div>
                        </div>
                    </div>
                </section>
                <footer
                    className=" footer-container">
                    <button className={'btn-base bg-gray-100 text-gray-700 w-1/3'}
                            onClick = {() => {router.push(`/${pathname.split("/")[1]}/inquiry?insuCompany=${insuCompany}`);}}>결과조회</button>
                    <button className={'btn-base bg-main text-white w-2/3'}
                            onClick = {() => {router.push(`/${pathname.split("/")[1]}?insuCompany=${insuCompany}`);}}>확인</button>
                </footer>
            </div>
        </>
    );
}