/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_DALKOMM_SUGAR } from "Config/Server";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap, accordion } from "Jquery/Jquery";
import { fadeOut } from "Config/GlobalJs";

export default function Faq() {
  const [axioData, setData] = useState();
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    axios.post(`${SERVER_DALKOMM_SUGAR}/api/getFaq2`).then((res) => {
      let faqList = res.data.list;
      setData({ faqList });
    });
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
            <HeaderSub title="FAQ" />

            <div id="content" className="faq fade-in">
              <section className="section">
                {axioData?.faqList?.map((e, i) => (
                  <div className="faq-accordion accordion" key={i}>
                    <div className="js-accordion-switche" onClick={(e) => accordion(e.currentTarget)}>
                      <div className="flex-both">
                        <h2 className="h2">{e?.cate}</h2>
                        <i className="ico accordion-arr"></i>
                      </div>
                    </div>
                    <div className="js-accordion-content">
                      <ul className="faq-list">
                        {e?.list?.map((element, index) => (
                          <li key={index}>
                            <div className="toggle-switch flex-start">
                              <strong className="type">Q</strong>
                              <h3 className="h3">{element?.title}</h3>
                            </div>
                            <div className="toggle-cont">
                              <div className="flex-start">
                                <strong className="type">A</strong>
                                <div className="detail">{element?.detail}</div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
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
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <HeaderSub title="FAQ" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
