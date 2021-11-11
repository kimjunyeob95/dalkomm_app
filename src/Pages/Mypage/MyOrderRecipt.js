/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SERVER_DALKOMM } from "Config/Server";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";
import { useHistory } from "react-router";
import { authContext } from "ContextApi/Context";
import { fadeOut } from "Config/GlobalJs";

export default function MyOrderRecipt() {
  const [state] = useContext(authContext);
  const [axioData, setData] = useState({});
  const history = useHistory();
  const { duration } = useLocation();

  let pageCount = 1;
  let page_array = [];
  let page_flag = true;

  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios
      .all([
        axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/orderinfo/list`, { page: pageCount, duration: duration ? duration : "w" }, header_config),
      ])
      .then(
        axios.spread((res1) => {
          let res1_data = res1.data.data;
          page_array.push(pageCount);
          pageCount++;
          setData(res1_data);
        })
      );
    handleScroll();
    handleSelect();
    // window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    contGap();
    fadeOut();
  }, [axioData]);
  const fn_api = () => {
    let duration = $("#select-duration").val() ? $("#select-duration").val() : "w";
    if (page_array.indexOf(pageCount) > 0) {
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/orderinfo/list`, { page: pageCount, duration: duration }, header_config)]).then(
        axios.spread((res1) => {
          let orderList = res1.data.data.result;
          let order_length = orderList.length;
          if (order_length > 0) {
            pageCount++;
            page_flag = true;
            setData((origin) => {
              return {
                ...origin,
                result: [...origin.result, ...orderList],
              };
            });
          } else {
            page_flag = false;
          }
        })
      );
    }
  };

  const handleDetail = (smartorderinfo_id) => {
    let duration = $("#select-duration").val();
    history.push({
      pathname: `/order/info/${smartorderinfo_id}`,
      duration: duration,
    });
  };
  const handleSelect = () => {
    $("#select-duration").change(function () {
      pageCount = 1;
      page_array = [];
      page_flag = true;
      let duration = $("#select-duration").val();
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/orderinfo/list`, { page: pageCount, duration: duration }, header_config)]).then(
        axios.spread((res1) => {
          let res1_data = res1.data.data;

          page_array.push(pageCount);
          pageCount = 2;

          setData(res1_data);
        })
      );
    });
  };
  const handleScroll = () => {
    $(document).scroll(function () {
      let scrollHeight = document.documentElement.scrollHeight;
      let scrollTop = document.documentElement.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight * 0.95) {
        if (page_array.indexOf(pageCount) < 0) {
          if (page_flag) {
            page_array.push(pageCount);
            fn_api();
          }
        }
      }
    });
  };

  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header undefined">
              <h1 className="page-title">주문내역</h1>
              <Link className="btn back" to="/mypage">
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </Link>
            </header>

            <div id="content" className="mypage order fade-in">
              <div className="sorting-wrap w-inner flex-end">
                <select className="select medium" name="" id="select-duration" defaultValue={duration ? duration : "w"}>
                  <option value="w">1주일 이내</option>
                  <option value="m">1개월 이내</option>
                  <option value="y">1년 이내</option>
                </select>
              </div>

              <ul className="order-list data-list">
                {axioData?.result?.map((e, i) => (
                  <li key={i} onClick={() => handleDetail(e?.smartorderinfo_id)}>
                    <div
                      className={`item order ${
                        e?.orderinfo_status === 2
                          ? "making"
                          : e?.orderinfo_status === 3
                          ? "making"
                          : e?.orderinfo_status === 4
                          ? "complete"
                          : e?.orderinfo_status === 5
                          ? "cancel"
                          : ""
                      }`}
                    >
                      {/*
                  .item.order.making  : 제조중
                  .item.order.complete: 제조완료
                  .item.order.cancel  : 취소
                */}
                      <div className="img-wrap">
                        <img src={e?.menu_with_type === "I" ? e?.menu_with_ice_img : e?.menu_with_hot_img} alt={e?.menu_name_with_count} />
                      </div>
                      <div className="detail-wrap">
                        <div className="order-info">
                          <div className="flex-both">
                            <p className="title">{e?.menu_name_with_count}</p>
                            <p className="location">{e?.orderinfo_store_name}</p>
                          </div>
                          <p className="info">
                            <span className="en">{e?.orderinfo_orderdate}</span>
                          </p>
                        </div>
                        <div className="status-info">
                          <p className="status">
                            {e?.orderinfo_status === 2
                              ? "주문접수"
                              : e?.orderinfo_status === 3
                              ? "제조중"
                              : e?.orderinfo_status === 4
                              ? "제조완료"
                              : e?.orderinfo_status === 5
                              ? "취소"
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
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
          <header id="header" className="header undefined">
            <h1 className="page-title">주문내역</h1>
            <Link className="btn back" to="/mypage">
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
