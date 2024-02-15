"use client";
import React, { useEffect, useState } from "react";
import "./main.scss";
import boock from "../../img/boock.png";
import delete1 from "../../img/delete.png";
import Image from "next/image";
import Modal from "../modal/modal";
import Link from "next/link";

const Pages = ({ data, pages, nowPagesData, nowSearche }) => {
  const [bookInfo, setBookInfo] = useState([]);
  const [title, setTitle] = useState("");
  const [bookMark, setBookMark] = useState([]);
  const [nowPages, setNowPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const addBookMark = async (id) => {
    const ma = data.find((r) => r.id === id);
    if (ma && !bookMark.find((e) => e.id === ma.id)) {
      setBookMark([...bookMark, ma]);
    }
  };

  const deleteBookMark = (id) => {
    if (id) {
      setBookMark(bookMark.filter((e) => e.id != id));
    }
  };

  useEffect(() => {
    nowPagesData(nowPages);
  }, []);

  const henderOpenModal = (id) => {
    setModalOpen(!modalOpen);
    if (id) {
      const use = data.filter((e) => e.id === id);
      setBookInfo(use);
      setTitle(use[0]?.volumeInfo?.title || "");
    }
  };

  const nextPages = () => {
    if (pages.length > nowPages) {
      const search = localStorage.getItem("search");
      if (search) {
        setNowPages(nowPages + 1);
        nowSearche(search, nowPages + 1);
      } else {
        setNowPages(nowPages + 1);
        nowPagesData(nowPages + 1);
      }
    }
  };

  const olldPages = () => {
    const search = localStorage.getItem("search");
    if (nowPages > 1) {
      if (search) {
        setNowPages(nowPages - 1);
        nowSearche(search, nowPages - 1);
      } else {
        setNowPages(nowPages - 1);
        nowPagesData(nowPages - 1);
      }
    }
  };

  const nowPage = (pa) => {
    if (pa) {
      const search = localStorage.getItem("search");
      if (search) {
        setNowPages(pa);
        nowSearche(search, pa);
      } else {
        setNowPages(pa);
        nowPagesData(pa);
      }
    }
  };

  return (
    <div>
      <main className="main dark:bg-neutral-500">
        <section className="main__section dark:bg-[#212529] px-2">
          <div className="container main__section__container">
            <div className="bookmarks__div">
              <h3 className="book dark:text-white">Bookmarks</h3>
              <p className="main__section__text dark:text-white">
                If you don’t like to read, you haven’t found the right book
              </p>
            </div>
            <ul className="main__section__sitey">
              {bookMark.map((e, i) => (
                <li
                  className="item dark:bg-neutral-700 dark:text-white"
                  key={i}
                >
                  <div>
                    <p className="item__text dark:text-white" id="item__text">
                      {e.volumeInfo.title}
                    </p>
                    <p
                      className="item__name dark:text-yellow-100"
                      id="item__name"
                    >
                      {e.volumeInfo.authors
                        ? e.volumeInfo.authors.join(", ")
                        : ""}
                    </p>
                  </div>
                  <div id="main__delit__img">
                    <Link href={e.volumeInfo.infoLink} target="_blank">
                      <Image
                        className="img cursor-pointer"
                        id="img"
                        src={boock}
                        alt="boock"
                      />
                    </Link>

                    <Image
                      onClick={() => deleteBookMark(e.id)}
                      id="imgen"
                      className="img cursor-pointer"
                      src={delete1}
                      alt="delete"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="main__section2">
          <div className="container section2__div">
            <ul className="cretElement" id="cretElement">
              {data.map((i, e) => (
                <li
                  className="main__cretElement dark:bg-[#212529] h-full items-center"
                  id="main__cretElement"
                  key={e}
                >
                  <div className="main__cretElement__img dark:bg-transparent">
                    <Image
                      width={150}
                      height={50}
                      id="book__img"
                      src={i.volumeInfo.imageLinks?.smallThumbnail || ""}
                      alt="book"
                    />
                  </div>
                  <div className="main__inner">
                    <h2
                      id="cretElement__inner"
                      className="cretElement__inner dark:text-white"
                    >
                      {i.volumeInfo.title}
                    </h2>
                    {i.volumeInfo.authors &&
                      i.volumeInfo.authors.map((r, a) => (
                        <p
                          key={a}
                          id="cretElement__taxt"
                          className="cretElement__taxt dark:text-white"
                        >
                          {r}
                        </p>
                      ))}
                    <p
                      id="cretElement__namber"
                      className="cretElement__namber mt-2 dark:text-white"
                    >
                      {i.volumeInfo.publishedDate}
                    </p>
                  </div>
                  <div className="main__btn">
                    <div className="main__btn__more">
                      <button
                        onClick={() => addBookMark(i.id)}
                        className="main__bookmark"
                        id="main__bookmark"
                      >
                        Bookmark
                      </button>
                      <button
                        className="main__more btn-primary cursor-pointer"
                        id="info__btn"
                        type="button"
                        onClick={() => henderOpenModal(i.id)}
                      >
                        More Info
                      </button>
                    </div>
                    <Link href={i.volumeInfo.infoLink} target="_blank">
                      <button className="main__read">Read</button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <nav aria-label="Page navigation example">
              <ul className="pagination flex items-center justify-center">
                <li
                  id="prev"
                  onClick={olldPages}
                  className={`bg-blue-700 rounded-2xl p-1 page-link w-7 text-center hover:bg-blue-300 ${
                    nowPages === 1 ? "opacity-50" : ""
                  }`}
                >
                  &laquo;
                </li>
                {pages.map((p) => (
                  <li
                    onClick={() => nowPage(p)}
                    key={p}
                    className={`rounded-2xl p-1 page-link page-number w-7 text-center hover:bg-blue-300 ${
                      p === nowPages ? "bg-blue-950" : "bg-blue-700"
                    }`}
                  >
                    {p}
                  </li>
                ))}
                <li
                  onClick={nextPages}
                  id="next"
                  className={`page-item page-link w-7 text-center hover:bg-blue-300 ${
                    pages.length === nowPages ? "opacity-50" : ""
                  }`}
                >
                  &raquo;
                </li>
              </ul>
            </nav>
          </div>
        </section>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} title={title}>
          {bookInfo.map((bo, index) => (
            <div className="offcanvas-body" key={index}>
              <div className="info__img_inner">
                <Image
                  width={150}
                  height={100}
                  className="info__img mx-auto"
                  id="info__img"
                  src={bo.volumeInfo.imageLinks?.smallThumbnail || ""}
                  alt="book"
                />
              </div>
              <div className="info__div">
                <div>
                  <p className="info__taxt dark:text-white" id="info__taxt">
                    {bo.volumeInfo.description}
                  </p>
                </div>
                <div>
                  <h2 className="info__inner dark:text-white">
                    Author :
                    <span className="info__span ml-2 " id="span">
                      {bo.volumeInfo.authors
                        ? bo.volumeInfo.authors.join(", ")
                        : ""}
                    </span>
                  </h2>
                  <h2 className="info__inner info__inner2 dark:text-white">
                    Published :
                    <span className="info__span ml-2" id="info__namer">
                      {bo.volumeInfo.publishedDate}
                    </span>
                  </h2>
                  <h2 className="info__inner info__inner3 dark:text-white">
                    Publishers:
                    <span className="info__span ml-2" id="publishers">
                      {bo.volumeInfo.publisher}
                    </span>
                  </h2>
                  <h2 className="info__inner info__inner4 dark:text-white">
                    Categories:
                    <span id="categories" className="info__span ml-2">
                      {bo.volumeInfo.categories
                        ? bo.volumeInfo.categories.join(", ")
                        : ""}
                    </span>
                  </h2>
                  <h2 className="info__inner info__inner5 dark:text-white">
                    Pages Count:
                    <span id="pages" className="info__span ml-2">
                      {bo.volumeInfo.pageCount}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </Modal>
      </main>
    </div>
  );
};

export default Pages;
