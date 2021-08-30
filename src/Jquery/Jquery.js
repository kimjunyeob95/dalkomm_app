import $ from "jquery";

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
    var target = $(e).attr("href");
  } else if (pTag === "BUTTON" || pTag === "I") {
    // eslint-disable-next-line no-redeclare
    var target = $(e).attr("pop-target");
  }
  $(e).attr("temp-id", "" + target);
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
  $(e.target).parent("li").addClass("current");
  $(e.target).parent("li").siblings("li").removeClass("current");
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
