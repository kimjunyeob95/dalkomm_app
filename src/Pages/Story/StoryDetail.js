/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { SERVER_DALKOMM_SUGAR } from "Config/Server";
import GoContents from "Components/GoContents";

import { moveScrollTop } from "Jquery/Jquery";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import { fadeOut } from "Config/GlobalJs";

export default function StoryDetail() {
  const history = useHistory();
  const [axioData, setData] = useState({});
  const { id } = useParams();

  const sectionGap = () => {
    var bannerH = $("#storyBanner").outerHeight();

    $(".story-detail-wrap").css({ "margin-top": bannerH });
  };

  const fn_scroll = () => {
    $(window).on("scroll", function (e) {
      // eslint-disable-next-line no-unused-vars
      try {
        if ($(this).scrollTop() > $(".story-detail-wrap").offset().top - $("#header .btn").outerHeight()) {
          $("#header .btn").addClass("bdr");
        } else {
          $("#header .btn").removeClass("bdr");
        }
      } catch (error) {}
    });
  };

  const fn_api = () => {
    let contentData = new FormData();
    contentData.append("seq", id);
    axios
      .all([axios.post(`${SERVER_DALKOMM_SUGAR}/api/contentView`, contentData), axios.post(`${SERVER_DALKOMM_SUGAR}/api/getHtml`, contentData)])
      .then(
        axios.spread((res1, res2) => {
          let contentData = res1.data;
          let contentDetail = res2.data;
          setData((origin) => {
            return {
              ...origin,
              contentData,
              contentDetail,
            };
          });
        })
      );
  };
  useEffect(() => {
    fn_api();

    return () => {
      $(window).off("scroll");
    };
  }, []);
  useEffect(() => {
    fn_api();
  }, [id]);
  useEffect(() => {
    fadeOut();
    fn_scroll();
    sectionGap();
    // SwiperCore.use([Pagination]);
  }, [axioData]);
  const handleLocation = (seq) => {
    history.push(`/story/detail/${seq}`);
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header bg-transparent">
              <h1 className="page-title">
                <span className="blind">달콤스토리</span>
              </h1>
              <Link type="button" className="btn back" to={"/story/list"}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </Link>
              <div className="btn-area flex-center">
                {/* <a href="javascript:void(0);" className="btn share">
              <i className="ico share">
                <span>공유하기</span>
              </i>
            </a> */}
              </div>
            </header>

            <div id="content" className="story detail fade-in">
              <div id="storyBanner" className="swiper-container">
                <ul className="swiper-wrapper data-list" slot="container-start">
                  <li className="swiper-slide">
                    <div className="banner-wrap">
                      <div className="img-wrap">
                        <img src={axioData?.contentData?.data?.thumb} alt="스토리 이미지" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <div className="swiper-pagination"></div> */}

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
                      <h2 className="title">{axioData?.contentData?.data?.title}</h2>
                      <p className="text">{axioData?.contentData?.data?.sub_title}</p>
                      <p className="date">{axioData?.contentData?.data?.date}</p>
                    </div>
                  </div>
                  <div className="item board">
                    <div dangerouslySetInnerHTML={{ __html: axioData?.contentDetail }}></div>
                  </div>
                </section>

                <section className="section">
                  <div className="w-inner">
                    <h3 className="section-title">
                      <span>이벤트 메뉴 바로가기</span>
                    </h3>
                    <ul className="data-list">
                      {axioData?.contentData?.menu?.map((e, i) => (
                        <li key={i}>
                          <Link to={`/order/infoDetail/${e?.code}`} className="item order">
                            <div className="img-wrap">
                              <img src={e?.img} alt="청포도 블렌디드" />
                            </div>
                            <div className="detail-wrap">
                              <div className="order-info">
                                <p className="title">
                                  {e?.name}
                                  <span className="en">{e?.name_eng}</span>
                                </p>
                              </div>
                              <div className="price-wrap">
                                <p className="price">{Number(e?.price).toLocaleString("ko-KR")}원</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>

              {/* 목록으로 버튼 영역 */}
              <div className="fixed-con active">
                <div className="btn-area">
                  {axioData?.contentData?.prev && (
                    <a onClick={() => handleLocation(axioData?.contentData?.prev)} className="btn page prev">
                      <span className="blind">이전</span>
                    </a>
                  )}
                  <Link to="/story/list" className="btn full x-large bdr">
                    <strong>목록으로</strong>
                  </Link>
                  {axioData?.contentData?.next && (
                    <a onClick={() => handleLocation(axioData?.contentData?.next)} className="btn page next">
                      <span className="blind">다음</span>
                    </a>
                  )}
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
  } else {
    <div id="wrap" className="wrap">
      <div id="container" className="container">
        <header id="header" className="header bg-transparent">
          <h1 className="page-title">
            <span className="blind">달콤스토리</span>
          </h1>
          <Link type="button" className="btn back" to={"/story/list"}>
            <i className="ico back">
              <span className="blind">뒤로</span>
            </i>
          </Link>
          <div className="btn-area flex-center">
            {/* <a href="javascript:void(0);" className="btn share">
              <i className="ico share">
                <span>공유하기</span>
              </i>
            </a> */}
          </div>
        </header>
      </div>
    </div>;
  }
}
