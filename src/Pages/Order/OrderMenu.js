/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";

import HeaderSub2 from "Components/Header/HeaderSub2";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, moveScrollTop, tabLink } from "Jquery/Jquery";

import { Swiper } from "swiper/react";
import { fadeOut } from "Config/GlobalJs";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";
import { FadeLoader } from "react-spinners";

export default function OrderMenu() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const history = useHistory();
  const { storeCode } = useParams();
  const { scrollValue } = useLocation();
  if (storeCode === "0") {
    history.push("/");
  }

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
          axios.post(`${SERVER_DALKOMM}/app/api/v2/menu/search`, { category_id: 0, store_code: storeCode, is_smartorder: true }, header_config),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/store/${storeCode}`, {}, header_config),
        ])
        .then(
          axios.spread((res1, res2, res3) => {
            let res1_data = res1.data.data;
            let all_menu = res2.data.data;
            let res2_data = res3.data.data;
            setData((origin) => {
              return {
                ...origin,
                res1_data,
                all_menu,
                res2_data,
              };
            });
            scrollValue &&
              window.scrollTo({
                top: scrollValue,
                behavior: "smooth",
              });
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
      history.push({
        pathname: `/order/detail/${storeCode}/${menucode}`,
        scrollValue: $(document).scrollTop(),
      });
    } else {
      alert("테이블오더가 불가능한 메뉴입니다.");
    }
  };

  if (axioData?.res1_data) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub2
              title="메뉴선택"
              icon="search-s"
              icon2="cart"
              noBack={true}
              directUrl={"/order"}
              location={`/order/menuSearch/${storeCode}`}
              location2={`/mypage/cart/${storeCode}`}
            />

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
                  <li className="swiper-slide active">
                    <Link to="#" onClick={(e) => jqueryTablink(e)} data-category="">
                      메뉴 전체
                    </Link>
                  </li>{" "}
                  {/* [D] 현재 탭 .active 활성화 */}
                  {axioData?.res1_data?.category_info_list?.map((e, i) => {
                    return (
                      <li className="swiper-slide" key={i}>
                        <Link to="#" onClick={(e) => jqueryTablink(e)} data-category={e?.category_id}>
                          {e?.category_name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Swiper>

              {/* 즐겨찾는 매장 */}
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
              {/* //즐겨찾는 매장 */}

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
            <HeaderSub2
              title="메뉴선택"
              icon="search-s"
              icon2="cart"
              location={`/order/menuSearch/${storeCode}`}
              location2={`/mypage/cart/${storeCode}`}
            />
            <FadeLoader
              loading={true}
              size={50}
              height={6}
              color="red"
              css={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "56%",
                height: "6px",
              }}
            />
            <Nav order={3} />
          </div>
        </div>
      </React.Fragment>
    );
}
