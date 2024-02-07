import React, { useState } from 'react'
import EquipmentDetail from './EquipmentDetail';

export function getBorderStyle(potentialGrad, additionalGrad) {
    return (
        (potentialGrad === "레전드리" || additionalGrad === "레전드리") ? "border-2 border-[#00FF00]" :
        (potentialGrad === "유니크" || additionalGrad === "유니크") ? "border-2 border-[#FFCC00]" :
        (potentialGrad === "에픽" || additionalGrad === "에픽") ? "border-2 border-[#9966FF]" :
        (potentialGrad === "레어" || additionalGrad === "레어") ? "border-2 border-[#66FFFF]" :
        "border-none"
    );
}
export default function EquipmentSlot({equipment, android}) {
    // 호버상태 state
    const [equipmentOpen, setEquipmentOpen] = useState(false);
    // 잠재등급 border
    const potentialGrad = equipment?.potential_option_grade;
    const additionalGrad = equipment?.additional_potential_option_grade;
    
    return (
        <div className={`relative w-10 h-10 bg-gray-200
        ${getBorderStyle(potentialGrad, additionalGrad)}`} 
        // 마우스 호버시 장비아이템, 안드로이드가 있을경우에만 호버상태true
        onMouseEnter={() => {setEquipmentOpen(equipment?.item_equipment_slot || android?.android_name);}} 
        onMouseLeave={() => setEquipmentOpen(false)}>
            <img className="object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
            src={equipment?.item_icon ? equipment.item_icon : android?.android_icon ? android.android_icon : ""}
            alt={equipment?.item_icon ? equipment.item_icon : android?.android_icon ? android.android_icon : ""}/>
            {/* moMouseEnter시, 장비아이템이 없으면 equiment를 전달하지 않음 true면 전달되어 상태 업데이트되며
            호버상태가 true일때 해당 아이템이 나오는거 */}
            {equipmentOpen &&
            <section className="w-[166px] px-1 pb-2 bg-black/70 absolute bottom-0 left-1/2 -translate-x-1/2 z-10"style={{ pointerEvents: "none" }}>
                <EquipmentDetail equipment={equipment} android={android} />
            </section>
            }
        </div>
    )
}
