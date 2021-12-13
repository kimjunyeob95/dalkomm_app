/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";
import Popup_nomal from "Components/Popup/Popup_nomal";

import { tabLink, contGap } from "Jquery/Jquery";
import { checkMobile, fadeOut } from "Config/GlobalJs";

export default function MyCouponSend() {
  const [state] = useContext(authContext);
  const [axioData, setData] = useState();

  const body = {};
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };

  const fn_submit = () => {
    let postBody = { user_coupon_id: Number($("#selectCoupon").val()) };
    let validation = true;
    if ($(".giftid").hasClass("current")) {
      //아이디로 보내기
      if ($("#giftName2").val() === "" || $("#giftName2").val() === undefined) {
        $("#resAlert").text("아이디를 입력해 주세요");
        $(".overlay.popupExitJoin").addClass("active");
        $("body").addClass("modal-opened");
        validation = false;
        return false;
      }
      postBody = { ...postBody, user_id: $("#giftName2").val() };
    } else {
      //휴대폰으로 보내기
      if ($("#giftPhone").val() === "" || $("#giftPhone").val() === undefined) {
        $("#resAlert").text("휴대폰 번호를 입력해 주세요");
        $(".overlay.popupExitJoin").addClass("active");
        $("body").addClass("modal-opened");
        validation = false;
        return false;
      }
      postBody = { ...postBody, mobile: $("#giftPhone").val() };
    }

    if (validation) {
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/coupon/present`, postBody, header_config)]).then(
        axios.spread((res1) => {
          alert(res1.data.meta.msg);
          if (res1.data.meta.code === 20000) {
            window.location.reload();
          }
        })
      );
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/coupon/list`, body, header_config)]).then(
      axios.spread((res1) => {
        let res1_data = res1.data.data;

        setData((origin) => {
          return {
            ...origin,
            res1_data,
          };
        });
      })
    );
  }, []);

  useEffect(() => {
    contGap();
    fadeOut();
  }, [axioData]);

  const handleGetPhone = () => {
    let data = {
      callbackFunc: "nativeCallbackPhone",
    };
    data = JSON.stringify(data);
    try {
      if (checkMobile() === "android") {
        window.android.fn_callBack(data);
      } else if (checkMobile() === "ios") {
        window.webkit.messageHandlers.fn_callBack.postMessage(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="쿠폰 선물하기" location="/mypage/couponRecipt" type="flexCenter" icon="recipt" />

            <div id="content" className="mypage gift fade-in">
              <div className="form-wrap">
                <form className="form">
                  <fieldset className="fieldset">
                    <div className="w-inner">
                      <div className="field">
                        <span className="label">선물 쿠폰 선택</span>
                        <div className="insert">
                          <select name="" id="selectCoupon" className="select medium">
                            {axioData?.res1_data?.coupon_list?.filter((e, i) => e.status === 0)?.length > 0 ? (
                              axioData?.res1_data?.coupon_list
                                ?.filter((e, i) => e.status === 0)
                                .map((e, i) => (
                                  <option key={i} value={e?.user_coupon_id}>
                                    {e?.coupon_name}
                                  </option>
                                ))
                            ) : (
                              <option value="">선물 가능한 쿠폰이 없습니다.</option>
                            )}
                          </select>
                        </div>
                      </div>

                      <div className="field">
                        <div className="flex-both">
                          <span className="label">받는 사람</span>
                          <a className="btn light-g address-book" onClick={() => handleGetPhone()}>
                            연락처에서 가져오기
                          </a>
                        </div>

                        <ul className="tabs">
                          <li className="giftid">
                            <a data-href="#tabGiftId" onClick={(e) => tabLink(e)}>
                              아이디로 보내기
                            </a>
                          </li>
                          <li className="giftphone current">
                            <a data-href="#tabGiftPhone" onClick={(e) => tabLink(e)}>
                              휴대폰 번호로 보내기
                            </a>
                          </li>
                        </ul>
                        <div id="tabGiftId" className="tab-content ">
                          <label htmlFor="giftName2" className="blind">
                            아이디
                          </label>
                          <div className="insert">
                            <input type="text" className="input-text medium" id="giftName2" placeholder="아이디를 입력해 주세요." />
                          </div>
                        </div>
                        <div id="tabGiftPhone" className="tab-content active">
                          <label htmlFor="giftPhone" className="blind">
                            휴대전화 번호
                          </label>
                          <div className="insert">
                            <input type="number" className="input-text medium" id="giftPhone" placeholder="휴대전화 번호를 입력해 주세요" />
                          </div>
                        </div>
                      </div>

                      <div className="item attention">
                        <div className="text">
                          <ul className="attention-list">
                            <li>쿠폰 선물 후에는 취소가 불가능 합니다.</li>
                            {/* <li>선물할 쿠폰과 아이디를 꼭 확인해 주세요.</li> */}
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
                      <button type="button" className="btn full x-large dark" onClick={() => fn_submit()}>
                        <strong>선물하기</strong>
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
          <Popup_nomal />
        </div>
        {/* // #wrap */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
