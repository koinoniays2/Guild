import React from 'react'
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer({logoImg, logoCreator}) {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드러운 스크롤 적용
        });
    };
    return (
        <footer className="w-full p-5 bg-main-color flex justify-center py-5">
            <div className="w-full h-full max-w-lg lg:max-w-4xl flex flex-col sm:flex-row items-center justify-between">
                <div className="py-2">
                    <img className="w-9 h-9 cursor-pointer" src={logoImg} alt="logo_img" onClick={scrollToTop}/>
                </div>
                <div className="text-2xl text-white-color flex py-2 space-x-3">
                    <p><FaGithub /></p>
                    <p><FaInstagram /></p>
                    <p><FaTwitter /></p>
                </div>
                <div className="text-sm text-white-color flex flex-col justify-center py-2">
                    <p>All Data From Nexon Open API</p>
                    <p>This Site Was Created By 아카이슈이치</p>
                    <p>Logo Made By {logoCreator}</p>
                </div>
            </div>
        </footer>
    )
}
