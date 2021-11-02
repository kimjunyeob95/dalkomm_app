/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, moveScrollTop, tabLink, fadeInOut } from "Jquery/Jquery";

import { Swiper } from "swiper/react";
import SwiperCore from "swiper/core";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";

export default function OrderInfo() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const history = useHistory();
  const { orderCode } = useParams();
  const body = {};
  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };

  const axiosFn = () => {
    axios.all([axios.get(`${SERVER_DALKOMM}/app/api/v2/smartorder/orderinfo?orderinfo_id=${orderCode}`, header_config)]).then(
      axios.spread((res1) => {
        let res1_data = res1.data.data;
        setData((origin) => {
          return {
            ...origin,
            res1_data,
          };
        });
      })
    );
  };

  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (state.auth !== "") {
      axiosFn();
    }
  }, [state?.auth]);

  useEffect(() => {
    contGap();
  }, [axioData]);
  const handleF5 = () => {
    axiosFn();
  };

  const handleReorder = () => {
    console.log("재주문");
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header">
              <h1 className="page-title">주문 정보 상세</h1>
              <button type="button" className="btn back" onClick={() => history.push("/mypage/orderRecipt")}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
              <div className="btn-area flex-center">
                <button type="button" className="btn" onClick={() => handleF5()}>
                  <i className="ico refresh">
                    <span>새로고침</span>
                  </i>
                </button>
              </div>
            </header>

            <div id="content" className="drink order info-detail">
              <section className="section">
                <div className="w-inner">
                  <div className="item describe flex-both">
                    <div className="number">
                      <strong className="no">No.{axioData?.res1_data?.orderinfo_id}</strong>
                      <span className="time">({axioData?.res1_data?.order_date})</span>
                    </div>
                    <div
                      className={`badge order-state ${
                        axioData?.res1_data.order_status === 2
                          ? "receipt"
                          : axioData?.res1_data.order_status === 3
                          ? "making"
                          : axioData?.res1_data.order_status === 4
                          ? "complete"
                          : axioData?.res1_data.order_status === 5
                          ? "cancel"
                          : ""
                      }`}
                    >
                      {axioData?.res1_data.order_status === 2
                        ? "주문 접수"
                        : axioData?.res1_data.order_status === 3
                        ? "제조 중"
                        : axioData?.res1_data.order_status === 4
                        ? "제조완료"
                        : axioData?.res1_data.order_status === 5
                        ? "주문취소"
                        : ""}
                    </div>{" "}
                    {/* [D] .badge.order-state 상태 클래스명
                .badge.order-state.receipt : 주문 접수,
                .badge.order-state.making : 제조 중 /
                .badge.order-state.complete : 제조완료 /
                .badge.order-state.cancel : 주문취소  */}
                  </div>
                </div>
              </section>

              <section className="section">
                <div className="w-inner">
                  <form className="form">
                    <fieldset className="fieldset">
                      <div className="field">
                        <span className="label">주문 정보</span>
                        <ul className="order-list data-list">
                          {axioData?.res1_data?.smartorder_detail_list?.map((element, index) => (
                            <li key={index}>
                              <div className="item order">
                                <div className="detail-wrap">
                                  <div className="order-info">
                                    <p className="title">{element?.menu_name_kor}</p>
                                    <p className="info">
                                      <span className="en">
                                        {element?.smart_order_menu?.get_summary_option?.filter((e, i) => {
                                          let array = ["HOT", "ICE"];
                                          if (array.indexOf(e) > -1) {
                                            return e;
                                          }
                                        })}
                                      </span>
                                      <span className="en">
                                        {element?.smart_order_menu?.get_summary_option.filter((e, i) => {
                                          let array = ["레귤러", "라지", "코끼리"];
                                          if (array.indexOf(e) > -1) {
                                            return e;
                                          }
                                        })}
                                      </span>
                                      <span>
                                        {element?.smart_order_menu?.get_summary_option.filter((e, i) => {
                                          let array = ["다회용 컵", "일회용 컵", "개인컵(-300원)"];
                                          if (array.indexOf(e) > -1) {
                                            return e;
                                          }
                                        })}
                                      </span>
                                      <span>
                                        {element?.smart_order_menu?.get_summary_option
                                          .filter((e, i) => {
                                            let array = ["HOT", "ICE", "레귤러", "라지", "코끼리", "다회용 컵", "일회용 컵", "개인컵(-300원)"];
                                            return array.indexOf(e) < 0;
                                          })
                                          .map((e, i) => {
                                            if (i === 0) {
                                              return <React.Fragment key={i}>{e}</React.Fragment>;
                                            } else {
                                              return <React.Fragment key={i}>, {e}</React.Fragment>;
                                            }
                                          })}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="price-wrap flex-both">
                                    <p className="amount">
                                      수량&nbsp;:<span>{element?.smart_order_menu?.quantity}</span>{" "}
                                    </p>
                                    <p className="price">
                                      <strong>{element?.smart_order_menu?.order_amount.toLocaleString("ko-KR")}원</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="field">
                        <span className="label">결제 정보</span>
                        <div className="item info-order">
                          <dl className="flex-both total">
                            <dt className="title">
                              <span>총 상품 금액</span>
                            </dt>
                            <dd className="price">
                              <strong>{axioData?.res1_data?.total_order_amount.toLocaleString("ko-KR")}원</strong>
                            </dd>
                          </dl>
                          {axioData?.res1_data?.total_coupon_discount_amount > 0 && (
                            <dl className="flex-both">
                              <dt className="title">
                                쿠폰 할인 <span className="coupon">[FREE 음료 쿠폰]</span>
                              </dt>
                              <dd className="price">-{axioData?.res1_data?.total_coupon_discount_amount.toLocaleString("ko-KR")}원</dd>
                            </dl>
                          )}
                          {axioData?.res1_data?.basic_discount_amount > 0 && (
                            <dl className="flex-both">
                              <dt className="title">
                                멤버십 할인 <span className="grade">[PLETINUM]</span>
                              </dt>
                              <dd className="price">-{axioData?.res1_data?.basic_discount_amount.toLocaleString("ko-KR")}원</dd>
                            </dl>
                          )}
                          {axioData?.res1_data?.affiliate_discount > 0 && (
                            <dl className="flex-both flex-center">
                              <dt className="title">KT 멤버십 할인</dt>
                              <dd>-{axioData?.res1_data?.affiliate_discount.toLocaleString("ko-KR")}원</dd>
                            </dl>
                          )}
                          <dl className="flex-both total">
                            <dt className="title">
                              <strong>최종 결제 금액</strong>
                            </dt>
                            <dd className="price fc-orange">
                              <strong>{axioData?.res1_data?.total_pay_amount.toLocaleString("ko-KR")}원</strong>
                            </dd>
                          </dl>
                        </div>
                      </div>

                      <div className="field">
                        <span className="label">고객 정보</span>
                        <div className="item info-customer">
                          <ul className="data-list">
                            <li>
                              <dl className="flex-list">
                                <dt className="title">주문 일자</dt>
                                <dd className="text">{axioData?.res1_data?.order_date}</dd>
                              </dl>
                            </li>
                            <li>
                              <dl className="flex-list">
                                <dt className="title">주문 번호</dt>
                                <dd className="text">{axioData?.res1_data?.orderinfo_id}</dd>
                              </dl>
                            </li>
                            <li>
                              <dl className="flex-list">
                                <dt className="title">주문 매장</dt>
                                <dd className="text">
                                  <span>{axioData?.res1_data?.order_store}</span>
                                  <a className="btn tel">{axioData?.res1_data?.order_store_mobile}</a>
                                </dd>
                              </dl>
                            </li>
                            <li>
                              <dl className="flex-list">
                                <dt className="title">매장 주문 번호</dt>
                                <dd className="text">{axioData?.res1_data?.order_num_in_store}</dd>
                              </dl>
                            </li>
                            <li>
                              <dl className="flex-list">
                                <dt className="title">포장 옵션</dt>
                                <dd className="text">{axioData?.res1_data?.carrier_package}</dd>
                              </dl>
                            </li>
                            <li>
                              <dl className="flex-list">
                                <dt className="title">결제 수단</dt>
                                <dd className="text">
                                  {axioData?.res1_data?.pay_method === "충전카드" ? "기프트카드" : axioData?.res1_data?.pay_method}
                                </dd>
                              </dl>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                  {axioData?.res1_data.order_status === 2 || axioData?.res1_data.order_status === 3 ? (
                    <div className="alert-wrap">
                      <div className="item order-alert">
                        <i className="ico alert-w">
                          <span>알림</span>
                        </i>
                        <p className="text">
                          취소는 주문이 들어간 매장에서 가능합니다.
                          <br />
                          단, 제조가 시작되었을 경우에는 취소가 불가능합니다.
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </section>
              {axioData?.res1_data.order_status === 4 || axioData?.res1_data.order_status === 5 ? (
                <div className="fixed-con active">
                  <div className="popup">
                    <div className="popup-wrap">
                      <div className="btn-area">
                        <a className="btn full x-large dark" onClick={() => handleReorder()}>
                          바로 주문하기
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
