import $ from "jquery";
import { checkMobile } from "Config/GlobalJs";

export function fadeInOut() {
  $("body").removeClass("fade-out").addClass("fade-in");
  setTimeout(() => {
    $("body").removeClass("fade-in").addClass("fade-out");
  }, 100);
}

export function fn_masking(input, index, character, type) {
  if (type === "back") {
    return input.substr(index.length, index) + character + input.substr(index + character.length);
  } else if (type === "front") {
    return input.substr(0, index) + character + input.substr(index + character.length);
  }
}
export function name_check(name) {
  const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
  if (!regex.test(name) || name.length < 2) {
    alert("2자 이상, 한글 또는 영문만 입력 가능합니다.");
    return false;
  } else {
    return true;
  }
}

export function email_check(email) {
  var reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!reg.test(email)) {
    alert("올바른 형식의 이메일 주소를 입력해 주세요.");
    return false;
  } else {
    return true;
  }
}

export function fn_pw_check(pw, pw2) {
  var pattern1 = /[0-9]/;
  var pattern2 = /[a-zA-Z]/;
  var pattern3 = /[~!@#$%<>^&*]/; // 원하는 특수문자 추가 제거

  if (pw.length === 0) {
    alert("비밀번호를 입력해주세요");
    return false;
  } else {
    if (pw !== pw2) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
  }

  // if(/(\w)\1\1/.test(pw)){
  //     alert('비밀번호는 3회이상의 연속된 문자를 사용할 수 없습니다.');
  //     return false;
  // }

  if (
    (!pattern1.test(pw) && !pattern2.test(pw)) ||
    (!pattern1.test(pw) && !pattern3.test(pw)) ||
    (!pattern2.test(pw) && !pattern3.test(pw)) ||
    pw.length < 8 ||
    pw.length > 50
  ) {
    $(".alert-text").show();
    alert("8자리 이상 영문, 숫자, 특수문자 중 2가지 이상 사용해 주세요.");
    return false;
  }
  return true;
}

export function accordion(e, targetN) {
  var container;

  if ($(e).prop("tagName") === "DIV" && $(e).hasClass("coupon")) {
    container = $(e).parent();
  } else if ($(e).prop("tagName") === "DIV" && $(e).hasClass("flex-center")) {
    container = $(e).parent().parent();
  } else if ($(e).prop("tagName") === "I") {
    container = $(e).parent().parent().parent();
  } else if ($(e).prop("tagName") === "DIV" && $(e).hasClass("flex-both")) {
    container = $(e).parent().parent();
  } else if ($(e).prop("tagName") === "DIV" && $(e).hasClass("js-accordion-switche")) {
    container = $(e).parent();
  }

  var slideContent = $(container).children(".js-accordion-content");

  if ($(container).hasClass("active")) {
    accordionClose();
  } else {
    if (targetN === 1) {
      siblingsClose();
    }
    accordionOpen();
  }

  function accordionOpen() {
    $(container).addClass("active");
    $(slideContent).addClass("active");
  }

  function accordionClose() {
    $(container).removeClass("active");
    $(slideContent).removeClass("active");
  }

  function siblingsClose() {
    $(container).siblings().removeClass("active");
    $(container).siblings().children(".js-accordion-content").removeClass("active");
  }
}

function modalOpen(popId) {
  $(popId).addClass("active");
  $("body").addClass("modal-opened");
}
// modalClose
function modalClose(popId) {
  $(popId).removeClass("active");
  $("body").removeClass("modal-opened");
}

export function popupOpen(e) {
  var pTag = $(e).prop("tagName"),
    // eslint-disable-next-line no-unused-vars
    scroll = $(e).attr("modal-scroll");

  if (pTag === "A") {
    var target = $(e).data("href");
  } else if (pTag === "BUTTON" || pTag === "I") {
    // eslint-disable-next-line no-redeclare
    var target = $(e).attr("pop-target");
  }
  $(e).attr("temp-id", "" + target);
  if (target === "#zoomCardMembership" || target === "#zoomCardGift") {
    try {
      let if_data = JSON.stringify({ data: "Y" });
      if (checkMobile() === "android") {
        window.android.fn_bright(if_data);
      } else if (checkMobile() === "ios") {
        window.webkit.messageHandlers.fn_bright.postMessage(if_data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  modalOpen(target);
}

//MODAL :: close
export function popupClose() {
  $(".overlay .btn-close").on("click", function (e) {
    e.preventDefault();
    var target = $(this).closest(".overlay");
    modalClose(target);
    $(target).removeClass("active");
  });
}
// 말풍선 스크롤시 hide/show
export function scrollDetail() {
  if ($(".item.my-info").find(".speech-bubble").length > 0) {
    // eslint-disable-next-line no-unused-vars
    var header = $("#mainVisual");
    var range = 100;

    $(window).on("scroll", function () {
      try {
        var scrollTop = $(this).scrollTop(),
          obj = $("#mainVisual").offset(),
          objHeight = $("#mainVisual").outerHeight(),
          bottom = obj.top + objHeight,
          calc = 1 - (scrollTop - bottom + range) / range;

        $(".speech-bubble").css({ opacity: calc });

        if (calc > "1") {
          $(".speech-bubble").css({ opacity: 1 });
        } else if (calc < "0") {
          $(".speech-bubble").css({ opacity: 0 });
        }

        if (calc > "0.4") {
          $(".speech-bubble").removeClass("hide").addClass("show");
        } else {
          $(".speech-bubble").removeClass("show").addClass("hide");
        }
      } catch (error) {}
    });
  }
}

export function tabLink(e) {
  e.preventDefault();
  var tabTarget = $(e.target).data("href");
  $(e.target).parent("li").addClass("current active");
  $(e.target).parent("li").siblings("li").removeClass("current active");
  $(tabTarget).addClass("active").siblings(".tab-content").removeClass("active");
}

export function contGap() {
  $("body").each(function () {
    // eslint-disable-next-line no-unused-vars
    var h1 = $("nav#menu");
    var navHeight = $("nav#menu").outerHeight();
    // nav#menu 유무 페이지 구분 -container 패딩 값
    if ($("nav#menu").length === 0) {
      $("#container").css({ "padding-bottom": 0 });
    } else {
      $("#container").css({ "padding-bottom": navHeight });
      if ($(".fixed-con").length > 0) {
        $(".fixed-con .popup").css({ "padding-bottom": navHeight });
      }
    }

    // fixed-con 페이지 구분 -container 패딩 값
    if ($("#content .fixed-con:not(.layer-pop)").length > 0) {
      var fixedConHeight = $(".fixed-con .popup").height();
      $("#content").css({ "padding-bottom": fixedConHeight });
    }
  });
}

export function moveScrollTop() {
  $("html, body").animate({ scrollTop: "0" }, 500);
}
