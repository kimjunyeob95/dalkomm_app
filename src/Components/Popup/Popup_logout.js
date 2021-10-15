/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import $ from "jquery";
import { useHistory } from "react-router-dom";

import { checkMobile } from "Config/GlobalJs";
import { authContext } from "ContextApi/Context";

export default function Popup_logout() {
  const history = useHistory();
  const [, dispatch] = useContext(authContext);
  const handleClose = () => {
    try {
      history.push("/");
      $("body").removeClass("modal-opened");
      dispatch({ type: "logout" });
      if (checkMobile() === "android") {
        window.android.fn_logout();
      } else if (checkMobile() === "ios") {
        window.webkit.messageHandlers.fn_logout.postMessage("");
      }
    } catch (error) {
      console.log(error);
    }
    // history.push("/");
    // $("body").removeClass("modal-opened");
    // dispatch({ type: "logout" });
  };
  return (
    <div id="popupExitJoin" className="overlay">
      <div className="popup">
        <div className=" popup-body">
          <p className="info">로그아웃 하시겠습니까?</p>
        </div>
        <div className="popup-footer">
          <button className="btn normal large btn-close">취소</button>
          <button className="btn dark large" onClick={() => handleClose()}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
