import React, { useState } from 'react';

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

        
    // 드래그 시작 좌표
    let dragStartX = 0;
    // 드래그 이벤트 핸들러
    const handleDragStart = (event) => {
        // 첫 번째 터치의 X 좌표를 저장
        dragStartX = event.touches[0].clientX;
    }

    const handleDragEnd = (event) => {
        const dragEndX = event.changedTouches[0].clientX;
        const threshold = 50; // 드래그로 감지할 최소 이동 거리

        if (dragStartX - dragEndX > threshold) {
            if (btnNum < buttonNum.length - 1) {
                setBtnNum(btnNum + 1);
                btnOnclick(btnNum + 1);
            }
        } else if (dragEndX - dragStartX > threshold) {
            if (btnNum > 0) {
                setBtnNum(btnNum - 1);
                btnOnclick(btnNum - 1);
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-5">
            <div className="flex flex-col justify-center items-center sm:flex-row space-x-3">
                <p className="w-20 py-1 text-center bg-black rounded-lg">길드원</p>
                <span className="text-gray-300 text-sm">검색하실 길드원을 클릭하세요.</span>
            </div>
            <div className="w-full flex justify-center space-x-3">
                {
                    buttonNum.map((_, index) => (
                        <div key={index} className={`w-11 h-2 cursor-pointer ${index === btnNum ? "bg-[#5CCBF9]" : "bg-gray-500"}`}
                            onClick={() => btnOnclick(index)}></div>
                    ))
                }
            </div>
            <div className={`w-full flex flex-wrap justify-center overflow-hidden`}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}>
                {guildMember?.map((item, index) => (
                        firstNum <= index && index <= lastNum && (
                            <p onClick={() => handleItemClick(item)}
                            className="w-1/3 md:w-1/4 lg:w-1/5 mt-2 text-center text-sm cursor-pointer hover:scale-110 duration-300" key={index}>{item}</p>
                        )
                    ))}
            </div>
        </div>
    )
}
