/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";

import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, moveScrollTop, tabLink } from "Jquery/Jquery";

import { Swiper } from "swiper/react";
import { fadeOut, get_categoryName } from "Config/GlobalJs";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";
import Loading from "Components/Loading";

export default function OrderMenu() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const history = useHistory();
  const { storeCode } = useParams();
  const { scrollValue, cateType } = useLocation();
  if (storeCode === "0") {
    history.push("/");
  }
  let recommendFlag = true;
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
    if (state.auth !== "") {
      axios
        .all([
          axios.post(`${SERVER_DALKOMM}/app/api/v2/menu/category_info`, body, header_config),
          axios.post(
            `${SERVER_DALKOMM}/app/api/v2/menu/search`,
            { category_id: cateType ? cateType : 0, store_code: storeCode, is_smartorder: true },
            header_config
          ),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/store/${storeCode}`, {}, header_config),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/cart/count`, { store_code: storeCode }, header_config),
        ])
        .then(
          axios.spread((res1, res2, res3, res4) => {
            let res1_data = res1.data.data;
            let all_menu = res2.data.data;
            let res2_data = res3.data.data;
            let cart_count = res4.data.data;

            axios
              .all([
                axios.post(`${SERVER_DALKOMM}/app/api/v2/menu/search`, { category_id: 1, store_code: storeCode, is_smartorder: true }, header_config),
              ])
              .then(
                axios.spread((res1) => {
                  let recommendData = res1.data.data;
                  if (recommendData?.searched_menu_list?.length < 1) {
                    recommendFlag = false;
                  }
                  setData((origin) => {
                    return {
                      ...origin,
                      res1_data,
                      all_menu,
                      res2_data,
                      cart_count,
                      recommendFlag,
                    };
                  });
                  scrollValue &&
                    window.scrollTo({
                      top: scrollValue,
                      behavior: "smooth",
                    });
                })
              );
          })
        );
    }
  }, []);

  useEffect(() => {
    contGap();
    fadeOut();
  }, [axioData]);

  const jqueryTablink = (e) => {
    tabLink(e);
    let data_category = $(e.target).data("category") === "" ? 0 : $(e.target).data("category");
    if (data_category === 0) {
      axios
        .all([
          axios.post(
            `${SERVER_DALKOMM}/app/api/v2/menu/search`,
            { category_id: data_category, is_smartorder: true, store_code: storeCode },
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
    } else {
      axios
        .all([
          axios.post(
            `${SERVER_DALKOMM}/app/api/v2/menu/category/list`,
            { category_id: data_category, is_smartorder: true, store_code: storeCode },
            header_config
          ),
        ])
        .then(
          axios.spread((res1) => {
            let all_menu = { searched_menu_list: res1.data.data.menu_list };
            setData((origin) => {
              return {
                ...origin,
                all_menu,
              };
            });
          })
        );
    }
  };
  const handleDetail = (e, menucode, type) => {
    if (type) {
      let cateType = $(".swiper-slide-visible.active").attr("data-category") ? $(".swiper-slide-visible.active").attr("data-category") : 0;
      history.push({
        pathname: `/order/detail/${storeCode}/${menucode}`,
        scrollValue: $(document).scrollTop(),
        cateType: Number(cateType),
      });
    } else {
      alert("테이블오더가 불가능한 메뉴입니다.");
    }
  };
  const handlePage = (link) => {
    history.push(link);
  };
  if (axioData?.res1_data) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header">
              <h1 className="page-title">메뉴선택</h1>
              <button type="button" className="btn back" onClick={() => handlePage(`/order`)}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
              <div className="btn-area false">
                <a className="btn" onClick={() => handlePage(`/order/menuSearch/${storeCode}`)}>
                  <i className="ico search-s">
                    <span>메뉴검색</span>
                  </i>
                </a>
                <a className="btn" onClick={() => handlePage(`/mypage/cart/${storeCode}`)}>
                  <i className="ico cart">
                    <span>장바구니</span>
                  </i>
                  {axioData?.cart_count?.count > 0 && <span className="badge round inform">{axioData?.cart_count?.count}</span>}
                </a>
              </div>
            </header>

            <Nav order={3} />

            <div id="content" className="drink list fade-in">
              <div className="store-search-wrap w-inner">
                <div className="item store-search">
                  <div className="flex-both">
                    <dl className="detail-wrap flex-start">
                      <dt className="title">선택매장</dt>
                      <dd className="place">{axioData?.res2_data?.store_name}</dd>
                    </dl>
                    <Link to="/order" className="btn">
                      변경
                    </Link>
                  </div>
                </div>
              </div>

              <Swiper
                id="moduleTab"
                className="swiper-container tab-wrap w-inner"
                slidesPerView={"auto"}
                freeMode={true}
                setWrapperSize={true}
                watchSlidesVisibility={true}
                watchSlidesProgress={true}
                initialSlide={0}
              >
                <ul className="swiper-wrapper tabs" slot="container-start">
                  <li className={`swiper-slide ${!cateType || cateType === 0 ? "active" : ""}`}>
                    <Link to="#" onClick={(e) => jqueryTablink(e)} data-category="">
                      메뉴 전체
                    </Link>
                  </li>{" "}
                  {/* [D] 현재 탭 .active 활성화 */}
                  {axioData?.res1_data?.category_info_list?.map((e, i) => {
                    if (axioData?.recommendFlag) {
                      return (
                        <li className={`swiper-slide ${cateType === e?.category_id && "active"}`} data-category={e?.category_id} key={i}>
                          <Link to="#" onClick={(e) => jqueryTablink(e)} data-category={e?.category_id}>
                            {get_categoryName(e?.category_name)}
                          </Link>
                        </li>
                      );
                    } else {
                      if (e?.category_id !== 1) {
                        return (
                          <li className={`swiper-slide ${cateType === e?.category_id && "active"}`} data-category={e?.category_id} key={i}>
                            <Link to="#" onClick={(e) => jqueryTablink(e)} data-category={e?.category_id}>
                              {get_categoryName(e?.category_name)}
                            </Link>
                          </li>
                        );
                      }
                    }
                  })}
                </ul>
              </Swiper>
              <section className="section">
                <ul className="data-list col-2">
                  {axioData?.all_menu?.searched_menu_list?.map((e, i) => {
                    return (
                      <li key={i}>
                        <a onClick={(event) => handleDetail(event, e?.code, e?.is_smartorder)} className="item menu">
                          {/* 메뉴 .bagde.round 타입 
                                    .bagde.round.new : NEW
                                    .bagde.round.pick : PICK
                                */}
                          {e?.icon === "N" ? (
                            <span className="badge round new">NEW</span>
                          ) : e?.icon === "B" ? (
                            <span className="badge round pick">PICK</span>
                          ) : (
                            ""
                          )}
                          {/* <span class="badge round coffee-bean dark"></span>{" "} */}
                          {/* 아메리카노 원두 타입 
.badge.round.coffee-bean.dark : 다크퍼플 /
.badge.round.coffee-bean.mild : 마일드 */}
                          <div className="img-wrap">
                            <img src={e.thumbnail_image_url} alt={e.name_kor} />
                          </div>
                          <div className="detail-wrap">
                            <p className="title">
                              {e.name_kor}
                              <span className="en">{e.name_eng}</span>
                            </p>
                            <p className="price">{e.price}원</p>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <Link className="btn my-bookmark" to={`/order/favorite/${storeCode}`}>
                  <i className="ico heart">
                    <span className="blind">즐겨찾기 메뉴</span>
                  </i>
                </Link>
              </section>

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
            <header id="header" className="header">
              <h1 className="page-title">메뉴선택</h1>
              <button type="button" className="btn back" onClick={() => handlePage(`/order`)}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
              <div className="btn-area false">
                <a className="btn" onClick={() => handlePage(`/order/menuSearch/${storeCode}`)}>
                  <i className="ico search-s">
                    <span>메뉴검색</span>
                  </i>
                </a>
                <a className="btn" onClick={() => handlePage(`/mypage/cart/${storeCode}`)}>
                  <i className="ico cart">
                    <span>장바구니</span>
                  </i>
                  {axioData?.cart_count?.count > 0 && <span className="badge round inform">{axioData?.cart_count?.count}</span>}
                </a>
              </div>
            </header>
            <Loading />
            <Nav order={3} />
          </div>
        </div>
      </React.Fragment>
    );
}
