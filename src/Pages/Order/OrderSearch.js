/* eslint-disable react/jsx-no-duplicate-props */
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
import { contGap, fadeInOut } from "Jquery/Jquery";
import { fadeOut } from "Config/GlobalJs";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";
import { FadeLoader } from "react-spinners";

export default function OrderSearch() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const { storeCode } = useParams();
  const { scrollValue } = useLocation();
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
    if (state.auth !== "") {
      axios
        .all([
          axios.post(
            `${SERVER_DALKOMM}/app/api/v2/menu/search`,
            {
              store_code: storeCode,
              is_smartorder: storeCode !== 0 ? true : false,
            },
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
            fadeInOut();
          })
        );
    }
  }, [state?.auth]);

  useEffect(() => {
    contGap();
    fadeOut();
    scrollValue &&
      window.scrollTo({
        top: scrollValue,
        behavior: "smooth",
      });
  }, [axioData]);

  const handleSearch = (e) => {
    let targetValue = $("#searchValue").val();
    if (targetValue !== "") {
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/menu/search`, { store_code: storeCode, q: targetValue }, header_config)]).then(
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
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // 추가 코드를 작성하여 DB를 제어하거나 state를 변경할 수 있습니다!
  };

  const handleDetail = (event, menuCode, type) => {
    if (storeCode !== "0") {
      if (type) {
        history.push({
          pathname: `/order/detail/${storeCode}/${menuCode}`,
          scrollValue: $(document).scrollTop(),
        });
      } else {
        alert("테이블오더가 불가능한 메뉴입니다.");
        return false;
      }
    } else {
      history.push({
        pathname: `/order/infoDetail/${menuCode}`,
        scrollValue: $(document).scrollTop(),
      });
    }
  };

  if (axioData?.all_menu) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            {/* 사파리 이슈사항으로 강제이동시킴 */}
            <header id="header" className="header">
              <h1 className="page-title">메뉴검색</h1>
              <button type="button" className="btn back" onClick={() => history.push(`/order/menu/${storeCode}`)}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
              {storeCode !== "0" && (
                <div className="btn-area false">
                  <Link className="btn" to={`/mypage/cart/${storeCode}`}>
                    <i className="ico cart">
                      <span>장바구니</span>
                    </i>
                  </Link>
                </div>
              )}
            </header>

            <Nav order={3} />
            <div id="content" className="drink search fade-in">
              <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <fieldset className="fieldset">
                  <div className="w-inner">
                    <legend className="blind">메뉴 검색</legend>
                    <div className="field">
                      <div className="search-box">
                        <input id="searchValue" type="text" className="input-text medium" placeholder="메뉴명을 입력해 주세요." />
                        <button type="button" className="btn search">
                          <i className="ico search-t" onClick={(event) => handleSearch(event.currentTarget)}>
                            <span>검색하기</span>
                          </i>
                        </button>
                      </div>
                    </div>
                    {/* [D] 메뉴 검색 결과 텍스트 노출 */}
                    <p className="text">
                      총 <span className="fc-orange">{axioData?.all_menu?.searched_menu_list?.length}개</span>의 메뉴가 검색되었습니다.
                    </p>

                    {/* // [D] 메뉴 검색 결과 텍스트 노출 */}
                  </div>
                </fieldset>
              </form>
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
              </section>
              {/* //즐겨찾는 매장 */}

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
  } else
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            {/* 사파리 이슈사항으로 강제이동시킴 */}
            <header id="header" className="header">
              <h1 className="page-title">메뉴검색</h1>
              <button type="button" className="btn back" onClick={() => history.push(`/order/menu/${storeCode}`)}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
              {storeCode !== "0" && (
                <div className="btn-area false">
                  <Link className="btn" to={`/mypage/cart/${storeCode}`}>
                    <i className="ico cart">
                      <span>장바구니</span>
                    </i>
                  </Link>
                </div>
              )}
            </header>
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
