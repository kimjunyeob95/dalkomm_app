/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";
import { fn_memberName, fadeOut } from "Config/GlobalJs";

export default function MyMembershipPolicy() {
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
        axios.post(`${SERVER_DALKOMM}/app/api/v2/membership`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/main/user`, body, header_config),
      ])
      .then(
        axios.spread((res1, res2) => {
          let res1_data = res1.data.data;
          let res2_data = res2.data.data;
          let percentage = (res2_data?.user?.current_point / 31) * 100 > 100 ? 100 : (res2_data?.user?.current_point / 31) * 100;
          setData((origin) => {
            return {
              ...origin,
              res1_data,
              res2_data,
              percentage: percentage,
            };
          });
        })
      );
  }, []);

  useEffect(() => {
    contGap();
    fadeOut();
  }, [axioData]);

  const handleReflash = () => {
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/v2/membership`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/main/user`, body, header_config),
      ])
      .then(
        axios.spread((res1, res2) => {
          let res1_data = res1.data.data;
          let res2_data = res2.data.data;
          let percentage = (res2_data?.user?.current_point / 31) * 100 > 100 ? 100 : (res2_data?.user?.current_point / 31) * 100;
          setData((origin) => {
            return {
              ...origin,
              res1_data,
              res2_data,
              percentage: percentage,
            };
          });
        })
      );
  };

  if (axioData) {
    // fadeInOut();
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header">
              <h1 className="page-title">달콤 멤버십</h1>
              <button type="button" className="btn back" onClick={() => history.goBack()}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
              <div className="btn-area flex-center">
                <a onClick={() => handleReflash()} className="btn">
                  <i className="ico refresh">
                    <span>새로고침</span>
                  </i>
                </a>
              </div>
            </header>

            <div id="content" className="mypage membership fade-in">
              <section className="section">
                <div className="item membership">
                  <div
                    className={`state ${
                      axioData?.res1_data?.membership_level === 0
                        ? "silver"
                        : axioData?.res1_data?.membership_level === 1
                        ? "gold"
                        : axioData?.res1_data?.membership_level === 2
                        ? "platinum"
                        : ""
                    }`}
                  >
                    {" "}
                    {/* [D] .state 상태 
            .state.silver : SILVER /
            .state.gold : GOLD /
            .state.platinum : PLATINUM /
        */}
                    <p className="grade en">{fn_memberName(axioData?.res1_data?.membership_level)} MEMBER</p>
                    {axioData?.res1_data?.remain_point > 0 && (
                      <p className="text">
                        트로피 {axioData?.res1_data?.remain_point + 1}개 더 모으면 다음달은 {fn_memberName(axioData?.res1_data?.membership_level + 1)}
                        !
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section className="section">
                <div className="possess-wrap">
                  <div className="flex-both">
                    <div className="possess-state">
                      <i className="ico trophy"></i> 보유 트로피 <span className="num">{axioData?.res2_data?.user?.current_point}</span>
                    </div>
                    <Link to="/mypage/membershipRecipt" className="btn bdr-r xx-small gray">
                      적립내역
                    </Link>
                  </div>
                  <div className="trophy-bar">
                    <div className="bar-wrap">
                      <div className="bar">
                        <span
                          className={`bar-state ${
                            axioData?.res1_data?.membership_level === 0
                              ? "silver"
                              : axioData?.res1_data?.membership_level === 1
                              ? "gold"
                              : axioData?.res1_data?.membership_level === 2
                              ? "platinum"
                              : ""
                          }`}
                          style={{
                            width: axioData?.percentage + "%",
                          }}
                        ></span>{" "}
                        {/* .bar-state 상태
                        .bar-state.silver : SILVER /
                        .bar-state.gold : GOLD /
                        .bar-state.silver : PLATINUM
                    */}
                        <ol>
                          <li>
                            <span className="text">SILVER</span>
                          </li>
                          <li>
                            <span className="text">GOLD</span>
                          </li>
                          <li>
                            <span className="text">PLATINUM</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="benefit-wrap">
                  <dl className="item describe">
                    <dt className="title">멤버십 등급 소개</dt>
                    <dd className="text">
                      <p>달콤 멤버십 서비스 이용의 기준이 되는 등급으로, 트로피 개수에 따라 실버, 골드, 플래티넘으로 부여됩니다.</p>
                    </dd>
                  </dl>

                  <dl className="item describe" style={{ paddingTop: 0 }}>
                    <dt className="title">멤버십 혜택</dt>
                    <dd className="text">
                      <p>
                        테이블오더 또는 매장에서 직접 결제 / 주문 할 때마다 적립되는
                        <br />
                        트로피를 모아 멤버십 혜택을 받으실 수 있습니다.
                      </p>
                      <ul className="attention-list">
                        <li>기프트카드 10,000원 충전 시 트로피 1개 적립</li>
                        <li>테이블오더 또는 매장에서 제조음료 결제시 마다 트로피 1개 적립</li>
                      </ul>
                    </dd>
                  </dl>

                  <ul className="data-list">
                    <li>
                      <div className="item benefit">
                        <div className="grade">
                          <span className="title en">SILVER</span>
                          <span className="text">
                            트로피 0-10개 <br />
                            보유 회원
                          </span>
                        </div>
                        <ul className="list">
                          <li>온라인 이벤트 참여</li>
                          <li>달콤 멤버십카드 발급 및 스탬프 적립</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="item benefit">
                        <div className="grade">
                          <span className="title en">GOLD</span>
                          <span className="text">
                            트로피 11-30개 <br />
                            보유 회원
                          </span>
                        </div>
                        <ul className="list">
                          <li>온라인 이벤트 참여</li>
                          <li>달콤 멤버십카드 발급 및 스탬프 적립</li>
                          <li>생일 축하 아메리카노 쿠폰 </li>
                          <li>신메뉴 30%할인 쿠폰</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="item benefit">
                        <div className="grade">
                          <span className="title en">PLATINUM</span>
                          <span className="text">
                            트로피 31개 이상 <br />
                            보유 회원
                          </span>
                        </div>
                        <ul className="list">
                          <li>온라인 이벤트 참여</li>
                          <li>달콤 멤버십카드 발급 및 스탬프 적립</li>
                          <li>생일 축하 아메리카노 쿠폰 </li>
                          <li>신메뉴 30%할인 쿠폰</li>
                          <li>
                            테이블오더 5% 항시 할인
                            <span className="standard">제조음료 주문 시</span>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>

                  <div className="table-wrap">
                    <table className="data-table">
                      <colgroup>
                        <col width="60%" />
                        <col width="13.5%" />
                        <col width="15.5%" />
                        <col width="21%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col">트로피 갯수별 멤버십 등급 혜택</th>
                          <th scope="col">
                            실버<span>0-10개</span>
                          </th>
                          <th scope="col">
                            골드<span>11-30개</span>
                          </th>
                          <th scope="col">
                            플래티넘<span>31개 이상</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>온라인 이벤트 참여</td>
                          <td>
                            <i className="ico check-s"></i>
                          </td>
                          <td>
                            <i className="ico check-s"></i>
                          </td>
                          <td>
                            <i className="ico check-s"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>달콤 멤버십카드 발급 및 스탬프 적립</td>
                          <td>
                            <i className="ico check-s"></i>
                          </td>
                          <td>
                            <i className="ico check-s"></i>
                          </td>
                          <td>
                            <i className="ico check-s"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>생일 축하 아메리카노 쿠폰</td>
                          <td></td>
                          <td>
                            <i className="ico check-s"></i>
                          </td>
                          <td>
                            <i className="ico check-s"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>신메뉴 30% 할인 쿠폰</td>
                          <td></td>
                          <td>
                            <i className="ico check-s"></i>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>신메뉴 1+1 쿠폰</td>
                          <td></td>
                          <td></td>
                          <td>
                            <i className="ico check-s"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>테이블오더 5% 항시 할인 (제조음료 주문 시)</td>
                          <td></td>
                          <td></td>
                          <td>
                            <i className="ico check-s"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <ul className="attention-list">
                    <li>신메뉴 출시 기념 할인쿠폰은 제조음료에 한하여 사용 가능합니다.</li>
                    <li>생일 쿠폰은 생일 기준 15일 전에 자동 발급됩니다.</li>
                    <li>
                      테이블오더 5% 할인은 제조음료 주문 시에만 사용 가능하며,
                      <br /> 세트, MD, 베이커리, 빙수류, 할인 및 프로모션 메뉴는 제외됩니다.
                    </li>
                    <li>멤버십 혜택으로 인해 발급되는 쿠폰은 테이블오더 전용 쿠폰입니다.</li>
                  </ul>
                </div>
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
          <div id="container" className="container"></div>
        </div>
      </React.Fragment>
    );
}
