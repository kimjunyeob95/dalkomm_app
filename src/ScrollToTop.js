/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useContext, useState } from "react";
import $ from "jquery";
import { useHistory, useLocation } from "react-router-dom";
import { checkMobile } from "Config/GlobalJs";
import { authContext } from "ContextApi/Context";

const ScrollToTop = () => {
  const [state, dispatch] = useContext(authContext);
  const { pathname } = useLocation();
  const history = useHistory();
  const [locationKeys, setLocationKeys] = useState([]);

  useEffect(() => {
    // 뒷정리 함수 이용
    return history.listen((location) => {
      if (history.action === "PUSH") {
        // 리액트 내의 페이지이동
        setLocationKeys([location.key]);
      } else if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          // 앞으로 가기
          console.log("앞으로가기");
          setLocationKeys(([_, ...keys]) => keys);
        } else {
          // 뒤로 가기
          console.log("뒤로가기");
          setLocationKeys((keys) => [location.key, ...keys]);
        }
      }
    });
  }, [locationKeys, history]);

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
