import React, {useState} from "react";
import PopupSlide from "@/components/ui/popup-slide";
import Image from "next/image";
import Arrow from "@/assets/images/icon-arrow-gray.png";
import {CustomSelectProps} from "@/@types/common";

export default function CustomSelect({
                                         options,
                                         placeholder = "선택",
                                         onSelect,
                                         onOpen,
                                         onClose,
                                         value,
                                         title = "옵션을 선택하세요",
                                     }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
        if (onOpen) {
            onOpen(); // 팝업 열릴 때 onOpen 호출
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) {
            onClose(); // 팝업 닫힐 때 onClose 호출
        }
    };


    return (
        <>
            <div className={'flex-between'}>
                <div
                    onClick={handleOpen} // 팝업 열기
                    className={`w-full cursor-pointer text-xl ${
                        value ? 'text-gray-700' : 'text-gray-400'
                    }`}
                >
                    {value || placeholder}
                </div>

                <Image src={Arrow} alt={"선택"} width={20} height={20}/>
            </div>

            <PopupSlide
                isOpen={isOpen}
                onClose={handleClose} // 팝업 닫기
                buttons={[]}
            >
                <div className="text-xl font-semibold mb-8 mt-2">{title}</div>
                <ul className="flex flex-col gap-3 text-xl text-gray-800 max-h-[300px] overflow-y-auto">
                    {options.map((option) => (
                        <li
                            key={option}
                            className={`flex-between pl-1 pr-5 py-2 cursor-pointer ${
                                value === option ? "font-bold" : ""
                            }`}
                            onClick={() => handleSelect(option)}
                        >
                            <span>{option}</span>
                            {value === option && <div className={'text-main text-xl font-medium'}>✓</div>}
                        </li>
                    ))}
                </ul>
            </PopupSlide>
        </>
    );
}
