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

export default function MyGiftSendRecipt() {
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
            <HeaderSub title="기프트카드 선물내역" />
            <div id="content" className="pay gift history">
              <section className="section">
                <ol className="data-list">
                  <li>
                    <div className="history-header">2021.06.19</div>
                    <div className="item history">
                      <div className="detail-wrap flex-both">
                        <p className="title">다슬커피</p>
                        <p className="price">
                          <strong>+20,000원</strong>
                        </p>
                      </div>
                      <div className="data-wrap">
                        <p className="tel">01088130918</p>
                      </div>
                    </div>
                    <div className="item history">
                      <div className="detail-wrap flex-both">
                        <p className="title">다슬커피</p>
                        <p className="price">
                          <strong>+20,000원</strong>
                        </p>
                      </div>
                      <div className="data-wrap">
                        <p className="tel">01088130918</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="history-header">2021.05.16</div>
                    <div className="item history">
                      <div className="detail-wrap flex-both">
                        <p className="title">다슬커피</p>
                        <p className="price">
                          <strong>+30,000원</strong>
                        </p>
                      </div>
                      <div className="data-wrap">
                        <p className="tel">01088130918</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="history-header">2021.01.15</div>
                    <div className="item history">
                      <div className="detail-wrap flex-both">
                        <p className="title">다슬커피</p>
                        <p className="price">
                          <strong>+50,000원</strong>
                        </p>
                      </div>
                      <div className="data-wrap">
                        <p className="tel">01088130918</p>
                      </div>
                    </div>
                    <div className="item history">
                      <div className="detail-wrap flex-both">
                        <p className="title">다슬커피</p>
                        <p className="price">
                          <strong>+10,000원</strong>
                        </p>
                      </div>
                      <div className="data-wrap">
                        <p className="tel">01088130918</p>
                      </div>
                    </div>
                  </li>
                </ol>
              </section>
            </div>{" "}
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
