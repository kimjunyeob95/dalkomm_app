/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import $ from "jquery";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import { Link, useHistory } from "react-router-dom";
import GoContents from "Components/GoContents";
import Popup_logout from "Pages/Popup_logout";
import { contGap, popupOpen } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

export default function MyOption() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
  const handleLogout = () => {
    alert("로그아웃 함수 호출");
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    contGap();
    const body = {};
    const header_config = {
      headers: {
        "X-dalkomm-access-token": state?.accessToken,
        Authorization: state?.auth,
      },
    };
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/main`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/main/user`, body, header_config),
        axios.post(
          `${SERVER_DALKOMM}/app/api/v2/my_account/profile`,
          body,
          header_config
        ),
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
  }, [axioData]);
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
                    <input
                      type="checkbox"
                      name="onoff"
                      className="onoff-checkbox"
                      id="onoffS"
                      defaultChecked={
                        axioData?.res3_data?.agree_receive_sms && true
                      }
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
                버전 정보<span>v{axioData?.res1_data?.app_version}</span>
                <div className="btn-area">
                  <button className="btn x-small normal full">
                    최신 버전 업데이트
                  </button>
                  {/* <button className="btn x-small normal full" disabled>최신 버전입니다.</button> */}
                </div>
              </li>
              <li>
                <Link to="#">사업자 정보 확인</Link>
              </li>
              <li>
                <a
                  className="open-pop"
                  href="#popupExitJoin"
                  onClick={(e) => popupOpen(e.target)}
                >
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
}
