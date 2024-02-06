import React from 'react'
import { FaStar } from "react-icons/fa";
import { getBorderStyle } from './EquipmentSlot';

export function getGrad(potentialGrad, additionalGrad) {
    return (
        (potentialGrad === "레전드리" || additionalGrad === "레전드리") ? "(레전드리 아이템)" :
        (potentialGrad === "유니크" || additionalGrad === "유니크") ? "(유니크 아이템)" :
        (potentialGrad === "에픽" || additionalGrad === "에픽") ? "(에픽 아이템)}" :
        (potentialGrad === "레어" || additionalGrad === "레어") ? "(레어 아이템)" :
        ""
    );
}
export default function EquipmentDetail({ equipment, android }) {
    const option = {
        str: "STR",
        dex : "DEX",
        int: "INT",
        luk: "LUK",
        max_hp: "최대 HP",
        max_mp: "최대 MP",
        max_hp_rate: "최대 HP",
        max_mp_rate: "최대 MP",
        attack_power : "공격력",
        magic_power: "마력",
        armor : "방어력", 
        jump: "점프력",
        speed: "이동속도",
        boss_damage : "보스 데미지",
        ignore_monster_armor: "방어율 무시",
        damage : "데미지",
        all_stat : "올스탯",
        equipment_level_decrease: "착용 레벨 감소",
        base_equipment_level: "REQ LEV"
    }
    // console.log(equipment);
    // console.log(android);
    // 소울
    const soul = equipment?.soul_name;
    const soulSplit = soul?.split("의");
    // 업횟
    const upgradeCount = equipment?.scroll_upgrade;
    return (
        <div className="flex flex-col justify-center items-center px-1 space-y-2">
            {/* 스타포스 */}
            <div className="flex flex-wrap justify-center items-center px-2 pt-1">
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
                <p className="text-white-color text-center text-[12px]">{getGrad(equipment?.potential_option_grade, equipment?.additional_potential_option_grade)}</p>
            </div>
            {/* 모루 이미지 */}
            <div className="w-full flex justify-start items-center">
                {
                <img className={`w-10 h-10 object-contain p-1
                ${getBorderStyle(equipment?.potential_option_grade, equipment?.additional_potential_option_grade)}`} 
                src={equipment && equipment.item_shape_icon ? equipment.item_shape_icon : android && android.android_icon ? android.android_icon : ''} alt="item_shape_icon" />
                }
            </div>
            {/* 장비 능력치 */}
            <div className="w-full flex flex-col justify-center items-start">
                <p className="text-white-color text-[12px]">{equipment && equipment.item_equipment_slot === "무기" ? `무기분류: ${equipment?.item_equipment_part}` :
                android ? "장비분류: 안드로이드" :
                `장비분류: ${equipment?.item_equipment_part}`}</p>
                <div className="flex flex-col">
                {Object.entries(equipment?.item_total_option || {}).map(([key, value], index) => {
                    // 토탈value키에 맞는 값이 존재하는지 확인 후 + 시키기 위해
                    const baseValue = parseInt(equipment?.item_base_option[key]);
                    const addValue = parseInt(equipment?.item_add_option[key]);
                    const etcValue = parseInt(equipment?.item_etc_option[key]);
                    const starforceValue = parseInt(equipment?.item_starforce_option[key]);
                    const keyPercent = key === "boss_damage" || key === "ignore_monster_armor" || key === "damage" || key === "all_stat" ;

                    return (
                        value !== "0" && value !== 0 && key !=="equipment_level_decrease" && key !== "base_equipment_level" && !android ? (
                            <div key={`total_${index}`} className={`flex text-[11px] text-white-color`}>
                                {/* 토탈옵과 기본옵이 같으면 토탈만 */}
                                {parseInt(value) === baseValue ? (
                                <span>{option[key]} : {value}</span>
                            ) : (
                                <>
                                {/* 토탈값 */}
                                <span className={key === "max_hp_rate" || key === "max_mp_rate" ? `` : "text-[#66FFFF]"}>{option[key]} : 
                                {keyPercent ? `${value}%` : value}</span>
                                {/* 여는괄호 */}
                                {addValue || etcValue || starforceValue ? <span>{`(`}</span> : ""}
                                {/* 기본 추옵 */}
                                {baseValue ? <span>{keyPercent ? `${baseValue}%` : baseValue}</span> : key === "max_hp_rate" || key === "max_mp_rate" ? "%" : "0"}
                                {/* 추옵 */}
                                {addValue ? <span className="text-[#ccFF00]">{keyPercent ? `+${addValue}%` : `+${addValue}`}</span> : ""}
                                {/* 주문서작 */}
                                {etcValue ? <span className="text-[#AAAAFF]">{keyPercent ? `+${etcValue}%` : `+${etcValue}`}</span> : ""} 
                                {/* 스타포스 */}
                                {starforceValue ? <span className="text-[#FFCC00]">{`+${starforceValue}`}</span>: ""}
                                {/* 닫는괄호 */}
                                {addValue || etcValue || starforceValue ? <span>{`)`}</span> : ""}
                                </>
                                )}
                            </div>
                        ) : null
                    );
                })}
                </div>
            </div>
        </div>
    )
}
