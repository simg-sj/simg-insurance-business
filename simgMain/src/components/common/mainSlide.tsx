'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import React, { useState } from "react";
import {ImageDataProps} from "@/@types/common";
import Image from "next/image";
import Slide1 from "@/assets/images/slide/slide_simg.png"
import Slide2 from "@/assets/images/slide/slide_service.png"
import Slide3 from "@/assets/images/slide/slide_culture.png"
import Slide4 from "@/assets/images/slide/slide_hire.png"

const imageData: ImageDataProps[] = [
    {
        id: 1,
        src: Slide1.src,
        alt: 'simg이념',
        link: '/about'
    },
    {
        id: 2,
        src: Slide2.src,
        alt: 'simg서비스',
        link: '/service'
    },
    {
        id: 3,
        src: Slide3.src,
        alt: '조직문화',
        link: '/culture'
    },
    {
        id: 4,
        src: Slide4.src,
        alt: '인재풀채용',
        link: 'culture'
    }
];

function MultipleItems() {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const handleImageClick = (link: string) => {
        window.location.href = link;
    };

    return (
        <div className="overflow-hidden w-full mainSlide">
            <Swiper
                spaceBetween={10}
                slidesPerView={2.5}
                modules={[Autoplay, Scrollbar]}
                loop={true}
                simulateTouch={true}
                observer={true}
                observeParents={true}
                grabCursor={true}
                speed={1200}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    0: { slidesPerView: 0 },
                    1000: { slidesPerView: 1 },
                    1130: { slidesPerView: 1.5 },
                    1250: { slidesPerView: 2 },
                    1300: { slidesPerView: 2.5 }
                }}
                initialSlide={currentSlide}
            >
                {imageData.map((image) => (
                    <SwiperSlide key={image.id}>
                        <div
                            className="w-[260px] h-[410px] cursor-pointer rounded-lg shadow-md my-1"
                            onClick={() => handleImageClick(image.link)}
                        >
                            <Image
                                width={260}
                                height={410}
                                src={image.src}
                                alt={image.alt}
                                quality={100}
                                loading={'eager'}
                                className={'rounded-lg'}
                                priority
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default MultipleItems;