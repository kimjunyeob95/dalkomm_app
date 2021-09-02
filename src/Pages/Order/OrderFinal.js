/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import $ from "jquery";
import React, { useEffect, useState } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import { Link, useHistory, useLocation } from "react-router-dom";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

export default function OrderFinal() {
  const history = useHistory();
  const location = useLocation();

  const handleOrder = () => {
    alert("주문하기 버튼 클릭");
    history.push("/order");
  };

  for (var value of location?.orderData?.entries()) {
    console.log(value[0] + ", " + value[1]);
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    contGap();
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="주문하기" />

          <div id="content" className="drink order">
            <div className="store-search-wrap w-inner">
              <div className="item store-search">
                <div className="flex-both">
                  <dl className="detail-wrap flex-start">
                    <dt className="title">선택매장</dt>
                    <dd className="place">광명역 자이스트릿점</dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* 주문하기 */}
            <section className="section">
              <div className="w-inner">
                <form className="form">
                  <fieldset className="fieldset">
                    <legend className="blind">주문하기</legend>

                    <div className="field">
                      <span className="label">주문 메뉴</span>
                      <ul className="order-list data-list">
                        <li>
                          <div className="item order">
                            <div className="img-wrap">
                              <img src="/@resource/images/@temp/product_05.jpg" alt="카라멜마끼아또" />
                            </div>
                            <div className="detail-wrap">
                              <div className="order-info">
                                <p className="title">카라멜마끼아또</p>
                                <p className="info">
                                  <span className="en">ICE</span>
                                  <span className="en">Regular</span>
                                  <span>매장용 컵</span>
                                </p>
                                <p className="option flex-both">
                                  <span>
                                    <em className="en">Option :</em>샷 추가
                                  </span>
                                  <span>
                                    <em>횟수 :</em>1
                                  </span>
                                </p>
                              </div>
                              <div className="price-wrap flex-both">
                                <p className="price">
                                  수량&nbsp; :<span>1</span>{" "}
                                </p>
                                <p className="price fc-orange">4,300원</p>
                              </div>
                            </div>
                          </div>
                          <select className="select medium">
                            <option value="">쿠폰을 선택해 주세요.</option>
                            <option value="">쿠폰1</option>
                            <option value="">쿠폰2</option>
                          </select>
                        </li>
                        <li>
                          <div className="item order">
                            <div className="img-wrap">
                              <img src="/@resource/images/@temp/product_07.jpg" alt="아메리카노" />
                            </div>
                            <div className="detail-wrap">
                              <div className="order-info">
                                <p className="title">아메리카노</p>
                                <p className="info">
                                  <span className="en">ICE</span>
                                  <span className="en">Regular</span>
                                  <span>매장용 컵</span>
                                </p>
                                <p className="option flex-both">
                                  <span>
                                    <em className="en">Option :</em>샷 추가
                                  </span>
                                  <span>
                                    <em>횟수 :</em>1
                                  </span>
                                </p>
                              </div>
                              <div className="price-wrap flex-both">
                                <p className="price">
                                  수량&nbsp; :<span>1</span>{" "}
                                </p>
                                <p className="price fc-orange">4,300원</p>
                              </div>
                            </div>
                          </div>
                          <select className="select medium">
                            <option value="">쿠폰을 선택해 주세요.</option>
                            <option value="">쿠폰1</option>
                            <option value="">쿠폰2</option>
                          </select>
                        </li>
                      </ul>
                    </div>

                    <div className="field">
                      <span className="label">
                        요청사항
                        <span className="alert">
                          <i className="ico alert"></i>빙수제품은 별도 포장을 제공하지 않습니다.
                        </span>
                      </span>
                      <div className="select-group col-2">
                        <input type="radio" id="orderRequest01" name="orderRequest" defaultChecked={true} />
                        <label htmlFor="orderRequest01" className="btn bdr medium">
                          <strong>캐리어 포장</strong>
                        </label>
                        <input type="radio" id="orderRequest02" name="orderRequest" />
                        <label htmlFor="orderRequest02" className="btn bdr medium">
                          <strong>없음</strong>
                        </label>
                      </div>
                    </div>

                    <div className="field">
                      <span className="label">결제 수단</span>
                      <div className="select-group col-3">
                        <input type="radio" id="orderPayment01" name="orderPayment" />
                        <label htmlFor="orderPayment01" className="btn bdr medium">
                          <strong>
                            충전카드
                            <br />
                            30,000원
                          </strong>
                        </label>

                        <input type="radio" id="orderPayment02" name="orderPayment" />
                        <label htmlFor="orderPayment02" className="btn bdr medium">
                          <strong>삼성페이</strong>
                        </label>

                        <input type="radio" id="orderPayment03" name="orderPayment" />
                        <label htmlFor="orderPayment03" className="btn bdr medium">
                          <strong>신용 / 체크카드</strong>
                        </label>

                        <input type="radio" id="orderPayment04" name="orderPayment" />
                        <label htmlFor="orderPayment04" className="btn bdr medium">
                          <strong>페이코인</strong>
                        </label>

                        <input type="radio" id="orderPayment05" name="orderPayment" />
                        <label htmlFor="orderPayment05" className="btn bdr medium">
                          <strong>휴대폰</strong>
                        </label>

                        <input type="radio" id="orderPayment06" name="orderPayment" />
                        <label htmlFor="orderPayment06" className="btn bdr medium">
                          <strong>카카오 페이</strong>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </section>
            {/* // 주문하기 */}

            <div className="fixed-con active">
              <div className="popup">
                <div className="popup-wrap">
                  <div className="popup-body">
                    <div className="item info-order">
                      <dl className="flex-both total">
                        <dt className="title">
                          <span className="en">Total</span>
                        </dt>
                        <dd className="price">
                          <strong>2,400원</strong>
                        </dd>
                      </dl>
                      {/* [D] 할인 적용 시 노출 
                                    <dl className="flex-both">
                                        <dt className="title">
                                            쿠폰 할인 <span className="coupon">[FREE 음료 쿠폰]</span>
                                        </dt>
                                        <dd className="price">-2,400원</dd>
                                    </dl>
                                    <dl className="flex-both">
                                        <dt className="title">
                                            멤버십 할인
                                        </dt>
                                        <dd className="price">0원</dd>
                                    </dl>
                                    */}
                    </div>
                    <div className="item info-order">
                      <dl className="flex-both total">
                        <dt className="title">최종 결제 금액</dt>
                        <dd className="price fc-orange">2,400원</dd>
                      </dl>
                    </div>
                  </div>

                  <div className="btn-area">
                    <button className="btn full x-large dark" onClick={() => handleOrder()}>
                      주문하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
