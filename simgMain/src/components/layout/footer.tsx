
import Image from "next/image";
import Link from "next/link";
import Symbol from '@/assets/images/logo/SIMG_symbol.png'

const Footer = () =>{
    return(
        <footer>
            <div className={'mx-auto flex justify-between flex-wrap max-w-7xl'}>
            <div className={'text-sm text-[#727272] flex'}>
                <div className={'mr-5'}>
                    <Image src={Symbol} alt={'SIMG심볼'} width={50} height={46}/>
                </div>
                <div>
                <div>
                    (13840) 경기 과천시 과천대로7길 33, 디테크타워 B동 1201호
                </div>
                <div>
                    사업자 : 128-87-16058
                </div>
                <div>
                    TEL : 1877 - 3006
                </div>
                <div>
                    대표자 : 오성준
                </div>
                </div>
            </div>
                <div className={'flex w-[500px] justify-around font-medium h-fit mt-10 hiddenImage'}>
                    <Link href={'/'} >
                        <div>홈</div>
                    </Link>
                    <div>|</div>
                    <Link href={'/about'} >
                        <div>회사소개</div>
                    </Link>
                    <div>|</div>
                    <Link href={'/culture'} >
                        <div>조직문화</div>
                    </Link>
                    <div>|</div>
                    <Link href={'/service'} >
                        <div>서비스</div>
                    </Link>
                    <div>|</div>
                    <Link href={'/faq'} >
                        <div>자주묻는질문</div>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;