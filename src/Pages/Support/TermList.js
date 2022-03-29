/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars

import React from "react";
import { Link, useHistory } from "react-router-dom";
import GoContents from "Components/GoContents";

export default function TermList() {
  const history = useHistory();
  const handleGoback = () => {
    if (history?.location?.from === "회원가입") {
      history.push({ pathname: `/join/step2/${history?.location.join_token}`, value: history?.location.value });
    } else {
      history.push("/menu");
    }
  };

  const handleDetail = (link) => {
    history.push(link);
  };

  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <header id="header" className="header">
            <h1 className="page-title">이용약관</h1>
            <a type="button" className="btn back" onClick={() => handleGoback()}>
              <i className="ico back">
                <span className="blind">뒤로</span>
              </i>
            </a>
          </header>

          <div id="content" className="terms">
            {/* 주문하기 */}
            <section className="section">
              <ul className="data-list">
                <li>
                  <a onClick={() => handleDetail(`/support/terms`)} className="item list">
                    서비스 이용약관
                  </a>
                </li>
                <li>
                  <a onClick={() => handleDetail(`/support/termLocation`)} className="item list">
                    위치정보 이용약관
                  </a>
                </li>
              </ul>
            </section>
            {/* // 주문하기 */}
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
