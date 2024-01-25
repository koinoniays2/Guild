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

  // 캐릭터 정보(닉네임, 직업, 레벨)
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

  // 유니온 정보
  const [union, setUnion] = useState([]);
  useEffect(() => {
    if(ocid && member.includes(searchedCharacterName)) {
      const url = `https://open.api.nexon.com/maplestory/v1/user/union?ocid=${ocid && ocid}&date=${getCurrentDate()}`;
      const answer = fetch(url, {
        headers: {
          "x-nxopen-api-key": API_KEY,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setUnion(json);
        })
        .catch((err) => console.error("error:" + err));
    }
  }, [ocid])
  console.log(union);

  const [item, setItem] = useState([]);
  const [equipment, setEquipment] = useState([]);
  useEffect(() => {
    if(ocid && member.includes(searchedCharacterName)) {
      const url = `https://open.api.nexon.com/maplestory/v1/character/item-equipment?ocid=${ocid && ocid}&date=${getCurrentDate()}`;
      const answer = fetch(url, {
        headers: {
          "x-nxopen-api-key": API_KEY,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setItem(json);
          setEquipment(json?.item_equipment);
        })
        .catch((err) => console.error("error:" + err));
    }
  }, [ocid])
  console.log(equipment);
  
  return (
    <>
    <section className="w-full flex flex-col items-center justify-center p-2">
      {/* 캐릭정보 */}
      { ocid && member.includes(searchedCharacterName) ? 
      (
      <div className="w-full max-w-7xl flex flex-col items-center justify-center flex-wrap">
        <div className="flex flex-col items-center justify-center py-4">
          <p className="text-lg font-bold">{memberInfo?.character_name}</p>
          <img className="object-contain" src={memberInfo?.character_image} alt="character_image" />
          <p className="font-bold">{memberInfo?.character_class} Lv.{memberInfo?.character_level}</p>
          <p className="font-bold">유니온{union?.union_level}</p>
        </div>
        <div className="flex items-center justify-center flex-wrap">
          {
            equipment.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center flex-wrap p-2 m-2 border-2 border-font-black">
                {/* 아이템 이미지, 이름 */}
                <div className="flex items-center justify-center">
                  <img className="p-2" src={item?.item_icon} alt="item_icon" />
                  <p>{item?.item_name}</p>
                </div>
                {/* 아이템 */}
                <div className="flex justify-center items-center space-x-4">
                  <div>
                    { item?.potential_option_grade === null ? "" :
                    <p><span className="font-bold">잠재:</span> {item?.potential_option_grade}</p>
                    } 
                    { item?.potential_option_grade === "레어" && 
                    <p className="text-blue-400">
                      {item?.potential_option_1}<br />
                      {item?.potential_option_2}<br />
                      {item?.potential_option_3}
                    </p> 
                    }
                    { item?.potential_option_grade === "에픽" && 
                    <p className="text-purple-700">
                      {item?.potential_option_1}<br />
                      {item?.potential_option_2}<br />
                      {item?.potential_option_3}
                    </p> 
                    }
                    { item?.potential_option_grade === "유니크" && 
                    <p className="text-yellow-400">
                      {item?.potential_option_1}<br />
                      {item?.potential_option_2}<br />
                      {item?.potential_option_3}
                    </p> 
                    }
                    { item?.potential_option_grade === "레전드리" && 
                    <p className="text-green-500">
                      {item?.potential_option_1}<br />
                      {item?.potential_option_2}<br />
                      {item?.potential_option_3}
                    </p> 
                    }
                  </div>
                  <div>
                    { item?.additional_potential_option_grade === null ? "" :
                    <p><span className="font-bold">에디:</span> {item?.additional_potential_option_grade}</p>
                    }
                    { item?.additional_potential_option_grade === "레어" && 
                    <p className="text-blue-400">
                      {item?.additional_potential_option_1}<br />
                      {item?.additional_potential_option_2}<br />
                      {item?.additional_potential_option_3}
                    </p> 
                    }
                    { item?.additional_potential_option_grade === "에픽" && 
                    <p className="text-purple-700">
                      {item?.additional_potential_option_1}<br />
                      {item?.additional_potential_option_2}<br />
                      {item?.additional_potential_option_3}
                    </p> 
                    }
                    { item?.additional_potential_option_grade === "유니크" && 
                    <p className="text-yellow-400">
                      {item?.additional_potential_option_1}<br />
                      {item?.additional_potential_option_2}<br />
                      {item?.additional_potential_option_3}
                    </p> 
                    }
                    { item?.additional_potential_option_grade === "레전드리" && 
                    <p className="text-green-500">
                      {item?.additional_potential_option_1}<br />
                      {item?.additional_potential_option_2}<br />
                      {item?.additional_potential_option_3}
                    </p> 
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      )
        : ocid ? "고래 길드원이 아닙니다." : "" }
    </section>
    </>
  )
}
