import React from "react";

// 필요한 컬러 추가
type colorType = "blue" | "darkblue" | "bluegray" | "gray" | "lightgray" | "white" ;

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    rounded?: boolean;
    textSize?: number;
    fill?: boolean;
    color: colorType;
    fontWeight?: "font-medium" | "font-bold";
    width?: number;
    height?: number;
}

// 버튼 배경 색상
const bgColor: { blue: string; white: string; bluegray: string; darkblue: string; lightgray: string } = {
    blue: "bg-[#94ade9]",
    darkblue: "bg-[#3e5c8e]",
    bluegray: "bg-[#779ac0]",
    lightgray: "bg-[#f6f6f6]",
    white: "bg-[#ffffff]",
}
// 버튼 테두리 색상
const borderColor: { blue: string; white: string; bluegray: string; darkblue: string; lightgray: string } = {
    blue: "border-[#94ade9]",
    darkblue: "border-[#3e5c8e]",
    bluegray: "border-[#779ac0]",
    lightgray: "border-[#f6f6f6]",
    white: "border-[#ffffff]"
};
// 버튼 글자 색상
const textColor: { blue: string; white: string; bluegray: string; darkblue: string; lightgray: string } = {
    blue: "text-[#94ade9]",
    darkblue: "text-[#3e5c8e]",
    bluegray: "text-[#779ac0]",
    lightgray: "text-[#f6f6f6]",
    white: "text-white"
};
// 버튼 라운드, 컬러, 폰트두께 설정
function combineClass({ rounded, fill, color, fontWeight }: Omit<Button, "children" | "width" | "height">) {
    let className = rounded ? "rounded-full" : "rounded-md";
    if (fontWeight) className += " " + fontWeight;
// 버튼 배경색에 따라 폰트색상, 테두리 자동으로 바꾸기
    if (fill) {
        let textColor = "text-white";
        if (color === "lightgray") {
            textColor = "text-[#262626]";
        }
        if (color === "white") {
            textColor = "text-[#779ac0]";
        }
        // @ts-ignore
        return `${className} ${bgColor[color]} ${textColor}`;
    } else {
        // @ts-ignore
        return `border bg-white ${className} ${borderColor[color]} ${textColor[color]}`;
    }
}

//버튼 가로, 세로, 폰트사이즈
function Button({
                    children,
                    type = "button",
                    rounded = false,
                    textSize,
                    fill = false,
                    color,
                    fontWeight,
                    width,
                    height,
                    className = "",
                    style,
                    ...props
                }: Button) {
    if (!style) style = {};

    if (width) {
        style.width = width + "px";
    }
    if (height) {
        style.height = height + "px";
    }
    if (textSize) {
        style.fontSize = textSize + "px";
    }

    return (
        <button
            {...props}
            type={type}
            className={`inline-flex items-center justify-center py-1 px-1 ${combineClass({ color, fill, rounded, fontWeight })}${
                className ? " " + className : ""
            }`}
            style={style}
        >
            {children}
        </button>
    );
}

export default Button;
