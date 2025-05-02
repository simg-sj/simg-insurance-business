'use client'
import {useState} from "react";
import Image from "next/image";
import ArrowGray from "@/assets/images/icon-arrow-gray.png";
import classNames from "classnames";
import {AccordionProps} from "@/@types/common";

export default function Accordion({
         title,
        children,
        containerClassName,
        titleClassName,
        contentClassName,
}: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={containerClassName}>
            {/* 아코디언 제목 */}
            <div
                className={classNames(
                    "text-box flex-between cursor-pointer select-none",
                    titleClassName
                )}
                onClick={toggleOpen}
            >
                <div className="text-xl font-semibold">{title}</div>
                <div
                    className={classNames(
                        "transform transition-transform duration-300",
                        { "rotate-180": isOpen } // 화살표 위로 회전
                    )}
                >
                    <Image src={ArrowGray} alt="아래 화살표" width={20} height={20} />
                </div>
            </div>

            {/* 아코디언 내용 */}
            <div
                className={classNames(
                    "overflow-hidden transition-[max-height] duration-100 ease-in-out bg-gray-50 rounded-lg break-keep",
                    contentClassName,
                    { "max-h-0": !isOpen, "max-h-[calc(100vh-300px)] p-6": isOpen }
                )}
                style={{ maxHeight: isOpen ? "100%" : "0px" }}
            >
                {isOpen && <div className="text-lg font-medium text-gray-500">{children}</div>}
            </div>
        </div>
    );
}
