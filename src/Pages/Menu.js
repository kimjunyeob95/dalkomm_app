/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, fadeInOut, popupOpen } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";
import { checkMobile } from "Config/GlobalJs";

export default function Menu() {
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
    if (state?.loginFlag && state.accessToken) {
      //로그인시
      axios
        .all([
          axios.get(`${SERVER_DALKOMM}/app/api/notice/is-new`, {
            headers: { Authorization: state?.auth },
          }),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/my_account/user_info`, body, header_config),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/membership`, body, header_config),
        ])
        .then(
          axios.spread((res1, res2, res3) => {
            let res1_data = res1.data.data;
            let res2_data = res2.data.data;
            let res3_data = res3.data.data;
            setData((origin) => {
              return {
                ...origin,
                res1_data,
                res2_data,
                res3_data,
              };
            });
          })
        );
    } else if (!state.loginFlag && state.auth) {
      //비로그인시
      axios
        .all([
          axios.get(`${SERVER_DALKOMM}/app/api/notice/is-new`, {
            headers: { Authorization: state?.auth },
          }),
        ])
        .then(
          axios.spread((res1, res2) => {
            let res1_data = res1.data.data;

            setData((origin) => {
              return {
                ...origin,
                res1_data,
              };
            });
          })
        );
    }
  }, [state?.loginFlag]);

  const handleOutLink = () => {
    let linkData = { data: "http://www.dalkomm.com/" };
    linkData = JSON.stringify(linkData);
    try {
      if (checkMobile() === "android") {
        window.android.fn_callUrl(linkData);
      } else if (checkMobile() === "ios") {
        window.webkit.messageHandlers.fn_callUrl.postMessage(linkData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    contGap();
  }, [axioData]);
  if (axioData) {
    // fadeInOut();
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <Nav order={5} />

            <div id="content" className="app-menu">
              {state?.loginFlag && (
                <div className="item my-info">
                  <div className="user-wrap flex-center">
                    <p className="user">
                      <span className="fc-orange">{axioData?.res2_data?.sub_user_list[0]?.sub_user_name}</span> 고객님
                    </p>

                    <button
                      type="button"
                      className="btn barcode open-pop"
                      pop-target="#zoomCardMembership"
                      onClick={(e) => popupOpen(e.currentTarget, axioData?.res3_data?.stamp_card_number)}
                    >
                      <i className="ico barcode" pop-target="#zoomCardMembership">
                        <span>바코드</span>
                      </i>
                    </button>
                  </div>
                  <div className="btn-area flex-center">
                    <Link to="/pay" className="btn">
                      <i className="ico giftcard">
                        <span>바코드</span>
                      </i>
                    </Link>
                    <Link to="/mypage/stamp" className="btn">
                      <i className="ico stamp">
                        <span>바코드</span>
                      </i>
                    </Link>
                  </div>
                </div>
              )}

              <ul className="gnb-list">
                <li>
                  <ul>
                    <li>
                      <Link to="/mypage/orderRecipt" className="item depth-menu">
                        <i className="ico menu-order"></i>
                        <span>주문내역</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/order/storeSearch" className="item depth-menu">
                        <i className="ico menu-store"></i>
                        <span>매장찾기</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li className="new">
                      {" "}
                      {/* [D] 활성화 콘텐츠 메뉴 .new */}
                      <Link to="/story/list" className="item depth-menu">
                        <i className="ico menu-story"></i>
                        <span>달콤스토리</span>
                        <i className="ico new">N</i> {/* [D] 활성화 콘텐츠 메뉴일시 노출*/}
                      </Link>
                    </li>
                    <li className="new">
                      {" "}
                      {/* [D] 활성화 콘텐츠 메뉴 .new */}
                      <Link to="/support/notice/list" className="item depth-menu">
                        <i className="ico menu-notice"></i>
                        <span>공지사항</span>
                        {state?.loginFlag && axioData?.is_new && <i className="ico new">N</i>}
                      </Link>
                    </li>
                    <li>
                      <Link to="/support/faq" className="item depth-menu">
                        <i className="ico menu-faq"></i>
                        <span>FAQ</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li>
                      <Link to="/mypage/modify" className="item depth-menu">
                        <i className="ico menu-my"></i>
                        <span>내 정보 수정</span>
                      </Link>
                    </li>
                    <li>
                      <a onClick={() => handleOutLink()} className="item depth-menu outLink">
                        <i className="ico menu-website"></i>
                        <span>달콤 웹사이트</span>
                      </a>
                    </li>
                    <li>
                      <Link to="/mypage/option" className="item depth-menu">
                        <i className="ico menu-set"></i>
                        <span>앱 환경설정</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li>
                      <Link to="#" className="item depth-menu">
                        <i className="ico menu-business"></i>
                        <span>사업자정보</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="item depth-menu">
                        <i className="ico menu-term"></i>
                        <span>이용약관</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="item depth-menu">
                        <i className="ico menu-privacy"></i>
                        <span>개인정보처리방침</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}
        {/* 멤버쉽 카드 확대 팝업 */}
        {state?.loginFlag && (
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
                      <p className="grade en">{axioData?.res3_data?.membership_name}</p>
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
                          <img src="/@resource/images/com/barcode.svg" alt="바코드" />
                        </div> */}
                        <p className="num">{axioData?.res3_data?.stamp_card_number}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* // 멤버쉽 카드 확대 팝업 */}
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <Nav order={5} />
          </div>
        </div>
      </React.Fragment>
    );
}
