import React, { useState } from "react";
import { apiGuild, apiCharacter, apiOcid } from "../js/api";
import { useQuery } from "react-query";
import MemberSearch from "./MemberSearch";
import { FaSearch } from "react-icons/fa";
import { FadeLoader  } from "react-spinners";
import GuildNoblesse from "./GuildNoblesse";

export default function Header({bgColor, bgImg}) {
  // 길드 정보 불러오기
  const { data:dataGuild, isLoading:isLoadingGuild } = useQuery(["getGuild"], apiGuild, {
    staleTime: 24 * 60 * 60 * 1000
  });
  // 길드원 목록, 노블스킬
  let guildMember;
  let guildNoblesse;
  if(!isLoadingGuild) {
    guildMember = dataGuild?.guild_member;
    guildNoblesse = dataGuild?.guild_noblesse_skill;
  }
  // 길드원 가나다순으로 정리
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

  // 클릭하면 길드원 30명씩 보이기
  const buttonNum = Array.from({ length: Math.ceil(guildMember?.length/30) });
  const [btnNum, setBtnNum] = useState(0);
  let [firstNum, setFirstNum] = useState(0);
  let [lastNum, setLastNum] = useState(29);
  const btnOnclick = (index) => {
    const newFirstNum = index * 30;
    const newLastNum = Math.min(newFirstNum + 29, guildMember?.length - 1);

    setBtnNum(index);
    setFirstNum(newFirstNum);
    setLastNum(newLastNum);
  }

  return (
    <>
    {/* 백그라운드 컬러(props) */}
    <section className={`relative w-full h-[400px] flex justify-center overflow-hidden ${bgColor}`}>
      {/* 백그라운드 이미지(props) */}
      { bgImg && 
      <>
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-left-top" style={{backgroundImage:`url(${bgImg})`}}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      </>}
      {/* 전체 너비 지정 */}
      <div className="z-10 w-full p-base flex md:justify-center">
        {/* 로딩 화면 */}
        {isLoadingGuild || isLoadingMaster || isLoadingMasterCharacter ?
        <div className="w-full flex items-center justify-center"><FadeLoader color="gray" /></div>
        :(
        <>
        {/* 길드 정보 배경 블러 */}        
        <div className="flex flex-col w-fit h-fit mt-5 p-5 space-y-3 rounded-xl bg-white/10 text-white-color"
        style={{backdropFilter: "blur(5px)"}}>
          {/* 서버 네임 */}
          <div className="w-16 h-8 rounded-lg bg-black-color">
              <p className={`text-center leading-8 ${dataGuild?.world_name === "루나" && "text-yellow-500"}`}>{dataGuild?.world_name}</p>
          </div>
          {/* 길드 마크, 길드 네임, 길드 레벨 */}
          <div className="flex items-end space-x-2">
            {
            dataGuild?.guild_mark_custom || dataGuild?.guild_mark ?  
            <img className="object-cover self-center w-5 h-5" src={`data:image/jpeg;base64,${dataGuild?.guild_mark_custom || dataGuild?.guild_mark}`} alt="guild_mark"/>
            : ""
            }
            <h2 className="text-2xl font-semibold">{dataGuild?.guild_name}</h2>
            <p className="text-sm text-gray-400">Lv.{dataGuild?.guild_level}</p>
            
          </div>
          {/* 길마 캐릭 이미지, 길마 네임, 레벨 */}
          <div className="w-fit flex items-end space-x-2">
            <img src={dataMasterCharacter?.character_image} alt="master_character"/>
            <div className="flex flex-col">
              <h3>길드 마스터</h3>
              <p className="md:text-xl font-bold">{dataGuild?.guild_master_name}</p>
              <p className="text-sm text-gray-400">Lv.{dataMasterCharacter?.character_level}</p>
            </div>
          </div>
          {/* 길드 내 길드원 검색 */}
          <div className="relative w-fit text-black-color">
            <input className="px-2 py-1 outline-none rounded-md block" size="16" type="text" placeholder={`${dataGuild?.guild_name} 길드원 검색`}
            onChange={inputChange} onKeyDown={onEnter} value={characterName} />
            <FaSearch className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-main-color" onClick={onClick} />
          </div>
        </div>
        </>
        )}
      </div>
    </section>
    <MemberSearch searchName={searchName} guildMember={guildMember} />
    {/* 노블스킬, 길드원 전체 컨테이너 */}
    <section className="w-full flex flex-col justify-start items-center bg-black-color text-white-color overflow-hidden">
        <div className="w-full p-base max-w-5xl flex flex-col items-center pt-5 space-y-14 z-50">
          {/* 노블스킬 */}
          <GuildNoblesse guildNoblesse={guildNoblesse} />
          {/* 길드원 */}
          <div className="flex flex-col justify-center items-center space-y-5">
            <p className="w-20 py-1 text-center bg-black rounded-lg">길드원</p>
            <div className="w-full flex justify-center space-x-3">
            { 
              buttonNum.map((_, index) => (
              <div key={index} className={`w-11 h-2 cursor-pointer ${index === btnNum ? "bg-[#5CCBF9]" : "bg-gray-500"}`} 
              onClick={() => btnOnclick(index)}></div>
              ))
            }
            </div>
            <div className={`w-full flex flex-wrap justify-center overflow-hidden`}>
              {
                guildMember?.map((item, index) => (
                  firstNum <= index && index <= lastNum && (
                    <p className="w-1/3 md:w-1/4 lg:w-1/5 mt-2 text-center text-sm" key={index}>{item}</p>
                  )
                ))
              }
            </div>
          </div>
        </div>
    </section>
    </>
  );
}