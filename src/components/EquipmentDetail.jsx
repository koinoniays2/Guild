import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { getBorderStyle } from './EquipmentSlot';

export function getGrad(potentialGrad, additionalGrad) {
    return (
        (potentialGrad === "레전드리" || additionalGrad === "레전드리") ? "(레전드리 아이템)" :
        (potentialGrad === "유니크" || additionalGrad === "유니크") ? "(유니크 아이템)" :
        (potentialGrad === "에픽" || additionalGrad === "에픽") ? "(에픽 아이템)" :
        (potentialGrad === "레어" || additionalGrad === "레어") ? "(레어 아이템)" :
        ""
    );
}
// 잠재 색깔
export function potentialColor(equipment) {
    return (
        ( equipment === "레전드리" ) ? "#00ff00" :
        ( equipment === "유니크" ) ? "#ffcc00" :
        ( equipment === "에픽" ) ? "#9966ff" :
        ( equipment === "레어" ) ? "#66ffff" :
        ""
    );
}
// 잠재 문구
const POTENTIAL = "w-full border-t pt-1 border-dashed border-gray-400"
const LUER = "w-3 h-3 border border-white text-[11px] flex p-1.5 justify-center items-center text-white-color font-bold"
export function potentialText(equipment) {
    return (
        ( equipment === "레전드리" ) ? "L" :
        ( equipment === "유니크" ) ? "U" :
        ( equipment === "에픽" ) ? "E" :
        ( equipment === "레어" ) ? "R" :
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
            <div className="flex flex-wrap justify-center items-center px-4">
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
            <div className="w-full flex justify-start items-end space-x-2">
                {
                <img className={`w-10 h-10 object-contain p-1
                ${getBorderStyle(equipment?.potential_option_grade, equipment?.additional_potential_option_grade)}`} 
                src={equipment && equipment.item_shape_icon ? equipment.item_shape_icon : android && android.android_icon ? android.android_icon : ''} alt="item_shape_icon" />
                }
                {/* 장비 착용 레벨 */}
                <div>
                    {
                    equipment?.item_base_option?.base_equipment_level ?
                    <p className="text-[#FFCC00] text-[12px]">REQ LEV: {equipment?.item_base_option?.base_equipment_level}</p>
                    : ""
                    }
                </div>
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
                                <span>{optionLabel} : {keyPercent ? `+${totalValue}%` : `+${totalValue}`}</span>
                            ) : (
                                <>
                                {/* 토탈값(기본옵만 있는게 아니면 텍스트컬러 #66FFFF max_hp_rate와 max_mp_rate는 토탈옵에만 있기 때문에 예외 ) */}
                                <span className={key === "max_hp_rate" || key === "max_mp_rate" ? `` : "text-[#66FFFF]"}>{optionLabel} : 
                                {keyPercent ? `+${totalValue}%` : `+${totalValue}`}</span>
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
                {
                android && <span className="text-[11px] text-white-color">등급: {android?.android_grade}</span>
                }
                </div>
            </div>
            {/* 장비 잠재 */}
            {/* 윗잠 */}
            {equipment?.potential_option_grade ? (
            <div className={POTENTIAL}>
                <div className="flex items-center space-x-1">
                    <div className={LUER}
                    style={{clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                    backgroundColor: potentialColor(equipment?.potential_option_grade)}}>
                    {potentialText(equipment?.potential_option_grade)}
                    </div>
                    <p className="text-[12px]" style={{color: potentialColor(equipment?.potential_option_grade)}}>잠재옵션</p>
                </div>
                <div className="text-[11px] text-white-color">
                    <p>{equipment?.potential_option_1}</p>
                    <p>{equipment?.potential_option_2}</p>
                    <p>{equipment?.potential_option_3}</p>
                </div>
            </div>
            ) : ""}
            {/* 아랫잠 */}
            {equipment?.additional_potential_option_grade ? (
            <div className={POTENTIAL}>
                <div className="flex items-center space-x-1">
                    <div className={LUER}
                    style={{clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                    backgroundColor: potentialColor(equipment?.additional_potential_option_grade)}}>
                    {potentialText(equipment?.additional_potential_option_grade)}
                    </div>
                    <p className="text-[12px]" style={{color: potentialColor(equipment?.additional_potential_option_grade)}}>에디셔널 잠재옵션</p>
                </div>
                <div className="text-[11px] text-white-color">
                    <p>{equipment?.additional_potential_option_1}</p>
                    <p>{equipment?.additional_potential_option_2}</p>
                    <p>{equipment?.additional_potential_option_3}</p>
                </div>
            </div>
            ): ""}
            {/* 설명 */}
            {equipment?.item_description ? (
            <div className={POTENTIAL}>
                <p className="text-[11px] text-white-color">{equipment?.item_description}</p>
                {equipment.special_ring_level ?
                <p className="text-[11px] text-[#ffaa00]">{`[특수 스킬 반지] ${equipment?.item_name} ${equipment?.special_ring_level}레벨`}</p>: ""}
            </div>
            ) : "" }
            {android?.android_description ? (
            <div className={POTENTIAL}>
                <p className="text-[11px] text-white-color">{android.android_description}</p>
            </div>
            ): "" }
            {/* 소울 */}
            {equipment?.soul_name ? (
            <div className={POTENTIAL}>
                <p className="text-[11px] text-[#ffff44]">{equipment?.soul_name}</p>
                <p className="text-[11px] text-white-color">{equipment?.soul_option}</p>
            </div>
            ): "" }
            {/* 모루 */}
            {equipment?.item_shape_name && (equipment?.item_name !== equipment?.item_shape_name) ? (
            <div className={POTENTIAL}>
                <p className="text-[11px] text-[#ccff00]">{`신비의 모루에 의해 [${equipment?.item_shape_name}]의 외형이 합성됨`}</p>
            </div>
            ) : "" }
        </div>
    )
}
