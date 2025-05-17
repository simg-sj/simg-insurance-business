'use client'

import "@/styles/common.css";
import React, {useEffect} from "react";
import {useSearchParams} from "next/navigation";
import {config} from "@/config";


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const params = useSearchParams();
    const insuCompany = params.get("insuCompany"); // 보험사 테마 설정을 위해 insuCompany 파라미터를 가져와서 세팅한다.
    const themeSet = config[insuCompany];
    const plfNumber = params.get("plfNumber"); // SIMG에서 관리하는 플랫폼번호를 파라미터로 받아 세팅
    const plfNumberSet = config[plfNumber];
    const plfNumberData = themeSet?.plfNumber?.[plfNumber]; // plfNumber에 해당하는 데이터 가져오기


    // 보험사 테마 적용
    useEffect(() => {
        if (themeSet?.insuCompany) {
            document.body.className = themeSet.insuCompany;
        }

    }, [themeSet]);


    useEffect(() => {
        // 플랫폼 번호에 따른 로직 추가
        if (plfNumberData?.title.main) {
            console.log(`플랫폼 번호 ${plfNumber}에 따른 제목: ${plfNumberData.title.main}`);
        }
    }, [plfNumberData]);


    return (
              <>{children}</>
      );
}



