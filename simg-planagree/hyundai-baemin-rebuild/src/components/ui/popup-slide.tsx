import React, {useEffect} from "react";
import classNames from "classnames";
import {PopupSlideProps} from "@/@types/common";

export default function PopupSlide({
                      isOpen,
                      onClose,
                      buttons,
                      children,
                  }: PopupSlideProps){
    //팝업 열렸을때 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            {/* 백그라운드 오버레이 */}
            {isOpen && (
                <div
                    className="fixed w-dvw h-dvh bg-black top-0 left-0 opacity-50 z-10"
                    onClick={onClose}
                ></div>
            )}
            {/* 팝업 컴포넌트 */}
            <div
                className={classNames(
                    "fixed bottom-0 left-0 w-dvw z-10 transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-y-0" : "translate-y-full",
                    "bg-white px-20 py-8 rounded-t-2xl shadow-lg"
                )}
            >
                {/* 팝업 내용 */}
                <div className="mb-6 break-keep">{children}</div>
                {/* 버튼 리스트 */}
                <div className="flex gap-4 mb-2">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={classNames(
                                "flex-1 btn-base cursor-pointer",
                                button.className
                            )}
                            onClick={button.onClick}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};