/**
 작성자 : 유종태
 작성일 : 2020.07.23
 내용 : 비교
 cryptoj-js module
 crypto module

 패딩 : https://www.npmjs.com/package/pkcs7-padding
 https://stackoverflow.com/questions/54649894/rijndael-256-cbc-pkcs7-encryption-decryption-in-nodejs


 * key는
 * AES 256일경우 키가 256bit 즉 32바이트 문자열 이어야 합니다
 * :: 41413580bc93de2dc00d3bb57f46c52c
 *
 * iv 는  base64, hex 든 16바이트면 상관없음  Block 과 같은 사이즈여야한다.
 * :: 3767eb5110f49bf277f9b0355f9df82e  ( 16bye짜리 문자열 )
 *
 * *
 * 기본 데이터 블럭은 16byte
 * IV 라고 하는 것은 동일한 평문을 동일한 키에서 암호화하더라도 매번 다른 결과를 내도록 하기 위해 사용하는 것
 *
 *
 *
 *  --패딩
 *  패딩은 블럭단위 16byte로 마지막 블럭이 안맞을 경우 채워주는역할
 *  crypto 는 기본 pkcs7 을 사용한다.


 테스트 계 : 186b98c6f163bf749e8dfab5f5e16e7a
 IV : d824cb897077f727


 운영 계 : 47531bb1a922e72e37f06397d9b2afc3
 IV : caa8267a0d77cf05

 키는 32바이트
 IV는 블럭과같은개수인 16바이트
 256은 키값의 비트 길이 ==> 즉 32바이트짜리 키값을 생성하는 암호화 방식
 패딩은 pkcs7패디방식 ~


 **/
const crypto = require('crypto');
const pkcs7 = require('pkcs7-padding');

/** 01. KEY 와 IV 값 생성하기 **/
// key 생성 32비트 짜리
crypto.randomBytes(16, (err, buf) => {
    console.log('KEY : ', buf.toString('hex').toUpperCase());
});

// iv 생성 16비트 짜리
crypto.randomBytes(8, (err, buf) => {
    console.log('IV : ', buf.toString('hex'));
});


/** 02. 값 체 크하기 KEY는 AES256일경우 256bit, 32바이트 문자열, iv는 16바이트 문자열**/
let key = '73C7E3853590C2F0FE454772DF82F9FD';
let iv = 'bb3b04d9b8ae308a';
console.log('암호화 키  : ', key);
console.log('암호화 키 길이 : ', key.length); // 32자리가 나와야함
console.log('IV  : ', iv);
console.log('IV 길이 : ', iv.length); // 16자리가 나와야함


let secret_message = '01045228557';

/**
 *
 *
 *
 * 최종완료
 * 2020.12.30
 * 암호화 방식 AES256 CBC모드
 * 암호화키 186b98c6f163bf749e8dfab5f5e16e7a   ==> AES 256일경우 키가 256bit 즉 32바이트 문자열
 * 초기화 벡터 d824cb897077f727 ==> iv 는  base64, hex 든 16바이트면 상관없음  Block 과 같은 사이즈 16바이트 문자열
 * 패딩규칙 PKCS#7
 * 인코딩값 BASE64
 *
 */
var encPromi = promiEncModule(key,iv, secret_message);
var decPromi = promiDecModule(key,iv,encPromi);
console.log('프로미 암호화', encPromi);
console.log('프로미 복호화', decPromi);

function promiEncModule(key, iv, secret_message) {
    secret_message = pkcs7.pad(secret_message, 16); //Use 32 = 256 bits block sizes

    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    cipher.setAutoPadding(false);  // pkcs7 default
    let encrypted = cipher.update(secret_message, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted
}

function promiDecModule(key, iv, encrypted){
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    // cipher.setAutoPadding(false);
    let decrypted = decipher.update(encrypted, 'base64', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted
}