/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import React from "react";
import $ from "jquery";

export default function Popup_nomal({ fn_close }) {
  const handleClose = () => {
    $("body").removeClass("modal-opened");
    $(".overlay.popupExitJoin").removeClass("active");
    fn_close && fn_close();
  };
  return (
    <div id="popupExitJoin" className="overlay popupExitJoin">
      <div className="popup">
        <div className=" popup-body">
          <p className="info" id="resAlert"></p>
        </div>
        <div className="popup-footer col-1">
          <button className="btn dark large" onClick={() => handleClose()}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
