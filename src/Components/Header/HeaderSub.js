import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function HeaderSub({
  redirectBack,
  title,
  PathName,
  type,
  icon,
  location,
  noBack,
  className,
  btnType,
  blindClass,
  headerPopup,
  popTarget,
}) {
  const history = useHistory();
  const handleShare = (e) => {
    alert("공유하기 버튼");
  };
  return (
    <header id="header" className={`header ${className && className}`}>
      {title && !blindClass && PathName !== "detail" ? (
        <h1 className="page-title">{title}</h1>
      ) : title && !blindClass && PathName === "detail" ? (
        <h1 className="page-title">
          <span className="blind">{title}</span>
        </h1>
      ) : (
        <h1>
          <span className="blind">{title}</span>
        </h1>
      )}

      {redirectBack && (
        <Link to={location} className="btn back">
          <i className="ico back">
            <span className="blind">뒤로</span>
          </i>
        </Link>
      )}
      {!noBack && !redirectBack && (
        <button type="button" className="btn back" onClick={() => history.goBack()}>
          <i className="ico back">
            <span className="blind">뒤로</span>
          </i>
        </button>
      )}
      {btnType === "share" && (
        <div className={`btn-area ${type === "flexCenter" && "flex-center"}`}>
          <button className="btn" onClick={(e) => handleShare(e.currentTarget)}>
            <i className={`ico ${icon}`}>
              <span>{title}</span>
            </i>
          </button>
        </div>
      )}
      {btnType !== "share" && location && !headerPopup && (
        <div className={`btn-area ${type === "flexCenter" && "flex-center"}`}>
          <Link to={location} className="btn">
            <i className={`ico ${icon}`}>
              <span>{title}</span>
            </i>
          </Link>
        </div>
      )}
      {headerPopup && popTarget && (
        <div className="btn-area">
          <button type="button" className="btn open-pop" pop-target="#drinkDelete">
            <i className="ico trash">
              <span>메뉴삭제하기</span>
            </i>
          </button>
        </div>
      )}
    </header>
  );
}
