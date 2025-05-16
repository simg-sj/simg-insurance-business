import Warning from "@/assets/images/icon-warning.png";
import Image from "next/image";
import React from "react";

export default function Home() {
    return (
        <div className={'w-full h-dvh text-2xl flex flex-col justify-center items-center'}>
            <Image src={Warning} alt={"warning"} width={80} height={80}/>
            <div>잘못된 경로입니다</div>
            <div className={'text-gray-700 text-xl mt-2'}>정확한 경로를 입력해주세요.</div>
        </div>
    );
}
