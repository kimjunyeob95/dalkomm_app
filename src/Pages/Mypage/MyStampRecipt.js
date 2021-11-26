/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";
import { checkMobile, fadeOut } from "Config/GlobalJs";

export default function MyStampRecipt() {
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
  let since_id = 0;
  let flag_array = [];
  let flag_api = true;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/main/user`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/stamp/usage`, { since_id: since_id }, header_config),
      ])
      .then(
        axios.spread((res1, res2) => {
          let res1_data = res1.data.data;
          let stampList = res2.data.data;
          flag_array.push(since_id);
          since_id++;

          setData((origin) => {
            return {
              ...origin,
              res1_data,
              stampList,
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
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/stamp/usage`, { since_id: since_id }, header_config)]).then(
        axios.spread((res1) => {
          let stampList2 = res1.data.data.usage_list;
          since_id++;
          if (stampList2.length > 0) {
            flag_api = true;
            setData((origin) => {
              return {
                ...origin,
                stampList: { ...origin.stampList, usage_list: [...origin.stampList.usage_list, ...stampList2] },
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
              <h1 className="page-title">적립 스탬프 내역</h1>
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
                      보유 스탬프 <span className="num">{axioData?.res1_data?.user?.stamp_card?.point}</span>
                    </div>
                    <div className="extinct">
                      <p className="state">
                        15일 이내 소멸 예정 스탬프 <span className="num">{axioData?.stampList?.soon_delete_stamp_point}</span>
                      </p>
                      <span className="alert">· 스탬프 유효기간은 발급일로부터 1년입니다.</span>
                    </div>
                  </div>
                </div>
                {axioData?.stampList?.usage_list?.length > 0 ? (
                  <ol className="data-list">
                    {axioData?.stampList?.usage_list?.map((e, i) => {
                      let hide_flag = !e?.store_name && !e?.channel ? 0 : 100;
                      return (
                        <li key={i}>
                          <div className="item save">
                            <div className="flex-both">
                              <div className="data-wrap">
                                <p className="time">{e?.date}</p>
                                <div className="data-info flex-list" style={{ opacity: 100 }}>
                                  {e?.store_name && <p className="title">{e?.store_name}</p>}
                                  {e?.channel && <p>{e?.channel}</p>}

                                  {e?.detail && <p className="text">{e?.detail}</p>}
                                </div>
                              </div>
                              <div className="state-wrap">
                                <div className={`state ${e?.type === 1 ? "saving" : "cancel"}`}>
                                  <p className="text">
                                    {e?.type === 1 ? "적립" : e?.type === 2 ? "사용" : e?.type === 3 ? "취소" : e?.type === 4 ? "소멸" : ""}
                                  </p>
                                  <p>&nbsp;{e?.point}</p>
                                  {/* [D] 트로피 사용 :
                                                .amount.increase : 트로피 사용 + ,
                                                .amount.decrease : 트로피 차감 -
                                                */}
                                </div>
                                {/* [D] 적립 상태 :
                                        .state.saving : 적립 ,
                                        .state.cancel : 적립취소
                                        */}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                ) : (
                  <div className="nodata-wrap">
                    <div className="item nodata">
                      <i className="ico nodata"></i>
                      <p className="text gray">적립 스탬프 내역이 없습니다.</p>
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
              <h1 className="page-title">적립 스탬프 내역</h1>
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
