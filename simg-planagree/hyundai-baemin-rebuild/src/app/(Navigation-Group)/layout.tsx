'use client'

import "@/styles/common.css";
import React, {useEffect} from "react";
import {useSearchParams} from "next/navigation";
import {config} from "@/config";


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const params = useSearchParams();
    const platform = params.get("platform");
    const theme = config[platform];
    useEffect(() => {
        if (theme?.platform) {
            document.body.className = theme.platform;
        }
    }, [theme]);

      return (
              <>{children}</>
      );
}



