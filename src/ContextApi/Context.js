/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { getCookieValue, checkMobile, setCookie } from "Config/GlobalJs";
import { SERVER_DALKOMM } from "Config/Server";
const fn_product = () => {
  setCookie("loginFlag", true, { expires: 1000 });
  // setCookie(
  //   "accessToken",
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTkdwcW1nRERua0szL25JVXlXODF1UT09IiwiYXVkIjoiREFMS09NTV9BUFAiLCJ1bmlvbl91c2VyX2lkIjpudWxsLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTY0NzkxNDMwOH0.qeYlULikRWtE3VZwoqa9NfrVKVAk5hqxexFVRu8hnfU",
  //   {
  //     expires: 1000,
  //   }
  // );
  setCookie(
    "accessToken",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidWxIdzFDYVlEaFJSZDR2NjdsSU1PTE0wOHJaNnFFMEEyenRndXl5MTFvSkRQS2RxR3VBbm9UWUpzZEZJSHI5eiIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6InNCUFhFbnpscXkwUTNQZTQ3eVZLYnJrSnRyLzU1Y3AxUVBhQzZkZGVNTm93eDJaN2pPbzlSekdodTI4L2t3MTUiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTYzOTM5NTUxM30.116_x9aJneio-Gsv0l9rI9GI1MEn2XlVJTEps64v6r8",
    { expires: 1000 }
  );
  setCookie("app_version", "3.0.0", { expires: 1000 });
  setCookie("os", "ios", { expires: 1000 });
  setCookie("isApp", "Y", { expires: 1000 });
  setCookie("auth", "Basic ZGFsa29tbTpkYWxrb21tX2FwcDtmMjQ4YWY0YTRlN2RlZDhhNDc1YmIxMzdkOTVmMDYxNzcyMTllZDAwOzIwMjExMjEzMjE0MjQ4", { expires: 1000 });
  // setCookie("auth", "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs3MmU5YzdiY2NmMDE5OWRlOTFjMDdiYjdiY2MxNDMxOGM0ZWMwYzYxOzIwMjIwMzIyMTE1OTI4", { expires: 1000 });
  setCookie("latitude", 37.507232666015625, { expires: 1000 });
  setCookie("longitude", 127.05642398540016, { expires: 1000 });
  setCookie("udid", "8280af29616a4ec1bb85a9ed17b9594e828e8140", { expires: 1000 });
  // setCookie("udid", "A8450275-40C7-45A7-9640-C8D658E51401", { expires: 1000 });
  setCookie("app_type", "I", { expires: 1000 });
};

const fn_dev = () => {
  setCookie("loginFlag", true, { expires: 1000 });
  setCookie(
    "accessToken",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicnlzQTJGdFg1aFNiSDI1NW9YdkJUdjZ4TXRLRUxybFBZb2l1WFJORDdjWGxzd2pYNVQvYlQrRWFtc20xUHkzTiIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6IllaZG40TUNIc0NRTDlOejFtTFEweUsrcVB6alZrdWNaUzdqdmtkdHI3T2dCcWJ6alBERVJnZEFYN25zU0MwMkoiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTY0ODAxNjU4M30.6jdC5fuW7bqevpafG9-1DB1JwSREueLCC0wRFA_dh8o",
    { expires: 1000 }
  );
  setCookie("app_version", "3.0.0", { expires: 1000 });
  setCookie("os", "ios", { expires: 1000 });
  setCookie("isApp", "Y", { expires: 1000 });
  setCookie("auth", "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs3NDk0Mjk2OTNlMDUwMzRiZTI3YmQ2NThmYWMyOTQ3MGRmN2U5NmNiOzIwMjIwMzIzMTg1NTQx", { expires: 1000 });
  setCookie("latitude", 37.507232666015625, { expires: 1000 });
  setCookie("longitude", 127.05642398540016, { expires: 1000 });
  setCookie("udid", "A0F21C7B-3FDA-48A6-AA1D-07490E7916A4", { expires: 1000 });
  setCookie("app_type", "I", { expires: 1000 });
};

const fn_dev_ex = () => {
  //구회원
  setCookie("loginFlag", true, { expires: 1000 });
  setCookie(
    "accessToken",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiS1F1Sk1IdnhCNzVCU3J1V2JlNmlvUT09IiwiYXVkIjoiREFMS09NTV9BUFAiLCJ1bmlvbl91c2VyX2lkIjpudWxsLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTY0ODAxMzk2NH0.-5jcCH1b-lvpYam-do2pRjio3kHkzbl8q4wB7bhnGpM",
    { expires: 1000 }
  );
  setCookie("app_version", "3.0.0", { expires: 1000 });
  setCookie("os", "ios", { expires: 1000 });
  setCookie("isApp", "Y", { expires: 1000 });
  setCookie("auth", "Basic ZGFsa29tbTpkYWxrb21tX2FwcDs5ZjYzNDQ1ODQyOGI5NGQ4MzUwYzY2ZTk5YzRlMzg1YmRmNjJiZTZlOzIwMjIwMzIzMTUzOTM4", { expires: 1000 });
  setCookie("latitude", 37.507232666015625, { expires: 1000 });
  setCookie("longitude", 127.05642398540016, { expires: 1000 });
  setCookie("udid", "A0F21C7B-3FDA-48A6-AA1D-07490E7916A4", { expires: 1000 });
  setCookie("app_type", "I", { expires: 1000 });
};

//fn_dev();

export const authContext = React.createContext();

export const indexInitialState = {
  loginFlag: getCookieValue("accessToken") !== "" ? true : false,
  accessToken: getCookieValue("accessToken"),
  app_version: checkMobile() === "android" ? "64" : getCookieValue("app_version"),
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
  //상용
  //김준엽
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

  //dev
  // indexInitialState.accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVTFTb0I4TXhTUWxMREc0YmtWUjBmRFB0UkxnaTRtd05pK0wwQjJMb1Q2Z3lUallKQlRHcnhkeElmYVZEZHRwQSIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6InE3bEU3SHFKdUdWbEhjNDhld21FOThyRUhaQ1lXU09tcVpXZFFtUEZlUTdJTkNZbXBmaFJxckZjcXNjdDRPRngiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTY0MDA0OTY2Mn0.OYjLsuDZpQL0-NPu70HbNQb-3w6wxYzeEv4SZOT7YE8";
  // indexInitialState.app_version = "3.0.1";
  // indexInitialState.auth = "Basic ZGFsa29tbTpkYWxrb21tX2FwcDszNjdjZjUxMjFkM2I3NTc5ZGVlMDA3YTliODcwNTJiYmU3ZDNhNmY2OzIwMjExMjIxMTEyMDM2";
  // indexInitialState.udid = "A0F21C7B-3FDA-48A6-AA1D-07490E7916A4";

  //오선민과장님
  // indexInitialState.accessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaVRYUzE2RzQ0R2lBTFV6WVZxU3oxcmxKTmFjZmNuR2prQ1BmZTRjK3ZQNklHdlA1cUF1a3VzK25IeVVUWENOKyIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6IlFwRCtZM1hoaXRFMVVFeHl3Y09qRm50b3VVWnZjdkN3QVVkUWlRSEovb1dKTmxOd0MrNjJLRmRxeFNvT1hIQTgiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTY0MjQ2ODY5OX0.R-tJm3aeyhcrVWy85Z23y1gMH-y1-VPY3OP-OG93p7o";
  // indexInitialState.app_version = "3.0.1";
  // indexInitialState.auth = "Basic ZGFsa29tbTpkYWxrb21tX2FwcDthNzI4ZWI2MWE1ZjYxMjI5ZjFiOWE5NjBjZTI0YjI2ZmY2YTk0NzNhOzIwMjIwMTE4MTExOTU4";
  // indexInitialState.udid = "55644711-703B-467E-B0E6-B3D242D9E67C";

  return <authContext.Provider value={useReducer(indexReducer, indexInitialState)}>{props.children}</authContext.Provider>;
};

export default ContextStore;
