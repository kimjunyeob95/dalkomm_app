import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

export default function NoticeList() {
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    contGap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="공지 사항" />

          <div id="content" className="notice list">
            <section className="section">
              <ul className="data-list">
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">달콤 & 비트 VIP등급 혜택 변경</h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">달콤 매장 스탬프 쿠폰 통합 진행</h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">
                        [더보이즈 트레저카드를 완성하라!] 이벤트 당첨자 발표[더보이즈 트레저카드를 완성하라!] 이벤트 당첨자 발표
                      </h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">달콤 & 비트 VIP등급 혜택 변경</h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">달콤 매장 스탬프 쿠폰 통합 진행</h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">
                        [더보이즈 트레저카드를 완성하라!] 이벤트 당첨자 발표[더보이즈 트레저카드를 완성하라!] 이벤트 당첨자 발표
                      </h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">달콤 & 비트 VIP등급 혜택 변경</h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">달콤 매장 스탬프 쿠폰 통합 진행</h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">
                        [더보이즈 트레저카드를 완성하라!] 이벤트 당첨자 발표[더보이즈 트레저카드를 완성하라!] 이벤트 당첨자 발표
                      </h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">달콤 & 비트 VIP등급 혜택 변경</h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">달콤 매장 스탬프 쿠폰 통합 진행</h3>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="item notice">
                    <span className="info en">2021-07-10</span>
                    <Link to="/support/notice/detail/1" className="title-area">
                      <h3 className="ellipsis line2">
                        [더보이즈 트레저카드를 완성하라!] 이벤트 당첨자 발표[더보이즈 트레저카드를 완성하라!] 이벤트 당첨자 발표
                      </h3>
                    </Link>
                  </div>
                </li>
              </ul>
            </section>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
