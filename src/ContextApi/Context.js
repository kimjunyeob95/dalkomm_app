/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-fallthrough */
import React, { useEffect, useReducer, useState } from "react";
import { getCookieValue } from "Config/GlobalJs";

export const authContext = React.createContext();

export const indexInitialState = {
  loginFlag: false,
  accessToken: getCookieValue("accessToken"),
  app_version: getCookieValue("app_version"),
  os: getCookieValue("os"),
  isApp: getCookieValue("isApp"),
  auth: "",
  latitude: getCookieValue("latitude"),
  longitude: getCookieValue("longitude"),
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
        loginFlag: false,
      };
    }
    case "changeAuth": {
      return {
        ...state,
        auth: action.auth,
      };
    }
    case "changeLocation": {
      return {
        ...state,
        // latitude: 37.507232666015625,
        // longitude: 127.05642398540016,
        latitude: getCookieValue("latitude"),
        longitude: getCookieValue("longitude"),
      };
    }
  }
};

const ContextStore = (props) => {
  const [loading, setLoding] = useState(false);
  useEffect(() => {
    //로그인 유지처리

    if (getCookieValue("accessToken") !== "") {
      indexInitialState.loginFlag = true;
    } else {
      // indexInitialState.loginFlag = true;
      // indexInitialState.accessToken =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWVEyWnZ0Y2xWQ3IwOEtLRHNjZXhCd1JqTll3OXhPNEE5cHo4SHZmMXdtT3UrdHFRS0M3NGhQZE1MV1ZWRFY2TSIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6IkZ6VHZsc05hVzAvcUQvLytNYWkzUVE9PSIsImlzcyI6IkRBTEtPTU0iLCJ1c2VyX2xvZ2luX3R5cGUiOiJEIiwiaWF0IjoxNjMwOTg2MTQ2fQ.8KHrNJgbvYFPvPu6Iuwn5_rSSWk0UXPD8IuknQv0ArI";
      // indexInitialState.app_version = "3.0.0";
      // indexInitialState.os = "ios";
      // indexInitialState.isApp = "Y";
      // indexInitialState.auth = "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs1NmZmM2FkODI5YmIyMmE3YjZiYThhN2I2NjZkNDE4NmVjYzVlODM2OzIwMjEwOTA3MTM0MjA3";
      // indexInitialState.latitude = 37.507232666015625;
      // indexInitialState.longitude = 127.05642398540016;
      // indexInitialState.loginFlag = true;
      // indexInitialState.accessToken =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQmpkV3NKdVVVNHJIVy9CN2FrZS9keFdNbE94akl6Smp6MzZlUHBhUmhtcEZ1ZmhXcHZEdHdkQ3dlcjJLRlhrMiIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6InNSY0xWTUJreVpwczJPdmpETDhTeUJiOHR0MzBmN0REZ0Zua2RiMDl0UGx6eTlPSkFwWFBJdkhQZG5Rck5najAiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTYzMzQxMTgxNn0.XIgtHw1_81DbpgHXSiNzIG3i-drPgGnIMBKv03hmh2c";
      // indexInitialState.app_version = "3.0.0";
      // indexInitialState.os = "ios";
      // indexInitialState.isApp = "Y";
      // indexInitialState.auth = "Basic ZGFsa29tbTpkYWxrb21tX2FwcDtiMzlmMjk5YzUxNDkwY2FiZTg0ZTFjNmFiODUyZGZmYTQwZTA3OGEzOzIwMjExMDA1MTUyOTUx";
      // indexInitialState.latitude = 37.507232666015625;
      // indexInitialState.longitude = 127.05642398540016;
    }
    indexInitialState.auth = getCookieValue("auth");
    setLoding(true);
  }, [loading]);

  return <authContext.Provider value={useReducer(indexReducer, indexInitialState)}>{props.children}</authContext.Provider>;
};

export default ContextStore;
