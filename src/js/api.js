import qs from "qs";
import getCurrentDate from "./currentDate";

const API_KEY = import.meta.env.VITE_API_KEY;
// 길드 정보
export async function apiGuild() {
    return await fetch(`https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=a8de455f7012cc9f21bb2db130b45323&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 캐릭터 ocid
export async function apiOcid({queryKey}) {
    const name = encodeURIComponent(queryKey[1]?.name);
    if (!name) {
        // name이 없을 경우 오류 처리 또는 기본값 설정
        throw new Error("is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${name}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 캐릭 정보
export async function apiCharacter({queryKey}) {
    const ocid = queryKey[1]?.ocid;
    if (!ocid) {
        // ocid가 없을 경우 오류 처리 또는 기본값 설정
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 캐릭 정보
export async function apiCharacterStat({queryKey}) {
    const ocid = queryKey[1]?.ocid;
    if (!ocid) {
        // ocid가 없을 경우 오류 처리 또는 기본값 설정
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 유니온
export async function apiCharacterUnion({queryKey}) {
    const ocid = queryKey[1]?.ocid;
    if (!ocid) {
        // ocid가 없을 경우 오류 처리 또는 기본값 설정
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/user/union?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 무릉
export async function apiCharacterDojang({queryKey}) {
    const ocid = queryKey[1]?.ocid;
    if (!ocid) {
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/dojang?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 장비아이템
export async function apiCharacterEquipment({queryKey}) {
    const ocid = queryKey[1]?.ocid;
    if (!ocid) {
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/item-equipment?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 펫장비
export async function apiCharacterPetEquipment({queryKey}) {
    const ocid = queryKey[1]?.ocid;
    if (!ocid) {
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/pet-equipment?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 안드로이드
export async function apiCharacterAndroid({queryKey}) {
    const ocid = queryKey[1]?.ocid;
    if (!ocid) {
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/android-equipment?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}

// 어빌
export async function apiCharacterAbility({queryKey}) {
    const ocid = queryKey[1]?.ocid;
    if (!ocid) {
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/ability?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 하이퍼스탯
export async function apiCharacterHyperStat({queryKey}) {
    const ocid = queryKey[1]?.ocid;
    if (!ocid) {
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/hyper-stat?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 심볼
export async function apiCharacterSymbol({queryKey}) {
    const ocid = queryKey[1]?.ocid;
    if (!ocid) {
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/symbol-equipment?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 스킬
export async function apiCharacterSkill(ocid, grade) {
    if (!ocid || !grade) {
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/skill?ocid=${ocid}&date=${getCurrentDate()}&character_skill_grade=${grade}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 헥사코어
export async function apiCharacterHEXA(ocid) {
    if (!ocid) {
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/hexamatrix?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}
// 유니온
export async function apiCharacterUnionRaider({queryKey}) {
    const ocid = queryKey[1]?.ocid;
    if (!ocid) {
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/user/union-raider?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}

// 이메일
export async function apiPostGoogleMail(data) {
    try {
        return await fetch("https://script.google.com/macros/s/AKfycby7O9cp1nlcG7ABIEYIn0vAIm1Fzaz-CcY3ETp_2I5k4ZnPUVBuLezR986PcXIwGw9Z/exec", {
            method: "POST",
            headers: {
                "Content-Type":"application/x-www-form-urlencoded" 
            },
            body: qs.stringify(data)
        }).then((res) => res.json())
    } catch(error) {
        console.log(error);
    }
}
// 서버연결
export async function serverTest(formData) {
    try{
        return await fetch("https://test-koinonia.koyeb.app/board/write", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json" // 서버에 어떤 데이터로 요청할것인지
            },
            body: JSON.stringify(formData) // 객체 json화
        }).then(res => res.json());
    } catch(error) {
        console.log(error);
    }
}