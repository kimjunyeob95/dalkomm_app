/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, popupOpen } from "Jquery/Jquery";
import Popup_logout from "Components/Popup/Popup_logout";
import { fadeOut, fn_memberName } from "Config/GlobalJs";
import Loading from "Components/Loading";

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
        axios.post(`${SERVER_DALKOMM}/app/api/account/simple/profile`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/coupon/list`, body, header_config),
        axios.post(`${SERVER_DALKOMM}/app/api/v2/membership`, body, header_config),
      ])
      .then(
        axios.spread((res1, res2, res3, res4) => {
          let res1_data = res1.data.data;
          let res2_data = res2.data.data;
          let res3_data = res3.data.data;
          let res4_data = res4.data.data;
          setData((origin) => {
            return {
              ...origin,
              res1_data,
              res2_data,
              res3_data,
              res4_data,
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
    // fadeInOut();
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header">
              <div className="btn-area flex-center">
                {/* [D] 211105 ????????? ?????? */}
                <button
                  type="button"
                  className="btn open-pop"
                  pop-target="#zoomCardMembership"
                  onClick={(e) => popupOpen(e.target, axioData?.res4_data?.stamp_card_number)}
                >
                  <i className="ico barcode-scan" pop-target="#zoomCardMembership">
                    <span>????????? ??????</span>
                  </i>
                </button>

                <Link to="/pay?activeHtml=true" className="btn">
                  <i className="ico giftcard">
                    <span>???????????????</span>
                  </i>
                </Link>
                {/* <Link to="/mypage/stamp" className="btn">
                  <i className="ico stamp">
                    <span>???????????????</span>
                  </i>
                </Link>

                <Link to="/mypage/option" className="btn">
                  <i className="ico setting">
                    <span>????????????</span>
                  </i>
                </Link> */}
                {/* // [D] 211105 ????????? ?????? */}
              </div>
            </header>
            <Nav order={4} />
            <div id="content" className="mypage main fade-in">
              <div className="user-info-wrap">
                <div className="item my-info">
                  <p className="user">
                    <strong>{decodeURI(axioData?.res2_data?.name)}</strong> ?????????, ???????????????.
                  </p>
                </div>
                <ul className="data-list">
                  <li className="en">{axioData?.res2_data?.birthday?.replace(/(.{4})/, "$1-").replace(/(.{7})/, "$1-")}</li>
                  <li className="en">{axioData?.res2_data?.login_email}</li>
                </ul>
              </div>

              <div className="user-state-wrap">
                <ul className="data-list col-2">
                  <li className="trophy">
                    <dl className="item describe">
                      <dt className="title flex-list">
                        <span>????????? ??????</span>
                        <div className="guide-wrap">
                          <button type="button" className="btn help">
                            <i className="ico help"></i>
                          </button>
                          <p className="speech-bubble">
                            ?????? ?????? ????????? ?????? ???????????? ????????????,
                            <br />
                            ????????? ????????? ?????? ????????? ????????? ???????????????.
                          </p>
                        </div>
                      </dt>
                      <dd className="text">
                        <strong className="num">{axioData?.res1_data?.user?.current_point}</strong>
                        &nbsp;
                        <span>???</span>
                      </dd>
                    </dl>
                  </li>
                  <li className="grade">
                    <dl className="item describe">
                      <dt className="title flex-both">
                        ????????? ??????
                        <Link to="/mypage/membershipPolicy" className="btn bdr-r xx-small gray">
                          ????????????
                        </Link>
                      </dt>
                      <dd className="text">
                        <strong className="en">{fn_memberName(axioData?.res4_data?.membership_level)}</strong>
                      </dd>
                    </dl>
                  </li>
                </ul>
              </div>

              <ul className="my-gnb-list">
                <li>
                  <Link to="/mypage/orderRecipt">
                    <div className="title">
                      <i className="ico menu-order-l"></i>
                      <span>?????? ??????</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/mypage/stamp">
                    <div className="title">
                      <i className="ico stamp-m"></i>
                      <span>?????? ?????????</span>
                    </div>
                    <span className="stamp">
                      <strong className="save">{axioData?.res1_data?.user?.stamp_card?.point}</strong>
                      <em>/</em>
                      <strong>12</strong>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/mypage/membershipRecipt">
                    <div className="title">
                      <i className="ico trophy-l"></i>
                      <span>????????? ?????? ??????</span>
                    </div>
                  </Link>
                </li>
                <li className={axioData?.res3_data?.coupon_list?.length > 0 ? "active" : ""}>
                  <Link to="/mypage/coupon">
                    <div className="title">
                      <i className="ico coupon"></i>
                      <span>??????</span>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to="/mypage/modify">
                    <div className="title">
                      <i className="ico menu-my"></i>
                      <span>??? ?????? ??????</span>
                    </div>
                  </Link>
                </li>

                {/* <li>
						<a href="javascript:void(0);">
							<div className="title">
								<i className="ico calendar"></i>
								<span>????????????</span>
							</div>
						</a>
					</li> */}
                <li>
                  <a className="open-pop" data-href="#popupExitJoin" onClick={(e) => popupOpen(e.currentTarget)}>
                    <div className="title">
                      <i className="ico logout"></i>
                      <span>????????????</span>
                    </div>
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
        {/* ????????? ?????? ?????? ?????? */}
        <div id="zoomCardMembership" className="overlay zoom-card">
          <div className="popup">
            <div className="popup-header">
              <h2 className="title">
                <span className="blind">?????? ??????</span>
              </h2>
            </div>
            <div className="popup-body">
              <div className="item card membership">
                <div className="card-wrap">
                  <div>
                    <p className="grade en">{fn_memberName(axioData?.res4_data?.membership_level)}</p>
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
                      <div id="barcode" className="react-barcode"></div>
                      {/* <div className="img-wrap">
                        <img src="../@resource/images/com/barcode.svg" alt="?????????" />
                      </div> */}
                      <p className="num">{axioData?.res4_data?.stamp_card_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // ????????? ?????? ?????? ?????? */}
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <Loading />
            <Nav order={4} />
          </div>
        </div>
      </React.Fragment>
    );
}
