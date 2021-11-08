/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";
import { fadeOut } from "Config/GlobalJs";
import { SERVER_DALKOMM_SUGAR } from "Config/Server";

export default function NoticeDetail() {
  const [axioData, setData] = useState({});
  let { id } = useParams();

  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let contentData = new FormData();
    contentData.append("seq", id);
    axios
      .all([axios.post(`${SERVER_DALKOMM_SUGAR}/api/noticeView`, contentData), axios.post(`${SERVER_DALKOMM_SUGAR}/api/getHtml`, contentData)])
      .then(
        axios.spread((res1, res2) => {
          let contentData = res1.data.data;
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
  }, []);
  useEffect(() => {
    contGap();
    fadeOut();
    // SwiperCore.use([Pagination]);
  }, [axioData]);
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="공지 사항" />

            <div id="content" className="notice detail fade-in">
              <section className="section">
                <div className="item notice">
                  <span className="info en">{axioData?.contentData?.date}</span>
                  <div className="title-area">
                    <h3>{axioData?.contentData?.title}</h3>
                  </div>
                </div>
                <div className="item board">
                  <div dangerouslySetInnerHTML={{ __html: axioData?.contentDetail }}></div>
                </div>
              </section>

              {/* 목록으로 버튼 영역 */}
              <div className="fixed-con active">
                <div className="btn-area">
                  <Link to="/support/notice/list" className="btn full x-large bdr">
                    <strong>목록으로</strong>
                  </Link>
                </div>
              </div>
              {/* // 목록으로 버튼 영역 */}
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
        <HeaderSub title="공지 사항" />
      </div>
    </div>;
  }
}
