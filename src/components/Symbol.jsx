import React, { useState } from 'react'

export default function Symbol({symbol}) {
    // console.log(symbol);
    const [btnOn, setBtnOn] = useState("arcane");
    // 아케인심볼 배열
    let arcaneSymbols = [];
    if (symbol?.symbol?.length !== 0) {
        arcaneSymbols = (symbol?.symbol)?.filter(item => item.symbol_name.includes("아케인심볼"));
    }
    // console.log(arcaneSymbols);
    // 아케인심볼 총 포스, 주스텟
    let arcaneForce = 0;
    let arcaneHP = 0;
    let arcaneSTR = 0;
    let arcaneDEX = 0;
    let arcaneINT = 0;
    let arcaneLUK = 0;
    if (arcaneSymbols?.length !== 0) {
        arcaneForce += arcaneSymbols?.reduce((total, item) => total + parseInt(item.symbol_force), 0);
        arcaneHP += arcaneSymbols?.reduce((total, item) => total + parseInt(item.symbol_hp), 0);
        arcaneSTR += arcaneSymbols?.reduce((total, item) => total + parseInt(item.symbol_str), 0);
        arcaneDEX += arcaneSymbols?.reduce((total, item) => total + parseInt(item.symbol_dex), 0);
        arcaneINT += arcaneSymbols?.reduce((total, item) => total + parseInt(item.symbol_int), 0);
        arcaneLUK += arcaneSymbols?.reduce((total, item) => total + parseInt(item.symbol_luk), 0);
    }
    // 어센틱심볼 배열
    let authenticSymbols = [];
    if (symbol?.symbol?.length !== 0) {
        authenticSymbols = (symbol?.symbol)?.filter(item => item.symbol_name.includes("어센틱심볼"));
    }
    // console.log(authenticSymbols);
    // 어센틱심볼 총 포스, 주스텟
    let authenticForce = 0; 
    let authenticHP = 0;
    let authenticSTR = 0;
    let authenticDEX = 0;
    let authenticINT = 0;
    let authenticLUK = 0;
    if (authenticSymbols?.length !== 0) {
        authenticForce += authenticSymbols?.reduce((total, item) => total + parseInt(item.symbol_force), 0);
        authenticHP += authenticSymbols?.reduce((total, item) => total + parseInt(item.symbol_hp), 0);
        authenticSTR += authenticSymbols?.reduce((total, item) => total + parseInt(item.symbol_str), 0);
        authenticDEX += authenticSymbols?.reduce((total, item) => total + parseInt(item.symbol_dex), 0);
        authenticINT += authenticSymbols?.reduce((total, item) => total + parseInt(item.symbol_int), 0);
        authenticLUK += authenticSymbols?.reduce((total, item) => total + parseInt(item.symbol_luk), 0);
    }
    return (
        symbol &&
        <section className="w-full max-w-80 flex flex-col items-center justify-center space-y-5 p-5 rounded-lg bg-gray-200 text-[12px]">
            {/* 아케인, 어센틱 버튼 */}
            <div className="w-full flex justify-center items-center text-sm text-white-color">
                <button className={`py-1 bg-gray-400 ${btnOn === "arcane" && 'bg-[#36B8D0]'} uppercase w-2/5 rounded-l-xl`}
                onClick={() => setBtnOn("arcane")}>arcane</button>
                <button className={`py-1 bg-gray-400 ${btnOn === "authentic" && 'bg-[#36B8D0]'} uppercase w-2/5 rounded-r-xl`}
                onClick={() => setBtnOn("authentic")}>authentic</button>
            </div>
            {/* 아케인심볼 화면 */}
            {btnOn === "arcane" &&
            // 아케인심볼이 존재하면
            arcaneSymbols?.length !== 0 &&
            <div className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#5b5b93] to-[#737dbb] text-white-color p-2 space-y-2 rounded-lg">
                <p className="uppercase text-gray-300">arcane equipment</p>
                {/* 아케인 포스가 있으면 ARC, 주스텟 */}
                {arcaneForce !== 0 && (
                <div className="w-full flex flex-col justify-center items-center space-y-0.5 pb-2">
                    <div className="flex w-1/3 justify-between font-bold text-sm">
                        <p>ARC</p>
                        <p>+{arcaneForce}</p>
                    </div>
                    <div className="flex w-1/3 justify-between font-bold text-sm">
                        <p>
                        {arcaneHP !== 0 && `HP`}
                        {arcaneSTR !== 0 && `STR`}
                        {arcaneDEX !== 0 && `DEX`}
                        {arcaneINT !== 0 && `INT`}
                        {arcaneLUK !== 0 && `LUK`}
                        </p>
                        <p>+{arcaneHP || arcaneSTR || arcaneDEX || arcaneINT || arcaneLUK}</p>
                    </div>
                </div>
                )}
                {/* 심볼이미지 */}
                <div className="w-full flex flex-wrap">
                    {arcaneSymbols?.map((item, index) => (
                    <div key={index} className="w-1/3 flex items-center justify-center pb-3">
                        <div className="w-16 flex flex-col items-center justify-center p-2 border border-[#f8e5a5] rounded-lg shadow-md">
                            <img src={item.symbol_icon} alt={item.symbol_name}/>
                            <p>Lv.{item.symbol_level}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            }
            {/* 어센틱심볼 */}
            {btnOn === "authentic" &&
            // 어센틱심볼이 존재하면
            authenticSymbols.length !== 0 &&
            <div className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#6597c9] to-[#8d8fd8] text-white-color p-2 rounded-lg space-y-2">
                <p className="uppercase text-gray-300">authentic equipment</p>
                {/* 어센틱 포스가 있으면 AUC, 주스텟 */}
                {authenticForce !== 0 && (
                <div className="w-full flex flex-col justify-center items-center space-y-0.5 pb-2">
                    <div className="flex w-1/3 justify-between font-bold text-sm">
                        <p>ARC</p>
                        <p>+{authenticForce}</p>
                    </div>
                    <div className="flex w-1/3 justify-between font-bold text-sm">
                        <p>
                        {authenticHP !== 0 && `HP`}
                        {authenticSTR !== 0 && `STR`}
                        {authenticDEX !== 0 && `DEX`}
                        {authenticINT !== 0 && `INT`}
                        {authenticLUK !== 0 && `LUK`}
                        </p>
                        <p>+{authenticHP || authenticSTR || authenticDEX || authenticINT || authenticLUK}</p>
                    </div>
                </div>
                )}
                {/* 심볼이미지 */}
                <div className="w-full flex flex-wrap">
                    {authenticSymbols?.map((item, index) => (
                    <div key={index} className="w-1/3 flex items-center justify-center pb-3">
                        <div className="w-16 flex flex-col items-center justify-center p-2 border border-[#f8e5a5] rounded-lg shadow-md">
                            <img src={item.symbol_icon} alt={item.symbol_name}/>
                            <p>Lv.{item.symbol_level}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            }
        </section>
    )
}
