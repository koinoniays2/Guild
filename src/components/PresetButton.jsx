import React, { useEffect } from 'react'

export default function PresetButton({presetKinds, preset, setPreset}) {
    const presetNo = presetKinds?.preset_no;
    const dummyArray = Array.from({ length: 3 });
    useEffect(() => {
        setPreset(presetNo);
    }, [presetNo]);
    return (
        <div className="w-full flex items-center justify-between px-2 text-sm text-white-color bg-gray-300 rounded-2xl">
            <p className="uppercase">preset</p>
            <div className="flex justify-center items-center space-x-2 py-1">
            {
            dummyArray.map((_, index) => (
                <button key={index + 1} onClick={() => {setPreset(index + 1)}}
                className={`px-2 py-0.5 rounded-lg ${preset === index + 1 ? 'bg-[#5CCBF9]' : 'bg-[#999]'}`}>
                {index + 1}</button>
            ))
            }
            </div>
        </div>
    )
}
