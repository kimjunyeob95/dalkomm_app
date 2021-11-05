import React, { useContext } from "react";
import { authContext } from "ContextApi/Context";

export default function DevTest() {
  const [state] = useContext(authContext);
  return (
    <div style={{ wordBreak: "break-all" }}>
      <p> accessToken : {state?.accessToken}</p>
      <br />
      <p> auth : {state?.auth}</p>
      <br />
    </div>
  );
}
