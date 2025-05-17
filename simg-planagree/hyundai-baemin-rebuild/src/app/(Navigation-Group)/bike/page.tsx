'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Delivery from "@/assets/images/icon-delivery.png"
import Accordion from "@/components/ui/accordion";
import PopupSlide from "@/components/ui/popup-slide";
import classNames from "classnames";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { config } from "@/config";

export default function Home({ searchParams }: { searchParams: { [key: string]: string } }) {

    //링크이동
    const router = useRouter();
    const pathname = usePathname();

    //테마불러오기
    const insuCompany = searchParams.insuCompany;
    const theme = config[insuCompany || 'hyundai'];

    // 선택한 plfNumber에 따라 데이터 가져오기
    const params = useSearchParams();
    const plfNumber = params.get("plfNumber"); // SIMG에서 관리하는 플랫폼번호를 파라미터로 받아 세팅
    const selectedPlfNumber = plfNumber;
    // console.log('selectedPlfNumber :', selectedPlfNumber);
    const plfNumberData = theme?.plfNumber?.[selectedPlfNumber];
    console.log(plfNumberData?.title?.main);


    //심사신청 동의여부 팝업
    const [popupOpen, setPopupOpen] = useState(false);
    const handleOpenPopup = () => setPopupOpen(true);
    const handleClosePopup = () => setPopupOpen(false);

    //스크롤시 하단버튼 그림자
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const maxScrollPosition =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            if (scrollPosition > 0 && scrollPosition < maxScrollPosition) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <div>
            <header className={'bg-main-light px-20 py-16 text-white'}>
                <Image src={theme.logo} alt={`${theme.insuCompany} 로고`} width={200} height={100} className={'logo-main'}/>
                <div className={'text-3xl mt-10'}>{theme?.plfNumber?.[selectedPlfNumber]?.title?.main}</div>
                <div className={'text-4xl font-semibold mt-3 break-keep'}>{theme?.plfNumber?.[selectedPlfNumber]?.title.sub}</div>
            </header>
            <section className={'section'}>
                <div className={'icon-img'}>
                    <Image src={theme.motorcycle} alt={`${theme.insuCompany} 오토바이`} width={150} height={100} className={'mr-10'}/>
                    <div className={'bg-gray-100 h-28 w-1'}></div>
                    <div className={'ml-5 w-1/2 ml-5 flex flex-col items-end'}>
                        <div className={'mb-2'}><span className={'text-style1'}>{theme?.plfNumber?.[selectedPlfNumber]?.contents.time}</span> 초과
                            배달해도
                        </div>
                        <div className={'break-keep'}>하루 <span className={'text-style1'}>{theme?.plfNumber?.[selectedPlfNumber]?.contents.priceDay}</span> 고정</div>
                    </div>
                </div>
                <div className={'icon-img mt-10'}>
                    <Image src={Delivery} alt={'배달가방'} width={150} height={100} className={'mr-10'}/>
                    <div className={'bg-gray-100 h-28 w-1'}></div>
                    <div className={'w-1/2 ml-5 flex flex-col items-end'}>
                        <div className={'mb-2 break-keep'}>자유롭게 배달하고</div>
                        <div><span className={'text-style1'}>든든하게</span> 보장받아요!</div>
                    </div>
                </div>
            </section>
            <section className={'section'}>
                <div className={'text-3xl font-semibold text-gray-700'}>가입안내</div>
                <div className={'my-6'}>
                    <div className={'text-4xl font-semibold py-1'}>만 <span className={'text-main'}>{theme?.plfNumber?.[selectedPlfNumber]?.contents.age}</span> 까지,
                    </div>
                    <div className={'text-4xl font-semibold py-1'}>가정용 또는 비운상운송 책임보험</div>
                    <div className={'text-4xl font-semibold py-1'}>가입된 오토바이 대상</div>
                </div>
                <div>
                    <div className={'text-style2'}>* 가입된 오토바이 책임보험의 기명피보험자가 본인인 경우와 운전자로 운행
                        가능한 경우에만 가입 가능합니다
                    </div>
                    <div className={'text-style2'}>* 차량의 가정용 오토바이 책임보험에서 운행할 수 없는 라이더가 운행하다가
                        발생한 사고에 대해서는 보상하지 않습니다.
                    </div>
                </div>
            </section>
            <section className={'section'}>
                <div className={'text-3xl font-semibold text-gray-700'}>보험료</div>
                <div className={'my-6'}>
                    <div className={'text-4xl font-semibold py-1'}>1분당 약 <span className={'text-main'}>{theme?.plfNumber?.[selectedPlfNumber]?.contents.priceMinute}원</span> 씩
                        과금
                    </div>
                    <div className={'text-4xl font-semibold py-1'}>일 5시간 초과시 <span
                        className={'text-main'}>{theme?.plfNumber?.[selectedPlfNumber]?.contents.priceDay}원</span> 고정
                    </div>
                </div>
                <div>
                    <div className={'text-style2'}>* 예시 : 일 4시간 운행시 {theme?.plfNumber?.[selectedPlfNumber]?.contents.priceDay2}원 과금 / 일 8시간 운행시
                        {theme?.plfNumber?.[selectedPlfNumber]?.contents.priceDay}원 과금
                    </div>
                </div>
            </section>
            <section className={'section'}>
                <div className={'text-3xl font-semibold text-gray-700'}>보장내용</div>
                <div className={'my-6 space-y-4'}>
                    <div className={'text-box'}>
                        <div className={'text-box-title'}>대인2 배상</div>
                        <div className={'text-box-contents'}>배달 운행 중 사람을 상대로 배상책임을 지는 경우</div>
                        <div className={'text-box-contents'}>대인1 지원특약 한도 초과분에 대하여 무한보상(단, 오토바이 책임보험 필수)</div>
                    </div>
                    <div className={'text-box'}>
                        <div className={'text-box-title'}>대물배상 (의무보험)</div>
                        <div className={'text-box-contents'}>배달 운행 중 다른 사람의 물건을 상대로 배상책임을 지는 경우</div>
                        <div className={'text-box-contents'}>최대 2천만원 한도</div>
                    </div>
                    <div className={'text-box'}>
                        <div className={'text-box-title'}>대인1 지원 특약</div>
                        <div className={'text-box-contents'}>배달 운행 중 다른 사람을 상대로 배상책임을 지는 경우</div>
                        <div className={'text-box-contents'}>사망 시 최대 1억 5천만원 한도, 부상시 최대 3천만원 한도</div>
                    </div>
                </div>
                <div>
                    <div className={'text-style2'}>* 실제 사고접수 시 책임보험의 용도 변경 및 계약 내용 변경이 있을
                        경우, 보상에 제한이
                        있을 수 있습니다.
                    </div>
                </div>
            </section>
            <section className={'section mb-28'}>
                <div className={'text-3xl font-semibold text-gray-700'}>꼭 읽어주세요!</div>
                <div className={'my-6 space-y-4'}>
                    <Accordion
                        title="심사기준"
                        containerClassName="space-y-4"
                    >
                        <div>
                            - 가입 가능 연령 : 만 {theme?.plfNumber?.[selectedPlfNumber]?.contents.age}<br/>
                            - 렌트카, 화물차, 법인용 차량 : 인수 제한<br/>
                            - 음주 운전, 무면허 운전 경력 : 인수 제한<br/>
                            - 보험 가입 경력과 사고 이력<br/>
                            - 보험 개발원 조회 결과, 피보험 자동차에 책임보험이 가입되지 않는 경우 인수 제한<br/>
                            - 보험 개발원 조회 결과 기타 교통 법규 위반 내역<br/>
                        </div>
                    </Accordion>
                    <Accordion
                        title="보장하지 않는 손해"
                        containerClassName="space-y-4"
                    >
                        <div>
                            - 보험 계약자 또는 기명 피보험자의 고의로 인한 손해<br/>
                            - 무면허 운전으로 인한 손해<br/>
                            - 피보험자로 등록되지 않은 다른 운전자가 배달 업무를 하던 중 발생한 사고로 인한 손해<br/>
                            - 본 오토바이 시간제 보험에 등록된 차량 이외 다른 차량으로 운행하고 발생한 손해<br/>
                            - 차량의 가정용 오토바이 책임보험에서 운행할 수 없는 라이더가 운행하다가 발생한 사고에 대한 손해<br/>
                            - 배달운행시간 이외의 사고<br/>
                            <span className={'ml-2'}>* 배달운행시간 = 배차수락 ~ 전달완료</span>
                        </div>
                    </Accordion>
                    <Accordion
                        title="보험 가입 후 유의사항"
                        containerClassName="space-y-4"
                    >
                        <div>
                            <div className={'font-semibold text-gray-700'}>가입 후 알릴 의무</div>
                            <div className={'mb-3'}>오토바이 및 책임보험 변경이 있을 경우, 반드시 보험사에 알려주세요</div>
                            <div className={'font-semibold text-gray-700'}>기존 커넥터님의 이동수단/보험 변경</div>
                            <div>기존에 배민커넥트에서 다른 수단,보험을 이용하다가 변경하시는 경우, 반드시 <span
                                className={'font-bold'}>배민커넥트 카카오톡 채널</span>에 알려주세요.
                            </div>
                        </div>
                    </Accordion>
                    <Accordion
                        title="심사기준"
                        containerClassName="space-y-4"
                    >
                        <div>
                            <div className={'font-semibold text-gray-700'}>보험 상품 심사 문의는 아래 연락처로 문의해주세요</div>
                            <div>- 대표번호 : 1877-3006</div>
                            <div>- 운영시간 : 평일 오전 9시 ~ 오후 6시</div>
                            <div className={'mt-3 font-normal'}>본 심사는 보험대리점 (주)SIMG에서 (대리점 등록번호 : 2014110098)에서 진행합니다.
                            </div>
                        </div>
                    </Accordion>
                </div>
            </section>
            <footer className={classNames(
                "footer-container transition-shadow duration-300",
                {
                    "drop-shadow-[0_-1px_5px_rgba(0,0,0,0.1)]": isScrolled,
                })}
            >
                <button className={'btn-base btn-gray w-1/3'}
                        onClick = {() => {router.push(`${pathname}/inquiry?insuCompany=${insuCompany}&plfNumber=${plfNumber}`)}}>결과조회</button>
                <button className={'btn-base btn-main w-2/3'}
                        onClick={handleOpenPopup}>보험심사신청
                </button>
            </footer>

            {/*동의 확인 여부 팝업*/}
            <PopupSlide
                isOpen={popupOpen}
                onClose={handleClosePopup}
                buttons={[
                    {
                        label: "동의하지 않습니다",
                        className: "bg-gray-100 text-gray-700",
                        onClick: () => {
                            handleClosePopup();
                        },
                    },
                    {
                        label: "동의합니다",
                        className: "bg-main text-white",
                        onClick: () => {
                            handleClosePopup();
                            router.push(`${pathname}/agree?insuCompany=${insuCompany}&plfNumber=${plfNumber}`)
                        },
                    },
                ]}
            >
                <div className="text-popup mb-4">
                    가입페이지 상 내용을 숙지한 상태에서 심사 신청하는 것에 동의하십니까?
                </div>
                <div className="text-gray-500 text-lg">
                    * 미동의시 보험심사가 불가합니다
                </div>
            </PopupSlide>


        </div>
    );
}
