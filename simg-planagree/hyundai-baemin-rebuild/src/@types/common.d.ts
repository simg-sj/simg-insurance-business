import React, {ReactNode} from "react";

/* ---------------------------------------
    페이지 타입 정리
   ---------------------------------------
*/

//agree 개인정보동의 상태관리
export type AgreementItem = {
    id: string;
    title: string;
    description?: string;
    component: React.ReactNode;
};


// certification 인증 상태관리
export type AuthPhase = 'phone' | 'verification'; //휴대폰번호, 인증번호
export type FieldStatus = 'default' | 'active' | 'error'; //기본, 활성화, 에러

//inquiry 사용자휴대폰조회
export type CheckItem = {
    id: string;
    contents: React.ReactNode;
};



/* ---------------------------------------
    컴포넌트 (components, features) 타입정리
   ---------------------------------------
*/

//accordion 아코디언 상태전달
export interface AccordionProps {
    title: string;
    children: ReactNode; // 내부 내용을 HTML 형식으로 작성 가능하도록 설정
    containerClassName?: string; // 전체 컴포넌트의 클래스명
    titleClassName?: string; // 제목 부분의 클래스명
    contentClassName?: string; // 본문 부분의 클래스명

}

//datepicker 달력 상태전달
export interface DatePickerPopupProps {
    value?: Date;
    onChange: (date: Date) => void;
    onOpen?: () => void;
    onClose?: () => void;
    title?: string;
}

//inputField 텍스트인풋 상태전달
export interface InputFieldProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    fieldName: string;
    error?: string;
    formSubmitted?: boolean;
    focused?: boolean;
    onFocus: () => void;
    onBlur: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearField: () => void;
    inputRef?: React.RefObject<HTMLInputElement>;
    type?: string;
    maxLength?: number;
}

//popupSlide 슬라이드팝업 상태전달
interface PopupButton {
    label: string; // 버튼명
    className: string; // 버튼에 적용할 클래스명
    onClick: () => void; // 클릭 이벤트
}

export interface PopupSlideProps {
    isOpen: boolean; // 팝업 열림 상태
    onClose: () => void; // 닫기 이벤트
    buttons: PopupButton[]; // 버튼 리스트
    children: React.ReactNode; // 팝업 내부 커스텀 내용
}

//select 옵션선택팝업 상태전달
export interface CustomSelectProps {
    options: string[];
    placeholder?: string;
    onSelect: (value: string) => void;
    value?: string;
    title?: string;
    onOpen?: () => void;
    onClose?: () => void;
}

//tooltip 툴팁 상태전달
export type TooltipProps = {
    content:  React.ReactNode;
    width?: number;
};


//phone-certification 휴대폰인증 상태전달
export interface PhoneVerificationProps {
    onVerificationSuccess: (phoneNumber: string) => void;
}