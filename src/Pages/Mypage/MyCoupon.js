/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import GoContents from "Components/GoContents";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

import { accordion, tabLink, contGap, fadeInOut } from "Jquery/Jquery";
import { fadeOut } from "Config/GlobalJs";

export default function MyCoupon() {
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

  const fn_axios = () => {
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/v2/coupon/list`, { type: 0 }, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/coupon/list`, { type: 1 }, header_config),
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
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fn_axios();
  }, []);
  const fn_submit = () => {
    let coupon_number = $("#couponNum").val();
    if (coupon_number === "") {
      alert("쿠폰 번호를 입력해 주세요.");
      return false;
    } else {
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/coupon/ext/use`, { coupon_number: coupon_number }, header_config)]).then(
        axios.spread((res1) => {
          $("#couponNum").val("");
          $("body").removeClass("modal-opened");
          $("#popupRegisterCoupon").removeClass("active");
          alert(res1.data.meta.msg);
          if (res1.data.meta.code === 20000) {
            fn_axios();
          }
        })
      );
    }
  };

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
            <header id="header" className="header undefined">
              <h1 className="page-title">나의 쿠폰 리스트</h1>
              <button type="button" className="btn back" onClick={() => history.push("/mypage")}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
              <div className="btn-area flex-center">
                <Link className="btn" to="/mypage/couponSend">
                  <i className="ico gift">
                    <span>나의 쿠폰 리스트</span>
                  </i>
                </Link>
              </div>
            </header>

            <div id="content" className="mypage coupon fade-in">
              <section className="section">
                <ul className="tabs">
                  <li className="current">
                    <a data-href="#availCoupon" onClick={(e) => tabLink(e)}>
                      사용가능 쿠폰
                    </a>
                  </li>
                  <li>
                    <a data-href="#expiredCoupon" onClick={(e) => tabLink(e)}>
                      지난 쿠폰
                    </a>
                  </li>
                </ul>
                <div id="availCoupon" className="tab-content active">
                  {axioData?.res1_data?.coupon_list?.length > 0 ? (
                    <ul className="coupon-list data-list accordion">
                      {axioData?.res1_data?.coupon_list.map((e, i) => (
                        <li key={i}>
                          <div className="item coupon js-accordion-switche" onClick={(e) => accordion(e.currentTarget, 0)}>
                            <div className="data-wrap">
                              <p className="day num">{e?.due_date}</p>
                              <p className="title">{e?.coupon_name}</p>
                            </div>
                            <div className="ico-wrap flex-center">
                              <i className="ico accordion-arr"></i>
                            </div>
                          </div>
                          <div className="item attention js-accordion-content">
                            <dl>
                              <dt className="title">
                                <i className="ico alert"></i>쿠폰 유의사항
                              </dt>
                              <dd className="text">
                                <ul className="attention-list">
                                  {e?.detail_cautions?.split("\r\n").map((e, i) => (
                                    <li key={i}>{e}</li>
                                  ))}
                                </ul>
                              </dd>
                            </dl>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="nodata-wrap">
                      <div className="item nodata">
                        <i className="ico nodata"></i>
                        <p className="text gray">사용가능한 쿠폰이 없습니다.</p>
                      </div>
                    </div>
                  )}
                </div>
                <div id="expiredCoupon" className="tab-content">
                  {axioData?.res2_data?.coupon_list?.length > 0 ? (
                    <ul className="coupon-list data-list accordion">
                      {axioData?.res2_data?.coupon_list.map((e, i) => (
                        <li key={i}>
                          <div className="item coupon js-accordion-switche" onClick={(e) => accordion(e.currentTarget, 0)}>
                            <div className="data-wrap">
                              <p className="day expire">기간만료</p> {/* [D] .day.expire : 기간 만료 */}
                              <p className="title">{e?.coupon_name}</p>
                            </div>
                            <div className="ico-wrap flex-center">
                              <i className="ico accordion-arr"></i>
                            </div>
                          </div>
                          <div className="item attention js-accordion-content">
                            <dl>
                              <dt className="title">
                                <i className="ico alert"></i>쿠폰 유의사항
                              </dt>
                              <dd className="text">
                                <ul className="attention-list">
                                  {e?.detail_cautions?.split("\r\n").map((e, i) => (
                                    <li key={i}>{e}</li>
                                  ))}
                                </ul>
                              </dd>
                            </dl>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="nodata-wrap">
                      <div className="item nodata">
                        <i className="ico nodata"></i>
                        <p className="text gray">지난 쿠폰이 없습니다.</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* 신규 쿠폰 추가 버튼 영역 */}
              <div className="fixed-con active">
                <div className="popup">
                  <div className="popup-wrap">
                    <div className="btn-area">
                      <button type="button" className="btn full x-large dark open-pop" pop-target="#popupRegisterCoupon">
                        <strong>신규 쿠폰 추가</strong>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 신규 쿠폰 추가 버튼 영역 */}

              {/* 쿠폰 등록하기 팝업 */}
              <div id="popupRegisterCoupon" className="fixed-con layer-pop dimm">
                <div className="popup">
                  <div className="popup-wrap">
                    <button type="button" className="btn btn-close">
                      <i className="ico close">
                        <span>close</span>
                      </i>
                    </button>
                    <div className="popup-body">
                      <form className="form">
                        <fieldset className="fieldset">
                          <legend className="blind">쿠폰 등록</legend>
                          <div className="w-inner">
                            <h2 className="h2">보유하신 쿠폰 번호를 입력해 주세요.</h2>
                            <div className="field">
                              <label className="blind" htmlFor="couponNum">
                                쿠폰 번호 입력
                              </label>
                              <div className="insert">
                                <input type="text" className="input-text medium" id="couponNum" placeholder="쿠폰 번호를 입력해 주세요."></input>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                        <div className="btn-area">
                          <button type="button" className="btn full x-large dark" onClick={() => fn_submit()}>
                            <strong>쿠폰 등록하기</strong>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 쿠폰 등록하기 팝업 */}
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
