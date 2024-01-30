import React from "react";
import { apiMaster, apiGuild, apiMasterCharacter } from "../js/api";
import { useQuery } from "react-query";
import MemberSearch from "./MemberSearch";

export default function Header({bgColor, rightImg}) {
  // 길드 정보 불러오기
  const { data:dataGuild, isLoading:isLoadingGuild } = useQuery(["getGuild"], apiGuild, {
    staleTime: 24 * 60 * 60 * 1000
  });
  // 길드원 목록
  let guildMember;
  if(!isLoadingGuild) {
    guildMember = dataGuild?.guild_member;
  }
  // 가나다순으로 정리
  if (guildMember) {
    guildMember.sort((a, b) => a.localeCompare(b));
  }
  console.log(dataGuild);
  
  // 길드 마스터 ocid 얻기
  const { data:dataMaster, isLoading:isLoadingMaster } = 
  useQuery(["getMaster", { master: dataGuild?.guild_master_name }], apiMaster, {
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!dataGuild?.guild_master_name // dataGuild?.guild_master_name가 있을때만 실행
  });
  let ocidMaster;
  if(!isLoadingMaster) {
    ocidMaster = dataMaster?.ocid;
  }

  // 길드 마스터 캐릭 정보
  const { data:dataMasterCharacter, isLoading:isLoadingMasterCharacter } = 
  useQuery(["getMasterCharacter", ocidMaster && { ocid : ocidMaster }], apiMasterCharacter, {
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!ocidMaster // ocidMaster가 있을때만 실행
  });

  return (
    <>
    {/* 백그라운드 컬러 (프롭스) */}
    <header className={`relative flex justify-end w-full h-[480px] overflow-hidden ${bgColor}`}>
      {/* 길드 정보 */}
      <div className="z-10 absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] max-w-[1024px] w-[90%]
      flex flex-col text-white-color space-y-4">
        {/* 서버 네임 */}
        <div className="w-12 h-7 rounded-xl bg-black">
            <p className={`text-center ${dataGuild?.world_name === "루나" && "text-yellow-500"} leading-7`}>{dataGuild?.world_name}</p>
        </div>
        {/* 길드 마크, 길드 네임, 길드 레벨 */}
        <div className="flex space-x-2 items-end">
          {
          dataGuild?.guild_mark_custom ?  
          <img className="object-contain self-center" src={`data:image/jpeg;base64,${dataGuild?.guild_mark_custom}`} alt="guild mark"/>
          : ""
          }
          <h2 className="text-2xl md:text-4xl font-semibold">{dataGuild?.guild_name}</h2>
          <p className="text-sm text-gray-400">Lv.{dataGuild?.guild_level}</p>
          
        </div>
        {/* 길마 네임, 레벨 */}
        <div className="flex items-end">
          <h3 className="md:text-xl">길드 마스터&nbsp;:&nbsp;</h3>
          <p className="md:text-xl font-bold">{dataGuild?.guild_master_name}</p>
        </div>
        {/* 길마 캐릭 이미지 */}
        <div className="w-fit flex flex-col items-end space-y-1">
          <img className="object-contain border rounded-lg" src={dataMasterCharacter?.character_image} alt="master character"/>
          <p className="text-sm text-gray-400">Lv.{dataMasterCharacter?.character_level}</p>
        </div>
        {/* 길드 내 길드원 검색 컴포넌트 (프롭스) */}
        <MemberSearch guildName={dataGuild?.guild_name} />
      </div>
      {/* 오른쪽 이미지 (프롭스) */}
      <div className="relative w-[60%] h-full" style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)"}}>
        <img className="w-full h-full object-cover object-bottom" src={rightImg} alt="right img" />
        <div className="w-full h-full absolute top-0 right-0 bg-black/50"></div>
      </div>
    </header>
    </>
  );
}
