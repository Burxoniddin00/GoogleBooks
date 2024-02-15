"use client";
import { useState } from "react";
import "./home.scss";
import Image from "next/image";
import icons from "../../../src/img/icock.svg";
import icons2 from "../../../src/img/Group2.png";
import srch from "../../../src/img/search.png";
import mon from "../../../src/img/mon.svg";
import Vector from "../../../src/img/Vector.svg";
import Link from "next/link";
let GOOGLE__API = "AIzaSyBGeFtI5nNBzxeyUrCws33SQ-dCsOvPF0M";

const HomeControllers = ({ nowSearche, nowPagesData }) => {
  const [iconsd, setIcons] = useState(icons);
  const henderMoon = (i) => {
    if (i == 1) {
      mons.className = "hidden cursor-pointer";
      sun.className = "block cursor-pointer";
      body.className = "bg-[#212529] dark";
      setIcons(icons2);
    } else if (i == 2) {
      mons.className = "block cursor-pointer";
      sun.className = "hidden cursor-pointer";
      body.className = "bg-white";
      setIcons(icons);
    }
  };

  const searcheBook = (search) => {
    localStorage.setItem("search", search);
    if (search) {
      nowSearche(search, 1);
    } else {
      nowPagesData(1);
    }
  };

  return (
    <>
      <div className="flex justify-between mt-5 border-b-2 pb-3 border-neutral-700 dark:border-white">
        <Link href={"/"}>
          <Image id="icon" src={iconsd} alt="icons" />
        </Link>
        <div className="bg-white shadow-md  text-gray-400 rounded-3xl flex items-center gap-5 w-3/5 dark:bg-neutral-500">
          <Image className="header__search" src={srch} alt="searche" />
          <input
            onChange={(e) => searcheBook(e.target.value)}
            type="text"
            placeholder="Search books"
            className="outline-none bg-transparent text-black w-[90%] dark:text-white"
          />
        </div>
        <div className="header__darc">
          <div className="darck">
            <Image
              src={mon}
              alt="mon"
              id="mons"
              width={20}
              className="cursor-pointer "
              onClick={() => henderMoon(1)}
            />
            <Image
              src={Vector}
              alt="sun"
              id="sun"
              width={20}
              className="cursor-pointer hidden"
              onClick={() => henderMoon(2)}
            />
          </div>
          <div className="logo">
            <button className=" header__logo">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeControllers;
