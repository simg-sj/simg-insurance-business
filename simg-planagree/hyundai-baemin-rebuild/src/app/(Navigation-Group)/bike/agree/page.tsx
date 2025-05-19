'use client';
import Image from "next/image";
import Hyundai from "@/assets/images/logo/logo-hyundai.png";
import Back from "@/assets/images/icon-arrow-white.png";
import ArrowGray from "@/assets/images/icon-arrow-gray.png";
import React, { useState, useMemo } from "react";
import PopupSlide from "@/components/ui/popup-slide";
import UseDetail from "@/features/privacy/use";
import InquiryDetail from "@/features/privacy/inquiry";
import ProvideDetail from "@/features/privacy/provide";
import ProcessingDetail from "@/features/privacy/processing";
import GuideDetail from "@/features/privacy/guide";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { AgreementItem } from "@/@types/common";
import {config} from "@/config";
import { handleRedirectWithParams } from "@/urils/pageRouterUtil"; /* 페이지 router 처리 유틸 */

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
    //링크이동
    const router = useRouter();
    const pathname = usePathname();

    //테마불러오기
    const insuCompany = searchParams.insuCompany;
    const theme = config[insuCompany || 'hyundai'];
    const plfNumber = searchParams.plfNumber;

    const params = useSearchParams();
    const plfNumberData = theme?.plfNumber?.[plfNumber];
    const plfParCnt = plfNumberData.parameters.parmeterCount; // 파라미터 갯수 확인
    const plfParNames = plfNumberData.parameters.parmeterNames; // 파라미터들 가져오기
    // 파라미터여부에 따라 동적으로 처리
    // 사용 방법 예시: handlerRedirect('agree');
    const handlerRedirect = (dynamicPath:string) => handleRedirectWithParams({
        pathname : pathname,
        dynamicPath: dynamicPath, // 동적 경로 전달
        insuCompany : insuCompany,
        plfNumber : plfNumber,
        plfParCnt : plfParCnt,
        plfParNames : plfParNames,
        searchParams : searchParams,
        router : router, // AppRouterInstance 전달
    });

    // 체크박스 항목 정의
    const agreementItems: AgreementItem[] = useMemo(() => [
        {
            id: 'checkbox1',
            title: '(필수) 개인(신용)정보의 수집, 이용에 관한 사항',
            component: <UseDetail platformName={theme.platformName}/>
        },
        {
            id: 'checkbox2',
            title: '(필수) 개인(신용)정보의 조회에 관한 사항',
            component: <InquiryDetail platformName={theme.platformName}/>
        },
        {
            id: 'checkbox3',
            title: '(필수) 개인(신용)정보의 제공에 관한 사항',
            component: <ProvideDetail />
        },
        {
            id: 'checkbox4',
            title: '(필수) 민감정보 및 고유식별정보의 처리에 관한사항',
            description: '주민등록번호, 외국인등록번호 처리',
            component: <ProcessingDetail platformName={theme.platformName}/>
        },
        {
            id: 'checkbox5',
            title: '(필수) 책임보험 만기 및 가입안내 동의',
            description: '오토바이 책임보험 만기안내',
            component: <GuideDetail />
        },
    ], []);

    // 체크박스 상태 초기화 및 관리
    const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(agreementItems.map(item => [item.id, false]))
    );

    // 팝업 상태 관리
    const [currentPopupId, setCurrentPopupId] = useState<string | null>(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // 모든 체크박스 선택 여부
    const areAllChecked = useMemo(() =>
            Object.values(checkboxStates).every(value => value),
        [checkboxStates]
    );

    // 개별 체크박스 상태 변경
    const handleCheckboxClick = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setCheckboxStates(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // 모두 동의 버튼
    const handleAgreeAllClick = () => {
        const newValue = !areAllChecked;
        setCheckboxStates(
            Object.fromEntries(agreementItems.map(item => [item.id, newValue]))
        );
    };

    // 확인 버튼 클릭
    const handleConfirmClick = () => {
        if (areAllChecked) {
            console.log("필수개인정보동의여부 : " + areAllChecked);
            // router.push(`/${pathname.split("/")[1]}/certification?insuCompany=${insuCompany}&plfNumber=${plfNumber}`);
            // http://localhost:3000/bike/certification?insuCompany=hyundai&plfNumber=10
            handlerRedirect('certification');
            // http://localhost:3000/bike/agree/certification?insuCompany=hyundai&plfNumber=10&riderName=%EC%98%A4%EC%A0%95%ED%98%84&clientCell=01082077529&birth=950225&carNumber=%EC%84%9C%EC%9A%B8%EA%B0%95%EB%82%A8%EA%B0%801234&bi=test
        } else {
            setShowAlert(true);
            console.log("필수개인정보동의여부 : " + areAllChecked);
        }
    };

    // 팝업 열기
    const handlePopupOpen = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setCurrentPopupId(id);
        setPopupOpen(true);
    };

    // 팝업 닫기
    const handlePopupClose = () => {
        setPopupOpen(false);
        setCurrentPopupId(null);
    };

    // CheckBox 컴포넌트
    const Checkbox = ({ checked }: { checked: boolean }) => (
        <div
            className={`radio-button ${
                checked
                    ? 'bg-main text-white'
                    : 'bg-gray-300 text-gray-300'
            }`}
        >
            ✓
        </div>
    );

    return (
        <div>
            {/* 헤더 */}
            <header className="header">
                <Image
                    src={Back}
                    alt="뒤로가기"
                    width={20}
                    height={20}
                    className="icon-back"
                    onClick={() => router.back()}
                />
                <Image src={theme.logo} alt={`${theme.insuCompany} 로고`} width={200} height={100} className={'logo-main'}/>
            </header>

            {/* 본문 */}
            <section className="section mb-28">
                <div className="text-style1 mb-2">휴대폰 인증을 위한</div>
                <div className="text-style1 mb-12">개인정보 동의가 필요해요</div>
                {showAlert && !areAllChecked && (
                    <div className="text-red-500 text-xl pb-4">필수 정보제공에 모두 동의해주세요</div>
                )}
                <div className="my-6 space-y-4">
                    {/* 전체동의 체크박스 */}
                    <div
                        onClick={handleAgreeAllClick}
                        className={`items-center radio-box ${
                            areAllChecked ? 'bg-main-lighter' : 'bg-gray-100'
                        }`}
                    >
                        <div
                            className={`radio-button ${
                                areAllChecked ? 'bg-main text-white' : 'bg-gray-300 text-gray-300 border border-gray-300'
                            }`}
                        >
                            ✓
                        </div>
                        <div className="text-xl font-semibold ml-2">
                            정보제공에 모두 동의
                        </div>
                    </div>

                    {/* 개별 체크박스 리스트 */}
                    {agreementItems.map(item => (
                        <div
                            key={item.id}
                            className="flex-col radio-box bg-gray-100"
                            onClick={(e) => handleCheckboxClick(item.id, e)}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start">
                                    <Checkbox checked={checkboxStates[item.id]} />
                                    <div className={'w-fit ml-2'}>
                                        <div className="text-xl text-gray-700 font-medium break-keep">
                                            {item.title}
                                        </div>
                                        {item.description && (
                                            <div className="text-lg text-gray-500 mt-1 break-keep">
                                                {item.description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Image
                                    src={ArrowGray}
                                    alt="화살표 아이콘"
                                    width={20}
                                    height={20}
                                    className="-rotate-90 cursor-pointer transition-transform mt-1 ml-1 icon-arrow"
                                    onClick={(e) => handlePopupOpen(item.id, e)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="text-style2">
                        * 개인정보 보호법에 의거하여 가입설계를 위한 개인(신용)정보 처리 동의서를 동의 한 경우에만 당사의 보험계약 가입 등을 하실 수 있습니다.
                    </div>
                    <div className="text-style2">
                        * 책임보험이 유효한 상태여야 본 시간제 보험의 보상이 가능합니다. 만기일 이전에 갱신 누락예방을 위해 사전안내를 드릴 수 있습니다.
                    </div>
                </div>


            </section>

            {/* 하단 버튼 */}
            <footer className="footer-container">
                <button
                    onClick={handleConfirmClick}
                    className={`btn-base w-full text-white cursor-pointer ${
                        areAllChecked ? 'bg-main' : 'bg-main-lighter'
                    }`}
                >
                    정보제공에 동의
                </button>
            </footer>

            {/* 개인정보 동의 상세 팝업 */}
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
                        {agreementItems.find(item => item.id === currentPopupId)?.component ||
                            <div>팝업 내용이 없습니다.</div>}
                    </div>
                </PopupSlide>
            )}
        </div>
    );
}