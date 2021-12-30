/* eslint-disable no-useless-escape */
import $ from "jquery";
export function checkMobile() {
  var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
  if (varUA.indexOf("android") > -1) {
    //안드로이드
    return "android";
  } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("mac") > -1) {
    //IOS
    return "ios";
  } else {
    //아이폰, 안드로이드 외
    return "android";
  }
}

export const get_categoryName = (name) => {
  switch (name) {
    case "추천메뉴":
      return "추천";
    case "베이커리":
      return "베이커리/MD";
    default:
      return name;
  }
};
export const fn_memberName = (level) => {
  let result = level === 0 ? "SILVER" : level === 1 ? "GOLD" : level === 2 ? "PLATINUM" : "";
  return result;
};

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

export const globalAppendScript = (scriptHtml) => {
  const script_tag = document.createElement("script");
  script_tag.innerHTML = scriptHtml;
  script_tag.type = "text/javascript";
  script_tag.async = "async";
  script_tag.className = "reactScript";
  document.head.appendChild(script_tag);
};

export const handleLogin = (e) => {
  try {
    if (checkMobile() === "android") {
      window.android.fn_login();
    } else if (checkMobile() === "ios") {
      window.webkit.messageHandlers.fn_login.postMessage("");
    }
  } catch (error) {
    console.log(error);
  }
};

export const globalRemoveScript = (scriptClass) => {
  $(scriptClass).remove();
};

export function getParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(window.location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function fadeOut() {
  setTimeout(() => {
    $("#content").removeClass("fade-in").addClass("fade-out");
  }, 100);
}
export function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
    ...options,
  };
  if (options.expires) {
    var date = new Date();
    date.setDate(date.getDate() + options.expires);
    options.expires = date.toGMTString();
  }

  let updatedCookie = "";
  if (name === "Authorization" || name === "auth") {
    updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/gi, " ");
  } else {
    updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  }

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  window.document.cookie = updatedCookie + ";";
}
