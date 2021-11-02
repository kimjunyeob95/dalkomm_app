/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

import { contGap, fadeInOut } from "Jquery/Jquery";
import { fadeOut } from "Config/GlobalJs";

export default function MyStamp() {
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
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/main/user`, body, header_config)]).then(
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
  }, [state?.accessToken, state?.auth]);
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
            <HeaderSub title="나의 적립 내역" type="flexCenter" />

            <div id="content" className="mypage stamp fade-in">
              <div className="user-stamp-wrap">
                <div className="flex-both">
                  <div className="title-wrap flex-center">
                    <i className="ico stamp-s"></i>
                    <h3 className="h3">적립 스탬프</h3>
                  </div>
                  <div className="count-wrap">
                    <strong className="count">{axioData?.res1_data?.user?.stamp_card?.complete_count}</strong> / 12
                  </div>
                </div>

                <ol className="data-list flex-list">
                  {[...Array(12)]?.map((e, i) => {
                    return (
                      <li key={i}>
                        {/* [D]: 스탬프 활성화: save 클래스 추가 */}
                        <div className={`item stamp ${i < axioData?.res1_data?.user?.stamp_card?.complete_count ? "save" : "finish"}`}>
                          <span className="num en">{i + 1}</span>
                          {i >= 11 && <p className="speech-bubble small en">FREE!</p>}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="w-inner">
                <div className="btn-area">
                  <button className="btn light medium full">멤버십 등급 소개</button>
                </div>

                <div className="item attention">
                  <dl>
                    <dt className="title">
                      <i className="ico alert"></i>멤버십 적립 유의사항
                    </dt>
                    <dd className="text">
                      <ul className="attention-list">
                        <li>
                          적립카드 스탬프는 제조 음료에 한하여 1잔당 스탬프 1회를 찍어 드립니다.
                          <br />
                          SET, MD, 베이커리, 키프티콘, 카카오 선물하기, 할인 또는 쿠폰 사용시 적립 제외
                        </li>
                        <li>총 10회 적립 시 테이블오더 전용 무료 음료가 제공됩니다.</li>
                        <li>스탬프의 유효기간은 발급일로 부터 1년입니다.</li>
                        <li>스탬프 적립에는 다소 시간이 걸릴 수 있습니다.</li>
                        <li>무료 음료 쿠폰의 유효기간은 발급일로부터 30일입니다.</li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
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
