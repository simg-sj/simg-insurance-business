import { useRouter } from 'next/navigation'; // App Router에서 사용할 경우 적합

type RouterType = ReturnType<typeof useRouter>; // useRouter의 반환값 타입을 유추하여 설정

interface HandleRedirectParams {
    pathname: string;
    dynamicPath: string; // 동적으로 변경될 경로
    insuCompany: string;
    plfNumber: string;
    plfParCnt: number;
    plfParNames: string[];
    searchParams: { [key: string]: string };
    router: RouterType; // 유연한 RouterType 사용
}

export const handleRedirectWithParams = ({
                                             pathname,
                                             dynamicPath, // 동적으로 입력받는 경로
                                             insuCompany,
                                             plfNumber,
                                             plfParCnt,
                                             plfParNames,
                                             searchParams,
                                             router,
                                         }: HandleRedirectParams): void => {
    // 기본적으로 insuCompany, plfNumber를 포함한 URL
    // let defaultRouterPushString = `${pathname}/${dynamicPath}?insuCompany=${insuCompany}&plfNumber=${plfNumber}`;
    const basePath = '/bike';
    let defaultRouterPushString = `${basePath}/${dynamicPath}?insuCompany=${insuCompany}&plfNumber=${plfNumber}`;

    // 파라미터가 존재하는 경우 추가 처리
    if (plfParCnt > 0 && plfParNames?.length > 0) {
        // console.log('파라미터 처리가 있음');

        // 파라미터 이름을 기준으로 searchParams에서 값 매핑
        const builderUrlWithParams = (parameterNames: string[]): string => {
            const params = parameterNames
                .map((name) => `${name}=${encodeURIComponent(searchParams[name] || '')}`) // 누락된 값은 빈 문자열 처리
                .join('&'); // 배열을 쿼리스트링으로 변환

            /* pathname으로 하니, bike/agree/certification 으로 빠지는 경우가 생김*/

            // return `${pathname}/${dynamicPath}?insuCompany=${insuCompany}&plfNumber=${plfNumber}&${params}`;
            return `${basePath}/${dynamicPath}?insuCompany=${insuCompany}&plfNumber=${plfNumber}&${params}`;
        };

        defaultRouterPushString = builderUrlWithParams(plfParNames);
    }

    console.log('최종 이동 URL : ', defaultRouterPushString);

    // 페이지 이동
    // 안전하게 push 호출
    if (typeof router.push === 'function') {
        router.push(defaultRouterPushString);
    } else {
        console.error('Router does not support navigation with push');
    }
};
