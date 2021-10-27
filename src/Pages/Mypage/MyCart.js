/* eslint-disable no-script-url */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import Nav from "Components/Nav/Nav";
import { Link, useHistory, useParams } from "react-router-dom";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { Swiper } from "swiper/react";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";

export default function MyCart() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const history = useHistory();
  const { storeCode } = useParams();

  const body = {};
  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };

  useEffect(() => {
    axios.all([axios.get(`${SERVER_DALKOMM}/app/api/v2/smartorder/cart/list?store_code=${storeCode}`, header_config)]).then(
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
    setData(true);
  }, [state?.auth]);

  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    contGap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axioData]);
  const handleOrder = (flag) => {
    if (flag === "불가") {
      alert("장바구니가 비어있습니다.");
      return false;
    }
    let smartordermenu_list = [];
    $(".data-list li").each(function (i, e) {
      smartordermenu_list.push({ smartorder_menu_id: $(e).data("menuid"), quantity: Number($(e).find(".menuCount").val()) });
    });

    let body_order = {
      smartorder_orderinfo_id: axioData?.res1_data?.cart_list[0]?.smartorder_menu_id,
      store_code: storeCode,
      smartordermenu_list: smartordermenu_list,
    };

    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/cart/to/order`, body_order, header_config)]).then(
      axios.spread((res1) => {
        if (res1.data.meta.code === 20000) {
          history.push({
            pathname: `/order/final/${axioData?.res1_data?.cart_list[0]?.smartorder_orderinfo_id}`,
          });
        } else {
          alert(res1.data.meta.msg);
          return false;
        }
      })
    );
  };

  function totalPrice() {
    let sumPrice = 0;
    $(".showPrice").each(function (i, e) {
      sumPrice += Number($(e).attr("data-price"));
    });
    $(".finalPrice").text(sumPrice.toLocaleString("ko-KR") + "원");
  }
  const handleClick = (e, type) => {
    let $thisTarget = $(e).siblings("input");
    let $thisCount = Number($(e).siblings("input").val());
    let $thisPrice = 0;
    if (type === "증가") {
      $thisPrice = ($thisCount + 1) * Number($(e).siblings("input").data("price"));
      $thisTarget.val($thisCount + 1);
      $(e)
        .parent()
        .prev()
        .attr("data-price", $thisPrice)
        .text($thisPrice.toLocaleString("ko-KR") + "원");
    } else if (type === "감소") {
      if ($thisCount < 2) {
        return false;
      } else {
        $thisTarget.val($thisCount - 1);
        $thisPrice = ($thisCount - 1) * Number($(e).siblings("input").data("price"));
        $(e)
          .parent()
          .prev()
          .attr("data-price", $thisPrice)
          .text($thisPrice.toLocaleString("ko-KR") + "원");
      }
    }
    totalPrice();
  };
  const handleDelete = (e, type, menuId) => {
    if (type === "allDelete") {
      $(".order-list.data-list").html("");
      $(".price.fc-orange").text("0원");
      $(".btn.full.large.dark").remove();
      $("body").removeClass("modal-opened");
      $("#drinkDelete").removeClass("active");
    } else {
      let $thisTarget = $(e).parent().parent();
      $thisTarget.remove();
    }
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/cart/delete`, { smartorder_menu_id: menuId }, header_config)]).then(
      axios.spread((res1) => {
        res1.data.meta.code !== 20000 ? alert(res1.data.meta.msg) : totalPrice();
      })
    );
  };

  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="장바구니" location="/member/cart" icon="trash" headerPopup={true} popTarget="#drinkDelete" />

            <Nav order={3} />

            <div id="content" className="drink basket">
              {/* 장바구니 */}
              <section className="section">
                <ul className="order-list data-list">
                  {axioData?.res1_data?.cart_list?.map((element, index) => (
                    <li key={index} data-menuid={element?.smartorder_menu_id}>
                      <div className="item order">
                        <button type="button" className="btn delete" onClick={(e) => handleDelete(e.currentTarget, "", element?.smartorder_menu_id)}>
                          <i className="ico close">
                            <span>삭제하기</span>
                          </i>
                        </button>
                        <div className="img-wrap">
                          <img
                            src={element?.type === "I" ? element?.imgs["detail_image_ice"] : element?.imgs["detail_image_hot_simple"]}
                            alt={element?.name_kor}
                          />
                        </div>
                        <div className="detail-wrap">
                          <div className="order-info">
                            <p className="title">{element?.name_kor}</p>
                            <p className="info">
                              <span className="en">{element?.type === "I" ? "Ice" : element?.type === "H" ? "Hot" : ""}</span>
                              <span className="en">
                                {element?.size === "L" ? "Large" : element?.size === "R" ? "Regular" : element?.size === "B" ? "Big" : ""}
                              </span>
                              <span>
                                {" "}
                                {element?.cup === "I" ? "일회용 컵" : element?.cup === "M" ? "매장용 컵" : element?.cup === "P" ? "개인컵" : ""}
                              </span>
                            </p>
                            <p className="option flex-both">
                              {element?.get_summary_option
                                .split(" / ")
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
                            </p>
                          </div>
                          <div className="price-wrap flex-both">
                            <p className="price fc-orange showPrice" data-price={(element?.price + element?.option_price) * element?.quantity}>
                              {((element?.price + element?.option_price) * element?.quantity)?.toLocaleString("ko-KR")}원
                            </p>
                            <p className="uio-amount">
                              <button type="button" className="btn amount" onClick={(e) => handleClick(e.currentTarget, "감소")}>
                                <i className="ico decrease"></i>
                                <span className="blind">감소</span>
                              </button>
                              <input
                                type="text"
                                defaultValue={element?.quantity}
                                className="ea menuCount"
                                disabled
                                data-price={element?.price + element?.option_price}
                              />
                              <button type="button" className="btn amount" onClick={(e) => handleClick(e.currentTarget, "증가")}>
                                <i className="ico increase"></i>
                                <span className="blind">증가</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
              {/* // 장바구니 */}

              {/* 결제 총 금액 / 주문하기 버튼 영역 */}
              <div className="fixed-con active">
                <div className="popup">
                  <div className="popup-wrap">
                    <div className="popup-body">
                      <div className="w-inner">
                        <div className="item info-order">
                          <dl className="flex-both">
                            <dt className="title en">Total</dt>
                            {axioData?.res1_data?.cart_list.length < 1 ? (
                              <dd className="price fc-orange finalPrice">0원</dd>
                            ) : (
                              <dd className="price fc-orange finalPrice">{axioData?.res1_data?.total_amount?.toLocaleString("ko-KR")}원</dd>
                            )}
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="btn-area" />
                    {axioData?.res1_data?.cart_list.length < 1 ? (
                      <button to="#" className="btn full large dark" onClick={() => handleOrder("불가")}>
                        주문하기
                      </button>
                    ) : (
                      <button to="#" className="btn full large dark" onClick={() => handleOrder("")}>
                        주문하기
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 장바구니 메뉴 삭제 팝업 */}
              <div id="drinkDelete" className="fixed-con layer-pop dimm">
                <div className="popup">
                  <div className="popup-wrap">
                    <button type="button" className="btn btn-close">
                      <i className="ico close">
                        <span>close</span>
                      </i>
                    </button>
                    <div className="popup-body">
                      <div className="item message">
                        <i className="ico alert-c">
                          <span>알림</span>
                        </i>
                        <p className="text">
                          장바구니에 담긴 모든 메뉴를
                          <br />
                          삭제하시겠습니까?
                        </p>
                      </div>
                      <div className="btn-area col-2">
                        <button type="reset" className="btn large normal" onClick={(e) => handleDelete(e.currentTarget, "allDelete", 0)}>
                          삭제하기
                        </button>
                        <button type="button" className="btn large light-g btn-close">
                          취소
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 장바구니 메뉴 삭제 팝업 */}
            </div>
            {/* // 결제 총 금액 / 주문하기 버튼 영역 */}

            <button type="button" id="moveScrollTop" className="btn scroll-top">
              <i className="ico arr-top"></i>
            </button>
          </div>

          {/* // #content */}
        </div>
        {/* // #container */}
        {/* // #wrap */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
