import $ from "jquery";
import React, { useEffect } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import { Link, useHistory } from "react-router-dom";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { Swiper } from "swiper/react";

export default function OrderDetail() {
  const history = useHistory();
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    contGap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submitOrder = () => {
    alert("주문되었습니다.");
    history.push("/");
  };
  const otherMenu = () => {
    $("body").removeClass("modal-opened");
    history.push("/order/menu");
  };
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub className="only-button-header" />

          {/* <nav id="menu" className="nav">
                <Link to="MA001.html" className="btn">
                    <div className="img-wrap">
                        <svg viewBox="0 0 30 30">
                            <g>
                                <path fill="none" stroke="#000" stroke-miterlimit="10" className="path-stroke"
                                    d="M123.929 151.773l-10.075 8.185v12.151H134v-12.151z"
                                    transform="translate(4.925 5.356) translate(-113.853 -151.773)" />
                                <path d="M0 0H1.09V6.094H0z" className="path-fill"
                                    transform="translate(4.925 5.356) translate(9.447 14.242)" />
                            </g>
                        </svg>
                    </div>
                    <span className="name en">HOME</span>
                </Link>
                <Link to="CA001.html" className="btn active">
                    <div className="img-wrap">
                        <svg viewBox="0 0 30 30">
                            <g transform="translate(4.707 8.22)">
                                <g id="그룹_10">
                                    <path id="사각형_21" fill="none" stroke="#000" stroke-miterlimit="10"
                                        className="path-stroke" d="M0 0H20.586V14.594H0z" />
                                    <path id="선_3" fill="none" stroke="#000" stroke-miterlimit="10"
                                        className="path-stroke" d="M0 0L3.615 0" transform="translate(2.967 3.571)" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <span className="name en">PAY</span>
                </Link>
                <Link to="TO001.html" className="btn">
                    <div className="img-wrap">
                        <svg viewBox="0 0 30 30">
                            <g>
                                <path fill="#fff" stroke="#000" stroke-miterlimit="10"
                                    d="M432.186 186.516h2.255a1.877 1.877 0 0 0 1.877-1.877v-3.856a1.877 1.877 0 0 0-1.877-1.877h-2.255"
                                    transform="translate(0.5 0.5) translate(3.933 8.22) translate(-413.168 -176.682)" />
                                <path fill="#ff592e"
                                    d="M177.215 741.58h19.323s1.279 10.174-7.815 11.686-11.651-5.637-11.509-8.524"
                                    transform="translate(0.5 0.5) translate(3.933 8.22) translate(-176.933 -738.22)" />
                                <path fill="none" stroke="#000" stroke-miterlimit="10"
                                    d="M330.758 167.045v7.171c0 4.866 4.33 8.363 9.671 8.363s9.671-3.5 9.671-8.363v-7.171z"
                                    transform="translate(0.5 0.5) translate(3.933 8.22) translate(-330.758 -167.045)" />
                            </g>
                        </svg>
                    </div>
                    <span className="name en">ORDER</span>
                </Link>
                <Link to="ME001.html" className="btn">
                    <div className="img-wrap">
                        <svg viewBox="0 0 30 30">
                            <g transform="translate(4.445 4.589)">
                                <circle cx="10.555" cy="10.555" r="10.555" fill="none" stroke="#000"
                                    stroke-miterlimit="10" className="path-stroke" />
                                <g transform="translate(6.919 6.254)">
                                    <path d="M838.286 219.463a4.767 4.767 0 0 1-6.742 0" fill="none" stroke="#000"
                                        stroke-miterlimit="10" className="path-stroke"
                                        transform="translate(-831.28 -212.257)" />
                                    <path d="M0 0L0 2.191" fill="none" stroke="#000" stroke-miterlimit="10"
                                        className="path-stroke" transform="translate(0 0.114)" />
                                    <path d="M0 0L0 2.191" fill="none" stroke="#000" stroke-miterlimit="10"
                                        className="path-stroke" transform="translate(7.271 0.114)" />
                                    <path d="M842.755 181.032v4.676h-1.562" fill="none" stroke="#000"
                                        stroke-miterlimit="10" className="path-stroke"
                                        transform="translate(-839.12 -181.032)" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <span className="name en">MY</span>
                </Link>
                <Link to="AP001.html" className="btn">
                    <div className="img-wrap">
                        <svg viewBox="0 0 30 30">
                            <g transform="translate(4.754 7.637)">
                                <path d="M0 0L20.492 0" fill="#fff" stroke="#000" stroke-miterlimit="10"
                                    className="path-stroke" transform="translate(0 -0.637)" />
                                <path d="M0 0L20.492 0" fill="#fff" stroke="#000" stroke-miterlimit="10"
                                    className="path-stroke" transform="translate(0 7.363)" />
                                <path d="M0 0L20.492 0" fill="#fff" stroke="#000" stroke-miterlimit="10"
                                    className="path-stroke" transform="translate(0 15.363)" />
                            </g>
                        </svg>
                    </div>
                    <span className="name en">MENU</span>
                </Link>
            </nav> */}

          <div id="content" className="drink detail">
            <section className="section">
              <div className="item drink-info">
                <div className="img-wrap">
                  <img src="/@resource/images/@temp/product_detail_01.jpg" alt="음료 이미지" />
                </div>
                <div className="detail-wrap">
                  <div className="text-box">
                    <p className="type en fc-orange">MIXTUR</p>
                    <p className="name">
                      딸기 스무디
                      <span className="en">Strawberry smoothie</span>
                    </p>
                    <p className="text">
                      딸기 본연의 맛을 살려 갈아 만든
                      <br />
                      과일 스무디
                    </p>
                  </div>
                  <p className="price">4,300원</p>
                  <span className="btn bookmark">
                    <i className="ico heart">
                      <span>즐겨찾기</span>
                    </i>
                  </span>
                </div>
              </div>
              <form className="form">
                <fieldset className="fieldset">
                  <div className="field">
                    <div className="select-group col-2">
                      <input type="radio" id="orderType01" name="orderType" defaultValue={true} />
                      <label htmlFor="orderType01" className="btn normal small">
                        <strong className="en">ICE</strong>
                      </label>
                      <input type="radio" id="orderType02" name="orderType" />
                      <label htmlFor="orderType02" className="btn normal small">
                        <strong className="en">HOT</strong>
                      </label>
                    </div>
                  </div>

                  <div className="w-inner">
                    <div className="field">
                      <span className="label en">Size</span>
                      <div className="select-group col-2">
                        <input type="radio" id="orderSize01" name="orderSize" defaultValue={true} />
                        <label htmlFor="orderSize01" className="btn bdr medium">
                          <p className="text">
                            <strong className="en">Regular</strong>
                            <span className="en">375ml</span>
                          </p>
                        </label>
                        <input type="radio" id="orderSize02" name="orderSize" />
                        <label htmlFor="orderSize02" className="btn bdr medium">
                          <p className="text">
                            <strong className="en">Large</strong>
                            <span className="en">591ml</span>
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="field">
                      <span className="label en">Cup</span>
                      <div className="select-group col-3">
                        <input type="radio" id="orderCup01" name="orderCup" />
                        <label htmlFor="orderCup01" className="btn bdr medium">
                          <strong>매장용</strong>
                        </label>
                        <input type="radio" id="orderCup02" name="orderCup" />
                        <label htmlFor="orderCup02" className="btn bdr medium">
                          <strong>일회용</strong>
                        </label>
                        <input type="radio" id="orderCup03" name="orderCup" />
                        <label htmlFor="orderCup03" className="btn bdr medium">
                          <strong>개인</strong>
                        </label>
                      </div>
                    </div>

                    <div className="field">
                      <span className="label en">Option</span>
                      <div className="select-group col-2">
                        <input type="radio" id="orderOption01" name="orderOption" />
                        <label htmlFor="orderOption01" className="btn bdr medium">
                          <strong>선택 안함</strong>
                        </label>
                        <input type="radio" id="orderOption02" name="orderOption" />
                        <label htmlFor="orderOption02" className="btn bdr medium">
                          <strong>샷 추가</strong>
                        </label>
                        <input type="radio" id="orderOption03" name="orderOption" />
                        <label htmlFor="orderOption03" className="btn bdr medium">
                          <strong>휘핑크림</strong>
                        </label>
                        <input type="radio" id="orderOption04" name="orderOption" />
                        <label htmlFor="orderOption04" className="btn bdr medium">
                          <strong>시럽추가</strong>
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
              <ul className="data-list toggle-wrap">
                <li>
                  <div className="item info-detail">
                    <div className="title-wrap toggle-switch">
                      <p className="title">영양 성분 정보</p>
                    </div>
                    <div className="detail-wrap toggle-cont" style={{ display: "block" }}>
                      <p className="text">
                        <span>
                          기준 중량 <em>355(g/ml)</em>
                        </span>
                        <span>
                          열량 <em>283(kcal)</em>
                        </span>
                      </p>
                      <div className="table-wrap">
                        <table className="data-table">
                          <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col">당류</th>
                              <th scope="col">포화지방</th>
                              <th scope="col">단백질</th>
                              <th scope="col">카페인</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>54g</td>
                              <td>0g</td>
                              <td>2g</td>
                              <td>6mg</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item info-detail">
                    <div className="title-wrap toggle-switch">
                      <p className="title">알레르기 유발 요인</p>
                    </div>
                    <div className="detail-wrap toggle-cont">
                      <p className="text">우유, 대두, 땅콩</p>
                    </div>
                  </div>
                </li>
              </ul>
            </section>

            {/* 충전 후 금액 / 결제하기 영역 */}
            <div id="orderState" className="fixed-con active">
              <div className="popup">
                <div className="popup-wrap">
                  <div className="popup-body">
                    <ul className="data-list">
                      <li>
                        <div className="item info-order">
                          <dl className="flex-both w-inner">
                            <dt className="title">Option 샷 추가</dt>
                            <dd className="price flex-center">
                              <button className="btn btn-cancle">
                                <i className="ico close">
                                  <span>옵션삭제</span>
                                </i>
                              </button>
                              <p className="uio-amount">
                                <button type="button" className="btn amount">
                                  <i className="ico decrease"></i>
                                  <span className="blind">감소</span>
                                </button>
                                <input type="text" defaultValue="1" className="ea" />
                                <button type="button" className="btn amount">
                                  <i className="ico increase"></i>
                                  <span className="blind">증가</span>
                                </button>
                              </p>
                            </dd>
                          </dl>
                        </div>
                      </li>
                      <li>
                        <div className="item info-order">
                          <dl className="flex-both w-inner">
                            <dt className="title">주문 수량</dt>
                            <dd className="price">
                              <p className="uio-amount">
                                <button type="button" className="btn amount">
                                  <i className="ico decrease"></i>
                                  <span className="blind">감소</span>
                                </button>
                                <input type="text" defaultValue="1" className="ea" />
                                <button type="button" className="btn amount">
                                  <i className="ico increase"></i>
                                  <span className="blind">증가</span>
                                </button>
                              </p>
                            </dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <div className="item info-order">
                      <dl className="flex-both w-inner">
                        <dt className="title en">Total</dt>
                        <dd className="price fc-orange">4,800원</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="btn-area col-2">
                    <button type="button" className="btn x-large light-g open-pop" pop-target="#addCart">
                      장바구니 담기
                    </button>
                    <Link to="#" className="btn x-large dark" onClick={() => submitOrder()}>
                      주문하기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* // 충전 후 금액 / 결제하기 영역 */}

            {/* 장바구니 추가 완료 팝업 영역 */}
            <div id="addCart" className="fixed-con layer-pop dimm">
              <div className="popup">
                <div className="popup-wrap">
                  <button type="button" className="btn btn-close">
                    <i className="ico close">
                      <span>close</span>
                    </i>
                  </button>
                  <div className="popup-body">
                    <div className="item message">
                      <p className="text">
                        <span className="en fc-orange">THANK YOU!</span>
                        <strong>장바구니에 추가 되었습니다.</strong>
                      </p>
                    </div>

                    {/* [D] 추천 메뉴 있을 시 노출 */}
                    <div className="recommend-wrap">
                      <p className="text ta-c">함께하면 2배 더 달콤한 베이커리 추천 드려요!</p>
                      <Swiper
                        id="recommendMenu"
                        className="swiper-container section-slider"
                        slidesPerView={"auto"}
                        freeMode={false}
                        observer={true}
                        observeParents={true}
                      >
                        <ul className="swiper-wrapper data-list" slot="container-start">
                          <li className="swiper-slide">
                            <div className="item menu">
                              <div className="img-wrap">
                                <img src="/@resource/images/@temp/product_recommend_01.jpg" alt="크루아상" />
                              </div>
                              <div className="detail-wrap">
                                <p className="title">
                                  크루아상
                                  <span className="en">Croissant</span>
                                </p>
                              </div>
                            </div>
                          </li>
                          <li className="swiper-slide">
                            <div className="item menu">
                              <div className="img-wrap">
                                <img src="/@resource/images/@temp/product_recommend_02.jpg" alt="클래식 스콘" />
                              </div>
                              <div className="detail-wrap">
                                <p className="title">
                                  클래식 스콘
                                  <span className="en">Classic Scone</span>
                                </p>
                              </div>
                            </div>
                          </li>
                          <li className="swiper-slide">
                            <div className="item menu">
                              <div className="img-wrap">
                                <img src="/@resource/images/@temp/product_recommend_03.jpg" alt="애플파이" />
                              </div>
                              <div className="detail-wrap">
                                <p className="title">
                                  애플파이
                                  <span className="en">Apple Pie</span>
                                </p>
                              </div>
                            </div>
                          </li>
                          <li className="swiper-slide">
                            <div className="item menu">
                              <div className="img-wrap">
                                <img src="/@resource/images/@temp/product_recommend_04.jpg" alt="고소한 단팥빵" />
                              </div>
                              <div className="detail-wrap">
                                <p className="title">
                                  고소한 단팥빵
                                  <span className="en">Sweet Red-bean</span>
                                </p>
                              </div>
                            </div>
                          </li>
                          <li className="swiper-slide">
                            <div className="item menu">
                              <div className="img-wrap">
                                <img src="/@resource/images/@temp/product_recommend_01.jpg" alt="크루아상" />
                              </div>
                              <div className="detail-wrap">
                                <p className="title">
                                  크루아상
                                  <span className="en">Croissant</span>
                                </p>
                              </div>
                            </div>
                          </li>
                          <li className="swiper-slide">
                            <div className="item menu">
                              <div className="img-wrap">
                                <img src="/@resource/images/@temp/product_recommend_02.jpg" alt="클래식 스콘" />
                              </div>
                              <div className="detail-wrap">
                                <p className="title">
                                  클래식 스콘
                                  <span className="en">Classic Scone</span>
                                </p>
                              </div>
                            </div>
                          </li>
                          <li className="swiper-slide">
                            <div className="item menu">
                              <div className="img-wrap">
                                <img src="/@resource/images/@temp/product_recommend_03.jpg" alt="애플파이" />
                              </div>
                              <div className="detail-wrap">
                                <p className="title">
                                  애플파이
                                  <span className="en">Apple Pie</span>
                                </p>
                              </div>
                            </div>
                          </li>
                          <li className="swiper-slide">
                            <div className="item menu">
                              <div className="img-wrap">
                                <img src="/@resource/images/@temp/product_recommend_04.jpg" alt="고소한 단팥빵" />
                              </div>
                              <div className="detail-wrap">
                                <p className="title">
                                  고소한 단팥빵
                                  <span className="en">Sweet Red-bean</span>
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </Swiper>
                    </div>
                    {/* // [D] 추천 메뉴 있을 시 노출 */}
                    <div className="btn-area col-2">
                      <Link to="#" className="btn x-large normal" onClick={() => otherMenu()}>
                        다른 메뉴 더 담기
                      </Link>
                      <Link to="/cart" className="btn x-large dark btn-close">
                        장바구니 바로가기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* // 장바구니 추가 완료 팝업 영역 */}

            <button type="button" id="moveScrollTop" className="btn scroll-top">
              <i className="ico arr-top"></i>
            </button>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
