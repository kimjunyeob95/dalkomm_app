/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-fallthrough */
import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";

export const authContext = React.createContext();

export const indexInitialState = {
  loginFlag: false,
  id: "",
};

export const indexReducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "login": {
      return {
        loginFlag: true,
        id: action.id,
      };
    }
    case "loginout": {
      return {
        loginFlag: false,
        id: "",
      };
    }
  }
};

const ContextStore = (props) => {
  const [, setLoding] = useState(false);
  useEffect(() => {
    //로그인 유지처리
    axios.post(`https://scoreoflegends.com/api/v1/getMyInfo?seq=1`).then((res) => {
      if (res.data.info !== null && res.data.info !== undefined) {
        indexInitialState.loginFlag = true;
        indexInitialState.id = 1;
      }
      setLoding(true);
    });
  }, []);
  return <authContext.Provider value={useReducer(indexReducer, indexInitialState)}>{props.children}</authContext.Provider>;
};

export default ContextStore;
