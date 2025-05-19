'use client';
import Image from "next/image";
import Back from "@/assets/images/icon-arrow-white.png";
import React, {useEffect, useRef, useState} from 'react';
import DeleteIcon from "@/assets/images/icon-delete.png";
import CustomSelect from "@/components/ui/select";
import clsx from "clsx";
import DatePickerPopup from "@/components/ui/datepicker";
import Tooltip from "@/components/ui/tooltip";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import PopupSlide from "@/components/ui/popup-slide";
import InputField from "@/components/ui/input-field";
import {config} from "@/config";
import { handleRedirectWithParams } from "@/urils/pageRouterUtil"; /* 페이지 router 처리 유틸 */

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {


    //링크이동
    const router = useRouter();
    const pathname = usePathname();

    //파라미터불러오기
    const params = useSearchParams();
    const insuCompany = params.get('insuCompany');
    const plfNumber = params.get('plfNumber');
    const theme = config[insuCompany || 'hyundai'];
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

    //사용자 입력 휴대폰번호 불러오기
    const phoneParam = useSearchParams();
    const verifiedPhone = phoneParam.get("phone");

    //사용자 입력사항 정보 확인 팝업
    const [popupOpen, setPopupOpen] = useState(false);
    const handleOpenPopup = () => setPopupOpen(true);
    const handleClosePopup = () => setPopupOpen(false);

    // 선택옵션
    const REGIONS = ["서울", "부산", "인천", "대구", "세종", "울산", "광주", "대전", "경기", "강원", "경북", "경남", "충북", "전남", "충남", "전북", "제주"];
    const MARKS = ["가","거","나","너","다","더","라","러","마","머","바","버","사","서","아","어","자","저","차","처","카","커","타","터","파","퍼","하","허"];
    const REGION_CITIES: Record<string, string[]> = {
        "서울": ['강남', '강동', '강북', '강서', '관악', '광진', '구로', '노원', '금천', '도봉', '동대문', '동작', '마포', '서대문', '서초', '성동', '성북', '송파', '양천', '영등포', '용산', '은평', '종로', '중', '중랑'],
        "부산": ['강서', '금정', '기장', '남', '동', '동래', '부산진', '북', '사상', '사하', '서', '수영', '연제', '영도', '중', '해운대'],
        "인천": ['강화', '계양', '남', '남동', '동', '미추홀', '부평', '서', '연수', '옹진', '중'],
        "대구": ['남', '달서', '달성', '동', '북', '서', '수성', '중'],
        "세종": ['세종'],
        "광주": ['광산', '남', '동', '북', '서'],
        "대전": ['대덕', '동', '서', '유성', '중'],
        "울산": ['남', '동', '북', '울주', '중'],
        "경기": ['가평', '고양', '과천', '광명', '광주', '구리', '군포', '김포', '양주', '남양주', '동두천', '부천', '성남', '수원', '시흥', '안산', '안성', '안양', '양주', '양평', '여주', '연천', '오산', '용인', '의왕', '의정부', '이천', '파주', '평택', '포천', '하남', '화성'],
        "강원": ['강릉', '고성', '동해', '삼척', '속초', '양구', '양양', '영월', '원주', '인제', '정선', '철원', '춘천', '태백', '평창', '홍천', '화천', '횡성'],
        "경북": ['경산', '경주', '고령', '구미', '군위', '김천', '문경', '봉화', '상주', '성주', '안동', '영덕', '영양', '영주', '영천', '예천', '울릉', '울진', '의성', '청도', '청송', '칠곡', '포항'],
        "경남": ['거제', '거창', '고성', '김해', '남해', '밀양', '사천', '산청', '양산', '의령', '진주', '창녕', '창원', '통영', '하동', '함안', '함양', '합천', '괴산', '단양', '보은', '영동', '옥천', '음성', '제천', '증평', '진천', '청원', '청주', '충주'],
        "충북": ['괴산', '단양', '보은', '영동', '옥천', '음성', '제천', '증평', '진천', '청원', '청주', '충주'],
        "전남": ['강진', '고흥', '곡성', '광양', '구례', '나주', '담양', '목포', '무안', '보성', '순천', '신안', '여수', '영광', '영암', '완도', '장성', '장흥', '진도', '함평', '해남', '화순'],
        "충남": ['계룡', '공주', '금산', '논산', '당진', '보령', '부여', '서산', '서천', '아산', '연기', '예산', '천안', '청양', '태안', '홍성'],
        "전북": ['고창', '군산', '김제', '남원', '무주', '부안', '순창', '완주', '익산', '임실', '장수', '전주', '정읍', '진안'],
        "제주": ['제주', '서귀포']
    };
    const [cities, setCities] = useState<string[]>([]);

    // 포커스 관리
    const [focusedField, setFocusedField] = useState<string | null>(null);

    /* // 전문 예시 ::
       {
           "gubun":"planagree",
           "name":"박정기",
           "cell1":"010",
           "cell2":"2918",
           "cell3":"9126",
           "jumin1":"830308",
           "jumin2":"1095919",
           "carType":"402",
           "carNum":"경남거제타1702",
           "dambo":"",
           "jachaMangi":"2023-04-30",
           "soyuja":"bonin",
           "relation":"101",
           "soyujaName":"",
           "soyujaCell1":"",
           "soyujaCell2":"",
           "soyujaCell3":"",
           "soyujaJumin1":"",
           "soyujaJumin2":"",
           "checkKey":"93604C5065704BDF815A2ECE825F55B5" // 사용안함
         }
         *본인 외 선택시 관계 선택하지 않은 경우 alert 필요
         relation 코드
           - 본인 : 00
           - 배우자 : 01
           - 배우자부모 : 02
           - 부모 : 03
           - 자녀 : 04
           - 형제자매 : 05
           - 사위/며느리 : 06
           - 기타가족or타인 : 99
        */
    // 필드 값 관리
    const [formValues, setFormValues] = useState({
        name: "",
        cell: verifiedPhone,
        residentFront: "",
        residentBack: "",
        region: "",
        city: "",
        mark: "",
        serial: "",
        expiryDate: undefined as Date | undefined,
        ownership: '본인' as '본인' | '본인외',
        usage: '가정용' as '가정용' | '비유상용'
    });

    // 에러 관리
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    // refs 관리
    const inputRefs = {
        name: useRef<HTMLInputElement>(null),
        residentFront: useRef<HTMLInputElement>(null),
        residentBack: useRef<HTMLInputElement>(null),
        serial: useRef<HTMLInputElement>(null),
        expiryDate: useRef<HTMLInputElement>(null)
    };

    // 유효성 검사
    //note. 유효성검사 추가 및 수정
    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};

        // 이름 검증: 빈 값, 특수문자, 숫자 검사
        if (!formValues.name.trim()) {
            newErrors.name = "이름을 입력해주세요";
        } else if (/[~!@#$%^&*()_+|<>?:{}0-9]/g.test(formValues.name)) {
            newErrors.name = "이름에 특수문자나 숫자는 사용할 수 없습니다";
        }

        // 주민등록번호 앞자리 검증
        if (!formValues.residentFront || formValues.residentFront.length !== 6) {
            newErrors.residentFront = "앞 6자리를 정확히 입력해주세요";
        } else if (!/^\d{6}$/.test(formValues.residentFront)) {
            newErrors.residentFront = "주민번호 앞자리는 숫자 6자리여야 합니다";
        }

        // 주민등록번호 뒷자리 검증
        if (!formValues.residentBack || formValues.residentBack.length !== 7) {
            newErrors.residentBack = "뒷 7자리를 정확히 입력해주세요";
        } else if (!/^\d{7}$/.test(formValues.residentBack)) {
            newErrors.residentBack = "주민번호 뒷자리는 숫자 7자리여야 합니다";
        }

        // 오토바이 정보 검증
        if (!formValues.region) newErrors.region = "지역을 선택해주세요";
        if (!formValues.city) newErrors.city = "시/군을 선택해주세요";
        if (!formValues.mark) newErrors.mark = "기호를 선택해주세요";

        // 일련번호 검증
        if (!formValues.serial || formValues.serial.length !== 4) {
            newErrors.serial = "일련번호를 입력해주세요";
        } else if (!/^\d{4}$/.test(formValues.serial)) {
            newErrors.serial = "일련번호는 숫자 4자리여야 합니다";
        }

        // 만기일 검증
        if (!formValues.expiryDate) {
            newErrors.expiryDate = "보험 만기일을 선택해주세요";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 폼 제출 처리
    const handleSubmit = () => {
        setFormSubmitted(true);
        // 현재 폼 데이터 콘솔 출력 (제출된 데이터)
        console.log("폼 제출 데이터: ", formValues);

        if (validateForm()) {
            // 폼이 유효하 정보확인 팝업
            handleOpenPopup();
        } else {
            // 유효폼 아닐경우 첫 번째 에러 필드로 포커스 이동
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField && inputRefs[firstErrorField as keyof typeof inputRefs]?.current) {
                inputRefs[firstErrorField as keyof typeof inputRefs].current?.focus();
            }
        }
    };

    const handleRequest = (data:any) =>{
        console.log('handleRequest : ', data);
        console.log('handleRequest.name : ', data.name);


        //..하다말았음
        // 요청성공하면 화면 이동 ~
        // handlerRedirect('success');
    }

    // 입력 값 업데이트 핸들러
    const updateFormValue = (field: string, value: any) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
        if (formSubmitted) {
            // 입력 시 해당 필드의 에러 제거
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    // 입력 필드 초기화 핸들러
    const clearField = (field: string) => {
        setFormValues(prev => ({ ...prev, [field]: "" }));
        if (inputRefs[field as keyof typeof inputRefs]?.current) {
            inputRefs[field as keyof typeof inputRefs].current?.focus();
        }
    };

    //이름 특수문자 띄어쓰기 제외 최대 10자리
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z]/g, "").slice(0, 10);

        updateFormValue("name", value);
    }

    // 주민번호 앞자리 입력 후 자동 포커스 이동 숫자만 최대 6
    const handleResidentFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);

        updateFormValue('residentFront', value);

        if (value.length === 6 && inputRefs.residentBack.current) {
            inputRefs.residentBack.current.focus();
        }
    };

    // 주민번호 뒷자리 입력 후 자동 지역 선택으로 이동 숫자만 최대 7
    const handleResidentBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 7);

        updateFormValue('residentBack', value);

        if (value.length === 7) {
            setFocusedField('region');
        }
    };

    // 일련번호 입력 후 자동 만기일 선택으로 이동 숫자만 최대 4
    const handleSerialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);

        // 4자리로 제한
        if (value.length <= 4) {
            updateFormValue('serial', value);

            if (value.length === 4) {
                setFocusedField('expiryDate');
            }
        }
    };

    // 각 필드 선택 후 자동 다음 단계 이동
    const handleRegionSelect = (value: string) => {
        updateFormValue('region', value);
        setCities(REGION_CITIES[value] || []); // 선택한 지역에 해당하는 시/군 목록 설정
        setFormValues((prev) => ({ ...prev, city: "" })); // 시/군 필드 초기화
        setFocusedField('city');
    };

    const handleCitySelect = (value: string) => {
        updateFormValue('city', value);
        setFocusedField('mark');
    };

    const handleMarkSelect = (value: string) => {
        updateFormValue('mark', value);
        setFocusedField('serial');
        setTimeout(() => {
            inputRefs.serial.current?.focus();
        }, 100);
    };

    // 폼의 모든 필수 필드가 입력되었는지 확인
    const isFormComplete = () => {
        return (
            formValues.name &&
            formValues.residentFront.length === 6 &&
            formValues.residentBack.length === 7 &&
            formValues.region &&
            formValues.city &&
            formValues.mark &&
            formValues.serial.length === 4 &&
            formValues.expiryDate !== undefined
        );
    };

    // 페이지 로드 시 이름 입력란에 포커스
    useEffect(() => {
        if (inputRefs.name.current) {
            inputRefs.name.current.focus();
        }
    }, []);

    // 주민등록번호 필드 렌더링
    const renderResidentNumberField = () => {
        const hasErrorFront = errors.residentFront && formSubmitted;
        const hasErrorBack = errors.residentBack && formSubmitted;
        const hasError = hasErrorFront || hasErrorBack;

        return (
            <div
                className={clsx(
                    'input-box',
                    focusedField === 'residentFront' || focusedField === 'residentBack' ? 'border-main border-2' :
                        hasError ? 'border-red-500 border-2' : 'border-gray-200'
                )}
            >
                <div className="flex-between mb-2">
                    <label htmlFor="resident-number" className="text-base text-gray-700">
                        주민등록번호
                    </label>
                    {hasError && (
                        <div className="text-red-500 text-sm mb-1">
                            {errors.residentFront || errors.residentBack}
                        </div>
                    )}
                </div>
                <div className="flex-between text-gray-700">
                    {/* 주민등록번호 앞자리 */}
                    <div className="relative flex-1">
                        <input
                            id="resident-number-front"
                            type="text"
                            placeholder="앞자리"
                            value={formValues.residentFront}
                            onChange={handleResidentFrontChange}
                            ref={inputRefs.residentFront}
                            className="w-full outline-none border-0 text-xl bg-white"
                            onFocus={() => setFocusedField('residentFront')}
                            onBlur={() => setFocusedField(null)}
                            inputMode="numeric" // 모바일에서 숫자 키패드 표시
                            maxLength={6}
                        />
                        {formValues.residentFront && (
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                                <Image
                                    src={DeleteIcon}
                                    alt="삭제"
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                    onClick={() => clearField('residentFront')}
                                />
                            </div>
                        )}
                    </div>
                    <span className="px-5 text-xl">-</span>
                    {/* 주민등록번호 뒷자리 */}
                    <div className="relative flex-1">
                        <input
                            id="resident-number-back"
                            type="text"
                            placeholder="뒷자리"
                            value={formValues.residentBack}
                            onChange={handleResidentBackChange}
                            ref={inputRefs.residentBack}
                            className="w-full outline-none border-0 text-xl bg-white"
                            onFocus={() => setFocusedField('residentBack')}
                            onBlur={() => setFocusedField(null)}
                            inputMode="numeric" // 모바일에서 숫자 키패드 표시
                            maxLength={7}
                        />
                        {formValues.residentBack && (
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                                <Image
                                    src={DeleteIcon}
                                    alt="삭제"
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                    onClick={() => clearField('residentBack')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // 선택 필드 렌더링
    const renderSelectField = (
        label: string,
        placeholder: string,
        options: string[],
        value: string,
        fieldName: string,
        onSelect: (value: string) => void,
        title: string
    ) => {
        const hasError = errors[fieldName] && formSubmitted;

        return (
            <div
                className={clsx(
                    'input-box',
                    focusedField === fieldName ? 'border-main border-2' :
                        hasError ? 'border-red-500 border-2' : 'border-gray-200'
                )}
            >
                <div className="flex-between mb-2">
                    <label className="text-base text-gray-700">{label}</label>
                    {hasError && (
                        <div className="text-red-500 text-sm mb-1">{errors[fieldName]}</div>
                    )}
                </div>
                <CustomSelect
                    options={options}
                    placeholder={placeholder}
                    title={title}
                    value={value}
                    onSelect={onSelect}
                    onOpen={() => setFocusedField(fieldName)}
                    onClose={() => setFocusedField(null)}
                />
            </div>
        );
    };

    // 라디오 버튼 그룹 렌더링
    const renderRadioGroup = (
        label: string,
        description: string,
        value: string,
        options: [string, string],
        onChange: (value: any) => void,
        tipContents: string
    ) => {
        return (
            <div className="input-box border-gray-200">
                <div className="flex items-center mb-1">
                    <label className="text-base text-gray-700">{label}</label>
                    <Tooltip content={tipContents}></Tooltip>
                </div>
                <div className="text-sm text-main mb-2">
                    {description}
                </div>
                <div className="w-full text-xl flex-between">
                    <button
                        type="button"
                        className={clsx(
                            'radio-select rounded-bl-lg rounded-tl-lg',
                            value === options[0]
                                ? 'bg-main text-white'
                                : 'bg-gray-100 text-gray-300'
                        )}
                        onClick={() => onChange(options[0])}
                    >
                        {options[0]}
                    </button>
                    <button
                        type="button"
                        className={clsx(
                            'radio-select rounded-br-lg rounded-tr-lg',
                            value === options[1]
                                ? 'bg-main text-white'
                                : 'bg-gray-100 text-gray-300'
                        )}
                        onClick={() => onChange(options[1])}
                    >
                        {options[1]}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div>
                <header className="header">

                    <Image src={Back} alt="뒤로가기" width={20} height={20} className="icon-back" onClick={() => router.back()}/>
                    <Image src={theme.logo} alt={`${theme.insuCompany} 로고`} width={200} height={100} className={'logo-main'}/>
                </header>
                <section className="section mb-28">
                    <div className="text-style1 mb-2">보험심사 신청을 위한</div>
                    <div className="text-style1 mb-12">가입정보를 입력해주세요</div>
                    <div className="space-y-4">
                        {/* 휴대폰번호 */}
                        <div className="input-box border-gray-200 bg-gray-100">
                            <div className="flex-between mb-2">
                                <label htmlFor="phone" className="text-base text-gray-700">휴대폰번호</label>
                            </div>
                            <div className="flex-between text-gray-500">
                                <input
                                    id="phone"
                                    type="text"
                                    value={verifiedPhone || "인증된 휴대폰번호가 없습니다"}
                                    disabled={true}
                                    className="w-full outline-none border-0 text-xl bg-gray-100"
                                />
                            </div>
                        </div>
                        {/*이름*/}
                        <InputField
                            id="name"
                            label="이름"
                            placeholder="이름 입력"
                            value={formValues.name}
                            fieldName="name"
                            error={errors.name}
                            formSubmitted={formSubmitted}
                            focused={focusedField === 'name'}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            onChange={handleNameChange}
                            clearField={() => clearField("name")}
                            inputRef={inputRefs.name}
                        />
                        {/* 주민등록번호 */}
                        {renderResidentNumberField()}

                        {/* 오토바이 정보 - 지역/시군 */}
                        <div className="flex-between space-x-2">
                            {/* 지역 */}
                            <div className="w-1/2">
                                {renderSelectField(
                                    '오토바이번호 (지역)',
                                    '지역 선택',
                                    REGIONS,
                                    formValues.region,
                                    'region',
                                    handleRegionSelect,
                                    '오토바이번호 지역을 선택하세요'
                                )}
                            </div>

                            {/* 시/군 */}
                            <div className="w-1/2">
                                {renderSelectField(
                                    '오토바이번호 (시/군)',
                                    '시/군 선택',
                                    cities,
                                    formValues.city,
                                    'city',
                                    handleCitySelect,
                                    '오토바이번호 시/군을 선택하세요'
                                )}
                            </div>
                        </div>

                        {/* 오토바이 정보 - 기호/일련번호 */}
                        <div className="flex-between space-x-2">
                            {/* 기호 */}
                            <div className="w-1/2">
                                {renderSelectField(
                                    '오토바이번호 (기호)',
                                    '기호 선택',
                                    MARKS,
                                    formValues.mark,
                                    'mark',
                                    handleMarkSelect,
                                    '오토바이번호 기호를 선택하세요'
                                )}
                            </div>

                            {/* 일련번호 */}
                            <div className="w-1/2">
                                <InputField
                                    id="motorcycle-serial"
                                    label="오토바이 일련번호"
                                    placeholder="일련번호입력"
                                    value={formValues.serial}
                                    fieldName="serial"
                                    error={errors.serial}
                                    formSubmitted={formSubmitted}
                                    focused={focusedField === 'serial'}
                                    onFocus={() => setFocusedField('serial')}
                                    onBlur={() => setFocusedField(null)}
                                    onChange={handleSerialChange}
                                    clearField={() => clearField("serial")}
                                    inputRef={inputRefs.serial}
                                    type="number"
                                    maxLength={4}
                                />
                            </div>
                        </div>

                        {/* 보험 만기일 */}
                        <div
                            className={clsx(
                                'input-box',
                                focusedField === 'expiryDate' ? 'border-main border-2' :
                                    errors.expiryDate && formSubmitted ? 'border-red-500 border-2' : 'border-gray-200'
                            )}
                        >
                            <div className="flex-between mb-2">
                                <label htmlFor="expiryDate" className="text-base text-gray-700">오토바이 보험 만기일</label>
                                {errors.expiryDate && formSubmitted && (
                                    <div className="text-red-500 text-sm mb-1">{errors.expiryDate}</div>
                                )}
                            </div>
                            <DatePickerPopup
                                value={formValues.expiryDate}
                                onChange={(date) => updateFormValue('expiryDate', date)}
                                title="오토바이보험 만기일을 선택하세요"
                                onOpen={() => setFocusedField('expiryDate')}
                                onClose={() => setFocusedField(null)}
                                ref={inputRefs.expiryDate}
                            />
                        </div>

                        {/* 용도 라디오 그룹 */}
                        {renderRadioGroup(
                            '가입신청 오토바이의 책임보험의 용도',
                            '* 책임보험의 용도가 유상용으로 확인될 경우 시간제보험의 가입에 제한됩니다.',
                            formValues.usage,
                            ['가정용', '비유상용'],
                            (value) => updateFormValue('usage', value),
                            "개인 이륜차보험의 용도가 가정용, 비유상용만 보험가입이 가능합니다."
                        )}

                        {/* 소유자 라디오 그룹 */}
                        {plfNumberData.flag.showOwnershipField && renderRadioGroup(
                            '가입신청 오토바이의 소유자',
                            '* 신청하시려는 운전자의 가정용 책임보험의 "기명 피보험자"가 운전자와 같다면 본인, 다르면 본인외를 선택해주시기 바랍니다.',
                            formValues.ownership,
                            ['본인', '본인외'],
                            (value) => updateFormValue('ownership', value),
                            "신청하시려는 운전자의 가정용 책임보험의 '기명 피보험자'가 운전자와 같다면 본인, 다르면 본인외를 선택해주시기 바랍니다."
                        )}
                    </div>
                </section>
                <footer
                    className="footer-container">
                    <button
                        className={clsx(
                            'btn-base text-white w-full',
                            isFormComplete() ? 'bg-main' : 'bg-main-lighter'
                        )}
                        onClick={handleSubmit}
                    >
                        심사 신청하기
                    </button>
                </footer>

                {/*사용자 정보확인 팝업*/}
                <PopupSlide
                    isOpen={popupOpen}
                    onClose={handleClosePopup}
                    buttons={[
                        {
                            label: "아니오, 다시입력",
                            className: "bg-gray-100 text-gray-700",
                            onClick: () => {
                                handleClosePopup();
                            },
                        },
                        {
                            label: "네, 맞아요",
                            className: "bg-main text-white",
                            onClick: () => {
                                // console.log("폼 제출 성공:", formValues);
                                // handleClosePopup();
                                // router.push(`/${pathname.split("/")[1]}/success?insuCompany=${insuCompany}&plfNumber=${plfNumber}`);

                                handleRequest(formValues);
                            },
                        },
                    ]}
                >
                    <div className="text-popup mb-4">
                        "{formValues.region + formValues.city + formValues.mark + formValues.serial}" 오토바이 책임보험의 기명피보험자가 "{formValues.name}" 맞나요?
                    </div>
                </PopupSlide>
            </div>
        </>
    );
}