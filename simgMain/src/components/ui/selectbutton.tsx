"use client"

import React, { useState } from 'react';
import Button from "@/components/ui/button";

interface ButtonData {
    id: string | number;
    text: string;
}

interface SelectButtonProps {
    id: string | number;
    text: string;
    isActive: boolean;
    onClick: (id: string | number) => void;
    activeColor: string;
    inactiveColor: string;
    className?: string;
}

const SelectButton = ({
                          id,
                          text,
                          isActive,
                          onClick,
                          activeColor,
                          inactiveColor,
                          className
                      }: SelectButtonProps) => {
    return (
        <button
            className={`
        px-5 py-3 rounded-full transition-colors duration-300 ease-in-out
        ${isActive ? activeColor : inactiveColor}
        ${className || ''}
      `.trim()}
            onClick={() => onClick(id)}
        >
            {text}
        </button>
    );
};

interface TagButtonProps {
    tag: string;
    onClick: () => void;
    isActive: boolean;
}

export default function TagButton({ tag, onClick, isActive }: TagButtonProps) {
    return (
    <Button fill={true} color={isActive ? "bluegray" : "white"} autoFocus={true} width={120} height={45} rounded={true} onClick={onClick}
            className={'my-3 text-lg'}
    >
        #{tag}
    </Button>
    );
}