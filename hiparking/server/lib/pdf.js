
// 입력할 문자열과 이미지의 위치와 내용을 설정합니다.
// Check Mark 이미지 위치
// PDF 파일 경로와 출력 파일 경로를 지정하여 함수를 호출합니다.
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const fontkit = require('@pdf-lib/fontkit');
const _util = require('./_util');



const inputFilePath = path.join(__dirname,'../template/보험금청구서_DB.pdf');
const checkMark = path.join(__dirname,'../template/images/check-mark.png');
// 입력할 문자열과 이미지의 위치와 내용을 설정합니다.
// Check Mark 이미지 위치
const cmW = 10;  //  이미지 사이즈 정의
const cmH = 10;  //  이미지 사이즈 정의
// 피보험자 성명
const insurName = '이태호';
const nameX = 180;
const nameY = 690;
// 피보험자 주민번호
const juMin = '681109-1145267';
const juminX = 310;
const juminY = 690;
// 의료급여 수급권자 체크 위치
const suGeopX = 520;
const suGeopY = 690;
// 피보험자 회사명
const corpName = '-';
const corpX = 180;
const corpY = 668;
// 피보험자 회사 부서명
const buSeoName = '-';
const bsX = 310;
const bsY = 668;
// 피보험자 회사에서 하는 일
const jobName = '-';
const jnX = 480;
const jnY = 668;
// 피보험자 주소
const insurAddr = '서울 강남구 대치동 테헤란로 416 16층';
const iaX = 150;
const iaY = 646;
// 보상 안내 받으실분 피보험자 체크 위치
const anNaeX = 168;
const anNaeY = 622;
// 전화 연락처
const cellNo = '010-1234-5678';
const cnX = 148;
const cnY = 600;
// 이메일 연락처
const eMail = 'test@simg.kr';
const emailX = 310;
const emailY = 600;
// 다른 보험사 가입 체크 위치
const gaIpX = 390;
const gaIpY = 562;
// 청구사항 체크 위치
const claimX = 144;
const claimY = 513;
// 사고발생일
// const saGoDate= '2024    08     22      20      20';   // 상해, 교통사고
const saGoDate= '2024    08     22';   // 질병
const sgX = 110;
const sgY = 491;
// 진단명(병명/증상)
const diagnosisName = '결장에 양성신생물';
const diaNX = 360;
const diaNY = 491;
// 사고장소
const saGoLoca = '-';
const sglX = 110;
const sglY = 470;
// 치료병원
const hospiName = '-';
const hnX = 360;
const hnY = 470;
// 사고경위, 아픈부위
const saGoHis = '건강검진';
const sghX = 110;
const sghY = 450;
// 청구 담보 체크 위치
const guaranX = 140;
const guaranY = 378;
// 계좌번호
const accountNum = '1234-5678-9012-2546';
const accnX = 170;
const accnY = 340;
// 은행명
const bankName = '신행은행';
const bankX = 380;
const bankY = 340;
// 예금주
const accountHolder = '홍길동';
const acchX = 480;
const acchY = 340;
// 채권양도 체크 위치
const bondX = 530;
const bondY = 262;
// 작성일
const reqDate= '2024             08                25';   // 질병
const rdX = 80;
const rdY = 118;
// 청구권자
const reqName= '홍길동';   // 질병
const rnX = 420;
const rnY = 118;

// 청구권자 서명 이미지 위치
const reqSign = '';
const rsW = 50;  //  이미지 사이즈 정의
const rsH = 20;  //  이미지 사이즈 정의
const rsX = 480;
const rsY = 116;

/**
 * 두번째 페이지
 */
// 정보수집동의 고유식별정보 체크 위치
const priAgree1_1X = 526;
const priAgree1_1Y = 423;
// 정보수집동의 민감정보 체크 위치
const priAgree1_2X = 526;
const priAgree1_2Y = 339;
// 정보수집동의 개인정보 체크 위치
const priAgree1_3X = 526;
const priAgree1_3Y = 242;

/**
 * 세번째 페이지
 */
// 정보제공동의 고유식별정보 체크 위치
const priAgree2_1X = 526;
const priAgree2_1Y = 415;
// 정보제공동의 민감정보 체크 위치
const priAgree2_2X = 526;
const priAgree2_2Y = 315;
// 정보제공동의 개인정보 체크 위치
const priAgree2_3X = 526;
const priAgree2_3Y = 190;

/**
 * 네번째 페이지
 */
// 정보국외제3자제공동의 개인정보 체크 위치
const priAgree3_1X = 526;
const priAgree3_1Y = 620;
// 정보조회동의 고유식별정보 체크 위치
const priAgree3_2X = 526;
const priAgree3_2Y = 352;
// 정보조회동의 민감정보 체크 위치
const priAgree3_3X = 526;
const priAgree3_3Y = 284;
// 정보조회동의 개인정보 체크 위치
const priAgree3_4X = 526;
const priAgree3_4Y = 157;

// 정보동의일
const agreeDate= '24         08        25';   // 질병
const agreeX = 254;
const agreeY = 91;
// 정보동의자 서명
const agreeName= '홍길동';   // 질병
const agree_nX = 440;
const agree_nY = 108;

// 정보동의자 서명 이미지 위치
const agreeSingX = 490;
const agreeSingY = 100;




async function addTextAndImageToPDF(data) {
    // 입력 파일 로드
    const inputBytes = fs.readFileSync(inputFilePath);
    const pdfDoc = await PDFDocument.load(inputBytes);
    let today = _util.getTimeyymmddhhmmss('day');
    pdfDoc.registerFontkit(fontkit);

    // 표준 폰트 로드
    // const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBytes = fs.readFileSync(path.join(__dirname,'../template/fonts/PretendardVariable.ttf'));
    const customFont = await pdfDoc.embedFont(fontBytes);

    // Check Mark 이미지 로드
    const signatureBytes = fs.readFileSync(checkMark);
    const signatureImage = await pdfDoc.embedPng(signatureBytes);

    // 사인 이미지 로드
    const signBytes = fs.readFileSync(data.signName);
    const signImage = await pdfDoc.embedPng(signBytes);

    // 첫 번째 페이지 가져오기
    const page1 = pdfDoc.getPages()[0];

    // 피보험자 이름
    page1.drawText( data.name, {
        x: nameX,
        y: nameY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 피보험자 주민번호
    page1.drawText( data.birth, {
        x: juminX,
        y: juminY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    //  의료수급권자 Check Mark 이미지 그리기
    page1.drawImage( signatureImage, {
        x: suGeopX,
        y: suGeopY,
        width: cmW,
        height: cmH,
        // width: signatureImage.width,
        // height: signatureImage.height,
    });

    // 피보험자 회사명
    page1.drawText( corpName, {
        x: corpX,
        y: corpY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 피보험자 회사 부서명
    page1.drawText( buSeoName, {
        x: bsX,
        y: bsY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 피보험자 회사에서 하는일
    page1.drawText( jobName, {
        x: jnX,
        y: jnY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 피보험자 주소명
    page1.drawText( data.address, {
        x: iaX,
        y: iaY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 보상 안내받으실 분 피보험자 체크 위치
    page1.drawImage( signatureImage, {
        x: anNaeX,
        y: anNaeY,
        width: cmW,
        height: cmH,
    });

    // 전화 연락처
    page1.drawText( data.phone, {
        x: cnX,
        y: cnY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 이메일 연락처
    page1.drawText( data.email, {
        x: emailX,
        y: emailY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 다른 보험회사 가입사항 체크 위치
    page1.drawImage( signatureImage, {
        x: gaIpX,
        y: gaIpY,
        width: cmW,
        height: cmH,
    });

    // 청구사항 체크 위치
    page1.drawImage( signatureImage, {
        x: claimX,
        y: claimY,
        width: cmW,
        height: cmH,
    });

    // 사고발생일(발병일)
    page1.drawText( data.strDate.substring(0,4)+'    '+data.strDate.substring(4,6)+'    '+data.strDate.substring(6,8), {
        x: sgX,
        y: sgY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 진단명(병명/증상)
    page1.drawText( data.diagName, {
        x: diaNX,
        y: diaNY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 사고장소
    page1.drawText( saGoLoca, {
        x: sglX,
        y: sglY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 치료병원
    page1.drawText( hospiName, {
        x: hnX,
        y: hnY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 사고경위, 아픈부위
    page1.drawText( saGoHis, {
        x: sghX,
        y: sghY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 청구 담보 체크 위치
    page1.drawImage( signatureImage, {
        x: guaranX,
        y: guaranY,
        width: cmW,
        height: cmH,
    });

    // 계좌번호
    page1.drawText( data.account, {
        x: accnX,
        y: accnY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 은행명
    page1.drawText( data.bank, {
        x: bankX,
        y: bankY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 예금주
    page1.drawText( data.name, {
        x: acchX,
        y: acchY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 채권양도 체크 위치
    page1.drawImage( signatureImage, {
        x: bondX,
        y: bondY,
        width: cmW,
        height: cmH,
    });

    // 작성일
    page1.drawText( today.substring(0,4)+'             '+today.substring(4,6)+'                '+today.substring(6,8), {
        x: rdX,
        y: rdY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 청구권자
    page1.drawText( data.name, {
        x: rnX,
        y: rnY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 청구권자 서명 이미지 위치
    page1.drawImage( signImage, {
        x: rsX,
        y: rsY,
        width: rsW,
        height: rsH,
    });

    /**
     * 두 번째 페이지 가져오기
     */
    const page2 = pdfDoc.getPages()[1];

    // 정보수집동의 식별정보 체크 위치
    page2.drawImage( signatureImage, {
        x: priAgree1_1X,
        y: priAgree1_1Y,
        width: cmW,
        height: cmH,
    });

    // 정보수집동의 민감정보 체크 위치
    page2.drawImage( signatureImage, {
        x: priAgree1_2X,
        y: priAgree1_2Y,
        width: cmW,
        height: cmH,
    });

    // 정보수집동의 개인정보 체크 위치
    page2.drawImage( signatureImage, {
        x: priAgree1_3X,
        y: priAgree1_3Y,
        width: cmW,
        height: cmH,
    });

    /**
     * 세 번째 페이지 가져오기
     */
    const page3 = pdfDoc.getPages()[2];

    // 정보제공동의 식별정보 체크 위치
    page3.drawImage( signatureImage, {
        x: priAgree2_1X,
        y: priAgree2_1Y,
        width: cmW,
        height: cmH,
    });

    // 정보제공동의 민감정보 체크 위치
    page3.drawImage( signatureImage, {
        x: priAgree2_2X,
        y: priAgree2_2Y,
        width: cmW,
        height: cmH,
    });

    // 정보제공동의 개인정보 체크 위치
    page3.drawImage( signatureImage, {
        x: priAgree2_3X,
        y: priAgree2_3Y,
        width: cmW,
        height: cmH,
    });

    /**
     * 네 번째 페이지 가져오기
     */
    const page4 = pdfDoc.getPages()[3];

    // 정보국외제3자제공동의 개인정보 체크 위치
    page4.drawImage( signatureImage, {
        x: priAgree3_1X,
        y: priAgree3_1Y,
        width: cmW,
        height: cmH,
    });

    // 정보조회동의 식별정보 체크 위치
    page4.drawImage( signatureImage, {
        x: priAgree3_2X,
        y: priAgree3_2Y,
        width: cmW,
        height: cmH,
    });

    // 정보조회동의 민감정보 체크 위치
    page4.drawImage( signatureImage, {
        x: priAgree3_3X,
        y: priAgree3_3Y,
        width: cmW,
        height: cmH,
    });

    // 정보조회동의 개인정보 체크 위치
    page4.drawImage( signatureImage, {
        x: priAgree3_4X,
        y: priAgree3_4Y,
        width: cmW,
        height: cmH,
    });

    // 동의일
    page4.drawText( today.substring(2,4)+'        '+today.substring(4,6)+'      '+today.substring(6,8), {
        x: agreeX,
        y: agreeY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 정보동의자
    page4.drawText( data.name, {
        x: agree_nX,
        y: agree_nY,
        font: customFont,
        size: 12,
        color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
    });

    // 동의자 서명 이미지 위치
    page4.drawImage( signImage, {
        x: agreeSingX,
        y: agreeSingY,
        width: rsW,
        height: rsH,
    });

    // 수정된 PDF 파일 저장
    const modifiedBytes = await pdfDoc.save();
    let outName = data.name+'_보험금청구서_DB_'+today+'.pdf';
    let dirName = 'mycheckup'+_util.getTimeyymmddhhmmss('day').substring(0,6);
    const outputFilePath = path.join(__dirname, '../../uploads/',dirName,outName);
    fs.writeFileSync(outputFilePath, modifiedBytes);
}



module.exports = { addTextAndImageToPDF };
