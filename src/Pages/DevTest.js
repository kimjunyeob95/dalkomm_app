import React from "react";
import { getCookieValue } from "Config/GlobalJs";

export default function DevTest() {
  const nowTime = new Date().getTime();
  return (
    <div style={{ wordBreak: "break-all" }}>
      {/* <p> 서버 : 개발망</p>
      <br /> */}
      <p> 개발자 : 김준엽</p>
      <br />
      <p> Authorization : {getCookieValue("Authorization")}</p>
      <br />
      <p> X-DALKOMM-ACCESS-TOKEN : {getCookieValue("X-DALKOMM-ACCESS-TOKEN")}</p>
      <br />
      <p> X-DALKOMM-APP-VERSION : {getCookieValue("X-DALKOMM-APP-VERSION")}</p>
      <br />
      <p> udid : {getCookieValue("udid")}</p>
      <br />
      <p> nowTime : {nowTime}</p>
      <br />
      <p> nowTime : {nowTime}</p>
      <br />
      <p> nowTime : {nowTime}</p>
      <br />
      <p> action_heart : {getCookieValue("action_heart")}</p>
      <br />
      <p> action_water : {getCookieValue("action_water")}</p>
      <br />
      <p> action_sunshine : {getCookieValue("action_sunshine")}</p>
      <br />
    </div>
  );
}
