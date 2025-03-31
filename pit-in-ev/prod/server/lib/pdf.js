const { uploadS3Image, getS3File, uploadRegiFile } = require('./_fileUpload');
// 입력할 문자열과 이미지의 위치와 내용을 설정합니다.
// Check Mark 이미지 위치
// PDF 파일 경로와 출력 파일 경로를 지정하여 함수를 호출합니다.
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const fontkit = require('@pdf-lib/fontkit');
const _util = require('./_util');
const dayjs = require('dayjs');



// 입력할 문자열과 이미지의 위치와 내용을 설정합니다.
// Check Mark 이미지 위치
let today = dayjs();
const cmW = 10;  //  이미지 사이즈 정의
const cmH = 10;  //  이미지 사이즈 정의
// 계약자 성명
const nameX = 230;
const nameY = 670;

//const contractDate = '2024-08-29';
const contractDate = '2024-11-05';
const contractDateX = 270;
const contractDateY = 568;

// 법인 개인명
const nameX2 = 270;
const nameY2 = 500;
//const contractYear = '2024-08-30 00:00 ~ 2025-08-30 00:00 (1년)';
const contractYear = '2024-11-06 00:00 ~ 2025-11-06 00:00 (1년)';
const contractYearX = 270;
const contractYearY = 545;

const busiTypeX = 330;
const busiTypeY = 525;

const cCellX = 270;
const cCellY = 453;

const carInfoX = 270;
const carInfoY = 411;

const premiumsVatX = 270;
const premiumsVatY = 362;

const premiumsX = 270;
const premiumsY = 342;

const cPayDtX = 270;
const cPayDtY = 282;



const contractNameX = 400;
const contractNameY = 138;

// 청구권자 서명 이미지 위치
const rsW = 50;  //  이미지 사이즈 정의
const rsH = 20;  //  이미지 사이즈 정의
const rsX = 475;
const rsY = 100;



async function addTextAndImageToPDF(data) {
    // 입력 파일 로드
    let inputFilePath ='';

    if(data.payType === '01'){
        inputFilePath = path.join(__dirname,'../template/PIT-IN EV케어서비스_계약서_Type1.pdf');
    }else {
        inputFilePath = path.join(__dirname,'../template/PIT-IN EV케어서비스_계약서_Type2.pdf');
    }
    const inputBytes = fs.readFileSync(inputFilePath);
    const pdfDoc = await PDFDocument.load(inputBytes);
    let today = _util.getTimeyymmddhhmmss('day');
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = fs.readFileSync(path.join(__dirname, '../template/fonts/PretendardVariable.ttf'));
    const customFont = await pdfDoc.embedFont(fontBytes);

    let premiumsVat = parseInt(data.premiums.replace(',',''));

    premiumsVat = premiumsVat + (premiumsVat * 0.1);
    premiumsVat = premiumsVat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")


    // S3로부터 사인 이미지 로드 및 처리
    try {
        const signBuffer = await getS3File(data.s3Key);
        const signImage = await pdfDoc.embedPng(signBuffer);  // PNG 버퍼를 직접 사용

        const page1 = pdfDoc.getPages()[0];
        // 피보험자 이름
        page1.drawText(data.cName, {
            x: nameX,
            y: nameY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 계약일
        page1.drawText(data.contractDate, {
            x: contractDateX,
            y: contractDateY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 계약기간
        page1.drawText(data.contractYear, {
            x: contractYearX,
            y: contractYearY,
            font: customFont,
            size: 10,
            color: rgb(0, 0, 0),
        });



        // 계약자명
        page1.drawText(data.cName, {
            x: nameX2,
            y: nameY2,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 계약자명
        page1.drawText(data.cCell, {
            x: cCellX,
            y: cCellY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 계약자 차량정보
        page1.drawText(data.carNum + ' / '+data.carType, {
            x: carInfoX,
            y: carInfoY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 계약자 서비스 비용(VAT)
        page1.drawText(premiumsVat +'원', {
            x: premiumsVatX,
            y: premiumsVatY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 계약자 서비스 비용
        page1.drawText(data.premiums +'원', {
            x: premiumsX,
            y: premiumsY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 계약자 결제일
        page1.drawText(data.cPayDt, {
            x: cPayDtX,
            y: cPayDtY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });


        // 계약자 성명
        page1.drawText(data.cName, {
            x: contractNameX,
            y: contractNameY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 청구권자 서명 이미지 추가
        page1.drawImage(signImage, {
            x: rsX,
            y: rsY,
            width: rsW,
            height: rsH,
        });

        // 수정된 PDF 파일 저장
        const modifiedBytes = await pdfDoc.save();
        let outName = `${data.cName}_PIT-IN EV케어서비스_계약서.pdf`;
        const outputFilePath = path.join(__dirname, '../../uploads/', outName);
        fs.writeFileSync(outputFilePath, modifiedBytes);
        let result = await uploadRegiFile(outputFilePath, data);

        console.log('result', result );
        return result;
    } catch (err) {
        console.error('Failed to process PDF:', err);
    }
}



module.exports = { addTextAndImageToPDF };
