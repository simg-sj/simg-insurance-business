import React from "react";
import Image from "next/image";
import clsx from "clsx";
import DeleteIcon from "@/assets/images/icon-delete.png";
import {InputFieldProps} from "@/@types/common";


const InputField = ({
                        id,
                        label,
                        placeholder,
                        value,
                        error,
                        formSubmitted,
                        focused,
                        onFocus,
                        onBlur,
                        onChange,
                        clearField,
                        inputRef,
                        type = "text",
                        maxLength
                    }: InputFieldProps) => {

    const hasError = error && formSubmitted;

    return (
        <div
            className={clsx(
                'input-box',
                focused ? 'border-main border-2' :
                    hasError ? 'border-red-500 border-2' : 'border-gray-200'
            )}
        >
            <div className="flex-between mb-2">
                <label htmlFor={id} className="text-base text-gray-700">{label}</label>
                {hasError && <div className="text-red-500 text-sm mb-1">{error}</div>}
            </div>
            <div className="flex-between text-gray-700">
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    ref={inputRef}
                    className="w-full outline-none border-0 text-xl bg-white"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    inputMode={type === "number" ? "numeric" : "text"}
                    maxLength={maxLength}
                />
                {value && (
                    <Image
                        src={DeleteIcon}
                        alt="삭제"
                        width={20}
                        height={20}
                        className="cursor-pointer ml-3"
                        onClick={clearField}
                    />
                )}
            </div>
        </div>
    );
};

export default InputField;
