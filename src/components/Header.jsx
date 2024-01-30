import React from "react";
import { apiMaster, apiGuild, apiMasterCharacter } from "../js/api";
import { useQuery } from "react-query";

export default function Header({bgColor, rightImg}) {
  // 길드 정보 불러오기
  const { data:dataGuild, isLoading:isLoadingGuild } = useQuery(["getGuild"], apiGuild);
  // 길드원 목록
  let guildMember;
  if(!isLoadingGuild) {
    guildMember = dataGuild?.guild_member;
  }
  // 가나다순으로 정리
  if (guildMember) {
    guildMember.sort((a, b) => a.localeCompare(b));
  }
  
  // 길드 마스터 ocid 얻기
  const { data:dataMaster, isLoading:isLoadingMaster } = 
  useQuery(["getMaster", { master: dataGuild?.guild_master_name }], apiMaster);
  let ocidMaster;
  if(!isLoadingMaster) {
    ocidMaster = dataMaster?.ocid;
  }

  // 길드 마스터 캐릭 정보
  const { data:dataMasterCharacter, isLoading:isLoadingMasterCharacter } = 
  useQuery(["getMasterCharacter", ocidMaster && { ocid : ocidMaster }], apiMasterCharacter);

  return (
    <>
    {/* 백그라운드 컬러 프롭스 사용 */}
    <header className={`relative flex justify-between w-full h-[400px] overflow-hidden ${bgColor}`}>
      {/* 길드 정보 */}
      <div className="w-[50%] min-w-48 h-full flex flex-col justify-center items-center text-white-color space-y-4">
        {/* 길드 마크, 길드 명, 길드 레벨, 서버 네임 */}
        <div className="flex space-x-2 items-end">
          <img className="object-contain self-center" src={`data:image/jpeg;base64,${dataGuild?.guild_mark_custom}`} alt="guildmark"/>
          <h2 className="text-2xl md:text-4xl font-semibold">{dataGuild?.guild_name}</h2>
          <p className="text-sm text-gray-400">Lv.{dataGuild?.guild_level}</p>
          <div className="w-12 h-7 rounded-xl bg-black">
            <p className={`text-center ${dataGuild?.world_name === "루나" && "text-yellow-500"} leading-7`}>{dataGuild?.world_name}</p>
          </div>
        </div>
        {/* 길마 네임, 레벨 */}
        <div className="flex items-end">
          <h3 className="md:text-xl">길드 마스터&nbsp;:&nbsp;</h3>
          <p className="md:text-xl font-bold border-b">{dataGuild?.guild_master_name}</p>
          <p className="text-sm text-gray-400">&nbsp;Lv.{dataMasterCharacter?.character_level}</p>
        </div>
        {/* 길마 캐릭 이미지 */}
        <img className="object-contain border rounded-lg" src={dataMasterCharacter?.character_image} alt="master character"/>
      </div>
      {/* 오른쪽 이미지 프롭스 사용 */}
      <div className="w-[50%] min-w-48 h-full" style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)"}}>
        <img className="w-full h-full object-cover object-bottom" src={rightImg} alt="dolphin" />
        <div className="w-full h-full absolute top-0 right-0 bg-black/50"></div>
      </div>
    </header>
    </>
  );
}
