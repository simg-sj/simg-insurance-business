import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from "next/image";
import Back from "@/assets/images/icon/back_icon.png";
import Next from "@/assets/images/icon/next_icon.png";
import FadeInSection from "@/components/common/fadeIn";
import Team1 from "@/assets/images/4-1.png";
import Team2 from "@/assets/images/4-2.png";
import Team3 from "@/assets/images/4-3.png";
import Team4 from "@/assets/images/4-4.png";
import Team5 from "@/assets/images/4-5.png";

const TeamSlide = () => {
    const slides = [
        {
            title: '운영',
            image: Team1,
            description: [
                '보험 계약관리, 사고접수, 클레임 관리 등 핵심업무를 전문적으로 수행하여 고객의 만족을 위해 일합니다.'
            ]
        },
        {
            title: 'ICT',
            image: Team2,
            description: [
                '시스템 작업과 웹 사이트 관리를 담당하며 자동화 솔루션과 맞춤형 시스템을 개발하여 업무 프로세스를 최적화합니다.'
            ]
        },
        {
            title: '고객지원',
            image: Team3,
            description: [
                '간단한 문의 응대부터 복잡한 문제 해결까지 다양한 고객의 요청을 최전선에서 처리하며 고객 만족을 최우선으로 문제를 해결합니다.'
            ]
        },
        {
            title: '사업개발',
            image: Team4,
            description: [
                '새로운 기회를 탐색하고 파트너십을 구축하여 혁신적인 아이디어로 시장에서 경쟁력을 높여 회사의 성장을 이끌어 나갑니다.',
            ]
        },
        {
            title: '인사',
            image: Team5,
            description: [
                '회사의 인재를 발굴하고 성장시키며 직원들이 최상의 환경에서 일할 수 있도록 함께 발전하는 문화를 만들어갑니다.'
            ]
        }
    ];

    return (
        <div className="flex items-start mp5">
            <button className="timeline-prev mt-[85px] mr-5 w-[150px]">
                <Image src={Back} alt="이전" width={50} height={50} priority />
            </button>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: '.timeline-prev',
                    nextEl: '.timeline-next',
                }}
                slidesPerView={3}
                spaceBetween={40}
                loop={true}
                className="relative"
                breakpoints={{
                    100: { slidesPerView: 1 },
                    700: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 }
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <FadeInSection>
                        <div>
                            <div className="relative w-full h-52 rounded-xl overflow-hidden">
                                {slide.image && (
                                    <Image
                                        src={slide.image}
                                        alt={`${slide.title} 이미지`}
                                        width={300}
                                        height={250}
                                        style={{
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        className="rounded-xl shadow"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                            <div className="mb-3 mt-7 font-medium text-xl">{slide.title}</div>
                            <div className="text-gray-600 space-y-1">
                                {slide.description.map((line, idx) => (
                                    <div key={idx} className="text-base leading-relaxed break-keep">{line}</div>
                                ))}
                            </div>
                        </div>
                        </FadeInSection>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="timeline-next mt-[85px] ml-5 w-[150px]">
                <Image src={Next} alt="다음" width={50} height={50} priority />
            </button>
        </div>
    );
};

export default TeamSlide;