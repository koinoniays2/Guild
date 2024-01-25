import React from "react";
import Logo from "../assets/고래.png"
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full flex justify-center">
      <nav className="w-full h-12 my-4 max-w-7xl flex justify-center">
        <Link to={"/"}>
          <img className="w-full h-full cursor-pointer" src={Logo} alt="logo" />
        </Link>
      </nav>
    </header>
  );
}
