/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SERVER_DALKOMM_SUGAR } from "Config/Server";
import GoContents from "Components/GoContents";
import { fadeOut } from "Config/GlobalJs";

export default function TermLocation() {
  const [axioData, setData] = useState();
  const history = useHistory();
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    axios.get(`${SERVER_DALKOMM_SUGAR}/api/policyLocation`).then((res) => {
      let markup = res.data;
      setData({ markup });
    });
  }, []);
  useEffect(() => {
    fadeOut();
    $("body").removeClass("modal-opened");
  }, [axioData]);

  const handleGoback = () => {
    if (history?.location?.from === "회원가입") {
      history.push({ pathname: "/join/step2", value: history?.location.value, join_token: history?.location.join_token });
    } else {
      history.push("/support/termList");
    }
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header">
              <h1 className="page-title">이용약관</h1>
              <a type="button" className="btn back" onClick={() => handleGoback()}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </a>
            </header>

            <div id="content" className="story fade-in" style={{ paddingTop: "3.667vw" }}>
              {/* 주문하기 */}
              <section className="section">
                <div className="w-inner">
                  <div className="contentView" dangerouslySetInnerHTML={{ __html: axioData?.markup }}></div>
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
            <a type="button" className="btn back" onClick={() => handleGoback()}>
              <i className="ico back">
                <span className="blind">뒤로</span>
              </i>
            </a>
          </header>
        </div>
      </div>
    );
  }
}
