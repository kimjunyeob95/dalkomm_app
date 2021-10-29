/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, popupOpen, tabLink, fadeInOut } from "Jquery/Jquery";
import Popup_removeCard from "Components/Popup/Popup_removeCard";
import { getParameter } from "Config/GlobalJs";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

export default function Pay() {
  SwiperCore.use([Pagination]);
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
  const [cardPopup, setCard] = useState(false);
  const [activeHtml, setActive] = useState(getParameter("activeHtml") !== "" ? true : false);
  const history = useHistory();

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
        axios.post(`${SERVER_DALKOMM}/app/api/v2/chargecard/list`, body, header_config),
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
          // fadeInOut();
          window.$("#barcode").barcode(res1_data?.stamp_card_number, "code128", {
            barWidth: 2,
            barHeight: 50,
            fontSize: 20,
          });
          window.$("#barcode1_2").barcode(res1_data?.stamp_card_number, "code128", {
            barWidth: 2,
            barHeight: 50,
            fontSize: 20,
          });
          res2?.data?.data?.charge_card_list?.map((e, i) => {
            window.$(`#barcode${i + 1}`).barcode(e?.card_number, "code128", {
              barWidth: 2,
              barHeight: 50,
              fontSize: 20,
            });
          });

          if (activeHtml) {
            $("#liMembership").removeClass("current");
            $("#payMembership").removeClass("active");
            $("#liGift").addClass("current");
            $("#payGift").addClass("active");
          }
        })
      );
  }, [state?.auth]);
  useEffect(() => {
    contGap();
  }, [axioData]);

  const handleCard = (event, cardNum) => {
    let targetBarcode = $(event).prev().children(".react-barcode").html();
    $("#barcode2_gift").html(targetBarcode);
    setCard(axioData?.res2_data?.charge_card_list?.filter((e, i) => e.card_number === cardNum)[0]);
  };

  const handleGiftDetail = (event) => {
    let giftCode = $("#payGift .swiper-slide-active").data("cardnum");
    history.push(`/mypage/giftRecipt/${giftCode}`);
  };

  const handleGiftCharge = (event) => {
    let giftCode = $("#payGift .swiper-slide-active").data("cardnum");
    history.push(`/mypage/giftCharge/${giftCode}`);
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub type="flexCenter" title="페이" icon="gift" payHeader={true} location="/mypage/giftSend" />

            <Nav order={2} />

            <div id="content" className="pay main">
              <ul className="tabs">
                <li className="current" id="liMembership">
                  <Link to="#" data-href="#payMembership" onClick={(e) => tabLink(e)}>
                    멤버십 카드
                  </Link>
                </li>
                <li id="liGift">
                  <Link to="#" data-href="#payGift" onClick={(e) => tabLink(e)}>
                    기프트 카드
                  </Link>
                </li>
              </ul>
              <div id="payMembership" className="tab-content active">
                <div className="w-inner">
                  <div className="item card membership">
                    {/* .item.card 종류
                                .item.card.membership : 멤버십 카드
                                .item.card.gift : 기프트 카드
                            */}
                    {/* <div
                      className="card-wrap"
                    > */}
                    <div
                      className="card-wrap"
                      style={{
                        backgroundImage: `url(${axioData?.res1_data?.charge_card_image_url})`,
                      }}
                    >
                      <p className="grade en">{axioData?.res1_data?.membership_name}</p>
                      <p className="sort en">
                        DAL.KOMM
                        <br />
                        MEMBERSHIP CARD
                      </p>
                    </div>
                    <div className="barcode-wrap">
                      <div className="barcode">
                        <div id="barcode" className="react-barcode"></div>
                        {/* <div className="img-wrap">
                          <img src="../@resource/images/com/barcode.svg" alt="바코드" />
                        </div> */}
                        <p className="num">{axioData?.res1_data?.stamp_card_number}</p>
                      </div>
                      <button type="button" className="btn open-pop" pop-target="#zoomCardMembership" onClick={(e) => popupOpen(e.target)}>
                        <i className="ico barcode-scan" pop-target="#zoomCardMembership">
                          <span>바코드 확대</span>
                        </i>
                      </button>
                    </div>
                  </div>
                  <button className="btn full medium light">멤버십 등급 소개</button>
                  <div className="item attention">
                    <dl>
                      <dt className="title">
                        <i className="ico alert"></i>멤버십 적립 기준
                      </dt>
                      <dd className="text">
                        <ul className="attention-list">
                          <li>충전카드 10,000원 충전 시 마다 1개 적립</li>
                          <li>테이블오더 또는 오프라인 매장에서 4천원 결제 시 마다 1개 적립</li>
                          <li>등급 조건이 충족되었을 경우, 익일 9시에 등급 변경이 진행됩니다.</li>
                          <li>등급 변경으로 인해 사용된 트로피는 보유 트로피에서 차감됩니다.</li>
                        </ul>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div id="payGift" className="tab-content">
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
                      {axioData?.res2_data?.charge_card_list?.map((e, i) => (
                        <SwiperSlide className="swiper-slide" key={i} data-cardnum={e?.card_number} data-pin={e?.pin_number}>
                          <h2>{axioData?.res1_data?.user_name}님의 기프트카드</h2>
                          <div className="item card gift">
                            {/* <div className="card-wrap"> */}
                            <div
                              className="card-wrap"
                              style={{
                                backgroundImage: `url(${e?.card_image_url})`,
                              }}
                            >
                              <p className="grade en">
                                RECHARGEABLE
                                <br />
                                GIFT CARD
                              </p>
                              <p className="sort en">DAL.KOMM GIFT CARD</p>
                            </div>
                            <div className="barcode-wrap">
                              <div className="barcode">
                                <div id={`barcode${i + 1}`} className="react-barcode"></div>
                                {/* <div className="img-wrap">
                                  <img src="../@resource/images/com/barcode.svg" alt="바코드" />
                                </div> */}
                                <p className="num">{e?.card_number.toLocaleString("ko-KR")}</p>
                              </div>
                              <button
                                type="button"
                                className="btn open-pop"
                                pop-target="#zoomCardGift"
                                onClick={(event) => {
                                  handleCard(event.currentTarget, e?.card_number);
                                  popupOpen(event.target);
                                }}
                              >
                                <i className="ico barcode-scan" pop-target="#zoomCardGift">
                                  <span>바코드 확대</span>
                                </i>
                              </button>
                            </div>
                            <div className="state-wrap flex-both">
                              <dl className="possess flex-list">
                                <dt className="title">보유 금액</dt>
                                <dd className="price fc-orange">{e?.amount.toLocaleString("ko-KR")}원</dd>
                              </dl>
                              <a onClick={(event) => handleGiftCharge(event.currentTarget)} className="btn">
                                <i className="ico money">
                                  <span>충전하기</span>
                                </i>
                                &nbsp;충전하기
                              </a>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </ul>
                    <div className="swiper-pagination"></div>
                  </Swiper>

                  <ul className="row-list flex-center">
                    <li>
                      <a onClick={(event) => handleGiftDetail(event.currentTarget)}>
                        <i className="ico recipt"></i>사용내역
                      </a>
                    </li>
                    <li>
                      <a className="open-pop" data-href="#popupExitJoin" onClick={(e) => popupOpen(e.target)}>
                        카드삭제
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        <Popup_removeCard />
        {/* // #wrap */}

        {/* 멤버쉽 카드 확대 팝업 */}
        <div id="zoomCardMembership" className="overlay zoom-card">
          <div className="popup">
            <div className="popup-header">
              <h2 className="title">
                <span className="blind">카드 확대</span>
              </h2>
            </div>
            <div className="popup-body">
              <div className="item card membership">
                <div className="card-wrap">
                  <div>
                    <p className="grade en">{axioData?.res1_data?.membership_name}</p>
                    <p className="sort en">
                      DAL.KOMM
                      <br />
                      MEMBERSHIP CARD
                    </p>
                  </div>
                </div>
                <div className="barcode-wrap">
                  <div>
                    <div className="barcode">
                      <div id="barcode1_2" className="react-barcode"></div>
                      {/* <div className="img-wrap">
                        <img src="../@resource/images/com/barcode.svg" alt="바코드" />
                      </div> */}
                      <p className="num">{axioData?.res1_data?.stamp_card_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // 멤버쉽 카드 확대 팝업 */}

        {/* 기프트 카드 확대 팝업 */}
        <div id="zoomCardGift" className="overlay zoom-card">
          <div className="popup">
            <div className="popup-header">
              <h2 className="title">
                <span className="blind">카드 확대</span>
              </h2>
            </div>
            <div className="popup-body">
              <div className="item card gift">
                <div className="card-wrap">
                  {/* <div className="card-wrap" style={{ backgroundImage: `url(${cardPopup?.card_image_url})` }}> */}
                  <div>
                    <p className="grade en">
                      RECHARGEABLE
                      <br />
                      GIFT CARD
                    </p>
                    <p className="sort en">DAL.KOMM GIFT CARD</p>
                  </div>
                </div>
                <div className="barcode-wrap">
                  <div>
                    <div className="barcode">
                      <div id="barcode2_gift" className="react-barcode"></div>
                      {/* <div className="img-wrap">
                        <img src="../@resource/images/com/barcode.svg" alt="바코드" />
                      </div> */}
                      <p className="num">{cardPopup?.card_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // 기프트 카드 확대 팝업 */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
