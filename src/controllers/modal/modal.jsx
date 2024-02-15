"use client";
import { MdClose } from "react-icons/md";
import { useState } from "react";

const Modal = ({ modalOpen, setModalOpen, title, children }) => {
  const closeModale = () => setModalOpen(false);
  return (
    <div
      className={
        modalOpen
          ? "fixed top-0 right-0 w-full z-50 h-full bg-white  bg-opacity-55 overflow-scroll"
          : "hidden"
      }
    >
      <div className="absolute w-[70%] right-0 bg-white dark:bg-neutral-800 pb-10">
        <div className="flex items-center justify-between">
          <button
            className="bg-black rounded-lg m-4"
            onClick={() => closeModale()}
          >
            <MdClose size={24} color={"#000"} />
          </button>
          <h2 className="text-black dark:text-white pr-10 text-xl">{title}</h2>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
