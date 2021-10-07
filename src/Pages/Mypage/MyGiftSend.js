/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
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

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

import { tabLink, fadeInOut, contGap } from "Jquery/Jquery";
import { checkMobile } from "Config/GlobalJs";

export default function MyGiftSend() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
  const fn_submit = () => {
    alert("선물하였습니다.");
  };

  const body = {};
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/v2/membership`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/chargecard/card_images`, body, header_config),
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
        })
      );
  }, [state?.auth]);
  useEffect(() => {
    contGap();
    SwiperCore.use([Pagination]);
  }, [axioData]);

  const handleSubmit = (e) => {
    let validation = true;
    let textVal = $(".swiper-slide-active textarea").val();
    if (textVal === "") {
      alert("선물 메세지를 입력해 주세요.");
      validation = false;
      return false;
    }
    $(".input-text").each(function (index, element) {
      if ($(element).val() === "") {
        validation = false;
        alert($(element).attr("title") + "(을)를 입력해 주세요.");
        $(element).focus();
        return false;
      }
    });
    if (validation) {
      let body = {
        amount: Number($('input[name="giftMoney"]:checked').attr("value")),
        card_image_id: Number($(".swiper-slide-active").attr("imageid")),
        card_name: $("#giftCard").val(),
        recv_user_name: $("#giftName").val(),
        recv_user_mobile: $("#giftPhone").val(),
        pay_method: $('input[name="payMethod"]:checked').attr("value"),
        msg: $(".swiper-slide-active textarea").val(),
      };
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/present/auth`, body, header_config)]).then(
        axios.spread((res1) => {
          let present_token = res1.data.data.present_token;
          let linkData = { data: `${SERVER_DALKOMM}/app/web/present?present_token=${present_token}` };
          linkData = JSON.stringify(linkData);
          try {
            if (checkMobile() === "android") {
              window.android.fn_callUrl(linkData);
            } else if (checkMobile() === "ios") {
              window.webkit.messageHandlers.fn_callUrl.postMessage(linkData);
            }
          } catch (error) {
            console.log(error);
          }
        })
      );
    }
  };

  if (axioData) {
    fadeInOut();
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="기프트카드 선물하기" location="/mypage/giftSendRecipt" type="flexCenter" icon="recipt" />

            <div id="content" className="pay gift">
              <section className="section">
                <form className="form">
                  <fieldset className="fieldset">
                    <div className="w-inner">
                      <Swiper
                        id="cardSlider"
                        className="swiper-container"
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        observer={true}
                        observeParents={true}
                      >
                        <ul className="swiper-wrapper">
                          {axioData?.res2_data?.card_image_list?.map((e, i) => (
                            <SwiperSlide className="swiper-slide" key={i} data-imgurl={e?.image_url} imageid={e.image_id}>
                              <p className="card-title">{axioData?.res1_data?.user_name}님의 선물카드</p>
                              <div className="item card gift">
                                <div className="card-wrap" style={{ backgroundImage: `url(${e?.image_url})` }}>
                                  <p className="grade en">
                                    RECHARGEABLE
                                    <br />
                                    GIFT CARD
                                  </p>
                                  <p className="sort en">DAL.KOMM GIFT CARD</p>
                                </div>
                                <div className="textarea-wrap">
                                  <textarea className="textarea" placeholder="선물 메세지를 입력해 주세요. (최대 20자)" maxLength="20"></textarea>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </ul>
                        <div className="swiper-pagination"></div>
                      </Swiper>
                      <div className="field" style={{ marginTop: "35px" }}>
                        <div className="flex-both">
                          <span className="label">받으실 분</span>
                          <a className="btn light-g address-book">연락처에서 가져오기</a>
                        </div>
                        <label className="label" htmlFor="giftCard">
                          카드명
                        </label>
                        <div className="insert">
                          <input type="text" className="input-text medium" title="카드명" id="giftCard" placeholder="카드명을 입력해 주세요." />
                        </div>
                        <label className="label" htmlFor="giftName">
                          성함
                        </label>
                        <div className="insert">
                          <input
                            type="text"
                            className="input-text medium"
                            title="성함"
                            id="giftName"
                            placeholder="받으실 분의 성함을 입력해 주세요."
                          />
                        </div>

                        <label className="label" htmlFor="giftPhone">
                          휴대전화 번호
                        </label>
                        <div className="insert">
                          <input
                            type="tel"
                            className="input-text medium"
                            title="휴대전화 번호"
                            id="giftPhone"
                            placeholder="'-' 제외하고 입력해 주세요."
                          />
                        </div>
                        <div className="item attention">
                          <div className="text">
                            <ul className="attention-list">
                              <li>선물을 받으시는 고객님의 앱에 충전카드가 자동으로 추가됩니다.</li>
                              <li>선물 받은 충전카드 사용을 위해 앱 다운로드 및 회원가입이 필요합니다.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <span className="label">선물 금액</span>
                        <div className="select-group col-2">
                          <input type="radio" id="giftMoney01" name="giftMoney" defaultChecked={true} value={10000} />
                          <label htmlFor="giftMoney01" className="btn bdr medium">
                            10,000원
                          </label>
                          <input type="radio" id="giftMoney02" name="giftMoney" value={20000} />
                          <label htmlFor="giftMoney02" className="btn bdr medium">
                            20,000원
                          </label>
                          <input type="radio" id="giftMoney03" name="giftMoney" value={30000} />
                          <label htmlFor="giftMoney03" className="btn bdr medium">
                            30,000원
                          </label>
                          <input type="radio" id="giftMoney04" name="giftMoney" value={50000} />
                          <label htmlFor="giftMoney04" className="btn bdr medium">
                            50,000원
                          </label>
                          <input type="radio" id="giftMoney05" name="giftMoney" value={70000} />
                          <label htmlFor="giftMoney05" className="btn bdr medium">
                            70,000원
                          </label>
                          <input type="radio" id="giftMoney06" name="giftMoney" value={100000} />
                          <label htmlFor="giftMoney06" className="btn bdr medium">
                            100,000원
                          </label>
                        </div>
                      </div>
                      <div className="field">
                        <span className="label">결제 수단</span>
                        <div className="select-group col-3">
                          <input type="radio" id="payMethod01" name="payMethod" defaultChecked={true} value="신용카드" />
                          <label htmlFor="payMethod01" className="btn bdr medium">
                            <strong>신용카드</strong>
                          </label>
                          <input type="radio" id="payMethod02" name="payMethod" value="휴대폰" />
                          <label htmlFor="payMethod02" className="btn bdr medium">
                            <strong>휴대폰</strong>
                          </label>
                          <input type="radio" id="payMethod03" name="payMethod" value="페이코인" />
                          <label htmlFor="payMethod03" className="btn bdr medium">
                            <strong>페이코인</strong>
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </section>
            </div>
            {/* // #content */}
            <a className="btn dark x-large full" onClick={(e) => handleSubmit(e.currentTarget)}>
              <strong>선물하기</strong>
            </a>
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
