/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import React from "react";
import $ from "jquery";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SERVER_DALKOMM } from "Config/Server";

export default function Popup_cancleMembership({ smartOrderSeq, FrontData, header_config }) {
  const history = useHistory();
  const handleClose = () => {
    let body = {
      card_no: String($("#membershipCard").val()),
      orderinfo_id: Number(smartOrderSeq),
    };

    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/order/${Number(smartOrderSeq)}/kt/detach`, body, header_config)]).then(
      axios.spread((res1) => {
        if (res1.data.meta.code === 20000) {
          $("body").removeClass("modal-opened");
          $(".overlay.popupExitJoin").removeClass("active");
          history.push({
            pathname: `/order/final/${smartOrderSeq}`,
            frontValue: FrontData,
          });
        } else {
          alert(res1.data.meta.msg);
        }
      })
    );
  };
  return (
    <div id="popupExitJoin" className="overlay popupExitJoin">
      <div className="popup">
        <div className=" popup-body">
          <p className="info">적용된 멤버십 제휴할인을 취소할까요?</p>
        </div>
        <div className="popup-footer">
          <button className="btn normal large btn-close">아니요</button>
          <button className="btn dark large" onClick={() => handleClose()}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
