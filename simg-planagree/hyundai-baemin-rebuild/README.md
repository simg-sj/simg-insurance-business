This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 시간제보험 이륜차

### npm run dev 실행 - NextJS Typescript Tailwind

### 보험사 추가 (테마추가)

#### 1. config.ts 파일에서 업체명,로고,내용 등 입력
#### 2. index.css 테마별 색상에서 body.platform(업체명영어) 입력 후 업체 색상 입력
* 해당 레이아웃 이외 사용은 Navigation-Group 에서 따로 만들어 사용해야함

### 파일구조

```bash
📁src
  ├── 📁@types
      └── common.d.ts                                      //타입정의
      
  ├── 📁app
      └── 📁(Navigation-Group)                 
        └── 📁bike                                          //이륜차
          ├── 📁agree                                     //개인정보동의 (step1)
          ├── 📁certification                             //휴대폰인증 (step2)
          ├── 📁confirm                                   //심사결과조회
          ├── 📁form                                      //개인정보입력폼 (step3)
          ├── 📁sucess                                    //신청완료 (step4)
          ├── page.tsx                                    //메인페이지 (보험상품설명)
          └── layout.tsx                                  //themeConfig 가져오기
  ├── layout.tsx                                          //기본페이지 레이아웃
  └── loading.tsx                                         //로딩
  
  ├── 📁assets
      ├── 📁fonts
      └── 📁images
      
  ├── 📁components
      └── 📁ui                                 
          ├── accordion.tsx                               //아코디언 ui
          ├── datepicker.tsx                              //날짜 ui
          ├── popup-slide.tsx                             //아래에서 위로 슬라이드팝업
          ├── select.tsx                                  //선택 ui
          └── tooltip.tsx                                 //tooltip ui
          
  ├── 📁features
        ├── 📁privacy                                   
            ├── guide.tsx                                 //책임보험 만기 및 가입안내
            ├── inquiry.tsx                               //개인정보 조회
            ├── processing.tsx                            //민감정보 및 고유식별정보 처리
            ├── provide.tsx                               //개인정보 제공
            └── use.tsx                                   //개인정보 수집 이용
        └── 📁contents                                   
            └──  phone-certification.tsx                  //휴대폰인증

  ├── 📁styles                                
      ├── common.css                                      //전체 css 불러오기
      ├── globals.css                                     //레이아웃, 기본세팅              
      └── index.css                                       //테마별색상, 공통css tailwind설정, 반응형
  └── config.ts                                           //parma 별 설정값            
└── tailwind.config.ts                                    //테마별색상지정          
  
📁public
  └── simg-favicon.png                                    //파비콘아이콘
```