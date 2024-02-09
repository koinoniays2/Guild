import React, { useState } from 'react'

export default function MemberList({ guildMember, onItemClick }) {
    const handleItemClick = (item) => {
        onItemClick(item); // 클릭한 항목을 부모 컴포넌트로 전달
    };

    // 클릭하면 길드원 30명씩 보이기
    const buttonNum = Array.from({ length: Math.ceil(guildMember?.length / 30) });
    const [btnNum, setBtnNum] = useState(0);
    let [firstNum, setFirstNum] = useState(0);
    let [lastNum, setLastNum] = useState(29);
    const btnOnclick = (index) => {
        const newFirstNum = index * 30;
        const newLastNum = Math.min(newFirstNum + 29, guildMember?.length - 1);

        setBtnNum(index);
        setFirstNum(newFirstNum);
        setLastNum(newLastNum);
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-5">
            <p className="w-20 py-1 text-center bg-black rounded-lg">길드원</p>
            <div className="w-full flex justify-center space-x-3">
                {
                    buttonNum.map((_, index) => (
                        <div key={index} className={`w-11 h-2 cursor-pointer ${index === btnNum ? "bg-[#5CCBF9]" : "bg-gray-500"}`}
                            onClick={() => btnOnclick(index)}></div>
                    ))
                }
            </div>
            <div className={`w-full flex flex-wrap justify-center overflow-hidden`}>
                {
                    guildMember?.map((item, index) => (
                        firstNum <= index && index <= lastNum && (
                            <p onClick={() => handleItemClick(item)}
                            className="w-1/3 md:w-1/4 lg:w-1/5 mt-2 text-center text-sm cursor-pointer hover:scale-110 duration-300" key={index}>{item}</p>
                        )
                    ))
                }
            </div>
        </div>
    )
}
