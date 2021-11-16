/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { Swiper } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

import { authContext } from "ContextApi/Context";
import { fadeOut, checkMobile } from "Config/GlobalJs";
import { SERVER_DALKOMM } from "Config/Server";

export default function GiftCharge() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
  const history = useHistory();
  const { activeHtml } = useLocation();
  const { giftnum } = useParams();
  const body = {};
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };

  SwiperCore.use([Pagination]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/v2/membership`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/chargecard/list`, body, header_config),
      ])
      .then(
        axios.spread((res1, res2) => {
          let res1_data = res1.data.data;
          let res2_data = res2.data.data;
          res2_data.charge_card_list.map((element, index) => {
            if (element.card_number === String(giftnum)) {
              res2_data.charge_card_list.splice(index, 1);
              res2_data.charge_card_list.unshift(element);
            }
          });
          res2_data = res2_data.charge_card_list;
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
    fadeOut();
  }, [axioData]);
  const handleOnclick = (e) => {
    let body = {
      amount: Number($('input[name="chargeMoney"]:checked').attr("value")),
      card_number: String($(".swiper-slide-active").data("cardnum")),
      pay_method: $('input[name="payMethod"]:checked').attr("value"),
    };
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/chargecard/charge/auth`, body, header_config)]).then(
      axios.spread((res1) => {
        let charge_token = res1.data.data.charge_token;
        let result = {
          type: "get",
          link: `${SERVER_DALKOMM}/app/web/chargecard/charge?charge_token=${charge_token}`,
          title: "기프트카드 충전하기",
          redirectUrl: "/pay?activeHtml=true",
        };
        result = JSON.stringify(result);

        try {
          if (checkMobile() === "android") {
            window.android.fn_winOpen(result);
          } else if (checkMobile() === "ios") {
            window.webkit.messageHandlers.fn_winOpen.postMessage(result);
          }
        } catch (error) {
          console.log(error);
        }
        // window.open(
        //   `app://openPopupWebView?title=기프트카드 충전하기&link=${SERVER_DALKOMM}/app/web/chargecard/charge?charge_token=${charge_token}&type=charge&redirectUrl=/pay?activeHtml=true`
        // );
      })
    );
  };

  const handleSwiper = (swiper) => {
    let amount = $(".swiper-slide").eq(swiper.activeIndex).data("amount");
    let price = Number($('input[name="chargeMoney"]:checked').attr("value"));
    $(".price.fc-orange").text((amount + price).toLocaleString("ko-KR") + "원");
  };
  const handleCharge = (event, price) => {
    let amount = $(".swiper-slide-active").data("amount");
    $(".price.fc-orange").text((amount + price).toLocaleString("ko-KR") + "원");
  };
  const handlePage = () => {
    if (activeHtml) {
      history.push("/pay?activeHtml=true");
    } else {
      history.push("/pay");
    }
  };

  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header undefined">
              <h1 className="page-title">충전하기</h1>
              <button type="button" className="btn back" onClick={() => handlePage()}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
            </header>

            <div id="content" className="pay charge fade-in">
              <section className="section">
                <div className="w-inner">
                  <form className="form">
                    <fieldset className="fieldset">
                      <h2 className="section-title">기프트카드</h2>
                      <Swiper
                        id="cardSlider"
                        className="swiper-container"
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        onSlideChange={(swiper) => handleSwiper(swiper)}
                      >
                        <ul className="swiper-wrapper">
                          {axioData?.res2_data?.map((e, i) => (
                            <li className="swiper-slide" key={i} data-amount={e?.amount} data-cardnum={e?.card_number} data-pin={e?.pin_number}>
                              <p className="card-title">{axioData?.res1_data?.user_name}님의 기프트카드</p>
                              <div className="item card gift">
                                <div className="card-wrap">
                                  {/* <div className="card-wrap" style={{ backgroundImage: `url(${e?.card_image_url})` }}> */}
                                  <p className="grade en">
                                    RECHARGEABLE
                                    <br />
                                    GIFT CARD
                                  </p>
                                  <p className="sort en">DAL.KOMM GIFT CARD</p>
                                </div>
                              </div>
                              <p className="hold">
                                보유금액 <span>{e?.amount.toLocaleString("ko-KR")}원</span>
                              </p>
                            </li>
                          ))}
                        </ul>
                        <div className="swiper-pagination"></div>
                      </Swiper>

                      <div className="field">
                        <span className="label">충전 금액</span>
                        <div className="select-group col-2 checking">
                          <input
                            type="radio"
                            id="chargeMoney01"
                            name="chargeMoney"
                            value={10000}
                            defaultChecked={true}
                            onClick={(event) => handleCharge(event.currentTarget, 10000)}
                          />
                          <label htmlFor="chargeMoney01" className="btn bdr medium">
                            10,000원
                          </label>
                          <input
                            type="radio"
                            id="chargeMoney02"
                            name="chargeMoney"
                            value={20000}
                            onClick={(event) => handleCharge(event.currentTarget, 20000)}
                          />
                          <label htmlFor="chargeMoney02" className="btn bdr medium">
                            20,000원
                          </label>
                          <input
                            type="radio"
                            id="chargeMoney03"
                            name="chargeMoney"
                            value={30000}
                            onClick={(event) => handleCharge(event.currentTarget, 30000)}
                          />
                          <label htmlFor="chargeMoney03" className="btn bdr medium">
                            30,000원
                          </label>
                          <input
                            type="radio"
                            id="chargeMoney04"
                            name="chargeMoney"
                            value={50000}
                            onClick={(event) => handleCharge(event.currentTarget, 50000)}
                          />
                          <label htmlFor="chargeMoney04" className="btn bdr medium">
                            50,000원
                          </label>
                          <input
                            type="radio"
                            id="chargeMoney05"
                            name="chargeMoney"
                            value={70000}
                            onClick={(event) => handleCharge(event.currentTarget, 70000)}
                          />
                          <label htmlFor="chargeMoney05" className="btn bdr medium">
                            70,000원
                          </label>
                          <input
                            type="radio"
                            id="chargeMoney06"
                            name="chargeMoney"
                            value={100000}
                            onClick={(event) => handleCharge(event.currentTarget, 100000)}
                          />
                          <label htmlFor="chargeMoney06" className="btn bdr medium">
                            100,000원
                          </label>
                        </div>
                      </div>

                      <div className="field">
                        <span className="label">결제 수단</span>
                        <div className="select-group col-3 checking">
                          <input type="radio" id="payMethod01" name="payMethod" value="P" defaultChecked={true} />
                          <label htmlFor="payMethod01" className="btn bdr medium">
                            <strong>신용카드</strong>
                          </label>
                          <input type="radio" id="payMethod02" name="payMethod" value="T" />
                          <label htmlFor="payMethod02" className="btn bdr medium">
                            <strong>휴대폰</strong>
                          </label>
                          <input type="radio" id="payMethod03" name="payMethod" value="O" />
                          <label htmlFor="payMethod03" className="btn bdr medium">
                            <strong>페이코인</strong>
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </section>

              {/* 충전 후 금액 / 결제하기 영역 */}
              <div className="fixed-con active">
                <div className="popup">
                  <div className="popup-wrap">
                    <div className="popup-body">
                      <div className="w-inner">
                        <div className="item info-order">
                          <dl className="flex-both">
                            <dt className="title">충전 후 금액</dt>
                            <dd className="price fc-orange">{(axioData?.res2_data[0].amount + 10000).toLocaleString("ko-KR")}원</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="btn-area">
                      <button type="button" onClick={(e) => handleOnclick(e.currentTarget)} className="btn full x-large dark">
                        <strong>결제하기</strong>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 충전 후 금액 / 결제하기 영역 */}
            </div>
            {/* // #content */}
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
              <h1 className="page-title">충전하기</h1>
              <button type="button" className="btn back" onClick={() => handlePage()}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
            </header>
          </div>
        </div>
      </React.Fragment>
    );
}
