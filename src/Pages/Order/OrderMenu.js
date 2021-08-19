import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import HeaderSub2 from "Components/Header/HeaderSub2";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap, moveScrollTop, tabLink } from "Jquery/Jquery";

import { Swiper } from "swiper/react";

export default function OrderMenu() {
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    contGap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jqueryTablink = (e) => {
    tabLink(e);
  };
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub2 title="메뉴선택" icon="search-s" icon2="cart" location="/search" location2="/cart" />

          <Nav order={3} />

          <div id="content" className="drink list">
            <div className="store-search-wrap w-inner">
              <div className="item store-search">
                <div className="flex-both">
                  <dl className="detail-wrap flex-start">
                    <dt className="title">선택매장</dt>
                    <dd className="place">광명역 자이스트릿점</dd>
                  </dl>
                  <Link to="/order" className="btn">
                    변경
                  </Link>
                </div>
              </div>
            </div>

            <Swiper
              id="moduleTab"
              className="swiper-container tab-wrap w-inner"
              slidesPerView={"auto"}
              freeMode={true}
              setWrapperSize={true}
              watchSlidesVisibility={true}
              watchSlidesProgress={true}
              initialSlide={0}
            >
              <ul className="swiper-wrapper tabs" slot="container-start">
                <li className="swiper-slide active">
                  <Link to="#" onClick={(e) => jqueryTablink(e)}>
                    메뉴 전체
                  </Link>
                </li>{" "}
                {/* [D] 현재 탭 .active 활성화 */}
                <li className="swiper-slide">
                  <Link to="#" onClick={(e) => jqueryTablink(e)}>
                    신 메뉴
                  </Link>
                </li>
                <li className="swiper-slide">
                  <Link to="#" onClick={(e) => jqueryTablink(e)}>
                    커피
                  </Link>
                </li>
                <li className="swiper-slide">
                  <Link to="#" onClick={(e) => jqueryTablink(e)}>
                    NON-커피
                  </Link>
                </li>
                <li className="swiper-slide">
                  <Link to="#" onClick={(e) => jqueryTablink(e)}>
                    MIXTUR
                  </Link>
                </li>
                <li className="swiper-slide">
                  <Link to="#" onClick={(e) => jqueryTablink(e)}>
                    TEA & JUICE
                  </Link>
                </li>
                <li className="swiper-slide">
                  <Link to="#" onClick={(e) => jqueryTablink(e)}>
                    BAKERY
                  </Link>
                </li>
              </ul>
            </Swiper>

            {/* 즐겨찾는 매장 */}
            <section className="section">
              <ul className="data-list col-2">
                <li>
                  <Link to="/order/detail/1" className="item menu">
                    <div className="img-wrap">
                      <img src="../@resource/images/@temp/product_04.jpg" alt="딸기 스무디" />
                    </div>
                    <div className="detail-wrap">
                      <p className="title">
                        딸기 스무디
                        <span className="en">Strawberry smoothie</span>
                      </p>
                      <p className="price">4,300원</p>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to="/order/detail/1" className="item menu">
                    <span className="badge round new">NEW</span>
                    {/* 메뉴 .bagde.round 타입 
                                    .bagde.round.new : NEW
                                    .bagde.round.pick : PICK
                                */}
                    <div className="img-wrap">
                      <img src="../@resource/images/@temp/product_03.jpg" alt="카푸치노" />
                    </div>
                    <div className="detail-wrap">
                      <p className="title">
                        카푸치노
                        <span className="en">Cappuccino</span>
                      </p>
                      <p className="price">4,800원</p>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to="/order/detail/1" className="item menu">
                    <span className="badge round pick">PICK</span>
                    <div className="img-wrap">
                      <img src="../@resource/images/@temp/product_01.jpg" alt="아메리카노" />
                    </div>
                    <div className="detail-wrap">
                      <p className="title">
                        아메리카노
                        <span className="en">Americano</span>
                      </p>
                      <p className="price">4,300원</p>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to="/order/detail/1" className="item menu">
                    <div className="img-wrap">
                      <img src="../@resource/images/@temp/product_02.jpg" alt="카페라떼" />
                    </div>
                    <div className="detail-wrap">
                      <p className="title">
                        카페라떼
                        <span className="en">Cafe Latte</span>
                      </p>
                      <p className="price">4,800원</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </section>
            {/* //즐겨찾는 매장 */}

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
