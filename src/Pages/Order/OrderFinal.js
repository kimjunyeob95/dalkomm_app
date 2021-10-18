/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import $ from "jquery";
import React, { useEffect, useState } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

export default function OrderFinal() {
  const history = useHistory();
  const location = useLocation();
  const { smartOrderSeq } = useParams();

  let orderData_json = {};

  if (location?.from === "orderDetail") {
    location?.orderData?.forEach(function (value, key) {
      orderData_json[key] = value;
    });
  }
  const handleOrder = () => {
    alert("주문하기 버튼 클릭");
    history.push("/order");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    contGap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMembership = () => {
    history.push("/order/membership");
  };
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
                      {location?.from === "orderDetail" && (
                        <ul className="order-list data-list">
                          <li>
                            <div className="item order">
                              <div className="img-wrap">
                                <img src={orderData_json?.orderImg} alt={orderData_json?.orderName} />
                              </div>
                              <div className="detail-wrap">
                                <div className="order-info">
                                  <p className="title">{orderData_json?.orderName}</p>
                                  <p className="info">
                                    <span className="en">{orderData_json?.orderType}</span>
                                    <span className="en">{orderData_json?.orderSize}</span>
                                    <span>{orderData_json?.orderCup} 컵</span>
                                  </p>
                                  {orderData_json?.orderOption !== "선택 안함" ? (
                                    orderData_json?.orderOption === "휘핑크림" ? (
                                      <p className="option flex-both">
                                        <span>
                                          <em className="en">Option :</em>
                                          {orderData_json?.orderOption}
                                        </span>
                                      </p>
                                    ) : (
                                      <p className="option flex-both">
                                        <span>
                                          <em className="en">Option :</em>
                                          {orderData_json?.orderOption}
                                        </span>
                                        <span>
                                          <em>횟수 :</em>
                                          {orderData_json?.optionCount}
                                        </span>
                                      </p>
                                    )
                                  ) : (
                                    <p className="option flex-both">
                                      <span>
                                        <em className="en">Option :</em>
                                        {orderData_json?.orderOption}
                                      </span>
                                    </p>
                                  )}
                                </div>
                                <div className="price-wrap flex-both">
                                  <p className="price">
                                    수량&nbsp; :<span>{orderData_json?.orderCount}</span>{" "}
                                  </p>
                                  <p className="price fc-orange">{Number(orderData_json?.sumPrice)?.toLocaleString()}원</p>
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
                      )}
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

                    {/* [D] 20211006 마크업 추가 */}
                    <div className="field">
                      <span className="label en">Total</span>
                      <div className="item info-order">
                        <dl className="flex-both total">
                          <dt className="title">
                            <span>총 상품 금액</span>
                          </dt>
                          <dd className="price">
                            <strong>2,400원</strong>
                          </dd>
                        </dl>

                        <dl className="flex-both">
                          <dt className="title">
                            쿠폰 할인 <span className="coupon">[FREE 음료 쿠폰]</span>
                          </dt>
                          <dd className="price">-2,400원</dd>
                        </dl>
                        <dl className="flex-both">
                          <dt className="title">
                            멤버십 할인 <span className="grade">[PLETINUM]</span>
                          </dt>
                          <dd className="price">0원</dd>
                        </dl>
                        <dl className="flex-both flex-center">
                          <dt className="title">KT 멤버십 할인</dt>
                          <dd>
                            <a className="btn verify" onClick={() => handleMembership()}>
                              인증하기
                            </a>
                          </dd>
                        </dl>
                        {/* <dl className="flex-both flex-center">
                          <dt className="title">KT 멤버십 할인</dt>
                          <dd className="price">-500원</dd>
                        </dl> */}
                      </div>
                    </div>
                    {/* // [D] 20211006 마크업 추가 */}
                  </fieldset>
                </form>
              </div>
            </section>
            {/* // 주문하기 */}

            <div className="fixed-con active">
              <div className="popup">
                <div className="popup-wrap">
                  <div className="popup-body">
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

                    <div className="item info-order">
                      <dl className="flex-both total">
                        <dt className="title">최종 결제 금액</dt>
                        {location?.from === "orderDetail" ? (
                          <dd className="price fc-orange">{Number(orderData_json?.sumPrice)?.toLocaleString()}원</dd>
                        ) : null}
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
