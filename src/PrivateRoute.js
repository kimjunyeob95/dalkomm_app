/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { authContext } from "./ContextApi/Context";
// eslint-disable-next-line no-unused-vars
import { handleLogin } from "Config/GlobalJs";

export default function PrivateRoute({ children, ...rest }) {
  const [state] = useContext(authContext);

  if (state?.loginFlag) {
    //로그인시
    return <Route {...rest} render={({ location }) => children} />;
  } else if (!state?.loginFlag) {
    //비로그인시
    handleLogin();
    return null;
  } else return null;
}
