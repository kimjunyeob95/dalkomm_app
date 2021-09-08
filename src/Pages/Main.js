/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import HeaderMain from "Components/Header/HeaderMain";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import {
  accordion,
  scrollDetail,
  popupOpen,
  contGap,
  moveScrollTop,
} from "Jquery/Jquery";

import { SERVER_DALKOMM } from "Config/Server";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Scrollbar } from "swiper/core";

import { authContext } from "ContextApi/Context";

function Main() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const { search } = useLocation();
  // eslint-disable-next-line no-unused-vars
  const searchParams = new URLSearchParams(search);
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const body = {};
    let header_config = {
      headers: {
        "X-dalkomm-access-token": state.accessToken,
        Authorization: state.auth,
      },
    };

    if (state.accessToken !== "") {
      //로그인 시
      axios
        .all([
          axios.post(`${SERVER_DALKOMM}/app/api/main`, body, header_config),
          axios.post(
            `${SERVER_DALKOMM}/app/api/main/user`,
            body,
            header_config
          ),
          axios.post(
            `${SERVER_DALKOMM}/app/api/v2/my_account/profile`,
            body,
            header_config
          ),
        ])
        .then(
          axios.spread((res1, res2, res3) => {
            let res1_data = res1.data.data;
            let res2_data = res2.data.data;
            let res3_data = res3.data.data;
            setData((origin) => {
              return {
                ...origin,
                res1_data,
                res2_data,
                res3_data,
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
          ])
          .then(
            axios.spread((res1, res2, res3) => {
              let res1_data = res1.data.data;
              let res2_data = {};
              let res3_data = {};
              setData((origin) => {
                return {
                  ...origin,
                  res1_data,
                  res2_data,
                  res3_data,
                };
              });
            })
          );
      }
    }
  }, [state.auth]);

  useEffect(() => {
    SwiperCore.use([Autoplay, Scrollbar]);
    scrollDetail();
    contGap();
  }, [axioData]);
  const { loginFlag, accessToken, app_version, os, isApp, auth } = state;

  if (axioData) {
    //axios 반환 시

    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderMain />

            <Nav order={1} />

            <div id="content" className="main home">
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
                            <img src={e.image_url} alt="여름 스테디셀러" />
                          </div>
                          <div className="content-wrap">
                            <div className="w-inner flex-end">
                              <p className="sub-copy en fc-orange">STORY</p>
                              <h2 className="main-copy">{e.title}</h2>
                              <p className="text">
                                꾸준히 인기있는 여름 음료 추천전
                              </p>
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
                    <span className="fc-orange">
                      {axioData?.res2_data?.user?.user_name}
                    </span>{" "}
                    고객님
                  </p>
                  <button
                    type="button"
                    className="btn barcode open-pop"
                    pop-target="#zoomCardMembership"
                    onClick={(e) => popupOpen(e.target)}
                  >
                    <i className="ico barcode" pop-target="#zoomCardMembership">
                      <span>바코드</span>
                    </i>
                  </button>
                  <p className="speech-bubble">오늘은 신메뉴 어떠세요?</p>
                </div>
              ) : (
                <div className="item my-info">
                  <p className="user">
                    <span className="fc-orange">로그인</span> 하고 달콤한 혜택을
                    누려보세요.
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
                    <Link to="#" className="item my-state">
                      <div className="img-wrap">
                        <i className="ico pay-c">
                          <span>기프트 카드</span>
                        </i>
                      </div>
                      <div className="data-wrap">
                        <p className="title">기프트 카드 잔액</p>
                        <p className="state">
                          {state?.loginFlag ? "32,000원" : "-"}
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
                              8 <em>/ 10</em>
                            </React.Fragment>
                          ) : (
                            "-"
                          )}
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="item my-state">
                      <div className="img-wrap">
                        <i className="ico store-type small house">
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
                          {state?.loginFlag ? (
                            <React.Fragment>광주쌍령DT점</React.Fragment>
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
                  <h3 className="section-title">
                    {state?.loginFlag ? "나의 최근 주문" : "달콤 추천 메뉴"}
                  </h3>
                  <Link to="/order/menu" className="btn text">
                    <span>전체 메뉴</span>
                    <i className="ico arr-r"></i>
                  </Link>
                </div>

                <Swiper
                  id="recentlyOrder"
                  className="swiper-container section-slider menu-slider"
                  slidesPerView={"auto"}
                  freeMode={false}
                >
                  <ul className="swiper-wrapper">
                    <SwiperSlide className="swiper-slide">
                      <div className="item menu">
                        <div className="img-wrap">
                          <img
                            src="/@resource/images/@temp/product_01.jpg"
                            alt="아메리카노 ICE (R)"
                          />
                        </div>
                        <div className="detail-wrap">
                          <p className="title">아메리카노 ICE (R)</p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="item menu">
                        <div className="img-wrap">
                          <img
                            src="/@resource/images/@temp/product_02.jpg"
                            alt="카페라떼 HOT (R)"
                          />
                        </div>
                        <div className="detail-wrap">
                          <p className="title">카페라떼 HOT (R)</p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="item menu">
                        <div className="img-wrap">
                          <img
                            src="/@resource/images/@temp/product_03.jpg"
                            alt="카푸치노 HOT (R)"
                          />
                        </div>
                        <div className="detail-wrap">
                          <p className="title">카푸치노 HOT (R)</p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="item menu">
                        <div className="img-wrap">
                          <img
                            src="/@resource/images/@temp/product_01.jpg"
                            alt="아메리카노 ICE (R)"
                          />
                        </div>
                        <div className="detail-wrap">
                          <p className="title">아메리카노 ICE (R)</p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="item menu">
                        <div className="img-wrap">
                          <img
                            src="/@resource/images/@temp/product_02.jpg"
                            alt="카페라떼 HOT (R)"
                          />
                        </div>
                        <div className="detail-wrap">
                          <p className="title">카페라떼 HOT (R)</p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="item menu">
                        <div className="img-wrap">
                          <img
                            src="/@resource/images/@temp/product_03.jpg"
                            alt="카푸치노 HOT (R)"
                          />
                        </div>
                        <div className="detail-wrap">
                          <p className="title">카푸치노 HOT (R)</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  </ul>
                </Swiper>
              </section>
              {/* // 나의 최근 주문 */}

              {/* 나의 보유 쿠폰 */}
              {state?.loginFlag && (
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
                      <li>
                        <div
                          className="item coupon js-accordion-switche"
                          onClick={(e) => accordion(e.target, 0)}
                        >
                          <div className="data-wrap">
                            <p className="day num fc-orange">D-3</p>
                            <p className="title">FREE 음료 쿠폰</p>
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
                                <li>달콤커피 앱 내 테이블오더로만 이용가능</li>
                                <li>제조음료만 가능 (베이커리 이용 불가)</li>
                                <li>다른 혜택과 중복사용 불가</li>
                                <li>
                                  세트, MD, 베이커리, 할인 & 프로모션 메뉴 할인
                                  제외
                                </li>
                                <li>적립카드 스탬프 중복 적립 불가</li>
                              </ul>
                            </dd>
                          </dl>
                        </div>
                      </li>
                      <li>
                        <div
                          className="item coupon js-accordion-switche"
                          onClick={(e) => accordion(e.target, 0)}
                        >
                          <div className="data-wrap">
                            <p className="day num fc-orange">~ 21.07.28</p>
                            <p className="title">FREE 음료 쿠폰</p>
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
                                <li>달콤커피 앱 내 테이블오더로만 이용가능</li>
                                <li>제조음료만 가능 (베이커리 이용 불가)</li>
                                <li>다른 혜택과 중복사용 불가</li>
                                <li>
                                  세트, MD, 베이커리, 할인 & 프로모션 메뉴 할인
                                  제외
                                </li>
                                <li>적립카드 스탬프 중복 적립 불가</li>
                              </ul>
                            </dd>
                          </dl>
                        </div>
                      </li>
                      <li>
                        <div
                          className="item coupon js-accordion-switche"
                          onClick={(e) => accordion(e.target, 0)}
                        >
                          <div className="data-wrap">
                            <p className="day num fc-orange">~ 21.08.16</p>
                            <p className="title">FREE 음료 쿠폰</p>
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
                                <li>달콤커피 앱 내 테이블오더로만 이용가능</li>
                                <li>제조음료만 가능 (베이커리 이용 불가)</li>
                                <li>다른 혜택과 중복사용 불가</li>
                                <li>
                                  세트, MD, 베이커리, 할인 & 프로모션 메뉴 할인
                                  제외
                                </li>
                                <li>적립카드 스탬프 중복 적립 불가</li>
                              </ul>
                            </dd>
                          </dl>
                        </div>
                      </li>
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
                      <img
                        src="/@resource/images/@temp/thum_event_01.jpg"
                        alt="{title}"
                      />
                    </div>
                    <div className="data-wrap">
                      <p className="title">월요일은 페이코인 DAY!</p>
                      <p className="text">
                        페이코인 현장 결제 시, 아메리카노가 100원!
                      </p>
                      <p className="date">2021.06.14 </p>
                    </div>
                  </Link>
                </div>
              </section>
              {/* // 달콤 스토리 */}

              {state?.loginFlag ? (
                <section className="section">
                  {/* 주변 매장 찾기 */}
                  <div className="title-wrap w-inner flex-both">
                    <h3 className="section-title">주변 매장 찾기</h3>
                    <Link to="/order" className="btn text">
                      <span>더 보기</span>
                      <i className="ico arr-r"></i>
                    </Link>
                  </div>

                  <Swiper
                    id="searchStore"
                    className="swiper-container section-slider store-slider"
                    slidesPerView={"auto"}
                    freeMode={false}
                  >
                    <ul className="swiper-wrapper data-list">
                      <SwiperSlide className="swiper-slide">
                        <Link to="#" className="item store">
                          <div className="flex-both">
                            <span className="btn bookmark">
                              <i className="ico heart">
                                <span>즐겨찾기</span>
                              </i>
                            </span>
                            <span className="table-order possible"></span>{" "}
                            {/* .table-order.possible : 테이블 오더 가능 매장 / .table-order.impossible : 테이블 오더 불가능 매장 */}
                          </div>
                          <div className="img-wrap">
                            <i className="ico store-type house"></i>{" "}
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
                            <p className="place">광명역 자이스트릿점</p>
                            <ul className="provide-list">
                              <li>
                                <i className="ico wifi">
                                  <span>인터넷가능 매장</span>
                                </i>
                              </li>
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
                              </li>
                            </ul>
                            <p className="distance">680m</p>
                          </div>
                        </Link>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <Link to="#" className="item store">
                          <div className="flex-both">
                            <span className="btn bookmark">
                              <i className="ico heart">
                                <span>즐겨찾기</span>
                              </i>
                            </span>
                            <span className="table-order impossible"></span>
                          </div>
                          <div className="img-wrap">
                            <i className="ico store-type hospital"></i>
                          </div>
                          <div className="data-wrap">
                            <p className="place">경희의료원 본관점</p>
                            <ul className="provide-list">
                              <li>
                                <i className="ico wifi">
                                  <span>인터넷가능 매장</span>
                                </i>
                              </li>
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
                              </li>
                            </ul>
                            <p className="distance">1.2km</p>
                          </div>
                        </Link>
                      </SwiperSlide>

                      <SwiperSlide className="swiper-slide">
                        <Link to="#" className="item store">
                          <div className="flex-both">
                            <span className="btn bookmark">
                              <i className="ico heart">
                                <span>즐겨찾기</span>
                              </i>
                            </span>
                            <span className="table-order possible"></span>
                          </div>
                          <div className="img-wrap">
                            <i className="ico store-type building"></i>
                          </div>
                          <div className="data-wrap">
                            <p className="place">하남 하나로마트점</p>
                            <ul className="provide-list">
                              <li>
                                <i className="ico wifi">
                                  <span>인터넷가능 매장</span>
                                </i>
                              </li>
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
                            </ul>
                            <p className="distance">3km</p>
                          </div>
                        </Link>
                      </SwiperSlide>
                    </ul>
                  </Swiper>

                  {/* [D] 위치 권한 미허용일 시 
                  <div className="alert-info">
                      <i className="ico store-alert"></i>
                      <p className="text ta-c">
                          앱 설정 &gt; 권한에서 <span className="fc-orange">위치 권한</span>을 허용해 주세요.<br/>
                      고객님과 가까운 매장을 추천해 드립니다.
                      </p>
                  </div>
                   // [D] 위치 권한 미허용일 시  */}
                  {/* //주변 매장 찾기 */}
                </section>
              ) : (
                <section className="section">
                  <div className="title-wrap w-inner flex-both">
                    <h3 className="section-title">주변 매장 찾기</h3>
                    <Link to="/order" className="btn text">
                      <span>더 보기</span>
                      <i className="ico arr-r"></i>
                    </Link>
                  </div>

                  {/* [D] 위치 권한 미허용일 시 */}
                  <div className="alert-info">
                    <i className="ico store-alert"></i>
                    <p className="text ta-c">
                      앱 설정 &gt; 권한에서{" "}
                      <span className="fc-orange">위치 권한</span>을 허용해
                      주세요.
                      <br />
                      고객님과 가까운 매장을 추천해 드립니다.
                    </p>
                  </div>
                  {/* // [D] 위치 권한 미허용일 시  */}
                </section>
              )}

              {/* 달콤 MD */}
              <section className="section">
                <div className="title-wrap w-inner flex-both">
                  <h3 className="section-title">달콤 MD</h3>
                  <Link to="/order" target="_blank" className="btn text">
                    <span>더 보기</span>
                  </Link>
                </div>

                <Swiper
                  id="searchStore2"
                  className="swiper-container section-slider md-slider"
                  slidesPerView={"auto"}
                  freeMode={false}
                >
                  <ul className="swiper-wrapper data-list">
                    <SwiperSlide className="swiper-slide">
                      <div className="item md">
                        <div className="img-wrap">
                          <img
                            src="/@resource/images/@temp/md_01.jpg"
                            alt="달콤 피크닉백"
                          />
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
                          <img
                            src="/@resource/images/@temp/md_02.jpg"
                            alt="달콤 홈카페 세트"
                          />
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
                          <img
                            src="/@resource/images/@temp/md_01.jpg"
                            alt="달콤 피크닉백"
                          />
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
                          <img
                            src="/@resource/images/@temp/md_02.jpg"
                            alt="달콤 홈카페 세트"
                          />
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

              <button
                type="button"
                id="moveScrollTop"
                className="btn scroll-top"
                onClick={() => moveScrollTop()}
              >
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
                      <p className="grade en">
                        {axioData.res2_data.user.membership_name}
                      </p>
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
                        <div className="img-wrap">
                          <img
                            src="/@resource/images/com/barcode.svg"
                            alt="바코드"
                          />
                        </div>
                        <p className="num">1309675152301202</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* // 멤버쉽 카드 확대 팝업 */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}

export default Main;
