import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function TopButton() {
    const [isVisible, setIsVisible] = useState(false);
    // 스크롤 위치가 56 이상이면 버튼을 보이게 함
    const handleScroll = () => {
        const scrollY = window.scrollY
        setIsVisible(scrollY > 56);
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드러운 스크롤 적용
        });
    };

    useEffect(() => {
        // 스크롤 이벤트 리스너 등록
        window.addEventListener('scroll', handleScroll);

        // 컴포넌트가 언마운트될 때 리스너 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`fixed p-4 bottom-0 right-0 cursor-pointer ${isVisible ? 'opacity-100' : 'opacity-0'} z-50`}
            onClick={scrollToTop}>
            <button><FaArrowUp color="#5CCBF9" size="20px" /></button>
        </div>
    );
}