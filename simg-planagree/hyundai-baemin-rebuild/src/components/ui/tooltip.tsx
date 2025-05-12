import Image from "next/image";
import React, {useState} from "react";
import TooltipIcon from "@/assets/images/icon-tooltip.png";
import {TooltipProps} from "@/@types/common";

const Tooltip = ({content, width = 200}: TooltipProps) => {
    const [visible, setVisible] = useState(false);

    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return (
        <div className={'relative'}>
            <Image src={TooltipIcon.src} alt={'툴팁'} width={24} height={24} className={'ml-2 cursor-pointer tooltip'}
                   onMouseEnter={showTooltip} onMouseLeave={hideTooltip}/>
            {visible && <div
                className="absolute bg-gray-900 text-white shadow-md opacity-90 p-3 z-50 rounded-md break-keep text-sm top-8 left-[-120px]"
                onMouseEnter={showTooltip} onMouseLeave={hideTooltip}
                style={{
                    width: `${width}px`,
                }}
            >{content}</div>}
        </div>
    )
}

export default Tooltip;