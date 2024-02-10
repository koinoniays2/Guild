import React, { useEffect, useState } from 'react'
import Preset from './Preset';

export default function Equipment({equipment, android}) {
    const preset1 = equipment.item_equipment_preset_1;
    const preset2 = equipment.item_equipment_preset_2;
    const preset3 = equipment.item_equipment_preset_3;
    const presetNo = equipment.preset_no;
    const dummyArray = Array.from({ length: 3 });
    const [preset, setPreset] = useState();
    useEffect(() => {
        setPreset(presetNo);
    }, [presetNo]);
    
    return (
        <section className="w-fit flex flex-col items-center justify-center space-y-5 py-5">
            { 
            preset === 1 &&
            <Preset preset={preset1} android={android} />
            }
            {
            preset === 2 &&
            <Preset preset={preset2} android={android} />
            }
            {
            preset === 3 &&
            <Preset preset={preset3} android={android} />
            }
            {/* 버튼 */}
            <div className="flex space-x-2">
                {
                    dummyArray.map((_, index) => (
                        <button key={index + 1} onClick={() => {setPreset(index + 1)}}
                        className={`text-white-color px-2 py-0.5 rounded-lg ${preset === index + 1 ? 'bg-[#5CCBF9]' : 'bg-[#999]'}`}>
                        프리셋{index + 1}</button>
                    ))
                }
            </div>
        </section>
    )
}
