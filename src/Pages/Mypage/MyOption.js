/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import $ from "jquery";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { fadeOut, checkMobile } from "Config/GlobalJs";
import GoContents from "Components/GoContents";
import Popup_logout from "Components/Popup/Popup_logout";
import { contGap, popupOpen } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

export default function MyOption() {
  const [state] = useContext(authContext);
  const [axioData, setData] = useState();

  const body = {};
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
      "X-DALKOMM-APP-TYPE": state.app_type,
      "X-DALKOMM-STORE": state.udid,
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
    if (state?.app_version >= axioData?.res1_data?.app_version) {
      alert("?????? ???????????????.");
    } else {
      let linkData;

      try {
        if (checkMobile() === "android") {
          linkData = { data: "https://play.google.com/store/search?q=%EB%8B%AC%EC%BD%A4%EC%BB%A4%ED%94%BC&c=apps" };
          linkData = JSON.stringify(linkData);
          window.android.fn_callUrl(linkData);
        } else if (checkMobile() === "ios") {
          linkData = { data: "https://apps.apple.com/kr/app/%EB%8B%AC%EC%BD%A4%EC%BB%A4%ED%94%BC/id1097036744" };
          linkData = JSON.stringify(linkData);
          window.webkit.messageHandlers.fn_callUrl.postMessage(linkData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header undefined">
              <h1 className="page-title">??? ??????</h1>
              <Link to="/menu" type="button" className="btn back">
                <i className="ico back">
                  <span className="blind">??????</span>
                </i>
              </Link>
            </header>

            <div id="content" className="settings fade-in">
              <ul className="setting-list">
                <li>
                  <div className="flex-both">
                    <span>????????? PUSH ?????? ??????</span>
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
                    ????????? ?????? ????????? ????????? ????????? ????????? ?????????,
                    <br />
                    ?????? ?????? ?????? ???????????? ???????????? ??? ????????????.
                  </p>
                </li>
                <li>
                  ?????? ??????<span>v{state?.app_version}</span>
                  <div className="btn-area">
                    <button className="btn x-small normal full" onClick={(e) => handleUpdate(e.currentTarget)}>
                      ?????? ?????? ????????????
                    </button>
                    {/* <button className="btn x-small normal full" disabled>?????? ???????????????.</button> */}
                  </div>
                </li>
                <li>
                  <Link to="/support/company">????????? ?????? ??????</Link>
                </li>
                <li>
                  <a className="open-pop" data-href="#popupExitJoin" onClick={(e) => popupOpen(e.target)}>
                    ????????????
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
              <h1 className="page-title">??? ??????</h1>
              <Link to="/menu" type="button" className="btn back">
                <i className="ico back">
                  <span className="blind">??????</span>
                </i>
              </Link>
            </header>
          </div>
        </div>
      </React.Fragment>
    );
}
