import $ from "jquery";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";

import { moveScrollTop } from "Jquery/Jquery";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

export default function StoryDetail() {
  SwiperCore.use([Pagination]);
  useEffect(() => {
    function sectionGap() {
      var bannerH = $("#storyBanner").outerHeight();

      $(".story-detail-wrap").css({ "margin-top": bannerH });
    }

    $(window).on("scroll", function (e) {
      // eslint-disable-next-line no-unused-vars
      let objHeight = $("#storyBanner").outerHeight();
      // eslint-disable-next-line no-unused-vars
      let obj = $("#storyBanner").offset();
      if ($("body").hasClass("scroll-has") === true) {
        $("#header").addClass("bg-transparent");
      }

      if ($(this).scrollTop() > $(".story-detail-wrap").offset().top - $("#header .btn").outerHeight()) {
        $("#header .btn").addClass("bdr");
      } else {
        $("#header .btn").removeClass("bdr");
      }
    });
    sectionGap();
    return () => {
      $(window).off("scroll");
    };
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="달콤스토리" btnType="share" icon="share" blindClass={true} />

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
                <Link to="CA001.html" className="btn active">
                    <div className="img-wrap">
                        <svg viewBox="0 0 30 30">
                            <g transform="translate(4.707 8.22)">
                                <g id="그룹_10">
                                    <path id="사각형_21" fill="none" stroke="#000" stroke-miterlimit="10"
                                        className="path-stroke" d="M0 0H20.586V14.594H0z" />
                                    <path id="선_3" fill="none" stroke="#000" stroke-miterlimit="10"
                                        className="path-stroke" d="M0 0L3.615 0" transform="translate(2.967 3.571)" />
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
                <Link to="ME001.html" className="btn">
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

          <div id="content" className="story detail">
            <Swiper
              id="storyBanner"
              className="swiper-container"
              slidesPerView={"auto"}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
            >
              <ul className="swiper-wrapper data-list" slot="container-start">
                <SwiperSlide className="swiper-slide">
                  <div className="banner-wrap">
                    <div className="img-wrap">
                      <img src="/@resource/images/@temp/banner_stroy_01.jpg" alt="스토리 이미지" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="banner-wrap">
                    <div className="img-wrap">
                      <img src="/@resource/images/@temp/banner_stroy_02.jpg" alt="스토리 이미지" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="banner-wrap">
                    <div className="img-wrap">
                      <img src="/@resource/images/@temp/banner_stroy_01.jpg" alt="스토리 이미지" />
                    </div>
                  </div>
                </SwiperSlide>
              </ul>
              <div className="swiper-pagination"></div>
            </Swiper>

            <div className="story-detail-wrap">
              <section className="section">
                <div className="item dalkomm-story">
                  <div className="badge-wrap">
                    <span className="badge square new">NEW</span>
                    {/* 달콤스토리 .badge.square 타입
                                    .badge.square.story : 브랜드 스토리 콘텐츠
                                    .badge.square.event : 이벤트/프로모션
                                    .badge.square.store : 신규 매장 소개
                                    .badge.square.new   : 신메뉴 소개 
                                    .badge.square.pick  : 달콤 굿즈 소개
                                */}
                  </div>
                  <div className="data-wrap">
                    <h2 className="title">2021 여름 시즌 음료</h2>
                    <p className="text">페이코인 현장 결제 시, 아메리카노가 100원!</p>
                    <p className="date">2021.06.14 </p>
                  </div>
                </div>
                <div className="item board">
                  <p>
                    커다란 자신과 그들의 천하를 설레는 그리하였는가? 것은 이것은 우리 것이 교향악이다. 위하여 소금이라 무엇이 크고 끓는 설산에서
                    황금시대를 때문이다. 무엇을 얼마나 같이, 열매를 같지 쓸쓸하랴? 속잎나고, 오직 우리 안고, 남는 심장의 뜨고, 얼마나 때문이다.
                  </p>
                  <p>
                    때까지 끝까지 풀이 오아이스도 어디 따뜻한 아니한 피가 위하여서. 시들어 꽃이 어디 할지니, 낙원을 능히 평화스러운 웅대한 것이다.
                    우는 피부가 바로 이상의 그리하였는가? <br />
                    그들을 주는 기쁘며, 같으며, 것이 가슴이 몸이 보이는 인생에 칼이다. 그림자는 노년에게서 그들의 원대하고, 청춘이 청춘의 얼마나
                    칼이다.
                  </p>
                  <img src="/@resource/images/@temp/banner_stroy_02.jpg" alt="스토리 이미지" />
                  <p>
                    밥을 인도하겠다는 물방아 하는 있으랴? 이상의 속에서 예가 할지라도 부패를 목숨이 얼마나 귀는 위하여서. 뜨거운지라, 고행을 듣기만
                    군영과 밥을 유소년에게서 방황하여도, 눈에 속에서 말이다. 이상의 보이는 모래뿐일 이것이다.
                  </p>
                </div>
              </section>

              <section className="section">
                <div className="w-inner">
                  <h3 className="section-title">
                    <span>이벤트 메뉴 바로가기</span>
                  </h3>
                  <ul className="data-list">
                    <li>
                      <Link to="#" className="item order">
                        <div className="img-wrap">
                          <img src="/@resource/images/@temp/product_09.jpg" alt="청포도 블렌디드" />
                        </div>
                        <div className="detail-wrap">
                          <div className="order-info">
                            <p className="title">
                              청포도 블렌디드
                              <span className="en">Green grape Blended</span>
                            </p>
                          </div>
                          <div className="price-wrap">
                            <p className="price">4,800원</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="item order">
                        <div className="img-wrap">
                          <img src="/@resource/images/@temp/product_10.jpg" alt="자두 블렌디드" />
                        </div>
                        <div className="detail-wrap">
                          <div className="order-info">
                            <p className="title">
                              자두 블렌디드
                              <span className="en">Plum Blended</span>
                            </p>
                          </div>
                          <div className="price-wrap">
                            <p className="price">4,800원</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="item order">
                        <div className="img-wrap">
                          <img src="/@resource/images/@temp/product_13.jpg" alt="수박 블렌디드" />
                        </div>
                        <div className="detail-wrap">
                          <div className="order-info">
                            <p className="title">
                              수박 블렌디드
                              <span className="en">Watermelon Blended</span>
                            </p>
                          </div>
                          <div className="price-wrap">
                            <p className="price">4,800원</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            {/* 목록으로 버튼 영역 */}
            <div className="fixed-con active">
              <div className="btn-area">
                <Link to="#" className="btn page prev">
                  <span className="blind">이전</span>
                </Link>
                <Link to="#" className="btn full x-large bdr">
                  <strong>목록으로</strong>
                </Link>
                <Link to="#" className="btn page next">
                  <span className="blind">다음</span>
                </Link>
              </div>
            </div>
            {/* // 목록으로 버튼 영역 */}

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
