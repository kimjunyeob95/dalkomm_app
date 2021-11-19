/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, popupOpen, tabLink, fadeInOut } from "Jquery/Jquery";
import Popup_removeCard from "Components/Popup/Popup_removeCard";
import Popup_nomal from "Components/Popup/Popup_nomal";

import { getParameter } from "Config/GlobalJs";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";
import Loading from "Components/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import { fadeOut, fn_memberName } from "Config/GlobalJs";

export default function Pay() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
  const [cardPopup, setCard] = useState(false);
  const history = useHistory();
  const [activeHtml] = useState(getParameter("activeHtml") !== "" ? true : false);
  const body = {};
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };

  const firstApi = () => {
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
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    firstApi();
  }, []);
  useEffect(() => {
    contGap();
    fadeOut();
    SwiperCore.use([Pagination]);
    if (axioData?.res2_data?.charge_card_list?.length < 0) {
      $(".swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets").css("display", "none");
    }
  }, [axioData]);

  const handleCard = (event, cardNum) => {
    let targetBarcode = $(event).prev().children(".react-barcode").html();
    $("#barcode2_gift").html(targetBarcode);
    setCard(axioData?.res2_data?.charge_card_list?.filter((e, i) => e.card_number === cardNum)[0]);
  };

  const handleGiftDetail = (event) => {
    let giftCode = $("#payGift .swiper-slide-active").data("cardnum");
    if (giftCode === 0) {
      return false;
    }
    if ($("#liGift").hasClass("active")) {
      history.push({
        pathname: `/mypage/giftRecipt/${giftCode}`,
        activeHtml: true,
      });
    } else {
      history.push({
        pathname: `/mypage/giftRecipt/${giftCode}`,
        activeHtml: false,
      });
    }
  };

  const handleGiftCharge = (event) => {
    let giftCode = $("#payGift .swiper-slide-active").data("cardnum");
    if ($("#liGift").hasClass("active")) {
      history.push({
        pathname: `/mypage/giftCharge/${giftCode}`,
        activeHtml: true,
      });
    } else {
      history.push({
        pathname: `/mypage/giftCharge/${giftCode}`,
        activeHtml: false,
      });
    }
  };

  const handleAddCard = () => {
    $(".item.card-create").eq(0).hide();
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/chargecard/publish`, body, header_config)]).then(
      axios.spread((res1) => {
        if (res1.data.meta.code === 20000) {
          $("#resAlert").text("충전카드가 발급되었습니다.");
          $(".overlay.popupExitJoin").addClass("active");
          $("body").addClass("modal-opened");
          firstApi();
        } else {
          $(".item.card-create").eq(0).show();
          $("#resAlert").text(res1.data.meta.msg);
          $(".overlay.popupExitJoin").addClass("active");
          $("body").addClass("modal-opened");
        }
      })
    );
  };
  const handlePage = (link) => {
    if ($("#liGift").hasClass("active")) {
      history.push({
        pathname: link,
        activeHtml: true,
      });
    } else {
      history.push({
        pathname: link,
        activeHtml: false,
      });
    }
  };

  const handleAddPin = () => {
    let cardNumber = $("#cardNumber").val();
    let pinNumber = $("#pinNumber").val();
    if (!cardNumber) {
      $("#cardNumber").focus();
      alert("카드 번호를 입력해 주세요.");
      return false;
    }
    if (!pinNumber) {
      $("#pinNumber").focus();
      alert("PIN 번호를 입력해 주세요.");
      return false;
    }
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/v2/chargecard/register`, { card_number: String(cardNumber), pin: String(pinNumber) }, header_config),
      ])
      .then(
        axios.spread((res1) => {
          if (res1.data.meta.code === 20000) {
            $("#resAlert").text("충전카드가 발급되었습니다.");
            $(".overlay.popupExitJoin").addClass("active");
            $("body").addClass("modal-opened");
            firstApi();
          } else {
            $("#resAlert").text(res1.data.meta.msg);
            $(".overlay.popupExitJoin").addClass("active");
            $("body").addClass("modal-opened");
          }
        })
      );
  };

  const handleClose = () => {
    $("#cardNumber").val("");
    $("#pinNumber").val("");
  };

  const handleInputCard = () => {
    $("body").addClass("modal-opened");
    $("#popupCardAdd").addClass("active");
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header">
              <h1 className="page-title">페이</h1>
              <div className="btn-area flex-center">
                <a onClick={() => handlePage("/mypage/giftSend")} className="btn">
                  <i className="ico gift">
                    <span>메뉴검색</span>
                  </i>
                </a>
              </div>
            </header>

            <Nav order={2} />

            <div id="content" className="pay main fade-in">
              <ul className="tabs">
                <li className="current" id="liMembership">
                  <Link to="#" data-href="#payMembership" onClick={(e) => tabLink(e)}>
                    멤버십 카드
                  </Link>
                </li>
                <li id="liGift" className={activeHtml ? "active" : ""}>
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
                    <div className="card-wrap">
                      {/* <div
                      className="card-wrap"
                      style={{
                        backgroundImage: `url(${axioData?.res1_data?.charge_card_image_url})`,
                      }}
                    > */}
                      <p className="grade en">{fn_memberName(axioData?.res1_data?.membership_level)}</p>
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
                  <button className="btn full medium light" onClick={() => handlePage("/mypage/membershipPolicy")}>
                    멤버십 등급 소개
                  </button>
                  <div className="item attention">
                    <dl>
                      <dt className="title">멤버십이란?</dt>
                      <dd className="text">
                        달콤을 이용해주시는 고객님께 다양한 혜택을 드리기 위한
                        <br /> 달콤 고객 우대 제도이며 적립된 트로피 개수에 따라 등급이 결정됩니다
                      </dd>
                    </dl>
                  </div>
                  <div className="item attention">
                    <dl>
                      <dt className="title">멤버십 적립 기준</dt>
                      <dd className="text">
                        <ul className="attention-list">
                          <li>기프트카드 10,000원 충전할 때마다 트로피 1개 적립</li>
                          <li>테이블오더 또는 매장에서 직접 결제 시 4,000원마다 트로피 1개 적립</li>
                          <li>등급 조건이 충족되었을 경우, 익일 9시에 등급이 변경됩니다.</li>
                          <li>등급 변경 시 사용된 트로피 개수만큼 보유 트로피에서 차감됩니다.</li>
                        </ul>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div id="payGift" className="tab-content">
                <div className="w-inner">
                  {axioData?.res2_data?.charge_card_list?.length < 0 ? (
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
                              <div className="card-wrap">
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
                                  충전하기
                                </a>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                        <SwiperSlide className="swiper-slide" data-cardnum={0} data-pin={0}>
                          <h2>기프트 카드 추가</h2>
                          <div className="item card gift add">
                            <div className="card-wrap">
                              <p className="grade en">
                                RECHARGEABLE
                                <br />
                                GIFT CARD
                              </p>
                              <p className="sort en">DAL.KOMM GIFT CARD</p>
                            </div>
                            <div className="barcode-wrap">
                              <div className="barcode">
                                <div className="img-wrap">
                                  <img src="/@resource/images/com/barcode.svg" alt="바코드" />
                                </div>
                                <p className="num">1309675152301202</p>
                              </div>
                              <button type="button" className="btn open-pop" pop-target="#zoomCardGift">
                                <i className="ico barcode-scan">
                                  <span>바코드 확대</span>
                                </i>
                              </button>
                            </div>
                            <div className="state-wrap flex-both">
                              <dl className="possess flex-list">
                                <dt className="title">보유 금액</dt>
                                <dd className="price fc-orange">0원</dd>
                              </dl>
                              <a className="btn">
                                <i className="ico money">
                                  <span>충전하기</span>
                                </i>
                                충전하기
                              </a>
                            </div>

                            <div className="btn-area">
                              <button type="button" className="btn open-pop" pop-target="#popupCardAdd">
                                <i className="ico"></i>

                                <p className="text">카드 추가하기</p>
                              </button>
                            </div>
                          </div>
                        </SwiperSlide>
                      </ul>
                    </Swiper>
                  ) : (
                    <ul className="data-list create-list">
                      <li>
                        <a onClick={(e) => handleAddCard(e.currentTarget)} className="item card-create">
                          <div className="title-wrap">
                            <i className="ico gift-add"></i>
                            <p className="title">기프트 카드 발급받기</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a className="item card-create" onClick={(e) => handleInputCard(e.currentTarget)}>
                          <div className="title-wrap">
                            <i className="ico card-input"></i>
                            <p className="title">카드 번호 입력하기</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  )}
                  {axioData?.res2_data?.charge_card_list?.length > 0 && (
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
                  )}
                </div>
              </div>
              {/* 기프트 카드 추가 팝업 */}
              <div id="popupCardAdd" className="fixed-con layer-pop dimm">
                <div className="popup">
                  <div className="popup-wrap">
                    <button type="button" className="btn btn-close" onClick={(e) => handleClose(e.currentTarget)}>
                      <i className="ico close">
                        <span>close</span>
                      </i>
                    </button>
                    <div className="popup-body">
                      <fieldset className="fieldset">
                        <legend className="blind">쿠폰 등록</legend>
                        <div className="w-inner">
                          <h2 className="h2 ta-c">카드번호와 PIN 번호를 입력해 주세요.</h2>
                          <div className="field">
                            <label className="blind" htmlFor="cardNumber">
                              카드 번호 16자리를 입력해 주세요.
                            </label>
                            <div className="insert">
                              <input
                                type="number"
                                className="input-text medium"
                                id="cardNumber"
                                placeholder="카드 번호 16자리를 입력해 주세요."
                                inputMode="numeric"
                              />
                            </div>
                          </div>
                          <div className="field">
                            <label className="blind" htmlFor="pinNumber">
                              PIN 번호 7자리를 입력해 주세요.
                            </label>
                            <div className="insert">
                              <input
                                type="number"
                                className="input-text medium"
                                id="pinNumber"
                                placeholder="PIN 번호 7자리를 입력해 주세요."
                                inputMode="numeric"
                              />
                            </div>
                          </div>

                          <ul className="attention-list">
                            <li>선물 받은 카드 번호 16자리와 PIN번호 7자리를 입력해 주세요.</li>
                            <li>[충전카드 선물하기]를 통해 보다 편리하게 충전카드를 선물할 수 있습니다.</li>
                          </ul>
                        </div>
                      </fieldset>
                      <div className="btn-area">
                        <button type="button" onClick={(e) => handleAddPin(e.currentTarget)} className="btn full x-large dark">
                          <strong>카드 등록하기</strong>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 기프트 카드 추가 팝업 */}
            </div>
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        <Popup_removeCard />
        <Popup_nomal />
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
                    <p className="grade en">{fn_memberName(axioData?.res1_data?.membership_level)}</p>
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
  } else
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header">
              <h1 className="page-title">페이</h1>
              <div className="btn-area flex-center">
                <a onClick={() => handlePage("/mypage/giftSend")} className="btn">
                  <i className="ico gift">
                    <span>메뉴검색</span>
                  </i>
                </a>
              </div>
            </header>
            <Loading />
            <Nav order={2} />
          </div>
        </div>
      </React.Fragment>
    );
}
