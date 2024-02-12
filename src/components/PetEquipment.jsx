import React from 'react'
import EquipmentSlot from './EquipmentSlot';

export default function PetEquipment({pet}) {
    const pet1 = Object.keys(pet).reduce((acc, key) => {
        if (key.includes('pet_1')) {
            acc[key] = pet[key];
        }
        return acc;
    }, {});
    const pet2 = Object.keys(pet).reduce((acc, key) => {
        if (key.includes('pet_2')) {
            acc[key] = pet[key];
        }
        return acc;
    }, {});
    const pet3 = Object.keys(pet).reduce((acc, key) => {
        if (key.includes('pet_3')) {
            acc[key] = pet[key];
        }
        return acc;
    }, {});
    // console.log(pet);
    return (
        pet && (
        <section className="w-full max-w-80 flex flex-col items-center justify-center space-y-5 p-2 rounded-lg bg-gray-200">
            <p className="w-full text-black-color uppercase font-bold text-left">pet</p>
            <div className="w-full flex justify-between items-center">
                <div className="flex space-x-1">
                    <EquipmentSlot petIcon={pet.pet_1_icon || ""} pet={pet1} />
                    <EquipmentSlot petIcon={pet.pet_1_equipment?.item_icon || ""} pet={pet1.pet_1_equipment}/>
                </div>
                <div className="flex space-x-1">
                    <EquipmentSlot petIcon={pet.pet_2_icon || ""} pet={pet2}/>
                    <EquipmentSlot petIcon={pet.pet_2_equipment?.item_icon || ""} pet={pet2.pet_2_equipment}/>
                </div>
                <div className="flex space-x-1">
                    <EquipmentSlot petIcon={pet.pet_3_icon || ""} pet={pet3}/>
                    <EquipmentSlot petIcon={pet.pet_3_equipment?.item_icon || ""} pet={pet3.pet_3_equipment}/>
                </div>
            </div>
        </section>
        )
    )
}