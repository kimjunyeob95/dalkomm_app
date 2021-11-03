import $ from "jquery";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";

import { moveScrollTop } from "Jquery/Jquery";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import { fadeOut } from "Config/GlobalJs";

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
      var winsc = $(this).scrollTop();

      if (winsc === 0) {
        $("#header").removeClass("fixed-header bg-transparent");
      }
      // eslint-disable-next-line no-unused-vars
      let obj = $("#storyBanner").offset();
      if ($("body").hasClass("scroll-has") === true) {
        $("#header").addClass("fixed-header bg-transparent");
      }
      try {
        if ($(this).scrollTop() > $(".story-detail-wrap").offset().top - $("#header .btn").outerHeight()) {
          $("#header .btn").addClass("bdr");
        } else {
          $("#header .btn").removeClass("bdr");
        }
      } catch (error) {}
    });
    sectionGap();
    fadeOut();
    return () => {
      $(window).off("scroll");
    };
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          {/* <HeaderSub title="달콤스토리" btnType="share" icon="share" blindClass={false} PathName="detail" /> */}
          <HeaderSub title="달콤스토리" blindClass={false} PathName="detail" />

          <div id="content" className="story detail fade-in">
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
                <Link to="/story/detail/1" className="btn page prev">
                  <span className="blind">이전</span>
                </Link>
                <Link to="/story/list" className="btn full x-large bdr">
                  <strong>목록으로</strong>
                </Link>
                <Link to="/story/detail/1" className="btn page next">
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
