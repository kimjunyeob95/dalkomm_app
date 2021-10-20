/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-script-url */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";
import { checkMobile } from "Config/GlobalJs";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";

export default function OrderFinal() {
  const history = useHistory();
  const { smartOrderSeq } = useParams();
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const [frontData, setFront] = useState({});
  const location = useLocation();

  const body = {};
  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
      "X-DALKOMM-STORE": state.udid,
    },
  };

  useEffect(() => {
    axios
      .all([
        axios.get(
          `${SERVER_DALKOMM}/app/api/v2/smartorder/order?orderinfo_id=${smartOrderSeq}`,
          header_config
        ),
      ])
      .then(
        axios.spread((res1) => {
          let res1_data = res1.data.data;

          if (location?.frontValue) {
            setFront((origin) => {
              return location?.frontValue;
            });
          } else {
            setFront((origin) => {
              return {
                ...origin,
                finalPrice: res1_data.total_order_amount,
                orderPayment: res1_data.default_pay_method,
                orderRequest: 0,
                smartOrderSeq: smartOrderSeq,
              };
            });
          }

          setData((origin) => {
            return {
              ...origin,
              res1_data,
            };
          });
        })
      );
  }, [state?.auth]);
  console.log(axioData);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    contGap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // location?.frontValue && $(document).scrollTop($(document).height());
  }, [axioData]);

  const handlePayMethod = (value) => {
    setFront((origin) => {
      return {
        ...origin,
        orderPayment: value,
      };
    });
  };

  const handleOrderRequest = (value) => {
    setFront((origin) => {
      return {
        ...origin,
        orderRequest: value,
      };
    });
  };
  const handleMembership = (flag) => {
    // if (flag === "불가능") {
    //   alert("멤버십 할인이 불가능한 매장입니다.");
    // } else {
    //   history.push({
    //     pathname: "/order/membership",
    //     frontValue: frontData,
    //   });
    // }
    history.push({
      pathname: "/order/membership",
      frontValue: frontData,
    });
  };

  const handleSubmit = () => {
    let validation = true;
    let menu_coupon_array = [];

    let target_value = {
      store_code: axioData?.res1_data?.store?.store_code,
      orderinfo_id: Number(smartOrderSeq),
      order_user_name: axioData?.res1_data?.order_user_name,
      order_user_mobile: axioData?.res1_data?.order_user_mobile,
      carrier_package: Number(frontData?.orderRequest),
      pay_method: frontData?.orderPayment,
      // order_menu_coupon: [{ smartorder_menu_id: 3209, user_coupon_ids: [] }],
      order_menu_coupon: [],
    };
    let result = {
      type: "post",
      link: `${SERVER_DALKOMM}/app/web/smartorder/order/to/pay/v2`,
      value: target_value,
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
  };

  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub
              title="주문하기"
              redirectBack={true}
              location={`/order/menu/${axioData?.res1_data?.store?.store_code}`}
            />

            <div id="content" className="drink order">
              <div className="store-search-wrap w-inner">
                <div className="item store-search">
                  <div className="flex-both">
                    <dl className="detail-wrap flex-start">
                      <dt className="title">선택매장</dt>
                      <dd className="place">
                        {axioData?.res1_data?.store?.store_name}
                      </dd>
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
                          {axioData?.res1_data?.smartorder_detail_list?.map(
                            (element, index) => (
                              <li key={index}>
                                <div className="item order">
                                  <div className="img-wrap">
                                    <img
                                      src={element?.smartorder_menu_img}
                                      alt={element?.menu_name_kor}
                                    />
                                  </div>
                                  <div className="detail-wrap">
                                    <div className="order-info">
                                      <p className="title">
                                        {element?.menu_name_kor}
                                      </p>

                                      <p className="info">
                                        <span className="en">
                                          {element?.get_summary_option.filter(
                                            (e, i) => {
                                              let array = ["HOT", "ICE"];
                                              if (array.indexOf(e) > -1) {
                                                return e;
                                              }
                                            }
                                          )}
                                        </span>
                                        <span className="en">
                                          {element?.get_summary_option.filter(
                                            (e, i) => {
                                              let array = [
                                                "레귤러",
                                                "라지",
                                                "코끼리",
                                              ];
                                              if (array.indexOf(e) > -1) {
                                                return e;
                                              }
                                            }
                                          )}
                                        </span>
                                        <span>
                                          {element?.get_summary_option.filter(
                                            (e, i) => {
                                              let array = [
                                                "다회용 컵",
                                                "일회용 컵",
                                                "개인컵(-300원)",
                                              ];
                                              if (array.indexOf(e) > -1) {
                                                return e;
                                              }
                                            }
                                          )}
                                        </span>
                                      </p>
                                      <p className="option flex-both">
                                        <span>
                                          {element?.get_summary_option
                                            .filter((e, i) => {
                                              let array = [
                                                "HOT",
                                                "ICE",
                                                "레귤러",
                                                "라지",
                                                "코끼리",
                                                "다회용 컵",
                                                "일회용 컵",
                                                "개인컵(-300원)",
                                              ];
                                              return array.indexOf(e) < 0;
                                            })
                                            .map((e, i) => {
                                              if (i === 0) {
                                                return (
                                                  <React.Fragment key={i}>
                                                    {e}
                                                  </React.Fragment>
                                                );
                                              } else {
                                                return (
                                                  <React.Fragment key={i}>
                                                    , {e}
                                                  </React.Fragment>
                                                );
                                              }
                                            })}
                                          {/* <span>
                                        <em className="en">Option :</em>샷 추가
                                      </span>
                                      <span>
                                        <em>횟수 :</em>1
                                      </span> */}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="price-wrap flex-both">
                                      <p className="price">
                                        수량&nbsp; :
                                        <span>{element?.quantity}</span>{" "}
                                      </p>
                                      <p className="price fc-orange">
                                        {(
                                          (element?.price +
                                            element?.option_price) *
                                          element?.quantity
                                        ).toLocaleString("ko-KR")}
                                        원
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <select className="select medium">
                                  <option value="">
                                    쿠폰을 선택해 주세요.
                                  </option>
                                  {element?.user_coupon_detail_list?.map(
                                    (e, i) => (
                                      <option
                                        key={i}
                                        value={e?.user_coupon_id}
                                        data-price={e?.discount_price}
                                        data-oneplus={e?.is_one_plus_one}
                                      >
                                        {e?.coupon_name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="field">
                        <span className="label">
                          요청사항
                          <span className="alert">
                            <i className="ico alert"></i>빙수제품은 별도 포장을
                            제공하지 않습니다.
                          </span>
                        </span>
                        <div className="select-group col-2">
                          <input
                            type="radio"
                            id="orderRequest01"
                            onClick={() => handleOrderRequest(1)}
                            defaultChecked={frontData?.orderRequest === 1}
                            name="orderRequest"
                          />
                          <label
                            htmlFor="orderRequest01"
                            className="btn bdr medium"
                          >
                            <strong>캐리어 포장</strong>
                          </label>
                          <input
                            type="radio"
                            onClick={() => handleOrderRequest(0)}
                            defaultChecked={frontData?.orderRequest === 0}
                            id="orderRequest02"
                            name="orderRequest"
                          />
                          <label
                            htmlFor="orderRequest02"
                            className="btn bdr medium"
                          >
                            <strong>없음</strong>
                          </label>
                        </div>
                      </div>

                      <div className="field">
                        <span className="label">결제 수단</span>
                        <div className="select-group col-3">
                          {axioData?.res1_data?.pay_methods?.map((e, i) => (
                            <React.Fragment key={i}>
                              {i === 0 ? (
                                <React.Fragment>
                                  <input
                                    type="radio"
                                    defaultChecked={
                                      e?.pay_method === frontData?.orderPayment
                                    }
                                    defaultValue={e?.pay_method}
                                    id={`orderPayment0${i}`}
                                    name="orderPayment"
                                    onClick={() =>
                                      handlePayMethod(e?.pay_method)
                                    }
                                  />
                                  <label
                                    htmlFor={`orderPayment0${i}`}
                                    className="btn bdr medium"
                                  >
                                    {e?.name === "충전카드" ? (
                                      <strong>
                                        {e?.name}
                                        <br />
                                        {e?.balance?.toLocaleString("ko-KR") +
                                          "원"}
                                      </strong>
                                    ) : (
                                      <strong>{e?.name}</strong>
                                    )}
                                  </label>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <input
                                    type="radio"
                                    defaultChecked={
                                      e?.pay_method === frontData?.orderPayment
                                    }
                                    defaultValue={e?.pay_method}
                                    id={`orderPayment0${i}`}
                                    name="orderPayment"
                                    onClick={() =>
                                      handlePayMethod(e?.pay_method)
                                    }
                                  />
                                  <label
                                    htmlFor={`orderPayment0${i}`}
                                    className="btn bdr medium"
                                  >
                                    {e?.name === "충전카드" ? (
                                      <strong>
                                        {e?.name}
                                        <br />
                                        {e?.balance?.toLocaleString("ko-KR") +
                                          "원"}
                                      </strong>
                                    ) : (
                                      <strong>{e?.name}</strong>
                                    )}
                                  </label>
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          ))}
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
                              <strong>
                                {axioData?.res1_data?.total_order_amount?.toLocaleString(
                                  "ko-KR"
                                )}
                                원
                              </strong>
                            </dd>
                          </dl>

                          <dl className="flex-both">
                            <dt className="title">
                              쿠폰 할인 <span className="coupon"></span>
                            </dt>
                            <dd className="price">0원</dd>
                          </dl>
                          <dl className="flex-both">
                            {axioData?.res1_data?.basic_discount_rate_percent >
                            0 ? (
                              <React.Fragment>
                                <dt className="title">
                                  멤버십 할인{" "}
                                  <span className="grade">[PLETINUM]</span>
                                </dt>
                                <dd className="price">
                                  {axioData?.res1_data
                                    ?.basic_discount_rate_percent + "%할인"}
                                </dd>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <dt className="title">
                                  멤버십 할인 <span className="grade"></span>
                                </dt>
                                <dd className="price">0원</dd>
                              </React.Fragment>
                            )}
                          </dl>
                          <dl className="flex-both flex-center">
                            <dt className="title">KT 멤버십 할인</dt>
                            <dd>
                              {axioData?.res1_data
                                ?.available_affiliate_discount ? (
                                <a
                                  className="btn verify"
                                  onClick={() => handleMembership()}
                                >
                                  인증하기
                                </a>
                              ) : (
                                <a
                                  className="btn verify"
                                  onClick={() => handleMembership("불가능")}
                                >
                                  인증하기
                                </a>
                              )}
                            </dd>
                          </dl>
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
                      {/* [D] 211006 .item.info-order 삭제 
  
                                  <div className="item info-order">
                                      <dl className="flex-both total">
                                          <dt className="title">
                                              <span className="en">Total</span>
                                          </dt>
                                          <dd className="price"><strong>2,400원</strong></dd>
                                      </dl>
                                      [D] 할인 적용 시 노출 
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
                                  </div>
                                  
                                  // [D] 211006 .item.info-order 삭제 */}

                      <div className="item info-order">
                        <dl className="flex-both total">
                          <dt className="title">최종 결제 금액</dt>
                          <dd className="price fc-orange">
                            {frontData?.finalPrice?.toLocaleString("ko-KR")}원
                          </dd>
                        </dl>
                      </div>
                    </div>

                    <div className="btn-area">
                      <a
                        className="btn full x-large dark"
                        onClick={() => handleSubmit()}
                      >
                        주문하기
                      </a>
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
  } else return <React.Fragment></React.Fragment>;
}
