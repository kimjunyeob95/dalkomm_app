/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";

import { authContext } from "ContextApi/Context";
import { fadeOut } from "Config/GlobalJs";

export default function StoryList() {
  const [state] = useContext(authContext);
  const [axioData, setData] = useState({});
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    const header_config = {
      headers: {
        Authorization: state?.auth,
      },
    };
    // axios.get(`/api/event/list `, header_config).then((res) => {
    //   console.log(res);
    //   setData(res.data.data);
    // });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    fadeOut();
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub noBack={false} title="달콤스토리" />

          <div id="content" className="story fade-in">
            {/* 주문하기 */}
            <section className="section">
              <div className="w-inner">
                <ul className="data-list">
                  <li>
                    <Link to="/story/detail/1" className="item dalkomm-story">
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
                      <div className="img-wrap">
                        <img src="/@resource/images/@temp/thum_event_02.jpg" alt="{title}" />
                      </div>
                      <div className="data-wrap">
                        <h2 className="title">2021 여름 시즌 음료</h2>
                        <p className="text">페이코인 현장 결제 시, 아메리카노가 100원!</p>
                        <p className="date">2021.06.14 </p>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link to="/story/detail/1" className="item dalkomm-story">
                      <div className="img-wrap">
                        <img src="/@resource/images/@temp/thum_event_03.jpg" alt="{title}" />
                      </div>
                      <div className="data-wrap">
                        <h2 className="title">새롭게 전하는 달콤의 이야기</h2>
                        <p className="text">달콤의 새로운 브랜드 스토리!</p>
                        <p className="date">2021.06.14 </p>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link to="/story/detail/1" className="item dalkomm-story">
                      <div className="badge-wrap">
                        <span className="badge square pick">MD’s pick</span>
                      </div>
                      <div className="img-wrap">
                        <img src="/@resource/images/@temp/thum_event_04.jpg" alt="{title}" />
                      </div>
                      <div className="data-wrap">
                        <h2 className="title">내 집안의 작은 카페</h2>
                        <p className="text">달콤커피 홈카페 세트</p>
                        <p className="date">2021.06.14 </p>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link to="/story/detail/1" className="item dalkomm-story">
                      <div className="badge-wrap">
                        <span className="badge square store">STORE</span>
                      </div>
                      <div className="img-wrap">
                        <img src="/@resource/images/@temp/thum_event_05.jpg" alt="{title}" />
                      </div>
                      <div className="data-wrap">
                        <h2 className="title">8월 오픈 매장</h2>
                        <p className="text">광주 쌍령 DT점, 교대점</p>
                        <p className="date">2021.06.14 </p>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link to="/story/detail/1" className="item dalkomm-story">
                      <div className="badge-wrap">
                        <span className="badge square event">EVENT</span>
                        <span className="d-day num">D-30</span>
                      </div>
                      <div className="img-wrap">
                        <img src="/@resource/images/@temp/thum_event_01.jpg" alt="{title}" />
                      </div>
                      <div className="data-wrap">
                        <h2 className="title">월요인은 페이코인 DAY!</h2>
                        <p className="text">페이코인 현장 결제 시, 아메리카노가 100원!</p>
                        <p className="date">2021.06.14 </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </section>
            {/* // 주문하기 */}
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
