/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

import { tabLink, fadeInOut, contGap } from "Jquery/Jquery";

export default function MyCouponSend() {
  const [state, dispatch] = useContext(authContext);
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
    if ($(".giftid").hasClass("current")) {
      //아이디로 보내기
      if ($("#giftName").val() === "") {
        alert("아이디를 입력해 주세요");
        return false;
      }
      postBody = { ...postBody, user_id: $("#giftName").val() };
    } else {
      //휴대폰으로 보내기
      if ($("#giftPhone").val() === "") {
        alert("휴대폰 번호를 입력해 주세요");
        return false;
      }
      postBody = { ...postBody, mobile: $("#giftPhone").val() };
    }
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/coupon/present`, postBody, header_config)]).then(
      axios.spread((res1) => {
        alert(res1.data.meta.msg);
        if (res1.data.meta.code === 20000) {
          window.location.reload();
        }
      })
    );
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
  }, [axioData]);
  if (axioData) {
    fadeInOut();
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="쿠폰 선물하기" location="/mypage/couponRecipt" type="flexCenter" icon="recipt" />

            <div id="content" className="mypage gift">
              <div className="form-wrap">
                <form className="form">
                  <fieldset className="fieldset">
                    <div className="w-inner">
                      <div className="field">
                        <span className="label">선물 쿠폰 선택</span>
                        <div className="insert">
                          <select name="" id="selectCoupon" className="select medium">
                            {axioData?.res1_data?.coupon_list
                              ?.filter((e, i) => e.status === 0)
                              .map((e, i) => (
                                <option key={i} value={e?.user_coupon_id}>
                                  {e?.coupon_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="field">
                        <div className="flex-both">
                          <span className="label">받는 사람</span>
                          <Link to="#" className="btn light-g address-book">
                            연락처에서 가져오기
                          </Link>
                        </div>

                        <ul className="tabs">
                          <li className="current giftid">
                            <Link to="#" data-href="#tabGiftId" onClick={(e) => tabLink(e)}>
                              아이디로 보내기
                            </Link>
                          </li>
                          <li className="giftphone">
                            <Link to="#" data-href="#tabGiftPhone" onClick={(e) => tabLink(e)}>
                              휴대폰 번호로 보내기
                            </Link>
                          </li>
                        </ul>
                        <div id="tabGiftId" className="tab-content active">
                          <label htmlFor="giftName" className="blind">
                            아이디
                          </label>
                          <div className="insert">
                            <input type="text" className="input-text medium" id="giftName" placeholder="아이디를 입력해 주세요." />
                          </div>
                        </div>
                        <div id="tabGiftPhone" className="tab-content">
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
                            <li>선물할 쿠폰과 아이디를 꼭 확인해 주세요.</li>
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
        </div>
        {/* // #wrap */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
