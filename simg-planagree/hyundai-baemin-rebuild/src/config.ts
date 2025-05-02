import Hyundai from "@/assets/images/logo/logo-hyundai.png"
import DB from "@/assets/images/logo/logo-db.png"
import {StaticImageData} from "next/image";
import HyundaiMotorcycle from "@/assets/images/motorcycle/icon-motor-hyundai.png";
import DBMotorcycle from "@/assets/images/motorcycle/icon-motor-db.png";

interface ThemeConfig {
    [key: string]: Theme;
}

//변수 추가시 타입추가
interface Theme {
    platform: string; //링크 내 업체명 영어로 기입
    platformName: string; //업체명 (개인정보동의 등에 나타나는 업체명)
    logo: StaticImageData; //업체로고
    motorcycle: StaticImageData; //오토바이 이미지
    title: {
        main: string; //메인타이틀
        sub: string; //서브타이틀
    }
    contents: {
        time: string; //ㅇㅇ시간 초과 배달해도
        priceDay: string; // 하루 고정금액
        priceDay2: string; // 4시간 탑승시 금액
        priceMinute: string; //1분당 금액
        age: string; // 가입연령
    }
    flag: {
        showOwnershipField: boolean; //form - 오토바이소유자필드 화면에 보이는여부
    }
}

//테마 추가
export const config: ThemeConfig =
    {
        hyundai: {
            platform: 'hyundai',
            platformName: '현대해상',
            logo: Hyundai,
            motorcycle:  HyundaiMotorcycle,
            title: {
                main: 'Hicar 플랫폼배달업자 보험',
                sub: '배민커넥트 오토바이 시간제보험 일정액제',
            },
            contents: {
                time: '5시간',
                priceDay: '5,500',
                priceDay2: '2.841',
                priceMinute: '11.84',
                age: '21세 부터 69세'
            },
            flag: {
                showOwnershipField: true,
            }
        },
        db: {
            platform: 'db',
            platformName: 'DB손해보험',
            logo: DB,
            motorcycle:  DBMotorcycle,
            title: {
                main: '',
                sub: '배민커넥트 오토바이 시간제보험',
            },
            contents: {
                time: '5시간',
                priceDay: '5,500',
                priceDay2: '2,736',
                priceMinute: '11.4',
                age: '19세 부터 69세',
            },
            flag: {
                showOwnershipField: false,
            }
        },
    }
