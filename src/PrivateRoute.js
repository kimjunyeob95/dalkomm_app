/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "./ContextApi/Context";
// eslint-disable-next-line no-unused-vars
import { checkMobile } from "Config/GlobalJs";

export default function PrivateRoute({ children }) {
  const [state] = useContext(authContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimeout(() => {
      setLoading(true);
    }, 100);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loginFlag]);
  if (loading && state?.loginFlag) {
    return <Route render={({ location }) => children} />;
  } else if (loading && !state?.loginFlag) {
    try {
      if (checkMobile() === "android") {
        window.android.fn_login();
      } else if (checkMobile() === "ios") {
        window.webkit.messageHandlers.fn_login.postMessage("");
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  } else return null;
}
