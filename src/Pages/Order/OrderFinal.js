/* eslint-disable no-undef */
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
import { checkMobile, fadeOut } from "Config/GlobalJs";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";

import orderjson from "Pages/Order/Order";

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
      // "X-DALKOMM-STORE": state.udid,
    },
  };

  useEffect(() => {
    axios.all([axios.get(`${SERVER_DALKOMM}/app/api/v2/smartorder/order?orderinfo_id=${smartOrderSeq}`, header_config)]).then(
      axios.spread((res1) => {
        let res1_data = res1.data.data;
        let menu_array = [];
        // res1_data = orderjson.data;
        [...new Array(res1_data?.total_order_count)]?.map((element, index) => {
          menu_array.push({ quantity: 1, couponId: "" });
        });
        if (location?.frontValue) {
          //kt 제휴할인페이지에서 접근시
          setFront((origin) => {
            return location?.frontValue;
          });
        } else {
          let finalPrice = res1_data.total_order_amount;
          let discountType = "";
          if (res1_data?.basic_discount_rate_percent > 0 && !res1_data?.affiliate_discount) {
            //맴버십 할인이 포함될경우
            finalPrice = res1_data.total_order_amount - res1_data.total_order_amount * (res1_data?.basic_discount_rate_percent / 100);
            discountType = "platinum";
          }
          if (res1_data?.affiliate_discount) {
            //제휴 할인이 적용되있을경우
            finalPrice -= 500;
            discountType = "ktmembership";
          }
          finalPrice = finalPrice - (finalPrice % 10);
          setFront((origin) => {
            let discountPrice = res1_data.total_order_amount - finalPrice;
            return {
              ...origin,
              defaultPrice: res1_data.total_order_amount,
              finalPrice: finalPrice,
              orderPayment: res1_data.default_pay_method,
              orderRequest: 0,
              menuQuantity: menu_array,
              smartOrderSeq: smartOrderSeq,
              couponDiscount: 0,
              orderDiscountType: {
                type: res1_data?.basic_discount_rate_percent > 0 && !res1_data?.affiliate_discount ? discountType : "",
                price: discountPrice,
              },
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

  useEffect(() => {
    contGap();
    location?.frontValue &&
      window.scrollTo({
        top: $(document).height(),
        behavior: "smooth",
      });
    fadeOut();
  }, [axioData]);

  const selectOption = (index) => {
    let result = frontData?.menuQuantity[index]?.couponId !== "" && frontData?.menuQuantity[index]?.couponId;
    return result;
  };

  const disabledOption = (index, couponId) => {
    let result = false;
    frontData?.menuQuantity.map((e, i) => {
      if (Number(e.couponId) === couponId) {
        result = true;
      }
    });
    return result;
  };
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
    if (flag === "불가능") {
      alert("멤버십 할인이 불가능한 매장입니다.");
    } else {
      history.push({
        pathname: `/order/membership/${smartOrderSeq}`,
        frontValue: frontData,
      });
    }
    // history.push({
    //   pathname: "/order/membership",
    //   frontValue: frontData,
    // });
  };
  const handleSubmit = () => {
    let validation = true;
    let menu_coupon_array = [];
    let user_coupon_ids = [];
    axioData?.res1_data?.smartorder_detail_list?.map((e, i) => {
      menu_coupon_array.push({
        smartorder_menu_id: e?.smartorder_menu_id,
        user_coupon_ids,
      });
    });
    menu_coupon_array.map((e, i) => {
      user_coupon_ids = [];
      $(`.couponSelect-${e?.smartorder_menu_id}`).each(function (index, element) {
        if ($(element).attr("data-value")) {
          user_coupon_ids.push(Number($(element).attr("data-value")));
        }

        if ($(`.couponSelect-${e.smartorder_menu_id}`).length - 1 === index) {
          menu_coupon_array[i] = {
            smartorder_menu_id: e?.smartorder_menu_id,
            user_coupon_ids,
          };
        }
      });
    });
    menu_coupon_array = menu_coupon_array.filter((e, i) => e?.user_coupon_ids?.length > 0);

    let target_value = {
      store_code: axioData?.res1_data?.store?.store_code,
      orderinfo_id: Number(smartOrderSeq),
      order_user_name: axioData?.res1_data?.order_user_name,
      order_user_mobile: axioData?.res1_data?.order_user_mobile,
      carrier_package: Number(frontData?.orderRequest),
      pay_method: frontData?.orderPayment,
      order_menu_coupon: menu_coupon_array,
    };
    let result = {
      type: "post",
      link: `${SERVER_DALKOMM}/app/web/smartorder/order/to/pay/v2`,
      value: target_value,
      title: "메뉴 결제",
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

  const handleCoupon = (defaultPrice, target, index, index2) => {
    let couponId = $(target).val();
    let couponPrice = Number($(target).children("option:selected").data("price"));
    let couponValue = $(target).children("option:selected").val();

    $(target).attr("data-value", $(target).val());

    let discountPrice = 0;
    let oneplusArray = [];

    //쿠폰 선택시 다른 곳에서 선택 못하게 제어
    let select_coponid = [];
    $(".couponSelect option:selected").each(function (i, e) {
      if ($(e).val() !== "") {
        select_coponid.push($(e).val());
      }
    });
    $(".couponSelect option").each(function (index, e) {
      if (select_coponid.indexOf($(e).val()) > -1) {
        $(e).attr("disabled", true);
      } else {
        $(e).attr("disabled", false);
      }
    });

    $(".couponSelect").each(function (i, e) {
      let couponOneplus = $(e).children("option:selected").data("oneplus");
      let couponId = $(e).children("option:selected").val();
      if ($(e).attr("data-value") && couponOneplus === false) {
        //할인 쿠폰 선택시
        discountPrice += Number($(e).children("option:selected").data("price"));
      }

      //1+1 쿠폰 선택 처리
      if ($(e).attr("data-value") && couponOneplus === true) {
        oneplusArray.push({
          idx: i,
          quantity: 2,
          type: "추가",
          couponId: couponId,
        });
      } else if (!$(e).attr("data-value") || couponOneplus === false) {
        oneplusArray.push({ idx: i, quantity: 1, couponId: couponId });
      }
      if (i === $(".couponSelect").length - 1) {
        $("#coupon-discount").text("-" + discountPrice.toLocaleString("ko-KR") + "원");

        //다른 할인 적용 false 시키기
        setFront((origin) => {
          return {
            ...origin,
            menuQuantity: oneplusArray,
            smartOrderSeq: smartOrderSeq,
            finalPrice: origin.defaultPrice - discountPrice,
            orderDiscountType: {
              type: axioData?.res1_data?.basic_discount_rate_percent > 0 && !axioData?.res1_data?.affiliate_discount ? "coupon" : "",
              price: discountPrice,
            },
          };
        });
      }
    });
  };
  let menu_count = -1;
  console.log(axioData);
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <form id="form" method="post">
            {/* <input type="hidden" name="value" defaultValue=""></input> */}
          </form>
          <div id="container" className="container">
            <HeaderSub title="주문하기" redirectBack={true} location={`/order/menu/${axioData?.res1_data?.store?.store_code}`} />

            <div id="content" className="drink order fade-in">
              {/*[D] 211021 고객 정보 마크업 추가 */}
              <section className="section">
                <div className="w-inner">
                  <div className="field">
                    <div className="item order-detail">
                      <div className="flex-both">
                        <span className="label">고객 정보</span>
                        <span className="customer">
                          <em>{axioData?.res1_data?.order_user_name}</em> <em>/</em> <em>{axioData?.res1_data?.order_user_mobile}</em>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/*// [D] 211021 고객 정보 마크업 추가 */}

              {/*[D] 211021 주문 매장 마크업 추가 */}
              <section className="section">
                <div className="w-inner">
                  <div className="field">
                    <div className="item order-detail">
                      <div className="flex-both">
                        <span className="label">주문 매장</span>
                        <span className="store">{axioData?.res1_data?.store?.store_name}</span>
                      </div>
                      <span className="address">{axioData?.res1_data?.store?.store_address}</span>
                    </div>
                  </div>
                </div>
              </section>
              {/*// [D] 211021 주문 매장 마크업 추가 */}

              {/* 주문하기 */}
              <section className="section">
                <div className="w-inner">
                  <form className="form">
                    <fieldset className="fieldset">
                      <legend className="blind">주문하기</legend>
                      <div className="field">
                        <span className="label">주문 메뉴</span>
                        <ul className="order-list data-list">
                          {axioData?.res1_data?.smartorder_detail_list?.map((element, index) =>
                            [...new Array(element.quantity)].map((element2, index2) => {
                              menu_count++;
                              return (
                                <li key={index2}>
                                  <div className="item order">
                                    <div className="img-wrap">
                                      <img
                                        src={axioData?.res1_data?.smartorder_detail_list[index]?.smartorder_menu_img}
                                        alt={axioData?.res1_data?.smartorder_detail_list[index]?.menu_name_kor}
                                      />
                                    </div>
                                    <div className="detail-wrap">
                                      <div className="order-info">
                                        <p className="title">{axioData?.res1_data?.smartorder_detail_list[index]?.menu_name_kor}</p>

                                        <p className="info">
                                          <span className="en">
                                            {axioData?.res1_data?.smartorder_detail_list[index]?.get_summary_option.filter((e, i) => {
                                              let array = ["HOT", "ICE"];
                                              if (array.indexOf(e) > -1) {
                                                return e;
                                              }
                                            })}
                                          </span>
                                          <span className="en">
                                            {axioData?.res1_data?.smartorder_detail_list[index]?.get_summary_option.filter((e, i) => {
                                              let array = ["레귤러", "라지", "코끼리"];
                                              if (array.indexOf(e) > -1) {
                                                return e;
                                              }
                                            })}
                                          </span>
                                          <span>
                                            {axioData?.res1_data?.smartorder_detail_list[index]?.get_summary_option.filter((e, i) => {
                                              let array = ["다회용 컵", "일회용 컵", "개인컵(-300원)"];
                                              if (array.indexOf(e) > -1) {
                                                return e;
                                              }
                                            })}
                                          </span>
                                        </p>
                                        <p className="option flex-both">
                                          <span>
                                            {axioData?.res1_data?.smartorder_detail_list[index]?.get_summary_option
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
                                        <p className="price">
                                          수량&nbsp; :<span>{frontData?.menuQuantity[menu_count]?.quantity}</span>{" "}
                                        </p>
                                        <p className="price fc-orange">
                                          {(
                                            axioData?.res1_data?.smartorder_detail_list[index]?.price +
                                            axioData?.res1_data?.smartorder_detail_list[index]?.option_price
                                          ).toLocaleString("ko-KR")}
                                          원
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <select
                                    className={`select medium couponSelect couponSelect-${axioData?.res1_data?.smartorder_detail_list[index]?.smartorder_menu_id}`}
                                    data-menuid={axioData?.res1_data?.smartorder_detail_list[index]?.smartorder_menu_id}
                                    data-quantity={axioData?.res1_data?.smartorder_detail_list[index]?.quantity}
                                    data-index={index}
                                    onChange={(e) =>
                                      handleCoupon(
                                        (axioData?.res1_data?.smartorder_detail_list[index]?.price +
                                          axioData?.res1_data?.smartorder_detail_list[index]?.option_price) *
                                          axioData?.res1_data?.smartorder_detail_list[index]?.quantity,
                                        e.currentTarget,
                                        index,
                                        menu_count
                                      )
                                    }
                                    value={frontData?.orderDiscountType?.type === "coupon" && selectOption(menu_count)}
                                  >
                                    <option value="">쿠폰을 선택해 주세요.</option>
                                    {axioData?.res1_data?.smartorder_detail_list[index]?.user_coupon_detail_list?.map((e, i) => (
                                      <option
                                        key={i}
                                        value={e?.user_coupon_id}
                                        data-price={e?.discount_price}
                                        data-oneplus={e?.is_one_plus_one}
                                        disabled={disabledOption(menu_count, e?.user_coupon_id)}
                                      >
                                        {e?.coupon_name}
                                      </option>
                                    ))}
                                  </select>
                                </li>
                              );
                            })
                          )}
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
                          <input
                            type="radio"
                            id="orderRequest01"
                            onClick={() => handleOrderRequest(1)}
                            defaultChecked={frontData?.orderRequest === 1}
                            name="orderRequest"
                          />
                          <label htmlFor="orderRequest01" className="btn bdr medium">
                            <strong>캐리어 포장</strong>
                          </label>
                          <input
                            type="radio"
                            onClick={() => handleOrderRequest(0)}
                            defaultChecked={frontData?.orderRequest === 0}
                            id="orderRequest02"
                            name="orderRequest"
                          />
                          <label htmlFor="orderRequest02" className="btn bdr medium">
                            <strong>없음</strong>
                          </label>
                        </div>
                      </div>

                      <div className="field">
                        <span className="label">결제 수단</span>
                        <div className="select-group col-3">
                          {axioData?.res1_data?.pay_methods?.map((e, i) => (
                            <React.Fragment key={i}>
                              <input
                                type="radio"
                                defaultChecked={e?.pay_method === frontData?.orderPayment}
                                defaultValue={e?.pay_method}
                                id={`orderPayment0${i}`}
                                name="orderPayment"
                                onClick={() => handlePayMethod(e?.pay_method)}
                              />
                              <label htmlFor={`orderPayment0${i}`} className="btn bdr medium">
                                {e?.name === "충전카드" ? (
                                  <strong>
                                    기프트카드
                                    <br />
                                    {e?.balance?.toLocaleString("ko-KR") + "원"}
                                  </strong>
                                ) : e?.name === "페이코인 암호화폐 결제" ? (
                                  <strong>페이코인</strong>
                                ) : (
                                  <strong>{e?.name}</strong>
                                )}
                              </label>
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
                              <strong>{axioData?.res1_data?.total_order_amount?.toLocaleString("ko-KR")}원</strong>
                            </dd>
                          </dl>

                          <dl className="flex-both">
                            <dt className="title">
                              쿠폰 할인 <span className="coupon"></span>
                            </dt>
                            <dd className="price" id="coupon-discount">
                              {frontData?.orderDiscountType?.type === "coupon"
                                ? "-" + frontData?.orderDiscountType?.price?.toLocaleString("ko-KR") + "원"
                                : "-" + 0 + "원"}
                            </dd>
                          </dl>
                          <dl className="flex-both">
                            {frontData?.orderDiscountType?.type === "platinum" ? (
                              <React.Fragment>
                                <dt className="title">
                                  멤버십 5% 할인 <span className="grade">[PLETINUM]</span>
                                </dt>
                                <dd className="price">-{frontData?.orderDiscountType?.price.toLocaleString("ko-KR") + "원"}</dd>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <dt className="title">
                                  멤버십 5% 할인 <span className="grade"></span>
                                </dt>
                                <dd className="price">-0원</dd>
                              </React.Fragment>
                            )}
                          </dl>
                          {axioData?.res1_data?.affiliate_discount && (
                            <dl className="flex-both">
                              <dt className="title">
                                KT 제휴 할인 <span className="coupon"></span>
                              </dt>
                              <dd className="price">{axioData?.res1_data?.affiliate_discount?.discount_amount?.toLocaleString("ko-KR")}원</dd>
                            </dl>
                          )}
                          <dl className="flex-both flex-center">
                            <dt className="title">KT 제휴 할인</dt>
                            <dd>
                              {axioData?.res1_data?.is_available_affiliate ? (
                                <a className="btn verify" onClick={() => handleMembership()}>
                                  인증하기
                                </a>
                              ) : (
                                <a className="btn verify" onClick={() => handleMembership("불가능")}>
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
                          <dd className="price fc-orange">{frontData?.finalPrice?.toLocaleString("ko-KR")}원</dd>
                        </dl>
                      </div>
                    </div>

                    <div className="btn-area">
                      <a className="btn full x-large dark" onClick={() => handleSubmit()}>
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
