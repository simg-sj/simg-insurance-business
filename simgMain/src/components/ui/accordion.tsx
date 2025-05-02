
import React, { useState } from 'react';
import { AccordionProps, AccordionItemProps } from '@/@types/common';
import Image from "next/image";
import DownArrow from '@/assets/images/icon/arrow_down_icon.png';

const AccordionItem = ({
                           title,
                           content,
                           isOpen,
                           onClick,
                       }: AccordionItemProps & {
    isOpen: boolean;
    onClick: () => void;
}) => {
    const handleClick = (e: React.MouseEvent) => {
        // 체크박스를 클릭한 경우 아코디언을 열지 않음
        if ((e.target as HTMLElement).tagName === 'INPUT') {
            e.stopPropagation();
            return;
        }
        onClick();
    };

    return (
        <div className={'border-t py-3 accordion'}>
            <button
                onClick={handleClick}
                className={`flex w-full justify-between items-start hover:bg-gray-100 rounded-lg px-4 ${
                        isOpen ? 'bg-gray-100' : ''
                    }`}
            >
                <span className="font-medium text-base py-4 text-gray-800 text-left mr-2 break-keep">{title}</span>
                <Image
                    className={`transition-transform duration-500 py-6 ${
                        isOpen ? 'transform rotate-180' : ''
                    }`} src={DownArrow} width={8} height={8} alt={'자세히보기'} style={{ width: 'auto', height: 'auto' }}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                }`}
            >
                <div className="py-8 text-base text-gray-600 px-4 break-keep">{content}</div>
            </div>
        </div>
    );
};

const Accordion = ({ items }: AccordionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [checkedStates, setCheckedStates] = useState<boolean[]>(
        new Array(items.length).fill(false)
    );

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleCheckboxChange = (index: number, checked: boolean) => {
        const newCheckedStates = [...checkedStates];
        newCheckedStates[index] = checked;
        setCheckedStates(newCheckedStates);

        if (items[index].onCheckChange) {
            items[index].onCheckChange(checked);
        }
    };

    return (
        <div>
            {items.map((item, index) => {

                const modifiedTitle = React.isValidElement(item.title)
                    ? React.cloneElement(item.title as React.ReactElement, {
                        children: React.Children.map(item.title.props.children, (child) => {
                            if (
                                React.isValidElement(child) &&
                                child.type === 'input' &&
                                (child.props as { type?: string }).type === 'checkbox'
                            ) {
                                return React.cloneElement(
                                    child as React.ReactElement<{ checked?: boolean; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }>,
                                    {
                                        checked: checkedStates[index],
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleCheckboxChange(index, e.target.checked),
                                    }
                                );
                            }
                            return child;
                        }),
                    })
                    : item.title;


                return (
                    <AccordionItem
                        key={index}
                        {...item}
                        title={modifiedTitle}
                        isOpen={openIndex === index}
                        onClick={() => handleClick(index)}
                    />
                );
            })}
        </div>
    );
};

export default Accordion;