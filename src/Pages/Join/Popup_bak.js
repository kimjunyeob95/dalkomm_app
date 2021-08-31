import React from "react";
import $ from "jquery";
import { useHistory } from "react-router-dom";
export default function Popup_bak() {
  const history = useHistory();
  const handleClose = () => {
    $("body").removeClass("modal-opened");
    history.push("/");
  };
  return (
    <div id="popupExitJoin" className="overlay">
      <div className="popup">
        <div className=" popup-body">
          <p className="info">
            회원가입을 종료하고,
            <br />
            이전페이지로 돌아가시겠습니까?
          </p>
          <p className="alert">*가입을 위해 다시 인증을 진행하셔야 합니다.</p>
        </div>
        <div className="popup-footer">
          <button className="btn normal large btn-close">취소</button>
          <button className="btn dark large" onClick={() => handleClose()}>
            종료하기
          </button>
        </div>
      </div>
    </div>
  );
}
