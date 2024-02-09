import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { HiMiniXMark } from "react-icons/hi2";
import Email from "./Email";
import { motion, AnimatePresence } from "framer-motion";
export default function MailButton() {
    const [email, setEmail] = useState(false);
    
    return (
        <>
        {/* 메일 버튼 */}
        <div className={`fixed p-3 bottom-5 left-5 cursor-pointer bg-gray-900 rounded-full z-50 ${email && "hidden"}`}
        onClick={() => setEmail(true)}>
            <FiMail color="#5CCBF9" size="20px"/>
        </div>
        {/* 메일 창 */}
        <AnimatePresence>
        {
        email &&
        <>
        <motion.section className="fixed top-0 left-0 w-full h-screen bg-black/20 z-40"
        initial={{ opacity:0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={() => setEmail(false)}>
            <div 
            onClick={(e) => e.stopPropagation()} // 부모 이벤트 받지않기
            className="fixed bottom-20 left-5 w-full max-w-80 h-[80%] bg-white-color/90 z-40 rounded-xl overflow-hidden">
                {/* 메일 폼 */}
                <Email />
            </div>
        </motion.section>
        {/* 닫기 버튼 */}
        <div className={`fixed p-3 bottom-5 left-5 cursor-pointer bg-gray-900 rounded-full z-40  ${!email && "hidden"}`}
        onClick={() => setEmail(false)}>
            <HiMiniXMark color="#5CCBF9" size="20px"/>
        </div>
        </>
        }
        </AnimatePresence>
        </>
    )
}
