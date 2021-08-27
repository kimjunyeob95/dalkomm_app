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
          <HeaderSub2 title="메뉴선택" icon="search-s" icon2="cart" location="/order/menu/search" location2="/mypage/cart" />

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
                      <img src="/@resource/images/@temp/product_05.jpg" alt="카라멜마끼아또" />
                    </div>
                    <div className="detail-wrap">
                      <p className="title">
                        카라멜마끼아또
                        <span className="en">Caramelmcchiato</span>
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
                      <img src="/@resource/images/@temp/product_06.jpg" alt="카푸치노" />
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
                      <img src="/@resource/images/@temp/product_07.jpg" alt="아메리카노" />
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
                      <img src="/@resource/images/@temp/product_08.jpg" alt="초코라떼" />
                    </div>
                    <div className="detail-wrap">
                      <p className="title">
                        초코라떼
                        <span className="en">Chocolate Latte</span>
                      </p>
                      <p className="price">4,800원</p>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to="/order/detail/1" className="item menu">
                    <div className="img-wrap">
                      <img src="/@resource/images/@temp/product_09.jpg" alt="청포도 블렌디드" />
                    </div>
                    <div className="detail-wrap">
                      <p className="title">
                        청포도 블렌디드
                        <span className="en">Green grape Blended</span>
                      </p>
                      <p className="price">4,800원</p>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to="/order/detail/1" className="item menu">
                    <div className="img-wrap">
                      <img src="/@resource/images/@temp/product_10.jpg" alt="토마토 주스" />
                    </div>
                    <div className="detail-wrap">
                      <p className="title">
                        토마토 주스
                        <span className="en">Tomato Juice</span>
                      </p>
                      <p className="price">4,800원</p>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to="/order/detail/1" className="item menu">
                    <div className="img-wrap">
                      <img src="/@resource/images/@temp/product_11.jpg" alt="딸기라떼" />
                    </div>
                    <div className="detail-wrap">
                      <p className="title">
                        딸기라떼
                        <span className="en">Strawberry Latte</span>
                      </p>
                      <p className="price">4,800원</p>
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to="/order/detail/1" className="item menu">
                    <div className="img-wrap">
                      <img src="/@resource/images/@temp/product_12.jpg" alt="그린티카페라떼" />
                    </div>
                    <div className="detail-wrap">
                      <p className="title">
                        그린티카페라떼
                        <span className="en">Green tea Cafe Latte</span>
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
