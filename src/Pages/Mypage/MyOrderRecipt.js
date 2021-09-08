/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import { SERVER_DALKOMM } from "Config/Server";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { authContext } from "ContextApi/Context";

export default function MyOrderRecipt() {
  const [state] = useContext(authContext);
  const [axioData, setData] = useState({});
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    contGap();
    const header_config = {
      headers: {
        "X-dalkomm-access-token": state?.accessToken,
        Authorization: state?.auth,
      },
    };
    // axios
    //   .get(`${SERVER_DALKOMM}/app/api/v2/smartorder/orderinfo`, header_config)
    //   .then((res) => {
    //     console.log(res);
    //     setData(res.data.data);
    //   });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="주문내역" />

          <div id="content" className="mypage order">
            <div className="sorting-wrap w-inner flex-end">
              <select className="select medium" name="" id="">
                <option value="">1주일 이내</option>
                <option value="">2주일 이내</option>
              </select>
            </div>

            <ul className="order-list data-list">
              <li>
                <div className="item order making">
                  {/*
								.item.order.making  : 제조중
								.item.order.complete: 제조완료
								.item.order.cancel  : 취소
							*/}
                  <div className="img-wrap">
                    <img
                      src="/@resource/images/@temp/product_04.jpg"
                      alt="딸기 스무디"
                    />
                  </div>
                  <div className="detail-wrap">
                    <div className="order-info">
                      <div className="flex-both">
                        <p className="title">딸기 스무디 외 1잔</p>
                        <p className="location">분당서현점</p>
                      </div>
                      <p className="info">
                        <span className="en">2021-07-10 16:57</span>
                      </p>
                    </div>
                    <div className="status-info">
                      <p className="status">제조 중</p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item order complete">
                  <div className="img-wrap">
                    <img
                      src="/@resource/images/@temp/product_04.jpg"
                      alt="딸기 스무디"
                    />
                  </div>
                  <div className="detail-wrap">
                    <div className="order-info">
                      <div className="flex-both">
                        <p className="title">딸기 스무디 외 1잔</p>
                        <p className="location">분당서현점</p>
                      </div>
                      <p className="info">
                        <span className="en">2021-07-10 16:57</span>
                      </p>
                    </div>
                    <div className="status-info">
                      <p className="status">제조 완료</p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item order cancel">
                  <div className="img-wrap">
                    <img
                      src="/@resource/images/@temp/product_04.jpg"
                      alt="딸기 스무디"
                    />
                  </div>
                  <div className="detail-wrap">
                    <div className="order-info">
                      <div className="flex-both">
                        <p className="title">딸기 스무디 외 1잔</p>
                        <p className="location">분당서현점</p>
                      </div>
                      <p className="info">
                        <span className="en">2021-07-10 16:57</span>
                      </p>
                    </div>
                    <div className="status-info">
                      <p className="status">취소</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
      {/* // #wrap */}
    </React.Fragment>
  );
}
