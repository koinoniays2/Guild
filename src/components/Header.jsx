import React, { useState } from "react";
import { apiGuild, apiCharacter, apiOcid } from "../js/api";
import { useQuery } from "react-query";
import MemberSearch from "./MemberSearch";
import { FaSearch } from "react-icons/fa";

export default function Header({bgColor, backImg}) {
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
  
  // 길드 마스터 ocid 얻기
  const { data:dataMaster, isLoading:isLoadingMaster } = 
  useQuery(["getMaster", { name: dataGuild?.guild_master_name }], apiOcid, {
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!dataGuild?.guild_master_name // dataGuild?.guild_master_name가 있을때만 실행
  });
  let ocidMaster;
  if(!isLoadingMaster) {
    ocidMaster = dataMaster?.ocid;
  }

  // 길드 마스터 캐릭 정보
  const { data:dataMasterCharacter, isLoading:isLoadingMasterCharacter } = 
  useQuery(["getMasterCharacter", ocidMaster && { ocid : ocidMaster }], apiCharacter, {
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!ocidMaster // ocidMaster가 있을때만 실행
  });

  // 인풋 값 담기
  const [characterName, setCharacterName] = useState("");
    const inputChange = (e) => {
        setCharacterName(e.target.value);
  };
  // 넘기기 위한 인풋 값 담기
  const [searchName, setSearchName] = useState("");
  const onClick = () => {
    setSearchName(characterName);
    setCharacterName("");
  }
  const onEnter = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  }
  
  return (
    <>
    {/* 헤더 컬러(props) */}
    <header className={`relative w-full h-[480px] flex justify-center items-center overflow-hidden ${bgColor}`}>
      {/* 백그라운드 이미지(props) */}
      { backImg && 
      <>
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-top" style={{backgroundImage:`url(${backImg})`}}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      </>}
      {/* 전체 너비 지정, 중간 정렬 */}
      <div className="z-10 w-[90%] max-w-5xl">
        {/* 길드 정보 배경 블러 */}        
        <div className="flex flex-col w-fit p-4 space-y-4 rounded-2xl bg-white/10 text-white-color"
        style={{backdropFilter: "blur(5px)"}}>
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
            <h2 className="text-2xl md:text-3xl font-semibold">{dataGuild?.guild_name}</h2>
            <p className="text-sm text-gray-300">Lv.{dataGuild?.guild_level}</p>
            
          </div>
          {/* 길마 캐릭 이미지, 길마 네임, 레벨 */}
          <div className="w-fit flex items-end space-x-2">
            <img className="object-contain border rounded-lg" src={dataMasterCharacter?.character_image} alt="master character"/>
            <div className="flex flex-col space-y-1">
              <h3>길드 마스터</h3>
              <p className="md:text-xl font-bold">{dataGuild?.guild_master_name}</p>
              <p className="text-sm text-gray-400">Lv.{dataMasterCharacter?.character_level}</p>
            </div>
          </div>
          {/* 길드 내 길드원 검색 */}
          <div className="relative text-black-color">
            <input className="px-2 py-1 outline-none rounded-md block" size="18" type="text" placeholder={`${dataGuild?.guild_name} 길드원 검색`}
            onChange={inputChange} onKeyDown={onEnter} value={characterName} />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-blue-400" onClick={onClick} />
          </div>
        </div>
      </div>
    </header>
    <MemberSearch searchName={searchName} guildMember={guildMember} />
    </>
  );
}
