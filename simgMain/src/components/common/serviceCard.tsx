import React, {useState} from 'react';
import {ServiceCardProps} from '@/@types/common';
import Image from "next/image";
import Arrow from "@/assets/images/icon/arrow_icon.png";
import {useRouter} from 'next/navigation';


export const ServiceCard = ({
                                title,
                                description,
                                type,
                                icon,
                                link,
                                detailDescription,
                            }: ServiceCardProps) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleLinkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent triggering the card toggle
        if (!link) {
            const confirrmed = window.confirm('해당 보험은 상담을 통해 가입여부 확인이 가능합니다. 상담을 원할 시 상담문의를 신청해주세요.');
            if (confirrmed) {
                router.push('/');
            }
            return;
        }
        window.open(link, '_blank', 'noopener noreferrer');
    };

    const handleCardClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div
            className="relative p-8 shadow-md rounded-lg w-[300px] h-[350px] m-8 group cursor-pointer overflow-hidden serviceCard"
            onClick={handleCardClick}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
        >
            <div
                className={`absolute inset-0 backdrop-blur-md rounded-lg p-8 flex flex-col justify-between items-end transition-opacity duration-300 ease-in-out ${
                    isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div className="text-gray-800">{detailDescription}</div>
                <div
                    onClick={handleLinkClick}
                    className="flex items-center justify-center gap-2"
                >
                    <div className={'flex items-center mt-5 cursor-pointer hover:font-medium'}>
                        <div className={'mr-3'}>사이트바로가기</div>
                        <Image src={Arrow} alt={'사이트바로가기'} width={22} height={22}/>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="flex space-x-2 items-center mb-4">
                        <div className="w-8 h-8 flex items-center justify-center">
                            {icon && !imageError ? (
                                <img
                                    src={icon.src}
                                    alt={icon.alt}
                                    width={icon.width || 32}
                                    height={icon.height || 32}
                                    className="object-contain"
                                    onError={handleImageError}
                                />
                            ) : null}
                        </div>
                        <div>{type}</div>
                    </div>
                    <div className="text-xl mb-2 break-keep">{title}</div>
                </div>
                <div className="text-gray-600 mt-14 break-keep">{description}</div>
            </div>
        </div>
    );
};