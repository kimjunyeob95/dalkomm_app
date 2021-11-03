/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useState, useEffect, useContext } from "react";
import { getYear, getMonth } from "date-fns"; // getYear, getMonth
import { Link, useHistory, useLocation } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker"; // 한국어적용
import ko from "date-fns/locale/ko"; // 한국어적용
import "react-datepicker/dist/react-datepicker.css";
import { fn_pw_check, email_check, name_check, popupOpen } from "Jquery/Jquery";
import Popup_bak from "../../Components/Popup/Popup_bak";
import Popup_nomal from "Components/Popup/Popup_nomal";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";

registerLocale("ko", ko); // 한국어적용
const range = require("lodash");

export default function JoinStep2() {
  const [state, dispatch] = useContext(authContext);
  const [startDate, setStartDate] = useState();
  const years = range.range(1940, getYear(new Date()) + 1, 1); // 수정
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const history = useHistory();
  const location = useLocation();
  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };
  useEffect(() => {
    // if (location?.join_token === "" || !location?.join_token) {
    //   alert("잘못된 접근입니다.");
    //   history.push("/");
    // }
  }, []);

  const handleSubmit = (e) => {
    let validation = true;
    $(".chk-validation").each(function (i, e) {
      if ($(e).val() === "") {
        validation = false;
        $("#resAlert").text("필수 정보는 모두 입력해 주세요.");
        $(".overlay.popupExitJoin").addClass("active");
        $("body").addClass("modal-opened");
        return false;
      }
    });

    if (validation) {
      if (fn_pw_check($("#userPw").val(), $("#userPwChk").val()) && email_check($("#useEmail").val()) && name_check($("#userName").val())) {
        let body = {
          join_token: location?.join_token,
          login_email: $("#useEmail").val(),
          password: $("#userPw").val(),
          name: $("#userName").val(),
          birthday: $("#datepicker").val().split("-").join(""),
        };

        axios.all([axios.post(`${SERVER_DALKOMM}/app/api/account/simple/join`, body, header_config)]).then(
          axios.spread((res1) => {
            if (res1.data.meta.code === 20000 && res1.data.meta.message === "SUCCESS") {
              history.push({
                pathname: "/join/step3",
                userName: $("#userName").val(),
                loginId: $("#useEmail").val(),
                loginPw: $("#userPw").val(),
              });
            } else {
              $("#resAlert").text(res1.data.meta.msg);
              $(".overlay.popupExitJoin").addClass("active");
              $("body").addClass("modal-opened");
              return false;
            }
          })
        );
      }
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
                    <li>
                      <span className="blind">가입확인</span>
                    </li>
                    <li className="current">
                      <span className="blind">정보입력</span>
                    </li>
                    <li>
                      <span className="blind">가입완료</span>
                    </li>
                  </ul>

                  <div className="title-wrap">
                    <h2 className="section-title small">정보 입력</h2>
                    <p className="text">고객님의 정보를 입력해 주세요.</p>
                  </div>

                  <fieldset className="fieldset">
                    <legend className="blind">회원 정보 입력</legend>
                    <div className="field-wrap">
                      <div className="field">
                        <label className="label" htmlFor="userName">
                          기본정보<span>(필수)</span>
                        </label>
                        <div className="insert">
                          <input
                            type="text"
                            className="input-text medium chk-validation"
                            id="userName"
                            maxLength={8}
                            placeholder="이름(닉네임)을 입력해 주세요."
                          />
                        </div>
                        <p className="guide-txt">2자 이상 8자 이하, 한글 또는 영문만 입력 가능합니다.</p>
                      </div>
                      <div className="field">
                        <label className="blind" htmlFor="useEmail">
                          이메일 주소
                        </label>
                        <div className="insert">
                          <input type="email" className="input-text medium chk-validation" id="useEmail" placeholder="이메일 주소를 입력해 주세요." />
                        </div>
                        <p className="guide-txt">올바른 형식의 이메일 주소를 입력해 주세요</p>
                      </div>
                      <div className="field">
                        <label className="blind" htmlFor="userPw">
                          비밀번호
                        </label>
                        <div className="insert">
                          <input type="password" className="input-text medium chk-validation" id="userPw" placeholder="비밀번호를 입력해 주세요." />
                        </div>
                        <p className="guide-txt">8자리 이상 영문, 숫자, 특수문자 중 2가지 이상 사용해 주세요.</p>
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
                            placeholder="비밀번호를 한번 더 입력해 주세요."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="field-wrap">
                      <div className="field">
                        <label className="label" htmlFor="datepicker">
                          생년월일<span>(필수)</span>
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
                            className="input-text medium input-date chk-validation"
                            id="datepicker"
                            name="datepicker"
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
                    </div>
                  </fieldset>
                  <div className="btn-area">
                    <button type="button" className="btn dark full large" onClick={(e) => handleSubmit(e.currentTarget)}>
                      회원 가입하기
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
      {/* // #wrap */}
      <Popup_bak />
      <Popup_nomal />
    </React.Fragment>
  );
}
