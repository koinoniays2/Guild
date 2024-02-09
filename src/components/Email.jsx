import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { apiPostGoogleMail } from '../js/api';

export default function Email() {
    const [submitOk, setSubmitOk] = useState(false);
    const { register, handleSubmit, formState: {errors}, reset } = useForm({mode: "onChange"});
    const { mutate, data, isLoading } = useMutation(apiPostGoogleMail, { // data: 서버에서 보내준 데이터, isLoading:전송중, 전송하기 버튼설정
        onSuccess: () => { // 성공했을때 서버에서 주는 데이터
            reset();
            setSubmitOk(true);
            setTimeout(() => setSubmitOk(false), 3000);
        }
    });
    // 폼이 제출될 때 실행 할 함수
    const ouSubmit = (formData) => {
        mutate(formData); //mutate 데이터를 서버로 전송, formData 데이터가 apiPostGoogleMail 함수로 전달되어 서버로 API 요청을 수행
        // console.log(formData);
    };

    return (
        <div className="w-full h-full flex flex-col justify-start items-center text-black-color">
            <div className="w-full py-2 bg-blue-400 text-white-color text-center">
                <h2 className="font-bold">문의하기</h2>
                <p className="text-sm">소중한 의견 감사합니다. :)</p>
            </div>
            <form className="w-full h-full"
            onSubmit={handleSubmit(ouSubmit)}>
                <div className="w-full h-full flex flex-col py-5 justify-center items-center p-base space-y-8">
                    {/* 이름 input */}
                    <div className="w-full">
                        <input className="outline-none w-full p-2 rounded-lg" type="text" placeholder="이름"
                        {...register("name", 
                        { required: "이름을 입력해주세요.", 
                        minLength: {value:2, message: "최소 2글자 이상 입력해주세요."}
                        })}/>
                        {/* 에러메세지 span */}
                        {errors?.name && (
                        <span className="text-red-600 text-sm">
                            {errors?.name?.message}
                        </span>
                        )}
                    </div>
                    {/* 이메일 input */}
                    <div className="w-full">
                        <input className="outline-none w-full p-2 rounded-lg" type="text" placeholder="이메일"
                        {...register("email", {
                            required: "이메일을 입력해주세요.",
                            pattern: {
                                value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "이메일 형식으로 입력해 주세요."
                            }
                        })}/>
                        {/* 에러메세지 span */}
                        {errors?.email && (
                            <span className="text-red-600 text-sm">
                                {errors?.email?.message}
                            </span>
                        )}
                    </div>
                    <div className="w-full h-1/3">
                        <textarea className="w-full h-full outline-none p-2 rounded-lg" placeholder="내용" 
                        {...register("message", {
                            required: "내용을 입력해주세요.",
                            minLength: {
                                value: 5,
                                message: "5글자 이상 작성해주세요."
                            }
                        })}/>
                        {errors?.message && (
                        <span className="text-red-600 text-sm py-1">
                            {errors?.message?.message}
                        </span>
                        )}
                    </div>
                    {/* 버튼 */}
                    <button className={`bg-blue-400 text-white-color py-2 px-5 rounded-lg hover:bg-blue-500 duration-300
                    ${isLoading ? 'bg-gray-500 hover:bg-gray-500' : 'bg-blue-400'}`}
                    type="submit"> {isLoading ? "전송중" : "전송하기"}</button>
                    {
                        submitOk &&
                    <span className="text-red-600 text-sm">메일이 전송되었습니다.</span>
                    }
                </div>
            </form>
        </div>
    )
}
