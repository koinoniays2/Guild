import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Top from '../components/Top';
import { apiCharacterAbility, apiCharacterAndroid, apiCharacterDojang, apiCharacterEquipment, apiCharacterHyperStat, apiCharacterPetEquipment, apiCharacterSkill, apiCharacterSymbol, apiCharacterUnion } from '../js/api';
import { useQuery } from 'react-query';
import { formatNumber } from '../lib/functions';
import StatLayout from '../components/StatLayout';
import StatLayoutLayout from '../components/StatLayoutLayout';
import Equipment from '../components/Equipment';
import TopButton from '../components/TopButton';
import MailButton from '../components/MailButton';
import Footer from '../components/Footer';
import Ability from '../components/Ability';
import HyperStat from '../components/HyperStat';
import PetEquipment from '../components/PetEquipment';
import Symbol from '../components/Symbol';
import SkillGrade5 from '../components/SkillGrade5';
// import { useQuery } from 'react-query';
// import { apiOcid } from '../js/api';

export default function CharacterDetail() {
    const { ocid } = useParams();
    const location = useLocation();
    const characterData = location?.state.characterData;
    const characterStat = location?.state.characterStat;
    // console.log("캐릭정보", characterData);
    // console.log(characterStat);
    
    // 페이지 로드 시 스크롤을 맨 위로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 유니온
    const { data:dataGuildMemberUnion, isLoading:isLoadingGuildMemberUnion } = 
    useQuery(["getGuildMemberUnion", ocid && { ocid : ocid }], apiCharacterUnion, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    let union;
    if(!isLoadingGuildMemberUnion) {
        union = dataGuildMemberUnion;
    }
    // console.log(union);
    // 무릉 도장
    const { data:dataGuildMemberDojang, isLoading:isLoadingGuildMemberDojang } = 
    useQuery(["getGuildMemberDojang", ocid && { ocid : ocid }], apiCharacterDojang, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    let dojang;
    if(!isLoadingGuildMemberDojang) {
        dojang = dataGuildMemberDojang;
    }
    // console.log(dojang);
    // 장비아이템
    const { data:dataGuildMemberEquipment, isLoading:isLoadingGuildMemberEquipment } = 
    useQuery(["getGuildMemberEquipment", ocid && { ocid : ocid }], apiCharacterEquipment, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    // console.log(dataGuildMemberEquipment.item_equipment_preset1);
    // console.log(dataGuildMemberEquipment.item_equipment_preset_1);
    // 펫
    const { data:dataGuildMemberPetEquipment, isLoading:isLoadingGuildMemberPetEquipment } = 
    useQuery(["getGuildMemberPetEquipment", ocid && { ocid : ocid }], apiCharacterPetEquipment, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    // console.log(dataGuildMemberPetEquipment);
    // 안드로이드
    const { data:dataGuildMemberAndroid, isLoading:isLoadingGuildMemberAndroid } = 
    useQuery(["getGuildMemberAndroid", ocid && { ocid : ocid }], apiCharacterAndroid, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    // console.log(dataGuildMemberAndroid);
    // 어빌
    const { data:dataGuildMemberAbility, isLoading:isLoadingGuildMemberAbility } = 
    useQuery(["getGuildMemberAbility", ocid && { ocid : ocid }], apiCharacterAbility, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    // console.log(dataGuildMemberAbility);
    // 하이퍼
    const { data:dataGuildMemberHyperStat, isLoading:isLoadingGuildMemberHyperStat } = 
    useQuery(["getGuildMemberHyperStat", ocid && { ocid : ocid }], apiCharacterHyperStat, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    // console.log(dataGuildMemberHyperStat);
    // 심볼
    const { data:dataGuildMemberSymbol, isLoading:isLoadingGuildMemberSymbol } = 
    useQuery(["getGuildMemberSymbol", ocid && { ocid : ocid }], apiCharacterSymbol, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    // console.log(dataGuildMemberSymbol);
    // 스킬
    const { data:dataGuildMemberSkill, isLoading:isLoadingGuildMemberSkill } = 
    useQuery(["getGuildMemberSkill", ocid && { ocid : ocid }], apiCharacterSkill, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    let grade5skill;
    if(!isLoadingGuildMemberSkill) grade5skill = dataGuildMemberSkill?.character_skill;

    return (
        <>
        <Top logoImg="/logo.png" />
        {/* 디테일 전체 컨테이너 */}
        <section className="relative w-full overflow-hidden flex justify-center items-center py-10">
            {/* 배경색 div */}
            <div className="absolute w-full h-full top-0 left-0 bg-blue-50 -z-10"></div>
            {/* 디테일 최대 컨테이너 */}
            <div className="w-full max-w-5xl flex flex-col justify-center items-center space-y-5">
                {/* 캐릭창(캐릭 정보, 유니온 무릉) */}
                <div className="w-full max-w-80 flex justify-center items-end space-x-1">
                    {/* 캐릭정보 */}
                    <div className="relative w-48 h-44 flex flex-col flex-shrink-0 justify-end items-center px-2 space-y-2">
                        {/* 백그라운드 이미지 */}
                        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-[url('/마야의집.png')] opacity-30 -z-10"></div>
                        {/* 레벨, 직업 */}
                        <div className="w-full flex justify-center text-sm text-white-color bg-gray-500 px-2 py-1 space-x-2 rounded-xl">
                            <span>Lv.{characterData?.character_level}</span>
                            <span>{characterData?.character_class}</span>
                        </div>
                        {/* 닉네임 */}
                        <p className="w-full text-sm font-bold text-center text-white-color bg-[#5CCBF9] px-2 py-0.5 rounded-xl">{characterData?.character_name}</p>
                        {/* 캐릭 이미지 */}
                        <img src={characterData?.character_image} alt="character_image"/>
                    </div>
                    {/* 유니온, 무릉 */}
                    <div className="flex-grow flex flex-col space-y-2">
                        <div className="w-full flex justify-between items-center text-sm text-white-color px-2 py-0.5 bg-gray-500 rounded-xl">
                            <span>유니온</span>
                            <span>{union?.union_level}</span>
                        </div>
                        <div className="w-full flex justify-between items-center text-sm text-white-color px-2 py-0.5 bg-gray-500 rounded-xl">
                            <span>무릉도장</span>
                            <span>{dojang?.dojang_best_floor}층</span>
                        </div>
                    </div>
                </div>
                {/* (스텟,어빌,하이퍼)wrap(장비창) */}
                <div className="w-full flex flex-col items-center justify-center space-y-2 lg:flex-row lg:space-x-5 lg:items-start lg:space-y-0">
                    {/* 스텟, 어빌, 하이퍼*/}
                    <div className="w-fit flex flex-col space-y-2 justify-center items-center ">
                        {/* 스텟 */}
                        <div className="w-full min-w-80 flex flex-col justify-center items-center space-y-1">
                            {/* 전투력 */}
                            <div className="w-full flex justify-between items-center text-white-color bg-[#3E6076] px-2 py-1 rounded-md">
                                <span>{characterStat[42]?.stat_name}</span>
                                <span>{formatNumber(characterStat[42]?.stat_value)}</span>
                            </div>
                            {/* 능력치 */}
                            <div className="w-full flex text-[12px] text-white-color bg-[#86939F] rounded-md">
                                <StatLayoutLayout>
                                {["HP", "STR", "INT"].map((slot) => {
                                const item = characterStat.find((item) => item.stat_name === slot);
                                return item ? (
                                    <StatLayout key={item.stat_name}>{item}</StatLayout>
                                ) : null;
                                })}
                                </StatLayoutLayout>
                                <StatLayoutLayout>
                                {["MP", "DEX", "LUK"].map((slot) => {
                                const item = characterStat.find((item) => item.stat_name === slot);
                                return item ? (
                                    <StatLayout key={item.stat_name}>{item}</StatLayout>
                                ) : null;
                                })}
                                </StatLayoutLayout>
                            </div>
                            {/* 능력치 2 */}
                            <div className="w-full flex text-[12px] text-white-color bg-[#6c7785] rounded-md">
                                <StatLayoutLayout>
                                {["최대 스탯공격력", "최종 데미지", "방어율 무시", "공격력", "마력", "재사용 대기시간 감소 (초)", "재사용 대기시간 미적용", "상태이상 추가 데미지"].map((slot) => {
                                const item = characterStat.find((item) => item.stat_name === slot);
                                return item ? (
                                    slot === "재사용 대기시간 감소 (초)" ? <StatLayout key={item.stat_name} coolTime={characterStat[34].stat_value}>{item}</StatLayout> :
                                    <StatLayout key={item.stat_name}>{item}</StatLayout>
                                ) : null;
                                })}
                                </StatLayoutLayout>
                                <StatLayoutLayout>
                                {["데미지", "보스 몬스터 데미지", "일반 몬스터 데미지", "크리티컬 확률", "크리티컬 데미지", "버프 지속시간", "속성 내성 무시", "소환수 지속시간 증가"].map((slot) => {
                                const item = characterStat.find((item) => item.stat_name === slot);
                                return item ? (
                                    <StatLayout key={item.stat_name}>{item}</StatLayout>
                                ) : null;
                                })}
                                </StatLayoutLayout>
                            </div>
                            {/* 능력치 3 */}
                            <div className="w-full flex text-[12px] text-white-color bg-[#6c7785] rounded-md">
                                <StatLayoutLayout>
                                {["메소 획득량", "아이템 드롭률", "추가 경험치 획득"].map((slot) => {
                                const item = characterStat.find((item) => item.stat_name === slot);
                                return item ? (
                                    <StatLayout key={item.stat_name}>{item}</StatLayout>
                                ) : null;
                                })}
                                </StatLayoutLayout>
                                <StatLayoutLayout>
                                {["스타포스", "아케인포스", "어센틱포스"].map((slot) => {
                                const item = characterStat.find((item) => item.stat_name === slot);
                                return item ? (
                                    <StatLayout key={item.stat_name}>{item}</StatLayout>
                                ) : null;
                                })}
                                </StatLayoutLayout>
                            </div>
                            {/* 능력치 4 */}
                            <div className="w-full flex text-[12px] text-white-color bg-[#6c7785] rounded-md">
                                <StatLayoutLayout>
                                {["방어력", "이동속도", "스탠스"].map((slot) => {
                                const item = characterStat.find((item) => item.stat_name === slot);
                                return item ? (
                                    <StatLayout key={item.stat_name}>{item}</StatLayout>
                                ) : null;
                                })}
                                </StatLayoutLayout>
                                <StatLayoutLayout>
                                {["상태이상 내성", "점프력", "공격 속도"].map((slot) => {
                                const item = characterStat.find((item) => item.stat_name === slot);
                                return item ? (
                                    <StatLayout key={item.stat_name}>{item}</StatLayout>
                                ) : null;
                                })}
                                </StatLayoutLayout>
                            </div>
                        </div>
                        {/* 어빌, 하이퍼 */}
                        <div className="w-full max-w-80 flex flex-col items-center justify-center space-y-2">
                            {dataGuildMemberAbility && ( <Ability ability={dataGuildMemberAbility} /> )}
                            {dataGuildMemberHyperStat && ( <HyperStat hyper={dataGuildMemberHyperStat} />)}
                        </div>
                    </div>
                    {/* 장비창, 펫장비, 심볼 */}
                    <div className="w-full max-w-80 space-y-2">
                        <Equipment equipment={!isLoadingGuildMemberEquipment && dataGuildMemberEquipment } android={dataGuildMemberAndroid && dataGuildMemberAndroid} />
                        <PetEquipment pet={!isLoadingGuildMemberPetEquipment && dataGuildMemberPetEquipment} />
                        <Symbol symbol={!isLoadingGuildMemberSymbol && dataGuildMemberSymbol} />
                    </div>
                    <div className="w-full max-w-80 space-y-2">
                        <SkillGrade5 skill={grade5skill} />
                    </div>
                </div>
                {/* 임시 div */}
                <div className="w-full h-44"></div>
            </div>
        </section>
        <Footer logoImg="/logo.png" logoCreator="하풍다풍" />
        <TopButton />
        <MailButton />
        </>
    )
}
