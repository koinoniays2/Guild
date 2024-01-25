import React, { useEffect, useState } from 'react'
import getCurrentDate from "../js/currentDate";

export default function Search({searchedCharacterName, member}) {
  const [ocid, setOcid] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;
  // 캐릭터 ocid 불러오기
  useEffect(() => {
    if(searchedCharacterName) {
      const url = `https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(searchedCharacterName)}`;
      const answer = fetch(url, {
        headers: {
          "x-nxopen-api-key": API_KEY,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setOcid(json?.ocid);
        })
        .catch((err) => console.error("error:" + err));
    };
  }, [searchedCharacterName]);

  const [memberInfo, setMemberInfo] = useState([]);
  useEffect(() => {
    if(ocid && member.includes(searchedCharacterName)) {
      const url = `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid && ocid}&date=${getCurrentDate()}`;
      const answer = fetch(url, {
        headers: {
          "x-nxopen-api-key": API_KEY,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setMemberInfo(json);
        })
        .catch((err) => console.error("error:" + err));
    }
  }, [ocid])
  return (
    <>
    <section className="w-full flex flex-col items-center justify-center p-2">
      { ocid && member.includes(searchedCharacterName) ? 
      (
      <div className="w-full max-w-7xl flex flex-col items-center justify-around">
        <p className="text-lg font-bold">{memberInfo?.character_name}</p>
        <img className="object-contain" src={memberInfo?.character_image} alt="character_image" />
        <p className="font-bold">{memberInfo?.character_class} Lv.{memberInfo?.character_level}</p>
      </div>
      )
        : ocid ? "고래 길드원이 아닙니다." : "" }
    </section>
    </>
  )
}
