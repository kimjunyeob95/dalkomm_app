/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import $ from "jquery";
import React, { useEffect, useState } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import { Link, useHistory } from "react-router-dom";
import GoContents from "Components/GoContents";

export default function MyOption() {
  const handleLogout = () => {
    alert("로그아웃 함수 호출");
  };
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="앱 설정" />

          <div id="content" className="settings">
            <ul className="setting-list">
              <li>
                <div className="flex-both">
                  <span>마케팅 PUSH 수신 동의</span>
                  <span className="onoff medium">
                    <input type="checkbox" name="onoff" className="onoff-checkbox" id="onoffS" />
                    <label className="onoff-label" htmlFor="onoffS"></label>
                  </span>
                </div>
                <p className="sub-info">
                  마케팅 수신 동의를 하시면 달콤의 신상품 이벤트,
                  <br />
                  할인 혜택 등을 알림으로 만나보실 수 있습니다.
                </p>
              </li>
              <li>
                버전 정보<span>v2.5.6</span>
                <div className="btn-area">
                  <button className="btn x-small normal full">최신 버전 업데이트</button>
                  {/* <button className="btn x-small normal full" disabled>최신 버전입니다.</button> */}
                </div>
              </li>
              <li>
                <Link to="#">사업자 정보 확인</Link>
              </li>
              <li>
                <a onClick={() => handleLogout()}>로그아웃</a>
              </li>
            </ul>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
