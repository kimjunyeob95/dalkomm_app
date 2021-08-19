import React, { useEffect, useContext } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { authContext } from "ContextApi/Context";

export default function Login() {
  let Location = useLocation();
  let history = useHistory();
  const [, dispatch] = useContext(authContext);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // console.log(Location);
  }, []);
  let { from } = Location.state || { from: { pathname: "/" } };
  const fnLogin = () => {
    dispatch({
      type: "login",
      id: 1,
    });
    history.replace(from);
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>로그인페이지</p>
        <button onClick={() => fnLogin()}>로그인</button>
        <Link to="/" style={{ color: "white" }}>
          메인페이지 이동
        </Link>
      </header>
    </div>
  );
}
