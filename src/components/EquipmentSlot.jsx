import React from 'react'

export default function EquipmentSlot({equipmentImg}) {
    return (
        <div className="relative w-10 h-10 bg-gray-200">
            <img className="object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={equipmentImg} 
            alt={equipmentImg ? equipmentImg : ""}/>
        </div>
    )
}
