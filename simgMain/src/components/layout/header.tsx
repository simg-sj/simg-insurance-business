'use client'

import {useState, useEffect} from "react";
import Image from 'next/image';
import Link from "next/link";
import {usePathname} from "next/navigation";
import SimgLogo from "@/assets/images/logo/SIMG_logo.png";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    //스크롤시 헤더 그림자 생성
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 화면 크기에 따른 모바일 여부 확인
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        // 컴포넌트 마운트 시 초기 확인
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 메뉴 열고 닫기
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);

        // 메뉴가 열려있을 때는 스크롤 막기
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    // 메뉴 아이템 클릭 시 메뉴 닫기
    const handleMenuItemClick = () => {
        if (isMobile) {
            setIsMenuOpen(false);
            document.body.style.overflow = 'auto';
        }
    };

    //메뉴 링크
    const menuItems = [
        { name: '홈', path: '/' },
        { name: '회사소개', path: '/about' },
        { name: '조직문화', path: '/culture' },
        { name: '서비스', path: '/service' },
        { name: '자주묻는질문', path: '/faq' },
    ];

    return(
        <>
            <header className={`fixed w-full bg-white z-40 top-0 ${isScrolled ? 'scrolled' : ''}`}>
                <div className={'flex justify-between items-center text-base max-w-7xl mx-auto h-[90px] px-5'}>
                    <div>
                        <Link href="/" className="flex items-center">
                            <Image src={SimgLogo} alt={'SIMG로고'} width={100} height={38} priority/>
                        </Link>
                    </div>

                    {/* 데스크탑 메뉴 */}
                    {!isMobile && (
                        <nav className={'flex justify-between font-medium text-center'}>
                            {menuItems.map((item) => (
                                <div key={item.name} className="relative w-[90px] ml-[20px]">
                                    <Link
                                        href={item.path}
                                        className={`menu-link ${pathname === item.path ? 'active' : ''}`}
                                    >
                                        {item.name}
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    )}

                    {/* 모바일 햄버거 버튼 */}
                    {isMobile && (
                        <button
                            className="w-8 h-8 flex flex-col justify-center items-center focus:outline-none relative z-40"
                            onClick={toggleMenu}
                            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                        >
                            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? 'transform rotate-45 absolute' : 'mb-1.5'}`}></span>
                            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'mb-1.5'}`}></span>
                            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? 'transform -rotate-45 absolute' : ''}`}></span>
                        </button>
                    )}
                </div>

                {/* 모바일 메뉴 */}
                {isMobile && (
                    <div
                        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                        onClick={toggleMenu}
                    >
                        <div
                            className={`w-full h-full bg-white pt-24 px-10 overflow-y-auto transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <nav className="flex flex-col font-medium">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className={`mobile-menu-link py-4 border-b border-gray-200 w-full ${pathname === item.path ? 'active' : ''}`}
                                        onClick={handleMenuItemClick}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            {/* 스크롤시 메뉴 shadow, 메뉴 active 색상 */}
            <style jsx>{`
                .scrolled {
                    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
                }
                :global(.menu-link:hover),
                :global(.menu-link.active),
                :global(.mobile-menu-link:hover),
                :global(.mobile-menu-link.active) {
                    color: #6282b3;
                }
            `}</style>
        </>
    )
}

export default Header;