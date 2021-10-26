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
    axios
      .all([
        axios.get(
          `${SERVER_DALKOMM}/app/api/v2/favorite/menu/list`,
          header_config
        ),
      ])
      .then(
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

  const handleRemove = () => {
    let chk_array = [];
    $(".favorite-chk:checked").each(function (i, e) {
      chk_array.push(Number($(e).attr("seqno")));
    });
    if (chk_array.length > 0) {
      axios
        .all([
          axios.post(
            `${SERVER_DALKOMM}/app/api/v2/favorite/menu/delete`,
            { favorite_seq_list: chk_array },
            header_config
          ),
        ])
        .then(
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
  if (axioData?.res1_data) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub
              title="즐겨찾는 메뉴"
              headerPopup={true}
              popTarget={true}
            />

            <div id="content" className="mypage order bookmark">
              <ul className="order-list data-list">
                {axioData?.res1_data?.favorite_list?.map((e, i) => (
                  <li key={i}>
                    <div className="item order">
                      <div className="item order">
                        <div className="img-wrap">
                          <img
                            src={
                              e?.type === "I"
                                ? e?.thumbnail_image_ice_simple
                                : e?.thumbnail_image_hot_simple
                            }
                            alt={e?.name_kor}
                          />
                        </div>
                        <div className="detail-wrap">
                          <div className="order-info">
                            <p className="title">{e?.name_kor}</p>
                            <p className="info">
                              <span className="en">
                                {e?.type === "I" ? "ICE" : "HOT"}
                              </span>
                              <span className="en">
                                {e?.size === "R"
                                  ? "Regular"
                                  : e?.size === "L"
                                  ? "Large"
                                  : e?.size === "B"
                                  ? "Big"
                                  : ""}
                              </span>
                              <span>
                                {e?.cup === "I"
                                  ? "일회용 컵"
                                  : e?.cup === "M"
                                  ? "매장용 컵"
                                  : e?.cup === "P"
                                  ? "개인컵"
                                  : ""}
                              </span>
                            </p>
                            <p className="option flex-both">
                              <span>
                                <em className="en">Option :</em>샷 추가
                              </span>
                              <span>
                                <em>횟수 :</em>1
                              </span>
                            </p>
                          </div>
                          <div className="price-wrap flex-both">
                            <p className="price fc-orange">
                              {(e.price + e.option_price).toLocaleString(
                                "ko-KR"
                              )}
                              원
                            </p>
                          </div>
                          <div className="check-wrap">
                            <input
                              type="checkbox"
                              className="checkbox favorite-chk"
                              smartorder_menu_id={e?.fk_smartorder_menu_id}
                              seqno={e?.seqno}
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
                      <a href="TO005.html" className="btn x-large light-g">
                        장바구니 담기
                      </a>
                      <a
                        href="TO006.html"
                        className="btn x-large dark btn-close"
                      >
                        주문하기
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 신규 쿠폰 추가 버튼 영역 */}
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
                        <button
                          type="reset"
                          className="btn large normal"
                          onClick={() => handleRemove()}
                        >
                          삭제하기
                        </button>
                        <button
                          type="button"
                          className="btn large light-g btn-close"
                        >
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
