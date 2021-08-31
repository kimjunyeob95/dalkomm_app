/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Link } from "react-router-dom";
import { popupOpen } from "Jquery/Jquery";
import Popup_bak from "./Popup_bak";

export default function JoinStep1() {
  return (
    <React.Fragment>
      <div className="skip-nav">
        <Link to="#content">본문 바로가기</Link>
      </div>

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <header id="header" className="header">
            <h1 className="page-title">회원가입</h1>
            <button type="button" className="btn back open-pop" pop-target="#popupExitJoin" onClick={(e) => popupOpen(e.target)}>
              <i className="ico back" pop-target="#popupExitJoin">
                <span className="blind">뒤로</span>
              </i>
            </button>
          </header>

          <div id="content" className="join">
            <div className="w-inner">
              <div className="form-wrap">
                <form className="form">
                  <ul className="step-state">
                    <li className="current">
                      <span className="blind">가입확인</span>
                    </li>
                    <li>
                      <span className="blind">정보입력</span>
                    </li>
                    <li>
                      <span className="blind">가입완료</span>
                    </li>
                  </ul>

                  <div className="title-wrap">
                    <h2 className="section-title small">가입확인</h2>
                    <p className="text">휴대전화 번호를 인증해 주세요.</p>
                  </div>

                  <fieldset className="fieldset">
                    <legend className="blind">아이디 찾기</legend>
                    <div className="field">
                      <label className="blind" htmlFor="userPhone">
                        휴대전화 번호
                      </label>
                      <div className="insert">
                        <div className="bundle">
                          <input
                            type="number"
                            className="input-text medium input-line"
                            id="userPhone"
                            placeholder="휴대전화 번호를 입력해 주세요."
                            inputMode="numeric"
                          />
                          <button type="button" className="btn dark-g small">
                            인증하기
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <label className="blind" htmlFor="numChk">
                        인증번호
                      </label>
                      <div className="insert">
                        <input
                          type="number"
                          className="input-text medium input-line"
                          id="numChk"
                          placeholder="인증번호를 입력해 주세요."
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  </fieldset>
                  <div className="btn-area">
                    <button type="button" className="btn dark full large">
                      인증번호 입력
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>

      <Popup_bak />
    </React.Fragment>
  );
}
