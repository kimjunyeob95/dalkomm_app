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
          <HeaderSub title="쿠폰 선물하기" location="/mypage/gift" type="flexCenter" icon="gift" />

          {/* <nav id="menu" className="nav">
				<Link to="MA001.html" className="btn">
					<div className="img-wrap">
						<svg viewBox="0 0 30 30">
							<g>
								<path fill="none" stroke="#000" stroke-miterlimit="10" className="path-stroke"
									d="M123.929 151.773l-10.075 8.185v12.151H134v-12.151z"
									transform="translate(4.925 5.356) translate(-113.853 -151.773)" />
								<path d="M0 0H1.09V6.094H0z" className="path-fill"
									transform="translate(4.925 5.356) translate(9.447 14.242)" />
							</g>
						</svg>
					</div>
					<span className="name en">HOME</span>
				</Link>
				<Link to="CA001.html" className="btn">
					<div className="img-wrap">
						<svg viewBox="0 0 30 30">
							<g transform="translate(4.707 8.22)">
								<g id="그룹_10">
									<path id="사각형_21" fill="none" stroke="#000" stroke-miterlimit="10"
										className="path-stroke" d="M0 0H20.586V14.594H0z" />
									<path id="선_3" fill="none" stroke="#000" stroke-miterlimit="10" className="path-stroke"
										d="M0 0L3.615 0" transform="translate(2.967 3.571)" />
								</g>
							</g>
						</svg>
					</div>
					<span className="name en">PAY</span>
				</Link>
				<Link to="TO001.html" className="btn">
					<div className="img-wrap">
						<svg viewBox="0 0 30 30">
							<g>
								<path fill="#fff" stroke="#000" stroke-miterlimit="10"
									d="M432.186 186.516h2.255a1.877 1.877 0 0 0 1.877-1.877v-3.856a1.877 1.877 0 0 0-1.877-1.877h-2.255"
									transform="translate(0.5 0.5) translate(3.933 8.22) translate(-413.168 -176.682)" />
								<path fill="#ff592e"
									d="M177.215 741.58h19.323s1.279 10.174-7.815 11.686-11.651-5.637-11.509-8.524"
									transform="translate(0.5 0.5) translate(3.933 8.22) translate(-176.933 -738.22)" />
								<path fill="none" stroke="#000" stroke-miterlimit="10"
									d="M330.758 167.045v7.171c0 4.866 4.33 8.363 9.671 8.363s9.671-3.5 9.671-8.363v-7.171z"
									transform="translate(0.5 0.5) translate(3.933 8.22) translate(-330.758 -167.045)" />
							</g>
						</svg>
					</div>
					<span className="name en">ORDER</span>
				</Link>
				<Link to="ME001.html" className="btn active">
					<div className="img-wrap">
						<svg viewBox="0 0 30 30">
							<g transform="translate(4.445 4.589)">
								<circle cx="10.555" cy="10.555" r="10.555" fill="none" stroke="#000"
									stroke-miterlimit="10" className="path-stroke" />
								<g transform="translate(6.919 6.254)">
									<path d="M838.286 219.463a4.767 4.767 0 0 1-6.742 0" fill="none" stroke="#000"
										stroke-miterlimit="10" className="path-stroke"
										transform="translate(-831.28 -212.257)" />
									<path d="M0 0L0 2.191" fill="none" stroke="#000" stroke-miterlimit="10"
										className="path-stroke" transform="translate(0 0.114)" />
									<path d="M0 0L0 2.191" fill="none" stroke="#000" stroke-miterlimit="10"
										className="path-stroke" transform="translate(7.271 0.114)" />
									<path d="M842.755 181.032v4.676h-1.562" fill="none" stroke="#000"
										stroke-miterlimit="10" className="path-stroke"
										transform="translate(-839.12 -181.032)" />
								</g>
							</g>
						</svg>
					</div>
					<span className="name en">MY</span>
				</Link>
				<Link to="AP001.html" className="btn">
					<div className="img-wrap">
						<svg viewBox="0 0 30 30">
							<g transform="translate(4.754 7.637)">
								<path d="M0 0L20.492 0" fill="#fff" stroke="#000" stroke-miterlimit="10"
									className="path-stroke" transform="translate(0 -0.637)" />
								<path d="M0 0L20.492 0" fill="#fff" stroke="#000" stroke-miterlimit="10"
									className="path-stroke" transform="translate(0 7.363)" />
								<path d="M0 0L20.492 0" fill="#fff" stroke="#000" stroke-miterlimit="10"
									className="path-stroke" transform="translate(0 15.363)" />
							</g>
						</svg>
					</div>
					<span className="name en">MENU</span>
				</Link>
			</nav> */}

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
