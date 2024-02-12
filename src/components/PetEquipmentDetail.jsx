import React from 'react'

export default function PetEquipmentDetail({pet}) {
        const petName = (petName, petNick) => {
            let pet = petName === petNick ? petName : `${petNick} (${petName})`;
            return pet;
        }
        console.log(pet);
        return (
            <div className={`flex flex-col py-1 items-center space-y-2 text-[12px]`}>
                {/* 펫 이름, 펫 장비이름(업횟이 존재하지 않으면 흰색) */}
                <p className={`${pet?.scroll_upgrade ? 'text-[#ffaa00]' : 'text-white-color'}`}>
                {petName(pet?.pet_1_name, pet?.pet_1_nickname) || petName(pet?.pet_2_name, pet?.pet_2_nickname) || petName(pet?.pet_3_name, pet?.pet_3_nickname)
                || (pet?.scroll_upgrade !==0 ? `${pet?.item_name}(+${pet?.scroll_upgrade})` : pet?.item_name) || ""}</p>
                {/* 펫 아이콘, 펫장비 아이콘 */}
                <div className="flex space-x-1 text-white-color">
                    <img className="w-12 h-12 object-contain object-center bg-gray-400 rounded-md border border-white-color"
                    src={pet?.pet_1_icon || pet?.pet_2_icon || pet?.pet_3_icon || pet?.item_icon || ""} alt="pet_icon" />
                    <p>{pet?.pet_1_description || pet?.pet_2_description || pet?.pet_3_description || pet?.item_description || ""}</p>
                </div>
                {/* 펫 장비 옵션이 존재하면 */}
                {pet?.item_option && pet?.item_option?.length !== 0 &&
                <div className={`w-full border-t pt-1 border-dashed border-gray-400 text-white-color`}>
                    {pet?.item_option[0] && <p>{`${pet?.item_option[0]?.option_type}: +${pet?.item_option[0]?.option_value}`}</p>}
                    {pet?.item_option[1] && <p>{`${pet?.item_option[1]?.option_type}: +${pet?.item_option[1]?.option_value}`}</p>}
                </div>
                }
            </div>
        )
}
