import React, { useContext } from "react";
import { authContext } from "ContextApi/Context";
import { getCookieValue } from "Config/GlobalJs";

export default function DevTest() {
  const [state] = useContext(authContext);

  return (
    <div style={{ wordBreak: "break-all" }}>
      <p> X-DALKOMM-AUTH-TOKEN : {getCookieValue("X-DALKOMM-AUTH-TOKEN")}</p>
      <br />
      <p> Authorization : {getCookieValue("Authorization")}</p>
      <br />
      <p> X-DALKOMM-ACCESS-TOKEN : {getCookieValue("X-DALKOMM-ACCESS-TOKEN")}</p>
      <br />
      <p> X-DALKOMM-APP-VERSION : {getCookieValue("X-DALKOMM-APP-VERSION")}</p>
      <br />
      <p> auth : {state?.auth}</p>
      <br />
    </div>
  );
}
