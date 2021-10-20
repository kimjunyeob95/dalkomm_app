/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap, popupOpen, tabLink, fadeInOut } from "Jquery/Jquery";
import Popup_removeCard from "Components/Popup/Popup_removeCard";
import { getParameter } from "Config/GlobalJs";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

export default function OrderMembership() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(true);
  const history = useHistory();
  console.log(history);

  const body = {};
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.auth]);
  useEffect(() => {
    contGap();
  }, [axioData]);

  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="KT 멤버십 제휴 할인" />

            <div id="content" className="membership discount">
              <div className="form-wrap">
                <form className="form">
                  <fieldset className="fieldset">
                    <div className="w-inner">
                      <div className="field">
                        <span className="label">KT 멥버십 인증</span>
                        <div className="insert">
                          <input
                            type="number"
                            className="input-text medium"
                            maxLength="6"
                            inputMode="numeric"
                            placeholder="생년월일 6자리를 입력해주세요."
                          />
                        </div>
                        <div className="insert">
                          <input type="text" className="input-text medium" maxLength="16" placeholder="멤버십 카드번호 16자리를 입력해주세요." />
                        </div>
                      </div>

                      <div className="item attention">
                        <div className="text">
                          <ul className="attention-list">
                            <li>제휴할인은 주 1회 매장 제조 음료에만 적용할 수 있습니다.</li>
                            <li>제휴할인 적용 시 500 KT멤버십 포입트가 차감되며, 주문이 취소될 경우 포인트 및 사용이력은 복구됩니다.</li>
                          </ul>
                        </div>
                      </div>

                      <div className="btn-area">
                        <button className="btn text dark small full">인증하기</button>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="fieldset">
                    <div className="w-inner">
                      <div className="field">
                        <button type="button" pop-target="#popupMembership" className="btn open-pop check-wrap">
                          <input type="checkbox" className="checkbox" name="membershipInfo" id="membershipSave" />
                          <label htmlFor="membershipSave">멤버십 정보 저장 동의</label>
                        </button>
                      </div>

                      <div className="item attention">
                        <div className="text">
                          <ul className="attention-list">
                            <li>멤버십 정보 저장을 위해 약관 동의가 필요합니다.</li>
                            <li>체크를 해제 할 경우 저장된 멤버십 정보는 삭제됩니다.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>

              {/* 선물하기 버튼 영역 */}
              <div className="fixed-con active">
                <div className="popup">
                  <div className="popup-wrap">
                    <div className="btn-area">
                      <button type="button" className="btn full x-large dark">
                        <strong>제휴 할인 적용하기</strong>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 선물하기 버튼 영역 */}
            </div>
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}

        {/* 멤버쉽 정보 저장 동의 팝업 */}
        <div id="popupMembership" className="overlay">
          <div className="popup">
            <div className="popup-wrap">
              <button type="button" className="btn btn-close">
                <i className="ico close">
                  <span>close</span>
                </i>
              </button>
              <div className="popup-header">
                <h2 className="title">멤버십 정보 저장 동의</h2>
              </div>
              <div className="popup-body">
                <div className="item board">
                  <p>
                    <strong>보다 편리한 멤버십 제휴할인 사용을 위해 멤버십 정보를 저장할 수 있습니다.</strong>
                  </p>
                  <p>
                    <strong>저장하는 정보: 회원의 멤버십 카드번호</strong>
                    <span>※ 최초 저장된 멤버십 카드번호는 암호화 되어 저장하므로 안전합니다.</span>
                    <span>※ 멤버십 번호를 저장해도 포인트 사용을 위해 생년월일 입력을 요청합니다.</span>
                  </p>
                  <p>
                    <strong>저장하는 기간: 사용자의 동의 철회까지</strong>
                    <span>※ 멤버십 정보 저장 체크를 해제하거나, 저장된 멤버십 번호를 수정 할 경우 저장된 멤버십 정보를 자동으로 삭제합니다.</span>
                  </p>
                </div>
                <div className="w-inner">
                  <div className="btn-area">
                    <button type="button" className="btn dark full large membership-agree">
                      동의합니다
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //멤버쉽 정보 저장 동의 팝업 */}
        {/* // 기프트 카드 확대 팝업 */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
