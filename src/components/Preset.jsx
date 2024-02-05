import React from 'react'
import EquipmentSlot from './EquipmentSlot';

export default function Preset({ preset, android }) {
    return (
        <section className="w-full flex justify-center items-center space-x-1 p-base">
                {/* 반지1, 반지2, 반지3, 반지4, 포켓 아이템 */}
                <div className="h-[260px] flex flex-col justify-start space-y-1">
                {["반지4", "반지3", "반지2", "반지1", "포켓 아이템"].map((slot, index) => {
                    const item = preset.find((item) => item.item_equipment_slot === slot);
                    return item ? (
                        <EquipmentSlot key={item.item_equipment_slot} 
                        equipmentImg={item.item_icon} equiment={item} />
                    ) : <EquipmentSlot key={`1_col_${index}_none`} />;
                })}
                </div>
                {/* 펜던트, 펜던트2, 무기, 벨트 */}
                <div className="h-[260px] flex flex-col justify-center space-y-1">
                {["펜던트2", "펜던트", "무기", "벨트"].map((slot, index) => {
                    const item = preset.find((item) => item.item_equipment_slot === slot);
                    return item ? (
                        <EquipmentSlot key={item.item_equipment_slot} 
                        equiment={item}/>
                    ) : <EquipmentSlot key={`2_col_${index}_none`} />;
                })}
                </div>
                {/* 모자, 얼장, 눈장, 상의, 하의, 발 */}
                <div className="h-[260px] flex flex-col justify-center space-y-1">
                {["모자", "얼굴장식", "눈장식", "상의", "하의", "신발"].map((slot, index) => {
                    const item = preset.find((item) => item.item_equipment_slot === slot);
                    return item ? (
                        <EquipmentSlot key={item.item_equipment_slot} 
                        equiment={item}/>
                    ) : <EquipmentSlot key={`3_col_${index}_none`} />;
                })}
                </div>
                <div className="h-[260px] flex flex-col justify-end space-y-1">
                {["귀고리", "어깨장식", "장갑", "안드로이드"].map((slot, index) => {
                    const item = preset.find((item) => item.item_equipment_slot === slot);
                    const androidItem = slot === "안드로이드" ? android.android_name && android : null;
                    // console.log(androidItem);
                    return item ? (
                        <EquipmentSlot key={item.item_equipment_slot} 
                        equiment={item} />
                    ) : androidItem ? (
                        <EquipmentSlot key={androidItem.android_name ? androidItem.android_name : "android-none"} 
                        android={androidItem} />
                    ): <EquipmentSlot key={`4_col_${index}_none`} />;
                })}
                </div>
                <div className="h-[260px] flex flex-col justify-center space-y-1">
                {["엠블렘", "뱃지", "훈장", "보조무기", "망토", "기계 심장"].map((slot, index) => {
                    const item = preset.find((item) => item.item_equipment_slot === slot);
                    return item ? (
                        <EquipmentSlot key={item.item_equipment_slot} 
                        equiment={item}/>
                    ) : <EquipmentSlot key={`5_col_${index}_none`} />;
                })}
                </div>
        </section>
    )
}