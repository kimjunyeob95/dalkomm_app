$(function () {
  $(window).on("load resize", function () {
    contGap();
  });

  //scroll
  var headerFix = 100,
    gnbScrollTop = 0,
    delta = 80;
  $(window).on("load scroll", function (e) {
    var st = $(this).scrollTop();

    scrollCheck();

    var st = $(this).scrollTop();
    //console.log(st);

    scrollCheck();
    if (Math.abs(gnbScrollTop - st) <= delta) return;

    //scroll up/down
    if (st > gnbScrollTop && gnbScrollTop > 0) {
      $("body").addClass("scroll-down").removeClass("scroll-up");
    } else {
      $("body").addClass("scroll-up").removeClass("scroll-down");
    }

    if (st > 80) {
      $("body").addClass("show-scrolltop-btn");
    } else {
      $("body").removeClass("show-scrolltop-btn");
    }

    gnbScrollTop = st;
  });

  // SCROLL TOP
  // $("#moveScrollTop").each(function () {
  //   $("#moveScrollTop").on("click", function () {
  //     $("html, body").animate({ scrollTop: "0" }, 500);
  //   });
  // });
  $(document).on("click", "#moveScrollTop", function () {
    $("html, body").animate({ scrollTop: "0" }, 500);
  });
  // //MODAL :: open
  $(document).on("click", ".btn.open-pop", function (e) {
    e.preventDefault();
    var pTag = $(this).prop("tagName"),
      scroll = $(this).attr("modal-scroll");

    if (pTag == "A") {
      var target = $(this).attr("href");
    } else if (pTag == "BUTTON") {
      var target = $(this).attr("pop-target");
    }

    $(this).attr("temp-id", "" + target);
    modalOpen(target);
  });

  // //MODAL :: close
  $(document).on("click", ".overlay .btn-close", function (e) {
    e.preventDefault();
    var target = $(this).closest(".overlay");
    modalClose(target);
    $(target).removeClass("active");
  });

  $(document).on("click", ".layer-pop .btn-close", function (e) {
    e.preventDefault();
    var target = $(this).closest(".layer-pop");
    modalClose(target);
    $(target).removeClass("active");
  });

  //LAYER POP :: open
  $(document).on("click", ".open-layer", function (e) {
    var target = $(this).data("href");
    e.preventDefault();
    $(target).addClass("active");

    if ($(target).hasClass("store-pop") == true) {
      if ($(target).siblings(".store-pop").hasClass("active")) {
        $(target).siblings(".store-pop").removeClass("active");
      }
    }
  });

  //LAYER POP :: close
  // $('.layer-pop .btn-close').on('click', function(e) {
  // 	var target = $(this).closest('.layer-pop');
  // 	$(target).removeClass('active');
  // });

  // 카드 확대 팝업 시 카드영역 외 클릭 닫힘
  $(document).mouseup(function (e) {
    if ($(".zoom-card").hasClass("active") == true) {
      if (!$(".zoom-card .item.card").has(e.target).length) {
        $(".zoom-card").removeClass("active");
        $("body").removeClass("modal-opened");
      }
    }
  });

  //즐겨찾는 매장 like
  $(document).on("click", ".btn.bookmark", function (e) {
    $(this).toggleClass("active");
    e.stopPropagation();
  });

  //select color
  $("select").on({
    change: function () {
      if (this.value === "") {
        this.style.color = "#000";
      }
    },
  });

  if ($("#content.drink.detail").length > 0) {
    $("#header").addClass("only-button-header");
  }

  if ($("#content.main").hasClass("home") == true) {
    $("#header").addClass("floating");
  }

  tabLink();
});

//scrollCheck
function scrollCheck() {
  var winsc = $(this).scrollTop();

  if (winsc == 0) {
    $("body").addClass("scroll-zero").removeClass("scroll-has");

    //header Fix
    if ($("#header h1").hasClass("page-title") == true) {
      $("#header").removeClass("fixed-header");
    }
  } else {
    $("body").addClass("scroll-has").removeClass("scroll-zero");

    //header Fix
    if ($("#header h1").hasClass("page-title") == true) {
      $("#header").addClass("fixed-header");
    }
  }
}

// modalOpen
function modalOpen(popId) {
  $(popId).addClass("active");
  $("body").addClass("modal-opened");
}
// modalClose
function modalClose(popId) {
  $(popId).removeClass("active");
  $("body").removeClass("modal-opened");
}

//tabLink
function tabLink() {
  // $(".tabs > li a").each(function () {
  //   var tabTarget = $(this).attr("href");
  //   console.log(tabTarget);
  //   $(document).on("click", $(this), function (e) {
  //     e.preventDefault();
  //     $(this).parent("li").addClass("current");
  //     $(this).parent("li").siblings("li").removeClass("current");
  //     $(tabTarget).addClass("active").siblings(".tab-content").removeClass("active");
  //   });
  // });
}

//accordion
function accordion(targetN) {
  $(".js-accordion-switche").click(function (e) {
    e.preventDefault();

    var container = $(this).parent();
    var slideContent = $(container).children(".js-accordion-content");

    if ($(container).hasClass("active")) {
      accordionClose();
    } else {
      if (targetN == 1) {
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
  });
}

function contGap() {
  // $("body").each(function () {
  //   var h1 = $("nav#menu");
  //   var navHeight = $("nav#menu").outerHeight();
  //   // nav#menu 유무 페이지 구분 -container 패딩 값
  //   if ($("nav#menu").length == 0) {
  //     $("#container").css({ "padding-bottom": 0 });
  //   } else {
  //     $("#container").css({ "padding-bottom": navHeight });
  //     if ($(".fixed-con").length > 0) {
  //       $(".fixed-con .popup").css({ "padding-bottom": navHeight });
  //     }
  //   }
  //   // fixed-con 페이지 구분 -container 패딩 값
  //   if ($("#content .fixed-con:not(.layer-pop)").length > 0) {
  //     var fixedConHeight = $(".fixed-con .popup").height();
  //     $("#content").css({ "padding-bottom": fixedConHeight });
  //   }
  // });
}

$(document).on("click", ".toggle-switch", function (e) {
  e.preventDefault();

  // $(this).parents('.toggle-wrap').children('li').toggleClass('active');
  $(this).siblings(".toggle-cont").slideToggle();
  if ($(this).parents("li").hasClass("active")) {
    $(this).parents("li").removeClass("active");
  } else {
    $(this).parents("li").addClass("active");
    $(this).parents("li").siblings().removeClass("active");
  }
  $(this).parents("li").siblings("li").find(".toggle-cont").slideUp();
});

// 모바일 input[type='number'] 정상 작동
function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}

// 말풍선 스크롤시 hide/show
function scrollDetail() {
  if ($(".item.my-info").find(".speech-bubble").length > 0) {
    var header = $("#mainVisual");
    var range = 100;

    $(window).on("scroll", function () {
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
    });
  }
}
