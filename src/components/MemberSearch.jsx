import { useQuery } from "react-query";
import { apiCharacter, apiCharacterStat, apiOcid } from "../js/api";

export default function MemberSearch({searchName, guildMember}) {
    // 길드원 ocid 얻기
    const { data:dataGuildMember, isLoading:isLoadingGuildMember } = 
    useQuery(["getGuildMember", { name: searchName }], apiOcid, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!searchName
    });
    let ocidGuildMember;
    if(!isLoadingGuildMember) {
        ocidGuildMember = dataGuildMember?.ocid;
    }
    // console.log(dataGuildMember);

    // 길드원 캐릭 정보
    const { data:dataGuildMemberCharacter, isLoading:isLoadingGuildMemberCharacter } = 
    useQuery(["getGuildMemberCharacter", ocidGuildMember && { ocid : ocidGuildMember }], apiCharacter, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocidGuildMember
    });
    // console.log(dataGuildMemberCharacter);

    // 스탯 정보
    const { data:dataGuildMemberCharacterStat, isLoading:isLoadingGuildMemberCharacterStat } = 
    useQuery(["getGuildMemberCharacterStat", ocidGuildMember && { ocid : ocidGuildMember }], apiCharacterStat, {
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!ocidGuildMember
    });
    let guildMemberCharacterStat;
    if(!isLoadingGuildMemberCharacterStat) {
        guildMemberCharacterStat = dataGuildMemberCharacterStat?.final_stat;
    }
    // console.log(guildMemberCharacterStat);

    function formatStatValue(value) {
        return value?.stat_value ? value?.stat_value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "-";
    }
    const FLEX = `w-full flex justify-center items-center`;
    const FLEX_COL = `w-full flex flex-col justify-center items-center`;
    const STAT_NAME = `font-bold text-gray-400 text-sm px-2`;

    return (
        <section className="relative w-full flex flex-col justify-center items-center text-black-color py-14">
            <div className="w-[90%] max-w-5xl flex flex-col items-center space-y-2">
                {   
                    guildMember?.includes(searchName) ?
                    <>
                        {/* 캐릭터 네임, 이미지, 직업, 레벨 */}
                        <div className={FLEX_COL}>
                            <p className="text-lg font-bold">{dataGuildMemberCharacter?.character_name}</p>
                            <img src={dataGuildMemberCharacter?.character_image} alt="character img" />
                            <div className="flex justify-center items-end space-x-2">
                                <p className="font-bold">{dataGuildMemberCharacter?.character_class}</p>
                                <p className="text-sm font-bold text-gray-500">Lv.{dataGuildMemberCharacter?.character_level}</p>
                            </div>
                        </div>
                        {/* 스텟 정보 */}
                        <div className={`${FLEX_COL} max-w-[360px] border border-[#5CB85C]`}>
                            {/* 스공 */}
                            {guildMemberCharacterStat && (
                            <div className={`${FLEX} border-b`}>
                                <p className="font-bold text-gray-400 text-sm px-2">스공</p>
                                <p>{`${formatStatValue(guildMemberCharacterStat[0])} 
                                ~ ${formatStatValue(guildMemberCharacterStat[1])}`}</p>
                            </div>
                            )}
                            {/* 능력치 */}
                            {guildMemberCharacterStat && (
                            <div className={FLEX_COL}>
                                <div className={FLEX}>
                                    {/* HP */}
                                    <p className={STAT_NAME}>{guildMemberCharacterStat[20]?.stat_name}</p>
                                    <p>{formatStatValue(guildMemberCharacterStat[20])}</p>
                                    {/* STR */}
                                    <p className={STAT_NAME}>{guildMemberCharacterStat[16]?.stat_name}</p>
                                    <p>{formatStatValue(guildMemberCharacterStat[16])}</p>
                                    {/* DEX */}
                                    <p className={STAT_NAME}>{guildMemberCharacterStat[17]?.stat_name}</p>
                                    <p>{formatStatValue(guildMemberCharacterStat[17])}</p>
                                </div>
                                <div className={FLEX}>
                                    {/* MP */}
                                    <p className={STAT_NAME}>{guildMemberCharacterStat[21]?.stat_name}</p>
                                    <p>{formatStatValue(guildMemberCharacterStat[21])}</p>
                                    {/* INT */}
                                    <p className={STAT_NAME}>{guildMemberCharacterStat[18]?.stat_name}</p>
                                    <p>{formatStatValue(guildMemberCharacterStat[18])}</p>
                                    {/* LUK */}
                                    <p className={STAT_NAME}>{guildMemberCharacterStat[19]?.stat_name}</p>
                                    <p>{formatStatValue(guildMemberCharacterStat[19])}</p>
                                </div>
                            </div>
                            )}
                        </div>
                    </>
                    :
                    searchName === "" ? "" : <p>길드원이 아닙니다.</p>
                }
            </div>
        </section>
    )
}
