import React from 'react'

export default function HyperStatPreset({hyper}) {
    // console.log(hyper);
    return (
        <>
        <p className="text-[#d4f403] uppercase">hyper stat</p>
        <div className="w-full text-[12px] text-white-color bg-[#86939F] p-2 rounded-lg">
            {/* 하이퍼스탯 이름/레벨 */}
            {hyper.map((item, index) => (
            <div key={index} className="w-full flex justify-between items-start space-x-5">
                <div>
                    {item.stat_level !== 0 ? <p>{item.stat_type}
                    {item.stat_level !== 0 ? <span className="bg-gray-500 m-0.5">{`Lv.${item.stat_level}`}</span> : ""}</p> : ""}
                    
                </div>
                {/* 하이퍼스탯 효과 */}
                <div>
                    {item.stat_level !== 0 ? <span className="block text-end">{item.stat_increase}</span> : ""}
                </div>
            </div>
            ))}
        </div>
        </>
    )
}
