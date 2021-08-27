/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderSub from "Components/Header/HeaderSub";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, moveScrollTop } from "Jquery/Jquery";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Scrollbar } from "swiper/core";

export default function Order() {
  SwiperCore.use([Scrollbar]);
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    contGap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="매장선택" type="store" location="/mypage/cart" icon="cart" />

          <Nav order={3} />

          <div id="content" className="store list">
            {/* 즐겨찾는 매장 */}
            <section className="section">
              <div className="title-wrap w-inner">
                <h3 className="section-title">즐겨찾는 매장</h3>
              </div>

              <Swiper
                id="bookmarkStore"
                className="swiper-container section-slider store-slider"
                slidesPerView={"auto"}
                scrollbar={{
                  el: "#bookmarkStore .swiper-scrollbar",
                  hide: false,
                }}
                freeMode={false}
              >
                <ul slot="container-start" className="swiper-wrapper has-scrollbar-swiper data-list">
                  <SwiperSlide className="swiper-slide">
                    <Link to="#" data-href="#tableOrderAble" className="item store open-layer">
                      <div className="flex-both">
                        <span className="btn bookmark active">
                          {" "}
                          {/* [D] 즐겨찾는 매장일 시 .active 활성화 */}
                          <i className="ico heart">
                            <span>즐겨찾기</span>
                          </i>
                        </span>
                        <span className="table-order possible"></span>{" "}
                        {/* .table-order.possible : 테이블 오더 가능 매장 / .table-order.impossible : 테이블 오더 불가능 매장 */}
                      </div>
                      <div className="img-wrap">
                        <i className="ico store-type house"></i>
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
                    <Link to="#" data-href="#tableOrderUnAble" className="item store open-layer">
                      <div className="flex-both">
                        <span className="btn bookmark active">
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
                        </ul>
                        <p className="distance">1.2km</p>
                      </div>
                    </Link>
                  </SwiperSlide>

                  <SwiperSlide className="swiper-slide">
                    <Link to="#" data-href="#tableOrderAble" className="item store open-layer">
                      <div className="flex-both">
                        <span className="btn bookmark active">
                          <i className="ico heart "></i>
                        </span>
                        <span className="table-order possible"></span>
                      </div>
                      <div className="img-wrap">
                        <i className="ico store-type house"></i>
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

                  <SwiperSlide className="swiper-slide">
                    <Link to="#" data-href="#tableOrderAble" className="item store open-layer">
                      <div className="flex-both">
                        <span className="btn bookmark active">
                          <i className="ico heart "></i>
                        </span>
                        <span className="table-order possible"></span>
                      </div>
                      <div className="img-wrap">
                        <i className="ico store-type house"></i>
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

                <div className="swiper-scrollbar"></div>
              </Swiper>
            </section>
            {/* //즐겨찾는 매장 */}

            {/* 가까운 매장 */}
            <section className="section">
              <div className="w-inner">
                <div className="title-wrap flex-both">
                  <h3 className="section-title">가까운 매장</h3>
                  <Link to="#" data-href="TO001.html" className="btn">
                    <i className="ico search-s"></i>
                  </Link>
                </div>

                <ul className="data-list col-2">
                  <li>
                    <Link to="#" data-href="#tableOrderAble" className="item store open-layer">
                      <div className="flex-both">
                        <span className="btn bookmark">
                          <i className="ico heart">
                            <span>즐겨찾기</span>
                          </i>
                        </span>
                        <div className="table-order-wrap">
                          <div className="speech-wrap">
                            <p className="speech-bubble">
                              현재 테이블 오더가
                              <br />
                              가능한 매장인지 확인해보세요.
                            </p>
                          </div>
                          <span className="table-order possible"></span>
                        </div>
                      </div>
                      <div className="img-wrap">
                        <i className="ico store-type head-office"></i>
                      </div>
                      <div className="data-wrap">
                        <p className="place">속초 중앙시장점</p>
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
                  </li>
                  <li>
                    <Link to="#" data-href="#tableOrderUnAble" className="item store open-layer">
                      <div className="flex-both">
                        <span className="btn bookmark">
                          <i className="ico heart">
                            <span>즐겨찾기</span>
                          </i>
                        </span>
                        <span className="table-order impossible"></span>
                      </div>
                      <div className="img-wrap">
                        <i className="ico store-type house"></i>
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
                  </li>
                  <li>
                    <Link to="#" data-href="#tableOrderAble" className="item store open-layer">
                      <div className="flex-both">
                        <span className="btn bookmark">
                          <i className="ico heart">
                            <span>즐겨찾기</span>
                          </i>
                        </span>
                        <span className="table-order possible"></span>
                      </div>
                      <div className="img-wrap">
                        <i className="ico store-type house"></i>
                      </div>
                      <div className="data-wrap">
                        <p className="place">속초 중앙시장점</p>
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
                  </li>
                  <li>
                    <Link to="#" data-href="#tableOrderUnAble" className="item store open-layer">
                      <div className="flex-both">
                        <span className="btn bookmark">
                          <i className="ico heart">
                            <span>즐겨찾기</span>
                          </i>
                        </span>
                        <span className="table-order impossible"></span>
                      </div>
                      <div className="img-wrap">
                        <i className="ico store-type house"></i>
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
                  </li>
                </ul>
              </div>
            </section>
            {/* //가까운 매장 */}

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
                            <p className="title">광명역 자이스트릿점</p>
                          </div>
                          <div className="data-wrap">
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
                          </div>
                        </div>
                        <p className="alert fc-redorange">
                          <i className="ico alert-c">
                            <span>알림</span>
                          </i>
                          <span>본 매장은 적립 및 충전카드 사용이 불가합니다.</span>
                        </p>
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
                              <li>
                                <i className="ico tel">
                                  <span>전화번호</span>
                                </i>
                                &nbsp;
                                <span>031-764-5857</span>
                              </li>
                              <li>
                                <i className="ico time">
                                  <span>영업시간</span>
                                </i>
                                &nbsp;
                                <span>평일 09:00 - 22:00</span>
                                &nbsp;
                                <span>주말 09:00 - 22:00</span>
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
                                <SwiperSlide className="swiper-slide">
                                  <img src="../@resource/images/@temp/store_img_01.jpg" alt="매장 이미지" />
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                  <img src="../@resource/images/@temp/store_img_02.jpg" alt="매장 이미지" />
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                  <img src="../@resource/images/@temp/store_img_01.jpg" alt="매장 이미지" />
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                  <img src="../@resource/images/@temp/store_img_02.jpg" alt="매장 이미지" />
                                </SwiperSlide>
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
                              <p className="address">경기도 광주시 경종대로 1444</p>
                              <i className="ico copy">
                                <span>복사하기</span>
                              </i>
                            </div>
                            <div className="map-wrap">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101350.0856975424!2d126.99759144227485!3d37.45623143342438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca414633e9ab7%3A0x348d72d81adbbe75!2z64us7L2k7Luk7ZS8IO2PrOyKpOy9lOyCrOqxsOumrOygkA!5e0!3m2!1sko!2skr!4v1627622086451!5m2!1sko!2skr"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="w-inner btn-area flex-both">
                    <Link to="/order/menu?location=random" className="btn full medium dark">
                      주문하기
                    </Link>
                    <button type="button" className="btn light-g medium bookmark">
                      <i className="ico heart">
                        <span>즐겨찾기</span>
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* // 테이블 오더 가능 매장 */}

            {/* 테이블 오더 불가능 매장 */}
            <div id="tableOrderUnAble" className="fixed-con layer-pop store-pop">
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
                            <i className="ico store-type small building"></i>{" "}
                            {/* 매장 타입별 .ico.store-type.small
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
                            <p className="title">하남 하나로마트점</p>
                          </div>
                          <div className="data-wrap">
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
                          </div>
                        </div>
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
                              &nbsp; storeGallery 매장 정보
                            </p>
                          </div>
                          <div className="detail-wrap toggle-cont">
                            <ul>
                              <li>
                                <i className="ico tel">
                                  <span>전화번호</span>
                                </i>
                                &nbsp;
                                <span>031-764-5857</span>
                              </li>
                              <li>
                                <i className="ico time">
                                  <span>영업시간</span>
                                </i>
                                &nbsp;
                                <span>평일 09:00 - 22:00</span>
                                &nbsp;
                                <span>주말 09:00 - 22:00</span>
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
                                <SwiperSlide className="swiper-slide">
                                  <img src="../@resource/images/@temp/store_img_01.jpg" alt="매장 이미지" />
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                  <img src="../@resource/images/@temp/store_img_02.jpg" alt="매장 이미지" />
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                  <img src="../@resource/images/@temp/store_img_01.jpg" alt="매장 이미지" />
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide">
                                  <img src="../@resource/images/@temp/store_img_02.jpg" alt="매장 이미지" />
                                </SwiperSlide>
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
                              &nbsp; 매장 위치
                            </p>
                          </div>
                          <div className="detail-wrap toggle-cont">
                            <div className="address-wrap flex-both">
                              <p className="address">경기도 광주시 경종대로 1444</p>
                              <i className="ico copy">
                                <span>복사하기</span>
                              </i>
                            </div>
                            <div className="map-wrap">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101350.0856975424!2d126.99759144227485!3d37.45623143342438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca414633e9ab7%3A0x348d72d81adbbe75!2z64us7L2k7Luk7ZS8IO2PrOyKpOy9lOyCrOqxsOumrOygkA!5e0!3m2!1sko!2skr!4v1627622086451!5m2!1sko!2skr"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="w-inner btn-area flex-both">
                    {/* [D] 테이블오더 불가 매장일 시 .btn disabled 활성화 */}
                    <Link to="TO002.html" className="btn full medium dark" disabled>
                      테이블오더 불가 매장입니다.
                    </Link>
                    <button type="button" className="btn light-g medium bookmark" disabled>
                      <i className="ico heart">
                        <span>즐겨찾기</span>
                      </i>
                    </button>
                    {/* // [D] 테이블오더 불가 매장일 시 .btn disabled 활성화 */}
                  </div>
                </div>
              </div>
            </div>
            {/* // 테이블 오더 불가능 매장 */}

            <button type="button" id="moveScrollTop" className="btn scroll-top" onClick={() => moveScrollTop()}>
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
