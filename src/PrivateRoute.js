/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import { Route } from "react-router-dom";
import { authContext } from "./ContextApi/Context";
// eslint-disable-next-line no-unused-vars
import { checkMobile, handleLogin } from "Config/GlobalJs";

export default function PrivateRoute({ children, ...rest }) {
  const [state] = useContext(authContext);
  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   setTimeout(() => {
  //     setLoading(true);
  //   }, 100);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.loginFlag]);

  if (state?.loginFlag) {
    //로그인시
    return <Route {...rest} render={({ location }) => children} />;
  } else if (!state?.loginFlag) {
    //비로그인시
    handleLogin();
    return null;
  } else return null;
}
