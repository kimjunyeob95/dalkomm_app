import React from "react";
import HeaderSub from "Components/Header/HeaderSub";

import GoContents from "Components/GoContents";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="로그인" />

          <div id="content" className="login">
            <div className="w-inner">
              <div className="logo-box">
                <img src="/@resource/images/com/login_logo.svg" alt="Dak.Komm" />
              </div>

              <form className="form">
                <fieldset className="fieldset">
                  <legend className="blind">아이디 찾기</legend>
                  <div className="field">
                    <label className="blind" forhtml="loginId">
                      아이디 이메일주소
                    </label>
                    <div className="insert">
                      <input type="text" className="input-text medium input-line" id="loginId" placeholder="아이디나 이메일주소를 입력해 주세요." />
                    </div>
                  </div>
                  <div className="field">
                    <label className="blind" forhtml="loginPw">
                      비밀번호
                    </label>
                    <div className="insert">
                      <input type="number" className="input-text medium input-line" id="loginPw" placeholder="비밀번호를 입력해 주세요." />
                    </div>
                  </div>
                </fieldset>
                <div className="btn-area">
                  <Link to="" className="btn dark full medium">
                    로그인 하기
                  </Link>
                </div>

                <ul className="row-list flex-center">
                  <li>
                    <Link to="LL002.html">아이디 찾기</Link>
                  </li>
                  <li>
                    <Link to="LL003.html">비밀번호 찾기</Link>
                  </li>
                </ul>
              </form>

              <div className="join-induce">
                <p className="ta-c">아직 달콤 회원이 아니신가요?</p>
                <Link to="LJ001.html" className="btn normal full medium">
                  신규 회원 가입
                </Link>
                <div className="etc-btn">
                  <Link to="#" className="btn">
                    비회원으로 둘러보기
                  </Link>
                </div>
              </div>

              <div className="sns-login">
                <p className="title">2018년 2월 이전 SNS회원 로그인</p>
                <ul className="data-list col-4">
                  <li>
                    <Link to="#" className="btn sns">
                      <i className="ico google">
                        <span className="blind">구글로 로그인하기</span>
                      </i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="btn sns">
                      <i className="ico facebook">
                        <span className="blind">페이스북으로 로그인하기</span>
                      </i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="btn sns">
                      <i className="ico kakao">
                        <span className="blind">카카오로 로그인하기</span>
                      </i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="btn sns">
                      <i className="ico apple">
                        <span className="blind">애플로 로그인하기</span>
                      </i>
                    </Link>
                  </li>
                </ul>
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
