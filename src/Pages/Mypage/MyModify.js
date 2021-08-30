import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";

import { contGap } from "Jquery/Jquery";

export default function MyModify() {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    contGap();
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="내 정보 수정" />

          <div id="content" className="mypage modify">
            <div className="form-wrap">
              <div className="form-title">
                <h2 className="h2">기본 정보 수정</h2>
              </div>
              <form className="form">
                <fieldset className="fieldset">
                  <legend className="blind">기본 정보 수정</legend>
                  <div className="field">
                    <label className="label" htmlFor="userId">
                      이메일 주소
                    </label>
                    <div className="insert">
                      <input type="text" className="input-text medium" id="userId" defaultValue="jihye0312@naver.com" disabled />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="userName">
                      이름 (닉네임)
                    </label>
                    <div className="insert">
                      <input type="text" className="input-text medium" id="userName" defaultValue="서지혜" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="userBd">
                      생년월일
                    </label>
                    <div className="insert">
                      <input type="text" className="input-text medium" id="userBd" defaultValue="1996-08-24" readOnly />
                    </div>
                  </div>
                </fieldset>
                <div className="btn-area">
                  <button type="button" className="btn dark large full">
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
                  <div className="field">
                    <label className="label" htmlFor="userPw">
                      기존 비밀번호
                    </label>
                    <div className="insert">
                      <input type="password" className="input-text medium" id="userPw" placeholder="기존 비밀번호를 입력해 주세요." />
                      {/* <p className="guide-txt">8자리 이상 영문,숫자,특수문자 중 2가지 이상 사용해 주세요</p> */}
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="userNewPw">
                      신규 비밀번호
                    </label>
                    <div className="insert">
                      <input type="password" className="input-text medium" id="userNewPw" placeholder="신규 비밀번호를 입력해 주세요." />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="userNewPwChk">
                      신규 비밀번호 확인
                    </label>
                    <div className="insert">
                      <input type="password" className="input-text medium" id="userNewPwChk" placeholder="신규 비밀번호를 한번 더 입력해 주세요." />
                    </div>
                  </div>
                </fieldset>
                <div className="btn-area">
                  <button type="button" className="btn dark large full">
                    비밀번호 변경하기
                  </button>
                </div>
              </form>
            </div>

            <div className="form-wrap">
              <div className="form-title flex-both">
                <h2 className="h2">휴대전화 번호 수정</h2>
                <span className="user-info">010-7203-5598</span>
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
                        <button type="button" className="btn dark-g small">
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
                  <button type="button" className="btn dark large full">
                    휴대전화 번호 수정하기
                  </button>
                </div>
              </form>
            </div>

            <div className="withdrawal-btn">
              <Link to="#" className="btn">
                회원 탈퇴하기
              </Link>
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
