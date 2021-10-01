/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

import { tabLink, moveScrollTop, contGap, fadeInOut } from "Jquery/Jquery";

export default function MyGiftRecipt() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const body = {};
    const header_config = {
      headers: {
        "X-dalkomm-access-token": state?.accessToken,
        Authorization: state?.auth,
      },
    };
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/coupon/list`, body, header_config)]).then(
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
  }, []);
  useEffect(() => {
    contGap();
  }, [axioData]);
  if (axioData) {
    fadeInOut();
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="쿠폰 선물 내역" />
            <div id="content" className="mypage history">
              <section className="section">
                <ul className="tabs">
                  <li className="current">
                    <Link to="#" data-href="#receiveCoupon" onClick={(e) => tabLink(e)}>
                      받은 쿠폰
                    </Link>
                  </li>
                  <li>
                    <Link to="#" data-href="#sendCoupon" onClick={(e) => tabLink(e)}>
                      보낸 쿠폰
                    </Link>
                  </li>
                </ul>

                <div id="receiveCoupon" className="tab-content active">
                  <ol className="data-list">
                    <li>
                      <h3 className="history-header">2021.06.19</h3>
                      <ul className="data-list coupon-list">
                        <li>
                          <div className="item coupon">
                            <div className="data-wrap">
                              <div className="flex-both">
                                <p className="day num fc-orange">~21.07.28</p>
                                <p className="name">다슬커피</p>
                              </div>
                              <p className="title">FREE 음료 쿠폰</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="item coupon">
                            <div className="data-wrap">
                              <div className="flex-both">
                                <p className="day num fc-orange">~21.07.28</p>
                                <p className="name">다슬커피</p>
                              </div>
                              <p className="title">FREE 음료 쿠폰</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="item coupon">
                            <div className="data-wrap">
                              <div className="flex-both">
                                <p className="day num fc-orange">~21.07.28</p>
                                <p className="name">다슬커피</p>
                              </div>
                              <p className="title">FREE 음료 쿠폰</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h3 className="history-header">2021.06.19</h3>
                      <ul className="data-list coupon-list">
                        <li>
                          <div className="item coupon">
                            <div className="data-wrap">
                              <div className="flex-both">
                                <p className="day num fc-orange">~21.07.28</p>
                                <p className="name">다슬커피</p>
                              </div>
                              <p className="title">FREE 음료 쿠폰</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="item coupon">
                            <div className="data-wrap">
                              <div className="flex-both">
                                <p className="day num fc-orange">~21.07.28</p>
                                <p className="name">다슬커피</p>
                              </div>
                              <p className="title">FREE 음료 쿠폰</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ol>
                </div>

                <div id="sendCoupon" className="tab-content">
                  <ol className="data-list">
                    <li>
                      <h3 className="history-header">2021.06.19</h3>
                      <ul className="data-list coupon-list">
                        <li>
                          <div className="item coupon">
                            <div className="data-wrap">
                              <div className="flex-both">
                                <p className="day num fc-orange">~21.07.28</p>
                                <p className="name">다슬커피</p>
                              </div>
                              <p className="title">FREE 음료 쿠폰</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h3 className="history-header">2021.06.19</h3>
                      <ul className="data-list coupon-list">
                        <li>
                          <div className="item coupon">
                            <div className="data-wrap">
                              <div className="flex-both">
                                <p className="day num fc-orange">~21.07.28</p>
                                <p className="name">다슬커피</p>
                              </div>
                              <p className="title">FREE 음료 쿠폰</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="item coupon">
                            <div className="data-wrap">
                              <div className="flex-both">
                                <p className="day num fc-orange">~21.07.28</p>
                                <p className="name">다슬커피</p>
                              </div>
                              <p className="title">FREE 음료 쿠폰</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ol>
                </div>

                <div className="alert-wrap">
                  <p className="alert">
                    <i className="ico alert">
                      <span>알림</span>
                    </i>
                    최근 1년간의 이용내역을 조회할 수 있습니다.
                  </p>
                </div>
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
  } else return <React.Fragment></React.Fragment>;
}
