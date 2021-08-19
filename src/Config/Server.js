import hmacsha1 from "hmacsha1";

export const SERVER = `https://dev-app.dalkomm.com`;

const timeStamp = () => {
  let time = new Date();
  let year = String(time.getFullYear());
  let month = String(time.getMonth() + 1)?.length > 1 ? String(time.getMonth() + 1) : "0" + String(time.getMonth() + 1);
  let day = String(time.getDate())?.length > 1 ? String(time.getDate()) : "0" + String(time.getDate());
  let hour = String(time.getHours());
  let min = String(time.getMinutes());
  let sec = String(time.getSeconds());
  return year + month + day + hour + min + sec;
};
export const headers_api = () => {
  let headers_api = {
    auth_required: `Basic ${btoa("main:dalkomm_app;" + hmacsha1("dalkomm_app" + timeStamp(), "a12345678910") + ";" + timeStamp())}`,
    token_required: "X-dalkomm-access-token",
    token_optional: "X-dalkomm-access-token",
    "Content-type": "application/json",
  };
  return headers_api;
};

export const headers_web = () => {
  let headers_web = {
    "Content-type": "text/html",
    auth_required: "",
    token_optional: "X-dalkomm-access-token",
    token_required: "X-dalkomm-access-token",
    Accept: "*/*",
  };
  return headers_web;
};
