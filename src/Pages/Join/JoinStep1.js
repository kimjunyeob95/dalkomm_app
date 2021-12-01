/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { popupOpen, fadeInOut } from "Jquery/Jquery";
import Popup_bak from "Components/Popup/Popup_bak";
import Popup_nomal from "Components/Popup/Popup_nomal";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";

export default function JoinStep1() {
  const [state] = useContext(authContext);
  const history = useHistory();
  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };

  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    fadeInOut();
  }, [state?.auth]);

  const handleCheck = (e) => {
    let phoneValue = $("#userPhone").val();
    if (phoneValue === "") {
      $("#resAlert").text("인증받을 번호를 입력해 주세요.");
      $(".overlay.popupExitJoin").addClass("active");
      $("body").addClass("modal-opened");
      return false;
    } else {
      let body = {
        request_type: "join",
        country_code: "82",
        mobile: phoneValue,
      };

      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/account/simple/cert/create_number`, body, header_config)]).then(
        axios.spread((res1) => {
          if (res1.data.meta.code === 20000 && res1.data.meta.message === "SUCCESS") {
            $("#resAlert").text("인증번호를 전송했습니다.");
            $(".overlay.popupExitJoin").addClass("active");
            $("body").addClass("modal-opened");
          } else {
            $("#resAlert").text("잘못된 번호입니다.");
            $(".overlay.popupExitJoin").addClass("active");
            $("body").addClass("modal-opened");
          }
        })
      );
    }
  };

  const handleSubmit = (e) => {
    let phoneValue = $("#userPhone").val();
    let body = {};
    if (phoneValue === "") {
      $("#resAlert").text("인증받을 번호를 입력해 주세요.");
      $(".overlay.popupExitJoin").addClass("active");
      $("body").addClass("modal-opened");
      return false;
    } else {
      body = {
        request_type: "join",
        country_code: "82",
        mobile: phoneValue,
        cert_code: $("#numChk").val(),
      };
    }
    if ($("#numChk").val() !== "") {
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/account/simple/cert/confirm`, body, header_config)]).then(
        axios.spread((res1) => {
          if (res1.data.meta.code === 20000) {
            history.push({
              pathname: "/join/step2",
              join_token: res1.data.data.join_token,
            });
          } else {
            $("#resAlert").text(res1.data.meta.msg);
            $(".overlay.popupExitJoin").addClass("active");
            $("body").addClass("modal-opened");
            return false;
          }
        })
      );
    } else {
      $("#resAlert").text("인증번호를 제대로 입력해주세요.");
      $(".overlay.popupExitJoin").addClass("active");
      $("body").addClass("modal-opened");
      return false;
    }
  };
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
                          <button type="button" className="btn dark-g small" onClick={(e) => handleCheck(e.currentTarget)}>
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
                    <button type="button" className="btn dark full large" onClick={(e) => handleSubmit(e.currentTarget)}>
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
      <Popup_nomal />
    </React.Fragment>
  );
}
