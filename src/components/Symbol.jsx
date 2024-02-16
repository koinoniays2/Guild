import React, { useState } from 'react'

const SymbolBox = ({symbolarr, color1, color2, btnOn}) => {
    let FORCE = 0;
    let HP = 0;
    let STR = 0;
    let DEX = 0;
    let INT = 0;
    let LUK = 0;
    if (symbolarr?.length !== 0) {
        FORCE += symbolarr?.reduce((total, item) => total + parseInt(item.symbol_force), 0);
        HP += symbolarr?.reduce((total, item) => total + parseInt(item.symbol_hp), 0);
        STR += symbolarr?.reduce((total, item) => total + parseInt(item.symbol_str), 0);
        DEX += symbolarr?.reduce((total, item) => total + parseInt(item.symbol_dex), 0);
        INT += symbolarr?.reduce((total, item) => total + parseInt(item.symbol_int), 0);
        LUK += symbolarr?.reduce((total, item) => total + parseInt(item.symbol_luk), 0);
    }
    return (
        <div className={`w-full flex flex-col items-center justify-center bg-gradient-to-b ${color1} ${color2} text-white-color p-2 space-y-2 rounded-lg`}>
            <p className="uppercase text-gray-300">{btnOn} equipment</p>
            {/* 총 포스, 주스텟 */}
            <div className="w-full flex flex-col justify-center items-center space-y-0.5 pb-2">
                <div className="flex w-1/3 justify-between font-bold text-sm">
                    <p>{btnOn === "arcane" ? `ARC` : `AUT`}</p>
                    <p>+{FORCE}</p>
                </div>
                <div className="flex w-1/3 justify-between font-bold text-sm">
                    <p>
                    {HP !== 0 && `HP`}
                    {STR !== 0 && `STR`}
                    {DEX !== 0 && `DEX`}
                    {INT !== 0 && `INT`}
                    {LUK !== 0 && `LUK`}
                    </p>
                    <p>+{HP || STR || DEX || INT || LUK}</p>
                </div>
            </div>
            {/* 심볼이미지 */}
            <div className="w-full flex flex-wrap">
                {symbolarr?.map((item, index) => (
                <div key={index} className="w-1/3 flex items-center justify-center pb-3">
                    <div className="w-20 flex flex-col items-center justify-center p-1 border border-[#f8e5a5] rounded-lg shadow-md">
                        <img src={item.symbol_icon} alt={item.symbol_name}/>
                        <p>Lv.{item.symbol_level}</p>
                        <p>{btnOn === "arcane" ? `ARC` : `AUT`}: +{item.symbol_force}</p>
                        <p>{item.symbol_hp !== "0" && `HP: +${item.symbol_hp}`}
                        {item.symbol_str !== "0" && `STR: +${item.symbol_str}`}
                        {item.symbol_dex !== "0" && `DEX: +${item.symbol_dex}`}
                        {item.symbol_int !== "0" && `INT: +${item.symbol_int}`}
                        {item.symbol_luk !== "0" && `LUK: +${item.symbol_luk}`}</p>
                        <p className="font-bold">{btnOn === "arcane" ? (item.symbol_level === 20 ? `MAX` : `${item.symbol_growth_count}/${item.symbol_require_growth_count}`) 
                        : (item.symbol_level === 11 ? `MAX` : `${item.symbol_growth_count}/${item.symbol_require_growth_count}`)}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default function Symbol({symbol}) {
    const [btnOn, setBtnOn] = useState("arcane");
    const arcaneColor1 = "from-[#5b5b93]"
    const arcaneColor2 = "to-[#737dbb]"
    const authenticColor1 = "from-[#6597c9]"
    const authenticColor2 = "to-[#8d8fd8]"
    // 아케인심볼 배열
    let arcaneSymbols = [];
    if (symbol?.symbol?.length !== 0) {
        arcaneSymbols = (symbol?.symbol)?.filter(item => item.symbol_name.includes("아케인심볼"));
    }
    // console.log(arcaneSymbols);

    // 어센틱심볼 배열
    let authenticSymbols = [];
    if (symbol?.symbol?.length !== 0) {
        authenticSymbols = (symbol?.symbol)?.filter(item => item.symbol_name.includes("어센틱심볼"));
    }
    // console.log(authenticSymbols);
    
    return (
        symbol &&
        <section className="w-full max-w-80 flex flex-col items-center justify-center space-y-5 p-5 rounded-lg bg-gray-200 text-[12px]">
            {/* 아케인, 어센틱 버튼 */}
            <div className="w-full flex justify-center items-center text-sm text-white-color">
                <button className={`py-1 ${btnOn === "arcane" ? 'bg-[#36B8D0]' : 'bg-gray-400'} uppercase w-2/5 rounded-l-xl`}
                onClick={() => setBtnOn("arcane")}>arcane</button>
                <button className={`py-1 ${btnOn === "authentic" ? 'bg-[#36B8D0]' : 'bg-gray-400'} uppercase w-2/5 rounded-r-xl`}
                onClick={() => setBtnOn("authentic")}>authentic</button>
            </div>
            {/* 아케인심볼 화면 */}
            {btnOn === "arcane" && (
            // 아케인심볼이 존재하면
            arcaneSymbols?.length !== 0 ?
            <SymbolBox symbolarr={arcaneSymbols} color1={arcaneColor1} color2={arcaneColor2} btnOn={btnOn}/>
            : <p className="text-sm">장착된 아케인심볼이 없습니다.</p>
            )}
            {/* 어센틱심볼 화면 */}
            {btnOn === "authentic" && (
            // 어센틱심볼이 존재하면
            authenticSymbols.length !== 0 ? 
            <SymbolBox symbolarr={authenticSymbols} color1={authenticColor1} color2={authenticColor2} btnOn={btnOn}/>
            : <p className="text-sm">장착된 어센틱심볼이 없습니다.</p> )}
        </section>
    )
}
