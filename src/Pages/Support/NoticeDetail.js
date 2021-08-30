import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

export default function NoticeDetail() {
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

          <div id="content" className="notice detail">
            <section className="section">
              <div className="item notice">
                <span className="info en">2021-07-10</span>
                <div className="title-area">
                  <h3>달콤 & 비트 VIP등급 혜택 변경</h3>
                </div>
              </div>
              <div className="item board">
                <p>
                  안녕하세요 달콤 입니다.
                  <br />
                  달콤에서는 고객 편의 및 혜택을 부가적으로 제공하고, 기존 분리되어있던 매장 스탬프 및 쿠폰을 아래와 같이 통합 변경 하고자 합니다.
                </p>

                <p>
                  <strong>기존</strong>
                  <br />
                  스탬프 : 12개 적립 시 적립한 매장에서 사용 가능한
                  <br />
                  쿠폰 발급
                </p>

                <p>
                  <strong>변경</strong>
                  <br />
                  스탬프 12개 적립 시, 전 매장에서 사용 가능한 쿠폰 발급
                  <br />
                  (단, 특수 매장 제외)
                </p>

                <p>
                  기존 보유 중인 스탬프는 매장 구분 없이 모두 통합되어
                  <br />
                  표시되며, 발급되는 무료 음료 쿠폰 역시 매장 통합하여
                  <br />
                  사용 가능합니다.
                </p>

                <p>해당 업데이트는 다음 주 중 업데이트 될 예정입니다.</p>
              </div>
            </section>

            {/* 목록으로 버튼 영역 */}
            <div className="fixed-con active">
              <div className="btn-area">
                <Link to="/support/notice/list" className="btn full x-large bdr">
                  <strong>목록으로</strong>
                </Link>
              </div>
            </div>
            {/* // 목록으로 버튼 영역 */}
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
