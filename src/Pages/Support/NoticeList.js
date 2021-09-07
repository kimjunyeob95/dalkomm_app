/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";

export default function NoticeList() {
  const [state] = useContext(authContext);
  const [axioData, setData] = useState({});
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    contGap();
    const header_config = {
      headers: {
        Authorization: state?.auth,
      },
    };
    axios.get(`/app/api/notice/list`, header_config).then((res) => {
      setData(res.data.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="공지 사항" redirectBack={true} location="/menu" />

          <div id="content" className="notice list">
            <section className="section">
              <ul className="data-list">
                {axioData?.list?.map((e, i) => {
                  return (
                    <li key={i}>
                      <div className="item notice">
                        <span className="info en">{e.date}</span>
                        <Link to={`/support/notice/detail/${e.notice_id}`} className="title-area">
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
}
