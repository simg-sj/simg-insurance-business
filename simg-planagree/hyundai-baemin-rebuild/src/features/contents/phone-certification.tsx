import Image from "next/image";
import DeleteIcon from "@/assets/images/icon-delete.png";
import React, {useState, useRef, useEffect} from "react";
import {AuthPhase, FieldStatus, PhoneVerificationProps} from "@/@types/common";
import InputField from "@/components/ui/input-field";
import {config} from "@/config";
import {useSearchParams} from "next/navigation";

export default function PhoneVerification({ onVerificationSuccess }: PhoneVerificationProps) {
    const [phase, setPhase] = useState<AuthPhase>('phone');

    // 파라미터 회신
    const params = useSearchParams();
    const insuCompany = params.get('insuCompany');
    const plfNumber = params.get('plfNumber');

    //재전송 타이머, 횟수제한
    const [resendTimer, setResendTimer] = useState<number | null>(null);
    const [canResend, setCanResend] = useState(true);
    const [resendCount, setResendCount] = useState(0); // 현재 재전송 횟수
    const maxResends = 3;  //note. 최대전송횟수 3회로 제한 --> 2회 제한으로 변경함

    // input 입력 상태
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    // 인증번호 상태 추가
    const [generatedCode, setGeneratedCode] = useState("");


    // 메시지 상태
    const [phoneMessage, setPhoneMessage] = useState("");
    const [verificationMessage, setVerificationMessage] = useState("");

    // 필드 상태
    const [activeField, setActiveField] = useState<AuthPhase | null>(null);
    const [errorField, setErrorField] = useState<AuthPhase | null>(null);

    // 참조
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const verificationInputRef = useRef<HTMLInputElement>(null);

    // 유효성 검사 함수
    const isPhoneValid = (phone: string) => /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/.test(phone);
    //note. 인증번호일치여부 유효성검사 추가
    // const isVerificationValid = (code: string) => /^[0-9]{6}$/.test(code); // 테스트할 때 사용했음


    // 버튼 상태
    const isButtonDisabled = phase === 'phone' ? !phoneNumber : !verificationCode;
    const buttonLabel = phase === 'phone' ? "인증번호 전송" : "확인";

    // 초기 포커스 (휴대폰번호 필드 포커스)
    useEffect(() => {
        phoneInputRef.current?.focus();
    }, []);

    //모바일에서 바로 포커스하기
    const focusWithKeyboard = (inputRef: React.RefObject<HTMLInputElement>) => {
        if (inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 200);
        }
    };
    useEffect(() => {
        focusWithKeyboard(phoneInputRef);
    }, []);

    // 입력 필드 초기화
    const resetField = (field: AuthPhase) => {
        if (field === 'phone') {
            setPhoneNumber("");
            setPhoneMessage("");
            phoneInputRef.current?.focus();
        } else {
            setVerificationCode("");
            verificationInputRef.current?.focus();
        }
    };

    // 필드 상태 확인
    const getFieldStatus = (field: AuthPhase): FieldStatus => {
        if (errorField === field) return 'error';
        if (activeField === field) return 'active';
        return 'default';
    };

    // 필드 테두리 스타일
    const getBorderStyle = (status: FieldStatus) => {
        switch (status) {
            case 'error':
                return "border-red-400 border-2";
            case 'active':
                return "border-main border-2";
            default:
                return "border-gray-200";
        }
    };

    //인증번호 전송 타이머
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (resendTimer !== null && resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => (prev ? prev - 1 : 0));
            }, 1000);
        } else if (resendTimer === 0) {
            setCanResend(true); // 타이머 종료 시 재전송 가능 상태로 변경
        }

        return () => clearInterval(timer);
    }, [resendTimer]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // 인증번호 생성 함수
    const certiNumberCreate = () => {
        // 랜덤 숫자 생성 함수
        const random_number = (min: number, max: number): number =>
            Math.floor(Math.random() * (max - min + 1)) + min;

        return random_number(100000, 999999).toString();
    }

    // 인증번호 던지는 함수
    const serverSend = async (sendData:any) => { // aync 비동기처리



        const insuCompanyConfig = config[insuCompany];
        // console.log(insuCompanyConfig);
        const platformInfo = insuCompanyConfig.plfNumber[plfNumber]; // '1'번 플랫폼 정보 가져오기
        console.log('platforminfo : ',platformInfo.apiKey);

        const apiKey = platformInfo.apiKey;
        const smsUrl = platformInfo.urls.sendSmsUrl;

        console.log(smsUrl);


        try{
            const response = await fetch(smsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-SECRET': apiKey
                },
                body: JSON.stringify(sendData),
            });
            const data = await response.json();
            // console.log(data);
        }catch (e) {
            console.log(e);
        }




    }

    // 인증번호 전송 및 확인
    const handleAction = async () => {


        console.log('phase check : ', phase);
        if (phase === 'phone') {
            if (!isPhoneValid(phoneNumber)) {
                setPhoneMessage("유효한 휴대폰 번호를 입력해주세요.");
                setErrorField('phone');
                phoneInputRef.current?.focus();
                return;
            }
            //인증번호발송 로직 추가
            let certNum = certiNumberCreate();
            setGeneratedCode(certNum);
            // console.log('인증번호 : ' + certNum); // 인증번호 확인 ~ 배포할때는 주석처리
            // console.log("인증번호 발송 휴대폰번호 : " + phoneNumber); // 배포할때는 주석처리
            let sendDate = { // 서버에 던질 객체
                cell: phoneNumber, // 받는 사람 전화번호
                code: certNum // 인증번호
            }

            try {

                await serverSend(sendDate);

                setPhoneMessage("인증번호가 전송되었습니다.");
                // 타이머 초기화 및 시작
                setResendCount(1); // 첫 번째 전송은 1회로 간주
                setCanResend(false); // 재전송 비활성화
                setResendTimer(1); // 180초(3분) 타이머 시작 note.인증번호 전송시 3분지난 후 재발송가능
                setPhase('verification');
                setTimeout(() => {
                    verificationInputRef.current?.focus();
                    setActiveField('verification');
                }, 0);

            }catch (e) {

                setVerificationMessage("문자전송실패\n- 고객센터(1877-3006) 으로 문의 바랍니다.");

                return;
            }



        } else {

            // console.log("사용자 입력 인증번호 : " + verificationCode);
            //인증번호 일치하지않는 경우
            // if (!isVerificationValid(verificationCode)) {
            if(generatedCode != verificationCode){
                setVerificationMessage("인증번호가 일치하지 않습니다.");
                setErrorField('verification');
                verificationInputRef.current?.focus();
                return;
            }

            // 인증 성공 시 콜백 호출
            onVerificationSuccess(phoneNumber);
        }
    };
    // 인증번호 재전송
    const handleResendCode = async () => {

        if(phase === 'verification'){ // 재인증 페이즈일때 흠..굳이 인가?

            if (!isPhoneValid(phoneNumber)) {
                setPhoneMessage("유효한 휴대폰 번호를 입력해주세요.");
                setErrorField('phone');
                phoneInputRef.current?.focus();
                return;
            }

            let certNum = certiNumberCreate();
            setGeneratedCode(certNum);
            let sendDate = { // 서버에 던질 객체
                cell: phoneNumber, // 받는 사람 전화번호
                code: certNum // 인증번호
            }

            try {

                await serverSend(sendDate);

            } catch (e) {

                setVerificationMessage("문자전송실패\n- 고객센터(1877-3006) 으로 문의 바랍니다.");

                return;
            }

            if (resendCount < maxResends && canResend) {
                //note. 재전송시 인증번호발송 로직 추가
                setPhoneMessage("인증번호가 재전송되었습니다.");
                setVerificationCode("");
                verificationInputRef.current?.focus();
                setResendCount((prev) => prev + 1); // 재전송 횟수 증가
                setCanResend(false); // 재전송 버튼 비활성화
                setResendTimer(180); // 180초(3분) 타이머 설정 note.인증번호 전송시 3분지난 후 재발송가능
            } else if (resendCount >= maxResends) {
                setPhoneMessage("인증번호 최대 전송 횟수를 초과했습니다.");
                setErrorField('phone');
                return;
            }

        }

    };

    //휴대폰번호 최대 자리수, 숫자만 허용
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 숫자만 허용하고 최대 11자리까지만 입력
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
        setPhoneNumber(value);
        setErrorField(null);
        setPhoneMessage("");
    };

    //인증번호 최대 자리수, 숫자만 허용
    const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 숫자만 허용하고 6자리까지만 입력
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
        setVerificationCode(value);
        setVerificationMessage("");
        setErrorField(null);
    };

    return (
        <div className="space-y-4">
            {/* 휴대폰 번호 입력 필드 */}
            <div className={`input-box ${getBorderStyle(getFieldStatus('phone'))}`}>
                <div className="flex-between mb-2">
                    <label htmlFor="phone" className="text-base text-gray-700">휴대폰번호</label>
                    {phoneMessage && (
                        <div
                            className={`text-sm ${phoneMessage.includes("유효한") || phoneMessage.includes("최대 전송 횟수") ? "text-red-500" : "text-main"}`}>
                            {phoneMessage}
                        </div>
                    )}
                </div>

                <div className="flex-between">
                    <input
                        id="phone"
                        type="number"
                        placeholder="인증받을 번호를 - 없이 입력"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        onFocus={() => setActiveField('phone')}
                        onBlur={() => setActiveField(null)}
                        inputMode="numeric" // 모바일에서 숫자 키패드 표시
                        ref={phoneInputRef}
                        maxLength={11}
                        className="w-full outline-none placeholder-gray-400 border-0 text-xl"
                    />
                    {resendTimer !== null && (
                        <div className="text-gray-700 text-base">
                            {canResend ? null : formatTime(resendTimer)}
                        </div>
                    )}
                    {phase === 'verification' ? (
                        <button
                            className={`text-white ml-3 btn-small ${
                                (!canResend || resendCount >= maxResends) ? 'bg-main-lighter cursor-not-allowed' : 'bg-main-light'
                            }`}
                            onClick={handleResendCode}
                        >
                            재전송
                        </button>

                    ) : (
                        phoneNumber && (
                            <Image
                                src={DeleteIcon}
                                alt="지우기"
                                width={20}
                                height={20}
                                className="cursor-pointer ml-3"
                                onClick={() => resetField('phone')}
                            />
                        )
                    )}
                </div>
            </div>

            {/* 인증번호 입력 필드 */}
            {phase === 'verification' && (
                <InputField
                    id="verification"
                    label="인증번호"
                    placeholder="인증번호 6자리 입력"
                    value={verificationCode}
                    fieldName="verification"
                    error={verificationMessage}
                    formSubmitted={!!verificationMessage}
                    focused={activeField === 'verification'}
                    onFocus={() => setActiveField('verification')}
                    onBlur={() => setActiveField(null)}
                    onChange={handleVerificationCodeChange}
                    clearField={() => resetField('verification')}
                    inputRef={verificationInputRef}
                    type="number"
                    maxLength={6}
                />
            )}

            <footer className="footer-container">
                <button
                    className={`btn-base text-white ${isButtonDisabled ? "bg-main-lighter" : "bg-main"} w-full`}
                    disabled={isButtonDisabled}
                    onClick={handleAction}
                >
                    {buttonLabel}
                </button>
            </footer>
        </div>
    );
}