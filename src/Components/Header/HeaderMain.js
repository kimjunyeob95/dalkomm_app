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
        <Link to={`/order/menuSearch/0`} type="button" className="open-search ">
          <i className="ico order white">
            <span>검색하기</span>
          </i>
        </Link>
      </div>
    </header>
  );
}
