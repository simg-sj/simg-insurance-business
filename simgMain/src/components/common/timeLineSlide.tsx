import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';

// 년도 및 해당년도 업적 추가
const timelineData = [
    {
        year: 2024,
        events: [
            "리브애니웨어 계약",
            "기계식주차장사고 배상책임보험 개발",
            "단체해상보험 개발",
        ]
    },
    {
        year: 2023,
        events: [
            "바로고 이륜차 시간제보험 계약",
            "캐시노트 영업배상책임보험 계약",
            "행사주최자배상책임보험 개발",
            "해외여행자보험 개발",
        ]
    },
    {
        year: 2022,
        events: [
            "국내단체여행자보험개발",
            "이륜차 시간제 보험 고도화",
        ]
    },
    {
        year: 2021,
        events: [
            "배민커넥트 이륜차 시간제보험 개발 및 계약",
            "개인대리 / 탁송보험 개발",
            "적재물배상책임보험 개발",
            "적하보험 개발",
            "카카오 택시안심보험 개발 및 계약",
            "크레소티 화재보험, 전문인배상책임보험 계약",
        ]
    },
    {
        year: 2020,
        events: [
            "배민커넥트 사륜차 시간제보험 개발 및 계약",
            "킥고잉 영업배상책임보험 계약",
        ]
    },
    {
        year: 2019,
        events: [
            "배민커넥트 PM 시간제보험 개발 및 계약",
            "카카오바이크 영업배상책임보험 개발 및 계약",
        ]
    },
    {
        year: 2014,
        events: [
            "에스아이엠지 설립"
        ]
    }
];

const TimelineSlider = () => {
    return (
        <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={0}
            navigation={{
                prevEl: '.timeline-prev',
                nextEl: '.timeline-next',
            }}
            className="mt-0"
            breakpoints={{
                100: { slidesPerView: 1 },
                700: { slidesPerView: 2 },
                1200: { slidesPerView: 3 }
            }}
        >
            {timelineData.map((item) => (
                <SwiperSlide key={item.year}>
                    <div className="mx-2">
                        <div className="text-2xl font-medium text-m-bluegray mt-2">
                            {item.year}
                        </div>
                        <div className="mt-5">
                            {item.events.map((event, index) => (
                                <div key={index} className="text-gray-600 mt-1 break-keep">
                                    {event}
                                </div>
                            ))}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

    );
};

export default TimelineSlider;