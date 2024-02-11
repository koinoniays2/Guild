import React, { useState } from 'react'
import Preset from './EquipmentPreset';
import PresetButton from './PresetButton';

export default function Equipment({equipment, android}) {
    const preset1 = equipment?.item_equipment_preset_1;
    const preset2 = equipment?.item_equipment_preset_2;
    const preset3 = equipment?.item_equipment_preset_3;
    const presetTrue = (preset1?.length !== 0 || preset2?.length !== 0|| preset3?.length !== 0);
    const [preset, setPreset] = useState();
    // console.log(equipment);
    
    return (
        <section className="w-full max-w-80 flex flex-col items-center justify-center space-y-5 p-2 rounded-lg bg-gray-200">
            {presetTrue ? (
            <>
            {preset === 1 && <Preset preset={preset1} android={android} />}
            {preset === 2 && <Preset preset={preset2} android={android} />}
            {preset === 3 && <Preset preset={preset3} android={android} />}
            {/* 버튼 */}
            <PresetButton presetKinds={equipment} preset={preset} setPreset={setPreset} />
            </>
            ) : (
            <Preset preset={equipment?.item_equipment} android={android}/>
            )}
        </section>
    )
}
