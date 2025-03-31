"use client"

import '@/assets/styles/common.css';
import TimeLine from "@/components/common/timeLineSlide";
import React from "react";
import Image from "next/image";
import Kkomobility from "@/assets/images/logo/kakaomobility_logo.png";
import BaeminConnect from "@/assets/images/logo/baeminConnect_logo.png";
import Tmapmobility from "@/assets/images/logo/tmapmobility_logo.png";
import Swing from "@/assets/images/logo/swing_logo.png";
import FadeInSection from "@/components/common/fadeIn";
import AboutI1 from "@/assets/images/2-1.png";
import AboutI2 from "@/assets/images/2-2.png";
import AboutI3 from "@/assets/images/2-4.png";
import AboutI4 from "@/assets/images/2-3.png";

export default function Page() {

    return (
        <main className={'my-8 mt-[140px]'}>
            {/*S : Section 1 메인소개 */}
            <div className={'my-[150px] px-5 pNone max-w-7xl mx-auto myNone'}>
                <FadeInSection>
                    <div className={'text-4xl font-medium mb-10 mp5 mainText break-keep max-w-96 leading-[50px]'}>더 나은 생각과 변화들이 모여 경쟁력을 만들어갑니다
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <Image src={AboutI1} alt={"회사소개이미지1"} width={1240} height={500} className={'rounded-xl fullMainImage ojl'} priority/>
                </FadeInSection>
                <FadeInSection>
                    <div className={'flex flex-col items-end mp5'}>
                        <div className={'mb-3 mt-6 text-right'}>우리가 나아가는 방식</div>
                        <div className={'text-gray-600 text-right break-keep max-w-[400px]'}>생활과 밀접하게 연결된 여러 위험요소에 대비할 수
                            있도록 보험상품의 기획부터 개발까지 모든 것을 제공하며 복잡한 가입절차를 최소화 하여 최고의 효율을
                            창출합니다.
                        </div>
                    </div>
                </FadeInSection>
            </div>
            {/*E : Section 1 메인소개 */}
            {/*S : Section 2 회사가치 */}
            <div className={'my-[150px] px-5 max-w-7xl mx-auto pNone myM'}>
                <FadeInSection>
                    <div className={'flex justify-between flexCol3'}>
                        <Image src={AboutI2} alt={"회사소개이미지2"} width={480} height={230}
                               className={'rounded-xl mr-5 aboutI fullImage'} priority/>
                        <div className={'mp5'}>
                            <div>
                                <div className={'mb-3'}>상품개선</div>
                                <div className={'text-3xl font-medium break-keep max-w-80 min-w-72'}>기존 형성되어 있는 보험도 똑똑하게 효율적으로
                                </div>
                            </div>
                            <div className={'text-gray-600 mt-14 break-keep max-w-96 mtM'}>
                                새로운 보험상품 뿐 아니라 기존의 보험상품을 개선하고 서비스 효율성을 제고합니다.
                            </div>
                        </div>
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <div className={'flex justify-between mt-10 flexCol3'}>
                        <Image src={AboutI3} alt={"회사소개이미지3"} width={480} height={230}
                               className={'rounded-xl mr-5 aboutI fullImage'} loading="lazy"/>
                        <div className={'mp5'}>
                            <div>
                                <div className={'mb-3'}>가치지향</div>
                                <div className={'text-3xl font-medium break-keep max-w-80'}>보험료가 낮아 관심이 적은 분야도 무엇이든
                                    가치있게
                                </div>
                            </div>
                            <div className={'text-gray-600 mt-14 break-keep max-w-96 mtM'}>
                                일상생활 중 불편을 느끼며 보장받아야 할 보험에 대한 솔루션을 제안하고 해결합니다.
                            </div>
                        </div>
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <div className={'flex justify-between mt-10 flexCol3'}>
                        <Image src={AboutI4} alt={"회사소개이미지4"} width={480} height={230}
                               className={'rounded-xl mr-5 aboutI fullImage'} loading="lazy"/>
                        <div className={'mp5'}>
                            <div>
                                <div className={'mb-3'}>고객중심</div>
                                <div className={'text-3xl font-medium break-keep max-w-80'}>고객의 니즈에 맞춰 나가는 1:1 맞춤형 솔루션
                                    보험
                                </div>
                            </div>
                            <div className={'text-gray-600 mt-14 break-keep max-w-96 mtM'}>
                                스타트업, 신사업 등 새로운 비즈니스 영역을 만들어가기 위해 필요한 맞춤형 보험을 제공합니다.
                            </div>
                        </div>
                    </div>
                </FadeInSection>
            </div>
            {/*E : Section 2 회사가치 */}
            {/*S : Section 3 연혁 */}
            <FadeInSection>
                <div className="my-[100px] py-[70px] bg-gray-50 myM">
                    <div className={"mx-auto px-5 max-w-7xl"}>
                        <div className="flex justify-between items-end timeLine">
                            <div className="text-3xl font-medium">
                                <div className="mb-2">우리는 새로운 방식으로</div>
                                <div>매일 성장하고 변화합니다</div>
                            </div>
                            <div className="flex text-2xl space-x-10 text-m-bluegray">
                                <div className="cursor-pointer timeline-prev hover:font-semibold">&#60;-</div>
                                <div className="cursor-pointer timeline-next hover:font-semibold">-&#62;</div>
                            </div>
                        </div>

                        <div className="h-[200px]">
                            <div className="mt-28 h-1 w-full bg-m-bluegray"></div>
                            <TimeLine/>
                        </div>
                    </div>
                </div>
            </FadeInSection>
            {/*E : Section 3 연혁 */}
            {/*S : Section 4 협력사 */}
            <div className={'my-[150px] px-5 max-w-7xl mx-auto myM'}>
                <FadeInSection>
                    <div className="text-3xl font-medium text-center">
                        <div className="mb-2">변화를 위해</div>
                        <div>함께 기획하고 협력합니다</div>
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <div className={'flex mt-10 justify-around items-center space-x-3 flex-wrap'}>
                        <Image src={Kkomobility} alt={'카카오 모빌리티'} width={135} height={37.5} style={{ width: 'auto', height: 'auto' }} loading="lazy"/>
                        <Image src={BaeminConnect} alt={'배민 커넥트'} width={135} height={37.5} style={{ width: 'auto', height: 'auto' }} loading="lazy"/>
                        <Image src={Tmapmobility} alt={'티맵 모빌리티'} width={135} height={37.5} style={{ width: 'auto', height: 'auto' }} loading="lazy"/>
                        <Image src={Swing} alt={'스윙'} width={90} height={37.5} style={{ width: 'auto', height: 'auto' }} loading="lazy"/>
                    </div>
                </FadeInSection>
            </div>
            {/*E : Section 4 협력사 */}
        </main>
    )
};