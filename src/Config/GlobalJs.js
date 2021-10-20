/* eslint-disable no-useless-escape */
import $ from "jquery";
export function checkMobile() {
  var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

  if (varUA.indexOf("android") > -1) {
    //안드로이드
    return "android";
  } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
    //IOS
    return "ios";
  } else {
    //아이폰, 안드로이드 외
    return "android";
  }
}

export const getCookieValue = (key) => {
  let cookieKey = key + "=";
  let result = "";
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === " ") {
      cookieArr[i] = cookieArr[i].substring(1);
    }

    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};

export const globalAppendScript = (scriptHtml) => {
  const script_tag = document.createElement("script");
  script_tag.innerHTML = scriptHtml;
  script_tag.type = "text/javascript";
  script_tag.async = "async";
  script_tag.className = "reactScript";
  document.head.appendChild(script_tag);
};

export const globalRemoveScript = (scriptClass) => {
  $(scriptClass).remove();
};

export function getParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(window.location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function finalOrderHtml() {
  // 211019 마크업 수정
  $(".smartorder-menu .list_cell").before('<h4 class="pay-title">주문 메뉴</div>');
  $(".smartorder-menu .pay-title").after(
    '<ul class="order-list data-list"><li><div class="item order"><div class="img-wrap"><img src="/@resource/images/@temp/product_05.jpg" alt="카라멜마끼아또"></div></div></li></ul>'
  );
  $(".smartorder-menu .list_cell").appendTo(".item.order");
  $("#coupon-list").appendTo(".smartorder-menu .order-list > li");
  $(".pay_carrier .list_title").text("요청 사항");
  $(".pay_carrier .list-chk.text-grey").text("빙수제품은 별도 포장을 제공하지 않습니다.");
  $(".pay_carrier").appendTo(".smartorder-menu");
  $(".pay_way").appendTo(".smartorder-menu");
  $(".pay_carrier .list_title").after(
    ' <div class="select-group col-2"><input type="radio" id="orderRequest01" name="orderRequest"><label for="orderRequest01" class="btn bdr medium"><strong>캐리어 포장</strong></label><input type="radio" id="orderRequest02" name="orderRequest"><label for="orderRequest02" class="btn bdr medium"><strong>없음</strong></label></div> '
  );
  $(".pay_way_content1").addClass("select-group col-3");
  $(".pay_sum").prepend('<h4 class="pay-title en">Total</div>');
  $(".list.pay .text-red:not(#affiliate) h4 strong").append('<span class="coupon">[FREE 음료 쿠폰]</span>');
  $(".list.pay .text-red#affiliate h4 strong").text("멤버십 할인");
  $(".list.pay .text-red#affiliate h4 strong").append('<span class="coupon">[PLETINUM]</span>');
  $(".list.pay_sum_b").before(
    '<div class="list pay"><ul class="list_cell text-red"><li><h4><strong>KT 멤버십 할인</strong></h4></li><li class="text-right"><a href="javascript:void(0);" class="btn verify">인증하기</a></li></ul></div>'
  );
}
