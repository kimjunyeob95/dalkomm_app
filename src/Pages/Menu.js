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
import { contGap, popupOpen } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM, SERVER_DALKOMM_SUGAR } from "Config/Server";
import { checkMobile, fadeOut, fn_memberName } from "Config/GlobalJs";

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
          axios.post(`${SERVER_DALKOMM_SUGAR}/api/getNew`),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/my_account/user_info`, body, header_config),
          axios.post(`${SERVER_DALKOMM}/app/api/v2/membership`, body, header_config),
        ])
        .then(
          axios.spread((res1, res2, res3) => {
            let newFlag = res1.data;
            let res2_data = res2.data.data;
            let res3_data = res3.data.data;
            setData((origin) => {
              return {
                ...origin,
                newFlag,
                res2_data,
                res3_data,
              };
            });
          })
        );
    } else if (!state.loginFlag && state.auth) {
      //비로그인시
      axios.all([axios.post(`${SERVER_DALKOMM_SUGAR}/api/getNew`)]).then(
        axios.spread((res1, res2) => {
          let newFlag = res1.data;
          setData((origin) => {
            return {
              ...origin,
              newFlag,
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
    fadeOut();
  }, [axioData]);

  const handleCall = (number) => {
    let data = { phoneNum: number };
    data = JSON.stringify(data);
    try {
      if (checkMobile() === "android") {
        window.android.fn_directCall(data);
      } else if (checkMobile() === "ios") {
        window.webkit.messageHandlers.fn_directCall.postMessage(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <Nav order={5} />

            <div id="content" className="app-menu fade-in">
              <div className="top-header">
                <div className="w-inner">
                  <h1 className="logo">
                    <span className="blind">Dal.Komm</span>
                  </h1>
                </div>
              </div>
              {/* {state?.loginFlag && (
                <div className="item my-info">
                  <div className="user-wrap flex-center">
                    <p className="user">
                      <span className="fc-orange">{decodeURI(axioData?.res2_data?.name)}</span> 고객님
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
                </div>
              )} */}

              <ul className="gnb-list">
                <li>
                  <ul>
                    <li className={`${axioData?.newFlag?.storyNew === "TRUE" && "active"}`}>
                      {" "}
                      {/* [D] 활성화 콘텐츠 메뉴 .new */}
                      <Link to="/story/list" className="item depth-menu">
                        <i className="ico menu-story"></i>
                        <span>달콤스토리</span>
                        {/* {axioData?.newFlag?.storyNew === "TRUE" && <i className="ico new">N</i>} */}
                        {/* [D] 활성화 콘텐츠 메뉴일시 노출*/}
                      </Link>
                    </li>
                    {/* [D] 211105 마크업 추가*/}
                    <li>
                      <Link to="/order/menuSearch/0" className="item depth-menu">
                        <i className="ico order"></i>
                        <span>달콤 메뉴</span>
                      </Link>
                    </li>
                    {/* // [D] 211105 마크업 추가*/}
                    {state?.loginFlag && (
                      <li>
                        <Link to="/order/storeSearch" className="item depth-menu">
                          <i className="ico menu-store"></i>
                          <span>매장찾기</span>
                        </Link>
                      </li>
                    )}
                    <li className={`${axioData?.newFlag?.noticeNew === "TRUE" && "active"}`}>
                      {" "}
                      {/* [D] 활성화 콘텐츠 메뉴 .new */}
                      <Link to="/support/notice/list" className="item depth-menu">
                        <i className="ico menu-notice"></i>
                        <span>달콤소식</span>
                        {/* {axioData?.newFlag?.noticeNew === "TRUE" && <i className="ico new">N</i>} */}
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
                      <a onClick={() => handleOutLink()} className="item depth-menu outLink">
                        <i className="ico menu-website"></i>
                        <span>달콤 웹사이트</span>
                      </a>
                    </li>
                    {state?.loginFlag && (
                      <li>
                        <Link to="/mypage/option" className="item depth-menu">
                          <i className="ico menu-set"></i>
                          <span>앱 환경설정</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
                <li>
                  <ul>
                    <li>
                      <Link to="/support/company" className="item depth-menu">
                        <i className="ico menu-business"></i>
                        <span>사업자정보</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/support/termList" className="item depth-menu">
                        <i className="ico menu-term"></i>
                        <span>이용약관</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/support/policy" className="item depth-menu">
                        <i className="ico menu-privacy"></i>
                        <span>개인정보처리방침</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li>
                      <Link to="/support/customerService" className="item depth-menu">
                        <i className="ico service-center"></i>
                        <span>고객센터</span>
                      </Link>
                      {/* <ul className="data-list service-list">
                        <li>
                          <div className="item contact">
                            <i className="ico tel-g">
                              <span>전화번호</span>
                            </i>

                            <span className="num noDrag">1661-1399</span>
                          </div>
                        </li>
                        <li>
                          <div className="item contact">
                            <i className="ico mail-g">
                              <span>메일</span>
                            </i>

                            <span className="num">
                              <a href="mailto:dalkomm_cs@dalkomm.com">dalkomm_cs@dalkomm.com </a>
                            </span>
                          </div>
                        </li>
                      </ul> */}
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
                      <p className="grade en">{fn_memberName(axioData?.res3_data?.membership_level)}</p>
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
            <div className="top-header">
              <div className="w-inner">
                <h1 className="logo">
                  <span className="blind">Dal.Komm</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}
