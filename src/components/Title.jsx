import React from 'react'

export default function Title({title}) {
    const titleDec = title?.title_description.split("\n").flatMap(item => item.split(","));
    const filteredTitleDec = titleDec.filter(item => !item.includes("클릭"));
    console.log(filteredTitleDec);
    const dataFormat = (title) => {
        if(title !== "expired" || title !== null ) {
            const date = new Date(title);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분까지 사용가능`;
        } else {
            return ""
        }
    }
    return (
        <section className="relative w-full max-w-80 flex flex-col items-center justify-center space-y-2 py-3 p-base rounded-lg bg-gray-200">
            <p className="w-full text-black-color uppercase font-bold text-left">title</p>
            <div className="w-full p-2 bg-black/70 text-center text-white-color text-sm rounded-md space-y-0.5">
                <p>{title?.title_name}</p>
                {title?.date_option_expire === "expired" ?
                <p className="text-center text-[12px]">사용 기간이 만료되었습니다.</p> 
                : title?.date_option_expire === null ? "" 
                : <p className="text-center text-[12px]">{dataFormat(title?.date_option_expire)}</p> }
                <div className="flex space-x-2">
                    <div className="flex-grow h-14 border border-white flex justify-center items-center rounded-sm bg-gray-400">
                        <img src={title?.title_icon} alt={title?.title_name}/>
                    </div>
                    <div className="w-[75%] text-[12px]">
                        {titleDec.map((item, index) => (
                            <p key={index} className={`text-start ${index > 0 ? 'text-[#ffaa00]' : ''}`}>{item}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
