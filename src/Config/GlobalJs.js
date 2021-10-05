import $ from "jquery";
export function checkMobile() {
  var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

  if (varUA.indexOf("android") > -1) {
    //안드로이드
    return "android";
  } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
    //IOS
    return "ios";
  } else {
    //아이폰, 안드로이드 외
    return "android";
  }
}

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

export const globalRemoveScript = (scriptClass) => {
  $(scriptClass).remove();
};
