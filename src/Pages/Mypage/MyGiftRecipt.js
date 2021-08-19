import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";

import { tabLink, moveScrollTop, contGap } from "Jquery/Jquery";

export default function MyGiftRecipt() {
  useEffect(() => {
    contGap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="쿠폰 선물 내역" />

          {/* <nav id="menu" className="nav">
				<Link href="MA001.html" className="btn">
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
				<Link href="CA001.html" className="btn">
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
				<Link href="TO001.html" className="btn">
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
				<Link href="ME001.html" className="btn active">
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
				<Link href="AP001.html" className="btn">
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

          <div id="content" className="mypage history">
            <section className="section">
              <ul className="tabs">
                <li className="current">
                  <Link to="#" data-href="#receiveCoupon" onClick={(e) => tabLink(e)}>
                    받은 쿠폰
                  </Link>
                </li>
                <li>
                  <Link to="#" data-href="#sendCoupon" onClick={(e) => tabLink(e)}>
                    보낸 쿠폰
                  </Link>
                </li>
              </ul>

              <div id="receiveCoupon" className="tab-content active">
                <ol className="data-list">
                  <li>
                    <h3 className="history-header">2021.06.19</h3>
                    <ul className="data-list coupon-list">
                      <li>
                        <div className="item coupon">
                          <div className="data-wrap">
                            <div className="flex-both">
                              <p className="day num fc-orange">~21.07.28</p>
                              <p className="name">다슬커피</p>
                            </div>
                            <p className="title">FREE 음료 쿠폰</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item coupon">
                          <div className="data-wrap">
                            <div className="flex-both">
                              <p className="day num fc-orange">~21.07.28</p>
                              <p className="name">다슬커피</p>
                            </div>
                            <p className="title">FREE 음료 쿠폰</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item coupon">
                          <div className="data-wrap">
                            <div className="flex-both">
                              <p className="day num fc-orange">~21.07.28</p>
                              <p className="name">다슬커피</p>
                            </div>
                            <p className="title">FREE 음료 쿠폰</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h3 className="history-header">2021.06.19</h3>
                    <ul className="data-list coupon-list">
                      <li>
                        <div className="item coupon">
                          <div className="data-wrap">
                            <div className="flex-both">
                              <p className="day num fc-orange">~21.07.28</p>
                              <p className="name">다슬커피</p>
                            </div>
                            <p className="title">FREE 음료 쿠폰</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item coupon">
                          <div className="data-wrap">
                            <div className="flex-both">
                              <p className="day num fc-orange">~21.07.28</p>
                              <p className="name">다슬커피</p>
                            </div>
                            <p className="title">FREE 음료 쿠폰</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div id="sendCoupon" className="tab-content">
                <ol className="data-list">
                  <li>
                    <h3 className="history-header">2021.06.19</h3>
                    <ul className="data-list coupon-list">
                      <li>
                        <div className="item coupon">
                          <div className="data-wrap">
                            <div className="flex-both">
                              <p className="day num fc-orange">~21.07.28</p>
                              <p className="name">다슬커피</p>
                            </div>
                            <p className="title">FREE 음료 쿠폰</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <h3 className="history-header">2021.06.19</h3>
                    <ul className="data-list coupon-list">
                      <li>
                        <div className="item coupon">
                          <div className="data-wrap">
                            <div className="flex-both">
                              <p className="day num fc-orange">~21.07.28</p>
                              <p className="name">다슬커피</p>
                            </div>
                            <p className="title">FREE 음료 쿠폰</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="item coupon">
                          <div className="data-wrap">
                            <div className="flex-both">
                              <p className="day num fc-orange">~21.07.28</p>
                              <p className="name">다슬커피</p>
                            </div>
                            <p className="title">FREE 음료 쿠폰</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>

              <div className="alert-wrap">
                <p className="alert">
                  <i className="ico alert">
                    <span>알림</span>
                  </i>
                  최근 1년간의 이용내역을 조회할 수 있습니다.
                </p>
              </div>
            </section>

            <button type="button" id="moveScrollTop" className="btn scroll-top" onClick={() => moveScrollTop()}>
              <i className="ico arr-top"></i>
            </button>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
