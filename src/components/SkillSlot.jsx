import { useState } from "react";
import SkillGrade5Detail from "./SkillGrade5Detail";

export default function SkillSlot({skill}) {
  const [skillDetail, setSkillDetail] = useState(false);
  // console.log(skill);
  // console.log(skillDetail);
  return (
    <>
      <div className={`relative w-14 h-12 bg-gradient-to-b from-[#4C8CA6] via-[#1F77A3] via-70% to-[#43cae7]`} style={{clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"}}
      onMouseEnter={() => setSkillDetail(true)} onMouseLeave={() => setSkillDetail(false)}>
          <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={skill?.skill_icon} alt={skill?.skill_name}/>    
      </div>
      {skillDetail && (
      <section className="w-72 p-2 bg-black/70 absolute left-0 translate-x-0.5 z-10"style={{ pointerEvents: "none" }}>
        <SkillGrade5Detail skill={skill} />
      </section>
          )}
    </>
  )
}