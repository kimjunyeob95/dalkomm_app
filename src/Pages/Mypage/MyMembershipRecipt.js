/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";
import { fadeOut } from "Config/GlobalJs";

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
  let since_id = null;
  let flag_array = [];
  let flag_api = true;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/membership/usage`, { since_id: since_id }, header_config)]).then(
      axios.spread((res1) => {
        let trop_data = res1.data.data;
        let trop_data_length = trop_data.usage_list.length;
        flag_array.push(since_id);
        since_id = trop_data.usage_list[trop_data_length - 1]?.usage_id;

        setData((origin) => {
          return {
            ...origin,
            trop_data,
          };
        });
      })
    );
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    contGap();
    fadeOut();
  }, [axioData]);
  const fn_api = () => {
    if (flag_array.indexOf(since_id) > 0) {
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/membership/usage`, { since_id: since_id }, header_config)]).then(
        axios.spread((res1) => {
          let stampList2 = res1.data.data.usage_list;
          let trop_data_length = stampList2.length;
          if (trop_data_length > 0) {
            since_id = stampList2[trop_data_length - 1].usage_id;

            flag_api = true;
            setData((origin) => {
              return {
                ...origin,
                trop_data: { ...origin.trop_data, usage_list: [...origin.trop_data.usage_list, ...stampList2] },
              };
            });
          } else {
            flag_api = false;
          }
        })
      );
    }
  };
  const handleScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight * 0.95) {
      if (flag_array.indexOf(since_id) < 0) {
        if (flag_api) {
          flag_array.push(since_id);
          fn_api();
        }
      }
    }
  };

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
                      보유 트로피 <span className="num">{axioData?.trop_data?.current_point}</span>
                    </div>
                    <div className="extinct">
                      <p className="state">
                        15일 이내 소멸 예정 트로피 <span className="num">{axioData?.trop_data?.soon_delete_point}</span>
                      </p>
                      <span className="alert">· 트로피 유효기간은 적립일로부터 1년입니다.</span>
                    </div>
                  </div>
                </div>

                {axioData?.trop_data?.usage_list?.length > 0 ? (
                  <ol className="data-list">
                    {axioData?.trop_data?.usage_list?.map((e, i) => (
                      <li key={i}>
                        <div className="item save">
                          <div className="flex-both">
                            <div className="data-wrap">
                              <p className="time">{e?.date}</p>
                              <div className="data-info flex-list">
                                <p className="title">{e?.detail}</p>
                                {e?.channel && <p>{e?.channel}</p>}
                              </div>
                            </div>
                            <div className="state-wrap">
                              <div className={`state ${e?.type === 1 ? "saving" : "cancel"}`}>
                                <p className="text">
                                  {e?.type === 1 ? "적립" : e?.type === 2 ? "등급변경" : e?.type === 3 ? "취소" : e?.type === 4 ? "유효기간만료" : ""}
                                </p>
                                <p>&nbsp;{e?.point}</p>
                              </div>
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
                ) : (
                  <div className="nodata-wrap">
                    <div className="item nodata">
                      <i className="ico nodata"></i>
                      <p className="text gray">트로피 적립 내역이 없습니다.</p>
                    </div>
                  </div>
                )}
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
