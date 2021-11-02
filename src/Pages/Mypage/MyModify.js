/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { getYear, getMonth } from "date-fns"; // getYear, getMonth
import { Link } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker"; // 한국어적용
import ko from "date-fns/locale/ko"; // 한국어적용
import "react-datepicker/dist/react-datepicker.css";
import Popup_removeUser from "Components/Popup/Popup_removeUser";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { fadeOut } from "Config/GlobalJs";

import { contGap, fadeInOut, fn_pw_check, name_check, popupOpen } from "Jquery/Jquery";
import { SERVER_DALKOMM } from "Config/Server";

import { authContext } from "ContextApi/Context";
registerLocale("ko", ko); // 한국어적용
const range = require("lodash");

export default function MyModify() {
  const [startDate, setStartDate] = useState(new Date());
  const years = range.range(1940, getYear(new Date()) + 1, 1); // 수정
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    contGap();

    const body = {};
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/main/user`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/my_account/profile`, body, header_config),
      ])
      .then(
        axios.spread((res1, res2) => {
          let res1_data = res1.data.data;
          let res2_data = res2.data.data;
          setData((origin) => {
            return {
              ...origin,
              res1_data,
              res2_data,
            };
          });

          if (res2.data.data.is_email_user) {
            axios.all([axios.post(`${SERVER_DALKOMM}/app/api/account/simple/profile`, body, header_config)]).then(
              axios.spread((ress1) => {
                res2_data = ress1.data.data;
                setData((origin) => {
                  return {
                    ...origin,
                    res1_data,
                    res2_data,
                  };
                });
                setStartDate(new Date(res2_data?.birthday?.replace(/(.{4})/, "$1-").replace(/(.{7})/, "$1-")));
              })
            );
          } else {
            setStartDate(new Date(res2_data?.birthday?.replace(/(.{4})/, "$1-").replace(/(.{7})/, "$1-")));
          }
        })
      );
  }, []);

  useEffect(() => {
    fadeOut();
  }, [axioData]);

  const handleNomalModify = (type) => {
    let validation = true;
    let body = {};
    if (type === "정보") {
      $(".chk-validation").each(function (i, e) {
        if ($(e).val() === "") {
          if ($(e).attr("type") !== "password") {
            validation = false;
            alert($(e).attr("title") + "(을)를 입력해주세요.");
            $(e).focus();
            return false;
          }
        }
      });
      if (validation && name_check($("#userName").val())) {
        body = {
          name: $("#userName").val(),
          birthday: $("#datepicker").val().split("-").join(""),
        };
        axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/my_account/update_profile`, body, header_config)]).then(
          axios.spread((res1) => {
            alert(res1.data.meta.msg);
            window.location.reload();
          })
        );
      }
    } else if (type === "비밀번호") {
      $(".chk-validation").each(function (i, e) {
        if ($(e).val() === "") {
          validation = false;
          alert($(e).attr("title") + "(을)를 입력해주세요.");
          $(e).focus();
          return false;
        }
      });
      if (validation && name_check($("#userName").val()) && fn_pw_check($("#userNewPw").val(), $("#userNewPwChk").val())) {
        body = {
          name: $("#userName").val(),
          country_code: "82",
          mobile: axioData.res2_data?.mobile,
          birthday: $("#datepicker").val().split("-").join(""),
          password: $("#userNewPw").val(),
        };
        axios.all([axios.post(`${SERVER_DALKOMM}/app/api/account/simple/update/profile`, body, header_config)]).then(
          axios.spread((res1) => {
            alert(res1.data.meta.msg);
            window.location.reload();
          })
        );
      }
    } else if (type === "휴대전화") {
      $(".chk-validation").each(function (i, e) {
        if ($(e).val() === "") {
          if ($(e).attr("type") !== "password") {
            validation = false;
            alert($(e).attr("title") + "(을)를 입력해주세요.");
            $(e).focus();
            return false;
          }
        }
      });
      if (validation && name_check($("#userName").val())) {
        let phoneValue = $("#userPhone").val();

        if (phoneValue === "") {
          return alert("인증받을 번호를 입력해주세요.");
        } else {
          body = {
            request_type: "update_profile",
            country_code: "82",
            mobile: phoneValue,
            cert_code: $("#numChk").val(),
          };
        }
        if ($("#numChk").val() !== "") {
          axios.all([axios.post(`${SERVER_DALKOMM}/app/api/account/simple/cert/confirm`, body, header_config)]).then(
            axios.spread((res1) => {
              if (res1.data.meta.code === 20000) {
                body = {
                  name: $("#userName").val(),
                  country_code: "82",
                  mobile: axioData.res2_data?.mobile,
                  birthday: $("#datepicker").val().split("-").join(""),
                  update_profile_token: res1.data.data.update_profile_token,
                };
                axios.all([axios.post(`${SERVER_DALKOMM}/app/api/account/simple/update/profile`, body, header_config)]).then(
                  axios.spread((res1) => {
                    alert(res1.data.meta.msg);
                    window.location.reload();
                  })
                );
              } else {
                return alert(res1.data.meta.msg);
              }
            })
          );
        } else {
          return alert("인증번호를 제대로 입력해주세요.");
        }
      }
    }
  };

  const handleCheck = (e) => {
    let phoneValue = $("#userPhone").val();
    if (phoneValue === "") {
      return alert("인증받을 번호를 입력해주세요.");
    } else {
      let body = {
        request_type: "update_profile",
        country_code: "82",
        mobile: phoneValue,
      };

      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/account/simple/cert/create_number`, body, header_config)]).then(
        axios.spread((res1) => {
          if (res1.data.meta.code === 20000 && res1.data.meta.message === "SUCCESS") {
            alert("인증번호를 전송했습니다.");
          } else {
            alert("잘못된 번호입니다.");
          }
        })
      );
    }
  };

  $("#userName").change(function () {});
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="내 정보 수정" />

            <div id="content" className="mypage modify fade-in">
              <div className="form-wrap">
                <div className="form-title">
                  <h2 className="h2">기본 정보 수정</h2>
                </div>
                <form className="form" id="form1">
                  <fieldset className="fieldset">
                    <legend className="blind">기본 정보 수정</legend>
                    <div className="field">
                      <label className="label" htmlFor="userId">
                        이메일 주소
                      </label>
                      <div className="insert">
                        <input
                          type="text"
                          className="input-text medium"
                          id="userId"
                          name="email"
                          defaultValue={axioData?.res2_data?.is_email_user ? axioData?.res2_data?.login_email : axioData?.res2_data?.email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="userName">
                        이름 (닉네임)
                      </label>
                      <div className="insert">
                        <input
                          type="text"
                          className="input-text medium chk-validation"
                          id="userName"
                          title="이름 (닉네임)"
                          name="user_name"
                          defaultValue={
                            axioData?.res2_data?.is_email_user && axioData?.res2_data?.name
                              ? decodeURI(axioData?.res2_data?.name)
                              : axioData?.res2_data?.user?.user_name
                          }
                          onChange={() => console.log("zz")}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="userBd">
                        생년월일
                      </label>
                      <div className="insert">
                        <DatePicker
                          renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                          }) => (
                            <div>
                              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} type="button">
                                {"<"}
                              </button>
                              <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(value)}>
                                {years.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              년<span className="date_month">{months[getMonth(date)]}</span>
                              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} type="button">
                                {">"}
                              </button>
                            </div>
                          )}
                          locale="ko" // 달력 한글화
                          selected={startDate}
                          className="input-text medium input-date"
                          id="datepicker"
                          name="birthday"
                          onChange={(date) => setStartDate(date)}
                          //주말 선택제외
                          // filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
                          // calendarClassName="" // 캘린더 클래스부여
                          // portalId="" //캘린더 최상단 ID부여

                          maxDate={new Date()}
                          dateFormatCalendar="yyyy년 MM월"
                          popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록
                          dateFormat="yyyy-MM-dd"
                        />
                      </div>
                    </div>
                  </fieldset>
                  <div className="btn-area">
                    <button type="button" className="btn dark large full" onClick={() => handleNomalModify("정보")}>
                      정보 수정하기
                    </button>
                  </div>
                </form>
              </div>

              <div className="form-wrap">
                <div className="form-title">
                  <h2 className="h2">비밀번호 수정</h2>
                </div>
                <form className="form">
                  <fieldset className="fieldset">
                    <legend className="blind">비밀번호 수정</legend>
                    {/* <div className="field">
                      <label className="label" htmlFor="userPw">
                        기존 비밀번호
                      </label>
                      <div className="insert">
                        <input
                          type="password"
                          className="input-text medium chk-validation"
                          titie="기존 비밀번호"
                          id="userPw"
                          placeholder="기존 비밀번호를 입력해 주세요."
                        />
                        <p className="guide-txt">8자리 이상 영문,숫자,특수문자 중 2가지 이상 사용해 주세요</p>
                      </div>
                    </div> */}
                    <div className="field">
                      <label className="label" htmlFor="userNewPw">
                        신규 비밀번호
                      </label>
                      <div className="insert">
                        <input
                          type="password"
                          className="input-text medium chk-validation"
                          titie="신규 비밀번호"
                          id="userNewPw"
                          placeholder="신규 비밀번호를 입력해 주세요."
                        />
                        <p className="guide-txt">8자리 이상 영문,숫자,특수문자 중 2가지 이상 사용해 주세요</p>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="userNewPwChk">
                        신규 비밀번호 확인
                      </label>
                      <div className="insert">
                        <input
                          type="password"
                          className="input-text medium chk-validation"
                          titie="신규 비밀번호 확인"
                          id="userNewPwChk"
                          placeholder="신규 비밀번호를 한번 더 입력해 주세요."
                        />
                      </div>
                    </div>
                  </fieldset>
                  <div className="btn-area">
                    <button type="button" className="btn dark large full" onClick={() => handleNomalModify("비밀번호")}>
                      비밀번호 변경하기
                    </button>
                  </div>
                </form>
              </div>

              <div className="form-wrap">
                <div className="form-title flex-both">
                  <h2 className="h2">휴대전화 번호 수정</h2>
                  <span className="user-info">{axioData.res2_data?.mobile?.replace(/(.{3})/, "$1-").replace(/(.{8})/, "$1-")}</span>
                </div>
                <form className="form">
                  <fieldset className="fieldset">
                    <legend className="blind">휴대전화 번호 수정</legend>
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
                            placeholder="변경할 번호를 입력해 주세요."
                            inputMode="numeric"
                          />
                          <button type="button" className="btn dark-g small" onClick={(e) => handleCheck(e.currentTarget)}>
                            인증하기
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="field space">
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
                    <button type="button" className="btn dark large full" onClick={() => handleNomalModify("휴대전화")}>
                      휴대전화 번호 수정하기
                    </button>
                  </div>
                </form>
              </div>

              <div className="withdrawal-btn">
                <a className="open-pop" data-href="#popupExitJoin" onClick={(e) => popupOpen(e.target)}>
                  회원 탈퇴하기
                </a>
              </div>
            </div>
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        <Popup_removeUser />
        {/* // #wrap */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
