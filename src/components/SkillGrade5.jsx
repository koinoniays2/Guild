import SkillSlot from "./SkillSlot";

const ThreeRow = ({children}) => (
    <div className="flex flex-wrap w-full justify-center items-center space-x-3.5">
        {children}
    </div>
)
const FourRow = ({children}) => (
    <div className="flex w-full justify-center items-center space-x-4">
        {children}
    </div>
)
export default function Skill({skill}) {
    console.log(skill);
  return (
    <section className="bg-[#1f354d80] w-full max-w-80 p-3 space-y-2 rounded-lg">
        <p className="text-white-color font-bold">V 매트릭스</p>
        <div className="flex flex-wrap w-full justify-center items-center space-x-4">
            <SkillSlot />
            <SkillSlot />
            <SkillSlot />
            <SkillSlot />
        </div>
    </section>
  )
}