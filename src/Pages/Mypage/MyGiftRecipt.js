/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import GoContents from "Components/GoContents";
import Loading from "Components/Loading";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

import { contGap } from "Jquery/Jquery";
import { fadeOut } from "Config/GlobalJs";

export default function MyGiftRecipt() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
  const { giftnum } = useParams();
  const history = useHistory();
  const { activeHtml } = useLocation();

  SwiperCore.use([Pagination]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const body = {};
    const header_config = {
      headers: {
        "X-dalkomm-access-token": state?.accessToken,
        Authorization: state?.auth,
      },
    };

    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/v2/membership`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/chargecard/usage`, { card_number: giftnum }, header_config),
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
  }, [state?.auth]);
  useEffect(() => {
    contGap();
    fadeOut();
  }, [axioData]);
  const handlePage = () => {
    if (activeHtml) {
      history.push("/pay?activeHtml=true");
    } else {
      history.push("/pay");
    }
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header undefined">
              <h1 className="page-title">기프트카드 사용내역</h1>
              <button type="button" className="btn back" onClick={() => handlePage()}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
            </header>
            <div id="content" className="pay charge history fade-in">
              <section className="section">
                {axioData?.res2_data?.usage_list?.length > 0 && (
                  <div className="w-inner">
                    <p className="card-title">{axioData?.res1_data?.user_name}님의 기프트카드</p>
                    <div className="item card gift">
                      {/* <div className="card-wrap" style={{ backgroundImage: `url(${axioData?.res1_data?.charge_card_image_url})` }}> */}
                      <div className="card-wrap">
                        <p className="grade en">
                          RECHARGEABLE
                          <br />
                          GIFT CARD
                        </p>
                        <p className="sort en">DAL.KOMM GIFT CARD</p>
                      </div>
                    </div>
                    <p className="hold">
                      보유금액 <span>{axioData?.res2_data?.amount?.toLocaleString("ko-KR")}원</span>
                    </p>
                  </div>
                )}
                {axioData?.res2_data?.usage_list?.length > 0 && (
                  <ul className="data-list">
                    {axioData?.res2_data?.usage_list?.map((element, index) => (
                      <li key={index}>
                        <div className={`item history ${element?.type === 0 ? "recharge" : element?.type === 1 ? "use" : "cancel"}`}>
                          {/*
                                          .item.history.use     : 사용
                                          .item.history.recharge : 충전
                                          .item.history.cancel   : 사용 취소
                                      */}
                          <div className="detail-wrap flex-start">
                            <p className="day">{element?.date}</p>
                            <p className="state">
                              {element?.type === 0
                                ? "충전"
                                : element?.type === 1
                                ? "사용"
                                : element?.type === 2
                                ? "충전취소"
                                : element?.type === 3
                                ? "사용취소"
                                : element?.type === 4
                                ? "잔액환불"
                                : element?.type === 5
                                ? "잔액환불취소"
                                : "기타"}
                            </p>
                          </div>
                          <div className="data-wrap">
                            <p className="price">
                              {element?.type === 0
                                ? "+"
                                : element?.type === 1
                                ? ""
                                : element?.type === 2
                                ? ""
                                : element?.type === 3
                                ? "-"
                                : element?.type === 4
                                ? "+"
                                : element?.type === 5
                                ? "-"
                                : "기타"}
                              {element?.amount}원
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="alert ta-c">
                  <i className="ico alert">
                    <span>알림</span>
                  </i>
                  {axioData?.res2_data?.usage_list?.length > 0 ? "최근 6개월의 사용내역을 조회할 수 있습니다." : "해당카드의 사용내역이 없습니다."}
                </p>
              </section>
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
            <header id="header" className="header undefined">
              <h1 className="page-title">기프트카드 사용내역</h1>
              <button type="button" className="btn back" onClick={() => handlePage()}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
            </header>
            <Loading />
          </div>
        </div>
      </React.Fragment>
    );
}
