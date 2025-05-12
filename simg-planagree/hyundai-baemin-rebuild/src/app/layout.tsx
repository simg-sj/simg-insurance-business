import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/common.css";
import React from "react";



const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "mobile",
  description: "mobile",
  icons : {
      icon : '/simg-favicon.png',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {


      return (
          <html lang="kr" className={`${pretendard.variable}`}>
          <head>
            <title>simg-mobile</title>
          </head>
          <body className={pretendard.className}>
              {children}
          </body>
          </html>
      );
}



