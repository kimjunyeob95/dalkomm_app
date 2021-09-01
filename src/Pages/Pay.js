import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, popupOpen, tabLink } from "Jquery/Jquery";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

export default function Pay() {
  SwiperCore.use([Pagination]);
  useEffect(() => {
    contGap();
  }, []);
  return (
    <React.Fragment>
      <GoContents />
      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub type="flexCenter" title="페이" icon="gift" location="/mypage/gift" />

          <Nav order={2} />

          <div id="content" className="pay main">
            <ul className="tabs">
              <li className="current">
                <Link to="#" data-href="#payMembership" onClick={(e) => tabLink(e)}>
                  멤버십 카드
                </Link>
              </li>
              <li>
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
                    <p className="grade en">PLATINUM</p>
                    <p className="sort en">
                      DAL.KOMM
                      <br />
                      MEMBERSHIP CARD
                    </p>
                  </div>
                  <div className="barcode-wrap">
                    <div className="barcode">
                      <div className="img-wrap">
                        <img src="../@resource/images/com/barcode.svg" alt="바코드" />
                      </div>
                      <p className="num">1309675152301202</p>
                    </div>
                    <button type="button" className="btn open-pop" pop-target="#zoomCardMembership" onClick={(e) => popupOpen(e.target)}>
                      <i className="ico barcode-scan" pop-target="#zoomCardMembership">
                        <span>바코드 확대</span>
                      </i>
                    </button>
                  </div>
                </div>
                <Link to="#" className="btn full medium light">
                  멤버십 등급 소개
                </Link>
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
                    <SwiperSlide className="swiper-slide">
                      <h2>서지혜님의 기프트카드</h2>
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
                            <div className="img-wrap">
                              <img src="../@resource/images/com/barcode.svg" alt="바코드" />
                            </div>
                            <p className="num">1309675152301202</p>
                          </div>
                          <button type="button" className="btn open-pop" pop-target="#zoomCardGift" onClick={(e) => popupOpen(e.target)}>
                            <i className="ico barcode-scan" pop-target="#zoomCardGift">
                              <span>바코드 확대</span>
                            </i>
                          </button>
                        </div>
                        <div className="state-wrap flex-both">
                          <dl className="possess flex-list">
                            <dt className="title">보유 금액</dt>
                            <dd className="price fc-orange">32,000원</dd>
                          </dl>
                          <Link to="/mypage/giftCharge" className="btn">
                            <i className="ico money">
                              <span>충전하기</span>
                            </i>
                            &nbsp;충전하기
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <h2>서지혜님의 기프트카드</h2>
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
                            <div className="img-wrap">
                              <img src="../@resource/images/com/barcode.svg" alt="바코드" />
                            </div>
                            <p className="num">1309675152301202</p>
                          </div>
                          <button type="button" className="btn open-pop" pop-target="#zoomCardGift" onClick={(e) => popupOpen(e.target)}>
                            <i className="ico barcode-scan" pop-target="#zoomCardGift">
                              <span>바코드 확대</span>
                            </i>
                          </button>
                        </div>
                        <div className="state-wrap flex-both">
                          <dl className="possess flex-list">
                            <dt className="title">보유 금액</dt>
                            <dd className="price fc-orange">16,000원</dd>
                          </dl>
                          <Link to="/mypage/giftCharge" className="btn">
                            <i className="ico money">
                              <span>충전하기</span>
                            </i>
                            &nbsp;충전하기
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <h2>서지혜님의 기프트카드</h2>
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
                            <div className="img-wrap">
                              <img src="../@resource/images/com/barcode.svg" alt="바코드" />
                            </div>
                            <p className="num">1309675152301202</p>
                          </div>
                          <button type="button" className="btn open-pop" pop-target="#zoomCardGift" onClick={(e) => popupOpen(e.target)}>
                            <i className="ico barcode-scan" pop-target="#zoomCardGift">
                              <span>바코드 확대</span>
                            </i>
                          </button>
                        </div>
                        <div className="state-wrap flex-both">
                          <dl className="possess flex-list">
                            <dt className="title">보유 금액</dt>
                            <dd className="price fc-orange">25,000원</dd>
                          </dl>
                          <Link to="/mypage/giftCharge" className="btn">
                            <i className="ico money">
                              <span>충전하기</span>
                            </i>
                            &nbsp;충전하기
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  </ul>
                  <div className="swiper-pagination"></div>
                </Swiper>

                <ul className="row-list flex-center">
                  <li>
                    <Link to="/mypage/giftRecipt">
                      <i className="ico recipt"></i>사용내역
                    </Link>
                  </li>
                  <li>
                    <Link to="#">카드삭제</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
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
                  <p className="grade en">PLATINUM</p>
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
                    <div className="img-wrap">
                      <img src="../@resource/images/com/barcode.svg" alt="바코드" />
                    </div>
                    <p className="num">1309675152301202</p>
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
                    <div className="img-wrap">
                      <img src="../@resource/images/com/barcode.svg" alt="바코드" />
                    </div>
                    <p className="num">1309675152301202</p>
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
}
