import React from "react";
import { getCookieValue } from "Config/GlobalJs";

export default function DevTest() {
  return (
    <div style={{ wordBreak: "break-all" }}>
      {/* <p> 서버 : 개발망</p>
      <br /> */}
      <p> 개발자 : 김준엽</p>
      <br />
      <p> 기획자 : 예원숭이</p>
      <br />
      <p> 사용하시기에 편하시나요?</p>
      <br />
      <p> Authorization : {getCookieValue("Authorization")}</p>
      <br />
      <p> X-DALKOMM-ACCESS-TOKEN : {getCookieValue("X-DALKOMM-ACCESS-TOKEN")}</p>
      <br />
      <p> X-DALKOMM-APP-VERSION : {getCookieValue("X-DALKOMM-APP-VERSION")}</p>
      <br />
      <p> udid : {getCookieValue("udid")}</p>
      <br />
    </div>
  );
}
