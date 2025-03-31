"use client"

import '@/assets/styles/common.css';
import Team from "@/components/common/teamSlide";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Arrow from "@/assets/images/icon/arrow_icon.png";
import HireForm from "@/components/contents/hireForm";
import FadeInSection from "@/components/common/fadeIn";
import CultureI1 from "@/assets/images/3-1.png";
import CultureI2 from "@/assets/images/3-2.png";
import CultureI3 from "@/assets/images/3-3.png";
import CultureI4 from "@/assets/images/3-4.png";

export default function Page() {

    //팝업
    const [isOpen, setIsOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setScrollPosition(window.scrollY);
        }
    }, []);

    const openModal = () => {
        setIsOpen(true);
        if (typeof window !== "undefined") {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }
    };
    const handleClose = (isApplicationStep: boolean) => {
        if (isApplicationStep) {
            const confirmLeave = window.confirm("작성 중인 내용이 모두 사라집니다. 페이지를 나가시겠습니까?");
            if (confirmLeave) {
                setIsOpen(false);
                document.body.style.removeProperty('overflow');
                document.body.style.removeProperty('position');
                document.body.style.removeProperty('top');
                document.body.style.removeProperty('width');
            }
        } else {
            setIsOpen(false);
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('position');
            document.body.style.removeProperty('top');
            document.body.style.removeProperty('width');
        }
    }

    return (
        <main className={'my-8 mt-[140px]'}>
            {/*S : Section 1 메인소개 */}
            <div className={'my-[150px] px-5 max-w-7xl mx-auto pNone myNone'}>
                <FadeInSection>
                    <div className={'text-4xl font-medium mb-10 mp5 mainText break-keep max-w-96 leading-[50px]'}>
                       공동의 목표를 위해 적극적으로 공유하고 협력합니다
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <Image src={CultureI1} alt={"조직문화이미지1"} width={1240} height={500}
                           className={'rounded-xl fullMainImage ojr'} priority/>
                </FadeInSection>
                <FadeInSection>
                    <div className={'flex flex-col items-end mp5'}>
                        <div className={'mb-3 mt-6 text-right'}>우리가 만들어갈 문화</div>
                        <div className={'text-gray-600 text-right break-keep max-w-[400px]'}>
                            <div>지속가능한 성장을 위해 아낌없이 지원하고 더 나은 발전을 위해 직원의 소리에 귀 기울여 함께 문화를 만들어 나갑니다.</div>
                        </div>
                    </div>
                </FadeInSection>
            </div>
            {/*E : Section 1 메인소개 */}
            {/*S : Section 2 회사문화 */}
            <div className={'my-[150px] px-5 max-w-7xl mx-auto myM'}>
                <FadeInSection>
                    <div className="text-3xl font-medium text-center mb-20">SIMG의 문화는 끊임없이 발전합니다</div>
                </FadeInSection>
                <div className={'flex flex-wrap justify-around'}>
                    <FadeInSection>
                        <div
                            className={'px-14 py-10 shadow-md rounded-lg w-[500px] h-[300px] my-5 flex flex-col justify-between cultureBox'}>
                            <div>
                                <div className="text-3xl font-medium mb-2">우리는 하나의 팀으로</div>
                                <div className="text-3xl font-medium">발전하고 성장합니다</div>
                            </div>
                            <div className={'text-gray-600 mt-14 break-keep max-w-[200px]'}>
                                공동의 목표를 위해 적극적으로 협력, 공유, 소통합니다.
                            </div>
                        </div>
                    </FadeInSection>
                    <FadeInSection yduration={1.5}>
                        <div
                            className={'px-14 py-10 shadow-md rounded-lg w-[500px] h-[300px] my-5 flex flex-col justify-between cultureBox'}>
                            <div>
                                <div className="text-3xl font-medium mb-2">수평적 문화로</div>
                                <div className="text-3xl font-medium">팀의 시야를 넓혀나갑니다</div>
                            </div>
                            <div className={'text-gray-600 mt-14 break-keep max-w-[360px]'}>
                                가치없는 의견은 없다고 생각합니다. 좋은 의견이 있다면, 주저하지 말고 먼저 의견을 제시해주세요.
                            </div>
                        </div>
                    </FadeInSection>
                    <FadeInSection>
                        <div
                            className={'px-14 py-10 shadow-md rounded-lg w-[500px] h-[300px] my-5 flex flex-col justify-between cultureBox'}>
                            <div>
                                <div className="text-3xl font-medium mb-2">빠르게 실행하고 해결하여</div>
                                <div className="text-3xl font-medium">목표를 향해 달려갑니다</div>
                            </div>
                            <div className={'text-gray-600 mt-14 break-keep max-w-[360px]'}>
                                빠른 실행과 올바른 해결책을 중심으로
                                신뢰를 얻어 성공이라는 목표를 향해
                                빠르게 달려갑니다.
                            </div>
                        </div>
                    </FadeInSection>
                    <FadeInSection yduration={1.5}>
                        <div
                            className={'px-14 py-10 shadow-md rounded-lg w-[500px] h-[300px] my-5 flex flex-col justify-between cultureBox'}>
                            <div>
                                <div className="text-3xl font-medium mb-2">모두를 위해 업무를</div>
                                <div className="text-3xl font-medium">기록하고 공유합니다.</div>
                            </div>
                            <div className={'text-gray-600 mt-14 break-keep max-w-[360px]'}>
                                쉽게 이해하고 적용할 수 있도록
                                시스템을 구축하여 최소한의 업무를
                                실행하며 기록하고 공유합니다.
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </div>
            {/*E : Section 2 회사문화 */}
            {/*S : Section 3 지원 */}
            <div className="my-[100px] py-[70px] bg-gray-50">
                <div className="mx-auto px-5 max-w-7xl pNone">
                    <FadeInSection>
                        <div className="text-3xl font-medium text-center mb-20 mp5">
                            <div className={'mb-2'}>함께하는 성장을 위해</div>
                            <div>아낌없이 지원합니다</div>
                        </div>
                    </FadeInSection>
                    <div className={'flex justify-between items-start max-w-[900px] mx-auto flexCol4'}>
                        <Image src={CultureI2} alt={"조직문화이미지2"} width={300} height={320}
                               className={'rounded-xl fullImage'} loading="lazy"/>
                        <div className={'ml-5 mp5'}>
                            <FadeInSection>
                                <div className={'text-3xl font-medium'}>
                                    <div>업무와 성장에 몰두할 수 있게</div>
                                </div>
                            </FadeInSection>
                            <FadeInSection>
                                <div className={'mb-3 mt-14'}>주 4일제 운영</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-72'}>주 1회 특별휴가를 지급하여 주 4일제를
                                    시행합니다. 여유로운 환경에서 자기개발에 투자하고 성장합니다.
                                </div>
                            </FadeInSection>
                            <FadeInSection>
                                <div className={'mb-3 mt-7'}>여유로운 점심시간</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-72'}>1시간 30분의 여유로운 점심시간을 즐기고 오후
                                    업무를 느긋하게 준비해요.
                                </div>
                            </FadeInSection>
                            <FadeInSection>
                                <div className={'mb-3 mt-7'}>워라밸 문화</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-72'}>회식이나 야근 강요 없이 내 일을 마쳤다면
                                    퇴근하는 워라벨 문화를 존중해요.
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                    <div className={'flex justify-between max-w-[900px] mx-auto mt-24 flexCol5'}>
                        <FadeInSection>
                            <div className={'text-3xl font-medium break-keep max-w-[200px] leading-10 mp5 mr-5'}>발전을 위한 환경을
                                만들어 나갑니다
                            </div>
                        </FadeInSection>
                        <div className={'flex'}>
                            <FadeInSection yduration={1.5}>
                                <Image src={CultureI3} alt={"조직문화이미지3"} width={300} height={320}
                                       className={'rounded-xl mr-5 fullImage'} loading="lazy"/>
                            </FadeInSection>
                            <FadeInSection yduration={1.8}>
                                <Image src={CultureI4} alt={"조직문화이미지4"} width={300} height={320}
                                       className={'rounded-xl ml-5 hiddenImage'} loading="lazy"/>
                            </FadeInSection>
                        </div>
                    </div>
                    <div className={'flex justify-between max-w-[900px] mx-auto mp5 flexCol6'}>
                        <div className={'mr-5'}>
                            <FadeInSection>
                                <div className={'mb-3 mt-14'}>반차제도</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-96'}>연차 뿐만 아니라 반차로 휴가 사용이 가능해요.
                                    병원이나 은행방문 등 필요한 업무가 있다면 자유롭게 사용해요.
                                </div>
                            </FadeInSection>
                            <FadeInSection yduration={1.2}>
                                <div className={'mb-3 mt-7'}>자유로운 복장</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-96'}>복장규정 없이 편안한 복장으로 근무해요.
                                </div>
                            </FadeInSection>
                            <FadeInSection yduration={1.4}>
                                <div className={'mb-3 mt-7'}>다양한 스낵과 음료</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-96'}>열심히 일하다 당이 떨어진 직원들을 위해 매주
                                    다양한 간식과 음료들을 제공해요.
                                </div>
                            </FadeInSection>
                            <FadeInSection yduration={1.6}>
                                <div className={'mb-3 mt-7'}>내일채움공제 지원</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-96'}>내일채움공제 조건에 해당되는 구성원이라면
                                    누구든지 신청할 수 있어요. 주저하지 말고 신청해 주세요.
                                </div>
                            </FadeInSection>
                            <FadeInSection yduration={1.8}>
                                <div className={'mb-3 mt-7'}>자기계발비 지원</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-96'}>업무 관련으로 듣고 싶은 교육이 있다면 주저하지말고 신청해주세요. 교육 플랫폼을 통해 온라인 강의를 지원해드려요.
                                </div>
                            </FadeInSection>
                        </div>
                        <div>
                            <FadeInSection yduration={1.1}>
                                <div className={'mb-3 mt-14'}>근로자 휴가지원사업</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-96'}>휴가 문화 활성화와 복지 증진을 위해 여행경비를 적립하면 회사와 정부가 함께 휴가비를 지원해 드려요.
                                </div>
                            </FadeInSection>
                            <FadeInSection yduration={1.3}>
                                <div className={'mb-3 mt-7'}>생일축하선물</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-96'}>생일에는 본인이 원하는 선물을 골라 받을 수 있어서 쏠쏠한 재미가 있답니다.
                                </div>
                            </FadeInSection>
                            <FadeInSection yduration={1.5}>
                                <div className={'mb-3 mt-7'}>도서구입비 지원</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-96'}>매월 도서신청기간에 희망도서를 무제한으로 지원하니 읽고 싶었던 책이 있다면 신청해주세요.
                                </div>
                            </FadeInSection>
                            <FadeInSection yduration={1.7}>
                                <div className={'mb-3 mt-7'}>업무 장비 제공</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-96'}>일에 몰두할 수 있도록 노트북, 듀얼모니터 등
                                    업무에 필요한 장비들을 적극적으로 지원해요.
                                </div>
                            </FadeInSection>
                            <FadeInSection yduration={1.9}>
                                <div className={'mb-3 mt-7'}>경조사비 및 경조휴가 제공</div>
                                <div className={'text-gray-600 break-keep min-w-60 max-w-96'}>경조사가 발생했을 경우에 경조휴가 및 경조금을 지원해 드려요.
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                </div>
            </div>

            {/*E : Section 3 지원 */}
            {/*S : Section 4 팀소개 */}
            <div className={'my-[150px] px-5 max-w-7xl mx-auto myM'}>
                <FadeInSection>
                    <div className="text-3xl font-medium text-center mb-20">우리팀은 이렇게 일합니다</div>
                </FadeInSection>
                <Team/>
            </div>
            {/*E : Section 4 팀소개 */}
            {/*S : Section 5 인재풀등록 */}
            <div className="my-[100px] py-[70px] bg-gray-50">
                <div className="mx-auto px-5 max-w-7xl">
                    <FadeInSection>
                        <div className="text-3xl font-medium text-center break-keep">
                            공동의 목표를 향해 성장할 당신을 기다립니다
                        </div>
                    </FadeInSection>
                    <FadeInSection>
                        <div className={'text-gray-600 flex justify-center mt-20 text-lg w-full'}>
                            <div className={'break-keep max-w-[900px] text-center'}>
                            지원하고자 하는 직무에서 현재 진행 중인 채용공고가 없는 경우, 인재풀에 등록해 주세요.
                      인재풀에 등록된 지원서는 채용 수요가 있을 때 우선적으로 검토되며, 직무 적합성이 확인된 분에게 개별 연락 드린 후 채용 절차가 진행됩니다.
                            </div>
                        </div>
                        <div className={'flex items-center mt-8 justify-center cursor-pointer hover:font-medium'}
                             onClick={openModal}>
                            <div className={'mr-3'}>인재풀 등록하기</div>
                            <Image src={Arrow} alt={'자세히보기'} width={22} height={22}/>
                        </div>
                    </FadeInSection>
                </div>
            </div>
            {/*E : Section 5 인재풀등록 */}
            {/*인재풀 등록 팝업*/}
            {isOpen && (
                <>
                    <div
                        className={'bg-black bg-opacity-50 w-dvw h-dvh fixed left-0 top-0 z-40'}
                        onClick={(e) => {
                            const hireForm = document.querySelector('.hire-form');
                            const isApplicationStep = hireForm?.getAttribute('data-step') === 'application';
                            handleClose(isApplicationStep);
                        }}
                    ></div>
                    <div
                        className={'popup fixed bg-white rounded-t-2xl bottom-0 left-0 right-0 max-w-7xl h-[85%] py-10 px-[70px] mx-auto overflow-y-auto z-50'}>
                        <div className={'flex justify-end mb-5'}>
                            <div>
                                <div
                                    onClick={(e) => {
                                        const hireForm = document.querySelector('.hire-form');
                                        const isApplicationStep = hireForm?.getAttribute('data-step') === 'application';
                                        handleClose(isApplicationStep);
                                    }}
                                    className={'cursor-pointer text-3xl text-gray-600 hover:text-gray-800'}
                                >
                                    &#215;
                                </div>
                            </div>
                        </div>
                        <HireForm/>
                    </div>
                </>
            )}
        </main>
    )
};