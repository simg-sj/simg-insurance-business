import Button from "../ui/button";
import React, {useState} from "react";
import Modal from "@/components/ui/modal";
import {useForm} from "react-hook-form";
import { CheckboxState, ConsultingFormData } from '@/@types/common';
import PrivacyCollectionPolicy from "@/components/contents/collect";
import PrivacyProvisionPolicy from "@/components/contents/provision";
import MarketingPolicy from "@/components/contents/marketing";

const PolicyComponents = {
    collect: PrivacyCollectionPolicy,
    provision: PrivacyProvisionPolicy,
    marketing: MarketingPolicy
};

const MODAL_TITLES = {
    collect: '개인정보 수집 및 이용에 대한 동의',
    provision: '개인정보 제3자 제공에 대한 동의',
    marketing: '광고성 정보 수신에 대한 동의'
} as const;

type PolicyType = keyof typeof MODAL_TITLES;

const ConsultingTab = () => {
    const [activeTab, setActiveTab] = useState<'개인' | '기업'>('개인');
    const [step, setStep] = useState<'form' | 'input' | 'privacy'>('form');
    const [privacyError, setPrivacyError] = useState<string>('');
    const [checkboxes, setCheckboxes] = useState<CheckboxState>({
        all: false,
        collect: false,
        provision: false,
        marketing: false,
    });
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        type: PolicyType | null;
    }>({
        isOpen: false,
        type: null,
    });
    const {register, handleSubmit, formState: {errors}, reset, watch, trigger} = useForm<ConsultingFormData>({
        defaultValues: {
            inquiry: '', //문의사항
            insuranceType: '', //보험종류
            companyName: '', //기업명
            name: '', //성함
            phone: '', //연락처
        }
    });

    //개인정보 관련 자세히보기 팝업
    const handleDetailView = (type: PolicyType) => {
        setModalState({isOpen: true, type});
    };
    const closeModal = () => {
        setModalState({isOpen: false, type: null});
    };

    //form 내용 리셋
    const resetForm = () => {
        setStep('form');
        reset();
        setCheckboxes({
            all: false,
            collect: false,
            provision: false,
            marketing: false,
        });
    };

    //뒤로가기버튼
    const handleBack = () => {
        if (step === 'input') {
            setStep('form');
        } else if (step === 'privacy') {
            setStep('input');
        }
    };

    //개인정보동의 전체 체크박스
    const handleCheckboxChange = (name: keyof CheckboxState) => {
        setPrivacyError('');
        if (name === 'all') {
            const newValue = !checkboxes.all;
            setCheckboxes({
                all: newValue,
                collect: newValue,
                provision: newValue,
                marketing: newValue,
            });
        } else {
            const newCheckboxes = {
                ...checkboxes,
                [name]: !checkboxes[name],
            };
            setCheckboxes({
                ...newCheckboxes,
                all: newCheckboxes.collect && newCheckboxes.marketing && newCheckboxes.provision,
            });
        }
    };

    //제출하기
    const onSubmit = (data: ConsultingFormData) => {
        if (!checkboxes.collect || !checkboxes.provision) {
            setPrivacyError('필수 개인정보에 동의해주세요');
            return;
        }

        if (window.confirm('상담신청을 제출하시겠습니까? 제출 후 수정이 불가능합니다')) {
            console.log('제출된 상담 정보:', {
                type: activeTab,
                ...data,
                collect: checkboxes.collect,
                provision: checkboxes.provision,
                marketing: checkboxes.marketing
            });
            window.alert('상담신청이 제출되었습니다. 영업일기준 3일이내 기입하신 연락처로 상담이 진행됩니다.')
            resetForm();
        }
    };

    const handleTabChange = (tab: '개인' | '기업') => {
        setActiveTab(tab);
        resetForm();
    };


    const handleNextStep = async () => {
        if (step === 'form') {
            const isValid = await trigger('inquiry');
            if (isValid) {
                setStep('input');
            }
        } else if (step === 'input') {
            const fieldsToValidate = activeTab === '개인'
                ? ['insuranceType', 'name', 'phone'] as const
                : ['companyName', 'name', 'phone'] as const;

            const isValid = await trigger(fieldsToValidate);
            if (isValid) {
                setStep('privacy');
            }
        }
    };

    return (
        <div className="tabWidth w-[500px] bg-white rounded-xl shadow-md">
            <div className="flex mb-4">
                <button
                    className={`flex-1 py-2 rounded-tl-xl text-xl ${activeTab === '개인' ? 'bg-white text-black' : 'bg-gray-50 text-gray-500'}`}
                    onClick={() => handleTabChange('개인')}
                >
                    개인
                </button>
                <button
                    className={`flex-1 py-2 rounded-tr-xl py-3 text-xl ${activeTab === '기업' ? 'bg-white text-black' : 'bg-gray-50 text-gray-500'}`}
                    onClick={() => handleTabChange('기업')}
                >
                    단체
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 min-h-[320px]">
                {step === 'form' && (
                    <>
                        <div className="mb-4">
                            <h2 className="text-2xl font-medium mb-2 flex items-center">
                                {activeTab === '개인' ? '1:1 맞춤 컨설팅을 찾으시나요?' : '단체 및 기업보험을 찾으시나요?'}
                            </h2>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-lg mb-3 text-gray-800">문의사항</div>
                            <textarea
                                className="w-full h-[115px] resize-none overflow-y-auto mb-5"
                                {...register('inquiry', {required: true})}
                            />
                            {errors.inquiry && (
                                <div className="text-red-500">문의사항을 입력해주세요</div>
                            )}
                            <Button
                                fill={true}
                                autoFocus={false}
                                color="blue"
                                width={450}
                                height={50}
                                className="text-xl mt-5 tabButton"
                                onClick={handleNextStep}
                                type="button"
                            >
                                상담정보 입력하기
                            </Button>
                        </div>
                    </>
                )}

                {step === 'input' && (
                    <>
                        <div className="mb-4">
                            <h2 className="text-2xl font-medium mb-2">
                                {activeTab === '개인' ? '1:1 맞춤 컨설팅 ' : '단체 및 기업보험 '}
                                상담정보를 입력해주세요
                            </h2>
                        </div>
                        <div className="flex flex-col">
                            {activeTab === '개인' ? (
                                <div className="flex items-center mt-3 tabM">
                                    <div className="w-[170px] text-lg">맞춤보험</div>
                                    <select
                                        className="w-[calc(100%-170px)] h-[40px]"
                                        {...register('insuranceType', {required: true})}
                                    >
                                        <option value="">보험종류를 선택해주세요</option>
                                        <option value="여행자보험">여행자보험</option>
                                        <option value="자동차보험">자동차보험</option>
                                        <option value="화재보험">화재보험</option>
                                        <option value="배상책임보험">배상책임보험</option>
                                        <option value="상해보험">상해보험</option>
                                        <option value="기타">기타</option>
                                    </select>
                                </div>
                            ) : (
                                <div className="flex items-center mt-3 tabM">
                                    <div className="w-[170px] text-lg">업체명</div>
                                    <input
                                        type="text"
                                        className="w-[calc(100%-170px)] h-[40px]"
                                        {...register('companyName', {required: true})}
                                    />
                                </div>
                            )}
                            <div className="flex items-center mt-3 tabM">
                                <div className="w-[170px] text-lg">{activeTab === '개인' ? '성함' : '담당자'}</div>
                                <input
                                    type="text"
                                    className="w-[calc(100%-170px)] h-[40px]"
                                    {...register('name', {required: true})}
                                />
                            </div>
                            <div className="flex items-center mt-3 mb-5 tabM">
                                <div className="w-[170px] text-lg">연락처</div>
                                <input
                                    type="number"
                                    className="w-[calc(100%-170px)] h-[40px]"
                                    {...register('phone', {required: true})}
                                />
                            </div>
                            {(errors.insuranceType || errors.companyName || errors.name || errors.phone) && (
                                <span className="text-red-500">필수입력사항을 입력해주세요</span>
                            )}
                            <div className="flex space-x-2 tabButtonGroup">
                                <Button
                                    fill={true}
                                    autoFocus={false}
                                    color="lightgray"
                                    width={220}
                                    height={50}
                                    className="mt-5 text-xl"
                                    onClick={handleBack}
                                    type="button"
                                >
                                    뒤로가기
                                </Button>
                                <Button
                                    fill={true}
                                    autoFocus={false}
                                    color="blue"
                                    width={220}
                                    height={50}
                                    className="mt-5 text-xl"
                                    onClick={handleNextStep}
                                    type="button"
                                >
                                    다음
                                </Button>
                            </div>
                        </div>
                    </>
                )}

                {step === 'privacy' && (
                    <>
                        <div className="mb-4">
                            <h2 className="text-2xl font-medium mb-2">개인정보 수집 및 이용 동의</h2>
                        </div>
                        <div className="flex flex-col">
                            <div className="mt-3 mb-5">
                                <label className="flex items-center mb-3">
                                    <input
                                        type="checkbox"
                                        className="mr-3 w-4"
                                        checked={checkboxes.all}
                                        onChange={() => handleCheckboxChange('all')}
                                    />
                                    <div className="text-lg">개인정보 활용 전체 동의하기</div>
                                </label>
                                <div className="flex items-start justify-between mt-1">
                                    <label className="flex items-start">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-4 h-6"
                                            checked={checkboxes.collect}
                                            onChange={() => handleCheckboxChange('collect')}
                                        />
                                        <div className="text-gray-700">
                                            <span className="text-black">(필수)</span> 개인정보 수집 및 이용에 대한 동의
                                        </div>
                                    </label>
                                    <button
                                        type="button"
                                        className="border border-gray-300 px-3 py-0.5 rounded-lg text-sm min-w-[90px]"
                                        onClick={() => handleDetailView('collect')}
                                    >
                                        자세히보기
                                    </button>
                                </div>
                                <div className="flex items-start justify-between mt-1">
                                    <label className="flex items-start">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-4 h-6"
                                            checked={checkboxes.provision}
                                            onChange={() => handleCheckboxChange('provision')}
                                        />
                                        <div className="text-gray-700">
                                            <span className="text-black">(필수)</span> 개인정보 제 3자 제공에 대한 동의
                                        </div>
                                    </label>
                                    <button
                                        type="button"
                                        className="border border-gray-300 px-3 py-0.5 rounded-lg text-sm min-w-[90px]"
                                        onClick={() => handleDetailView('provision')}
                                    >
                                        자세히보기
                                    </button>
                                </div>
                                <div className="flex items-start justify-between mt-1">
                                    <label className="flex items-start">
                                        <input
                                            type="checkbox"
                                            className="mr-3 w-4 h-6"
                                            checked={checkboxes.marketing}
                                            onChange={() => handleCheckboxChange('marketing')}
                                        />
                                        <div className="text-gray-700">
                                            <span className="text-black">(선택)</span> 광고성 정보 수신에 대한 동의
                                        </div>
                                    </label>
                                    <button
                                        type="button"
                                        className="border border-gray-300 px-3 py-0.5 rounded-lg text-sm min-w-[90px]"
                                        onClick={() => handleDetailView('marketing')}
                                    >
                                        자세히보기
                                    </button>
                                </div>
                            </div>
                            {privacyError && (
                                <span className="text-red-500">{privacyError}</span>
                            )}
                            <div className="flex space-x-2 tabButtonGroup mt-4">
                                <Button
                                    fill={true}
                                    autoFocus={false}
                                    color="lightgray"
                                    width={220}
                                    height={50}
                                    className="mt-5 text-xl"
                                    onClick={handleBack}
                                    type="button"
                                >
                                    뒤로가기
                                </Button>
                                <Button
                                    fill={true}
                                    autoFocus={false}
                                    color="blue"
                                    width={220}
                                    height={50}
                                    className="mt-5 text-xl"
                                    type="submit"
                                >
                                    제출하기
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </form>
            {modalState.isOpen && modalState.type && (
                <Modal
                    isOpen={modalState.isOpen}
                    onClose={closeModal}
                    title={MODAL_TITLES[modalState.type]}
                >
                    {React.createElement(PolicyComponents[modalState.type])}
                </Modal>
            )}
        </div>
    );
};

export default ConsultingTab;