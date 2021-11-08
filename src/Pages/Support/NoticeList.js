/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SERVER_DALKOMM_SUGAR } from "Config/Server";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";
import { fadeOut } from "Config/GlobalJs";
import { authContext } from "ContextApi/Context";

export default function NoticeList() {
  const [state] = useContext(authContext);
  const [axioData, setData] = useState({});
  useEffect(() => {
    // 말풍선 스크롤시 hide/show

    axios.post(`${SERVER_DALKOMM_SUGAR}/api/noticeList`).then((res) => {
      let noticeList = res.data.list;
      setData((origin) => {
        return {
          ...origin,
          noticeList,
        };
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fadeOut();
    contGap();
  }, [axioData]);
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="공지 사항" redirectBack={true} location="/menu" />

            <div id="content" className="notice list fade-in">
              <section className="section">
                <ul className="data-list">
                  {axioData?.noticeList?.map((e, i) => {
                    return (
                      <li key={i}>
                        <div className="item notice">
                          <span className="info en">{e.date}</span>
                          <Link to={`/support/notice/detail/${e.seq}`} className="title-area">
                            <h3 className="ellipsis line2">{e.title}</h3>
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}
      </React.Fragment>
    );
  } else {
    return (
      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="공지 사항" redirectBack={true} location="/menu" />
        </div>
      </div>
    );
  }
}
