import GoContents from "Components/GoContents";
import { useHistory } from "react-router-dom";
import React from "react";

export default function CustomerService() {
  const history = useHistory();

  return (
    <React.Fragment>
      <GoContents />
      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <header id="header" className="header">
            <h1 className="page-title">고객센터</h1>
            <button type="button" className="btn back" onClick={() => history.goBack()}>
              <i className="ico back">
                <span className="blind">뒤로</span>
              </i>
            </button>
          </header>
          <div id="content" className="customer">
            <section className="section">
              <ul className="data-list">
                <li>
                  <div className="item list">
                    매장 관련 문의
                    <div className="item contact">
                      <i className="ico mail-g">
                        <span>이메일</span>
                      </i>
                      <span className="num">
                        <a href="mailto:dalkomm_cs@dalkomm.com">dalkomm_cs@dalkomm.com</a>
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item list">
                    앱 관련 문의
                    <div className="item contact">
                      <i className="ico mail-g">
                        <span>이메일</span>
                      </i>
                      <span className="num">
                        <a href="mailto:dalkomm_app@dalkomm.com">dalkomm_app@dalkomm.com</a>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
