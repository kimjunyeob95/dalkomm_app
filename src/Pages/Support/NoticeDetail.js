/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";

export default function NoticeDetail() {
  const [state] = useContext(authContext);
  const [axioData, setData] = useState({});
  let { id } = useParams();

  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    contGap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios.get(`/app/api/notice`, { params: { notice_id: id }, headers: { Authorization: state?.auth } }).then((res) => {
      setData(res.data.data);
    });
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="공지 사항" />

          <div id="content" className="notice detail">
            <section className="section">
              <div className="item notice">
                <span className="info en">{axioData?.date}</span>
                <div className="title-area">
                  <h3>{axioData?.title}</h3>
                </div>
              </div>
              <div className="item board">
                <div dangerouslySetInnerHTML={{ __html: axioData?.content }}></div>
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
}
