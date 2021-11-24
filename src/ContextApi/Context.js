/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { getCookieValue, checkMobile, setCookie } from "Config/GlobalJs";
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
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVTFTb0I4TXhTUWxMREc0YmtWUjBmRFB0UkxnaTRtd05pK0wwQjJMb1Q2Z3lUallKQlRHcnhkeElmYVZEZHRwQSIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6InE3bEU3SHFKdUdWbEhjNDhld21FOThyRUhaQ1lXU09tcVpXZFFtUEZlUTdJTkNZbXBmaFJxckZjcXNjdDRPRngiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTYzMzQ4NDQxMn0.ZdVygbo7m5kIL4HQXeyUM0UplkyveQtV6ZjUGg4r61Q";
  // indexInitialState.app_version = "3.0.0";
  // indexInitialState.os = "ios";
  // indexInitialState.isApp = "Y";
  // indexInitialState.auth = "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs3NWEzMjRkMTNkY2FjYjM1ZjhkODc0MjZjZDRjYjAyODExZTBkYTM1OzIwMjExMDA2MTEzOTU0";
  // indexInitialState.latitude = 37.507232666015625;
  // indexInitialState.longitude = 127.05642398540016;
  // indexInitialState.udid = "8280af29616a4ec1bb85a9ed17b9594e828e8140";

  //과장님
  // indexInitialState.accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicTcvOWVvUzBHQ0VQaEpNd3RVdGV0eEFsb01yMU8ybWszMVJOYVVWTWw2K01SZC9EN0NWd2RoeWcvKzBIa3pmUyIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6IlVCaHdLUXN4bEY0STkrd3h6UDJic081WklLSDd2NTlsYmExN2RaTldTdVZYZ25wRVNXNllQNG50OUNVY1haR0MiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTYzNjQzMzA2MX0.UQrIN1JkdpuTWWf8eUMUboLyuLsALOh_qIQpSPJQzps";
  // indexInitialState.auth = "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs4ZWI0YTAzOGI2ZmQ2Y2ZlNDMzOTQ2ODhmMDExOWFjMmQwYjg4ZTllOzIwMjExMTA5MTIzNzEx";
  return <authContext.Provider value={useReducer(indexReducer, indexInitialState)}>{props.children}</authContext.Provider>;
};

export default ContextStore;
