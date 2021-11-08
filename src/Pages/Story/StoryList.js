/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_DALKOMM_SUGAR } from "Config/Server";
import GoContents from "Components/GoContents";
import { fadeOut } from "Config/GlobalJs";

export default function StoryList() {
  const [axioData, setData] = useState({});

  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    axios.post(`${SERVER_DALKOMM_SUGAR}/api/contentList`).then((res) => {
      let contentList = res.data.list;
      setData((origin) => {
        return {
          ...origin,
          contentList,
        };
      });
    });
  }, []);
  useEffect(() => {
    fadeOut();
  }, [axioData]);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <header id="header" className="header">
            <h1 className="page-title">달콤 스토리</h1>
            <Link type="button" className="btn back" to={"/menu"}>
              <i className="ico back">
                <span className="blind">뒤로</span>
              </i>
            </Link>
          </header>

          <div id="content" className="story fade-in">
            {/* 주문하기 */}
            <section className="section">
              <div className="w-inner">
                <ul className="data-list">
                  {axioData?.contentList?.map((e, i) => (
                    <li key={i}>
                      <Link to={`/story/detail/${e?.seq}`} className="item dalkomm-story">
                        <div className="badge-wrap">
                          {e?.cate === "STORY" ? (
                            <span className="badge square story">STORY</span>
                          ) : e?.cate === "EVENT" ? (
                            <span className="badge square event">EVENT</span>
                          ) : e?.cate === "NEW" ? (
                            <span className="badge square new">NEW</span>
                          ) : e?.cate === "PICK" ? (
                            <span className="badge square pick">PICK</span>
                          ) : (
                            ""
                          )}

                          {/* 달콤스토리 .badge.square 타입
                                            .badge.square.story : 브랜드 스토리 콘텐츠
                                            .badge.square.event : 이벤트/프로모션
                                            .badge.square.store : 신규 매장 소개
                                            .badge.square.new   : 신메뉴 소개 
                                            .badge.square.pick  : 달콤 굿즈 소개
                                        */}
                        </div>
                        <div className="img-wrap">
                          <img src={e?.thumb} alt="{title}" />
                        </div>
                        <div className="data-wrap">
                          <h2 className="title">{e?.title}</h2>
                          <p className="text">{e?.sub_title}</p>
                          <p className="date">{e?.date}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
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
