import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function HeaderSub({ title, type, icon, location, noBack, className, btnType, blindClass }) {
  const history = useHistory();
  return (
    <header id="header" className={`header ${className && className}`}>
      {title && !blindClass ? (
        <h1 className="page-title">{title}</h1>
      ) : (
        <h1 className="page-title">
          <span className="blind">{title}</span>
        </h1>
      )}

      {!noBack && (
        <button type="button" className="btn back" onClick={() => history.goBack()}>
          <i className="ico back">
            <span className="blind">뒤로</span>
          </i>
        </button>
      )}
      {btnType === "share" && (
        <div className={`btn-area ${type === "flexCenter" && "flex-center"}`}>
          <Link to="#" className="btn">
            <i className={`ico ${icon}`}>
              <span>{title}</span>
            </i>
          </Link>
        </div>
      )}
      {btnType !== "share" && location && (
        <div className={`btn-area ${type === "flexCenter" && "flex-center"}`}>
          <Link to={location} className="btn">
            <i className={`ico ${icon}`}>
              <span>{title}</span>
            </i>
          </Link>
        </div>
      )}
    </header>
  );
}
