import Hyundai from "@/assets/images/logo/logo-hyundai.png"
import DB from "@/assets/images/logo/logo-db.png"
import {StaticImageData} from "next/image";
import HyundaiMotorcycle from "@/assets/images/motorcycle/icon-motor-hyundai.png";
import DBMotorcycle from "@/assets/images/motorcycle/icon-motor-db.png";

// 테마 Config 파라미터 insuCompany = "" ( hyundai / db ...) 선택
interface ThemeConfig {
    [key: string]: Theme;
}

//변수 추가시 타입추가
interface Theme {
    insuCompany: string; // 링크 내 업체명 영어로 기입
    platformName: string; // 업체명 (개인정보동의 등에 나타나는 업체명)
    logo: StaticImageData; // 업체 로고
    motorcycle: StaticImageData; // 오토바이 이미지
    plfNumber: { // **plf번호에따라 타이틀과 컨텐츠 내용이 바뀜
        [key: number] : {
            title: {
                main: string; // 메인 타이틀
                sub: string; // 서브 타이틀
            };
            contents: {
                time: string; // 플랫폼 기준 시간
                priceDay: string; // 하루 고정 금액
                priceDay2: string; // 4시간 탑승 시 금액
                priceMinute: string; // 1분당 금액
                age: string; // 플랫폼 가입 가능 연령
            },
            urls : { // 서버에 던질 url 세팅
                insuRequestUrl: string; // 심사요청 URL
                sendSmsUrl: string; // 인증번호 문자 전송 URL
                // insuResultCheckUrl: string; // 심사결과 확인 (insuRequestUrl) 과 동일한걸 사용 ~ 아마 객체중 하나가 다름
            },
            parameters : { // 플랫폼마다 파라미터 받는 양식이 상이함(파라미터명도)
                parmeterCount: number; // 받아야 할 파라미터의 개수
                parmeterNames: string[]; // 받아야할 파라미터명 세팅
            },
            encryption : { // 암호화정보들
                key : string; // 암호화키
                iv: string; // 암호화백터
            },
            apiKey: string; // apiKey urls에 던질때는 항상 헤더에 apiKey를 포함해야한다.
            flag: {
                showDeilyPremiumsField: boolean; // bikePage - 하루 고정 보험료
                showOwnershipField: boolean; // form - 오토바이 소유자 필드 화면에 보이는 여부
            };
        }

    };


}

//테마 추가
export const config: ThemeConfig =
    {
        hyundai: {
            insuCompany: 'hyundai',
            platformName: '현대해상',
            logo: Hyundai,
            motorcycle:  HyundaiMotorcycle,
            plfNumber : {
                1: { // 배달의민족 시간제보험
                    title: {
                        main: 'Hicar 플랫폼배달업자 보험',
                        sub: '배민커넥트 오토바이 시간제보험',
                    },
                    contents: {
                        time: '5시간',
                        priceDay: '5,500',
                        priceDay2: '2.841',
                        priceMinute: '11.84',
                        age: '21세 부터 69세'
                    },
                    urls:{
                        insuRequestUrl: "https://connect-bike-hyundai-dev.simginsu.net/api/v1/hyundai/planagree",
                        sendSmsUrl: "https://connect-bike-hyundai-dev.simginsu.net/api/v1/flex/sms",
                    },
                    parameters: { // 배민은 특별히 파라미터 받지 않음
                        parmeterCount : 0,
                        parmeterNames : [],
                    },
                    encryption : {
                        key: "BDAD115A53DACAD3E6C93D515396DF76",
                        iv: "30d1a85cd25da460"
                    },
                    apiKey : "67E86360-DEFC-11EB-9003-8F90302A9C99",
                    flag: {
                        showDeilyPremiumsField: true,
                        showOwnershipField: true,
                    }
                },
                10: { // 바로고
                    title: {
                        main: 'Hicar 플랫폼배달업자 보험',
                        sub: '바로고 오토바이 시간제보험',
                    },
                    contents: {
                        time: '5시간',
                        priceDay: '8,000',
                        priceDay2: '2.841',
                        priceMinute: '20',
                        age: '24세 부터 65세'
                    },
                    urls:{
                        insuRequestUrl: "https://connect-bike-hyundai-dev.simginsu.net/api/v1/hyundai/planagree",
                        sendSmsUrl: "https://connect-bike-hyundai-dev.simginsu.net/api/v1/flex/sms",
                    },
                    parameters: { // 바로고는 5개의 파라미터를 받아온다.
                        parmeterCount : 5,
                        parmeterNames : ['riderName', 'clientCell', 'birth', 'carNumber', 'bi'],
                    },
                    encryption : {
                        key: "B59AF5619C709B708DE7D07CA8EF6359",
                        iv: "24fd6008eb256184"
                    },
                    apiKey : "67E86360-DEFC-11EB-9003-8F90302A9C99",
                    flag: {
                        showDeilyPremiumsField: true,
                        showOwnershipField: false,
                    }
                },
            },



        },
        // db: { // db는 심의 받아야해서 일단 패스
        //     insuCompany: 'db',
        //     platformName: 'DB손해보험',
        //     logo: DB,
        //     motorcycle:  DBMotorcycle,
        //     plfNumber : {
        //         1 : {
        //             title: {
        //                 main: '',
        //                 sub: '배민커넥트 오토바이 시간제보험',
        //             },
        //             contents: {
        //                 time: '5시간',
        //                 priceDay: '5,500',
        //                 priceDay2: '2,736',
        //                 priceMinute: '11.4',
        //                 age: '19세 부터 69세',
        //             },
        //         }
        //     },
        //     flag: {
        //         showOwnershipField: false,
        //     }
        // },
    }
