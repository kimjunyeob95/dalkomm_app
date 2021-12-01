/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import Clipboard from "react-clipboard.js";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, fadeInOut, moveScrollTop } from "Jquery/Jquery";

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { fadeOut, checkMobile } from "Config/GlobalJs";

import { SERVER_DALKOMM, FRONT_SERVER } from "Config/Server";
import { authContext } from "ContextApi/Context";

export function OrderStoreSearch(props) {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const [storeData, setStore] = useState(false);
  const [swierFlag, setFlag] = useState(false);
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

    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/store/city_info `, body, header_config)]).then(
      axios.spread((res1) => {
        let city_info = res1.data.data.city_info;
        axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/store/search `, { city: "", sub_city: "", q: "" }, header_config)]).then(
          axios.spread((res1) => {
            let store_list = res1.data.data.store_list;
            setData((origin) => {
              return {
                ...origin,
                city_info,
                store_list,
              };
            });
          })
        );
      })
    );
  }, []);

  useEffect(() => {
    contGap();
    fadeOut();
  }, [axioData]);
  const handleGoPage = (e, link) => {
    history.push(link);
    // let result = { link: FRONT_SERVER + link };
    // result = JSON.stringify(result);
    // try {
    //   if (checkMobile() === "android") {
    //     window.android.fn_winOpen(result);
    //   } else if (checkMobile() === "ios") {
    //     window.webkit.messageHandlers.fn_winOpen.postMessage(result);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const handleClose = (e, type) => {
    if (type === "창닫기") {
      $(".toggle-wrap li.active .toggle-cont").css("display", "none");
      $(".toggle-wrap li").removeClass("active");
    }
  };
  const handleDetail = (e, storeCode) => {
    setFlag(false);
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/store/${storeCode}`, {}, header_config)]).then(
      axios.spread((res1) => {
        let detailStore = res1.data.data;
        if (detailStore.store_is_favorite) {
          $(`#btn-bookmark`).addClass("active");
        } else {
          $(`#btn-bookmark`).removeClass("active");
        }
        setStore((origin) => {
          return {
            ...origin,
            detailStore,
          };
        });
        setFlag(true);
      })
    );
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
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/favorite/store/delete`, { store_code: storeCode }, header_config)]).then(
        axios.spread((res1) => {
          $(`#btn-bookmark[data-storecode=${storeCode}]`).removeClass("active");
          $(`span.btn.bookmark[data-storecode=${storeCode}]`).removeClass("active");
        })
      );
    } else {
      //즐겨찾기 추가
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/favorite/store/add`, { store_code: storeCode }, header_config)]).then(
        axios.spread((res1) => {
          if (res1.data.meta.code !== 20000) {
            alert(res1.data.meta.msg);
            $(e).removeClass("active");
          } else if (res1.data.meta.code === 20000) {
            $(`#btn-bookmark[data-storecode=${storeCode}]`).addClass("active");
            $(`span.btn.bookmark[data-storecode=${storeCode}]`).addClass("active");
          }
        })
      );
    }
  };

  const handleSearch = (event) => {
    let bodyData = {
      city: $('select[name="city"]').val(),
      sub_city: $('select[name="subCity"]').val(),
      q: $('input[name="searchValue"]').val(),
    };
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/store/search `, bodyData, header_config)]).then(
      axios.spread((res1) => {
        let store_list = res1.data.data.store_list;
        setData((origin) => {
          return {
            ...origin,
            store_list,
          };
        });
      })
    );
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
  const handleCityChange = () => {
    let city = $('select[name="city"]').val();
    let sub_city = $('select[name="subCity"]').val();
    let q = $('input[name="searchValue"]').val();
    let result = axioData?.city_info?.filter((e, i) => e.city === city);
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/store/search `, { city: city, sub_city: sub_city, q: q }, header_config)]).then(
      axios.spread((res1) => {
        let store_list = res1.data.data.store_list;
        setData((origin) => {
          return {
            ...origin,
            sub_city: result[0]?.sub_city,
            store_list,
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
            <HeaderSub title="매장검색" />

            <Nav order={3} />

            <div id="content" className="store search fade-in">
              <section className="section">
                <div className="w-inner">
                  <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <fieldset className="fieldset">
                      <legend className="blind">매장 검색</legend>
                      <div className="field">
                        <div className="search-box">
                          <input
                            type="text"
                            className="input-text medium"
                            name="searchValue"
                            placeholder="매장명을 입력해 주세요."
                            onKeyPress={(e) => handleKeyPress(e)}
                          />
                          <button type="button" className="btn search" onClick={(event) => handleSearch(event.currentTarget)}>
                            <i className="ico search-t">
                              <span>검색하기</span>
                            </i>
                          </button>
                        </div>
                      </div>
                      <div className="field">
                        <div className="insert">
                          <div className="bundle">
                            <select className="select medium" name="city" onChange={() => handleCityChange()}>
                              <option value="">시/도</option>
                              {axioData?.city_info?.map((element, index) => (
                                <option key={index} value={element?.city}>
                                  {element?.city}
                                </option>
                              ))}
                            </select>
                            <select className="select medium" name="subCity" onChange={() => handleCityChange()}>
                              <option value="">시/군/구</option>
                              {axioData?.sub_city?.map((element, index) => (
                                <option key={index} value={element}>
                                  {element}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>

                  <ul className="data-list col-2">
                    {axioData?.store_list?.map((e, index) => (
                      <li key={index}>
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
                            <span className={`table-order ${e.store_is_smartorder === true ? "possible" : "impossible"}`}></span>
                          </div>
                          <div className="img-wrap">
                            <i
                              className={`ico store-type ${
                                e?.store_sub_type === 0
                                  ? "house"
                                  : e?.store_sub_type === 1
                                  ? "building"
                                  : e?.store_sub_type === 2
                                  ? "rest-area"
                                  : e?.store_sub_type === 3
                                  ? "terminal"
                                  : e?.store_sub_type === 4
                                  ? "head-office"
                                  : e?.store_sub_type === 5
                                  ? "drive-thru"
                                  : e?.store_sub_type === 6
                                  ? "vivaldi-park"
                                  : e?.store_sub_type === 7
                                  ? "hospital"
                                  : e?.store_sub_type === 8
                                  ? "cinema"
                                  : e?.store_sub_type === 9
                                  ? "theme-park"
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
                              {e?.store_is_park && (
                                <li>
                                  <i className="ico parking">
                                    <span>주차가능 매장</span>
                                  </i>
                                </li>
                              )}
                              {e?.store_is_kiosk && (
                                <li>
                                  <i className="ico kiosk">
                                    <span>키오스크 매장</span>
                                  </i>
                                </li>
                              )}
                              {e?.store_is_smoking && (
                                <li>
                                  <i className="ico smoking">
                                    <span>흡연가능 매장</span>
                                  </i>
                                </li>
                              )}
                            </ul>
                            <p className="distance">{e.store_distance !== "-1" && e.store_distance + "km"}</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 테이블 오더 가능 매장 */}
              <div id="tableOrderAble" className="fixed-con layer-pop store-pop">
                <div className="popup">
                  <div className="popup-wrap">
                    <button type="button" className="btn btn-close" onClick={(e) => handleClose(e.currentTarget, "창닫기")}>
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
                                  storeData?.detailStore?.store_sub_type === 0
                                    ? "house"
                                    : storeData?.detailStore?.store_sub_type === 1
                                    ? "building"
                                    : storeData?.detailStore?.store_sub_type === 2
                                    ? "rest-area"
                                    : storeData?.detailStore?.store_sub_type === 3
                                    ? "terminal"
                                    : storeData?.detailStore?.store_sub_type === 4
                                    ? "head-office"
                                    : storeData?.detailStore?.store_sub_type === 5
                                    ? "drive-thru"
                                    : storeData?.detailStore?.store_sub_type === 6
                                    ? "vivaldi-park"
                                    : storeData?.detailStore?.store_sub_type === 7
                                    ? "hospital"
                                    : storeData?.detailStore?.store_sub_type === 8
                                    ? "cinema"
                                    : storeData?.detailStore?.store_sub_type === 9
                                    ? "theme-park"
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
                                {storeData?.detailStore?.store_kiosk && (
                                  <li>
                                    <i className="ico kiosk">
                                      <span>키오스크 매장</span>
                                    </i>
                                  </li>
                                )}
                                {storeData?.detailStore?.store_smoking && (
                                  <li>
                                    <i className="ico smoking">
                                      <span>흡연가능 매장</span>
                                    </i>
                                  </li>
                                )}
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
                            <div className="title-wrap toggle-switch" onClick={(e) => handleClose(e.currentTarget)}>
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
                              {swierFlag && (
                                <Swiper
                                  id="storeGallery"
                                  className="swiper-container section-slider"
                                  slidesPerView={"auto"}
                                  freeMode={true}
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
                              )}
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
                        <button
                          // onClick={(e) => handleGoPage(e.currentTarget, `/order/menu/${storeData?.detailStore?.store_code}`)}
                          onClick={(e) => handleGoPage(e.currentTarget, `/order/menu/dalkomm217`)}
                          className="btn full medium dark"
                        >
                          주문하기
                        </button>
                        <button
                          type="button"
                          className={`btn light-g medium bookmark ${storeData?.detailStore?.store_is_favorite && "active"}`}
                          onClick={(event) => handleFavorite(event.currentTarget, storeData?.detailStore?.store_code)}
                          data-storecode={storeData?.detailStore?.store_code}
                          id="btn-bookmark"
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
                          data-storecode={storeData?.detailStore?.store_code}
                          id="btn-bookmark"
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
  } else
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="매장검색" />

            <Nav order={3} />
          </div>
        </div>
      </React.Fragment>
    );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC4e6NPJH1CEAjD2Aa5EmUkWbWbhi3Ydzo",
  language: "ko",
})(OrderStoreSearch);
