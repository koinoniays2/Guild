import SkillSlot from "./SkillSlot";

const FourRow = ({children}) => (
    <div className="flex w-full justify-center items-center space-x-3.5 pb-1">
        {children}
    </div>
)
const ThreeRow = ({children}) => (
    <div className="flex w-full justify-center items-center space-x-4 pt-1">
        {children}
    </div>
)
export default function Skill({skill}) {
    const rows = [];
    for (let i = 0; i < skill?.length; i += 7) {
        const chunkedSkills = skill.slice(i, i + 7);
        rows.push(
            <div key={i}>
                <FourRow>
                    {chunkedSkills.slice(0, 4).map((skill, index) => (
                        <SkillSlot key={index} skill={skill} />
                    ))}
                </FourRow>
                <ThreeRow>
                    {chunkedSkills.slice(4, 7).map((skill, index) => (
                        <SkillSlot key={index} skill={skill} />
                    ))}
                </ThreeRow>
            </div>
        );
    }
    return (
        <section className="relative bg-[#1f354d] w-full max-w-80 p-3 space-y-2 rounded-lg">
            <p className="text-white-color font-bold">V 매트릭스</p>
            {rows}
        </section>
    );
}