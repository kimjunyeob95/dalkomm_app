import $ from "jquery";
import React, { useEffect } from "react";

import HeaderSub from "Components/Header/HeaderSub";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

export default function MyCart() {
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    contGap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOrder = (e) => {
    console.log(e);
    alert("주문 버튼");
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
    } else {
      let $thisTarget = $(e).parent().parent();
      $thisTarget.remove();
    }
  };
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
}
