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
                <li>
                  <div className="item list">
                    <em className="em-bold">(!) 기프트카드 환불 안내</em>
                    <div className="item contact">
                      <span className="num" style={{ lineHeight: 1.8 }}>
                        환불을 원하시는 경우 이메일을 통하여 <br />
                        <em className="em-bold">성함, 전화번호, ID, 잔액, 환불 사유</em>
                        와 함께 <br />
                        <em className="em-bold">본인 명의 통장 스크린샷/사진</em>을 전달주시면 <br />
                        정보 확인 후 시스템에서 환불 처리되며 <br />
                        최소 10일 정도 소요될 수 있습니다.
                        <br /> 감사합니다.
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
