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
        // ocid가 없을 경우 오류 처리 또는 기본값 설정
        throw new Error("ocid is undefined");
    }
    return await fetch(`https://open.api.nexon.com/maplestory/v1/character/dojang?ocid=${ocid}&date=${getCurrentDate()}`, {
        method: "GET",
        headers:{
            "x-nxopen-api-key": API_KEY
        },
    }).then((res) => res.json());
}