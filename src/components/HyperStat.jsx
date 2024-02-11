import React, { useState } from 'react'
import HyperStatPreset from './HyperStatPreset'
import PresetButton from './PresetButton';

export default function HyperStat({hyper}) {
    // console.log(hyper);
    const [preset, setPreset] = useState();
    return (
        <div className="w-full flex flex-col justify-start items-start text-[12px] p-2 space-y-2 rounded-lg bg-[#2C2F32]">
            {preset === 1 && <HyperStatPreset hyper={hyper?.hyper_stat_preset_1} />} 
            {preset === 2 && <HyperStatPreset hyper={hyper?.hyper_stat_preset_2} />} 
            {preset === 3 && <HyperStatPreset hyper={hyper?.hyper_stat_preset_3} />}
            {/* 프리셋 버튼 */}
            <PresetButton presetKinds={hyper} preset={preset} setPreset={setPreset} />
        </div>
    )
}
