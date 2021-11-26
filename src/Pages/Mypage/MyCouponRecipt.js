/* eslint-disable array-callback-return */
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
import { fadeOut } from "Config/GlobalJs";

export default function MyCouponRecipt() {
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
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/coupon/present/history`, body, header_config)]).then(
      axios.spread((res1) => {
        let resultList = res1.data.data.present_history;
        let getList = [];
        let postList = [];
        getList = resultList
          .sort((a, b) => {
            if (a.date > b.date) return -1;
            else if (a.date < b.date) return 1;
            return 0;
          })
          .reduce((prev, curr, indexs) => {
            const idx = prev.findIndex((item) => item[0].date === curr.date);
            if (curr.type === 2) {
              if (idx === -1) {
                prev.push([curr]);
              } else {
                prev[idx].push(curr);
              }
            }
            return prev;
          }, []);

        postList = resultList
          .sort((a, b) => {
            if (a.date > b.date) return -1;
            else if (a.date < b.date) return 1;
            return 0;
          })
          .reduce((prev, curr, indexs) => {
            const idx = prev.findIndex((item) => item[0].date === curr.date);
            if (curr.type === 1) {
              if (idx === -1) {
                prev.push([curr]);
              } else {
                prev[idx].push(curr);
              }
            }
            return prev;
          }, []);

        setData((origin) => {
          return {
            ...origin,
            getList,
            postList,
          };
        });
      })
    );
  }, []);
  useEffect(() => {
    contGap();
    fadeOut();
  }, [axioData]);

  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="쿠폰 선물 내역" />
            <div id="content" className="mypage history fade-in">
              <section className="section">
                <ul className="tabs">
                  <li className="current">
                    <a data-href="#receiveCoupon" onClick={(e) => tabLink(e)}>
                      받은 쿠폰
                    </a>
                  </li>
                  <li>
                    <a data-href="#sendCoupon" onClick={(e) => tabLink(e)}>
                      보낸 쿠폰
                    </a>
                  </li>
                </ul>

                <div id="receiveCoupon" className="tab-content active">
                  {axioData?.getList?.length > 0 ? (
                    <ol className="data-list">
                      {axioData?.getList?.map((e, i) => (
                        <li key={i}>
                          <h3 className="history-header">{e[0]?.date}</h3>
                          <ul className="data-list coupon-list">
                            {e?.map((element, index) => (
                              <li key={index}>
                                <div className="item coupon">
                                  <div className="data-wrap">
                                    <div className="flex-both">
                                      <p className="day num fc-orange">~{element?.due_date}</p>
                                      <p className="name">{element?.user_name}</p>
                                    </div>
                                    <p className="title">{element?.coupon_name}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className="nodata-wrap">
                      <div className="item nodata">
                        <i className="ico nodata"></i>
                        <p className="text gray">받은 쿠폰이 없습니다.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div id="sendCoupon" className="tab-content">
                  {axioData?.postList?.length > 0 ? (
                    <ol className="data-list">
                      {axioData?.postList.map((e, i) => (
                        <li key={i}>
                          <h3 className="history-header">{e[0]?.date}</h3>
                          <ul className="data-list coupon-list">
                            {e?.map((element, index) => (
                              <li key={index}>
                                <div className="item coupon">
                                  <div className="data-wrap">
                                    <div className="flex-both">
                                      <p className="day num fc-orange">~{element?.due_date}</p>
                                      <p className="name">{element?.user_name}</p>
                                    </div>
                                    <p className="title">{element?.coupon_name}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className="nodata-wrap">
                      <div className="item nodata">
                        <i className="ico nodata"></i>
                        <p className="text gray">보낸 쿠폰이 없습니다.</p>
                      </div>
                    </div>
                  )}
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
