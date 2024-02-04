import { useQuery } from "react-query";
import { apiCharacter, apiCharacterStat, apiOcid } from "../js/api";
import { charactersImg } from "../lib/charactersImg";
import { motion } from "framer-motion";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";

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
    // 전투력
    function formatNumber(number) {
        const 억 = Math.floor(number / 100000000);
        const 만 = Math.floor((number % 100000000) / 10000);
        const 나머지 = number % 10000;
        let result = '';
        
        억 > 0 && (result += 억 + '억');
        만 > 0 && (result += 만 + '만');
        나머지 > 0 && (result += 나머지);
        return result;
    }
    // CSS
    const STAT_NAME = `w-10 font-bold text-center text-[#5CB85C] text-sm bg-gray-200`;
    const STAT_LINE = `w-full flex justify-between items-center`
    const STAT_DESC = `w-16 font-bold text-center`

    return (
        <section className="w-full -translate-y-14 flex flex-col justify-start items-center text-black-color overflow-hidden">
            {/* 로딩 화면 */}
            { isLoadingGuildMember || isLoadingGuildMemberCharacter || isLoadingGuildMemberCharacterStat ?
            <div className="w-full h-56 flex items-center justify-center"><FadeLoader color="#5CCBF9" /></div>
            :(
            <>
            {/* 캐릭 정보 */}
            { searchName &&
            <motion.div 
            key={searchName}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 20}}
            transition={{duration: 0.3, ease:"easeOut"}}
            className="relative w-[calc(100%-40px)] h-[448px] max-w-5xl flex flex-col items-center py-16 space-y-2 bg-white rounded-t-2xl z-10">
                {/* 캐릭 배경 */}
            {   guildMember?.includes(searchName) &&
                charactersImg.map((item, index) => (
                item.name === dataGuildMemberCharacter?.character_class &&
                <div key={index} className="absolute top-16 w-full h-[300px] bg-contain bg-right-top bg-no-repeat opacity-20 -z-10
                md:h-[400px] md:-right-28" 
                style={{backgroundImage: `url('${item.imgSrc}')`}}></div>
                ))
            }
                {   
                guildMember?.includes(searchName) ? ocidGuildMember ?
                <>
                    {/* 캐릭터 네임, 이미지, 직업, 레벨 */}
                    <div className="w-full flex flex-col justify-center items-end sm:items-center">
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-bold">{dataGuildMemberCharacter?.character_name}</p>
                            <img src={dataGuildMemberCharacter?.character_image} alt="character_img" />
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                            <p className="font-bold">{dataGuildMemberCharacter?.character_class}</p>
                            <p className="text-sm font-bold text-gray-500">Lv.{dataGuildMemberCharacter?.character_level}</p>
                        </div>
                    </div>
                    {/* 스텟 정보 */}
                    <div className="w-full flex flex-col justify-center items-end sm:items-center">
                        <div className="w-full max-w-80 flex-col space-y-1" >
                            {/* 전투력 */}
                            {guildMemberCharacterStat && (
                            <div className={STAT_LINE}>
                                <p className={STAT_NAME}>{guildMemberCharacterStat[42]?.stat_name}</p>
                                <p className="font-bold">{formatNumber(parseInt(guildMemberCharacterStat[42]?.stat_value))}</p>
                            </div>
                            )}
                            {/* 스공 */}
                            {guildMemberCharacterStat && (
                            <div className={STAT_LINE}>
                                <p className={STAT_NAME}>스공</p>
                                <p className="font-bold">{`${formatStatValue(guildMemberCharacterStat[0])} 
                                ~ ${formatStatValue(guildMemberCharacterStat[1])}`}</p>
                            </div>
                            )}
                            {/* 능력치 */}
                            {guildMemberCharacterStat && (
                            <>
                            <div className={STAT_LINE}>
                                {/* HP */}
                                <p className={STAT_NAME}>{guildMemberCharacterStat[20]?.stat_name}</p>
                                <p className={STAT_DESC}>{formatStatValue(guildMemberCharacterStat[20])}</p>
                                {/* STR */}
                                <p className={STAT_NAME}>{guildMemberCharacterStat[16]?.stat_name}</p>
                                <p className={STAT_DESC}>{formatStatValue(guildMemberCharacterStat[16])}</p>
                                {/* DEX */}
                                <p className={STAT_NAME}>{guildMemberCharacterStat[17]?.stat_name}</p>
                                <p className={STAT_DESC}>{formatStatValue(guildMemberCharacterStat[17])}</p>
                            </div>
                            <div className={STAT_LINE}>
                                {/* MP */}
                                <p className={STAT_NAME}>{guildMemberCharacterStat[21]?.stat_name}</p>
                                <p className={STAT_DESC}>{formatStatValue(guildMemberCharacterStat[21])}</p>
                                {/* INT */}
                                <p className={STAT_NAME}>{guildMemberCharacterStat[18]?.stat_name}</p>
                                <p className={STAT_DESC}>{formatStatValue(guildMemberCharacterStat[18])}</p>
                                {/* LUK */}
                                <p className={STAT_NAME}>{guildMemberCharacterStat[19]?.stat_name}</p>
                                <p className={STAT_DESC}>{formatStatValue(guildMemberCharacterStat[19])}</p>
                            </div>
                            </>
                            )}
                        </div>
                    </div>
                </>
                : <p className="text-center">2023년 12월 21일 이후<br />접속기록이 없는 길드원입니다.</p>
                :
                searchName === "" ? "" : <p>길드원이 아닙니다.</p>
            }
            <div className="w-full flex flex-col justify-center items-end sm:items-center">
                <Link to={`characters/${ocidGuildMember}`} state={{characterData: dataGuildMemberCharacter, characterStat: guildMemberCharacterStat}}>
                    <div className="p-base bg-[#5CCBF9] text-white-color rounded-md">상세보기</div>
                </Link>
            </div>
            </motion.div>
            }
            </>
            )}
        </section>
    )
}