/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import HeaderSub from "Components/Header/HeaderSub";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, popupOpen, fadeInOut } from "Jquery/Jquery";
import Popup_logout from "./Popup_logout";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

export default function MyPage() {
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
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/main/user`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/my_account/profile`, body, header_config),
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
            <HeaderSub type="flexCenter" icon="modify" title="마이 달콤" location="/mypage/modify" noBack={true} />
            <Nav order={4} />
            <div id="content" className="mypage main">
              <div className="user-info-wrap">
                <div className="item my-info">
                  <p className="user">
                    <strong>{axioData?.res1_data?.user?.user_name}</strong> 고객님
                  </p>
                  <div className="flex-center">
                    <span className="en grade">{axioData?.res1_data?.user?.membership_name}</span>
                    <button type="button" className="btn barcode  open-pop" pop-target="#zoomCardMembership" onClick={(e) => popupOpen(e.target)}>
                      <i className="ico barcode-w" pop-target="#zoomCardMembership">
                        <span>바코드</span>
                      </i>
                    </button>
                  </div>
                </div>
                <ul className="data-list">
                  <li className="en">{axioData?.res2_data?.birthday.replace(/(.{4})/, "$1-").replace(/(.{7})/, "$1-")}</li>
                  <li className="en">{axioData?.res2_data?.email}</li>
                </ul>
              </div>

              <div className="user-state-wrap">
                <ul className="data-list col-3">
                  <li>
                    <Link to="/mypage/stamp" className="item my-state">
                      <div className="img-wrap">
                        <i className="ico stamp-c">
                          <span>보유 스탬프 수 카드</span>
                        </i>
                      </div>
                      <div className="data-wrap">
                        <p className="title">보유 스탬프 수</p>
                        <p className="state">
                          {axioData?.res1_data?.user?.stamp_card?.complete_count} <em>/ 12</em>
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <div className="item my-state">
                      <div className="img-wrap">
                        <i className="ico calendar-c">
                          <span>출석체크</span>
                        </i>
                      </div>
                      <div className="data-wrap">
                        <p className="title">출석체크</p>
                        <p className="state">
                          8 <em>/ 30</em>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/mypage/coupon" className="item my-state">
                      <div className="img-wrap">
                        <i className="ico coupon-c">
                          <span>쿠폰</span>
                        </i>
                      </div>
                      <div className="data-wrap">
                        <p className="title">쿠폰</p>
                        <p className="state">
                          <span className="new">3</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

              <ul className="my-gnb-list">
                <li>
                  <Link to="/mypage/orderRecipt">주문 내역</Link>
                </li>
                <li>
                  <Link to="#">즐겨 찾는 매장 관리</Link>
                </li>
                <li>
                  <Link to="#">즐겨 찾는 메뉴 관리</Link>
                </li>
                <li>
                  <a className="open-pop" data-href="#popupExitJoin" onClick={(e) => popupOpen(e.target)}>
                    로그아웃
                  </a>
                </li>
              </ul>
            </div>{" "}
            {/* // #content */}
          </div>{" "}
          {/* // #container */}
        </div>{" "}
        <Popup_logout />
        {/* // #wrap */}
        {/* 멤버쉽 카드 확대 팝업 */}
        <div id="zoomCardMembership" className="overlay zoom-card">
          <div className="popup">
            <div className="popup-header">
              <h2 className="title">
                <span className="blind">카드 확대</span>
              </h2>
            </div>
            <div className="popup-body">
              <div className="item card membership">
                <div className="card-wrap">
                  <div>
                    <p className="grade en">PLATINUM</p>
                    <p className="sort en">
                      DAL.KOMM
                      <br />
                      MEMBERSHIP CARD
                    </p>
                  </div>
                </div>
                <div className="barcode-wrap">
                  <div>
                    <div className="barcode">
                      <div className="img-wrap">
                        <img src="../@resource/images/com/barcode.svg" alt="바코드" />
                      </div>
                      <p className="num">1309675152301202</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // 멤버쉽 카드 확대 팝업 */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
