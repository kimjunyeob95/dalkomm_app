/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";

import { useHistory } from "react-router-dom";
import { checkMobile } from "Config/GlobalJs";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";

export default function Popup_removeUser() {
  const history = useHistory();
  const [state, dispatch] = useContext(authContext);
  const handleClose = () => {
    let body = {};
    const header_config = {
      headers: {
        "X-dalkomm-access-token": state?.accessToken,
        Authorization: state?.auth,
      },
    };
    try {
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/account/simple/withdraw`, body, header_config)]).then(
        axios.spread((res1) => {
          if (res1.data.meta.code === 20000) {
            alert(res1.data.meta.msg);
            $("body").removeClass("modal-opened");
            dispatch({ type: "logout" });
            history.push("/");
            if (checkMobile() === "android") {
              window.android.fn_logout();
            } else if (checkMobile() === "ios") {
              window.webkit.messageHandlers.fn_logout.postMessage("");
            }
          } else {
            return alert(res1.data.meta.msg);
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="popupExitJoin2" className="overlay">
      <div className="popup">
        <div className=" popup-body">
          <p className="info">회원을 탈퇴하시겠습니까?</p>
        </div>
        <div className="popup-footer">
          <button className="btn normal large btn-close">취소</button>
          <button className="btn dark large" onClick={() => handleClose()}>
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
