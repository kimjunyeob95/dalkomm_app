/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import Clipboard from "react-clipboard.js";
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import HeaderSub from "Components/Header/HeaderSub";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, moveScrollTop, fadeInOut } from "Jquery/Jquery";

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Scrollbar } from "swiper/core";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";

export function Order(props) {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const [storeData, setStore] = useState(false);

  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };
  let body = {};
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    // eslint-disable-next-line react-hooks/exhaustive-deps

    let location_body = {};
    if (state?.latitude !== "" && state?.longitude !== "") {
      location_body = { latitude: state.latitude, longitude: state?.longitude };
    }

    if (state.accessToken !== "") {
      //로그인 시
      axios
        .all([
          axios.post(`${SERVER_DALKOMM}/app/api/v2/store/around`, location_body, header_config),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/favorite/store/list`, location_body, header_config),
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
    } else {
      //비로그인 시
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/store/around`, location_body, header_config)]).then(
        axios.spread((res1, res2) => {
          let res1_data = res1.data.data;
          setData((origin) => {
            return {
              ...origin,
              res1_data,
            };
          });
        })
      );
    }
  }, [state?.auth]);

  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    contGap();
    SwiperCore.use([Scrollbar]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // fadeInOut();
  }, [axioData]);

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
            alert(res1.data.meta.msg);
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

  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            {/* <HeaderSub title="매장선택" type="store" location="/mypage/cart" icon="cart" /> */}
            <HeaderSub title="매장선택" />

            <Nav order={3} />

            <div id="content" className="store list">
              {/* 즐겨찾는 매장 */}
              {state?.accessToken !== "" && (
                <section className="section">
                  <div className="title-wrap w-inner">
                    <h3 className="section-title" id="testtest">
                      즐겨찾는 매장
                    </h3>
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
                      {axioData?.res2_data?.favorite_store_list?.map((e, i) => (
                        <SwiperSlide className="swiper-slide" key={i}>
                          <a
                            data-href="#tableOrderAble"
                            className="item store open-layer"
                            onClick={(event) => handleDetail(event.currentTarget, e.store_code)}
                          >
                            <div className="flex-both">
                              <span
                                data-storecode={e.store_code}
                                className={`btn bookmark ${e.store_is_favorite && "active"}`}
                                onClick={(event) => handleFavorite(event.currentTarget, e.store_code)}
                              >
                                {" "}
                                {/* [D] 즐겨찾는 매장일 시 .active 활성화 */}
                                <i className="ico heart">
                                  <span>즐겨찾기</span>
                                </i>
                              </span>
                              {/* <span className={`table-order ${e?.store_is_smartorder ? "possible" : "impossible"}`}></span>{" "} */}
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
                              ></i>
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
                              <p className="place">{e?.store_name}</p>
                              <ul className="provide-list">
                                <li>
                                  <i className="ico wifi">
                                    <span>인터넷가능 매장</span>
                                  </i>
                                </li>
                                {/* <li>
                                  <i className="ico parking">
                                    <span>주차가능 매장</span>
                                  </i>
                                </li>
                                <li>
                                  <i className="ico smoking">
                                    <span>흡연가능 매장</span>
                                  </i>
                                </li> */}
                                {e?.store_is_smartorder && (
                                  <li>
                                    <i className="ico kiosk">
                                      <span>키오스크 매장</span>
                                    </i>
                                  </li>
                                )}

                                {/* <li>
                                  <i className="ico drive">
                                    <span>드라이브스루 매장</span>
                                  </i>
                                </li> */}
                              </ul>
                              {/* <p className="distance">{e.store_distance !== "-1" && e.store_distance + "km"}</p> */}
                            </div>
                          </a>
                        </SwiperSlide>
                      ))}
                    </ul>

                    <div className="swiper-scrollbar"></div>
                  </Swiper>
                </section>
              )}
              {/* //즐겨찾는 매장 */}

              {/* 가까운 매장 */}
              <section className="section">
                <div className="w-inner">
                  <div className="title-wrap flex-both">
                    <h3 className="section-title">가까운 매장</h3>
                    <Link to="/order/storeSearch" className="btn">
                      <i className="ico search-s"></i>
                    </Link>
                  </div>

                  <ul className="data-list col-2">
                    {axioData?.res1_data?.store_list?.map((e, i) => {
                      return (
                        <li key={i}>
                          <a
                            data-href="#tableOrderAble"
                            className="item store open-layer"
                            onClick={(event) => handleDetail(event.currentTarget, e.store_code)}
                          >
                            <div className="flex-both">
                              <span
                                data-storecode={e.store_code}
                                className={`btn bookmark ${e.store_is_favorite && "active"}`}
                                onClick={(event) => handleFavorite(event.currentTarget, e.store_code)}
                              >
                                <i className="ico heart">
                                  <span>즐겨찾기</span>
                                </i>
                              </span>
                              <div className="table-order-wrap">
                                {i === 0 && (
                                  <div className="speech-wrap">
                                    <p className="speech-bubble">
                                      현재 테이블 오더가
                                      <br />
                                      가능한 매장인지 확인해보세요.
                                    </p>
                                  </div>
                                )}

                                <span className={`table-order ${e.store_is_smartorder === true ? "possible" : "impossible"}`}></span>
                              </div>
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
                              ></i>
                            </div>
                            <div className="data-wrap">
                              <p className="place">{e.store_name}</p>
                              <ul className="provide-list">
                                <li>
                                  <i className="ico wifi">
                                    <span>인터넷가능 매장</span>
                                  </i>
                                </li>
                                {/* <li>
                                  <i className="ico parking">
                                    <span>주차가능 매장</span>
                                  </i>
                                </li>
                                <li>
                                  <i className="ico smoking">
                                    <span>흡연가능 매장</span>
                                  </i>
                                </li> */}
                                {e?.store_is_smartorder && (
                                  <li>
                                    <i className="ico kiosk">
                                      <span>키오스크 매장</span>
                                    </i>
                                  </li>
                                )}
                                {/* <li>
                                  <i className="ico drive">
                                    <span>드라이브스루 매장</span>
                                  </i>
                                </li> */}
                              </ul>
                              <p className="distance">{e.store_distance !== "-1" && e.store_distance + "km"}</p>
                            </div>
                          </a>
                        </li>
                      );
                    })}
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
                              <i
                                className={`ico store-type small ${
                                  storeData?.detailStore?.store_type === 0
                                    ? "house"
                                    : storeData?.detailStore?.store_type === 1
                                    ? "building"
                                    : storeData?.detailStore?.store_type === 2
                                    ? "rest-area"
                                    : storeData?.detailStore?.store_type === 3
                                    ? "terminal"
                                    : storeData?.detailStore?.store_type === 4
                                    ? "head-office"
                                    : storeData?.detailStore?.store_type === 5
                                    ? "drive-thru"
                                    : storeData?.detailStore?.store_type === 6
                                    ? "drive-thru"
                                    : storeData?.detailStore?.store_type === 7
                                    ? "vivaldi-park"
                                    : storeData?.detailStore?.store_type === 8
                                    ? "hospital"
                                    : storeData?.detailStore?.store_type === 9
                                    ? "cinema"
                                    : ""
                                }`}
                              ></i>{" "}
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
                                <li>
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
                                  onSuccess={(e) => alert("주소가 복사되었습니다.")}
                                >
                                  <span>복사하기</span>
                                </Clipboard>
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
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC4e6NPJH1CEAjD2Aa5EmUkWbWbhi3Ydzo",
  language: "ko",
})(Order);
