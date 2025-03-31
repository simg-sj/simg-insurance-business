import React from "react";
import ImageData from "next/dist/server/lib/squoosh/image_data";

export interface ConsultingFormData {
    inquiry: string; //문의사항
    insuranceType: string; //보험종류
    companyName: string; //기업명
    name: string; //성함
    phone: string; //연락처
    collect: boolean; //개인정보수집동의
    provision: boolean; //개인정보제3자동의
    marketing: boolean; //광고성정보수신
}

export  interface FormProps {
    name: string; //성함
    phone: string; //연락처
    email: string; //이메일아이디
    emailList: string; //이메일주소
    education: string; //최종학력
    enrollmentYear: string; //입학년
    enrollmentMonth: string; //입학월
    graduationYear: string; //졸업년
    graduationMonth: string; //졸업월
    position: string; //지원포지션
    path: string;//지원경로
    otherPath?: string; //기타지원경로
    referrer?: string; //추천인
    requiredConsent: boolean; //필수동의
    optionalConsent: boolean; //선택동의
}

interface ApplicationFormProps {
    onBack: () => void;
}

export interface CheckboxState {
    all: boolean;
    collect: boolean;
    provision: boolean;
    marketing: boolean;
}


export interface TabOption {
    id: string;
    label: string;
}

export type ServiceType = '개인' | '단체' | '개인/단체';


export interface ServiceCardProps {
    title: string;
    description: string;
    type: ServiceType;
    icon?: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
    };
    link: string;
    detailDescription: string;
}

export interface ImageDataProps {
    id: number;
    src: string;
    alt: string;
    link: string;
    };

export interface TabProps {
    options: TabOption[];
    initialTab?: string;
    onTabChange: (tabId: string) => void;
    className?: string;
}

export interface AccordionItemProps {
    title: React.ReactNode;
    content: React.ReactNode;
    checked?: boolean;
    onCheckChange?: (checked: boolean) => void;
}

export interface AccordionProps {
    items: AccordionItemProps[];
}

interface FileWithPreview extends File {
    preview?: string;
    sectionId: string;
}

interface FileUploadProps {
    sectionId: string;
    description?: string;
    files: FileWithPreview[];
    setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

