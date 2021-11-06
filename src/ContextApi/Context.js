/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { getCookieValue, checkMobile } from "Config/GlobalJs";
import { SERVER_DALKOMM } from "Config/Server";

export const authContext = React.createContext();

export const indexInitialState = {
  loginFlag: getCookieValue("accessToken") !== "" ? true : false,
  accessToken: getCookieValue("accessToken"),
  app_version: getCookieValue("app_version"),
  os: getCookieValue("os"),
  isApp: getCookieValue("isApp"),
  auth: getCookieValue("auth"),
  latitude: getCookieValue("latitude"),
  longitude: getCookieValue("longitude"),
  udid: getCookieValue("udid"),
  fcmToken: "",
};

export const indexReducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "login": {
      return {
        ...state,
        accessToken: getCookieValue("accessToken"),
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
    let data = {
      callbackFunc: "nativeCallbackFcmToken",
    };
    data = JSON.stringify(data);

    let header_config = {
      headers: {
        "X-dalkomm-access-token": getCookieValue("accessToken"),
        Authorization: getCookieValue("auth"),
        "X-DALKOMM-STORE": getCookieValue("udid"),
        "X-dalkomm-app-type": checkMobile() === "android" ? "A" : "I",
        "X-dalkomm-app-version": getCookieValue("app_version"),
      },
    };

    setTimeout(() => {
      try {
        if (checkMobile() === "android") {
          window.android.fn_fcmToken(data);
        } else if (checkMobile() === "ios") {
          window.webkit.messageHandlers.fn_fcmToken.postMessage(data);
        }
        //fcmUser 토큰 처리
        if (getCookieValue("accessToken") !== "") {
          setTimeout(() => {
            axios
              .all([
                axios.post(
                  `${SERVER_DALKOMM}/app/api/v2/push/token/update`,
                  {
                    push_token: window.nativeCallbackFcmToken(),
                    udid: getCookieValue("udid"),
                  },
                  header_config
                ),
              ])
              .then(axios.spread((res1) => {}));
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    }, 500);
  }, []);

  // indexInitialState.loginFlag = true;
  // indexInitialState.accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVTFTb0I4TXhTUWxMREc0YmtWUjBmRFB0UkxnaTRtd05pK0wwQjJMb1Q2Z3lUallKQlRHcnhkeElmYVZEZHRwQSIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6InE3bEU3SHFKdUdWbEhjNDhld21FOThyRUhaQ1lXU09tcVpXZFFtUEZlUTdJTkNZbXBmaFJxckZjcXNjdDRPRngiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTYzMzQ4NDQxMn0.ZdVygbo7m5kIL4HQXeyUM0UplkyveQtV6ZjUGg4r61Q";
  // indexInitialState.app_version = "3.0.0";
  // indexInitialState.os = "ios";
  // indexInitialState.isApp = "Y";
  // indexInitialState.auth = "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs3NWEzMjRkMTNkY2FjYjM1ZjhkODc0MjZjZDRjYjAyODExZTBkYTM1OzIwMjExMDA2MTEzOTU0";
  // indexInitialState.latitude = 37.507232666015625;
  // indexInitialState.longitude = 127.05642398540016;
  // indexInitialState.udid = "8280af29616a4ec1bb85a9ed17b9594e828e8140";
  //다운씨
  // indexInitialState.loginFlag = false;
  // indexInitialState.accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWx3bWYzRlRQL0htaWNOUlJNLzZGRTM4MnFrUVBGc2F4Rzl4dUsvRnVNYnAzeHY3cnIvUzNKemUwUzBPaHZ4ZiIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6IkFKS1FNZnFNZmhodDJMVWwyTE1kNlcxbkhuVU9WaGVCa0Ewd3J2RC9VSEZnTm9lTEV2bE4wRk9WOGdmVTBJbnYiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTYzNTkxNDY5OX0.4Bmu0APqRj6SHAk3rkDEpy2NefVOPLEzNth_3IUkG6E";
  // indexInitialState.app_version = "3.0.0";
  // indexInitialState.os = "ios";
  // indexInitialState.isApp = "Y";
  // indexInitialState.auth = "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs5N2RjM2RmMzRmMzM5MzM1ZjFiMWE3YTE1OWY2YmM3MzI1ZTViMzVkOzIwMjExMTAzMTQ0NDM3";
  // indexInitialState.latitude = 37.507232666015625;
  // indexInitialState.longitude = 127.05642398540016;
  // indexInitialState.udid = "8280af29616a4ec1bb85a9ed17b9594e828e8140";

  return <authContext.Provider value={useReducer(indexReducer, indexInitialState)}>{props.children}</authContext.Provider>;
};

export default ContextStore;
