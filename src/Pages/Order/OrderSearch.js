import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import Nav from "Components/Nav/Nav";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

export default function OrderSearch() {
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
          <HeaderSub title="메뉴검색" location="/mypage/cart" icon="cart" />

          <Nav order={3} />
          <div id="content" className="drink search">
            <form className="form">
              <fieldset className="fieldset">
                <div className="w-inner">
                  <legend className="blind">메뉴 검색</legend>
                  <div className="field">
                    <div className="search-box">
                      <input type="text" className="input-text medium" placeholder="메뉴명을 입력해 주세요." />
                      <button type="button" className="btn search">
                        <i className="ico search-t">
                          <span>검색하기</span>
                        </i>
                      </button>
                    </div>
                  </div>
                  {/* [D] 메뉴 검색 결과 텍스트 노출 */}
                  <p className="text">
                    총 <span className="fc-orange">4개</span>의 메뉴가 검색되었습니다.
                  </p>
                  {/* // [D] 메뉴 검색 결과 텍스트 노출 */}
                </div>
              </fieldset>
            </form>

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
              </ul>
            </section>
            {/* //즐겨찾는 매장 */}

            <button type="button" id="moveScrollTop" className="btn scroll-top">
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
