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

import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, popupOpen, tabLink } from "Jquery/Jquery";
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
  let click_count = 0;
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
            // window.$(`#barcode${i + 1}`).barcode("89801800015012244212651", "code128", {
            //   barWidth: 1,
            //   barHeight: 50,
            //   fontSize: 20,
            // });
            // window.$(`#barcode${i + 1}`).barcode("89801800015022278738389", "code128", {
            //   barWidth: 1,
            //   barHeight: 50,
            //   fontSize: 20,
            // });
            window.$(`#barcode${i + 1}`).barcode(e?.card_number + e?.pin_number, "code128", {
              barWidth: 1,
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
    if (click_count > 0) {
      return false;
    }
    click_count++;
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/chargecard/publish`, body, header_config)]).then(
      axios.spread((res1) => {
        if (res1.data.meta.code === 20000) {
          $("#resAlert").text("?????????????????? ?????????????????????.");
          $(".overlay.popupExitJoin").addClass("active");
          $("body").addClass("modal-opened");
          firstApi();
        } else {
          click_count = 0;
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
      alert("?????? ????????? ????????? ?????????.");
      return false;
    }
    if (!pinNumber) {
      $("#pinNumber").focus();
      alert("PIN ????????? ????????? ?????????.");
      return false;
    }
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/v2/chargecard/register`, { card_number: String(cardNumber), pin: String(pinNumber) }, header_config),
      ])
      .then(
        axios.spread((res1) => {
          if (res1.data.meta.code === 20000) {
            $("#resAlert").text("?????????????????? ?????????????????????.");
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

  const handleInput = (e, maxLength) => {
    if ($(e).val()?.length > maxLength) {
      $(e).val($(e).val().slice(0, maxLength));
    }
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header">
              <h1 className="page-title">??????</h1>
              <div className="btn-area flex-center">
                <button type="button" className="btn open-pop add" pop-target="#popupCardAdd">
                  <i className="ico add-card">
                    <span>?????? ??????</span>
                  </i>
                </button>
                <a onClick={() => handlePage("/mypage/giftSend")} className="btn">
                  <i className="ico gift">
                    <span>????????????</span>
                  </i>
                </a>
              </div>
            </header>

            <Nav order={2} />

            <div id="content" className="pay main fade-in">
              <ul className="tabs">
                <li className="current" id="liMembership">
                  <Link to="#" data-href="#payMembership" onClick={(e) => tabLink(e)}>
                    ????????? ??????
                  </Link>
                </li>
                <li id="liGift" className={activeHtml ? "active" : ""}>
                  <Link to="#" data-href="#payGift" onClick={(e) => tabLink(e)}>
                    ????????? ??????
                  </Link>
                </li>
              </ul>
              <div id="payMembership" className="tab-content active">
                <div className="w-inner">
                  <div className="item card membership">
                    {/* .item.card ??????
                                .item.card.membership : ????????? ??????
                                .item.card.gift : ????????? ??????
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
                          <img src="../@resource/images/com/barcode.svg" alt="?????????" />
                        </div> */}
                        <p className="num">{axioData?.res1_data?.stamp_card_number}</p>
                      </div>
                      <button type="button" className="btn open-pop" pop-target="#zoomCardMembership" onClick={(e) => popupOpen(e.target)}>
                        <i className="ico barcode-scan" pop-target="#zoomCardMembership">
                          <span>????????? ??????</span>
                        </i>
                      </button>
                    </div>
                  </div>
                  <button className="btn full medium light" onClick={() => handlePage("/mypage/membershipPolicy")}>
                    ????????? ?????? ??????
                  </button>
                  <div className="item attention">
                    <dl>
                      <dt className="title">????????????????</dt>
                      <dd className="text">
                        ????????? ?????????????????? ???????????? ????????? ????????? ????????? ??????
                        <br /> ?????? ?????? ?????? ???????????? ????????? ????????? ????????? ?????? ????????? ???????????????.
                      </dd>
                    </dl>
                  </div>
                  <div className="item attention">
                    <dl>
                      <dt className="title">????????? ?????? ??????</dt>
                      <dd className="text">
                        <ul className="attention-list">
                          <li>??????????????? 10,000??? ????????? ????????? ????????? 1??? ??????</li>
                          <li>??????????????? ?????? ???????????? ?????? ?????? ??? 4,000????????? ????????? 1??? ??????</li>
                          <li>?????? ????????? ??????????????? ??????, ?????? 9?????? ????????? ???????????????.</li>
                          <li>?????? ?????? ??? ????????? ????????? ???????????? ?????? ??????????????? ???????????????.</li>
                        </ul>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div id="payGift" className="tab-content">
                <div className="w-inner">
                  {axioData?.res2_data?.charge_card_list?.length > 0 ? (
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
                            <h2>{e.card_name?.replace("?????? ????????????", "")}?????? ???????????????</h2>
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
                                  <img src="../@resource/images/com/barcode.svg" alt="?????????" />
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
                                    <span>????????? ??????</span>
                                  </i>
                                </button>
                              </div>
                              <div className="state-wrap flex-both">
                                <dl className="possess flex-list">
                                  <dt className="title">?????? ??????</dt>
                                  <dd className="price fc-orange">{e?.amount.toLocaleString("ko-KR")}???</dd>
                                </dl>
                                <a onClick={(event) => handleGiftCharge(event.currentTarget)} className="btn">
                                  <i className="ico money">
                                    <span>????????????</span>
                                  </i>
                                  ????????????
                                </a>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </ul>
                    </Swiper>
                  ) : (
                    <ul className="data-list create-list">
                      <li>
                        <a onClick={(e) => handleAddCard(e.currentTarget)} className="item card-create">
                          <div className="title-wrap">
                            <i className="ico gift-add"></i>
                            <p className="title">????????? ?????? ????????????</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  )}
                  {axioData?.res2_data?.charge_card_list?.length > 0 && (
                    <ul className="row-list flex-center">
                      <li>
                        <a onClick={(event) => handleGiftDetail(event.currentTarget)}>
                          <i className="ico recipt"></i>????????????
                        </a>
                      </li>
                      <li>
                        <a className="open-pop" data-href="#popupExitJoin" onClick={(e) => popupOpen(e.target)}>
                          ????????????
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              {/* ????????? ?????? ?????? ?????? */}
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
                        <legend className="blind">?????? ??????</legend>
                        <div className="w-inner">
                          <h2 className="h2 ta-c">??????????????? PIN ????????? ????????? ?????????.</h2>
                          <div className="field">
                            <label className="blind" htmlFor="cardNumber">
                              ?????? ?????? 16????????? ????????? ?????????.
                            </label>
                            <div className="insert">
                              <input
                                type="number"
                                className="input-text medium"
                                id="cardNumber"
                                maxLength={16}
                                placeholder="?????? ?????? 16????????? ????????? ?????????."
                                inputMode="numeric"
                                onInput={(e) => handleInput(e.currentTarget, 16)}
                              />
                            </div>
                          </div>
                          <div className="field">
                            <label className="blind" htmlFor="pinNumber">
                              PIN ?????? 7????????? ????????? ?????????.
                            </label>
                            <div className="insert">
                              <input
                                type="number"
                                className="input-text medium"
                                id="pinNumber"
                                maxLength="7"
                                placeholder="PIN ?????? 7????????? ????????? ?????????."
                                inputMode="numeric"
                                onInput={(e) => handleInput(e.currentTarget, 7)}
                              />
                            </div>
                          </div>

                          <ul className="attention-list">
                            <li>?????? ?????? ?????? ?????? 16????????? PIN?????? 7????????? ????????? ?????????.</li>
                            <li>[??????????????? ????????????]??? ?????? ?????? ???????????? ?????????????????? ????????? ??? ????????????.</li>
                          </ul>
                        </div>
                      </fieldset>
                      <div className="btn-area">
                        <button type="button" onClick={(e) => handleAddPin(e.currentTarget)} className="btn full x-large dark">
                          <strong>?????? ????????????</strong>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* // ????????? ?????? ?????? ?????? */}
            </div>
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        <Popup_removeCard />
        <Popup_nomal />
        {/* // #wrap */}

        {/* ????????? ?????? ?????? ?????? */}
        <div id="zoomCardMembership" className="overlay zoom-card">
          <div className="popup">
            <div className="popup-header">
              <h2 className="title">
                <span className="blind">?????? ??????</span>
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
                        <img src="../@resource/images/com/barcode.svg" alt="?????????" />
                      </div> */}
                      <p className="num">{axioData?.res1_data?.stamp_card_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // ????????? ?????? ?????? ?????? */}

        {/* ????????? ?????? ?????? ?????? */}
        <div id="zoomCardGift" className="overlay zoom-card">
          <div className="popup">
            <div className="popup-header">
              <h2 className="title">
                <span className="blind">?????? ??????</span>
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
                        <img src="../@resource/images/com/barcode.svg" alt="?????????" />
                      </div> */}
                      <p className="num">{cardPopup?.card_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // ????????? ?????? ?????? ?????? */}
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header">
              <h1 className="page-title">??????</h1>
              <div className="btn-area flex-center">
                <button type="button" className="btn open-pop add" pop-target="#popupCardAdd">
                  <i className="ico add-card">
                    <span>?????? ??????</span>
                  </i>
                </button>
                <a onClick={() => handlePage("/mypage/giftSend")} className="btn">
                  <i className="ico gift">
                    <span>????????????</span>
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
