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

const inputFilePath = path.join(__dirname,'../template/PIT-IN EV케어서비스_계약서.pdf');
const checkMark = path.join(__dirname,'../template/images/check-mark.png');
// 입력할 문자열과 이미지의 위치와 내용을 설정합니다.
// Check Mark 이미지 위치
const cmW = 10;  //  이미지 사이즈 정의
const cmH = 10;  //  이미지 사이즈 정의
// 계약자 성명
const nameX = 230;
const nameY = 670;


const contractDate = dayjs().format('YYYY-MM-DD');
const contractDateX = 270;
const contractDateY = 568;

// 법인 개인명
const nameX2 = 270;
const nameY2 = 500;

const contractYear = dayjs().format('YYYY-MM-DD').toString() + ' ~ '+dayjs().add(365, 'day').format('YYYY-MM-DD').toString()+'(1년)';
const contractYearX = 270;
const contractYearY = 545;

const busiTypeX = 330;
const busiTypeY = 525;

const cCellX = 265;
const cCellY = 452;

const contractNameX = 400;
const contractNameY = 138;

// 청구권자 서명 이미지 위치
const rsW = 50;  //  이미지 사이즈 정의
const rsH = 20;  //  이미지 사이즈 정의
const rsX = 475;
const rsY = 100;



async function addTextAndImageToPDF(data) {
    // 입력 파일 로드
    const inputBytes = fs.readFileSync(inputFilePath);
    const pdfDoc = await PDFDocument.load(inputBytes);
    let today = _util.getTimeyymmddhhmmss('day');
    pdfDoc.registerFontkit(fontkit);
    console.log("data is :::: ", data);

    const fontBytes = fs.readFileSync(path.join(__dirname, '../template/fonts/PretendardVariable.ttf'));
    const customFont = await pdfDoc.embedFont(fontBytes);

    // Check Mark 이미지 로드
    const signatureBytes = fs.readFileSync(checkMark);
    const signatureImage = await pdfDoc.embedPng(signatureBytes);

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
        page1.drawText(contractDate, {
            x: contractDateX,
            y: contractDateY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 계약기간
        page1.drawText(contractYear, {
            x: contractYearX,
            y: contractYearY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 사업자 구분
        page1.drawImage(signatureImage , {
            x: busiTypeX,
            y: busiTypeY,
            width: cmW,
            height: cmH,
        });

        // 계약자명
        page1.drawText(data.cName, {
            x: nameX2,
            y: nameY2,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // 계약자 연락처
        page1.drawText(data.cCell, {
            x: cCellX,
            y: cCellY,
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
        return result;
    } catch (err) {
        console.error('Failed to process PDF:', err);
    }
}



module.exports = { addTextAndImageToPDF };
