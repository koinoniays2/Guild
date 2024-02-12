import React from 'react'

export default function HyperStatPreset({hyper}) {
    // console.log(hyper);
    // 모든 하이퍼스탯이 0인지 확인
    const allStatsZero = hyper.every(item => item.stat_level === 0);
    return (
        <>
        <p className="text-[#d4f403] uppercase">hyper stat</p>
        <div className="w-full min-h-20 text-[12px] text-white-color bg-[#86939F] p-2 rounded-lg">
            {allStatsZero ? 
            <p className="w-full h-full text-center leading-[80px] text-white-color text-sm">프리셋이 설정되지 않았습니다.</p> : 
            // 하이퍼스탯 이름/레벨
            hyper.map((item, index) => (
            <div key={index} className="w-full flex justify-between items-start space-x-5">
                <div>
                    {item.stat_level !== 0 ? <p>{item.stat_type}
                    {item.stat_level !== 0 ? <span className="bg-gray-500 px-1 m-0.5 rounded-md">{`Lv.${item.stat_level}`}</span> : ""}</p> : ""}
                    
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
