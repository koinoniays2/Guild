import React, { useState } from 'react'

export default function MemberSearch({guildName}) {
    // 인풋 값 담기
    const [characterName, setCharacterName] = useState("");
    const inputChange = (e) => {
        setCharacterName(e.target.value);
    };

    return (
        <div className="relative text-black-color">
            <input className="p-1 px-3 outline-none rounded-md" type="text" placeholder={`${guildName} 길드원 검색`}
            onChange={inputChange} />
        </div>
    )
}
