import { Link } from "react-router-dom";

export default function Top({logoImg}) {
    return (
        <header className="w-full h-14 bg-main-color">
            <Link to="/">
            <div className="w-full h-full p-base flex items-center sm:justify-center">
                <img className="w-9 h-9" src={logoImg} alt="logo_img" />
            </div>
            </Link>
        </header>
    )
}
