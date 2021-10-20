/* eslint-disable no-useless-escape */
/* eslint-disable no-regex-spaces */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

export default function MyFavoriteMenu() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(true);
  const history = useHistory();

  const body = {};
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios.all([axios.get(`${SERVER_DALKOMM}/app/web/favorite/menu/list`, header_config)]).then(
      axios.spread((res1) => {
        let res1_data = res1.data;
        // eslint-disable-next-line no-useless-escape
        res1_data = res1.data.replace(/^(\ <script\>)(.*)(\    <\/script\>)/gims, "");
        res1_data = res1_data.replace(/^(\<script)(.*)(\<\/script\>)/gims, "");
        $("#favoriteWrap").html(res1_data);
        $("#favoriteWrap link").remove();
        $("#favoriteWrap meta").remove();
        $("#favoriteWrap title").remove();
      })
    );
  }, [state?.auth]);

  return <div id="favoriteWrap"></div>;
}
