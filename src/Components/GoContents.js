import React from "react";
import { Link } from "react-router-dom";

export default function GoContents() {
  return (
    <div className="skip-nav">
      <Link to="#content">본문 바로가기</Link>
    </div>
  );
}
