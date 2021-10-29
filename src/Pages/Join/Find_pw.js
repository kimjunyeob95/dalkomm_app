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
import { fn_pw_check } from "Jquery/Jquery";
import Popup_nomal from "Components/Popup/Popup_nomal";

import React, { useEffect, useContext, useState } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
export default function Find_pw() {
  const [state, dispatch] = useContext(authContext);
  const [domFlag, setFlag] = useState({});

  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };
  let body = {};
  const handleCheck = (e) => {
    let phoneValue = $("#userPhone").val();
    let userIdValue = $("#userId").val();
    if (userIdValue === "") {
      $("#resAlert").text("아이디나 이메일주소를 입력해주세요.");
      $(".overlay.popupExitJoin").addClass("active");
      $("body").addClass("modal-opened");
      return false;
    }
    if (phoneValue === "") {
      $("#resAlert").text("인증받을 번호를 입력해주세요.");
      $(".overlay.popupExitJoin").addClass("active");
      $("body").addClass("modal-opened");
      return false;
    }

    let body = {
      request_type: "publish_pwd",
      country_code: "82",
      mobile: $("#userPhone").val(),
      login_id: $("#userId").val(),
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
          return false;
        })
      );
  };

  const handleSubmit = (e) => {
    let phoneValue = $("#userPhone").val();
    let userIdValue = $("#userId").val();
    let body = {};
    if (userIdValue === "") {
      $("#resAlert").text("아이디나 이메일주소를 입력해주세요.");
      $(".overlay.popupExitJoin").addClass("active");
      $("body").addClass("modal-opened");
      return false;
    }
    if (phoneValue === "") {
      $("#resAlert").text("인증받을 번호를 입력해주세요.");
      $(".overlay.popupExitJoin").addClass("active");
      $("body").addClass("modal-opened");
      return false;
    }

    body = {
      request_type: "publish_pwd",
      country_code: "82",
      mobile: $("#userPhone").val(),
      login_id: $("#userId").val(),
      cert_code: $("#numChk").val(),
    };

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

  const handleChangePw = (e) => {
    let validation = true;
    $(".chk-validation").each(function (i, e) {
      if ($(e).val() === "") {
        validation = false;
        $("#resAlert").text($(e).attr("title") + "(을)를 입력해주세요.");
        $(".overlay.popupExitJoin").addClass("active");
        $("body").addClass("modal-opened");
        return false;
      }
    });
    if (validation && fn_pw_check($("#userPw").val(), $("#userPwChk").val())) {
      body = {
        password: $("#userPw").val(),
        password_confirm: $("#userPw").val(),
        publish_pwd_token: domFlag?.userInfo?.publish_pwd_token,
      };
      axios
        .all([
          axios.post(
            `${SERVER_DALKOMM}/app/api/account/simple/publish_pwd`,
            body,
            header_config
          ),
        ])
        .then(
          axios.spread((res1) => {
            $("#resAlert").text(res1.data.meta.msg);
            $(".overlay.popupExitJoin").addClass("active");
            $("body").addClass("modal-opened");
          })
        );
      setTimeout(() => {
        try {
          if (checkMobile() === "android") {
            window.android.fn_login();
          } else if (checkMobile() === "ios") {
            window.webkit.messageHandlers.fn_login.postMessage("");
          }
        } catch (error) {
          console.log(error);
        }
      }, 1800);
    }
  };

  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="비밀번호 찾기" />

          <div id="content" className="login search">
            <div className="w-inner">
              <div className="form-wrap">
                <form className="form">
                  <div className="title-wrap">
                    <h2 className="title">
                      등록하신 휴대전화 번호로 인증하여
                      <br />
                      비밀번호를 확인합니다.
                    </h2>
                  </div>

                  <fieldset className="fieldset">
                    <legend className="blind">비밀번호 찾기</legend>
                    <div className="field">
                      <label className="blind" htmlFor="userId">
                        아이디 또는 이메일주소
                      </label>
                      <div className="insert">
                        <input
                          type="text"
                          className="input-text medium"
                          id="userId"
                          placeholder="아이디나 이메일주소를 입력해주세요."
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="blind" htmlFor="userPhone">
                        휴대전화 번호
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

              {/* [D]: 휴대전화 번호 인증시 노출 */}
              {domFlag?.userInfo?.publish_pwd_token !== "" &&
                domFlag?.userInfo?.publish_pwd_token !== undefined && (
                  <div className="result-wrap">
                    <div className="title-wrap">
                      <h2 className="title">
                        새로운 비밀번호를 설정해 주세요.
                      </h2>
                    </div>

                    <div className="form-wrap">
                      <form className="form">
                        <fieldset className="fieldset">
                          <legend className="blind">비밀번호 재설정</legend>
                          <div className="field">
                            <label className="blind" htmlFor="userPw">
                              비밀번호 입력
                            </label>
                            <div className="insert">
                              <input
                                type="password"
                                className="input-text medium chk-validation"
                                id="userPw"
                                title="비밀번호"
                                placeholder="비밀번호를 입력해 주세요."
                              />
                            </div>
                            <p className="guide-txt">
                              8자리 이상 영문, 숫자, 특수문자 중 2가지 이상
                              사용해 주세요.
                            </p>
                          </div>
                          <div className="field">
                            <label className="blind" htmlFor="userPwChk">
                              비밀번호 재입력
                            </label>
                            <div className="insert">
                              <input
                                type="password"
                                className="input-text medium chk-validation"
                                id="userPwChk"
                                title="비밀번호 확인"
                                placeholder="비밀번호를 한번 더 입력해 주세요."
                              />
                            </div>
                          </div>
                        </fieldset>
                        <div className="btn-area">
                          <button
                            className="btn dark full large"
                            type="button"
                            onClick={(e) => handleChangePw(e.currentTarget)}
                          >
                            비밀번호 재설정
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
            </div>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
        <Popup_nomal />
      </div>
    </React.Fragment>
  );
}
