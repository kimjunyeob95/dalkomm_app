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

export default function Terms() {
  const [axioData, setData] = useState();

  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    axios.get(`${SERVER_DALKOMM_SUGAR}/api/policy`).then((res) => {
      let markup = res.data;
      setData({ markup });
    });
  }, []);
  useEffect(() => {
    fadeOut();
  }, [axioData]);
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header">
              <h1 className="page-title">이용약관</h1>
              <Link type="button" className="btn back" to={"/menu"}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </Link>
            </header>

            <div id="content" className="story fade-in" style={{ paddingTop: "3.667vw" }}>
              {/* 주문하기 */}
              <section className="section">
                <div className="w-inner">
                  <div dangerouslySetInnerHTML={{ __html: axioData?.markup }}></div>
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
  } else {
    return (
      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <header id="header" className="header">
            <h1 className="page-title">이용약관</h1>
            <Link type="button" className="btn back" to={"/menu"}>
              <i className="ico back">
                <span className="blind">뒤로</span>
              </i>
            </Link>
          </header>
        </div>
      </div>
    );
  }
}
