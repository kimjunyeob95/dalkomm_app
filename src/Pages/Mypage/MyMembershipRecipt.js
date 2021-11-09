/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, popupOpen } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";
import { checkMobile, fadeOut } from "Config/GlobalJs";

export default function MyMembershipRecipt() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState();
  const history = useHistory();

  const body = {};
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/main/user`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/reward/usage_list`, body, header_config),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          let res1_data = res1.data.data;
          let rewardData = res2.data.data;
          setData((origin) => {
            return {
              ...origin,
              res1_data,
              rewardData,
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
            <header id="header" className="header">
              <h1 className="page-title">트로피 적립 내역</h1>
              <button type="button" className="btn back" onClick={() => history.goBack()}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
            </header>

            <div id="content" className="mypage membership save fade-in">
              <section className="section">
                <div className="possess-wrap w-inner">
                  <div className="flex-list">
                    <div className="possess-state">
                      보유 트로피 <span className="num">{axioData?.res1_data?.user?.current_point}</span>
                    </div>
                    <div className="extinct">
                      <p className="state">
                        15일 이내 소멸 예정 트로피 <span className="num">{axioData?.rewardData?.soon_delete_point}</span>
                      </p>
                      <span className="alert">· 트로피 유효기간은 적립일로부터 1년입니다.</span>
                    </div>
                  </div>
                </div>

                <ol className="data-list">
                  {axioData?.rewardData?.usage_list?.map((e, i) => (
                    <li key={i}>
                      <div className="item save">
                        <div className="flex-both">
                          <div className="data-wrap">
                            <p className="time">{e?.date}</p>
                            <div className="data-info flex-list">
                              <p className="title">{e?.store_name}</p>
                              <p>{e?.channel}</p>
                              <div className="desc">· 트로피 유효기간은 적립일로부터 1년입니다.</div>
                            </div>
                          </div>
                          <div className={`state ${e?.type === 1 ? "saving" : "cancel"}`}>
                            {e?.type === 1 ? "적립" : e?.type === 2 ? "사용" : e?.type === 3 ? "취소" : e?.type === 4 ? "소멸" : ""}
                          </div>

                          {/* [D] 적립 상태 :
                    .state.saving : 적립 ,
                    .state.cancel : 적립취소
                     */}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
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
            <header id="header" className="header">
              <h1 className="page-title">트로피 적립 내역</h1>
              <button type="button" className="btn back" onClick={() => history.goBack()}>
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
