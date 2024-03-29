import React from 'react'
import { FaBookmark } from 'react-icons/fa';

export default function AbilityPreset({ability}) {
    const getTextColor = (ability)=>{
        return (
            (ability === "레전드리") && "bg-[#a4c700]" ||
            (ability === "유니크") && "bg-[#e89c09]" ||
            (ability === "에픽") && "bg-[#7f66d3]" ||
            (ability === "레어") && "bg-[#36b8d0]"
        );
    }
    return (
        <>
        <div>
            <p className="text-[#d4f403] uppercase">ability</p>
            <p className="text-gray-400">어빌리티 프리셋이 설정되지 않았을 경우, [에픽 어빌리티]로<br />
            첫번째줄 : '모든 능력치 15증가'<br />두번째, 세번째줄 : '모든 능력치 5증가' 로 반영됩니다.</p>
        </div>
        <div className="w-full p-1 text-white-color rounded-lg bg-white-color space-y-1">
            <p className={`w-full flex items-center justify-start p-1.5 ${getTextColor(ability?.ability_preset_grade || ability?.ability_grade)} rounded-lg`}>
                <FaBookmark className="mr-2" />{ability?.ability_preset_grade && ability?.ability_preset_grade}{ability?.ability_grade && ability?.ability_grade} 어빌리티</p>
            {ability.ability_info?.map((item, index) => (
            <p key={index} className={`w-full p-0.5 rounded-md text-center ${getTextColor(item.ability_grade)}`}>{item.ability_value}</p>
            ))}
        </div>  
        </>          
    )
}
