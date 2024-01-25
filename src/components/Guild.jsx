import React from "react";
import { useEffect, useState } from "react";
import getCurrentDate from "../js/currentDate";
import { FaSearch } from "react-icons/fa";
import Search from "./Search";

export default function Guild() {
  const [lists, setLists] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    const url = `https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=a8de455f7012cc9f21bb2db130b45323&date=${getCurrentDate()}`;
    const answer = fetch(url, {
      headers: {
        "x-nxopen-api-key": API_KEY,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setLists(json);
      })
      .catch((err) => console.error("error:" + err));
  }, []);
// console.log(lists);
// 인풋 값 담기
    const [characterName, setCharacterName] = useState("");
    const inputChange = (e) => {
        setCharacterName(e.target.value);
    };
    // 엔터시 값 전달
    const enterPress = (e) => {
        if (e.key === "Enter") sendPropsToSearch();
    };
    // 클릭시 값 전달
    const searchClick = () => {
        sendPropsToSearch();
    };
    // 전달 값 프롭스로 전달
    const propsToSearch = () => {
        const propsToSend = {
            characterName: characterName,
            // 다른 프롭스도 필요한 경우 추가
        };
        return {...propsToSend}
    };

  return (
    <>
    <section className="w-full flex justify-center bg-back-color p-2">
        <div className="w-full max-w-7xl flex justify-around flex-wrap items-center space-y-2">
            {/* 기준 날짜 길드마크, 길드명 */}
            <div className="flex flex-col items-center justify-center">
                {/* 기준 날짜 */}
                <p className="text-sm text-gray-400">{lists.date ? String(lists.date).slice(0, 10) : lists.date}</p>
                {/* 길드마크, 길드명 */}
                <div className="flex items-center">
                    { lists.guild_mark_custom ? <img className="object-contain"
                    src={`data:image/jpeg;base64,${lists.guild_mark_custom}`} alt="Guild Mark" /> 
                    : <p className="text-sm text-font-white">[길드마크없음]</p> }
                    <p className="text-xl font-bold text-font-white">{lists.guild_name}
                        <span className="text-sm text-font-white inline-block pl-1">(Lv.{lists.guild_level})</span>
                    </p>
                </div>
                <p className="text-sm text-font-white">길드마스터
                    <span className="inline-block text-xl pl-4 font-bold">{lists.guild_master_name}</span>
                </p>
            </div>
            {/* 캐릭터명 검색 */}
            <div className="flex justify-center items-center space-x-1">
                <input className="outline-none p-1" type="text" placeholder="캐릭터명" value={characterName} 
                onChange={inputChange} onKeyDown={enterPress}/>
                <div className="text-font-white cursor-pointer"
                onClick={searchClick}>
                    <FaSearch />
                </div>
            </div>
        </div>
    </section>
    <Search characterName={propsToSearch}/>
    </>
  );
}
