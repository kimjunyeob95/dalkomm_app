/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-script-url */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import Popup_cancleMembership from "Components/Popup/Popup_cancleMembership";

import { authContext } from "ContextApi/Context";
import { SERVER_DALKOMM } from "Config/Server";

export default function OrderMembership() {
  const [state, dispatch] = useContext(authContext);
  const [axioData, setData] = useState(true);
  const [memberData, setMember] = useState({ agree: false });
  const history = useHistory();
  const { smartOrderSeq } = useParams();
  const { frontValue } = useLocation();
  const [FrontData, setFront] = useState(frontValue);

  const body = {};
  const header_config = {
    headers: {
      "X-dalkomm-access-token": state?.accessToken,
      Authorization: state?.auth,
    },
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios.all([axios.post(`${SERVER_DALKOMM}/app/web/smartorder/order/${Number(smartOrderSeq)}/kt/new`, body, header_config)]).then(
      axios.spread((res1) => {
        let membershipData = res1.data.data;
        setData((origin) => {
          return {
            ...origin,
            membershipData,
          };
        });
      })
    );
  }, []);
  useEffect(() => {
    contGap();
  }, [axioData]);

  const handleConfirm = () => {
    if ($("#birthday").val() === "") {
      alert("생년월일을 입력해주세요.");
      $("#birthday").focus();
      return false;
    }
    if ($("#membershipCard").val() === "") {
      alert("멤버십 카드번호를 입력해주세요.");
      $("#membershipCard").focus();
      return false;
    }
    let body = {
      birth_day: String($("#birthday").val()),
      card_no: String($("#membershipCard").val()),
      is_save: $("#membershipSave").is(":checked"),
    };
    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/order/${Number(smartOrderSeq)}/kt/point`, body, header_config)]).then(
      axios.spread((res1) => {
        if (res1.data.meta.code === 20000) {
          alert(`사용 가능한 포인트는 ${res1.data.data.point} 입니다.`);
        } else {
          alert(res1.data.meta.msg);
        }
      })
    );
  };

  const handleSaveAgree = () => {
    $("body").removeClass("modal-opened");
    $("#popupMembership").removeClass("active");
    $("#membershipSave").prop("checked", true);
    setMember({ agree: true });
  };

  const handleNotAgree = (type) => {
    if (type === "아니오") {
      setMember({ agree: true });
      $("#membershipSave").prop("checked", true);
    } else if (type === "네") {
      let body = {
        card_no: String($("#membershipCard").val()),
        orderinfo_id: Number(smartOrderSeq),
      };
      axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/kt/delete`, body, header_config)]).then(
        axios.spread((res1) => {
          if (res1.data.meta.code === 20000) {
            alert("저장된 멤버십 정보가 삭제되었습니다.");
            setMember({ agree: false });
            $("#membershipSave").prop("checked", false);
            $("#birthday").val("");
            $("#membershipCard").val("");
          } else {
            alert(res1.data.meta.msg);
          }
        })
      );
    }
    $("body").removeClass("modal-opened");
    $("#popupMembership").removeClass("active");
  };

  const handleSubmit = () => {
    // return console.log(FrontData?.menuQuantity);
    let body = {
      card_no: String($("#membershipCard").val()),
      birth_day: String($("#birthday").val()),
      is_save: $("#membershipSave").is(":checked"),
    };

    axios.all([axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/order/${smartOrderSeq}/kt`, body, header_config)]).then(
      axios.spread((res1) => {
        console.log(res1);
        if (res1.data.meta.code === 20000) {
          history.push({
            pathname: `/order/final/${smartOrderSeq}`,
            frontValue: { ...FrontData },
          });
        } else {
          alert(res1.data.meta.msg);
        }
      })
    );
  };

  const handleCancle = () => {
    $("#resAlert").text("필수 정보는 모두 입력해 주세요.");
    $(".overlay.popupExitJoin").addClass("active");
    $("body").addClass("modal-opened");
  };

  const handleBack = () => {
    history.push({
      pathname: `/order/final/${smartOrderSeq}`,
      frontValue: { ...FrontData },
    });
  };

  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />
        <div id="wrap" className="wrap">
          <div id="container" className="container">
            <header id="header" className="header undefined">
              <h1 className="page-title">KT 멤버십 제휴 할인</h1>
              <a className="btn back" onClick={(e) => handleBack(e.currentTarget)}>
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </a>
            </header>

            <div id="content" className="membership discount">
              <div className="form-wrap">
                <form className="form">
                  <fieldset className="fieldset">
                    <div className="w-inner">
                      <div className="field">
                        <span className="label">KT 멥버십 인증</span>
                        <div className="insert">
                          <input
                            id="birthday"
                            type="number"
                            className="input-text medium"
                            maxLength="6"
                            inputMode="numeric"
                            placeholder="생년월일 6자리를 입력해주세요."
                            defaultValue={""}
                          />
                        </div>
                        <div className="insert">
                          <input
                            type="text"
                            id="membershipCard"
                            className="input-text medium"
                            maxLength="16"
                            placeholder="멤버십 카드번호 16자리를 입력해주세요."
                            defaultValue={axioData?.membershipData?.saved_card_no}
                          />
                        </div>
                      </div>

                      <div className="item attention">
                        <div className="text">
                          <ul className="attention-list">
                            <li>제휴할인은 주 1회 매장 제조 음료에만 적용할 수 있습니다.</li>
                            <li>제휴할인 적용 시 500 KT멤버십 포입트가 차감되며, 주문이 취소될 경우 포인트 및 사용이력은 복구됩니다.</li>
                          </ul>
                        </div>
                      </div>

                      <div className="btn-area">
                        <button type="button" className="btn text dark small full" onClick={() => handleConfirm()}>
                          인증하기
                        </button>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="fieldset">
                    <div className="w-inner">
                      <div className="field">
                        <button type="button" pop-target="#popupMembership" className="btn open-pop check-wrap">
                          <input type="checkbox" className="checkbox" name="membershipInfo" id="membershipSave" />
                          <label htmlFor="membershipSave">멤버십 정보 저장 동의</label>
                        </button>
                      </div>

                      <div className="item attention">
                        <div className="text">
                          <ul className="attention-list">
                            <li>멤버십 정보 저장을 위해 약관 동의가 필요합니다.</li>
                            <li>체크를 해제 할 경우 저장된 멤버십 정보는 삭제됩니다.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>

              {/* 선물하기 버튼 영역 */}
              <div className="fixed-con active">
                <div className="popup">
                  <div className="popup-wrap">
                    <div className="btn-area">
                      <button type="button" className="btn full x-large nomal" onClick={() => handleCancle()}>
                        <strong>취소하기</strong>
                      </button>
                      <button type="button" className="btn full x-large dark" onClick={() => handleSubmit()}>
                        <strong>제휴 할인 적용하기</strong>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 선물하기 버튼 영역 */}
            </div>
            {/* // #content */}
            <Popup_cancleMembership smartOrderSeq={Number(smartOrderSeq)} FrontData={FrontData} header_config={header_config} />
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}
        {/* 멤버쉽 정보 저장 동의 팝업 */}

        {memberData?.agree ? (
          <div id="popupMembership" className="overlay">
            <div className="popup">
              <div className="popup-wrap">
                <button type="button" className="btn btn-close">
                  <i className="ico close">
                    <span>close</span>
                  </i>
                </button>
                <div className="popup-header">
                  <h2 className="title">멤버십 정보 삭제</h2>
                </div>
                <div className="popup-body">
                  <div className="item board">
                    <p>
                      <strong>
                        멤버십 정보 저장 동의를 철회하고 저장된
                        <br />
                        멤버십 정보를 삭제하시겠습니까?{" "}
                      </strong>
                    </p>
                  </div>
                  <div className="w-inner">
                    <div className="btn-area">
                      <button type="button" className="btn grey full large membership-agree" onClick={() => handleNotAgree("아니오")}>
                        아니오
                      </button>
                      <button type="button" className="btn dark full large membership-agree" onClick={() => handleNotAgree("네")}>
                        네
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div id="popupMembership" className="overlay">
            <div className="popup">
              <div className="popup-wrap">
                <button type="button" className="btn btn-close">
                  <i className="ico close">
                    <span>close</span>
                  </i>
                </button>
                <div className="popup-header">
                  <h2 className="title">멤버십 정보 저장 동의</h2>
                </div>
                <div className="popup-body">
                  <div className="item board">
                    <p>
                      <strong>보다 편리한 멤버십 제휴할인 사용을 위해 멤버십 정보를 저장할 수 있습니다.</strong>
                    </p>
                    <p>
                      <strong>저장하는 정보: 회원의 멤버십 카드번호</strong>
                      <span>※ 최초 저장된 멤버십 카드번호는 암호화 되어 저장하므로 안전합니다.</span>
                      <span>※ 멤버십 번호를 저장해도 포인트 사용을 위해 생년월일 입력을 요청합니다.</span>
                    </p>
                    <p>
                      <strong>저장하는 기간: 사용자의 동의 철회까지</strong>
                      <span>※ 멤버십 정보 저장 체크를 해제하거나, 저장된 멤버십 번호를 수정 할 경우 저장된 멤버십 정보를 자동으로 삭제합니다.</span>
                    </p>
                  </div>
                  <div className="w-inner">
                    <div className="btn-area">
                      <button type="button" className="btn dark full large membership-agree" onClick={() => handleSaveAgree()}>
                        동의합니다
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 멤버쉽 정보 삭제 팝업 */}

        {/* //멤버쉽 정보 삭제 팝업 */}

        {/* // 기프트 카드 확대 팝업 */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
