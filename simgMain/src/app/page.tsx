"use client"
import Image from "next/image";
import '@/assets/styles/common.css';
import ConsultingTab from '@/components/common/consultingTab';
import MultipleItems from "@/components/common/mainSlide";
import Arrow from "@/assets/images/icon/arrow_icon.png";
import Link from "next/link";
import FadeInSection from "@/components/common/fadeIn";
import MainI1 from "@/assets/images/1-1.png";
import MainI2 from "@/assets/images/1-2.png";
import MainI3 from "@/assets/images/1-3.png";
import MainI4 from "@/assets/images/1-4.png";


export default function Home() {

    return (
        <main className={'my-8'}>
            <div className={'max-w-7xl mx-auto'}>
                {/*S : Section 1 슬라이드*/}
                <div className={'mt-[140px]'}>
                    <div className={'flex space-x-5 mp5'}>
                        <ConsultingTab/>
                        <MultipleItems/>
                    </div>
                </div>
                {/*ㄷE : Section 1 슬라이드*/}
                {/*S : Section 2 보험 이제는 선택과 비교의 시대 */}
                <FadeInSection>
                    <div className={'my-[100px] px-5 text-4xl font-medium my-m'}>
                        <div className={'mb-3'}>보험 이제는</div>
                        <div>선택과 비교의 시대</div>
                    </div>
                </FadeInSection>
                {/*E : Section 2 보험 이제는 선택과 비교의 시대 */}
                {/*S : Section 3 쏟아지는 보험상품 */}
                <div className={'my-[150px] px-5 flex justify-between items-end flexColM1 pNone myM'}>
                    <FadeInSection>
                        <div className={'mt-m mp5'}>
                            <div className={'mb-3'}>맞춤 솔루션</div>
                            <div className={'text-3xl font-medium'}>
                                <div className={'break-keep leading-10 max-w-64'}>쏟아지는 보험상품 필요한 것만 실용적으로</div>
                            </div>
                            <div className={'text-gray-600 mt-14 break-keep max-w-[500px] mr-5'}>
                                <div>반드시 필요한 보험을 개발 및 발굴하여 시스템과 연계해 편리하게 보험에 가입하고 보상 받을 수 있는 솔루션을 제안합니다.</div>
                            </div>
                            <Link href={'/service'}
                                  className={'hover:font-medium flex items-center mt-5 cursor-pointer'}>
                                <div className={'mr-3'}>자세히보기</div>
                                <Image src={Arrow} alt={'자세히보기'} width={22} height={22}/>
                            </Link>
                        </div>
                    </FadeInSection>
                    <FadeInSection>
                        <Image src={MainI1} alt={"메인이미지1"} width={400} height={500} className={'rounded-xl fullImage'} priority/>
                    </FadeInSection>
                </div>
                {/*E : Section 3 쏟아지는 보험상품 */}
                {/*S : Section 4 보험 그이상의 변화 */}
                <div className={'my-[150px] px-5 pNone myM'}>
                    <FadeInSection>
                        <Image src={MainI2} alt={"메인이미지2"} width={1240} height={400} className={'rounded-xl fullImage'}/>
                    </FadeInSection>
                    <FadeInSection>
                        <div className={'flex justify-between items-start mt-10 flexColM2 mp5'}>
                            <div>
                                <div className={'mb-3'}>우리가 나아가는 방식</div>
                                <div className={'text-3xl font-medium'}>
                                    <div className={'break-keep leading-10 max-w-[500px] min-w-[400px] layoutMin1'}>보험 그
                                        이상의 변화를 개척해 나가는 인슈어테크 기업
                                    </div>
                                </div>
                            </div>
                            <div className={'max-w-[600px] ml-5 ml-none'}>
                                <div className={'text-gray-600 mt-10 break-keep'}>
                                    <div>보험 시장에서 인슈어테크라는 새로운 분야의 시장을 이끌어가며 상품개선, 서비스 효율성 제고, 맞춤형 서비스 등 고객을 위한 서비스를 만들어가며
                                        성장하고 있습니다.
                                    </div>
                                </div>
                                <Link href={'/about'}
                                      className={'hover:font-medium flex items-center mt-5 cursor-pointer'}>
                                    <div className={'mr-3'}>자세히보기</div>
                                    <Image src={Arrow} alt={'자세히보기'} width={22} height={22}/>
                                </Link>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
                {/*E : Section 4 보험 그이상의 변화 */}
                {/*S : Section 5 즐겁게 열심히 효율적으로 */}
                <div className={'my-[150px] px-5 flex justify-between space-x-10 pNone myM'}>
                    <div className={'hiddenImage'}>
                        <FadeInSection>
                            <Image src={MainI3} alt={"메인이미지3"} width={300} height={350} className={'rounded-xl'}/>
                        </FadeInSection>
                    </div>
                    <div className={'flex flex-col layoutMin2'}>
                        <FadeInSection>
                            <div className={'flex justify-between items-start mainFlexCol ml-none'}>
                                <Image src={MainI4} alt={"메인이미지4"} width={400} height={200}
                                       className={'rounded-xl fullImage'}/>
                                <div className={'text-3xl font-medium ml-10 mp5'}>
                                    <div className={'break-keep leading-10 max-w-80'}>우리는 즐겁게 열심히 효율적으로 협력하며 일합니다</div>
                                </div>
                            </div>
                        </FadeInSection>
                        <FadeInSection>
                            <div className={'layoutMargin ml-none mp5'}>
                                <div className={'mb-3 mt-10'}>우리가 만들어갈 문화</div>
                                <div className={'text-gray-600 break-keep max-w-[400px]'}>
                                    <div>말 그대로 우리는 열심히 시간내 효율적으로 일하며 말 그대로 우리는 열심히 시간내 효율적으로 일하며 공동의 목표를 이루기 위해 적극적으로
                                        협력합니다.
                                    </div>
                                </div>
                                <Link href={'/culture'}
                                      className={'hover:font-medium flex items-center mt-5 cursor-pointer'}>
                                    <div className={'mr-3'}>자세히보기</div>
                                    <Image src={Arrow} alt={'자세히보기'} width={22} height={22}/>
                                </Link>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
                {/*E : Section 5 즐겁게 열심히 효율적으로 */}
            </div>
        </main>
    )
};