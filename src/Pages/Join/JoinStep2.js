/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { getYear, getMonth } from "date-fns"; // getYear, getMonth
import { Link, useHistory } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker"; // 한국어적용
import ko from "date-fns/locale/ko"; // 한국어적용
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ko", ko); // 한국어적용
const range = require("lodash");

export default function JoinStep2() {
  const [startDate, setStartDate] = useState(new Date());
  const years = range.range(1940, getYear(new Date()) + 1, 1); // 수정
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const history = useHistory();

  return (
    <React.Fragment>
      <div className="skip-nav">
        <Link to="#content">본문 바로가기</Link>
      </div>

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <header id="header" className="header">
            <h1 className="page-title">회원가입</h1>
            <button
              type="button"
              className="btn back"
              onClick={() => history.goBack()}
            >
              <i className="ico back">
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
                            className="input-text medium"
                            id="userName"
                            placeholder="이름(닉네임)을 입력해 주세요."
                          />
                        </div>
                        <p className="guide-txt">
                          2자 이상, 한글 또는 영문만 입력 가능합니다.
                        </p>
                      </div>
                      <div className="field">
                        <label className="blind" htmlFor="useEmail">
                          이메일 주소
                        </label>
                        <div className="insert">
                          <input
                            type="email"
                            className="input-text medium"
                            id="useEmail"
                            placeholder="이메일 주소를 입력해 주세요."
                          />
                        </div>
                        <p className="guide-txt">
                          올바른 형식의 이메일 주소를 입력해 주세요
                        </p>
                      </div>
                      <div className="field">
                        <label className="blind" htmlFor="userPw">
                          비밀번호
                        </label>
                        <div className="insert">
                          <input
                            type="password"
                            className="input-text medium"
                            id="userPw"
                            placeholder="비밀번호를 입력해 주세요."
                          />
                        </div>
                        <p className="guide-txt">
                          8자리 이상 영문, 숫자, 특수문자 중 2가지 이상 사용해
                          주세요.
                        </p>
                      </div>
                      <div className="field">
                        <label className="blind" htmlFor="userPwChk">
                          비밀번호 재입력
                        </label>
                        <div className="insert">
                          <input
                            type="password"
                            className="input-text medium"
                            id="userPwChk"
                            placeholder="비밀번호를 한번 더 입력해 주세요."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="field-wrap">
                      <div className="field">
                        <label className="label" htmlFor="datepicker">
                          생년월일<span>(선택)</span>
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
                                <button
                                  onClick={decreaseMonth}
                                  disabled={prevMonthButtonDisabled}
                                  type="button"
                                >
                                  {"<"}
                                </button>
                                <select
                                  value={getYear(date)}
                                  onChange={({ target: { value } }) =>
                                    changeYear(value)
                                  }
                                >
                                  {years.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                년
                                <span className="date_month">
                                  {months[getMonth(date)]}
                                </span>
                                <button
                                  onClick={increaseMonth}
                                  disabled={nextMonthButtonDisabled}
                                  type="button"
                                >
                                  {">"}
                                </button>
                              </div>
                            )}
                            locale="ko" // 달력 한글화
                            selected={startDate}
                            className="input-text medium input-date"
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
                    <button className="btn dark full large">
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
    </React.Fragment>
  );
}