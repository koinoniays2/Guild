import React from 'react'
import { useQuery } from 'react-query';
import { apiCharacterHEXA, apiCharacterSkill } from '../js/api';
import SkillGrade6Slot from './SkillGrade6Slot';

export default function SkillGrade6({ocid}) {
    // 6차스킬
    const grade = 6;
    const { data:dataGuildMemberSkill, isLoading:isLoadingGuildMemberSkill } = 
    useQuery(["getGuildMemberSkill", ocid, grade], () => apiCharacterSkill(ocid, grade), {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid && !!grade
    });
    let grade6skill;
    if(!isLoadingGuildMemberSkill) grade6skill = dataGuildMemberSkill?.character_skill;
    // console.log(grade6skill);

    // HEXA코어
    const { data:dataGuildMemberHEXA, isLoading:isLoadingGuildMemberHEXA } = useQuery(["getGuildMemberHEXA", ocid], () => apiCharacterHEXA(ocid), {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid 
    })
    let skillHEXA;
    if(!isLoadingGuildMemberHEXA) skillHEXA = dataGuildMemberHEXA?.character_hexa_core_equipment;
    // console.log(skillHEXA);

    // HEXA코어 타입이 반영된 새로운 배열
    const updatedGrade6Skills = grade6skill?.map(item => {
        // skillHEXA 배열에서 item.skill_name을 가진 요소를 찾음
        // let hexaCoreType;
        // if (item.skill_name.includes("분쇄 VI") || item.skill_name.includes("허/실 VI") || item.skill_name.includes("낙뢰")
        // || item.skill_name.includes("점핑 크래시 VI") || item.skill_name.includes("어스 브레이크 VI") || item.skill_name.includes("윈드 스트라이크 VI")
        // || item.skill_name.includes("스톰 브레이크 VI") || item.skill_name.includes("휠 윈드 VI") || item.skill_name.includes("롤링 어썰터 VI")
        // || item.skill_name.includes("글로리 윙:자벨린 VI") || item.skill_name.includes("깨어난 심연")) {
        //     hexaCoreType = "마스터리 코어";
        // } else {
        //     hexaCoreType = skillHEXA?.find(hexa => hexa.linked_skill.some(skill => item.skill_name.includes(skill.hexa_skill_id)))?.hexa_core_type;
        // }
        const hexaCoreType = skillHEXA?.find(hexa => hexa.linked_skill.some(skill => item.skill_name.includes(skill.hexa_skill_id)))?.hexa_core_type;
        if (hexaCoreType) {
            return {
                ...item,
                hexa_core_type: hexaCoreType
            };
        }
        return item;
    });
    // console.log(updatedGrade6Skills);

    // HEXA타입에 따른 슬롯 배경
    const bgColorHEXA = (type) => {
        if (type === "마스터리 코어") return "bg-gradient-to-b from-[#DD77CC] to-[#994499]";
        if (type === "스킬 코어") return "bg-gradient-to-b from-[#BB88EE] to-[#8855dd]";
        if (type === "강화 코어") return "bg-gradient-to-b from-[#66BBCC] to-[#4488dd]";
        if (type === "공용 코어") return "bg-gradient-to-b from-[#aabbee] to-[#7788bb]";
        if (!type) return "bg-[#1f354d]";
        return "";
    }
    
    // 슬롯 border
    const borderColorHEXA = (type) => {
        if (type === "마스터리 코어") return "bg-[#882255]";
        if (type === "스킬 코어") return "bg-[#5533cc]";
        if (type === "강화 코어") return "bg-[#226699]";
        if (type === "공용 코어") return "bg-[#556688]";
        if (!type) return "bg-[#f6f6f6]";
        return "";
    }

    return (
        grade6skill?.length !== 0 ? (
            <section className="w-full max-w-80 relative flex flex-wrap justify-center items-center bg-[#1f354d] p-3 rounded-lg">
                <p className="w-full pb-2 text-white-color font-bold">HEXA 스킬</p>
                {updatedGrade6Skills?.map((item, index) => (
                    <SkillGrade6Slot key={index} skill={item} bgcolor={bgColorHEXA(item.hexa_core_type)} border={borderColorHEXA(item.hexa_core_type)}/>
                ))}
            </section>
        ) : ""
    )
}
