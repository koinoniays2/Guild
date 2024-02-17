import React, { useState } from 'react'
import SkillGradeDetail from './SkillGradeDetail';

export default function SkillGrade6Slot({bgcolor, border, skill}) {
    const [skillDetail, setSkillDetail] = useState(false);
    // console.log(skill);
    return (
        <>
        <div className={`relative w-16 h-16 mb-1 ${border}`} style={{clipPath: "polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)"}}>
            <div className={`relative w-16 h-16 ${bgcolor}`} style={{clipPath: "polygon(50% 7%, 88% 30%, 88% 71%, 50% 93%, 12% 71%, 12% 30%)"}}
            onMouseEnter={() => setSkillDetail(true)} onMouseLeave={() => setSkillDetail(false)}>
                <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={skill?.skill_icon} alt={skill?.skill_name}/>
            </div>
        </div>
        {skillDetail && (
            <section className="w-72 p-2 bg-black/70 absolute left-1/2 -translate-x-1/2 z-10"style={{ pointerEvents: "none" }}>
                <SkillGradeDetail skill={skill} />
            </section>
        )}
        </>
    )
}
