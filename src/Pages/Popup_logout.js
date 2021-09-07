import React, { useContext } from "react";
import $ from "jquery";
import { useHistory } from "react-router-dom";

import { authContext } from "ContextApi/Context";

export default function Popup_logout() {
  const history = useHistory();
  const [, dispatch] = useContext(authContext);
  const handleClose = () => {
    dispatch({ type: "logout" });
    $("body").removeClass("modal-opened");
    history.push("/");
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
