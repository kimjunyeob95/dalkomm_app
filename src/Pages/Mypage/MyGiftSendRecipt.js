/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

import { tabLink, moveScrollTop, contGap, fadeInOut } from "Jquery/Jquery";
import { fadeOut } from "Config/GlobalJs";

export default function MyGiftSendRecipt() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
  const history = useHistory();
  const { activeHtml } = useLocation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const body = {};
    const header_config = {
      headers: {
        "X-dalkomm-access-token": state?.accessToken,
        Authorization: state?.auth,
      },
    };
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/present/history`, body, header_config)]).then(
      axios.spread((res1) => {
        let resultList = res1.data.data.present_history;
        resultList = resultList
          .sort((a, b) => {
            if (a.date > b.date) return -1;
            else if (a.date < b.date) return 1;
            return 0;
          })
          .reduce((prev, curr, indexs) => {
            const idx = prev.findIndex((item) => item[0].date === curr.date);
            if (idx === -1) {
              prev.push([curr]);
            } else {
              prev[idx].push(curr);
            }
            return prev;
          }, []);

        setData((origin) => {
          return {
            ...origin,
            resultList,
          };
        });
      })
    );
  }, []);
  useEffect(() => {
    contGap();
    fadeOut();
  }, [axioData]);

  const handlePage = () => {
    if (activeHtml) {
      history.push({
        pathname: "/mypage/giftSend",
        activeHtml: true,
      });
    } else {
      history.push({
        pathname: "/mypage/giftSend",
        activeHtml: false,
      });
    }
  };

  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header undefined">
              <h1 className="page-title">기프트카드 선물내역</h1>
              <button type="button" className="btn back" onClick={() => handlePage()}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
            </header>
            <div id="content" className={`pay gift history fade-in ${axioData?.resultList?.length < 1 && "charge"}`}>
              <section className="section">
                <ol className="data-list">
                  {axioData?.resultList?.map((element, index) => (
                    <li key={index}>
                      <div className="history-header">{element[0]?.date}</div>
                      {element.map((ele, indexs) => (
                        <div className="item history" key={indexs}>
                          <div className="detail-wrap flex-both">
                            <p className="title">{ele?.recv_user_name}</p>
                            <p className="price">
                              <strong>{ele?.amount.toLocaleString("ko-KR")}원</strong>
                            </p>
                          </div>
                          <div className="data-wrap">
                            <p className="tel">{ele?.recv_user_mobile}</p>
                          </div>
                        </div>
                      ))}
                    </li>
                  ))}
                </ol>
                {axioData?.resultList?.length < 1 && (
                  <p className="alert ta-c">
                    <i className="ico alert">
                      <span>알림</span>
                    </i>
                    기프트카드 선물내역이 없습니다.
                  </p>
                )}
              </section>
            </div>{" "}
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
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header undefined">
              <h1 className="page-title">기프트카드 선물내역</h1>
              <button type="button" className="btn back" onClick={() => handlePage()}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
            </header>
          </div>
        </div>
      </React.Fragment>
    );
}
