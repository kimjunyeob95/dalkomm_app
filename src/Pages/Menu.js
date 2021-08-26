import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

export default function Menu() {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    contGap();
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          {/* <header id="header" className="header">
                <div className="w-inner flex-both">
                    <h1>
                        <Link to="MA001.html" className="logo">
                            <span className="blind">Dal.komm</span>
                        </Link>
                    </h1>
                    <button type="button" className="open-search">
                        <i className="ico search">
                            <span>검색하기</span>
                        </i>
                    </button>
                </div>
            </header> */}

          <Nav order={5} />

          <div id="content" className="app-menu">
            <div className="item my-info">
              <div className="user-wrap flex-center">
                <p className="user">
                  <span className="fc-orange">서지혜</span> 고객님
                </p>

                <Link to="#" className="btn barcode">
                  <i className="ico barcode">
                    <span>바코드</span>
                  </i>
                </Link>
              </div>
              <div className="btn-area flex-center">
                <Link to="#" className="btn">
                  <i className="ico giftcard">
                    <span>바코드</span>
                  </i>
                </Link>
                <Link to="#" className="btn">
                  <i className="ico stamp">
                    <span>바코드</span>
                  </i>
                </Link>
              </div>
            </div>
            <ul className="gnb-list">
              <li>
                <ul>
                  <li>
                    <Link to="ME004.html" className="item depth-menu">
                      <i className="ico menu-order"></i>
                      <span>주문내역</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="TO001.html" className="item depth-menu">
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
                    <Link to="NO003.html" className="item depth-menu">
                      <i className="ico menu-story"></i>
                      <span>달콤스토리</span>
                      <i className="ico new">N</i> {/* [D] 활성화 콘텐츠 메뉴일시 노출*/}
                    </Link>
                  </li>
                  <li className="new">
                    {" "}
                    {/* [D] 활성화 콘텐츠 메뉴 .new */}
                    <Link to="NO001.html" className="item depth-menu">
                      <i className="ico menu-notice"></i>
                      <span>공지사항</span>
                      <i className="ico new">N</i> {/* [D] 활성화 콘텐츠 메뉴일시 노출*/}
                    </Link>
                  </li>
                  <li>
                    <Link to="ETC001.html" className="item depth-menu">
                      <i className="ico menu-faq"></i>
                      <span>FAQ</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <Link to="ME004.html" className="item depth-menu">
                      <i className="ico menu-my"></i>
                      <span>내 정보 수정</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="ME004.html" target="_blank" className="item depth-menu">
                      <i className="ico menu-website"></i>
                      <span>달콤 웹사이트</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="ME004.html" className="item depth-menu">
                      <i className="ico menu-set"></i>
                      <span>앱 환경설정</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <Link to="#;" className="item depth-menu">
                      <i className="ico menu-business"></i>
                      <span>사업자정보</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="ETC002.html" className="item depth-menu">
                      <i className="ico menu-term"></i>
                      <span>이용약관</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="ETC004.html" className="item depth-menu">
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
    </React.Fragment>
  );
}
