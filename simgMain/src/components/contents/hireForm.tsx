import React, {useState} from "react";
import Image from "next/image";
import Arrow from "@/assets/images/icon/arrow_icon.png";
import Accordion from "@/components/ui/accordion";
import FileUpload from "@/components/ui/fileUpload";
import {FileWithPreview} from '@/@types/common'
import { useForm } from "react-hook-form";
import {FormProps, ApplicationFormProps} from "@/@types/common";

const ApplicationForm = ({ onBack }: ApplicationFormProps) => {
    const handleBack = () => {
        const confirmLeave = window.confirm("작성 중인 내용이 모두 사라집니다. 페이지를 나가시겠습니까?");
        if (confirmLeave) {
            onBack();
        }
    };

    const [resumeFiles, setResumeFiles] = useState<FileWithPreview[]>([]);
    const [otherFiles, setOtherFiles] = useState<FileWithPreview[]>([]);

    // 지원서작성 유효성검사
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormProps>({
        mode: "onChange"
    });

    const watchPath = watch("path");

    //지원서 제출
    const onSubmit = async (data: FormProps) => {
        if (window.confirm(`${data.name}님 지원서를 제출하시겠습니까? 지원서 제출 후 수정 및 삭제는 불가능합니다.`)){
            console.log(data); //지원자 정보
            console.log("Resume files:", resumeFiles); //이력서파일
            console.log("Other files:", otherFiles); //기타파일
            alert(`${data.name}님 지원서가 제출되었습니다. 지원해주셔서 감사합니다.`);
            onBack();
        }
    };



    const accordionItems = [
        {
            title: <div className={'flex gap-4 items-center text-gray-800 text-base'}>
                <input
                    type={'checkbox'}
                    className={'w-4 h-4'}
                    {...register('requiredConsent', {
                        required: "개인정보 필수항목 수집 및 이용에 동의해주세요"
                    })}
                />
                <div>(필수) 개인정보 필수항목 수집 이용 동의<span className={'text-m-blue'}> *</span></div>
            </div>,
            content: <div className={'text-sm'}>
                <div>에스아이엠지(이하 “회사”라 함)는 홈페이지를 통한 채용 절차 진행을 위하여 귀하의 정보를 수집합니다.</div>
                <div>1. 수집하는 개인정보의 필수항목<br/>
                    · 성명, 전화번호, 이메일<br/>
                    2. 개인정보처리의 목적<br/>
                    · 채용 관련 안내, 공지사항 전달, 채용 및 웹사이트 이용 관련 연락, 채용 적합성 판단 및 서류심사/면접 등의 근거 자료, 인재 DB 활용 등<br/>
                    3. 보유기간<br/>
                    · 접수 지원 후 3년간, 단 정보주체의 삭제 요청이 있는 경우 지체없이 파기<br/>
                    ※ 회사는 본인이 작성/제출한 정보에 한하여 정보를 수집합니다. 채용서비스의 특성상 민감한 정보 등이 수집될 수 있으니 작성/제출에 유의하여 주시기 바랍니다.<br/>
                    ※ 귀하는 개인 정보 수집ㆍ이용에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 원활한 기업 측으로의 지원자 정보 전달을 진행할 수 없어 본건 서비스에
                    제한을 받을 수 있습니다.<br/>
                </div>
            </div>,
            onCheckChange: (checked: boolean) => {
                setValue('requiredConsent', checked, {
                    shouldValidate: true
                });
            }
        },
        {
            title: <div className={'flex gap-4 items-center text-gray-800 text-base'}>
                <input
                    type={'checkbox'}
                    className={'w-4 h-4'}
                    {...register('optionalConsent')}
                />
                <div>(선택) 개인정보 선택항목 수집 및 이용 동의</div>
            </div>,
            content: <div className={'text-sm'}>
                <div>에스아이엠지(이하 “회사”라 함)는 홈페이지를 통한 채용 절차 진행을 위하여 귀하의 정보를 수집합니다.</div>
                <div>1. 수집하는 개인정보의 선택항목<br/>
                    생년월일, 주소, 자기소개서, 이력서, 학력사항, 사진, 동영상, 자격사항, 경력사항, 포트폴리오, 경력기술서, 지원 분야, 희망연봉, 직전 연봉, 추천인, 지원 경로,
                    기타 본인이 직접 입력하거나 첨부파일을 통하여 업로드 하는 비정형적 정보 중 개인식별 가능성이 있는 정보
                    (해당 내용에 대하여 각 항목별 동의가 일치하지 않을 경우 해당 자료의 처리가 불가능하므로, 직접 기재한 사항에 대하여는 선택적 개인정보 수집 및 이용에 동의하신 것으로
                    봅니다. 수집 및 이용에 동의하지 않으시는 경우 해당 내용을 삭제하여 주시기 바랍니다)<br/>
                    2. 개인정보처리의 목적<br/>
                    채용 관련 안내, 공지사항 전달, 채용 및 웹사이트 이용 관련 연락, 채용 적합성 판단 및 서류심사/면접 등의 근거 자료, 인재 DB 활용 등<br/>
                    3. 보유기간<br/>
                    접수 지원 후 3년간, 단 정보주체의 삭제 요청이 있는 경우 지체없이 파기<br/>
                    ※ 회사는 본인이 작성/제출한 정보에 한하여 정보를 수집합니다. 채용서비스의 특성상 민감한 정보 등이 수집될 수 있으니 작성/제출에 유의하여 주시기 바랍니다.<br/>
                    ※ 귀하는 개인 정보 수집ㆍ이용에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 원활한 기업 측으로의 지원자 정보 전달을 진행할 수 없어 본건 서비스에
                    제한을 받을 수 있습니다.
                </div>
            </div>,
            onCheckChange: (checked: boolean) => {
                setValue('optionalConsent', checked);
            }
        }
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <button
                onClick={handleBack}
                className="absolute top-[45px] text-gray-600 flex items-center hover:text-gray-800 mb-5"
            >
                <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <div className="text-3xl font-medium mb-3">지원서 작성</div>
            <div className="text-gray-600 mb-10">지원서 제출 후 수정 및 삭제가 불가능합니다.</div>
            <div className="flex gap-10 flexCol text-base">
                <div className="text-lg border-t-2 border-y-gray-200 pt-2 px-2 w-[300px]">
                    지원자정보
                </div>
                <div className="border-t-2 border-y-gray-200 pt-3 px-2 w-[900px] text-gray-600 space-y-4">
                    <div className="flex flexCol2">
                        <div className="w-[130px]">이름<span className="text-m-blue"> *</span></div>
                        <input
                            className="w-full"
                            type="text"
                            {...register("name", {required: "이름은 필수입력사항 입니다"})}
                        />
                    </div>
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

                    <div className="flex flexCol2">
                        <div className="w-[130px]">연락처<span className="text-m-blue"> *</span></div>
                        <input
                            className="w-full"
                            type="tel"
                            {...register("phone", {
                                required: "연락처는 필수입력사항 입니다",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "숫자만 입력해주세요"
                                }
                            })}
                        />
                    </div>
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                    <div className="flex items-center flexCol2">
                        <div className="w-[130px]">이메일<span className="text-m-blue"> *</span></div>
                        <div className="flex gap-3 items-center w-full">
                            <input
                                type="text"
                                className="w-1/2"
                                {...register("email", {
                                    required: "이메일 아이디는 필수입니다"
                                })}
                            />
                            <span className="mx-1 text-center">@</span>
                            <input
                                type="text"
                                list="email-list"
                                className="w-1/2"
                                {...register("emailList", {
                                    required: "이메일 도메인은 필수입니다"
                                })}
                            />
                            <datalist id="email-list">
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="hanmail.com">hanmail.com</option>
                                <option value="daum.net">daum.net</option>
                                <option value="nate.com">nate.com</option>
                                <option value="korea.kr">korea.kr</option>
                                <option value="icloud.com">icloud.com</option>
                                <option value="outlook.com">outlook.com</option>
                            </datalist>
                        </div>
                    </div>
                    {(errors.email || errors.emailList) && (
                        <div className="text-red-500 text-sm">
                            {errors.email?.message} {errors.emailList?.message}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-10 mt-10 flexCol">
                <div className="text-lg border-t-2 border-y-gray-200 pt-2 px-2 w-[300px]">
                    학력사항
                </div>
                <div className="border-t-2 border-y-gray-200 pt-3 px-2 w-[900px] text-gray-600 space-y-4 text-base">
                    <div className="flex flexCol2">
                        <div className="w-[130px]">최종학력<span className="text-m-blue"> *</span></div>
                        <select
                            className="w-full"
                            {...register("education", {
                                required: "최종학력을 선택해주세요",
                                validate: value => value !== "" || "최종학력을 선택해주세요"
                            })}
                        >
                            <option value="">선택해주세요</option>
                            <option value="초등학교">초등학교</option>
                            <option value="중학교">중학교</option>
                            <option value="고등학교">고등학교</option>
                            <option value="대학교 (2,3년)">대학교 (2,3년)</option>
                            <option value="대학교 (4년)">대학교 (4년)</option>
                            <option value="대학교 (석사)">대학교 (석사)</option>
                            <option value="대학교 (박사)">대학교 (박사)</option>
                        </select>
                    </div>
                    {errors.education && (
                        <span className="text-red-500 text-sm">{errors.education.message}</span>
                    )}

                    <div className="flex flexCol2">
                        <div className="w-[130px]">입학년월<span className="text-m-blue"> *</span></div>
                        <div className="flex gap-3 items-center w-full">
                            <select
                                className="w-1/2"
                                {...register("enrollmentYear", {
                                    required: "입학년도를 선택해주세요",
                                    validate: value => value !== "" || "입학년도를 선택해주세요"
                                })}
                            >
                                <option value="">선택해주세요</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <div>년</div>
                            <select
                                className="w-1/2"
                                {...register("enrollmentMonth", {
                                    required: "입학월을 선택해주세요",
                                    validate: value => value !== "" || "입학월을 선택해주세요"
                                })}
                            >
                                <option value="">선택해주세요</option>
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                            <div>월</div>
                        </div>
                    </div>
                    {(errors.enrollmentYear || errors.enrollmentMonth) && (
                        <span className="text-red-500 text-sm">
                            {errors.enrollmentYear?.message || errors.enrollmentMonth?.message}
                        </span>
                    )}

                    <div className="flex flexCol2">
                        <div className="w-[130px]">졸업년월<span className="text-m-blue"> *</span></div>
                        <div className="flex gap-3 items-center w-full">
                            <select
                                className="w-1/2"
                                {...register("graduationYear", {
                                    required: "졸업년도를 선택해주세요",
                                    validate: value => value !== "" || "졸업년도를 선택해주세요"
                                })}
                            >
                                <option value="">선택해주세요</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <div>년</div>
                            <select
                                className="w-1/2"
                                {...register("graduationMonth", {
                                    required: "졸업월을 선택해주세요",
                                    validate: value => value !== "" || "졸업월을 선택해주세요"
                                })}
                            >
                                <option value="">선택해주세요</option>
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                            <div>월</div>
                        </div>
                    </div>
                    {(errors.graduationYear || errors.graduationMonth) && (
                        <span className="text-red-500 text-sm">
                            {errors.graduationYear?.message || errors.graduationMonth?.message}
                        </span>
                    )}
                </div>
            </div>
            <div className="flex gap-10 mt-10 flexCol">
                <div className="text-lg border-t-2 border-y-gray-200 pt-2 px-2 w-[300px]">
                    제출서류
                </div>
                <div className="border-t-2 border-y-gray-200 pt-3 px-2 w-[900px] text-gray-600 space-y-4 text-base">
                    <div className="flex flexCol2">
                        <div className="w-[130px]">이력서<span className="text-m-blue"> *</span></div>
                        <FileUpload
                            sectionId="resume"
                            files={resumeFiles}
                            setFiles={setResumeFiles}
                            description ={'이력서는 pdf 파일만 제출이 가능합니다'}
                        />
                    </div>
                    {resumeFiles.length === 0 && (
                        <span className="text-red-500 text-sm">이력서를 업로드해주세요</span>
                    )}

                    <div className="flex flexCol2">
                        <div className="w-[130px]">기타</div>
                        <FileUpload
                            sectionId="other"
                            files={otherFiles}
                            setFiles={setOtherFiles}
                            description ={'기타(포트폴리오, 경력기술서 등) pdf 파일만 제출이 가능합니다'}
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-10 mt-10 flexCol">
                <div className="text-lg border-t-2 border-y-gray-200 pt-2 px-2 w-[300px]">
                    지원정보
                </div>
                <div className="border-t-2 border-y-gray-200 pt-3 px-2 w-[900px] text-gray-600 space-y-4 text-base">
                    <div className="flex flexCol2">
                        <div className="w-[130px]">지원포지션<span className="text-m-blue"> *</span></div>
                        <select
                            className="w-full"
                            {...register("position", {
                                required: "지원포지션을 선택해주세요",
                                validate: value => value !== "" || "지원포지션을 선택해주세요"
                            })}
                        >
                            <option value="">선택해주세요</option>
                            <option value="인사">인사</option>
                            <option value="사업운영기획">사업운영기획</option>
                            <option value="사업개발">사업개발</option>
                            <option value="보험사총무">보험사총무</option>
                            <option value="사무관리">사무관리</option>
                            <option value="CS/CX">CS/CX</option>
                            <option value="백엔드개발자">백엔드개발자</option>
                            <option value="프론트엔드개발자">프론트엔드개발자</option>
                            <option value="디자이너">디자이너</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                    {errors.position && (
                        <span className="text-red-500 text-sm">{errors.position.message}</span>
                    )}
                    <div className="flex flexCol2">
                        <div className="w-[130px]">지원경로<span className="text-m-blue"> *</span></div>
                        <select
                            className="w-full"
                            {...register("path", {
                                required: "지원경로를 선택해주세요",
                                validate: value => value !== "" || "지원경로를 선택해주세요"
                            })}
                        >
                            <option value="">선택해주세요</option>
                            <option value="사람인">사람인</option>
                            <option value="잡코리아">잡코리아</option>
                            <option value="워크넷">워크넷</option>
                            <option value="인크루트">인크루트</option>
                            <option value="사내추천">사내추천</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                    {errors.path && (
                        <span className="text-red-500 text-sm">{errors.path.message}</span>
                    )}

                    {watchPath === '기타' && (
                        <div className={'flex'}>
                            <div className={'w-[130px] etc'}></div>
                        <input
                            className="w-full"
                            type="text"
                            placeholder="기타 지원경로를 입력해주세요"
                            {...register("otherPath", {
                                required: watchPath === '기타' ? "기타 지원경로를 입력해주세요" : false
                            })}
                        />
                        </div>
                    )}
                    {errors.otherPath && (
                        <span className="text-red-500 text-sm ml-[130px]">{errors.otherPath.message}</span>
                    )}

                    <div className={'flex flexCol2'}>
                        <div className={'w-[130px]'}>추천인</div>
                        <input className={'w-full'} type={'text'}
                               placeholder={'지인소개로 지원한경우, 소개해준 분 성함,소속 작성'}
                               {...register("referrer")}/>
                    </div>
                </div>
            </div>
            <div className="flex gap-10 mt-10 flexCol">
                <div className="text-lg border-t-2 border-y-gray-200 pt-2 px-2 w-[300px]">
                    개인정보 동의
                </div>
                <div className="border-t-2 border-y-gray-200 pt-3 px-2 w-[900px] text-gray-600 space-y-2 text-sm">
                    <Accordion items={accordionItems}/>
                    {errors.requiredConsent && (
                        <span className="text-red-500 text-sm block mt-2">
                            {errors.requiredConsent.message}
                        </span>
                    )}
                </div>
            </div>
            <div className={'flex justify-end'}>
                <button
                    type='submit'
                    className="flex items-center justify-end mb-14 cursor-pointer mt-10 hover:font-medium"
                >
                    <div className="mr-3">지원서 제출하기</div>
                    <Image src={Arrow} alt="지원서제출하기" width={22} height={22}/>
                </button>
            </div>
        </form>
    )
        ;
};

export default function HireForm() {
    const [showApplicationForm, setShowApplicationForm] = useState(false);

    const handleShowApplication = () => {
        setShowApplicationForm(true);
    };

    const handleBack = () => {
        setShowApplicationForm(false);
    };

    if (showApplicationForm) {
        return (
            <div className="hire-form" data-step="application">
                <ApplicationForm onBack={handleBack}/>
            </div>
        );
    }


    return (
        <>
            <div className="text-3xl font-medium mb-10">인재풀 등록</div>
            <div
                className="flex items-center justify-end mb-14 cursor-pointer hover:font-medium"
                onClick={handleShowApplication}
            >
                <div className="mr-3">지원서 작성하기</div>
                <Image src={Arrow} alt="지원서작성하기" width={22} height={22}/>
            </div>
            <div className="flex gap-10 flexCol">
                <div className="text-lg border-t-2 border-y-gray-200 pt-2 px-2 w-[300px]">
                    지원 전 반드시 확인해주세요!
                </div>
                <div className="border-t-2 border-y-gray-200 pt-3 px-2 w-[900px] text-gray-600 space-y-1 break-keep text-base">
                    <div>· 인재풀 등록 후에도 일반 상시 채용 공고에 지원할 수 있어요.</div>
                    <div>· 지원 포지션은 가장 희망하시는 분야로 등록해주세요. 단, 이력서 검토 후 다른 적합한 포지션을 제안 드릴 수 있습니다.</div>
                    <div>· 검토 후 서류 합격자에 한하여 개별적으로 연락 드리고 있습니다.</div>
                    <div>· 입사 지원 관련 궁금하신 점은 FAQ를 참고해주세요.</div>
                    <div>· 채용 전형 과정 중에 수집할 수 있는 개인정보는 오직 채용을 목적으로 사용됨을 미리 알려드립니다.</div>
                    <div>· 희망하는 포지션이 오픈 되는 일정은 정해져 있지 않으니 사전에 안내 드리기 어려운 점 양해 부탁 드립니다.</div>
                </div>
            </div>
            <div className="flex gap-10 mt-10 flexCol">
                <div className="text-lg border-t-2 border-y-gray-200 pt-2 px-2 w-[300px]">
                    제출서류
                </div>
                <div className="border-t-2 border-y-gray-200 pt-3 px-2 w-[900px] text-gray-600 space-y-1 text-base">
                    <div>· (필수) 이력서</div>
                    <div>· (선택) 경력기술서</div>
                    <div>· (선택) 포트폴리오</div>
                    <div>· (선택) 기타 (Github / 논문 / 블로그 등)</div>
                </div>
            </div>
            <div className="flex gap-10 mt-10 flexCol">
                <div className="text-lg border-t-2 border-y-gray-200 pt-2 px-2 w-[300px]">
                    채용절차
                </div>
                <div className="border-t-2 border-y-gray-200 pt-3 px-2 w-[900px] text-gray-600 space-y-1 break-keep text-base">
                    <div className="text-m-bluegray mb-3 font-medium">
                        서류전형 -&#62; 인터뷰(포지션에 따라 필요 시 2차 인터뷰) -&#62; 처우협의 -&#62; 최종 합격 및 입사
                    </div>
                    <div>· 포지션 별로 상세 채용 프로세스가 달라질 수 있으며, 상황에 따라 과제 또는 인터뷰 전형이 추가될 수 있습니다.</div>
                    <div>· 이력서 등 모든 서류는 PDF 로 제출해주세요. (PDF 형식 이외의 파일은 검토하지 않습니다.)</div>
                    <div>· 각 전형에서 허위 사실이나 부정행위 발견 시 즉시 영입 절차가 중단/취소될 수 있습니다.</div>
                    <div>· 그 외 추가로 궁금하신 점이 있거나 건의사항이 있다면 아래 채용담당자 이메일로 자유롭게 말씀해주세요!</div>
                    <div className="ml-2 text-gray-800">채용관련 문의 : ej.jang@simg.kr</div>
                </div>
            </div>
        </>
    );
}