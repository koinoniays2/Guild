import React from 'react'

export default function SkillGrade5Detail({skill}) {
    // const master = skill?.skill_description?.split("[마스터 레벨 : ");
    // const master2 = master[1].split("]")[0];
    // const masterLv = master2 ? parseInt(master2) : "";
    // console.log(masterLv);
    // console.log(skill);
    const masterDes = skill?.skill_description?.split("\n");
    const masterEffect = skill?.skill_effect?.split("\n");
    
    return (
        <div className="flex flex-col text-white-color space-y-2 text-[12px]">
            <p className="text-sm">{skill?.skill_name}</p>
            <div>
            {masterDes.map((item, index) => (
                <p key={index}>{item}</p>
                ))}
            </div>
            <div className="flex items-start space-x-2">
                <img src={skill?.skill_icon} alt={skill?.skill_name}/>
                <div className="flex flex-col">
                    {masterEffect.map((item, index) => (
                    <p key={index}>{item}</p>
                    ))}
                    <p>{`[레벨 ${skill?.skill_level}]`}</p>
                </div>
            </div>
        </div>
    )
}
