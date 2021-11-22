/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import $ from "jquery";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { fadeOut } from "Config/GlobalJs";
import GoContents from "Components/GoContents";
import Popup_logout from "Components/Popup/Popup_logout";
import { contGap, popupOpen, fadeInOut } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

export default function MyOption() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();

  const body = {};
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };

  useEffect(() => {
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/main`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/main/user`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/my_account/profile`, body, header_config),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          let res1_data = res1.data.data;
          let res2_data = res2.data.data;
          let res3_data = res3.data.data;
          setData((origin) => {
            return {
              ...origin,
              res1_data,
              res2_data,
              res3_data,
            };
          });
        })
      );
  }, []);
  useEffect(() => {
    contGap();
    fadeOut();
  }, [axioData]);

  const handleOption = (e) => {
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/push/agree`, { agree_receive_push: $(e).is(":checked") }, header_config)]).then(
      axios.spread((res1) => {
        res1.data.meta.code !== 20000 && alert(res1.data.meta.msg);
      })
    );
  };
  const handleUpdate = () => {
    if (state?.app_version > axioData?.res1_data?.app_version) {
      alert("최신 버전입니다.");
    }
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header undefined">
              <h1 className="page-title">앱 설정</h1>
              <Link to="/menu" type="button" className="btn back">
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </Link>
            </header>

            <div id="content" className="settings fade-in">
              <ul className="setting-list">
                <li>
                  <div className="flex-both">
                    <span>마케팅 PUSH 수신 동의</span>
                    <span className="onoff medium">
                      <input
                        type="checkbox"
                        name="onoff"
                        className="onoff-checkbox"
                        id="onoffS"
                        defaultChecked={axioData?.res2_data?.user?.agree_receive_push && true}
                        onChange={(e) => handleOption(e.currentTarget)}
                      />
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
                  버전 정보<span>v{state?.app_version}</span>
                  <div className="btn-area">
                    <button className="btn x-small normal full" onClick={(e) => handleUpdate(e.currentTarget)}>
                      최신 버전 업데이트
                    </button>
                    {/* <button className="btn x-small normal full" disabled>최신 버전입니다.</button> */}
                  </div>
                </li>
                <li>
                  <Link to="/support/company">사업자 정보 확인</Link>
                </li>
                <li>
                  <a className="open-pop" data-href="#popupExitJoin" onClick={(e) => popupOpen(e.target)}>
                    로그아웃
                  </a>
                </li>
              </ul>
            </div>
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        <Popup_logout />
        {/* // #wrap */}
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header undefined">
              <h1 className="page-title">앱 설정</h1>
              <Link to="/menu" type="button" className="btn back">
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </Link>
            </header>
          </div>
        </div>
      </React.Fragment>
    );
}
