export default function SkillSlot({skill, style}) {
  return (
    <div className={`relative w-14 h-12 bg-gradient-to-b from-[#4C8CA6] via-[#1F77A3] via-70% to-[#43cae7]`} style={{clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"}}>
        <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={skill?.skill_icon} alt=""/>
    </div>
  )
}