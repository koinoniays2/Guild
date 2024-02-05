import React, { useState } from 'react'
import EquipmentDetail from './EquipmentDetail';

export default function EquipmentSlot({equiment, android}) {
    // 호버상태 state
    const [equipmentOpen, setEquipmentOpen] = useState(false);
    return (
        <div className="relative w-10 h-10 bg-gray-200" 
        // 마우스 호버시 장비아이템, 안드로이드가 있을경우에만 호버상태true
        onMouseEnter={() => {setEquipmentOpen(equiment.item_equipment_slot || android.android_name);}} 
        onMouseLeave={() => setEquipmentOpen(false)}>
            <img className="object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
            src={equiment?.item_icon ? equiment.item_icon : android?.android_icon ? android.android_icon : ""}
            alt={equiment?.item_icon ? equiment.item_icon : android?.android_icon ? android.android_icon : ""}/>
            {/* moMouseEnter시, 장비아이템이 없으면 equiment를 전달하지 않음 true면 전달되어 상태 업데이트되며
            호버상태가 true일때 해당 아이템이 나오는거 */}
            {equipmentOpen &&
            <div className="w-40 h-[400px] bg-black/50 absolute bottom-0 left-1/2 -translate-x-1/2 z-10"style={{ pointerEvents: "none" }}>
                <EquipmentDetail equiment={equiment} android={android} />
            </div>
            }
        </div>
    )
}
