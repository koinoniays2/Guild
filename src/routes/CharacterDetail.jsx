import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Top from '../components/Top';
import { apiCharacterAndroid, apiCharacterDojang, apiCharacterEquipment, apiCharacterUnion } from '../js/api';
import { useQuery } from 'react-query';
import { formatNumber } from '../lib/functions';
import StatLayout from '../components/StatLayout';
import StatLayoutLayout from '../components/StatLayoutLayout';
import Equipment from '../components/Equipment';
// import { useQuery } from 'react-query';
// import { apiOcid } from '../js/api';

export default function CharacterDetail() {
    const { ocid } = useParams();
    const location = useLocation();
    const characterData = location?.state.characterData;
    const characterStat = location?.state.characterStat;
    // console.log("캐릭정보", characterData);
    // console.log(characterStat);

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
    // 안드로이드
    const { data:dataGuildMemberAndroid, isLoading:isLoadingGuildMemberAndroid } = 
    useQuery(["getGuildMemberAndroid", ocid && { ocid : ocid }], apiCharacterAndroid, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocid
    });
    // console.log(dataGuildMemberAndroid);

    return (
        <>
        <Top logoImg="/logo.png" />
        <section className="w-full overflow-hidden flex flex-col justify-center py-5 items-center space-y-4">
            {/* 캐릭창 */}
            <div className="w-full max-w-5xl p-base flex justify-center items-end space-x-1">
                {/* 캐릭정보 */}
                <div className="relative w-48 h-44 flex flex-col flex-shrink-0 justify-end items-center p-base space-y-2">
                    {/* 백그라운드 이미지 */}
                    <div className="absolute top-0 left-0 w-full h-full bg-cover bg-[url('/마야의집.png')] opacity-30 -z-10"></div>
                    {/* 레벨, 닉네임 */}
                    <div className="w-full flex justify-center space-x-2 bg-gray-500 px-2 py-1 rounded-xl text-[12px] text-white-color">
                        <span>Lv.{characterData?.character_level}</span>
                        <span>{characterData?.character_class}</span>
                    </div>
                    {/* 직업 */}
                    <p className="w-full text-center bg-[#5CCBF9] px-3 rounded-xl text-white-color">{characterData?.character_name}</p>
                    {/* 캐릭 이미지 */}
                    <img src={characterData?.character_image} alt="character_image"/>
                </div>
                {/* 유니온, 무릉 */}
                <div className="w-[120px] flex flex-col space-y-2">
                    <div className="w-full flex justify-between items-center px-3 py-0.5 bg-gray-500 rounded-xl text-white-color text-sm">
                        <span>유니온</span>
                        <span>{union?.union_level}</span>
                    </div>
                    <div className="w-full flex justify-between items-center px-3 py-0.5 bg-gray-500 rounded-xl text-white-color text-sm">
                        <span>무릉도장</span>
                        <span>{dojang?.dojang_best_floor}층</span>
                    </div>
                </div>
            </div>
            {/* 스텟정보창 */}
            <div className="w-full max-w-80 flex flex-col justify-center items-center space-y-1">
                {/* 전투력 */}
                <div className="w-full flex justify-between items-center text-white-color bg-[#3E6076] px-2 py-1 rounded-md">
                    <span>{characterStat[42]?.stat_name}</span>
                    <span>{formatNumber(characterStat[42]?.stat_value)}</span>
                </div>
                {/* 능력치 */}
                <div className="w-full flex text-white-color bg-[#86939F] rounded-md text-[12px]">
                    <StatLayoutLayout>
                        <StatLayout>{characterStat[20]}</StatLayout>
                        <StatLayout>{characterStat[16]}</StatLayout>
                        <StatLayout>{characterStat[18]}</StatLayout>
                    </StatLayoutLayout>
                    <StatLayoutLayout>
                        <StatLayout>{characterStat[21]}</StatLayout>
                        <StatLayout>{characterStat[17]}</StatLayout>
                        <StatLayout>{characterStat[19]}</StatLayout>
                    </StatLayoutLayout>
                </div>
                {/* 능력치 2 */}
                <div className="w-full flex text-white-color bg-[#6c7785] rounded-md text-[12px]">
                    <StatLayoutLayout>
                        <StatLayout>{characterStat[1]}</StatLayout>
                        <StatLayout>{characterStat[4]}</StatLayout>
                        <StatLayout>{characterStat[5]}</StatLayout>
                        <StatLayout>{characterStat[40]}</StatLayout>
                        <StatLayout>{characterStat[41]}</StatLayout>
                        <StatLayout coolTime={characterStat[34].stat_value}>{characterStat[33]}</StatLayout>
                        <StatLayout>{characterStat[35]}</StatLayout>
                        <StatLayout>{characterStat[37]}</StatLayout>
                    </StatLayoutLayout>
                    <StatLayoutLayout>
                        <StatLayout>{characterStat[2]}</StatLayout>
                        <StatLayout>{characterStat[3]}</StatLayout>
                        <StatLayout>{characterStat[32]}</StatLayout>
                        <StatLayout>{characterStat[6]}</StatLayout>
                        <StatLayout>{characterStat[7]}</StatLayout>
                        <StatLayout>{characterStat[30]}</StatLayout>
                        <StatLayout>{characterStat[36]}</StatLayout>
                        <StatLayout>{characterStat[43]}</StatLayout>
                    </StatLayoutLayout>
                </div>
                {/* 능력치 3 */}
                <div className="w-full flex text-white-color bg-[#6c7785] rounded-md text-[12px]">
                    <StatLayoutLayout>
                        <StatLayout>{characterStat[29]}</StatLayout>
                        <StatLayout>{characterStat[28]}</StatLayout>
                        <StatLayout>{characterStat[39]}</StatLayout>
                    </StatLayoutLayout>
                    <StatLayoutLayout>
                        <StatLayout>{characterStat[13]}</StatLayout>
                        <StatLayout>{characterStat[14]}</StatLayout>
                        <StatLayout>{characterStat[15]}</StatLayout>
                    </StatLayoutLayout>
                </div>
                {/* 능력치 4 */}
                <div className="w-full flex text-white-color bg-[#6c7785] rounded-md text-[12px]">
                    <StatLayoutLayout>
                        <StatLayout>{characterStat[10]}</StatLayout>
                        <StatLayout>{characterStat[11]}</StatLayout>
                        <StatLayout>{characterStat[9]}</StatLayout>
                    </StatLayoutLayout>
                    <StatLayoutLayout>
                        <StatLayout>{characterStat[8]}</StatLayout>
                        <StatLayout>{characterStat[12]}</StatLayout>
                        <StatLayout>{characterStat[31]}</StatLayout>
                    </StatLayoutLayout>
                </div>
            </div>
        </section>
        <Equipment equipment={!isLoadingGuildMemberEquipment && dataGuildMemberEquipment } android={dataGuildMemberAndroid && dataGuildMemberAndroid} />
        </>
    )
}
