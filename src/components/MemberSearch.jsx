import { useQuery } from "react-query";
import { apiCharacter, apiCharacterStat, apiOcid } from "../js/api";
import { charactersImg } from "../lib/charactersImg";
import { motion } from "framer-motion";
import { FadeLoader } from "react-spinners";

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

    // , 정규식
    function formatStatValue(value) {
        return value?.stat_value ? value?.stat_value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "-";
    }
    // CSS
    const FLEX = `w-full flex justify-center items-center`;
    const FLEX_COL = `w-full flex flex-col justify-center items-center`;
    const STAT_NAME = `font-bold text-gray-400 text-sm px-2`;

    return (
        <section className="w-full -translate-y-16 flex flex-col justify-start items-center text-black-color overflow-hidden">
            {/* 로딩 화면 */}
            { isLoadingGuildMember || isLoadingGuildMemberCharacter || isLoadingGuildMemberCharacterStat ?
            <div className="w-full flex items-start justify-center"><FadeLoader color="gray" /></div>
            :(
            <>
            {/* 캐릭 정보 */}
            { searchName &&
            // 임의 높이 지정 나중에 지우기
            <motion.div 
            key={searchName}
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 15}}
            transition={{duration: 0.3, ease:"easeOut"}}
            className="relative w-[calc(100%-40px)] h-[700px] max-w-5xl flex flex-col items-center py-16 space-y-2 z-50 bg-white rounded-t-2xl">
                {/* 캐릭 배경 */}
            {   guildMember?.includes(searchName) &&
                charactersImg.map((item, index) => (
                item.name === dataGuildMemberCharacter?.character_class &&
                <div key={index} className="absolute top-16 -right-28 w-full h-[400px] bg-contain bg-right-top bg-no-repeat opacity-20 -z-10
                md:h-[600px] md:-right-48 lg:-right-56 xl:-right-72" 
                style={{backgroundImage: `url('${item.imgSrc}')`}}></div>
                ))
            }
                {   
                    guildMember?.includes(searchName) ?
                    <>
                        {/* 캐릭터 네임, 이미지, 직업, 레벨 */}
                        <div className={FLEX_COL}>
                            <p className="text-lg font-bold">{dataGuildMemberCharacter?.character_name}</p>
                            <img className="" src={dataGuildMemberCharacter?.character_image} alt="character_img" />
                            <div className="flex justify-center items-center space-x-1">
                                <p className="font-bold">{dataGuildMemberCharacter?.character_class}</p>
                                <p className="text-sm font-bold text-gray-500">Lv.{dataGuildMemberCharacter?.character_level}</p>
                            </div>
                        </div>
                        {/* 스텟 정보 */}
                        <div className={`${FLEX_COL} max-w-[360px] border border-[#5CB85C] bg-white/10`} style={{backdropFilter: "blur(2px)"}}>
                            {/* 스공 */}
                            {guildMemberCharacterStat && (
                            <div className={`${FLEX} border-b border-gray-400`}>
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
            </motion.div>
            }
            </>
            )}
        </section>
    )
}
