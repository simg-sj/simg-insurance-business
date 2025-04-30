'use client'

import React, { forwardRef, useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import PopupSlide from '@/components/ui/popup-slide';
import {DatePickerPopupProps} from "@/@types/common";

const DatePickerPopup = forwardRef<HTMLInputElement, DatePickerPopupProps>(({
                                                                                value,
                                                                                onChange,
                                                                                onOpen,
                                                                                onClose,
                                                                                title = "날짜를 선택하세요"
                                                                            }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(value);

    //note. 만기일선택 최소/최대 날짜 지정 (현재 -+5년으로 설정)
    const today = new Date();
    const fromYear = today.getFullYear() - 5; // 오늘 날짜 기준 5년 전까지
    const toYear = today.getFullYear() + 5;  // 오늘 날짜 기준 5년 후까지

    const startMonth = new Date(fromYear, 0, 1);  // 5년 전 1월 1일
    const endMonth = new Date(toYear, 11, 31);   // 5년 후 12월 31일

    const handleConfirm = () => {
        if (selectedDay) {
            onChange(selectedDay);
        }
        handleClose(); // 확인 버튼 클릭 시 팝업 닫히기
    };

    const handleOpen = () => {
        setIsOpen(true);
        if (onOpen) {
            onOpen(); // 호출
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) {
            onClose(); // 호출
        }
    };

    return (
        <>
            <div
                ref={ref} // 여기에 ref 적용
                onClick={handleOpen} // 팝업 열기
                className={`w-full outline-none border-0 text-xl cursor-pointer ${
                    selectedDay ? 'text-gray-700' : 'text-gray-400'
                }`}
            >
                {selectedDay
                    ? format(selectedDay, 'yyyy-MM-dd')
                    : '년-월-일 선택'}
            </div>

            <PopupSlide
                isOpen={isOpen}
                onClose={handleClose} // 팝업 닫기
                buttons={[
                    {
                        label: '확인',
                        className: 'bg-main text-white',
                        onClick: handleConfirm,
                    },
                ]}
            >
                <div className="text-xl font-semibold mb-8">
                    {title}
                </div>
                <DayPicker
                    mode="single"
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    locale={ko}
                    weekStartsOn={0}
                    captionLayout="dropdown"
                    className="mx-auto"
                    modifiersClassNames={{
                        selected: 'bg-main text-white rounded-full',
                        today: 'text-main',
                    }}
                    startMonth={startMonth}
                    endMonth={endMonth}
                />
            </PopupSlide>
        </>
    );
});

// displayName 설정
DatePickerPopup.displayName = 'DatePickerPopup';

export default DatePickerPopup;