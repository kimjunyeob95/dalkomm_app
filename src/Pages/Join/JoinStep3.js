/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function JoinStep3() {
  const history = useHistory();
  const location = useLocation();
  return (
    <React.Fragment>
      <div className="skip-nav">
        <Link to="#content">본문 바로가기</Link>
      </div>

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <header id="header" className="header">
            <h1 className="page-title">회원가입</h1>
            <button
              type="button"
              className="btn back"
              onClick={() => history.push("/")}
            >
              <i className="ico back">
                <span className="blind">뒤로</span>
              </i>
            </button>
          </header>

          <div id="content" className="join finish">
            <div className="w-inner">
              <ul className="step-state">
                <li>
                  <span className="blind">가입확인</span>
                </li>
                <li>
                  <span className="blind">정보입력</span>
                </li>
                <li className="current">
                  <span className="blind">가입완료</span>
                </li>
              </ul>

              <div className="title-wrap">
                <h2 className="section-title small">가입완료</h2>
                <p className="text">
                  <span className="fc-orange">{location?.userName}</span>님
                  <br />
                  달콤 크루가 되신 것을 환영합니다!
                </p>
              </div>

              <div className="btn-area">
                <Link to="/" className="btn dark full large">
                  메인 화면으로
                </Link>
              </div>
            </div>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
