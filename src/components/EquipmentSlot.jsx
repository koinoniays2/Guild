import React, { useState } from 'react'
import EquipmentDetail from './EquipmentDetail';
import PetEquipmentDetail from './PetEquipmentDetail';

export function getBorderStyle(potentialGrad, additionalGrad) {
    return (
        (potentialGrad === "레전드리" || additionalGrad === "레전드리") ? "border-2 border-[#00FF00]" :
        (potentialGrad === "유니크" || additionalGrad === "유니크") ? "border-2 border-[#FFCC00]" :
        (potentialGrad === "에픽" || additionalGrad === "에픽") ? "border-2 border-[#9966FF]" :
        (potentialGrad === "레어" || additionalGrad === "레어") ? "border-2 border-[#66FFFF]" :
        "border-none"
    );
}
export default function EquipmentSlot({equipment, android, petIcon, pet, autoSkilIcon, autoSkill}) {
    // 호버상태 state
    const [equipmentOpen, setEquipmentOpen] = useState(false);
    // 잠재등급 border
    const potentialGrad = equipment?.potential_option_grade;
    const additionalGrad = equipment?.additional_potential_option_grade;
    
    return (
        <>
        <div className={`relative w-10 h-10 bg-gray-400
        ${getBorderStyle(potentialGrad, additionalGrad)}`} 
        // 마우스 호버시 장비아이템, 안드로이드가 있을경우에만 호버상태 true // 펫 아이콘이 존재하면 true
        onMouseEnter={() => {setEquipmentOpen(equipment?.item_equipment_slot || android?.android_name || petIcon || autoSkill );}} 
        onMouseLeave={() => setEquipmentOpen(false)}>
            <img className="object-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
            src={equipment?.item_icon || android?.android_icon || petIcon || autoSkilIcon || ""}
            alt={equipment?.item_icon || android?.android_icon || petIcon || autoSkilIcon || ""}/>
        </div>
        {equipmentOpen &&
        //  pointerEvents: "none" : 장비 디테일 호버창은 영향 받지않게 하기(뒤에 가려진 장비 요소들에 바로 호버 가능)
        <section className="w-56 p-2 bg-black/70 absolute left-[40%] -translate-x-[40%] z-10"style={{ pointerEvents: "none" }}>
            {
            (equipment?.item_equipment_slot || android?.android_name) && <EquipmentDetail equipment={equipment} android={android} />
            }
            {pet && <PetEquipmentDetail pet={pet}/>}
            {autoSkill && (<p className="w-full text-center text-white-color text-sm">{autoSkill}</p>)}
        </section>
        }
        </>
    )
}
