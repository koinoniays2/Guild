import React, { useState } from 'react'
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
    const option =  [
        { key: "str", label: "STR" },
        { key: "dex", label: "DEX" },
        { key: "int", label: "INT" },
        { key: "luk", label: "LUK" },
        { key: "max_hp", label: "최대 HP" },
        { key: "max_mp", label: "최대 MP" },
        { key: "max_hp_rate", label: "최대 HP" },
        { key: "max_mp_rate", label: "최대 MP" },
        { key: "attack_power", label: "공격력" },
        { key: "magic_power", label: "마력" },
        { key: "armor", label: "방어력" },
        { key: "jump", label: "점프력" },
        { key: "speed", label: "이동속도" },
        { key: "boss_damage", label: "보스 데미지" },
        { key: "ignore_monster_armor", label: "방어율 무시" },
        { key: "damage", label: "데미지" },
        { key: "all_stat", label: "올스탯" },
        { key: "equipment_level_decrease", label: "착용 레벨 감소" },
        { key: "base_equipment_level", label: "REQ LEV" }
        ]
    // console.log(equipment);
    // console.log(android);
    // 소울
    const soul = equipment?.soul_name;
    const soulSplit = soul?.split("의");
    // 업횟
    const upgradeCount = equipment?.scroll_upgrade;

    return (
        <div className="flex flex-col justify-center items-center space-y-1">
            {/* 스타포스 */}
            <div className="flex flex-wrap justify-center items-center px-3">
                {
                equipment?.starforce &&
                [...Array(parseInt(equipment?.starforce))].map((_, index) => (
                <div key={index} className={`${(index + 1) % 5 === 0 && "mr-1"} mt-2`} >
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
                {option.map((item, index) => {
                    const key = item.key;
                    const optionLabel = item.label;
                    // option에 정의된 key에 맞는 토탈옵, 기본옵, 추옵, 주문서작, 스타포스작 구해오기
                    const totalValue = parseInt(equipment?.item_total_option[key]);
                    const baseValue = parseInt(equipment?.item_base_option[key]);
                    const addValue = parseInt(equipment?.item_add_option[key]);
                    const etcValue = parseInt(equipment?.item_etc_option[key]);
                    const starforceValue = parseInt(equipment?.item_starforce_option[key]);
                    // 보공, 방무, 뎀, 올스탯은 % 붙여야함
                    const keyPercent = key === "boss_damage" || key === "ignore_monster_armor" || key === "damage" || key === "all_stat" ;

                    return (
                        // 총 옵션이 0이 아니고 착감, 착용레벨, 안드로이드가 아닐때
                        totalValue !== 0 && key !=="equipment_level_decrease" && key !== "base_equipment_level" && !android ? (
                            <div key={`total_${index}`} className={`flex text-[11px] text-white-color`}>
                                {/* 토탈옵과 기본옵이 같으면 토탈만 출력(추가 된 옵션이 없다는 뜻이기 때문에) */}
                                {totalValue === baseValue ? (
                                <span>{optionLabel} : {keyPercent ? `${totalValue}%` : totalValue}</span>
                            ) : (
                                <>
                                {/* 토탈값(기본옵만 있는게 아니면 텍스트컬러 #66FFFF max_hp_rate와 max_mp_rate는 토탈옵에만 있기 때문에 예외 ) */}
                                <span className={key === "max_hp_rate" || key === "max_mp_rate" ? `` : "text-[#66FFFF]"}>{optionLabel} : 
                                {keyPercent ? `${totalValue}%` : totalValue}</span>
                                {/* 여는괄호(추옵, 주문서작, 스타포스중에 하나라도 존재하면 여닫는 괄호 필요)*/}
                                {addValue || etcValue || starforceValue ? <span>{`(`}</span> : ""}
                                {/* 기본 추옵(추옵, 주문서작, 스타포스에는 max_hp_rate와 max_mp_rate 옵션이 없음 기본옵에는 0으로 정의되어있고 토탈옵에만 있기때문에 %로 대체 ) */}
                                {baseValue ? <span>{keyPercent ? `${baseValue}%` : baseValue}</span> : key === "max_hp_rate" || key === "max_mp_rate" ? "%" : "0"}
                                {/* 추옵 */}
                                {addValue ? <span className="text-[#ccFF00]">{keyPercent ? `+${addValue}%` : `+${addValue}`}</span> : ""}
                                {/* 주문서작 */}
                                {etcValue ? <span className="text-[#AAAAFF]">{keyPercent ? `+${etcValue}%` : `+${etcValue}`}</span> : ""} 
                                {/* 스타포스 */}
                                {starforceValue ? <span className="text-[#FFCC00]">{`+${starforceValue}`}</span>: ""}
                                {/* 닫는괄호(추옵, 주문서작, 스타포스중에 하나라도 존재하면 여닫는 괄호 필요) */}
                                {addValue || etcValue || starforceValue ? <span>{`)`}</span> : ""}
                                </>
                                )}
                            </div>
                        ) : ""
                    );
                })}
                </div>
            </div>
        </div>
    )
}
