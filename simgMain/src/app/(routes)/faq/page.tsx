'use client'
import React, { useState, useEffect } from 'react';
import { Tab } from "@/components/ui/tab";
import Accordion from "@/components/ui/accordion";
import { TabOption } from "@/@types/common";
import FadeInSection from "@/components/common/fadeIn";

const FaqPage = () => {
    const fullTabOptions: TabOption[] = [
        { id: 'recruit', label: '채용' },
        { id: 'time', label: '시간제보험' },
        { id: 'case', label: '건당보험' },
        { id: 'travel', label: '여행자보험' },
        { id: 'field', label: '현장실습보험' },
    ];

    const shortTabOptions: TabOption[] = [
        { id: 'recruit', label: '채용' },
        { id: 'time', label: '시간제' },
        { id: 'case', label: '건당' },
        { id: 'travel', label: '여행자' },
        { id: 'field', label: '현장실습' },
    ];

    const [currentTab, setCurrentTab] = useState(fullTabOptions[0].id);
    const [tabOptions, setTabOptions] = useState(fullTabOptions);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setTabOptions(shortTabOptions);
            } else {
                setTabOptions(fullTabOptions);
            }
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 카테고리별 내용
    const faqContent = {
        recruit: [
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>인재풀 등록 후 다른 채용공고에도 지원이 가능한가요?</div>,
                content: <div className={'text-lg'}>이미 인재풀에 지원서를 등록하신 경우에도 진행 중인 채용공고에 지원이 가능하며, 이에 대한 불이익은 없습니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>홈페이지에 지원하기가 안보여요.</div>,
                content: <div className={'text-lg'}>당사는 홈페이지에 채용 공고를 게시하지 않습니다. 채용 사이트에 오픈된 공고가 있을 경우에 해당 사이트에서 지원해주시기 바랍니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>여러 포지션에 중복 지원이 가능한가요?</div>,
                content: <div className={'text-lg'}>중복 지원은 가능하지만 가장 희망하시는 포지션에 지원하시기를 권장 드립니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>서류 탈락 후 재지원이 가능한가요?</div>,
                content: <div className={'text-lg'}>재지원은 이전 서류 접수일로부터 6개월 이후에 접수 부탁드립니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>경력이 있는데 신입으로 지원 가능한가요?</div>,
                content: <div className={'text-lg'}>네, 가능합니다. 다만, 타 회사에서의 경력 사항 등은 참고 자료로 활용될 수 있으나 입사하실 때 경력은 인정되지 않습니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>졸업 예정자도 지원이 가능한가요?</div>,
                content: <div className={'text-lg'}>입사 일정에 무리가 없다면 졸업 예정자도 지원 가능합니다.</div>,
            },
        ],
        time: [
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>시간제 보험 해지 후 배달 가능한가요?</div>,
                content: <div className={'text-lg'}>배달 운행 가능하지만 시간제 보험, 개인 유상 운송 보험 미가입 상태에서 배달 운행 중 사고 발생 시, 보험 적용은 불가합니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>시간제보험 가입된 정보(소유자 및 차량 정보)가 변경될 경우엔 어떻게 해야 하나요?</div>,
                content: <div className={'text-lg'}>정보 변경 건은 반드시 SIMG로 연락주셔서 고지해주셔야 하며 변경 정보에 따라 처리까지 시일 소요될 수 있습니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span> 보험 거절 사유(본인 소유 확인 건) 확인 요청.</div>,
                content: <div className={'text-lg'}>SIMG에서 기본 정보(소유자, 차량 번호 등) 확인하여 상세 거절 사유 확인 후 처리 방법 안내드리고 있습니다. 다만 차량 번호 등록 및 이전의 경우 전산 반영까지 영업일 기준 2~3일 소요되는 점 양해 부탁드립니다.</div>,
            }
        ],
        case: [
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>건당 보험 재심사 요청.</div>,
                content: <div className={'text-lg'}>플랫폼을 통해 재심사 문의 하셔야 합니다. 티맵이신 경우, 신규 심사 라고 해야 가능하며 카카오는 보험사 및 거절 사유에 따라 재심사까지 3개월 정도 소요될 수 있습니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>건당 보험 가입증명서 발급 요청.</div>,
                content: <div className={'text-lg'}>단체 보험이므로 SIMG에서는 기사님 개인에게 발급이 불가능합니다.
                    <br/>
                    <br/>
                    단,
                    <br/>
                    사고 접수를 하셨을 경우에는 "보험가입 사실확인서"를 보상 담당자 통해 발급이 가능합니다.
                    <br/>
                    사고 접수를 안하셨을 경우에는 대리운전 어플에서 가입 내역 확인이 가능합니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>사고 이력 / 교통 법규 위반 으로 거절 됐다고 안내 받았습니다. 어디서 확인 할 수 있나요?</div>,
                content: <div className={'text-lg'}>사고 이력은 보험 개발원 (02-368-4000) 에서 확인 가능하며, 교통법규위반 이력은 경찰청 교통 민원 24
                    <br/>(https://www.efine.go.kr/main/main.do)을 통해 조회 가능합니다.</div>,
            },
        ],
        travel: [
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>보험료 결제 전인데, 인원 및 일정 변동이 있습니다. 새로 신청해야 할까요?</div>,
                content: <div className={'text-lg'}>변경된 정보로 새로 접수 해주셔야 합니다. 새로 접수 후 기존 접수 건 취소를 위해 당사로 연락 주셔야 하는 점 참고 부탁 드립니다.
                    <br/>(영업일 기준 여행시작 1일 전 오후3시 이전까지 접수 가능)</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>보험료 결제 완료 했는데, 인원 및 일정 변동이 있습니다. 새로 신청해야 할까요?</div>,
                content: <div className={'text-lg'}>변경된 정보로 새로 접수 해주셔야 합니다. 새로 접수 후 해지 및 결제 취소를 위해 당사로 꼭 연락 주셔야 하는 점 참고 부탁 드립니다.
                    <br/>(영업일 기준 여행시작 1일 전 오후3시 이전까지 가능)</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>신청한 인원과 청약서 내 인원이 다릅니다.</div>,
                content: <div className={'text-lg'}>청약서 내에 최대 150명까지 가입이 가능합니다. 150명 이상의 인원일 경우 인원이 150명 단위로 나눠져 발송되기에 꼭 모든 서류를 확인 부탁드립니다.
                    <br/>150명 이하일 경우 2~3페이지로 인원에 대한 내용이 이어지니 한 번 더 확인 부탁드립니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>신청이 제대로 됐는지 확인하고 싶어요.</div>,
                content: <div className={'text-lg'}>신청 완료시 입력해주신 메일주소로 안내메일이 자동발송되며, 신청 이후 진행내용에 대해 부분은 안내메일을 참고해주세요.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>결제는 어떻게 하나요.</div>,
                content: <div className={'text-lg'}>입금: 청약서 1페이지 상단에 가상계좌 번호 확인 후 입금해주시면 됩니다.
                    <br/>카드결제: 카드번호와 유효기간을 유선 또는 청약서를 보내주시는 메일에 함께써서 보내주시면 됩니다.(사업자번호와 일치하는 법인카드만 결제가능)</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>거래명세서 또는 현금영수증 발행요청.</div>,
                content: <div className={'text-lg'}>보험은 면세사업으로 해당 서류에 대한 발행이 불가합니다.
                    <br/>(제공 가능 서류: 사업자등록증, 계좌확인증, 보험료영수증, 카드전표, 증권)</div>,
            },
        ],
        field: [
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>이미 실습 진행 중인데 보험 가입 가능한가요?</div>,
                content: <div className={'text-lg'}>실습 진행 중에도 보험가입 가능합니다. 신청 시 현재까지 사고가 없었음을 확인하는 무사고 확인서를 메일로 보내드립니다. 무사고확인서에도 직인 날인하여 필요서류들과 같이 회신주시면 됩니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>학생이 실습을 포기했는데 환급 가능한가요?</div>,
                content: <div className={'text-lg'}>보험 시작 전은 취소 가능하지만 이미 실습 시작한 이후 학생의 단순변심으로 인한 계약 취소는 불가합니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>인원수, 보험기간에 변동이 생겼는데 수정 가능한가요?</div>,
                content: <div className={'text-lg'}>인원수 증감, 보험기간 연장 등 이미 증권이 발급되었어도  변경 가능합니다. 변경을 위해 배서 신청서와 사업자등록증, 추가금 결제/환급받을 통장사본이 필요합니다.
                    <br/>단, 보험 기간 중에 인원 증가는 가능하나 감소는 불가합니다.</div>,
            },
            {
                title: <div className={'text-xl'}><span className={'text-xl font-medium text-m-bluegray mr-2'}>Q</span>보험금 청구는 어떻게 하나요?</div>,
                content: <div className={'text-lg'}>보험금 청구 시 필요서류를 메일로 안내해드립니다. 필요서류를 준비하여 회신 주시면 보험금 청구 접수를 도와드리겠습니다.</div>,
            },
        ],
    };
    return (
        <main className={'my-8 mt-[140px]'}>
            <div className="max-w-7xl mx-auto px-5">
                <FadeInSection>
                    <div className="text-4xl font-medium mb-10">자주 묻는 질문</div>
                </FadeInSection>
                <FadeInSection>
                    <Tab
                        options={tabOptions}
                        onTabChange={setCurrentTab}
                        initialTab="recruit"
                    />
                </FadeInSection>
                <FadeInSection>
                    <div className="mt-8">
                        <Accordion
                            items={faqContent[currentTab as keyof typeof faqContent].map(item => ({
                                title: item.title,
                                content: item.content
                            }))}
                        />
                    </div>
                </FadeInSection>
            </div>
        </main>
    );
};

export default FaqPage;