import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Top from '../components/Top';
import { apiCharacterDojang, apiCharacterUnion } from '../js/api';
import { useQuery } from 'react-query';
import { formatNumber } from '../lib/functions';
import StatLayout from '../components/StatLayout';
import StatLayoutLayout from '../components/StatLayoutLayout';
// import { useQuery } from 'react-query';
// import { apiOcid } from '../js/api';

export default function CharacterDetail() {
    const { ocid } = useParams();
    const location = useLocation();
    const characterData = location?.state.characterData;
    const characterStat = location?.state.characterStat;
    // console.log("캐릭정보", characterData);
    console.log("스텟", characterStat);

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

    return (
        <>
        <Top logoImg="/logo.png" />
        <section className="w-full overflow-hidden flex flex-col justify-center items-center space-y-4">
            {/* 캐릭창 */}
            <div className="w-full max-w-5xl p-base flex justify-center items-end space-x-1">
                {/* 캐릭정보 */}
                <div className="relative w-48 h-44 flex flex-col flex-shrink-0 justify-end items-center p-base space-y-2">
                    {/* 백그라운드 이미지 */}
                    <div className="absolute top-0 left-0 w-full h-full bg-cover bg-[url('/마야의집.png')] opacity-30 -z-10"></div>
                    {/* 레벨, 닉네임 */}
                    <div className="w-full flex justify-center space-x-2 bg-gray-500 px-3 rounded-xl text-white-color">
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
                    <div className="w-full flex justify-between items-center px-2 bg-gray-500 rounded-xl text-white-color text-sm">
                        <span>유니온</span>
                        <span>{union?.union_level}</span>
                    </div>
                    <div className="w-full flex justify-between items-center px-2 bg-gray-500 rounded-xl text-white-color text-sm">
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
                        <StatLayout>
                            {characterStat[20]}
                        </StatLayout>
                        <StatLayout>
                            {characterStat[16]}
                        </StatLayout>
                        <StatLayout>
                            {characterStat[18]}
                        </StatLayout>
                    </StatLayoutLayout>
                    <StatLayoutLayout>
                        <StatLayout>
                            {characterStat[21]}
                        </StatLayout><StatLayout>
                            {characterStat[17]}
                        </StatLayout><StatLayout>
                            {characterStat[19]}
                        </StatLayout>
                    </StatLayoutLayout>
                </div>
                {/* 능력치 2 */}
                <div className="w-full flex text-white-color bg-[#6c7785] rounded-md text-[12px]">
                    <StatLayoutLayout>
                        <StatLayout>
                            {characterStat[1]}
                        </StatLayout>
                        <StatLayout>
                            {characterStat[4]}
                        </StatLayout>
                        <StatLayout>
                            {characterStat[5]}
                        </StatLayout>
                        <StatLayout>
                            {characterStat[40]}
                        </StatLayout>
                        <StatLayout>
                            {characterStat[41]}
                        </StatLayout>
                    </StatLayoutLayout>
                    <StatLayoutLayout>
                        <StatLayout>
                            {characterStat[2]}
                        </StatLayout>
                        <StatLayout>
                            {characterStat[3]}
                        </StatLayout>
                        <StatLayout>
                            {characterStat[32]}
                        </StatLayout>
                        <StatLayout>
                            {characterStat[6]}
                        </StatLayout>
                        <StatLayout>
                            {characterStat[7]}
                        </StatLayout>
                    </StatLayoutLayout>
                </div>
            </div>
        </section>
        </>
    )
}
