import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/assets/styles/common.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "혁신적인 보험 SIMG",
    description: "혁신적인 보험 에스아이엠지",
    icons: {
        icon: '/simg-favicon.png',
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
        <body>
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
