'use client';
import Image from "next/image";
import Hyundai from "@/assets/images/logo/logo-hyundai.png";
import Back from "@/assets/images/icon-arrow-white.png";
import React, {useState, useMemo} from "react";
import PopupSlide from "@/components/ui/popup-slide";
import {useRouter} from "next/navigation";
import {CheckItem} from "@/@types/common";
import PhoneVerification from "@/features/contents/phone-certification"

export default function Page() {
    const router = useRouter();

    //임의 휴대폰번호 일치여부확인
    const mockData = useMemo(
        () => [
            {
                phoneNumber: "01012345678",
                name: "홍길동",
                productName: "이륜차 시간제 보험",
                requestDate: "2025-01-01",
                status: "심사승인",
            },
            {
                phoneNumber: "01000000000",
                name: "김철수",
                productName: "이륜차 시간제 보험",
                requestDate: "2025-04-06",
                status: "심사대기",
            },
        ],
        []
    );

    const [popupData, setPopupData] = useState<any>(null); // 팝업에 표시할 사용자 데이터 저장

    //결과조회 팝업
    const [currentPopupId, setCurrentPopupId] = useState<string | null>(null);
    const [popupOpen, setPopupOpen] = useState(false);

    // 팝업 열기
    const handlePopupOpen = (id: string) => {
        setCurrentPopupId(id);
        setPopupOpen(true);
    };

    // 팝업 닫기
    const handlePopupClose = () => {
        setPopupOpen(false);
        setCurrentPopupId(null);
    };

    // 인증 성공 시 호출될 함수
    const handleVerificationSuccess = (phoneNumber: string) => {
        console.log("인증 성공: " + phoneNumber);

        // 휴대폰 번호 확인
        const userData = mockData.find(user => user.phoneNumber === phoneNumber);

        if (userData) {
            // 일치하는 번호가 있는 경우
            setPopupData(userData);
            handlePopupOpen('success');
        } else {
            // 일치하는 번호가 없는 경우
            handlePopupOpen('fail');
        }
    };

    //조회팝업 성공 실패
    const checkItems: CheckItem[] = useMemo(() => [
        {
            id: 'success',
            contents: popupData ? (
                <>
                    <div className="text-popup mb-4">{popupData.name}님 심사결과를 확인해주세요</div>
                    <div className={'text-xl mt-8'}>
                        <div className={'flex-between mb-4'}>
                            <div>성명</div>
                            <div className={'text-gray-700 text-right'}>{popupData.name}</div>
                        </div>
                        <div className={'flex-between mb-4'}>
                            <div>상품명</div>
                            <div className={'text-gray-700 text-right'}>{popupData.productName}</div>
                        </div>
                        <div className={'flex-between mb-4'}>
                            <div>심사 요청일</div>
                            <div className={'text-gray-700 text-right'}>{popupData.requestDate}</div>
                        </div>
                        <div className={'flex-between mb-4'}>
                            <div>심사 상태</div>
                            <div className={'text-gray-700 text-right font-semibold'}>{popupData.status}</div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-popup mb-4">데이터가 없습니다.</div>
            ),
        },
        {
            id: 'fail',
            contents: (
                <>
                    <div className="text-popup mb-4">
                        번호로 진행된 심사가 없습니다.
                    </div>
                    <div className="text-gray-500 text-lg">
                        휴대폰 번호를 확인해주세요.
                    </div>
                </>
            ),
        },
    ], [popupData]);

    return (
        <div>
            <header className="header">
                <Image src={Back} alt="뒤로가기" width={20} height={20} className="icon-back" onClick={() => router.back()}/>
                <Image src={Hyundai} alt="현대해상로고" width={200} height={100} className={'logo-main'}/>
            </header>

            <section className="section mb-28">
                <div className="text-style1 mb-2">심사결과 조회를 위해</div>
                <div className="text-style1 mb-12">휴대폰인증을 진행해주세요</div>

                <div className="min-h-[220px]">
                    {/*휴대폰인증 컴포넌트*/}
                    <PhoneVerification onVerificationSuccess={handleVerificationSuccess} />
                </div>

                <div className={'mt-20'}>
                    <div className="text-black text-2xl font-medium mb-4">보험 상품 및 심사는 여기로 문의해주세요</div>
                    <div className={'text-box'}>
                        <div className={'text-box-title'}>· 대표번호 : 1877 - 3006</div>
                        <div className={'text-box-title'}>· 운영시간 : 평일 오전 9시 ~ 6시</div>
                        <div className={'text-style2'}>본 심사는 보험 대리점 (주)SIMG 에서 심사를 진행합니다.<br/> (보험대리점 등록번호 2014110098)</div>
                    </div>
                </div>
            </section>

            {/*결과조회 팝업*/}
            {popupOpen && currentPopupId && (
                <PopupSlide
                    isOpen={popupOpen}
                    onClose={handlePopupClose}
                    buttons={[
                        {
                            label: "확인",
                            className: "bg-main text-white",
                            onClick: handlePopupClose,
                        },
                    ]}
                >
                    <div className="max-h-[calc(100vh-300px)] overflow-y-auto py-5 px-2">
                        {checkItems.find(item => item.id === currentPopupId)?.contents ||
                            <div>팝업 내용이 없습니다.</div>}
                    </div>
                </PopupSlide>
            )}
        </div>
    );
}