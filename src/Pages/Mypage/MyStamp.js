/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useState, useContext } from "react";
import GoContents from "Components/GoContents";
import { authContext } from "ContextApi/Context";
import { Link, useHistory } from "react-router-dom";
import { SERVER_DALKOMM } from "Config/Server";
import Popup_nomal from "Components/Popup/Popup_nomal";
import { contGap } from "Jquery/Jquery";
import { fadeOut } from "Config/GlobalJs";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

export default function MyStamp() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
  const history = useHistory();
  const body = {};
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };
  const fn_api = () => {
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/main/user`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/membership`, body, header_config),
      ])
      .then(
        axios.spread((res1, res2) => {
          let res1_data = res1.data.data;
          let membershipData = res2.data.data;
          setData((origin) => {
            return {
              ...origin,
              res1_data,
              membershipData,
            };
          });
        })
      );
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fn_api();
  }, []);
  useEffect(() => {
    contGap();
    fadeOut();
    SwiperCore.use([Pagination]);
  }, [axioData]);

  const handlePage = (link) => {
    history.push(link);
  };

  const handleGetCoupon = () => {
    axios
      .all([axios.post(`${SERVER_DALKOMM}/app/api/v2/stamp/complete`, { stamp_card_id: axioData?.membershipData?.stamp_card_number }, header_config)])
      .then(
        axios.spread((res1) => {
          let call_back = true;
          fn_api();
          $("#resAlert").text(res1.data.meta.msg);
          $(".overlay.popupExitJoin").addClass("active");
          $("body").addClass("modal-opened");
        })
      );
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header undefined">
              <h1 className="page-title">적립 스탬프</h1>
              <button type="button" className="btn back" onClick={() => handlePage("/mypage")}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
              <div className="btn-area flex-center">
                <a className="btn" onClick={() => handlePage("/mypage/stampRecipt")}>
                  <i className="ico recipt">
                    <span>스탬프 적립내역</span>
                  </i>
                </a>
              </div>
            </header>

            <div id="content" className="mypage stamp fade-in">
              <div className="user-stamp-wrap">
                <div className="flex-both">
                  <div className="title-wrap flex-center">
                    <i className="ico stamp-s"></i>
                    <h3 className="h3">적립 스탬프</h3>
                  </div>
                  <div className="count-wrap">
                    <strong className="count">{axioData?.res1_data?.user?.stamp_card?.point}</strong> / 12
                  </div>
                </div>

                <ol className="data-list flex-list">
                  {[...Array(12)]?.map((e, i) => {
                    return (
                      <li key={i}>
                        {/* [D]: 스탬프 활성화: save 클래스 추가 */}
                        <div className={`item stamp ${i < axioData?.res1_data?.user?.stamp_card?.point ? "save" : "finish"}`}>
                          <span className="num en">{i + 1}</span>
                          {i >= 11 && <p className="speech-bubble small en">FREE!</p>}
                        </div>
                      </li>
                    );
                  })}
                </ol>

                {/* 적립카드 무료 음료 쿠폰 발급 */}
                {axioData?.res1_data?.user?.stamp_card?.complete_count > 0 && (
                  <div className="free-coupon-wrap">
                    <Swiper id="freeCouponSlider" className="swiper-container" slidesPerView={1} pagination={{ clickable: true }}>
                      <ul className="swiper-wrapper">
                        {[...Array(axioData?.res1_data?.user?.stamp_card?.complete_count)]?.map((e, i) => (
                          <SwiperSlide className="swiper-slide" key={i}>
                            <div className="item free-coupon">
                              <div className="coupon-body">
                                <div className="title-wrap">
                                  <h3 className="title">적립카드 무료 음료 쿠폰 발급</h3>
                                </div>
                                <div className="data-wrap">
                                  <div className="title">
                                    <span className="en fc-orange">FREE COUPON</span>
                                    무료 음료 쿠폰
                                  </div>
                                  <p className="expiry">유효기간 : 발급일로부터 30일</p>
                                </div>
                              </div>
                              <div className="btn-area">
                                <button type="button" className="btn x-large full dark" onClick={(e) => handleGetCoupon(e.currentTarget)}>
                                  <i className="ico download">
                                    <span>쿠폰 다운받기</span>
                                  </i>
                                  <strong>쿠폰 다운받기</strong>
                                </button>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </ul>
                      <div className="swiper-pagination"></div>
                    </Swiper>
                  </div>
                )}
              </div>
              {/* // 적립카드 무료 음료 쿠폰 발급 */}

              <div className="w-inner">
                <div className="btn-area">
                  <Link className="btn light medium full" to="/mypage/membershipPolicy">
                    멤버십 등급 소개
                  </Link>
                </div>

                <div className="item attention">
                  <dl>
                    <dt className="title">
                      <i className="ico alert"></i>멤버십 적립 유의사항
                    </dt>
                    <dd className="text">
                      <ul className="attention-list">
                        <li>
                          적립카드 스탬프는 제조 음료에 한하여 1잔당 스탬프 1회를 찍어 드립니다.
                          <br />
                          SET, MD, 베이커리, 키프티콘, 카카오 선물하기, 할인 또는 쿠폰 사용시 적립 제외
                        </li>
                        <li>총 12회 적립 시 테이블오더 전용 무료 음료가 제공됩니다.</li>
                        <li>스탬프의 유효기간은 발급일로 부터 1년입니다.</li>
                        <li>스탬프 적립에는 다소 시간이 걸릴 수 있습니다.</li>
                        <li>무료 음료 쿠폰의 유효기간은 발급일로부터 30일입니다.</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            {/* // #content */}
            <Popup_nomal fn_close={() => fn_api()} />
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header undefined">
              <h1 className="page-title">적립 스탬프</h1>
              <button type="button" className="btn back" onClick={() => handlePage("/mypage")}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
              <div className="btn-area flex-center">
                <a className="btn" onClick={() => handlePage("/mypage/stampRecipt")}>
                  <i className="ico recipt">
                    <span>스탬프 적립내역</span>
                  </i>
                </a>
              </div>
            </header>
          </div>
        </div>
      </React.Fragment>
    );
}
