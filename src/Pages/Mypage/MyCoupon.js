import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";

import { accordion, tabLink, contGap } from "Jquery/Jquery";

export default function MyCoupon() {
  const fn_submit = () => {
    alert("쿠폰이 등록되었습니다.");
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    contGap();
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="나의 쿠폰 리스트" location="/mypage/gift" type="flexCenter" icon="gift" />

          <div id="content" className="mypage coupon">
            <section className="section">
              <ul className="tabs">
                <li className="current">
                  <Link to="#" data-href="#availCoupon" onClick={(e) => tabLink(e)}>
                    사용가능 쿠폰
                  </Link>
                </li>
                <li>
                  <Link to="#" data-href="#expiredCoupon" onClick={(e) => tabLink(e)}>
                    지난 쿠폰
                  </Link>
                </li>
              </ul>
              <div id="availCoupon" className="tab-content active">
                <ul className="coupon-list data-list accordion">
                  <li>
                    <div className="item coupon js-accordion-switche" onClick={(e) => accordion(e.target, 0)}>
                      <div className="data-wrap">
                        <p className="day num">D-3</p>
                        <p className="title">FREE 음료 쿠폰</p>
                      </div>
                      <div className="ico-wrap flex-center">
                        <i className="ico accordion-arr"></i>
                      </div>
                    </div>
                    <div className="item attention js-accordion-content">
                      <dl>
                        <dt className="title">
                          <i className="ico alert"></i>쿠폰 유의사항
                        </dt>
                        <dd className="text">
                          <ul className="attention-list">
                            <li>달콤커피 앱 내 테이블오더로만 이용가능</li>
                            <li>제조음료만 가능 (베이커리 이용 불가)</li>
                            <li>다른 혜택과 중복사용 불가</li>
                            <li>세트, MD, 베이커리, 할인 & 프로모션 메뉴 할인 제외</li>
                            <li>적립카드 스탬프 중복 적립 불가</li>
                          </ul>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li>
                    <div className="item coupon js-accordion-switche" onClick={(e) => accordion(e.target, 0)}>
                      <div className="data-wrap">
                        <p className="day num">~ 21.07.28</p>
                        <p className="title">FREE 음료 쿠폰</p>
                      </div>
                      <div className="ico-wrap flex-center">
                        <i className="ico accordion-arr"></i>
                      </div>
                    </div>
                    <div className="item attention js-accordion-content">
                      <dl>
                        <dt className="title">
                          <i className="ico alert"></i>쿠폰 유의사항
                        </dt>
                        <dd className="text">
                          <ul className="attention-list">
                            <li>달콤커피 앱 내 테이블오더로만 이용가능</li>
                            <li>제조음료만 가능 (베이커리 이용 불가)</li>
                            <li>다른 혜택과 중복사용 불가</li>
                            <li>세트, MD, 베이커리, 할인 & 프로모션 메뉴 할인 제외</li>
                            <li>적립카드 스탬프 중복 적립 불가</li>
                          </ul>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li>
                    <div className="item coupon js-accordion-switche" onClick={(e) => accordion(e.target, 0)}>
                      <div className="data-wrap">
                        <p className="day num">~ 21.08.16</p>
                        <p className="title">FREE 음료 쿠폰</p>
                      </div>
                      <div className="ico-wrap flex-center">
                        <i className="ico accordion-arr"></i>
                      </div>
                    </div>
                    <div className="item attention js-accordion-content">
                      <dl>
                        <dt className="title">
                          <i className="ico alert"></i>쿠폰 유의사항
                        </dt>
                        <dd className="text">
                          <ul className="attention-list">
                            <li>달콤커피 앱 내 테이블오더로만 이용가능</li>
                            <li>제조음료만 가능 (베이커리 이용 불가)</li>
                            <li>다른 혜택과 중복사용 불가</li>
                            <li>세트, MD, 베이커리, 할인 & 프로모션 메뉴 할인 제외</li>
                            <li>적립카드 스탬프 중복 적립 불가</li>
                          </ul>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </div>
              <div id="expiredCoupon" className="tab-content">
                <ul className="coupon-list data-list accordion">
                  <li>
                    <div className="item coupon js-accordion-switche" onClick={(e) => accordion(e.target, 0)}>
                      <div className="data-wrap">
                        <p className="day expire">기간만료</p> {/* [D] .day.expire : 기간 만료 */}
                        <p className="title">FREE 음료 쿠폰</p>
                      </div>
                      <div className="ico-wrap flex-center">
                        <i className="ico accordion-arr"></i>
                      </div>
                    </div>
                    <div className="item attention js-accordion-content">
                      <dl>
                        <dt className="title">
                          <i className="ico alert"></i>쿠폰 유의사항
                        </dt>
                        <dd className="text">
                          <ul className="attention-list">
                            <li>달콤커피 앱 내 테이블오더로만 이용가능</li>
                            <li>제조음료만 가능 (베이커리 이용 불가)</li>
                            <li>다른 혜택과 중복사용 불가</li>
                            <li>세트, MD, 베이커리, 할인 & 프로모션 메뉴 할인 제외</li>
                            <li>적립카드 스탬프 중복 적립 불가</li>
                          </ul>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li>
                    <div className="item coupon js-accordion-switche" onClick={(e) => accordion(e.target, 0)}>
                      <div className="data-wrap">
                        <p className="day expire">기간만료</p>
                        <p className="title">FREE 음료 쿠폰</p>
                      </div>
                      <div className="ico-wrap flex-center">
                        <i className="ico accordion-arr"></i>
                      </div>
                    </div>
                    <div className="item attention js-accordion-content">
                      <dl>
                        <dt className="title">
                          <i className="ico alert"></i>쿠폰 유의사항
                        </dt>
                        <dd className="text">
                          <ul className="attention-list">
                            <li>달콤커피 앱 내 테이블오더로만 이용가능</li>
                            <li>제조음료만 가능 (베이커리 이용 불가)</li>
                            <li>다른 혜택과 중복사용 불가</li>
                            <li>세트, MD, 베이커리, 할인 & 프로모션 메뉴 할인 제외</li>
                            <li>적립카드 스탬프 중복 적립 불가</li>
                          </ul>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li>
                    <div className="item coupon js-accordion-switche" onClick={(e) => accordion(e.target, 0)}>
                      <div className="data-wrap">
                        <p className="day expire">기간만료</p>
                        <p className="title">FREE 음료 쿠폰</p>
                      </div>
                      <div className="ico-wrap flex-center">
                        <i className="ico accordion-arr"></i>
                      </div>
                    </div>
                    <div className="item attention js-accordion-content">
                      <dl>
                        <dt className="title">
                          <i className="ico alert"></i>쿠폰 유의사항
                        </dt>
                        <dd className="text">
                          <ul className="attention-list">
                            <li>달콤커피 앱 내 테이블오더로만 이용가능</li>
                            <li>제조음료만 가능 (베이커리 이용 불가)</li>
                            <li>다른 혜택과 중복사용 불가</li>
                            <li>세트, MD, 베이커리, 할인 & 프로모션 메뉴 할인 제외</li>
                            <li>적립카드 스탬프 중복 적립 불가</li>
                          </ul>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* 신규 쿠폰 추가 버튼 영역 */}
            <div className="fixed-con active">
              <div className="popup">
                <div className="popup-wrap">
                  <div className="btn-area">
                    <button type="button" className="btn full x-large dark open-pop" pop-target="#popupRegisterCoupon">
                      <strong>신규 쿠폰 추가</strong>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* // 신규 쿠폰 추가 버튼 영역 */}

            {/* 쿠폰 등록하기 팝업 */}
            <div id="popupRegisterCoupon" className="fixed-con layer-pop dimm">
              <div className="popup">
                <div className="popup-wrap">
                  <button type="button" className="btn btn-close">
                    <i className="ico close">
                      <span>close</span>
                    </i>
                  </button>
                  <div className="popup-body">
                    <form className="form">
                      <fieldset className="fieldset">
                        <legend className="blind">쿠폰 등록</legend>
                        <div className="w-inner">
                          <h2 className="h2">보유하신 쿠폰 번호를 입력해 주세요.</h2>
                          <div className="field">
                            <label className="blind" htmlFor="couponNum">
                              쿠폰 번호 입력
                            </label>
                            <div className="insert">
                              <input type="text" className="input-text medium" id="couponNum" placeholder="쿠폰 번호를 입력해 주세요."></input>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <div className="btn-area">
                        <button type="button" className="btn full x-large dark" onClick={() => fn_submit()}>
                          <strong>쿠폰 등록하기</strong>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* // 쿠폰 등록하기 팝업 */}
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
