import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { Swiper } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

export default function GiftCharge() {
  SwiperCore.use([Pagination]);
  useEffect(() => {
    contGap();
  }, []);
  const handleOnclick = () => {
    alert("결제하기 버튼 클릭");
  };
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="충전하기" />

          <div id="content" className="pay charge">
            <section className="section">
              <div className="w-inner">
                <form className="form">
                  <fieldset className="fieldset">
                    <h2 className="section-title">기프트카드</h2>
                    <Swiper id="cardSlider" className="swiper-container" slidesPerView={1} pagination={{ clickable: true }}>
                      <ul className="swiper-wrapper">
                        <li className="swiper-slide">
                          <p className="card-title">서지혜님의 기프트카드</p>
                          <div className="item card gift">
                            <div className="card-wrap">
                              <p className="grade en">
                                RECHARGEABLE
                                <br />
                                GIFT CARD
                              </p>
                              <p className="sort en">DAL.KOMM GIFT CARD</p>
                            </div>
                          </div>
                          <p className="hold">
                            보유금액 <span>32,000원</span>
                          </p>
                        </li>
                        <li className="swiper-slide">
                          <p className="card-title">서지혜님의 기프트카드</p>
                          <div className="item card gift">
                            <div className="card-wrap">
                              <p className="grade en">
                                RECHARGEABLE
                                <br />
                                GIFT CARD
                              </p>
                              <p className="sort en">DAL.KOMM GIFT CARD</p>
                            </div>
                          </div>
                          <p className="hold">
                            보유금액 <span>10,000원</span>
                          </p>
                        </li>
                        <li className="swiper-slide">
                          <p className="card-title">서지혜님의 기프트카드</p>
                          <div className="item card gift">
                            <div className="card-wrap">
                              <p className="grade en">
                                RECHARGEABLE
                                <br />
                                GIFT CARD
                              </p>
                              <p className="sort en">DAL.KOMM GIFT CARD</p>
                            </div>
                          </div>
                          <p className="hold">
                            보유금액 <span>29,000원</span>
                          </p>
                        </li>
                      </ul>
                      <div className="swiper-pagination"></div>
                    </Swiper>

                    <div className="field">
                      <span className="label">충전 금액</span>
                      <div className="select-group col-2">
                        <input type="radio" id="chargeMoney01" name="chargeMoney" defaultChecked={true} />
                        <label htmlFor="chargeMoney01" className="btn bdr medium">
                          10,000원
                        </label>
                        <input type="radio" id="chargeMoney02" name="chargeMoney" />
                        <label htmlFor="chargeMoney02" className="btn bdr medium">
                          20,000원
                        </label>
                        <input type="radio" id="chargeMoney03" name="chargeMoney" />
                        <label htmlFor="chargeMoney03" className="btn bdr medium">
                          30,000원
                        </label>
                        <input type="radio" id="chargeMoney04" name="chargeMoney" />
                        <label htmlFor="chargeMoney04" className="btn bdr medium">
                          50,000원
                        </label>
                        <input type="radio" id="chargeMoney05" name="chargeMoney" />
                        <label htmlFor="chargeMoney05" className="btn bdr medium">
                          70,000원
                        </label>
                        <input type="radio" id="chargeMoney06" name="chargeMoney" />
                        <label htmlFor="chargeMoney06" className="btn bdr medium">
                          100,000원
                        </label>
                      </div>
                    </div>

                    <div className="field">
                      <span className="label">결제 수단</span>
                      <div className="select-group col-3">
                        <input type="radio" id="payMethod01" name="payMethod" />
                        <label htmlFor="payMethod01" className="btn bdr medium">
                          <strong>신용카드</strong>
                        </label>
                        <input type="radio" id="payMethod02" name="payMethod" />
                        <label htmlFor="payMethod02" className="btn bdr medium">
                          <strong>휴대폰</strong>
                        </label>
                        <input type="radio" id="payMethod03" name="payMethod" />
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
                          <dd className="price fc-orange">42,000원</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="btn-area">
                    <Link to="#" onClick={() => handleOnclick()} className="btn full x-large dark">
                      <strong>결제하기</strong>
                    </Link>
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
}
