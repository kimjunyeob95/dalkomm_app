/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap, moveScrollTop, tabLink, fadeInOut } from "Jquery/Jquery";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";
import { fadeOut } from "Config/GlobalJs";

export default function OrderFavorite() {
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

  const axiosFn = () => {
    axios.all([axios.get(`${SERVER_DALKOMM}/app/api/v2/favorite/menu/list`, header_config)]).then(
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
    fadeOut();
  }, [axioData]);

  const handleRemove = () => {
    let chk_array = [];
    $(".favorite-chk:checked").each(function (i, e) {
      chk_array.push(Number($(e).attr("seqno")));
    });
    if (chk_array.length > 0) {
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/favorite/menu/delete`, { favorite_seq_list: chk_array }, header_config)]).then(
        axios.spread((res1) => {
          if (res1.data.meta.code === 20000) {
            alert("해당 메뉴가 즐겨찾기에 삭제되었습니다.");
            $("#drinkDelete").removeClass("active");
            $("body").removeClass("modal-opened");
            axiosFn();
          }
        })
      );
    } else {
      alert("삭제할 메뉴를 선택해주세요.");
    }
  };

  const handleSubmitCart = (event) => {
    let add_array = {};
    let menu_array = [];
    $(".favorite-chk:checked").each(function (i, e) {
      menu_array.push(Number($(e).attr("smartorder_menu_id")));
    });
    add_array = {
      smartorder_menu_id_list: menu_array,
      store_code: String(storeCode),
    };
    if (menu_array.length > 0) {
      axios
        .all([axios.post(`${SERVER_DALKOMM}/app/api/v2/favorite/menu/to/cart`, add_array, header_config)])
        .then(axios.spread((res1) => {}))
        .catch((res) => {
          $("#addCart").removeClass("active");
          $("body").removeClass("modal-opened");
          alert("관리자에 문의 바랍니다.");
        });
    } else {
      alert("장바구니에 추가할 메뉴를 선택해주세요.");
      setTimeout(() => {
        $("#addCart").removeClass("active");
        $("body").removeClass("modal-opened");
      }, 1);
    }
  };

  const submitOrder = () => {
    let add_array = {};
    let menu_array = [];
    $(".favorite-chk:checked").each(function (i, e) {
      menu_array.push(Number($(e).attr("smartorder_menu_id")));
    });
    add_array = {
      smartorder_menu_id_list: menu_array,
      store_code: String(storeCode),
    };
    if (menu_array.length > 0) {
      axios
        .all([axios.post(`${SERVER_DALKOMM}/app/api/v2/favorite/menu/to/order`, add_array, header_config)])
        .then(
          axios.spread((res1) => {
            if (res1.data.meta.code === 20000) {
              history.push(`/order/final/${res1.data.data.smartorder_orderinfo_id}`);
            } else {
              alert(res1.data.meta.msg);
            }
          })
        )
        .catch((res) => {
          alert("관리자에 문의 바랍니다.");
        });
    } else {
      alert("주문할 메뉴를 선택해주세요.");
    }
  };

  if (axioData?.res1_data) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="즐겨찾는 메뉴" headerPopup={true} popTarget={true} />

            <div id="content" className="mypage order bookmark fade-in">
              <ul className="order-list data-list">
                {axioData?.res1_data?.favorite_list?.map((e, i) => (
                  <li key={i}>
                    <div className="item order">
                      <div className="item order">
                        <div className="img-wrap">
                          <img src={e?.type === "I" ? e?.thumbnail_image_ice_simple : e?.thumbnail_image_hot_simple} alt={e?.name_kor} />
                        </div>
                        <div className="detail-wrap">
                          <div className="order-info">
                            <p className="title">{e?.name_kor}</p>
                            <p className="info">
                              {e?.type && <span className="en">{e?.type === "I" ? "ICE" : "HOT"}</span>}
                              {e?.size && (
                                <span className="en">{e?.size === "R" ? "Regular" : e?.size === "L" ? "Large" : e?.size === "B" ? "Big" : ""}</span>
                              )}
                              {e?.cup && <span>{e?.cup === "I" ? "일회용 컵" : e?.cup === "M" ? "매장용 컵" : e?.cup === "P" ? "개인컵" : ""}</span>}
                            </p>
                            <p className="option flex-both">
                              {/* <span>
                                <em className="en">Option :</em>샷 추가
                              </span>
                              <span>
                                <em>수량 :</em>
                                {e?.quantity}
                              </span> */}
                            </p>
                          </div>
                          <div className="price-wrap flex-both">
                            <p className="price fc-orange">{((e.price + e.option_price) * e?.quantity).toLocaleString("ko-KR")}원</p>
                            <span>
                              <em>수량 :</em>
                              {e?.quantity}
                            </span>
                          </div>
                          <div className="check-wrap">
                            <input
                              type="checkbox"
                              className="checkbox favorite-chk"
                              smartorder_menu_id={e?.fk_smartorder_menu_id}
                              seqno={e?.seqno}
                              quantity={e?.quantity}
                              price={e?.price}
                              data-size={e?.size}
                              cup={e?.cup}
                              menu_type={e?.type}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* 신규 쿠폰 추가 버튼 영역 */}
              <div className="fixed-con active">
                <div className="popup">
                  <div className="popup-wrap">
                    <div className="btn-area col-2">
                      <button type="button" className="btn x-large normal open-pop" pop-target="#addCart" onClick={() => handleSubmitCart()}>
                        장바구니 담기
                      </button>
                      <button className="btn x-large dark btn-close" onClick={() => submitOrder()}>
                        주문하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 신규 쿠폰 추가 버튼 영역 */}

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
                      <div className="btn-area col-1">
                        <Link to={`/mypage/cart/${storeCode}`} className="btn x-large dark btn-close">
                          장바구니 바로가기
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 장바구니 추가 완료 팝업 영역 */}

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
                          선택 메뉴를 즐겨찾기에서
                          <br />
                          삭제하시겠습니까?
                        </p>
                      </div>
                      <div className="btn-area col-2">
                        <button type="reset" className="btn large normal" onClick={() => handleRemove()}>
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
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
