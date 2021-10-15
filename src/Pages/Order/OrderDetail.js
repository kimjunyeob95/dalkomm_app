/* eslint-disable no-script-url */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import { Link, useHistory, useParams } from "react-router-dom";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { Swiper } from "swiper/react";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";

export default function OrderDetail() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const history = useHistory();
  const { orderCode } = useParams();
  const [optionType, setOption] = useState({});
  const [cupType, setCup] = useState("포장컵");
  const [priceValue, setPrice] = useState({ defaultPrice: 4300 });

  const body = {};
  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };

  useEffect(() => {
    contGap();
  }, [state?.auth]);

  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    contGap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionType]);
  const submitOrder = () => {
    var form = $(".form")[0];
    var formData = new FormData(form);
    formData.append("orderCount", $("#orderCount").val());
    formData.append("sumPrice", priceValue.curruntPrice);
    formData.append("orderName", $("#orderName").text());
    formData.append("orderImg", $("#orderImg").attr("src"));
    if (optionType?.show) {
      formData.append("optionCount", $("#optionCount").val());
    }
    history.push({
      pathname: "/order/final",
      from: "orderDetail",
      orderData: formData,
    });
  };

  const handleSubmitCart = (event) => {
    axios
      .all([
        axios.post(
          `${SERVER_DALKOMM}/app/api/v2/smartorder/cart/add`,
          { menu_code: orderCode, quantity: Number($("#orderCount").val()), price: Number(priceValue.curruntPrice) },
          header_config
        ),
      ])
      .then(
        axios.spread((res1) => {
          let all_menu = res1.data.data;
          setData((origin) => {
            return {
              ...origin,
              all_menu,
            };
          });
        })
      );
  };

  const otherMenu = () => {
    $("body").removeClass("modal-opened");
    history.push("/order/menu");
  };

  const handleResultText = () => {
    handleOptionText();
    handleResultPrice();
  };

  const handleResultPrice = () => {
    let total_price = Number(priceValue?.defaultPrice);
    let price_menu = {
      menu_type: $('input[name="orderType"]:checked').val(),
      menu_size: $('input[name="orderSize"]:checked').val(),
      menu_cup: $('input[name="orderCup"]:checked').val(),
      shot: Number($('input[name="shot"]').val()),
      hazelnut: Number($('input[name="hazelnut"]').val()),
      vanilla: Number($('input[name="vanilla"]').val()),
      whippingCream: $('input[name="whippingCream"]').is(":checked"),
      orderCount: Number($("#orderCount").val()),
    };
    // if (price_menu.menu_type === "H") {
    //   total_price -= 300;
    // }
    // if (price_menu.menu_size === "L") {
    //   total_price += 300;
    // }
    if (price_menu.menu_cup === "P") {
      total_price -= 300;
    }
    if (price_menu.shot > 0) {
      total_price = total_price + price_menu.shot * 500;
    }
    if (price_menu.hazelnut > 0) {
      total_price += 500;
    }
    if (price_menu.vanilla > 0) {
      total_price += 500;
    }
    if (price_menu.whippingCream !== false) {
      total_price += 500;
    }
    total_price = total_price * price_menu.orderCount;
    $("#totalPrice").text(total_price.toLocaleString("ko-KR") + "원");
  };

  const handleOptionText = () => {
    let menu_type = $('input[name="orderType"]:checked').attr("text");
    let menu_size = $('input[name="orderSize"]:checked').attr("text");
    let menu_cup = $('input[name="orderCup"]:checked').attr("text");

    let option_array = [
      { text: $('input[name="shot"]').attr("text"), value: $('input[name="shot"]').val() },
      { text: $('input[name="hazelnut"]').attr("text"), value: $('input[name="hazelnut"]').val() },
      { text: $('input[name="vanilla"]').attr("text"), value: $('input[name="vanilla"]').val() },
      { text: $('input[name="whippingCream"]').attr("text"), value: $('input[name="whippingCream"]').is(":checked") },
    ];

    let returnText = "";

    $(".en.option.menutype").text(menu_type + ",");
    $(".en.option.size").text(menu_size + ",");
    $(".option.cup").text(menu_cup);
    $(".addopion").remove();
    option_array.forEach((element, index) => {
      if (element.value !== "0" && element.value !== false) {
        if (element.text === "휘핑 크림") {
          returnText += `<span class="addopion">, ${element.text}</span>`;
        } else {
          returnText += `<span class="addopion">, ${element.text} ${element.value}</span>`;
        }
      }
    });

    $(".text.option").append(returnText);
  };

  const handleOption = (e, flag, type) => {
    let count;
    if (flag === "plus") {
      count = Number($(e).prev("input").val());
      $(e)
        .prev("input")
        .val(count + 1);
      if (type === "샷") {
        $(e).parents("li").addClass("adding");
        $(e)
          .parent()
          .siblings(".speech-bubble")
          .text(`+ ${(count + 1) * 500} ₩`);
      } else if (type === "헤이즐럿" || type === "바닐라") {
        if (count < 1) {
          $(e).parents("li").addClass("adding");
        }
      }
    } else if (flag === "minus") {
      count = Number($(e).next("input").val());
      if (count > 0) {
        if (type === "주문수량" && count === 1) {
          return false;
        }
        count === 1 && $(e).parents("li").removeClass("adding");
        $(e)
          .next("input")
          .val(count - 1);
        if (type === "샷") {
          $(e)
            .parent()
            .siblings(".speech-bubble")
            .text(`+ ${(count - 1) * 500} ₩`);
        }
      }
    } else if (flag === "휘핑크림") {
      if (type === "휘핑크림") {
        $(e).is(":checked") ? $(e).parents("li").addClass("adding") : $(e).parents("li").removeClass("adding");
      }
    }
    handleResultText();
  };

  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub className="only-button-header" />

          <div id="content" className="drink detail">
            <section className="section">
              <div className="item drink-info">
                <div className="img-wrap">
                  <img id="orderImg" src="/@resource/images/@temp/product_detail_02.jpg" alt="카라멜마끼아또" />
                </div>
                <div className="detail-wrap">
                  <div className="text-box">
                    <p className="type en fc-orange">COFFEE</p>
                    <p className="name">
                      <span id="orderName">카라멜마끼아또</span>
                      <span className="en">Caramelmcchiato</span>
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
                      <input
                        type="radio"
                        id="orderType01"
                        name="orderType"
                        value="I"
                        text="ICE"
                        defaultChecked={true}
                        onChange={() => handleResultText()}
                      />
                      <label htmlFor="orderType01" className="btn normal small">
                        <strong className="en">ICE</strong>
                      </label>
                      <input type="radio" id="orderType02" name="orderType" value="H" text="HOT" onChange={() => handleResultText()} />
                      <label htmlFor="orderType02" className="btn normal small">
                        <strong className="en">HOT</strong>
                      </label>
                    </div>
                  </div>

                  <div className="w-inner">
                    <div className="field">
                      <span className="label en">Size</span>
                      <div className="select-group col-2">
                        <input
                          type="radio"
                          id="orderSize01"
                          name="orderSize"
                          value="R"
                          text="Regular"
                          defaultChecked={true}
                          onChange={() => handleResultText()}
                        />
                        <label htmlFor="orderSize01" className="btn bdr medium">
                          <p className="text">
                            <strong className="en">Regular</strong>
                            <span className="en">375ml</span>
                          </p>
                        </label>
                        <input type="radio" id="orderSize02" name="orderSize" value="L" text="Large" onChange={() => handleResultText()} />
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
                        <input
                          type="radio"
                          id="orderCup01"
                          name="orderCup"
                          value="M"
                          text="매장용 컵"
                          defaultChecked={true}
                          onClick={() => handleResultText()}
                        />
                        <label htmlFor="orderCup01" className="btn bdr medium">
                          <strong>매장용</strong>
                        </label>
                        <input type="radio" id="orderCup02" name="orderCup" value="I" text="일회용 컵" onClick={() => handleResultText()} />
                        <label htmlFor="orderCup02" className="btn bdr medium">
                          <strong>일회용</strong>
                        </label>
                        <input type="radio" id="orderCup03" name="orderCup" value="P" text="개인 컵" onClick={() => handleResultText()} />
                        <label htmlFor="orderCup03" className="btn bdr medium">
                          <strong>개인</strong>
                          <span className="speech-bubble small en">- 300 &#8361;</span>
                        </label>
                      </div>
                    </div>

                    <div className="field">
                      <span className="label en">Option</span>
                      <ul className="data-list option-list">
                        <li>
                          {" "}
                          {/* [D] 옵션 추가시 adding 클래스 활성화 */}
                          <div className="item options">
                            <label>샷 추가</label>
                            <div className="amount-wrap">
                              <p className="uio-amount">
                                <button type="button" className="btn amount" onClick={(event) => handleOption(event.currentTarget, "minus", "샷")}>
                                  <i className="ico decrease"></i>
                                  <span className="blind">감소</span>
                                </button>
                                <input type="number" name="shot" text="샷" defaultValue={0} className="ea" disabled /> {/* [D] 디폴트 값 0 */}
                                <button type="button" className="btn amount" onClick={(event) => handleOption(event.currentTarget, "plus", "샷")}>
                                  <i className="ico increase"></i>
                                  <span className="blind">증가</span>
                                </button>
                              </p>
                              <span className="speech-bubble small en"> {/* [D] 수량 증가 시 금액 증가 */}+ 500 &#8361;</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="item options">
                            <label>헤이즐럿 시럽 추가</label>
                            <div className="amount-wrap">
                              <p className="uio-amount">
                                <button
                                  type="button"
                                  className="btn amount"
                                  onClick={(event) => handleOption(event.currentTarget, "minus", "헤이즐럿")}
                                >
                                  <i className="ico decrease"></i>
                                  <span className="blind">감소</span>
                                </button>
                                <input type="number" name="hazelnut" text="헤이즐럿 시럽" defaultValue={0} className="ea" disabled />{" "}
                                {/* [D] 디폴트 값 0 */}
                                <button
                                  type="button"
                                  className="btn amount"
                                  onClick={(event) => handleOption(event.currentTarget, "plus", "헤이즐럿")}
                                >
                                  <i className="ico increase"></i>
                                  <span className="blind">증가</span>
                                </button>
                              </p>
                              <span className="speech-bubble small en"> {/* [D] 수량 증가 시 금액 증가 */}+ 500 &#8361;</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="item options">
                            <label>바닐라 시럽 추가</label>
                            <div className="amount-wrap">
                              <p className="uio-amount">
                                <button
                                  type="button"
                                  className="btn amount"
                                  onClick={(event) => handleOption(event.currentTarget, "minus", "바닐라")}
                                >
                                  <i className="ico decrease"></i>
                                  <span className="blind">감소</span>
                                </button>
                                <input type="number" name="vanilla" text="바닐라 시럽" defaultValue={0} className="ea" disabled />{" "}
                                {/* [D] 디폴트 값 0 */}
                                <button type="button" className="btn amount" onClick={(event) => handleOption(event.currentTarget, "plus", "바닐라")}>
                                  <i className="ico increase"></i>
                                  <span className="blind">증가</span>
                                </button>
                              </p>
                              <span className="speech-bubble small en"> {/* [D] 수량 증가 시 금액 증가 */}+ 500 &#8361;</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="item options">
                            <label htmlFor="whippingCream">휘핑 크림</label>
                            {/* [D] 211014 .amount-wrap 추가 */}
                            <div className="amount-wrap">
                              <input
                                type="checkbox"
                                className="checkbox"
                                defaultChecked={false}
                                name="whippingCream"
                                id="whippingCream"
                                text="휘핑 크림"
                                onClick={(event) => handleOption(event.currentTarget, "휘핑크림", "휘핑크림")}
                              />
                              <span className="speech-bubble small en"> {/* [D] 수량 증가 시 금액 증가 */}+ 500 &#8361;</span>
                            </div>
                            {/* // [D] 211014 .amount-wrap 추가 */}
                          </div>
                        </li>
                      </ul>
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
                            <dt className="title">주문 수량</dt>
                            <dd className="price">
                              <p className="uio-amount">
                                <button
                                  type="button"
                                  className="btn amount"
                                  onClick={(event) => handleOption(event.currentTarget, "minus", "주문수량")}
                                >
                                  <i className="ico decrease"></i>
                                  <span className="blind">감소</span>
                                </button>
                                <input type="number" defaultValue={1} className="ea" disabled id="orderCount" />
                                <button
                                  type="button"
                                  className="btn amount"
                                  onClick={(event) => handleOption(event.currentTarget, "plus", "주문수량")}
                                >
                                  <i className="ico increase"></i>
                                  <span className="blind">증가</span>
                                </button>
                              </p>
                            </dd>
                          </dl>
                        </div>
                      </li>

                      {/* [D] 211013 li.option 수정 */}
                      <li className="option">
                        <div className="item info-order">
                          <dl className="flex-both w-inner">
                            <dt className="title en">Option</dt>
                            <dd className="text option">
                              <span className="en option menutype">Ice,</span>
                              <span className="en option size">Regular,</span>
                              <span className="option cup">매장용 컵</span>
                              {/* <span className="option shot hide"></span>
                              <span className="option hazelnut hide"></span>
                              <span className="option vanilla hide"></span>
                              <span className="option whippingCream hide"></span> */}
                            </dd>
                          </dl>
                        </div>
                      </li>
                      {/* // [D] 211013 li.option 수정 */}
                    </ul>
                    <div className="item info-order">
                      <dl className="flex-both w-inner">
                        <dt className="title">주문 금액</dt> {/* [D] 211013 .en 삭제 , 텍스트 수정 */}
                        <dd className="price fc-orange" id="totalPrice">
                          {priceValue.defaultPrice.toLocaleString("ko-KR")}원
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="btn-area col-2">
                    <button type="button" className="btn x-large light-g open-pop" pop-target="#addCart">
                      장바구니 담기
                    </button>
                    <a className="btn x-large dark">주문하기</a>
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
                      <Link to="/mypage/cart" className="btn x-large dark btn-close">
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
