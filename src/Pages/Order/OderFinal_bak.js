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
import HeaderSub from "Components/Header/HeaderSub";
import { Link, useHistory, useParams } from "react-router-dom";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";
import { finalOrderHtml } from "Config/GlobalJs";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";

export default function OderFinal_bak() {
  const history = useHistory();
  const { smartOrderSeq } = useParams();
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const body = {};
  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
    },
  };
  useEffect(() => {
    axios.all([axios.get(`${SERVER_DALKOMM}/app/web/smartorder/order/${smartOrderSeq}`, header_config)]).then(
      axios.spread((res1) => {
        let res1_data = res1.data;
        console.log(res1_data);
        // eslint-disable-next-line no-useless-escape
        res1_data = res1.data.replace(/^(\<head\>)(.*)(\<\/head\>)/gims, "");
        res1_data = res1_data.replace(
          /^(\$\(document\)\.on\('touchstart', '#back)(.*)(document.frmOrder.submit\(\);)/gims,
          "$(document).ready(function(){//치환자리"
        );
        res1_data = res1_data.replace(
          /^(\$\(document\)\.on\('click', '.pay-method)(.*)(\.val\(payMethodValue\));/gims,
          "$(document).ready(function(){//치환자리"
        );
        res1_data = res1_data.replace(/^(\<script)(.*)(\<\/script\>)/gim, "");
        res1_data = res1_data.replace(/^(    FastClick.attach)(.*)(\.parent\(\)\.click\(\);)/gims, "");
        setData(true);
        $("#finalOrder").html(res1_data);
        $("#btn-user-save").remove();
        $("#store-mobile").remove();
        $("#affiliate").parent().remove();
        finalOrderHtml();
        $("#back").click(function () {
          history.goBack();
        });
        $("#pay").click(function () {});
      })
    );
  }, [state?.auth]);
  const handleOrder = () => {
    alert("주문하기 버튼 클릭");
    history.push("/order");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // contGap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMembership = () => {
    history.push("/order/membership");
  };
  if (axioData) {
    return <div id="finalOrder"></div>;
  } else return <React.Fragment></React.Fragment>;
}
