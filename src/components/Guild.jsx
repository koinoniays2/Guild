import React from "react";
import { useEffect, useState } from "react";
import getCurrentDate from "../js/currentDate";
import { FaSearch } from "react-icons/fa";
import Search from "./Search";

export default function Guild() {
  // 길드 정보 list
  const [lists, setLists] = useState([]);
  // 길드원 list
  const [member, setMember] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  // 길드 정보, 길드원 담기
  useEffect(() => {
    const url = `https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=a8de455f7012cc9f21bb2db130b45323&date=${getCurrentDate()}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            "x-nxopen-api-key": API_KEY,
          },
        });
        const json = await response.json();
        setLists(json); // 길드 정보
        setMember(json.guild_member); // 길드원
      } catch (err) {
        console.error("error:" + err);
      }
    };
    fetchData();
  }, [API_KEY]);
  // 인풋 값 담기
  const [characterName, setCharacterName] = useState("");
  const [searchedCharacterName, setSearchedCharacterName] = useState("");
  const inputChange = (e) => {
    setCharacterName(e.target.value);
  };
  // 엔터시 값 전달
  const searchEnter = (e) => {
    if (e.key === "Enter") {
      setSearchedCharacterName(characterName);
      setCharacterName("");
    }
  };
  // 클릭시 값 전달
  const searchClick = () => {
    setSearchedCharacterName(characterName);
    setCharacterName("");
  };
  return (
    <>
      <section className="w-full flex justify-center bg-back-color p-2">
        <div className="w-full max-w-7xl flex justify-around flex-wrap items-center space-y-2">
          {/* 기준 날짜 길드마크, 길드명 */}
          <div className="flex flex-col items-center justify-center">
            {/* 기준 날짜 */}
            {/* <p className="text-sm text-gray-400">{lists.date ? String(lists.date).slice(0, 10) : lists.date}</p> */}
            {/* 길드마크, 길드명 */}
            <div className="flex items-center">
              {lists.guild_mark_custom ? <img className="object-contain"
                src={`data:image/jpeg;base64,${lists.guild_mark_custom}`} alt="Guild Mark" />
                : <p className="text-sm text-font-white">[길드마크없음]</p>}
              <p className="text-xl font-bold text-font-white">{lists.guild_name}
                <span className="text-sm text-font-white inline-block pl-1">(Lv.{lists.guild_level})</span>
              </p>
            </div>
            <p className="text-sm text-font-white">길드마스터
              <span className="inline-block text-xl pl-4 font-bold">{lists.guild_master_name}</span>
            </p>
          </div>
          {/* 캐릭터명 검색 */}
          <div className="flex justify-center items-center ml-4 space-x-1">
            <input className="outline-none p-1" type="text" placeholder="캐릭터명" value={characterName}
              onChange={inputChange} onKeyDown={searchEnter} />
            <div className="text-font-white cursor-pointer"
              onClick={searchClick}>
              <FaSearch />
            </div>
          </div>
        </div>
      </section>
      <Search searchedCharacterName={searchedCharacterName} member={member} />
      {/* 길드원 */}
      <section className="w-full flex justify-center">
        <div className="w-full max-w-7xl flex justify-center items-center flex-wrap">
          {
            member.map((item, index) => (
              <p key={index} className="p-5">{item}</p>
            ))
          }
        </div>
      </section>
    </>
  );
}
