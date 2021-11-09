/* eslint-disable no-unreachable */
/* eslint-disable no-script-url */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";
import { fadeOut } from "Config/GlobalJs";

export default function OrderInfoDetail() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const history = useHistory();
  const { menuCode } = useParams();
  const { scrollValue, targetValue } = useLocation();

  const body = {};
  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };
  useEffect(() => {
    axios.all([axios.get(`${SERVER_DALKOMM}/app/api/v2/menu/detail?code=${menuCode}&store_code=&is_smartorder=${0}`, header_config)]).then(
      axios.spread((res1) => {
        let res1_data = res1.data.data.menu;
        setData((origin) => {
          return {
            ...origin,
            res1_data,
          };
        });
      })
    );
  }, [state?.auth]);

  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    if (axioData?.res1_data) {
      contGap();
      fadeOut();
    }
  }, [axioData]);
  if (axioData?.res1_data) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            {/* 사파리 이슈사항으로 강제이동시킴 */}
            <header id="header" className="header only-button-header">
              <h1>
                <span className="blind">메뉴상세</span>
              </h1>
              <button
                type="button"
                className="btn back"
                onClick={() =>
                  history.push({
                    pathname: `/order/menuSearch/0`,
                    scrollValue: scrollValue,
                    targetValue: targetValue,
                  })
                }
              >
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
            </header>
            <div id="content" className="drink detail fade-in">
              <section className="section">
                <div className="item drink-info">
                  <div className="img-wrap">
                    <img src={axioData?.res1_data?.detail_image} alt={axioData?.res1_data?.name_kor} />
                  </div>
                  <div className="detail-wrap">
                    <div className="text-box">
                      {/* <p className="type en fc-orange">COFFEE</p> */}
                      <p className="name">
                        {axioData?.res1_data?.name_kor}
                        {/* <span className="en">Caramelmcchiato</span> */}
                      </p>
                      {/* <div
                  dangerouslySetInnerHTML={{ __html: axioData?.res1_data?.name_kor }}
                ></div> */}
                      <p className="text">{axioData?.res1_data?.desc}</p>
                    </div>
                    <p className="price">{axioData?.res1_data?.price?.toLocaleString("ko-KR")}원</p>
                  </div>
                </div>

                <ul className="data-list toggle-wrap">
                  <li>
                    <div className="item info-detail">
                      <div className="title-wrap toggle-switch">
                        <p className="title">영양 성분 정보</p>
                      </div>
                      <div className="detail-wrap toggle-cont" style={{ display: "block" }}>
                        <p className="text">
                          <span>
                            1회 제공량 {axioData?.res1_data?.size} / 열량 {axioData?.res1_data?.kcal} (Kcal)
                          </span>
                        </p>
                        <br />
                        <div
                          dangerouslySetInnerHTML={{
                            __html: axioData?.res1_data?.memo,
                          }}
                        ></div>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>

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
              <h1>
                <span className="blind">메뉴상세</span>
              </h1>
              <button type="button" className="btn back" onClick={() => history.push(`/order/menuSearch/0`)}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
            </header>

            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}
      </React.Fragment>
    );
}
