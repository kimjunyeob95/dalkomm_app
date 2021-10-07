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

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

import { tabLink, moveScrollTop, contGap, fadeInOut } from "Jquery/Jquery";

export default function MyGiftRecipt() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
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
        axios.post(`${SERVER_DALKOMM}/app/api/v2/chargecard/list`, body, header_config),
      ])
      .then(
        axios.spread((res1, res2) => {
          let res1_data = res1.data.data;
          let allCard = res2.data.data.charge_card_list;
          res2.data.data.charge_card_list?.map((element, index) => {
            axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/chargecard/usage`, { card_number: element.card_number }, header_config)]).then(
              axios.spread((response) => {
                allCard[index]["recipt"] = response.data.data;
              })
            );
          });
          setTimeout(() => {
            setData((origin) => {
              return {
                ...origin,
                res1_data,
                allCard,
              };
            });
          }, 1000);
        })
      );
  }, [state.auth]);

  fadeInOut();

  useEffect(() => {
    contGap();
  }, [axioData]);

  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="기프트카드 사용내역" />
            <div id="content" className="pay charge history">
              <section className="section">
                <Swiper
                  id="cardSlider"
                  className="swiper-container"
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  observer={true}
                  observeParents={true}
                >
                  <ul className="swiper-wrapper">
                    {axioData?.allCard?.map((e, i) => (
                      <SwiperSlide className="swiper-slide" key={i}>
                        <div className="w-inner">
                          <p className="card-title">{axioData?.res1_data?.user_name}님의 기프트카드</p>
                          <div className="item card gift">
                            <div className="card-wrap" style={{ backgroundImage: `url(${e?.card_image_url})` }}>
                              <p className="grade en">
                                RECHARGEABLE
                                <br />
                                GIFT CARD
                              </p>
                              <p className="sort en">DAL.KOMM GIFT CARD</p>
                            </div>
                          </div>
                          <p className="hold">
                            보유금액 <span>{e?.recipt?.amount}원</span>
                          </p>
                        </div>

                        <ul className="data-list">
                          {e?.recipt?.usage_list?.map((element, index) => (
                            <li>
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
                                  <p className="price">{element?.amount}원</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </SwiperSlide>
                    ))}
                  </ul>
                  <div className="swiper-pagination"></div>
                </Swiper>
                <p className="alert ta-c">
                  <i className="ico alert">
                    <span>알림</span>
                  </i>
                  최근 6개월의 이용내역을 조회할 수 있습니다.
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
  } else return <React.Fragment></React.Fragment>;
}
