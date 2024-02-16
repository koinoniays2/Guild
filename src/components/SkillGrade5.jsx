import SkillSlot from "./SkillSlot";

const FourRow = ({children}) => (
    <div className="flex w-full flex-wrap justify-center items-center space-x-3">
        {children}
    </div>
)
const ThreeRow = ({children}) => (
    <div className="flex flex-wrap w-full justify-center items-center space-x-4">
        {children}
    </div>
)
export default function Skill({skill}) {
    console.log(skill);
  return (
    <section className="bg-[#1f354d80] w-full max-w-80 p-3 space-y-2 rounded-lg">
        <p className="text-white-color font-bold">V 매트릭스</p>
        <FourRow>
            <SkillSlot />
            <SkillSlot />
            <SkillSlot />
            <SkillSlot />
        </FourRow>
        <ThreeRow>
            <SkillSlot />
            <SkillSlot />
            <SkillSlot />
        </ThreeRow>
        <FourRow>
            <SkillSlot />
            <SkillSlot />
            <SkillSlot />
            <SkillSlot />
        </FourRow>
    </section>
  )
}

{/* <div className="flex flex-wrap w-full justify-center items-center">
    {skill?.map((item, index) => (
        (index) % 7 === 4 ?
            <SkillSlot key={index} style={marginLeft} skill={item} /> :
            <SkillSlot key={index} skill={item} />
        ))}
</div> */}