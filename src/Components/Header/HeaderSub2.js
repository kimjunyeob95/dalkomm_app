import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function HeaderSub2({ title, type, icon, location, noBack, location2, icon2 }) {
  const history = useHistory();
  return (
    <header id="header" className="header">
      <h1 className="page-title">{title}</h1>
      {!noBack && (
        <button type="button" className="btn back" onClick={() => history.goBack()}>
          <i className="ico back">
            <span className="blind">뒤로</span>
          </i>
        </button>
      )}

      <div className={`btn-area ${type === "flexCenter" && "flex-center"}`}>
        <Link to={location} className="btn">
          <i className={`ico ${icon}`}>
            <span>{title}</span>
          </i>
        </Link>

        <Link to={location2} className="btn">
          <i className={`ico ${icon2}`}>
            <span>{title}</span>
          </i>
        </Link>
      </div>
    </header>
  );
}
