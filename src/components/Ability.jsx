import React, { useState } from 'react'
import AbilityPreset from './AbilityPreset';
import PresetButton from './PresetButton';

export default function Ability({ability}) {
    const presetTrue = (ability?.ability_preset_1 || ability?.ability_preset_2 || ability?.ability_preset_3);
    const [preset, setPreset] = useState();
    console.log(ability);
    return (
        <section className="w-80 flex flex-col items-start p-2 space-y-2 rounded-lg bg-[#2C2F32]">
            {presetTrue ? (
            <>
            {preset === 1 && <AbilityPreset ability={ability?.ability_preset_1} />} 
            {preset === 2 && <AbilityPreset ability={ability?.ability_preset_2} />} 
            {preset === 3 && <AbilityPreset ability={ability?.ability_preset_3} />}
            {/* 프리셋 버튼 */}
            <PresetButton presetKinds={ability} preset={preset} setPreset={setPreset} />
            </>
            ) : (
                <AbilityPreset ability={ability && ability} />
            )}
        </section> 
    );
}