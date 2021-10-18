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
    // axios.all([axios.get(`${SERVER_DALKOMM}/app/api/v2/smartorder/cart/list?store_code=${storeCode}`, header_config)]).then(
    //   axios.spread((res1) => {
    //     console.log(res1);
    //     let res1_data = res1.data.data;
    //     setData((origin) => {
    //       return {
    //         ...origin,
    //         res1_data,
    //       };
    //     });
    //   })
    // );
    setData(true);
  }, [state?.auth]);

  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    contGap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axioData]);
  const handleOrder = (e) => {
    history.push({
      pathname: "/order/final",
      from: "myCart",
    });
  };
  const handleClick = (e, type) => {
    let $thisTarget = $(e).siblings("input");
    let $thisCount = Number($(e).siblings("input").val());
    if (type === "증가") {
      $thisTarget.val($thisCount + 1);
    } else if (type === "감소") {
      if ($thisCount < 2) {
        return false;
      } else {
        $thisTarget.val($thisCount - 1);
      }
    }
  };
  const handleDelete = (e, type) => {
    if (type === "allDelete") {
      $(".order-list.data-list").html("");
      $(".price.fc-orange").text("0원");
      $(".btn.full.large.dark").remove();
      $(".btn.open-pop").remove();
      $("body").removeClass("modal-opened");
      $("#drinkDelete").removeClass("active");
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/cart/delete`, { smartorder_menu_id: 0 }, header_config)]).then(
        axios.spread((res1) => {
          res1.data.meta.code !== 20000 && alert(res1.data.meta.msg);
        })
      );
    } else {
      let $thisTarget = $(e).parent().parent();
      $thisTarget.remove();
    }
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
                  <li>
                    <div className="item order">
                      <button type="button" className="btn delete" onClick={(e) => handleDelete(e.currentTarget)}>
                        <i className="ico close">
                          <span>삭제하기</span>
                        </i>
                      </button>
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
                              <em className="en">Option :</em> 샷 추가
                            </span>
                            <span>횟수 : 1</span>
                          </p>
                        </div>
                        <div className="price-wrap flex-both">
                          <p className="price fc-orange">4,300원</p>
                          <p className="uio-amount">
                            <button type="button" className="btn amount" onClick={(e) => handleClick(e.currentTarget, "감소")}>
                              <i className="ico decrease"></i>
                              <span className="blind">감소</span>
                            </button>
                            <input type="text" defaultValue={1} className="ea" />
                            <button type="button" className="btn amount" onClick={(e) => handleClick(e.currentTarget, "증가")}>
                              <i className="ico increase"></i>
                              <span className="blind">증가</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="item order">
                      <button type="button" className="btn delete" onClick={(e) => handleDelete(e.currentTarget)}>
                        <i className="ico close">
                          <span>삭제하기</span>
                        </i>
                      </button>
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
                              <em className="en">Option :</em> 샷 추가
                            </span>
                            <span>횟수 : 1</span>
                          </p>
                        </div>
                        <div className="price-wrap flex-both">
                          <p className="price fc-orange">4,300원</p>
                          <p className="uio-amount">
                            <button type="button" className="btn amount" onClick={(e) => handleClick(e.currentTarget, "감소")}>
                              <i className="ico decrease"></i>
                              <span className="blind">감소</span>
                            </button>
                            <input type="text" defaultValue={1} className="ea" />
                            <button type="button" className="btn amount" onClick={(e) => handleClick(e.currentTarget, "증가")}>
                              <i className="ico increase"></i>
                              <span className="blind">증가</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="item order">
                      <button type="button" className="btn delete" onClick={(e) => handleDelete(e.currentTarget)}>
                        <i className="ico close">
                          <span>삭제하기</span>
                        </i>
                      </button>
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
                              <em className="en">Option :</em> 샷 추가
                            </span>
                            <span>횟수 : 1</span>
                          </p>
                        </div>
                        <div className="price-wrap flex-both">
                          <p className="price fc-orange">4,300원</p>
                          <p className="uio-amount">
                            <button type="button" className="btn amount" onClick={(e) => handleClick(e.currentTarget, "감소")}>
                              <i className="ico decrease"></i>
                              <span className="blind">감소</span>
                            </button>
                            <input type="text" defaultValue={1} className="ea" />
                            <button type="button" className="btn amount" onClick={(e) => handleClick(e.currentTarget, "증가")}>
                              <i className="ico increase"></i>
                              <span className="blind">증가</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="item order">
                      <button type="button" className="btn delete" onClick={(e) => handleDelete(e.currentTarget)}>
                        <i className="ico close">
                          <span>삭제하기</span>
                        </i>
                      </button>
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
                              <em className="en">Option :</em> 샷 추가
                            </span>
                            <span>횟수 : 1</span>
                          </p>
                        </div>
                        <div className="price-wrap flex-both">
                          <p className="price fc-orange">4,300원</p>
                          <p className="uio-amount">
                            <button type="button" className="btn amount" onClick={(e) => handleClick(e.currentTarget, "감소")}>
                              <i className="ico decrease"></i>
                              <span className="blind">감소</span>
                            </button>
                            <input type="text" defaultValue={1} className="ea" />
                            <button type="button" className="btn amount" onClick={(e) => handleClick(e.currentTarget, "증가")}>
                              <i className="ico increase"></i>
                              <span className="blind">증가</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
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
                            <dd className="price fc-orange">42,000원</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="btn-area" />
                    <button to="#" className="btn full large dark" onClick={(e) => handleOrder(e.currentTarget)}>
                      주문하기
                    </button>
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
                        <button type="reset" className="btn large normal" onClick={(e) => handleDelete(e.currentTarget, "allDelete")}>
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
