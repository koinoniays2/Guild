import React, { useState } from 'react'

export default function EquipmentSlot({equipmentImg}) {
    // 호버상태 state
    const [equipmentOpen, setEquipmentOpen] = useState(false);
    return (
        <div className="relative w-10 h-10 bg-gray-200" onMouseEnter={() => setEquipmentOpen(true)} onMouseLeave={() => setEquipmentOpen(false)}>
            <img className="object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={equipmentImg} 
            alt={equipmentImg ? equipmentImg : ""}/>
            {equipmentOpen &&
            <div className="w-40 h-[400px] bg-black/50 absolute bottom-0 left-1/2 -translate-x-1/2 z-10"style={{ pointerEvents: "none" }}>
            </div>
            }
        </div>
    )
}
