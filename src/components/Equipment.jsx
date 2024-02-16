import React, { useState } from 'react'
import EquipmentPreset from './EquipmentPreset';
import PresetButton from './PresetButton';

export default function Equipment({equipment, android}) {
    const preset1 = equipment?.item_equipment_preset_1;
    const preset2 = equipment?.item_equipment_preset_2;
    const preset3 = equipment?.item_equipment_preset_3;
    const presetTrue = (preset1?.length !== 0 || preset2?.length !== 0|| preset3?.length !== 0);
    const [preset, setPreset] = useState();
    // console.log(equipment);
    
    return (
        <section className="relative w-full max-w-80 flex flex-col items-center justify-center space-y-5 p-2 rounded-lg bg-gray-200">
            <div className="text-black-color uppercase font-bold w-full text-left">
                <p>equipment</p>
                <p className="text-gray-400 text-[12px]">장비 프리셋이 설정되지 않았을 경우,<br /> 1번 프리셋으로 반영됩니다.</p>
            </div>
            {presetTrue ? (
            <>
            {preset === 1 && <EquipmentPreset preset={preset1} android={android} />}
            {preset === 2 && <EquipmentPreset preset={preset2} android={android} />}
            {preset === 3 && <EquipmentPreset preset={preset3} android={android} />}
            {/* 버튼 */}
            <PresetButton presetKinds={equipment} preset={preset} setPreset={setPreset} />
            </>
            ) : (
            <EquipmentPreset preset={equipment?.item_equipment} android={android}/>
            )}
        </section>
    )
}
