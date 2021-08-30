import React, { useEffect } from "react";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap, accordion } from "Jquery/Jquery";

export default function Faq() {
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
          <HeaderSub title="FAQ" />

          <div id="content" className="faq">
            <section className="section">
              <div className="faq-accordion accordion">
                <div className="js-accordion-switche" onClick={(e) => accordion(e.target)}>
                  <div className="flex-both">
                    <h2 className="h2">테이블 오더</h2>
                    <i className="ico accordion-arr"></i>
                  </div>
                </div>
                <div className="js-accordion-content">
                  <ul className="faq-list">
                    <li>
                      <div className="toggle-switch flex-start">
                        <strong className="type">Q</strong>
                        <h3 className="h3">방금 주문한 테이블오더 주문을 취소하고 싶어요.</h3>
                      </div>
                      <div className="toggle-cont">
                        <div className="flex-start">
                          <strong className="type">A</strong>
                          <div className="detail">
                            휴게소/쇼핑몰 입점매장 등 특수매장은 매장 사정으로 인해 테이블오더가 불가능합니다.
                            <br />
                            자세한 테이블오더 불가 매장은 공지사항을 확인해주세요.
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="toggle-switch flex-start">
                        <strong className="type">Q</strong>
                        <h3 className="h3">음료의 옵션을 더 다양하게 조절하고 싶어요.</h3>
                      </div>
                      <div className="toggle-cont">
                        <div className="flex-start">
                          <strong className="type">A</strong>
                          <div className="detail">
                            휴게소/쇼핑몰 입점매장 등 특수매장은 매장 사정으로 인해 테이블오더가 불가능합니다.
                            <br />
                            자세한 테이블오더 불가 매장은 공지사항을 확인해주세요.
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="faq-accordion accordion">
                <div className="js-accordion-switche" onClick={(e) => accordion(e.target)}>
                  <div className="flex-both">
                    <h2 className="h2">충전카드</h2>
                    <i className="ico accordion-arr"></i>
                  </div>
                </div>
                <div className="js-accordion-content">
                  <ul className="faq-list">
                    <li>
                      <div className="toggle-switch flex-start">
                        <strong className="type">Q</strong>
                        <h3 className="h3">전액을 환불 받고 싶어요.</h3>
                      </div>
                      <div className="toggle-cont">
                        <div className="flex-start">
                          <strong className="type">A</strong>
                          <div className="detail">콘텐츠</div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="toggle-switch flex-start">
                        <strong className="type">Q</strong>
                        <h3 className="h3">충전카드를 선물 받았는데, 앱에 등록 할 수 있나요?</h3>
                      </div>
                      <div className="toggle-cont">
                        <div className="flex-start">
                          <strong className="type">A</strong>
                          <div className="detail">콘텐츠</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
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
}
