import React from "react";
import Logo from "../assets/고래.png"
import { Link } from "react-router-dom";

export default function Header() {
  const imageClick = () => {
    window.location.reload();
  };
  return (
    <header className="w-full flex justify-center">
      <nav className="w-full h-12 my-4 max-w-7xl flex justify-center">
          <img className="cursor-pointer" src={Logo} alt="logo" onClick={imageClick}/>
      </nav>
    </header>
  );
}
