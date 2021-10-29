/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";
import { checkMobile } from "Config/GlobalJs";
import Popup_nomal from "Components/Popup/Popup_nomal";

import React, { useEffect, useContext, useState } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { Link, useHistory } from "react-router-dom";
import { fn_masking } from "Jquery/Jquery";

export default function Find_id() {
  const [state, dispatch] = useContext(authContext);
  const [domFlag, setFlag] = useState({});
  const history = useHistory();

  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };

  const handleCheck = (e) => {
    let phoneValue = $("#userPhone").val();
    if (phoneValue === "") {
      $("#resAlert").text("인증받을 번호를 입력해주세요.");
      $(".overlay.popupExitJoin").addClass("active");
      $("body").addClass("modal-opened");
      return false;
    } else {
      let body = {
        request_type: "find_id",
        country_code: "82",
        mobile: phoneValue,
      };
      axios
        .all([
          axios.post(
            `${SERVER_DALKOMM}/app/api/account/simple/cert/create_number`,
            body,
            header_config
          ),
        ])
        .then(
          axios.spread((res1) => {
            if (
              res1.data.meta.code === 20000 &&
              res1.data.meta.message === "SUCCESS"
            ) {
              $("#resAlert").text("인증번호를 전송했습니다.");
            } else {
              $("#resAlert").text("잘못된 번호입니다.");
            }
            $(".overlay.popupExitJoin").addClass("active");
            $("body").addClass("modal-opened");
          })
        );
    }
  };

  const handleSubmit = (e) => {
    let phoneValue = $("#userPhone").val();
    let body = {};
    if (phoneValue === "") {
      $("#resAlert").text("인증받을 번호를 입력해주세요.");
      $(".overlay.popupExitJoin").addClass("active");
      $("body").addClass("modal-opened");
      return false;
    } else {
      body = {
        request_type: "find_id",
        country_code: "82",
        mobile: phoneValue,
        cert_code: $("#numChk").val(),
      };
    }
    if ($("#numChk").val() !== "") {
      axios
        .all([
          axios.post(
            `${SERVER_DALKOMM}/app/api/account/simple/cert/confirm`,
            body,
            header_config
          ),
        ])
        .then(
          axios.spread((res1) => {
            if (res1.data.meta.code === 20000) {
              setFlag((origin) => {
                return {
                  ...origin,
                  userInfo: res1.data.data,
                };
              });
            } else if (res1.data.meta.code === 200518) {
              setFlag((origin) => {
                return {
                  ...origin,
                  userInfo: { login_id: "" },
                };
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

  const handleLogin = (e) => {
    try {
      if (checkMobile() === "android") {
        window.android.fn_login();
      } else if (checkMobile() === "ios") {
        window.webkit.messageHandlers.fn_login.postMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="아이디 찾기" />

          <div id="content" className="login search">
            <div className="w-inner">
              <div className="form-wrap">
                <form className="form">
                  <div className="title-wrap">
                    <h2 className="title">
                      등록하신 휴대전화 번호로 인증하여
                      <br />
                      아이디를 확인합니다.
                    </h2>
                  </div>

                  <fieldset className="fieldset">
                    <legend className="blind">아이디 찾기</legend>
                    <div className="field">
                      <label className="blind" htmlFor="userPhone">
                        핸드폰번호
                      </label>
                      <div className="insert">
                        <div className="bundle">
                          <input
                            type="number"
                            className="input-text medium"
                            id="userPhone"
                            placeholder="휴대전화 번호를 입력해 주세요."
                            inputMode="numeric"
                          />
                          <button
                            type="button"
                            className="btn dark-g small"
                            onClick={(e) => handleCheck(e.currentTarget)}
                          >
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
                          className="input-text medium"
                          id="numChk"
                          placeholder="인증번호를 입력해 주세요."
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  </fieldset>
                  <div className="btn-area">
                    <button
                      className="btn dark full large"
                      type="button"
                      onClick={(e) => handleSubmit(e.currentTarget)}
                    >
                      인증번호 입력
                    </button>
                  </div>
                </form>
              </div>

              {/* [D]:일치하는 아이디가 있는 경우 노출 */}
              {domFlag?.userInfo?.login_id !== "" &&
                domFlag?.userInfo?.login_id !== undefined && (
                  <div className="result-wrap">
                    <div className="title-wrap">
                      <h2 className="title">
                        고객님의 아이디를 알려 드립니다.
                      </h2>
                    </div>

                    <div className="detail-wrap">
                      <p className="info fc-orange">
                        {domFlag?.userInfo?.login_id}
                      </p>
                    </div>

                    <div className="btn-area">
                      <button
                        onClick={(e) => handleLogin(e.currentTarget)}
                        className="btn dark full large"
                      >
                        로그인 하기
                      </button>
                    </div>

                    <div className="search-induce">
                      <Link to="/join/findpw" className="btn">
                        비밀번호가 기억나지 않으세요?
                      </Link>
                    </div>
                  </div>
                )}

              {/* [D]:일치하는 아이디가 없는 경우 노출 */}
              {domFlag?.userInfo?.login_id === "" && (
                <div className="result-wrap">
                  <div className="title-wrap">
                    <h2 className="title">
                      입력하신 정보와
                      <br />
                      일치하는 아이디가 없습니다.
                    </h2>
                  </div>

                  <div className="btn-area full">
                    <button
                      onClick={(e) => handleCheck(e.currentTarget)}
                      className="btn normal large"
                    >
                      다시 인증하기
                    </button>
                    <Link to="/join/step1" className="btn dark large">
                      신규 회원 가입
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      <Popup_nomal />
      {/* // #wrap */}
    </React.Fragment>
  );
}
