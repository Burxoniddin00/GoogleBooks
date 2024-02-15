"use client";
import HomeControllers from "@/controllers/headers/home";
import Pages from "@/controllers/swagers/pages";
import Pages2 from "@/controllers/main/pages";
import { useState } from "react";
let GOOGLE__API = "AIzaSyBGeFtI5nNBzxeyUrCws33SQ-dCsOvPF0M";

export default function Home() {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  async function nowPagesData(i) {
    await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=java&startIndex=0&maxResults=40`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          let t = Math.ceil(data.items.length / 6);
          let arr = [];
          for (let i = 0; i < t; i++) {
            arr.push(i + 1);
          }
          setPages(arr);
          let n = i * 6;
          let o = n - 6;
          setData(data.items.slice(o, n));
        }
      });
  }
  function nowSearche(search, i) {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=` +
        GOOGLE__API
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          let t = Math.ceil(data.items.length / 6);
          let arr = [];
          for (let i = 0; i < t; i++) {
            arr.push(i + 1);
          }
          setPages(arr);
          let n = i * 6;
          let o = n - 6;
          console.log(o, n);
          setData(data.items.slice(o, n));
        }
      });
  }
  return (
    <div className="container mx-auto">
      <HomeControllers nowSearche={nowSearche} setData={setData} setPages={setPages} nowPagesData={nowPagesData}/>
      <Pages />
      <Pages2
        data={data}
        pages={pages}
        nowPagesData={nowPagesData}
        nowSearche={nowSearche}
      />
    </div>
  );
}
