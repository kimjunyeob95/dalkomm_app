import React from "react";
import { Link } from "react-router-dom";

export default function HeaderMain() {
  return (
    <header id="header" className="header floating">
      <div className="w-inner flex-both">
        <h1>
          <Link to="/" className="logo">
            <span className="blind">Dal.komm</span>
          </Link>
        </h1>
        <button type="button" className="open-search">
          <i className="ico search">
            <span>검색하기</span>
          </i>
        </button>
      </div>
    </header>
  );
}
