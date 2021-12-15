/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { getCookieValue, checkMobile } from "Config/GlobalJs";
import { SERVER_DALKOMM } from "Config/Server";

export const authContext = React.createContext();

export const indexInitialState = {
  loginFlag: getCookieValue("accessToken") !== "" ? true : false,
  accessToken: getCookieValue("accessToken"),
  app_version: getCookieValue("app_version"),
  os: getCookieValue("os"),
  isApp: getCookieValue("isApp"),
  auth: getCookieValue("auth") ? getCookieValue("auth") : "",
  latitude: getCookieValue("latitude"),
  longitude: getCookieValue("longitude"),
  udid: getCookieValue("udid"),
  app_type: getCookieValue("app_type"),
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
        latitude: getCookieValue("latitude"),
        longitude: getCookieValue("longitude"),
      };
    }
  }
};

const ContextStore = (props) => {
  useEffect(() => {
    // // setCookie("Authorization", getCookieValue("auth"), { domain: "dalkomm.com" });
    // setCookie("X-DALKOMM-ACCESS-TOKEN", getCookieValue("accessToken"), { domain: "dalkomm.com" });
    // setCookie("X-DALKOMM-APP-VERSION", getCookieValue("app_version"), { domain: "dalkomm.com" });
    // setCookie("X-DALKOMM-CHANNEL", getCookieValue("app_type"), { domain: "dalkomm.com" });
    // setCookie("X-DALKOMM-STORE", getCookieValue("udid"), { domain: "dalkomm.com" });
    // setCookie("X-DALKOMM-APP-TYPE", getCookieValue("app_type"), { domain: "dalkomm.com" });

    let data = {
      callbackFunc: "nativeCallbackFcmToken",
    };
    getCookieValue("app_type");
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
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidWxIdzFDYVlEaFJSZDR2NjdsSU1PTE0wOHJaNnFFMEEyenRndXl5MTFvSkRQS2RxR3VBbm9UWUpzZEZJSHI5eiIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6InNCUFhFbnpscXkwUTNQZTQ3eVZLYnJrSnRyLzU1Y3AxUVBhQzZkZGVNTm93eDJaN2pPbzlSekdodTI4L2t3MTUiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTYzOTM5NTUxM30.116_x9aJneio-Gsv0l9rI9GI1MEn2XlVJTEps64v6r8";
  // indexInitialState.app_version = "3.0.0";
  // indexInitialState.os = "ios";
  // indexInitialState.isApp = "Y";
  // indexInitialState.auth = "Basic ZGFsa29tbTpkYWxrb21tX2FwcDtmMjQ4YWY0YTRlN2RlZDhhNDc1YmIxMzdkOTVmMDYxNzcyMTllZDAwOzIwMjExMjEzMjE0MjQ4";
  // indexInitialState.latitude = 37.507232666015625;
  // indexInitialState.longitude = 127.05642398540016;
  // indexInitialState.udid = "8280af29616a4ec1bb85a9ed17b9594e828e8140";
  // indexInitialState.app_type = "I";

  //과장님
  // indexInitialState.accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaVRYUzE2RzQ0R2lBTFV6WVZxU3oxcmxKTmFjZmNuR2prQ1BmZTRjK3ZQNklHdlA1cUF1a3VzK25IeVVUWENOKyIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6IlFwRCtZM1hoaXRFMVVFeHl3Y09qRm50b3VVWnZjdkN3QVVkUWlRSEovb1dKTmxOd0MrNjJLRmRxeFNvT1hIQTgiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTYzOTUzMTc1M30.auBLY1QzEiTUVTIegOGzkeqpebEieoKK8WaGYrx9aS8";
  // indexInitialState.auth = "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs4YmZmNTZlMWIwNGMxYzFjMWRlYWU1Y2VjNTVmYWQxMDg4ZDc3NTlkOzIwMjExMjE1MTEzMjMy";
  return <authContext.Provider value={useReducer(indexReducer, indexInitialState)}>{props.children}</authContext.Provider>;
};

export default ContextStore;
