import { ServiceCardProps } from '@/@types/common';
import Travel from '@/assets/images/serviceIcon/travel-icon.png'
import Fire from '@/assets/images/serviceIcon/fire-icon.png'
import Delivery from '@/assets/images/serviceIcon/delivery-icon.png'
import Heart from '@/assets/images/serviceIcon/heart-icon.png'
import Store from '@/assets/images/serviceIcon/store-icon.png'
import Car from '@/assets/images/serviceIcon/car-icon.png'

export const ServiceCardContents = () => {
    const services: ServiceCardProps[] = [
        {
            title: '국내단체여행자보험',
            description: '단체 인원의 특성에 맞는 다양한 선택 담보, 인원수에 따른 단체할인 혜택 가능하며 5인 이상 학교·법인 등 단체 가입 가능한 여행보험 입니다.',
            type: '단체',
            icon: {
                src: Travel.src,
                alt: '여행',
                width: 20,
                height: 20
            },
            detailDescription: '여려 명이 함께 국내여행 중 발생할 수 있는 다양한 위험을 보장하는 보험. 여행 중 발생할 수 있는 사고, 질병, 휴대품 손해와 타인에게 끼친 손해까지 유형별로 다양하게 보장 가능하며, 학교의 경우 수학여행과 현장체험학습 등의 일정에 가입하고 기업의 경우 출장, 연수회와 워크숍 등의 일정에 가입',
            link: 'https://hana.tourinsurance.kr/'
        },
        {
            title: '해외여행자보험',
            description: '해외여행 중 발생할 수 있는 다양한 위험을 보장하는 보험',
            type: '개인/단체',
            icon: {
                src: Travel.src,
                alt: '여행',
                width: 20,
                height: 20
            },
            detailDescription: '해외여행 중 발생할 수 있는 사망, 후유장해, 의료비, 휴대품손해, 타인에게 끼친 손해(배상책임) 등 유형별로 다양하게 보장',
            link: 'https://tally.so/r/3qdp62'
        },
        {
            title: '이륜사륜차 시간제보험',
            description: '배달한 시간만큼 보험료를 지불하고 보장 받을 수 있는 유상운송용 보험',
            type: '개인/단체',
            icon: {
                src: Delivery.src,
                alt: '배송',
                width: 30,
                height: 30
            },
            detailDescription: '개인 승용차 및 이륜차로 유상운송(배달대행)을 하는 사람들을 위해 개발한 건당보험으로, 운행하는 만큼만 배차요청 시간부터 배달물 전달 완료시간 사이에 일어난 대인, 대물 사고등을 보상이 가능합니다.',
            link: ''
        },
        {
            title: '영업배상 책임보험',
            description: '영업장 내에서 업무수행(기기대여 및 운행 등) 중 일어난 사고로 법률상 배상책임에 따른 손해를 담보하는 보험',
            type: '단체',
            icon: {
                src: Store.src,
                alt: '영업',
                width: 25,
                height: 25
            },
            detailDescription: '영업장 내에서 발생한 혹은 영업중에 발생한 사고를 보상하며, 이륜차 기기대여의 경우 운행중(대여직후 부터 이용종료 까지) 발생한 법률상 배상책임을 보상과 비운행 기기로 인해 발생한 재물손해를 보상',
            link: ''
        },
        {
            title: '업무용/이륜 자동차보험',
            description: '자동차 사고로 인해 발생한 손해를 담보하는 보험',
            type: '개인/단체',
            icon: {
                src: Car.src,
                alt: '자동차',
                width: 25,
                height: 25
            },
            detailDescription: ' 자동차 사고로 인하여 발생한 법률상 배상책임과 자기 신체 및 차량에 발생한 손해를 보상하는 보험으로, 자동차 보유자라면 반드시 가입해야하는 보험 (최소 가입 대인1, 대물 2000만원)',
            link: ''
        },
        {
            title: '화재보험',
            description: '소재지 내 발생한 화재나 과실로 인한 피해를 보장받을 수 있는 보험',
            type: '개인/단체',
            icon: {
                src: Fire.src,
                alt: '화재',
                width: 25,
                height: 25
            },
            detailDescription: '증권상 기재된 소재지의 화재로 인한 재산 손해, 실화배상책임, 시설배상책임(소재지과실로 고객 다쳤을 경우), 구내치료비(약국에서 고객과실로 다친 경우) 등을 보상.',
            link: ''
        },
        {
            title: '개인대리 탁송보험',
            description: '1년간 대리운전/탁송 운행 시 불의의 자동차사고를 보상하는 보험',
            type: '개인/단체',
            icon: {
                src: Car.src,
                alt: '자동차',
                width: 25,
                height: 25
            },
            detailDescription: '대리운전/탁송 등 유상운송 시 대인, 대물 사고를 보상하며 추가특약에 따라 렌트비까지 보상',
            link: 'https://rascs.kr/daeli/'
        },
        {
            title: '적재물배상책임보험',
            description: '적재물 운송 중 불의의 사고로 배달 목적물의 파손을 보상하는 보험',
            type: '단체',
            icon: {
                src: Delivery.src,
                alt: '배송',
                width: 30,
                height: 30
            },
            detailDescription: '재물 픽업 시부터 적재물 전달까지의 기간동안 일어난 적재물의 파손을 보상',
            link: ''
        },
        {
            title: '기계식 주차장 배상책임보험',
            description: '주차장 사용 중 사고로 인해 발생하는 대인 및 대물 피해에 대해 보상하는 의무보험',
            type: '개인/단체',
            icon: {
                src: Car.src,
                alt: '자동차',

                width: 25,
                height: 25
            },
            detailDescription: ' 의무 가입 보험으로, 기계식 주차장에서 발생한 대인 및 대물 피해를 보상. 주차장법에 따라 기계식 주차 설비 20대 이상인 경우 반드시 가입해야 하며, 가입 의무자는 20대 이상 기계식 주차장 관리자. 의무 가입 한도로 진행하며, 원하는 조건에 맞춰 여러 보험사에서 비교 견적 산출.',
            link: 'https://tally.so/r/mZlZYy'
        },
        {
            title: '현장실습보험',
            description: '학교에서 실습을 나가는 학생들을 대상으로 하는 보험',
            type: '단체',
            icon: {
                src: Heart.src,
                alt: '단체행사',
                width: 22,
                height: 22
            },
            detailDescription: '고등학생,대학생,대학원생들이 교육부에서 인정하는 현장실습에 참여하였을때 발생하는 대인,대물,본인치료비 사고를 보장',
            link: 'https://lincinsu.kr/'
        },
        {
            title: '학원배상책임보험',
            description: '학원을 운영하는 사업자를 대상으로 하는 의무보험',
            type: '단체',
            icon: {
                src: Store.src,
                alt: '영업',
                width: 25,
                height: 25
            },
            detailDescription: '학원등록증을 보유하고 있는 사업체를 대상으로 정해진 법적 담보로 가입해야하는 의무보험',
            link: ''
        },
        {
            title: '개인정보보호배상책임보험',
            description: '이용자를 보유하고 있는 기업체를 대상으로 하는 의무보험',
            type: '단체',
            icon: {
                src: Heart.src,
                alt: '단체행사',
                width: 22,
                height: 22
            },
            detailDescription: '고객 정보를 가지고 있는 사업체를 대상으로 정해진 법적담보기준으로 가입해야하는 의무보험',
            link: ''
        },
        {
            title: '행사주최자배상책임보험',
            description: '행사를 진행하고자하는 업체를 대상으로 하는 의무보험',
            type: '단체',
            icon: {
                src: Heart.src,
                alt: '단체행사',
                width: 22,
                height: 22
            },
            detailDescription: '행사 진행시 발생하는 사고를 대비하여 대인,대물,본인치료비,음식물담보 등을 배상하는 영업배상책임보험',
            link: 'https://eventinsu.simg.kr/'
        },
        {
            title: '단체상해보험',
            description: '기업에서 복지로 운영하여 직원을 대상으로 하는 상해보험',
            type: '단체',
            icon: {
                src: Heart.src,
                alt: '단체행사',
                width: 22,
                height: 22
            },
            detailDescription: '복지의 형태로 운용되어 임직원, 임직원의 배우자, 자녀까지 대상으로 하는 단체상해보험',
            link: ''
        },
        {
            title: '적하보험',
            description: '해상 운송도중 수반되는 각종 위험으로 인한 화물 및 기타 재산 손해를 보상하는 보험',
            type: '단체',
            icon: {
                src: Delivery.src,
                alt: '배송',
                width: 30,
                height: 30
            },
            detailDescription: '우연한 사고나 재해로 인한 화물의 전손, 분손, 그 밖에 발생하는 비용에 대해 보상하여 수출입 화주 간 거래의 안정성을 높여주는 보험',
            link: 'https://www.hanacargo.com/'
        },
        {
            title: '택시안심보험',
            description: '택시기사가 운행 중 발생한 사고에 대하여 보상하는 보험',
            type: '단체',
            icon: {
                src: Car.src,
                alt: '자동차',
                width: 25,
                height: 25
            },
            detailDescription: '운행 중 폭력(성폭력,강력범죄 등), 교통사고로 인한 골절 및 후유장해 발생 등에 대한 위로금 형식의 보험금 지급',
            link: ''
        },
        {
            title: '전문인배상책임보험',
            description: '전문인이 과실로 인해 손해를 끼쳤을 때 배상을 책임지는 보험',
            type: '개인',
            icon: {
                src: Store.src,
                alt: '영업',
                width: 25,
                height: 25
            },
            detailDescription: '전문인의 과실 (약국의 경우 오조제 및 일반약 오판매 등)을 폭넓은 범위에서 업무 과실로 인해 발생한 고객 피해에 대해 보상',
            link: ''
        },
    ];

    const getFilteredServices = (currentTab: string) => {
        if (currentTab === 'all') return services;
        const filterType = currentTab === 'personal' ? '개인' : '단체';
        return services.filter(service => service.type.includes(filterType));
    };

    return {
        services,
         getFilteredServices
    };
};