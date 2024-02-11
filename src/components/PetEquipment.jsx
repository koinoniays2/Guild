import React from 'react'
import EquipmentSlot from './EquipmentSlot'

export default function PetEquipment({pet}) {
    console.log(pet);
    return (
        <section className="w-full max-w-80 flex flex-col items-center justify-center space-y-5 p-2 rounded-lg bg-gray-200">
            <p className="w-full text-black-color uppercase font-bold text-left">pet</p>
            <div className="w-full flex justify-between items-center">
                <div className="flex space-x-1">
                    {pet?.pet_1_appearance || pet?.pet_1_equipment ? (
                        <>
                        <EquipmentSlot petIcon={pet?.pet_1_appearance_icon} />
                        <EquipmentSlot petIcon={pet?.pet_1_equipment?.item_icon} />
                        </>
                    ) : (
                        <>
                        <EquipmentSlot />
                        <EquipmentSlot />
                        </>
                    )}
                </div>
                <div className="flex space-x-1">
                    {pet?.pet_2_appearance || pet?.pet_2_equipment ? (
                        <>
                        <EquipmentSlot petIcon={pet?.pet_2_appearance_icon} />
                        <EquipmentSlot petIcon={pet?.pet_2_equipment?.item_icon} />
                        </>
                    ) : (
                        <>
                        <EquipmentSlot />
                        <EquipmentSlot />
                        </>
                    )}
                </div><div className="flex space-x-1">
                    {pet?.pet_3_appearance || pet?.pet_3_equipment ? (
                        <>
                        <EquipmentSlot petIcon={pet?.pet_3_appearance_icon} />
                        <EquipmentSlot petIcon={pet?.pet_3_equipment?.item_icon} />
                        </>
                    ) : (
                        <>
                        <EquipmentSlot />
                        <EquipmentSlot />
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
