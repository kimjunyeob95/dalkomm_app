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
import { useHistory, useParams, useLocation } from "react-router-dom";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";
import { checkMobile, fadeOut } from "Config/GlobalJs";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";

import orderjson from "Pages/Order/Order";

export default function OderFinal_bak() {
  const history = useHistory();
  const { smartOrderSeq } = useParams();
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const [frontData, setFront] = useState({});
  const location = useLocation();

  let saveMethod = localStorage.getItem("saveMethod") ? localStorage.getItem("saveMethod") : "P";

  const body = {};
  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };
  let menu_array = [];
  let discountFlag = false;
  let finalPrice = 0;
  let discountType = false;
  let notOption_price = 0;

  const fn_discount_type = (res1_data, type) => {
    if (type === "all") {
      let flag_count = 0;
      res1_data.smartorder_detail_list?.map((element, index) => {
        if (element?.available_discount) {
          flag_count += 1;
        }
      });
      if (flag_count > 1) {
        res1_data.smartorder_detail_list?.map((element, index) => {
          let quantity = element?.price * element?.quantity;
          if (index > 0) {
            if (element?.available_discount) {
              notOption_price += quantity * (res1_data?.basic_discount_rate_percent / 100);
            }
          }
        });
      } else {
        let quantity = res1_data?.smartorder_detail_list[0]?.price * 1;
        notOption_price += quantity * (res1_data?.basic_discount_rate_percent / 100);
      }
      finalPrice = res1_data?.total_order_amount - notOption_price;
    } else if ("membership") {
      res1_data.smartorder_detail_list?.map((element, index) => {
        let quantity = element?.price * element?.quantity;
        if (element?.quantity > 1) {
          if (element?.available_discount) {
            notOption_price += quantity * (res1_data?.basic_discount_rate_percent / 100);
          }
        } else {
          if (element?.available_discount) {
            notOption_price += quantity * (res1_data?.basic_discount_rate_percent / 100);
          }
        }
      });

      finalPrice = res1_data?.total_order_amount - notOption_price;
    }
  };
  const fn_discount = (res1_data) => {
    if (res1_data?.total_order_count > 1) {
      //2??? ?????? ???????????? ???
      if (res1_data?.affiliate_discount && res1_data?.basic_discount_rate_percent > 0) {
        //kt ???????????? && ????????? ?????? ??????
        fn_discount_type(res1_data, "all");
        // finalPrice = res1_data?.total_order_amount - (finalPrice / res1_data?.total_order_count) * (res1_data?.basic_discount_rate_percent / 100);
        discountFlag = true;
        discountType = true;
      } else if (!res1_data?.affiliate_discount && res1_data?.basic_discount_rate_percent > 0) {
        //????????? ????????? ??????
        fn_discount_type(res1_data, "membership");

        discountType = true;
      } else if (res1_data?.affiliate_discount && res1_data?.basic_discount_rate_percent !== 5) {
        //kt ??????????????? ??????
        finalPrice = res1_data?.total_order_amount - 500;
        discountType = false;
      } else if (!res1_data?.affiliate_discount && res1_data?.basic_discount_rate_percent !== 5) {
        //?????? ?????? ?????? x
        finalPrice = res1_data?.total_order_amount;
      }
    } else if (res1_data?.total_order_count === 1) {
      //1??? ?????? ?????? ???
      if (res1_data?.affiliate_discount && res1_data?.basic_discount_rate_percent > 0) {
        //kt ???????????? && ????????? ????????? ?????? ?????? ??? KT ???????????? ?????????
        finalPrice = res1_data?.total_order_amount - 500;
        discountType = false;
      } else if (!res1_data?.affiliate_discount && res1_data?.basic_discount_rate_percent > 0) {
        //????????? ????????? ??????
        fn_discount_type(res1_data, "membership");
        discountType = true;
      } else if (res1_data?.affiliate_discount && res1_data?.basic_discount_rate_percent !== 5) {
        //kt ??????????????? ??????
        finalPrice = res1_data?.total_order_amount - 500;
        discountType = false;
      } else if (!res1_data?.affiliate_discount && res1_data?.basic_discount_rate_percent !== 5) {
        //?????? ?????? ?????? x
        finalPrice = res1_data?.total_order_amount;
      }
    }
    finalPrice = finalPrice - (finalPrice % 10);
  };
  useEffect(() => {
    axios.all([axios.get(`${SERVER_DALKOMM}/app/api/v2/smartorder/order?orderinfo_id=${smartOrderSeq}`, header_config)]).then(
      axios.spread((res1) => {
        let res1_data = res1.data.data;

        // res1_data = orderjson;
        [...new Array(res1_data?.total_order_count)]?.map((element, index) => {
          menu_array.push({ quantity: 1, couponId: "" });
        });

        if (location?.frontValue) {
          //kt ??????????????????????????? ?????????
          fn_discount(res1_data);
          setFront((origin) => {
            let discountPrice = res1_data?.total_order_amount - finalPrice;
            discountFlag ? (finalPrice -= 500) : finalPrice; //????????????+??????????????? ?????? ?????????
            return {
              ...location?.frontValue,
              defaultPrice: res1_data?.total_order_amount,
              finalPrice: finalPrice,
              smartOrderSeq: smartOrderSeq,
              orderDiscountType: {
                ktFlag: res1_data?.affiliate_discount ? true : false,
                ktPrice: res1_data?.affiliate_discount ? res1_data?.affiliate_discount?.discount_amount : 0,
                couponFlag: false,
                couponPrice: 0,
                memberFlag: discountType,
                memberPrice: discountPrice,
              },
            };
          });
        } else {
          fn_discount(res1_data);
          setFront((origin) => {
            let discountPrice = res1_data?.total_order_amount - finalPrice;

            discountFlag ? (finalPrice -= 500) : finalPrice; //????????????+??????????????? ?????? ?????????
            return {
              ...origin,
              defaultPrice: res1_data?.total_order_amount,
              finalPrice: finalPrice,
              orderPayment: saveMethod,
              orderRequest: 0,
              menuQuantity: menu_array,
              smartOrderSeq: smartOrderSeq,
              orderDiscountType: {
                ktFlag: res1_data?.affiliate_discount ? true : false,
                ktPrice: res1_data?.affiliate_discount ? res1_data?.affiliate_discount?.discount_amount : 0,
                couponFlag: false,
                couponPrice: 0,
                memberFlag: discountType,
                memberPrice: discountPrice,
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
  }, []);

  useEffect(() => {
    contGap();
    // location?.frontValue &&
    //   window.scrollTo({
    //     top: $(document).height(),
    //     behavior: "smooth",
    //   });
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
    if (flag === "?????????") {
      alert("KT ?????? ????????? ???????????? ???????????????.");
    } else {
      history.push({
        pathname: `/order/membership/${smartOrderSeq}`,
        frontValue: frontData,
      });
    }
    // history.push({
    //   pathname: `/order/membership/${smartOrderSeq}`,
    //   frontValue: frontData,
    // });
  };
  const handleSubmit = () => {
    if (!$('input[name="orderPayment"]:checked').val()) {
      alert("?????? ????????? ??????????????????.");
      return false;
    }
    localStorage.setItem("saveMethod", $('input[name="orderPayment"]:checked').val());
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
    target_value = JSON.stringify(target_value);

    let result = {
      type: "get",
      link: `${SERVER_DALKOMM}/app/web/smartorder/order/to/pay/v2?value=${encodeURI(target_value)}`,
      title: "?????? ????????????",
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
    let couponActive_count = 0;
    let finalPrice = axioData?.res1_data?.total_order_amount;
    let MemberdiscountPrice = 0;
    $(target).attr("data-value", $(target).val());

    let discountPrice = 0;
    let oneplusArray = [];

    //?????? ????????? ?????? ????????? ?????? ????????? ??????
    let select_coponid = [];
    $(".select.medium").each(function (i, e) {
      if ($(e).attr("data-value") !== "" && $(e).attr("data-value") !== undefined) {
        select_coponid.push($(e).attr("data-value"));
      } else if ($(e).attr("data-value") === "" || $(e).attr("data-value") === undefined) {
        if (axioData?.res1_data?.total_order_count > 1) {
          if (axioData?.res1_data?.basic_discount_rate_percent > 0 && !axioData?.res1_data?.affiliate_discount) {
            //?????????????????? kt????????? ???????????????
            if (axioData?.res1_data?.basic_discount_rate_percent > 0) {
              if ($(this).attr("data-available_discount") === "true") {
                MemberdiscountPrice += Number($(e).data("originprice")) * 0.05;
              }
            }
          } else if (axioData?.res1_data?.affiliate_discount && i === 0) {
            return null;
          } else if (axioData?.res1_data?.affiliate_discount && i !== 0) {
            if (axioData?.res1_data?.basic_discount_rate_percent > 0) {
              if ($(this).attr("data-available_discount") === "true") {
                MemberdiscountPrice += Number($(e).data("originprice")) * 0.05;
              }
            }
          }
        } else if (axioData?.res1_data?.total_order_count === 1) {
          if (axioData?.res1_data?.basic_discount_rate_percent > 0 && !axioData?.res1_data?.affiliate_discount) {
            //kt????????? ?????????????????? ???????????????
            axioData?.res1_data?.basic_discount_rate_percent > 0
              ? (MemberdiscountPrice += Number($(e).data("originprice")) * 0.05)
              : MemberdiscountPrice;
          }
        }
      }
    });
    MemberdiscountPrice = axioData?.res1_data?.total_order_amount - MemberdiscountPrice;
    MemberdiscountPrice = MemberdiscountPrice - (MemberdiscountPrice % 10);
    MemberdiscountPrice = axioData?.res1_data?.total_order_amount - MemberdiscountPrice;
    $(".couponSelect option").each(function (index, e) {
      if (select_coponid.indexOf($(e).val()) > -1) {
        $(e).attr("disabled", true);
      } else {
        $(e).attr("disabled", false);
      }
    });

    $(".select.medium").each(function (i, e) {
      let couponOneplus = $(e).children("option:selected").data("oneplus");
      let couponId = $(e).children("option:selected").val();
      let total_amout = axioData?.res1_data?.total_order_amount;
      if ($(e).children("option:selected").attr("value") !== "" && couponOneplus === true) {
        //1+1 ?????? ?????? ??????
        oneplusArray.push({
          idx: i,
          quantity: 2,
          type: "??????",
          couponId: couponId,
        });
      } else if ($(e).children("option:selected").attr("value") !== "" && couponOneplus === false) {
        //?????? ?????? ??????
        oneplusArray.push({ idx: i, quantity: 1, couponId: couponId });
        discountPrice += Number($(e).children("option:selected").data("price"));
        finalPrice = total_amout - discountPrice;
      } else if ($(e).children("option:selected").attr("value") === "" && couponOneplus === false) {
        //?????? ?????????
        oneplusArray.push({ idx: i, quantity: 1 });
      }
      if ($(e).attr("data-value")) {
        couponActive_count++;
      }
    });

    //?????? ?????? ????????? ?????? ?????? ???
    if ($(".couponSelect").length === couponActive_count) {
      if (axioData?.res1_data?.affiliate_discount) {
        //kt ????????? ?????? ?????? ???
        setFront((origin) => {
          return {
            ...origin,
            finalPrice: finalPrice - 500,
            menuQuantity: oneplusArray,
            orderDiscountType: {
              ...origin?.orderDiscountType,
              couponFlag: true,
              couponPrice: discountPrice,
              memberFlag: false,
              memberPrice: 0,
            },
          };
        });
      } else {
        setFront((origin) => {
          return {
            ...origin,
            finalPrice: finalPrice,
            menuQuantity: oneplusArray,
            orderDiscountType: {
              ktFlag: false,
              ktPrice: 0,
              couponFlag: true,
              couponPrice: discountPrice,
              memberFlag: false,
              memberPrice: 0,
            },
          };
        });
      }
    } else {
      if (axioData?.res1_data?.affiliate_discount) {
        //kt ????????? ?????? ?????? ???
        //???????????? ??????
        if (axioData?.res1_data?.basic_discount_rate_percent > 0) {
          if (finalPrice - MemberdiscountPrice > 0) {
            finalPrice -= MemberdiscountPrice;
          }
          setFront((origin) => {
            return {
              ...origin,
              finalPrice: finalPrice - 500,
              menuQuantity: oneplusArray,
              orderDiscountType: {
                ...origin?.orderDiscountType,
                couponFlag: true,
                couponPrice: discountPrice,
                memberFlag: true,
                memberPrice: MemberdiscountPrice,
              },
            };
          });
        } else {
          //????????? ?????? ??????
          setFront((origin) => {
            return {
              ...origin,
              finalPrice: finalPrice,
              menuQuantity: oneplusArray,
              orderDiscountType: {
                ktFlag: false,
                ktPrice: 0,
                couponFlag: true,
                couponPrice: discountPrice,
                memberFlag: false,
                memberPrice: 0,
              },
            };
          });
        }
      } else {
        //???????????? ??????
        if (axioData?.res1_data?.basic_discount_rate_percent > 0) {
          if (finalPrice - MemberdiscountPrice > 0) {
            finalPrice -= MemberdiscountPrice;
          }
          setFront((origin) => {
            return {
              ...origin,
              finalPrice: finalPrice,
              menuQuantity: oneplusArray,
              orderDiscountType: {
                ktFlag: false,
                ktPrice: 0,
                couponFlag: true,
                couponPrice: discountPrice,
                memberFlag: true,
                memberPrice: MemberdiscountPrice,
              },
            };
          });
        } else {
          //????????? ?????? ??????
          setFront((origin) => {
            return {
              ...origin,
              finalPrice: finalPrice,
              menuQuantity: oneplusArray,
              orderDiscountType: {
                ktFlag: false,
                ktPrice: 0,
                couponFlag: true,
                couponPrice: discountPrice,
                memberFlag: false,
                memberPrice: 0,
              },
            };
          });
        }
      }
    }
  };
  let menu_count = -1;
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="????????????" redirectBack={true} location={`/order/menu/${axioData?.res1_data?.store?.store_code}`} />

            <div id="content" className="drink order fade-in">
              {/*[D] 211021 ?????? ?????? ????????? ?????? */}
              <section className="section">
                <div className="w-inner">
                  <div className="field">
                    <div className="item order-detail">
                      <div className="flex-both">
                        <span className="label">?????? ??????</span>
                        <span className="customer">
                          <em>{axioData?.res1_data?.order_user_name}</em> <em>/</em> <em>{axioData?.res1_data?.order_user_mobile}</em>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/*// [D] 211021 ?????? ?????? ????????? ?????? */}

              {/*[D] 211021 ?????? ?????? ????????? ?????? */}
              <section className="section">
                <div className="w-inner">
                  <div className="field">
                    <div className="item order-detail">
                      <div className="flex-both">
                        <span className="label">?????? ??????</span>
                        <span className="store">{axioData?.res1_data?.store?.store_name}</span>
                      </div>
                      <span className="address">{axioData?.res1_data?.store?.store_address}</span>
                    </div>
                  </div>
                </div>
              </section>
              {/*// [D] 211021 ?????? ?????? ????????? ?????? */}

              {/* ???????????? */}
              <section className="section">
                <div className="w-inner">
                  <form className="form">
                    <fieldset className="fieldset">
                      <legend className="blind">????????????</legend>
                      <div className="field">
                        <span className="label">?????? ??????</span>
                        <ul className="order-list data-list">
                          {axioData?.res1_data?.smartorder_detail_list?.map((element, index) =>
                            [...new Array(element.quantity)].map((element2, index2) => {
                              menu_count++;
                              return (
                                <li key={index2}>
                                  <div className="item order">
                                    <div className="img-wrap">
                                      {axioData?.res1_data?.smartorder_detail_list[index]?.get_summary_option[0] === "ICE" ? (
                                        <img
                                          src={axioData?.res1_data?.smartorder_detail_list[index]?.smartorder_menu_img_ice}
                                          alt={axioData?.res1_data?.smartorder_detail_list[index]?.menu_name_kor}
                                        />
                                      ) : (
                                        <img
                                          src={axioData?.res1_data?.smartorder_detail_list[index]?.smartorder_menu_img}
                                          alt={axioData?.res1_data?.smartorder_detail_list[index]?.menu_name_kor}
                                        />
                                      )}
                                    </div>
                                    <div className="detail-wrap">
                                      <div className="order-info">
                                        <p className="title">{axioData?.res1_data?.smartorder_detail_list[index]?.menu_name_kor}</p>

                                        <p className="info">
                                          {axioData?.res1_data?.smartorder_detail_list[index]?.get_summary_option.map((e, i) => {
                                            let array = ["HOT", "ICE"];
                                            if (array.indexOf(e) > -1) {
                                              return (
                                                <span className="en" key={i}>
                                                  {e}
                                                </span>
                                              );
                                            }
                                          })}

                                          {axioData?.res1_data?.smartorder_detail_list[index]?.get_summary_option.map((e, i) => {
                                            let array = ["?????????", "??????", "?????????"];
                                            if (array.indexOf(e) > -1) {
                                              if (e === "?????????") {
                                                return (
                                                  <span className="en" key={i}>
                                                    Regular
                                                  </span>
                                                );
                                              } else if (e === "??????") {
                                                return (
                                                  <span className="en" key={i}>
                                                    Large
                                                  </span>
                                                );
                                              } else if (e === "?????????") {
                                                return (
                                                  <span className="en" key={i}>
                                                    Big
                                                  </span>
                                                );
                                              }
                                            }
                                          })}
                                          <span>
                                            {axioData?.res1_data?.smartorder_detail_list[index]?.get_summary_option?.map((e, i) => {
                                              let array = ["????????? ???", "????????? ???", "?????????(-300???)"];
                                              if (array.indexOf(e) > -1) {
                                                if (e === "????????? ???") {
                                                  return <React.Fragment key={i}>????????? ???</React.Fragment>;
                                                } else {
                                                  return <React.Fragment key={i}>{e}</React.Fragment>;
                                                }
                                              }
                                            })}
                                          </span>
                                        </p>
                                        <p className="option flex-both">
                                          <span>
                                            {axioData?.res1_data?.smartorder_detail_list[index]?.get_summary_option
                                              ?.filter((e, i) => {
                                                let array = ["HOT", "ICE", "?????????", "??????", "?????????", "????????? ???", "????????? ???", "?????????(-300???)"];
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
                                          ??????&nbsp; :<span>{frontData?.menuQuantity[menu_count]?.quantity}</span>{" "}
                                        </p>
                                        <p className="price fc-orange">
                                          {(
                                            axioData?.res1_data?.smartorder_detail_list[index]?.price +
                                            axioData?.res1_data?.smartorder_detail_list[index]?.option_price
                                          ).toLocaleString("ko-KR")}
                                          ???
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <select
                                    className={`select medium ${
                                      axioData?.res1_data?.affiliate_discount && index !== 0
                                        ? `couponSelect couponSelect-${axioData?.res1_data?.smartorder_detail_list[index]?.smartorder_menu_id}`
                                        : !axioData?.res1_data?.affiliate_discount
                                        ? `couponSelect couponSelect-${axioData?.res1_data?.smartorder_detail_list[index]?.smartorder_menu_id}`
                                        : ""
                                    }`}
                                    data-menuid={axioData?.res1_data?.smartorder_detail_list[index]?.smartorder_menu_id}
                                    data-quantity={axioData?.res1_data?.smartorder_detail_list[index]?.quantity}
                                    data-index={index}
                                    data-index2={index2}
                                    data-originprice={axioData?.res1_data?.smartorder_detail_list[index]?.price}
                                    data-optionprice={axioData?.res1_data?.smartorder_detail_list[index]?.option_price}
                                    data-available_discount={axioData?.res1_data?.smartorder_detail_list[index]?.available_discount}
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
                                    value={selectOption(menu_count)}
                                  >
                                    {axioData?.res1_data?.affiliate_discount && index === 0 && index2 === 0 ? (
                                      <option
                                        value=""
                                        data-originprice={axioData?.res1_data?.smartorder_detail_list[index]?.price}
                                        data-oneplus={false}
                                      >
                                        ??????????????? ????????? ????????????.
                                      </option>
                                    ) : (
                                      <option
                                        value=""
                                        data-originprice={axioData?.res1_data?.smartorder_detail_list[index]?.price}
                                        data-oneplus={false}
                                      >
                                        ????????? ????????? ?????????.
                                      </option>
                                    )}
                                    {axioData?.res1_data?.affiliate_discount && index !== 0
                                      ? axioData?.res1_data?.smartorder_detail_list[index]?.user_coupon_detail_list?.map((e, i) => (
                                          <option
                                            key={i}
                                            value={e?.user_coupon_id}
                                            data-price={e?.discount_price}
                                            data-oneplus={e?.is_one_plus_one}
                                            data-originprice={axioData?.res1_data?.smartorder_detail_list[index]?.price}
                                            data-optionprice={axioData?.res1_data?.smartorder_detail_list[index]?.option_price}
                                            disabled={disabledOption(menu_count, e?.user_coupon_id)}
                                          >
                                            {e?.coupon_name}
                                          </option>
                                        ))
                                      : !axioData?.res1_data?.affiliate_discount &&
                                        axioData?.res1_data?.smartorder_detail_list[index]?.user_coupon_detail_list?.map((e, i) => (
                                          <option
                                            key={i}
                                            value={e?.user_coupon_id}
                                            data-price={e?.discount_price}
                                            data-oneplus={e?.is_one_plus_one}
                                            data-originprice={axioData?.res1_data?.smartorder_detail_list[index]?.price}
                                            data-optionprice={axioData?.res1_data?.smartorder_detail_list[index]?.option_price}
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
                          ????????????
                          <span className="alert">
                            <i className="ico alert"></i>??????????????? ?????? ????????? ???????????? ????????????.
                          </span>
                        </span>
                        <div className="select-group col-2 checking">
                          <input
                            type="radio"
                            id="orderRequest01"
                            onClick={() => handleOrderRequest(1)}
                            defaultChecked={frontData?.orderRequest === 1}
                            name="orderRequest"
                          />
                          <label htmlFor="orderRequest01" className="btn bdr medium">
                            <strong>????????? ??????</strong>
                          </label>
                          <input
                            type="radio"
                            onClick={() => handleOrderRequest(0)}
                            defaultChecked={frontData?.orderRequest === 0}
                            id="orderRequest02"
                            name="orderRequest"
                          />
                          <label htmlFor="orderRequest02" className="btn bdr medium">
                            <strong>??????</strong>
                          </label>
                        </div>
                      </div>

                      <div className="field">
                        <span className="label">?????? ??????</span>
                        <div className="select-group col-3 checking">
                          {axioData?.res1_data?.pay_methods?.map((e, i) => {
                            if (checkMobile() === "ios" && e?.name === "????????????") {
                              return null;
                            } else {
                              return (
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
                                    {e?.name === "????????????" ? (
                                      <strong>
                                        ???????????????
                                        <br />
                                        {e?.balance?.toLocaleString("ko-KR") + "???"}
                                      </strong>
                                    ) : e?.name === "???????????? ???????????? ??????" ? (
                                      <strong>????????????</strong>
                                    ) : (
                                      <strong>{e?.name}</strong>
                                    )}
                                  </label>
                                </React.Fragment>
                              );
                            }
                          })}
                        </div>
                      </div>

                      {/* [D] 20211006 ????????? ?????? */}
                      <div className="field">
                        <span className="label en">Total</span>
                        <div className="item info-order">
                          <dl className="flex-both total">
                            <dt className="title">
                              <span>??? ?????? ??????</span>
                            </dt>
                            <dd className="price">
                              <strong>{axioData?.res1_data?.total_order_amount?.toLocaleString("ko-KR")}???</strong>
                            </dd>
                          </dl>

                          <dl className="flex-both">
                            <dt className="title">
                              ?????? ?????? <span className="coupon"></span>
                            </dt>
                            <dd className="price" id="coupon-discount">
                              {frontData?.orderDiscountType?.couponFlag
                                ? "-" + frontData?.orderDiscountType?.couponPrice?.toLocaleString("ko-KR") + "???"
                                : "-" + 0 + "???"}
                            </dd>
                          </dl>
                          <dl className="flex-both">
                            {frontData?.orderDiscountType?.memberFlag ? (
                              <React.Fragment>
                                <dt className="title">
                                  ????????? 5% ?????? <span className="grade">[PLATINUM]</span>
                                </dt>
                                <dd className="price">-{frontData?.orderDiscountType?.memberPrice?.toLocaleString("ko-KR") + "???"}</dd>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <dt className="title">
                                  ????????? 5% ?????? <span className="grade"></span>
                                </dt>
                                <dd className="price">-0???</dd>
                              </React.Fragment>
                            )}
                          </dl>
                          {frontData?.orderDiscountType?.ktFlag && (
                            <dl className="flex-both">
                              <dt className="title">
                                KT ?????? ?????? <span className="coupon"></span>
                              </dt>
                              <dd className="price">-{frontData?.orderDiscountType?.ktPrice?.toLocaleString("ko-KR") + "???"}</dd>
                            </dl>
                          )}
                          <dl className="flex-both flex-center">
                            <dt className="title">KT ?????? ??????</dt>
                            <dd>
                              {axioData?.res1_data?.available_affiliate_discount ? (
                                <a className="btn verify" onClick={() => handleMembership()}>
                                  ????????????
                                </a>
                              ) : (
                                <a className="btn verify" onClick={() => handleMembership("?????????")}>
                                  ????????????
                                </a>
                              )}
                            </dd>
                          </dl>
                        </div>
                      </div>
                      {/* // [D] 20211006 ????????? ?????? */}
                    </fieldset>
                  </form>
                </div>
              </section>
              {/* // ???????????? */}

              <div className="fixed-con active">
                <div className="popup">
                  <div className="popup-wrap">
                    <div className="popup-body">
                      {/* [D] 211006 .item.info-order ?????? 
  
                                  <div className="item info-order">
                                      <dl className="flex-both total">
                                          <dt className="title">
                                              <span className="en">Total</span>
                                          </dt>
                                          <dd className="price"><strong>2,400???</strong></dd>
                                      </dl>
                                      [D] ?????? ?????? ??? ?????? 
                                      <dl className="flex-both">
                                          <dt className="title">
                                              ?????? ?????? <span className="coupon">[FREE ?????? ??????]</span>
                                          </dt>
                                          <dd className="price">-2,400???</dd>
                                      </dl>
                                      <dl className="flex-both">
                                          <dt className="title">
                                              ????????? ??????
                                          </dt>
                                          <dd className="price">0???</dd>
                                      </dl>
                                  </div>
                                  
                                  // [D] 211006 .item.info-order ?????? */}

                      <div className="item info-order">
                        <dl className="flex-both total">
                          <dt className="title">?????? ?????? ??????</dt>
                          <dd className="price fc-orange">{frontData?.finalPrice?.toLocaleString("ko-KR")}???</dd>
                        </dl>
                      </div>
                    </div>

                    <div className="btn-area">
                      <a className="btn full x-large dark" onClick={() => handleSubmit()}>
                        ????????????
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
