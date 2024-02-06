import React from 'react'
import { FaStar } from "react-icons/fa";
import { getBorderStyle } from './EquipmentSlot';

export default function EquipmentDetail({ equipment, android }) {
    console.log(equipment);
    console.log(android);
    // 소울
    const soul = equipment?.soul_name;
    const soulSplit = soul?.split("의");
    // 업횟
    const upgradeCount = equipment?.scroll_upgrade;
    return (
        <div className="flex flex-col justify-center items-center space-y-1 px-3">
            {/* 스타포스 */}
            <div className="flex flex-wrap justify-center items-center">
                {
                equipment?.starforce &&
                [...Array(parseInt(equipment?.starforce))].map((_, index) => (
                <div key={index} className={`${(index + 1) % 5 === 0 && "mr-1"} my-1`} >
                    <FaStar size="8" color={`${equipment?.starforce_scroll_flag === "미사용" ? `yellow` : `#66FFFF`}`} />
                </div>
                ))}
            </div>
            {/* 템, 안드로이드 이름 */}
            <div className="flex flex-col">
                {soul ? 
                <p className="text-sm text-[#CCFF00] text-center">{soulSplit[0]}의</p> : "" }
                <p className={`text-sm ${upgradeCount !== "0" && !android ? "text-[#FF0066]" : "text-white-color" } text-center`}>
                {equipment?.item_name}{(equipment && upgradeCount !== "0") &&`(+${upgradeCount})`}
                {android?.android_name}</p>
            </div>
            {/* 모루 이미지 */}
            <div className="w-full flex justify-start items-center">
                {
                <img className={`w-10 h-10 object-contain p-1
                ${getBorderStyle(equipment?.potential_option_grade, equipment?.additional_potential_option_grade)}`} 
                src={equipment && equipment.item_shape_icon ? equipment.item_shape_icon : android && android.android_icon ? android.android_icon : ''} alt="item_shape_icon" />
                }
            </div>
            {
            
            }
        </div>
    )
}
