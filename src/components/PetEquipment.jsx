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
            <div className="w-full flex items-center justify-center space-x-2.5">
                <div className="flex flex-col space-y-1">
                    <p className="text-center text-gray-600 text-sm">펫</p>
                    <EquipmentSlot petIcon={pet.pet_1_icon || ""} pet={pet1} />
                    <EquipmentSlot petIcon={pet.pet_2_icon || ""} pet={pet2}/>
                    <EquipmentSlot petIcon={pet.pet_3_icon || ""} pet={pet3}/>
                </div>
                <div className="flex flex-col space-y-1">
                    <p className="text-center text-gray-600 text-sm">장비</p>
                    <EquipmentSlot petIcon={pet.pet_1_equipment?.item_icon || ""} pet={pet1.pet_1_equipment}/>
                    <EquipmentSlot petIcon={pet.pet_2_equipment?.item_icon || ""} pet={pet2.pet_2_equipment}/>
                    <EquipmentSlot petIcon={pet.pet_3_equipment?.item_icon || ""} pet={pet3.pet_3_equipment}/>
                </div>
                <div className="flex flex-col space-y-1">
                    <p className="text-center text-gray-600 text-sm">자동스킬</p>
                    <div className="flex space-x-1">
                        <EquipmentSlot autoSkilIcon={pet?.pet_1_auto_skill?.skill_1_icon || ""} autoSkill={pet?.pet_1_auto_skill?.skill_1 || ""}/>
                        <EquipmentSlot autoSkilIcon={pet?.pet_1_auto_skill?.skill_2_icon || ""} autoSkill={pet?.pet_1_auto_skill?.skill_2 || ""}/> 
                    </div>
                    <div className="flex space-x-1">
                        <EquipmentSlot autoSkilIcon={pet?.pet_2_auto_skill?.skill_1_icon || ""} autoSkill={pet?.pet_2_auto_skill?.skill_1 || ""}/>
                        <EquipmentSlot autoSkilIcon={pet?.pet_2_auto_skill?.skill_2_icon || ""} autoSkill={pet?.pet_2_auto_skill?.skill_2 || ""}/> 
                    </div>
                    <div className="flex space-x-1">
                        <EquipmentSlot autoSkilIcon={pet?.pet_3_auto_skill?.skill_1_icon || ""} autoSkill={pet?.pet_3_auto_skill?.skill_1 || ""}/>
                        <EquipmentSlot autoSkilIcon={pet?.pet_3_auto_skill?.skill_2_icon || ""} autoSkill={pet?.pet_3_auto_skill?.skill_2 || ""}/> 
                    </div>
                </div>
            </div>
        </section>
        )
    )
}
