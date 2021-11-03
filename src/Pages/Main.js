/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import HeaderMain from "Components/Header/HeaderMain";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import Popup_nomal from "Components/Popup/Popup_nomal";

import { accordion, scrollDetail, popupOpen, contGap, moveScrollTop, fadeInOut } from "Jquery/Jquery";
import { checkMobile, getCookieValue, fadeOut } from "Config/GlobalJs";
import { SERVER_DALKOMM } from "Config/Server";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Scrollbar } from "swiper/core";
import { authContext } from "ContextApi/Context";

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Clipboard from "react-clipboard.js";

export function Main(props) {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const [storeData, setStore] = useState(false);
  const history = useHistory();

  const body = {};

  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let location_body = { latitude: getCookieValue("latitude"), longitude: getCookieValue("longitude") };
    // let location_body = { latitude: 37.507232666015625, longitude: 127.05642398540016 };
    //최초 진입 시 실행
    if (state.accessToken !== "") {
      //로그인 시

      axios
        .all([
          axios.post(`${SERVER_DALKOMM}/app/api/main`, body, header_config),
          axios.post(`${SERVER_DALKOMM}/app/api/main/user`, body, header_config),
          axios.post(`${SERVER_DALKOMM}/app/api/account/simple/profile`, body, header_config),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/store/around`, location_body, header_config),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/coupon/list`, body, header_config),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/membership`, body, header_config),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/orderinfo/list`, { page: 1, duration: "w" }, header_config),
        ])
        .then(
          axios.spread((res1, res2, res3, res4, res5, res6, res7) => {
            let res1_data = res1.data.data;
            let res2_data = res2.data.data;
            let res3_data = res3.data.data;
            let res4_data = res4.data.data;
            let res5_data = res5.data.data;
            let res6_data = res6.data.data;
            let res7_data = res7.data.data;
            setData((origin) => {
              return {
                ...origin,
                res1_data,
                res2_data,
                res3_data,
                res4_data,
                res5_data,
                res6_data,
                res7_data,
              };
            });
          })
        );
    } else {
      //비로그인 시
      if (state.auth !== "") {
        axios
          .all([
            axios.post(`${SERVER_DALKOMM}/app/api/main`, body, header_config),
            axios.post(`${SERVER_DALKOMM}/app/api/v2/store/around`, location_body, header_config),
          ])
          .then(
            axios.spread((res1, res2) => {
              let res1_data = res1.data.data;
              let res2_data = res2.data.data;
              setData((origin) => {
                return {
                  ...origin,
                  res1_data,
                  res2_data,
                };
              });
            })
          );
      }
    }
  }, []);
  useEffect(() => {
    scrollDetail();
    contGap();
    fadeOut();
    SwiperCore.use([Autoplay, Scrollbar]);
  }, [axioData]);

  const handleLogin = (e) => {
    try {
      if (checkMobile() === "android") {
        window.android.fn_login();
      } else if (checkMobile() === "ios") {
        window.webkit.messageHandlers.fn_login.postMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = (e, storeCode) => {
    if ($(e).hasClass("active")) {
      //즐겨찾기 삭제
      if ($(e).prop("tagName") === "BUTTON") {
        $("span.btn.bookmark").each(function (index, element) {
          if ($(element).data("storecode") === storeCode) {
            $(element).removeClass("active");
          }
        });
      }
      axios
        .all([axios.post(`${SERVER_DALKOMM}/app/api/v2/favorite/store/delete`, { store_code: storeCode }, header_config)])
        .then(axios.spread((res1) => {}));
    } else {
      //즐겨찾기 추가
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/favorite/store/add`, { store_code: storeCode }, header_config)]).then(
        axios.spread((res1) => {
          if (res1.data.meta.code !== 20000) {
            $("#resAlert").text(res1.data.meta.msg);
            $(".overlay.popupExitJoin").addClass("active");
            $("body").addClass("modal-opened");
            $(e).removeClass("active");
          }
        })
      );
    }
  };

  const handleDetail = (e, storeCode) => {
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/store/${storeCode}`, {}, header_config)]).then(
      axios.spread((res1) => {
        let detailStore = res1.data.data;
        setStore((origin) => {
          return {
            ...origin,
            detailStore,
          };
        });
      })
    );
  };

  const handleCall = (number) => {
    let data = { phoneNum: number };
    data = JSON.stringify(data);
    try {
      if (checkMobile() === "android") {
        window.android.fn_directCall(data);
      } else if (checkMobile() === "ios") {
        window.webkit.messageHandlers.fn_directCall.postMessage(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //axios 반환 시
  if (axioData) {
    // return (
    //   <div style={{ wordBreak: "break-all" }}>
    //     <p> accessToken : {state?.accessToken}</p>
    //     <br />
    //     <p> auth : {state?.auth}</p>
    //     <br />
    //   </div>
    // );
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderMain />

            <Nav order={1} />

            <div id="content" className="main home fade-in">
              {/* main-visual */}
              <Swiper
                id="mainVisual"
                className="swiper-container main-visual"
                slidesPerView={1}
                scrollbar={{
                  el: "#mainVisual .swiper-scrollbar",
                  draggable: true,
                }}
                loop={false}
                freeMode={false}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
              >
                <ul className="swiper-wrapper">
                  {axioData?.res1_data?.main_banner_list?.map((e, i) => {
                    return (
                      <SwiperSlide className="swiper-slide" key={i}>
                        <div className="banner-wrap main-top-banner">
                          <div className="img-wrap">
                            <img src={e?.image_url} alt="여름 스테디셀러" />
                          </div>
                          <div className="content-wrap">
                            <div className="w-inner flex-end">
                              <p className="sub-copy en fc-orange">STORY</p>
                              <h2 className="main-copy">{e?.title}</h2>
                              <p className="text">꾸준히 인기있는 여름 음료 추천전</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </ul>
                <div className="swiper-scrollbar"></div>
                <Link to="/story/list" className="btn view-page">
                  <i className="ico arr-r">
                    <span className="blind">스토리 바로가기</span>
                  </i>
                </Link>
              </Swiper>
              {/* // main-visual */}

              {/* myinfo-wrap */}
              {state?.loginFlag ? (
                <div className="item my-info">
                  <p className="user">
                    <span className="fc-orange">{decodeURI(axioData?.res3_data?.name)}</span> 고객님
                  </p>
                  <button
                    type="button"
                    className="btn barcode open-pop"
                    pop-target="#zoomCardMembership"
                    onClick={(e) => popupOpen(e.currentTarget, axioData?.res6_data?.stamp_card_number)}
                  >
                    <i className="ico barcode" pop-target="#zoomCardMembership">
                      <span>바코드</span>
                    </i>
                  </button>
                  <div className="speech-wrap">
                    <p className="speech-bubble ani">오늘은 신메뉴 어떠세요?</p>
                  </div>
                </div>
              ) : (
                <div className="item my-info" onClick={(e) => handleLogin(e.currentTarget)}>
                  <p className="user">
                    <span className="fc-orange">로그인</span> 하고 달콤한 혜택을 누려보세요.
                  </p>
                  <Link to="#" className="btn barcode">
                    <i className="ico barcode">
                      <span>바코드</span>
                    </i>
                  </Link>
                </div>
              )}
              <div className="myinfo-wrap">
                <ul className="data-list col-3">
                  <li>
                    <Link to="/pay" className="item my-state">
                      <div className="img-wrap">
                        <i className="ico pay-c">
                          <span>기프트 카드</span>
                        </i>
                      </div>
                      <div className="data-wrap">
                        <p className="title">기프트 카드 잔액</p>
                        <p className="state">
                          {state?.loginFlag ? axioData?.res2_data?.user?.charge_card_amount?.toLocaleString("ko-KR") + "원" : "-"}
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/mypage/stamp" className="item my-state">
                      <div className="img-wrap">
                        <i className="ico stamp">
                          <span>보유 스탬프</span>
                        </i>
                      </div>
                      <div className="data-wrap">
                        <p className="title">보유 스탬프 수</p>
                        <p className="state">
                          {state?.loginFlag ? (
                            <React.Fragment>
                              {axioData?.res2_data?.user?.stamp_card?.complete_count} <em>/ 12</em>
                            </React.Fragment>
                          ) : (
                            "-"
                          )}
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/order" className="item my-state">
                      <div className="img-wrap">
                        <i
                          className={`ico store-type small ${
                            axioData?.res4_data?.store_list[0]?.store_type === 0
                              ? "house"
                              : axioData?.res4_data?.store_list[0]?.store_type === 1
                              ? "building"
                              : axioData?.res4_data?.store_list[0]?.store_type === 2
                              ? "rest-area"
                              : axioData?.res4_data?.store_list[0]?.store_type === 3
                              ? "terminal"
                              : axioData?.res4_data?.store_list[0]?.store_type === 4
                              ? "head-office"
                              : axioData?.res4_data?.store_list[0]?.store_type === 5
                              ? "drive-thru"
                              : axioData?.res4_data?.store_list[0]?.store_type === 6
                              ? "drive-thru"
                              : axioData?.res4_data?.store_list[0]?.store_type === 7
                              ? "vivaldi-park"
                              : axioData?.res4_data?.store_list[0]?.store_type === 8
                              ? "hospital"
                              : axioData?.res4_data?.store_list[0]?.store_type === 9
                              ? "cinema"
                              : ""
                          }`}
                        >
                          {/* 매장 타입별 
                                        .ico.store-type.small
                                        .ico.store-type.small.house : 기본형 (단독건물매장)
                                        .ico.store-type.small.building : 기본형 (건물내매장)
                                        .ico.store-type.small.rest-area : 고속도로 휴게소점
                                        .ico.store-type.small.terminal : 버스터미널점
                                        .ico.store-type.small.head-office : 분당서현점(본점)
                                        .ico.store-type.small.drive-thru : 광주쌍령DT점 (드라이브스루)
                                        .ico.store-type.small.vivaldi-park : 비발디파크점
                                        .ico.store-type.small.hospital :  병원내 지점
                                        .ico.store-type.small.cinema : 영화관내 지점
                                        .ico.store-type.small.theme-park : 놀이공원, 유원지, 테마파크 지점 (EX, 키자니아, 에버랜드, 유원지)
                                    */}
                          <span>가까운 매장</span>
                        </i>
                      </div>
                      <div className="data-wrap">
                        <p className="title">가까운 매장</p>
                        <p className="state">
                          {state?.loginFlag && state?.latitude ? (
                            <React.Fragment>{axioData?.res4_data?.store_list[0]?.store_name}</React.Fragment>
                          ) : (
                            "-"
                          )}
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* // myinfo-wrap */}

              {/* 나의 최근 주문 */}
              <section className="section">
                <div className="title-wrap w-inner flex-both">
                  <h3 className="section-title">{state?.loginFlag ? "나의 최근 주문" : "달콤 추천 메뉴"}</h3>
                  <Link to={`/mypage/orderRecipt`} className="btn text">
                    <span>전체 메뉴</span>
                    <i className="ico arr-r"></i>
                  </Link>
                </div>

                <Swiper id="recentlyOrder" className="swiper-container section-slider menu-slider" slidesPerView={"auto"} freeMode={false}>
                  <ul className="swiper-wrapper">
                    {axioData?.res7_data?.result?.map((element, index) => (
                      <SwiperSlide className="swiper-slide" key={index} onClick={() => history.push(`/order/info/${element?.smartorderinfo_id}`)}>
                        <div className="item menu">
                          <div className="img-wrap">
                            <img
                              src={element?.menu_with_type === "I" ? element?.menu_with_ice_img : element?.menu_with_hot_img}
                              alt="아메리카노 ICE (R)"
                            />
                          </div>
                          <div className="detail-wrap">
                            <p className="title">
                              {element?.menu_name_with_count} {element?.menu_with_type === "I" ? "ICE" : "HOT"} ({element?.menu_with_size})
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </ul>
                </Swiper>
              </section>
              {/* // 나의 최근 주문 */}

              {/* 나의 보유 쿠폰 */}
              {state?.loginFlag && axioData?.res5_data?.coupon_list?.length > 0 && (
                <section className="section">
                  <div className="w-inner">
                    <div className="title-wrap flex-both">
                      <h3 className="section-title">나의 보유 쿠폰</h3>
                      <Link to="/mypage/coupon" className="btn text">
                        <span>더 보기</span>
                        <i className="ico arr-r"></i>
                      </Link>
                    </div>
                    <ul className="coupon-list data-list accordion">
                      {axioData?.res5_data?.coupon_list
                        ?.filter((e, i) => e.status === 0)
                        .map((e, i) => (
                          <li key={i}>
                            <div className="item coupon js-accordion-switche" onClick={(e) => accordion(e.target, 0)}>
                              <div className="data-wrap">
                                <p className="day num fc-orange">{e?.due_date}</p>
                                <p className="title">{e?.coupon_name}</p>
                              </div>
                              <div className="ico-wrap flex-center">
                                <i className="ico accordion-arr"></i>
                              </div>
                            </div>
                            <div className="item attention js-accordion-content">
                              <dl>
                                <dt className="title">
                                  <i className="ico alert"></i>쿠폰 유의사항
                                </dt>
                                <dd className="text">
                                  <ul className="attention-list">
                                    {e?.detail_cautions?.split("\r\n").map((e, i) => (
                                      <li key={i}>{e}</li>
                                    ))}
                                  </ul>
                                </dd>
                              </dl>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </section>
              )}
              {/* // 나의 보유 쿠폰 */}

              {/* 달콤 스토리 */}
              <section className="section">
                <div className="w-inner">
                  <Link to="/story/list" className="item dalkomm-story">
                    <div className="badge-wrap">
                      <span className="badge square event">EVENT</span>
                      {/* 달콤스토리 .badge.square 타입
                                    .badge.square.story : 브랜드 스토리 콘텐츠
                                    .badge.square.event : 이벤트/프로모션
                                    .badge.square.store : 신규 매장 소개
                                    .badge.square.new   : 신메뉴 소개 
                                    .badge.square.pick  : 달콤 굿즈 소개
                                */}
                      <span className="d-day num">D-30</span>
                    </div>
                    <div className="img-wrap">
                      <img src="/@resource/images/@temp/thum_event_01.jpg" alt="{title}" />
                    </div>
                    <div className="data-wrap">
                      <p className="title">월요일은 페이코인 DAY!</p>
                      <p className="text">페이코인 현장 결제 시, 아메리카노가 100원!</p>
                      <p className="date">2021.06.14 </p>
                    </div>
                  </Link>
                </div>
              </section>
              {/* // 달콤 스토리 */}

              <section className="section">
                {/* 주변 매장 찾기 */}
                <div className="title-wrap w-inner flex-both">
                  <h3 className="section-title">주변 매장 찾기</h3>
                  <Link to="/order" className="btn text">
                    <span>더 보기</span>
                    <i className="ico arr-r"></i>
                  </Link>
                </div>

                <Swiper id="searchStore" className="swiper-container section-slider store-slider" slidesPerView={"auto"} freeMode={false}>
                  <ul className="swiper-wrapper data-list">
                    {axioData?.res4_data?.store_list?.map((e, i) => {
                      return (
                        <SwiperSlide className="swiper-slide" key={i}>
                          <a
                            data-href="#tableOrderAble"
                            className="item store open-layer"
                            onClick={(event) => handleDetail(event.currentTarget, e.store_code)}
                          >
                            <div className="flex-both">
                              <span
                                className={`btn bookmark ${e.store_is_favorite && "active"}`}
                                onClick={(event) => handleFavorite(event.currentTarget, e.store_code)}
                              >
                                <i className="ico heart">
                                  <span>즐겨찾기</span>
                                </i>
                              </span>
                              <span className={`table-order ${e.store_is_smartorder === true ? "possible" : "impossible"}`}></span>{" "}
                              {/* .table-order.possible : 테이블 오더 가능 매장 / .table-order.impossible : 테이블 오더 불가능 매장 */}
                            </div>
                            <div className="img-wrap">
                              <i
                                className={`ico store-type ${
                                  e?.store_type === 0
                                    ? "house"
                                    : e?.store_type === 1
                                    ? "building"
                                    : e?.store_type === 2
                                    ? "rest-area"
                                    : e?.store_type === 3
                                    ? "terminal"
                                    : e?.store_type === 4
                                    ? "head-office"
                                    : e?.store_type === 5
                                    ? "drive-thru"
                                    : e?.store_type === 6
                                    ? "drive-thru"
                                    : e?.store_type === 7
                                    ? "vivaldi-park"
                                    : e?.store_type === 8
                                    ? "hospital"
                                    : e?.store_type === 9
                                    ? "cinema"
                                    : ""
                                }`}
                              ></i>{" "}
                              {/* 매장 타입별 .ico.store-type
                                            .ico.store-type.house : 기본형 (단독건물매장)
                                            .ico.store-type.building : 기본형 (건물내매장)
                                            .ico.store-type.rest-area : 고속도로 휴게소점
                                            .ico.store-type.terminal : 버스터미널점
                                            .ico.store-type.head-office : 분당서현점(본점)
                                            .ico.store-type.drive-thru : 광주쌍령DT점 (드라이브스루)
                                            .ico.store-type.vivaldi-park : 비발디파크점
                                            .ico.store-type.hospital :  병원내 지점
                                            .ico.store-type.cinema : 영화관내 지점
                                            .ico.store-type.theme-park : 놀이공원, 유원지, 테마파크 지점 (EX, 키자니아, 에버랜드, 유원지)
                                        */}
                            </div>
                            <div className="data-wrap">
                              <p className="place">{e.store_name}</p>
                              <ul className="provide-list">
                                <li>
                                  <i className="ico wifi">
                                    <span>인터넷가능 매장</span>
                                  </i>
                                </li>
                                {e?.store_is_smartorder && (
                                  <li>
                                    <i className="ico kiosk">
                                      <span>키오스크 매장</span>
                                    </i>
                                  </li>
                                )}
                                {/* 
                                <li>
                                  <i className="ico parking">
                                    <span>주차가능 매장</span>
                                  </i>
                                </li>
                                <li>
                                  <i className="ico smoking">
                                    <span>흡연가능 매장</span>
                                  </i>
                                </li>
                                <li>
                                  <i className="ico kiosk">
                                    <span>키오스크 매장</span>
                                  </i>
                                </li>
                                <li>
                                  <i className="ico drive">
                                    <span>드라이브스루 매장</span>
                                  </i>
                                </li> */}
                              </ul>
                              <p className="distance">{e.store_distance !== "-1" && e.store_distance + "km"}</p>
                            </div>
                          </a>
                        </SwiperSlide>
                      );
                    })}
                  </ul>
                </Swiper>
              </section>
              {/*
                <section className="section">
                  <div className="title-wrap w-inner flex-both">
                    <h3 className="section-title">주변 매장 찾기</h3>
                    <Link to="/order" className="btn text">
                      <span>더 보기</span>
                      <i className="ico arr-r"></i>
                    </Link>
                  </div>

                   [D] 위치 권한 미허용일 시 
                  <div className="alert-info">
                    <i className="ico store-alert"></i>
                    <p className="text ta-c">
                      앱 설정 &gt; 권한에서 <span className="fc-orange">위치 권한</span>을 허용해 주세요.
                      <br />
                      고객님과 가까운 매장을 추천해 드립니다.
                    </p>
                  </div>
                   [D] 위치 권한 미허용일 시  
                </section>
              */}

              {/* 달콤 MD */}
              <section className="section">
                <div className="title-wrap w-inner flex-both">
                  <h3 className="section-title">달콤 MD</h3>
                  <Link to="/order" target="_blank" className="btn text">
                    <span>더 보기</span>
                  </Link>
                </div>

                <Swiper id="searchStore2" className="swiper-container section-slider md-slider" slidesPerView={"auto"} freeMode={false}>
                  <ul className="swiper-wrapper data-list">
                    <SwiperSlide className="swiper-slide">
                      <div className="item md">
                        <div className="img-wrap">
                          <img src="/@resource/images/@temp/md_01.jpg" alt="달콤 피크닉백" />
                        </div>
                        <div className="data-wrap">
                          <p className="title">달콤 피크닉백</p>
                          <p className="price-box">
                            <span className="percent fc-orange">20%</span>
                            <span className="price">23,900원</span>
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="item md">
                        <div className="img-wrap">
                          <img src="/@resource/images/@temp/md_02.jpg" alt="달콤 홈카페 세트" />
                        </div>
                        <div className="data-wrap">
                          <p className="title">달콤 홈카페 세트</p>
                          <p className="price-box">
                            <span className="percent fc-orange">20%</span>
                            <span className="price">23,900원</span>
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="item md">
                        <div className="img-wrap">
                          <img src="/@resource/images/@temp/md_01.jpg" alt="달콤 피크닉백" />
                        </div>
                        <div className="data-wrap">
                          <p className="title">달콤 피크닉백</p>
                          <p className="price-box">
                            <span className="percent fc-orange">20%</span>
                            <span className="price">23,900원</span>
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="item md">
                        <div className="img-wrap">
                          <img src="/@resource/images/@temp/md_02.jpg" alt="달콤 홈카페 세트" />
                        </div>
                        <div className="data-wrap">
                          <p className="title">달콤 홈카페 세트</p>
                          <p className="price-box">
                            <span className="percent fc-orange">20%</span>
                            <span className="price">23,900원</span>
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  </ul>
                </Swiper>
              </section>
              {/* //달콤 MD */}

              {/* 테이블 오더 가능 매장 */}
              <div id="tableOrderAble" className="fixed-con layer-pop store-pop">
                <div className="popup">
                  <div className="popup-wrap">
                    <button type="button" className="btn btn-close">
                      <i className="ico close">
                        <span>close</span>
                      </i>
                    </button>
                    <div className="popup-header">
                      <div className="w-inner">
                        <div className="item store-info">
                          <div className="info-wrap flex-both">
                            <div className="title-wrap flex-start">
                              <i className="ico store-type small house"></i>{" "}
                              {/* 매장 타입별 
                                                    .ico.store-type.small
                                                    .ico.store-type.small.house : 기본형 (단독건물매장)
                                                    .ico.store-type.small.building : 기본형 (건물내매장)
                                                    .ico.store-type.small.rest-area : 고속도로 휴게소점
                                                    .ico.store-type.small.terminal : 버스터미널점
                                                    .ico.store-type.small.head-office : 분당서현점(본점)
                                                    .ico.store-type.small.drive-thru : 광주쌍령DT점 (드라이브스루)
                                                    .ico.store-type.small.vivaldi-park : 비발디파크점
                                                    .ico.store-type.small.hospital :  병원내 지점
                                                    .ico.store-type.small.cinema : 영화관내 지점
                                                    .ico.store-type.small.theme-park : 놀이공원, 유원지, 테마파크 지점 (EX, 키자니아, 에버랜드, 유원지)
                                                */}
                              <p className="title">{storeData?.detailStore?.store_name}</p>
                            </div>
                            <div className="data-wrap">
                              <ul className="provide-list">
                                <li>
                                  <i className="ico wifi">
                                    <span>인터넷가능 매장</span>
                                  </i>
                                </li>
                                {storeData?.detailStore?.store_park && (
                                  <li>
                                    <i className="ico parking">
                                      <span>주차가능 매장</span>
                                    </i>
                                  </li>
                                )}
                                {storeData?.detailStore?.store_is_smartorder && (
                                  <li>
                                    <i className="ico kiosk">
                                      <span>키오스크 매장</span>
                                    </i>
                                  </li>
                                )}
                                {/* <li>
                                  <i className="ico smoking">
                                    <span>흡연가능 매장</span>
                                  </i>
                                </li> */}
                              </ul>
                            </div>
                          </div>
                          {storeData?.detailStore?.store_caution !== "" && (
                            <p className="alert fc-redorange">
                              <i className="ico alert-c">
                                <span>알림</span>
                              </i>
                              <span>{storeData?.detailStore?.store_caution}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="popup-body">
                      <ul className="toggle-wrap">
                        <li>
                          <div className="item info-detail">
                            <div className="title-wrap toggle-switch">
                              <p className="title">
                                <i className="ico time">
                                  <span>매장 정보</span>
                                </i>
                                &nbsp;매장 정보
                              </p>
                            </div>
                            <div className="detail-wrap toggle-cont">
                              <ul>
                                <li onClick={() => handleCall(storeData?.detailStore?.store_mobile)}>
                                  <i className="ico tel">
                                    <span>전화번호</span>
                                  </i>
                                  &nbsp;
                                  <span>{storeData?.detailStore?.store_mobile}</span>
                                </li>
                                <li>
                                  <i className="ico time">
                                    <span>영업시간</span>
                                  </i>
                                  {storeData?.detailStore?.store_opening_hours?.map((element, index) => {
                                    if (index % 2 === 0 && index !== 0) {
                                      return (
                                        <React.Fragment key={index}>
                                          <br />
                                          &nbsp;
                                          <span>{element}</span>
                                        </React.Fragment>
                                      );
                                    } else {
                                      return (
                                        <React.Fragment key={index}>
                                          &nbsp;
                                          <span>{element}</span>
                                        </React.Fragment>
                                      );
                                    }
                                  })}
                                </li>
                              </ul>
                              <Swiper
                                id="storeGallery"
                                className="swiper-container section-slider"
                                slidesPerView={"auto"}
                                freeMode={false}
                                observer={true}
                                observeParents={true}
                              >
                                <ul className="swiper-wrapper data-list">
                                  {storeData?.detailStore?.store_image_list?.map((element, index) => {
                                    return (
                                      <SwiperSlide className="swiper-slide" key={index}>
                                        <img src={element?.store_image_url} alt="매장 이미지" />
                                      </SwiperSlide>
                                    );
                                  })}
                                </ul>
                              </Swiper>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="item info-detail">
                            <div className="title-wrap toggle-switch">
                              <p className="title">
                                <i className="ico pin">
                                  <span>매장 위치</span>
                                </i>
                                &nbsp;매장 위치
                              </p>
                            </div>
                            <div className="detail-wrap toggle-cont">
                              <div className="address-wrap flex-both">
                                <p className="address">{storeData?.detailStore?.store_addr}</p>

                                <Clipboard
                                  component="i"
                                  className="ico copy"
                                  data-clipboard-text={storeData?.detailStore?.store_addr}
                                  onSuccess={(e) => {
                                    $("#resAlert").text("주소가 복사 되었습니다.");
                                    $(".overlay.popupExitJoin").addClass("active");
                                    $("body").addClass("modal-opened");
                                  }}
                                >
                                  <span>복사하기</span>
                                </Clipboard>
                                {/* <i className="ico copy">
                                </i> */}

                                {/* <i className="ico copy" onClick={(e) => handleCopy(e.currentTarget, storeData?.detailStore?.store_addr)}>
                                
                                  <span>복사하기</span>
                                </i> */}
                              </div>
                              <div className="map-wrap">
                                {storeData?.detailStore?.store_map_latitude !== undefined && (
                                  <Map
                                    google={props.google}
                                    center={{
                                      lat: Number(storeData?.detailStore?.store_map_latitude),
                                      lng: Number(storeData?.detailStore?.store_map_longitude),
                                    }}
                                    initialCenter={{
                                      lat: Number(storeData?.detailStore?.store_map_latitude),
                                      lng: Number(storeData?.detailStore?.store_map_longitude),
                                    }}
                                    containerStyle={{
                                      width: "100%",
                                      height: "100%",
                                      position: "relative",
                                    }}
                                    zoom={18}
                                  >
                                    <Marker
                                      position={{
                                        lat: Number(storeData?.detailStore?.store_map_latitude),
                                        lng: Number(storeData?.detailStore?.store_map_longitude),
                                      }}
                                    />
                                    {/* <AnyReactComponent
                                      lat={Number(storeData?.detailStore?.store_map_latitude)}
                                      lng={Number(storeData?.detailStore?.store_map_longitude)}
                                      text={storeData?.detailStore?.store_name}
                                    /> */}
                                  </Map>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {storeData?.detailStore?.store_is_smartorder ? (
                      <div className="w-inner btn-area flex-both">
                        <Link to={`/order/menu/${storeData?.detailStore?.store_code}`} className="btn full medium dark">
                          주문하기
                        </Link>
                        <button
                          type="button"
                          className={`btn light-g medium bookmark ${storeData?.detailStore?.store_is_favorite && "active"}`}
                          onClick={(event) => handleFavorite(event.currentTarget, storeData?.detailStore?.store_code)}
                        >
                          <i className="ico heart">
                            <span>즐겨찾기</span>
                          </i>
                        </button>
                      </div>
                    ) : (
                      <div className="w-inner btn-area flex-both">
                        {/* [D] 테이블오더 불가 매장일 시 .btn disabled 활성화 */}
                        <button className="btn full medium dark" disabled>
                          테이블오더 불가 매장입니다.
                        </button>
                        <button
                          type="button"
                          className={`btn light-g medium bookmark ${storeData?.detailStore?.store_is_favorite && "active"}`}
                          onClick={(event) => handleFavorite(event.currentTarget, storeData?.detailStore?.store_code)}
                        >
                          <i className="ico heart">
                            <span>즐겨찾기</span>
                          </i>
                        </button>
                        {/* // [D] 테이블오더 불가 매장일 시 .btn disabled 활성화 */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* // 테이블 오더 가능 매장 */}

              <button type="button" id="moveScrollTop" className="btn scroll-top" onClick={() => moveScrollTop()}>
                <i className="ico arr-top"></i>
              </button>
            </div>
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}

        {/* 멤버쉽 카드 확대 팝업 */}
        {state?.loginFlag && (
          <div id="zoomCardMembership" className="overlay zoom-card">
            <div className="popup">
              <div className="popup-header">
                <h2 className="title">
                  <span className="blind">카드 확대</span>
                </h2>
              </div>
              <div className="popup-body">
                <div className="item card membership">
                  <div className="card-wrap">
                    <div>
                      <p className="grade en">{axioData?.res6_data?.membership_name}</p>
                      <p className="sort en">
                        DAL.KOMM
                        <br />
                        MEMBERSHIP CARD
                      </p>
                    </div>
                  </div>
                  <div className="barcode-wrap">
                    <div>
                      <div className="barcode">
                        <div id="barcode" className="react-barcode"></div>
                        {/* <div className="img-wrap">
                          <img src="/@resource/images/com/barcode.svg" alt="바코드" />
                        </div> */}
                        <p className="num">{axioData?.res6_data?.stamp_card_number}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* // 멤버쉽 카드 확대 팝업 */}
        <Popup_nomal />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderMain />

            <Nav order={1} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC4e6NPJH1CEAjD2Aa5EmUkWbWbhi3Ydzo",
  language: "ko",
})(Main);
