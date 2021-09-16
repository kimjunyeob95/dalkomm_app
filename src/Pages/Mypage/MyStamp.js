import React, { useEffect } from "react";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";

import { contGap } from "Jquery/Jquery";

export default function MyStamp() {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    contGap();
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="나의 적립 내역" type="flexCenter" />

          <div id="content" className="mypage stamp">
            <div className="user-stamp-wrap">
              <div className="flex-both">
                <div className="title-wrap flex-center">
                  <i className="ico stamp-s"></i>
                  <h3 className="h3">적립 스탬프</h3>
                </div>
                <div className="count-wrap">
                  <strong className="count">8</strong> / 12
                </div>
              </div>

              <ol className="data-list flex-list">
                <li>
                  {/* [D]: 스탬프 활성화: save 클래스 추가 */}
                  <div className="item stamp save">
                    <span className="num en">1</span>
                  </div>
                </li>
                <li>
                  <div className="item stamp">
                    <span className="num en">2</span>
                  </div>
                </li>
                <li>
                  <div className="item stamp">
                    <span className="num en">3</span>
                  </div>
                </li>
                <li>
                  <div className="item stamp">
                    <span className="num en">4</span>
                  </div>
                </li>
                <li>
                  <div className="item stamp">
                    <span className="num en">5</span>
                  </div>
                </li>
                <li>
                  <div className="item stamp">
                    <span className="num en">6</span>
                  </div>
                </li>
                <li>
                  <div className="item stamp">
                    <span className="num en">7</span>
                  </div>
                </li>
                <li>
                  <div className="item stamp">
                    <span className="num en">8</span>
                  </div>
                </li>
                <li>
                  <div className="item stamp">
                    <span className="num en">9</span>
                  </div>
                </li>
                <li>
                  <div className="item stamp finish">
                    <span className="num en">10</span>
                  </div>
                </li>
                <li>
                  <div className="item stamp">
                    <span className="num en">11</span>
                  </div>
                </li>
                <li>
                  <div className="item stamp finish">
                    <span className="num en">12</span>
                    <p className="speech-bubble small en">FREE!</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="w-inner">
              <div className="btn-area">
                <button className="btn light medium full">
                  멤버십 등급 소개
                </button>
              </div>

              <div className="item attention">
                <dl>
                  <dt className="title">
                    <i className="ico alert"></i>멤버십 적립 유의사항
                  </dt>
                  <dd className="text">
                    <ul className="attention-list">
                      <li>
                        적립카드 스탬프는 제조 음료에 한하여 1잔당 스탬프 1회를
                        찍어 드립니다.
                        <br />
                        SET, MD, 베이커리, 키프티콘, 카카오 선물하기, 할인 또는
                        쿠폰 사용시 적립 제외
                      </li>
                      <li>
                        총 10회 적립 시 테이블오더 전용 무료 음료가 제공됩니다.
                      </li>
                      <li>스탬프의 유효기간은 발급일로 부터 1년입니다.</li>
                      <li>스탬프 적립에는 다소 시간이 걸릴 수 있습니다.</li>
                      <li>
                        무료 음료 쿠폰의 유효기간은 발급일로부터 30일입니다.
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
