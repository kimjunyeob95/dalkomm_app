/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-fallthrough */
import React, { useEffect, useReducer, useState } from "react";

export const getCookieValue = (key) => {
  let cookieKey = key + "=";
  let result = "";
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === " ") {
      cookieArr[i] = cookieArr[i].substring(1);
    }

    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};

export const authContext = React.createContext();

export const indexInitialState = {
  // loginFlag: true,
  // accessToken:
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiekwva01tUFNnNTNJWEJ3RkRsRXRlZz09IiwiYXVkIjoiREFMS09NTV9BUFAiLCJ1bmlvbl91c2VyX2lkIjpudWxsLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTYzMDkxODU1MX0.uxRJ9IbC_f3FHYo38aTJdFKN0bY311K-xKumFniuzcc",
  // app_version: "3.0.0",
  // os: "ios",
  // isApp: "Y",
  // auth: "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs5YzA0N2ZiODVjMDQ2ZTNiYWIzNDAyZDIxNDVkYjFhZjQ0NTgzZDY5OzIwMjEwOTA2MTg1NTI3",
  // loginFlag: true,
  // accessToken:
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWVEyWnZ0Y2xWQ3IwOEtLRHNjZXhCd1JqTll3OXhPNEE5cHo4SHZmMXdtT3UrdHFRS0M3NGhQZE1MV1ZWRFY2TSIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6IkZ6VHZsc05hVzAvcUQvLytNYWkzUVE9PSIsImlzcyI6IkRBTEtPTU0iLCJ1c2VyX2xvZ2luX3R5cGUiOiJEIiwiaWF0IjoxNjMwOTg2MTQ2fQ.8KHrNJgbvYFPvPu6Iuwn5_rSSWk0UXPD8IuknQv0ArI",
  // app_version: "3.0.0",
  // os: "ios",
  // isApp: "Y",
  // auth: "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs1NmZmM2FkODI5YmIyMmE3YjZiYThhN2I2NjZkNDE4NmVjYzVlODM2OzIwMjEwOTA3MTM0MjA3",
  loginFlag: false,
  accessToken: "",
  app_version: "",
  os: "",
  isApp: "",
  auth: "",
  // auth: "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs1NmZmM2FkODI5YmIyMmE3YjZiYThhN2I2NjZkNDE4NmVjYzVlODM2OzIwMjEwOTA3MTM0MjA3",
};

export const indexReducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "login": {
      return {
        ...state,
        loginFlag: true,
      };
    }
    case "logout": {
      return {
        ...state,
        accessToken: "",
        app_version: "",
        os: "",
        isApp: "",
        loginFlag: false,
      };
    }
  }
};

const ContextStore = (props) => {
  const [, setLoding] = useState(false);
  useEffect(() => {
    //로그인 유지처리
    if (getCookieValue("accessToken") !== "") {
      indexInitialState.loginFlag = true;
      indexInitialState.accessToken = getCookieValue("accessToken");
      indexInitialState.app_version = getCookieValue("app_version");
      indexInitialState.os = getCookieValue("os");
      indexInitialState.isApp = getCookieValue("isApp");
      indexInitialState.auth = getCookieValue("auth");
      setLoding(true);
    } else {
      // indexInitialState.loginFlag = true;
      // indexInitialState.accessToken =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWVEyWnZ0Y2xWQ3IwOEtLRHNjZXhCd1JqTll3OXhPNEE5cHo4SHZmMXdtT3UrdHFRS0M3NGhQZE1MV1ZWRFY2TSIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6IkZ6VHZsc05hVzAvcUQvLytNYWkzUVE9PSIsImlzcyI6IkRBTEtPTU0iLCJ1c2VyX2xvZ2luX3R5cGUiOiJEIiwiaWF0IjoxNjMwOTg2MTQ2fQ.8KHrNJgbvYFPvPu6Iuwn5_rSSWk0UXPD8IuknQv0ArI";
      // indexInitialState.app_version = "3.0.0";
      // indexInitialState.os = "ios";
      // indexInitialState.isApp = "Y";
      // indexInitialState.auth = "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs1NmZmM2FkODI5YmIyMmE3YjZiYThhN2I2NjZkNDE4NmVjYzVlODM2OzIwMjEwOTA3MTM0MjA3";
      indexInitialState.auth = getCookieValue("auth");
      setLoding(true);
    }
  }, []);
  return <authContext.Provider value={useReducer(indexReducer, indexInitialState)}>{props.children}</authContext.Provider>;
};

export default ContextStore;
