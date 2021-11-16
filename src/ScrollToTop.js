/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useContext } from "react";
import $ from "jquery";
import { useLocation } from "react-router-dom";
import { checkMobile } from "Config/GlobalJs";
import { authContext } from "ContextApi/Context";

const ScrollToTop = () => {
  const [state, dispatch] = useContext(authContext);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (state?.auth) {
      try {
        if (checkMobile() === "android") {
          window.android.fn_location();
        } else if (checkMobile() === "ios") {
          window.webkit.messageHandlers.fn_location.postMessage("");
        }
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: "changeLocation" });
    }
    //모달창 닫기
    $("body").removeClass("modal-opened");
  }, [pathname]);
  return null;
};

export default ScrollToTop;
