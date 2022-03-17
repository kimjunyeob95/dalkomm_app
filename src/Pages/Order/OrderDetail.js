/* eslint-disable array-callback-return */
/* eslint-disable no-unreachable */
/* eslint-disable no-script-url */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import GoContents from "Components/GoContents";
import { contGap } from "Jquery/Jquery";

import { Swiper } from "swiper/react";

import { SERVER_DALKOMM } from "Config/Server";
import { authContext } from "ContextApi/Context";
import { fadeOut } from "Config/GlobalJs";

export const hardCodingMenu = [
  {
    menuCode: "0936",
    name_kor: "에그포테이토 모닝롤",
    name_eng: "Egg potato morning roll",
    thum: "/@resource/images/hardcoding/0936.png",
  },
  {
    menuCode: "0937",
    name_kor: "후르츠산도",
    name_eng: "Fruits Sando",
    thum: "/@resource/images/hardcoding/0937.png",
  },
  {
    menuCode: "0938",
    name_kor: "햄 & 에멘탈치즈 크로와상",
    name_eng: "Ham and Emmental Cheese Croissant",
    thum: "/@resource/images/hardcoding/0938.png",
  },
  {
    menuCode: "0939",
    name_kor: "더블햄모짜렐라 샌드위치",
    name_eng: "Double ham mozzarella sandwich",
    thum: "/@resource/images/hardcoding/0939.png",
  },
];

export default function OrderDetail() {
  const [state] = useContext(authContext);
  const [axioData, setData] = useState(false);
  const [recommData, setRecommData] = useState([]);
  const history = useHistory();
  const { orderCode, storeCode } = useParams();
  const [frontData, setFront] = useState({ defaultPrice: 0 });
  const { scrollValue, cateType } = useLocation();

  const flagFn = (element) => {
    if (element === 0 || element === null || element === "" || element === undefined || element === "0" || element === "None") {
      return false;
    } else {
      return true;
    }
  };

  const body = {};
  let header_config = {
    headers: {
      "X-dalkomm-access-token": state.accessToken,
      Authorization: state.auth,
      "X-DALKOMM-APP-TYPE": state.app_type,
      "X-DALKOMM-CHANNEL": state.app_type,
    },
  };
  const fn_api_recomm = () => {
    hardCodingMenu.map((element) => {
      axios
        .all([
          axios.get(`${SERVER_DALKOMM}/app/api/v2/menu/detail?code=${element.menuCode}&store_code=${storeCode}&is_smartorder=${1}`, header_config),
        ])
        .then(
          axios.spread((res1) => {
            let res1_data = res1.data.data;
            if (!res1_data.menu.status) {
              setRecommData((origin) => [...origin, { ...element, soldOut: true }]);
            } else {
              setRecommData((origin) => [...origin, { ...element, soldOut: false }]);
            }
          })
        );
    });
  };
  const fn_api = () => {
    axios
      .all([axios.get(`${SERVER_DALKOMM}/app/api/v2/menu/detail?code=${orderCode}&store_code=${storeCode}&is_smartorder=${1}`, header_config)])
      .then(
        axios.spread((res1) => {
          let res1_data = res1.data.data;
          if (res1_data?.menu?.status === 2) {
            alert("결품 상품입니다. 테이블 오더가 불가능 합니다.");
            history.goBack();
          }

          setData((origin) => {
            return {
              ...origin,
              res1_data,
              hardCodingMenu,
            };
          });
        })
      );
  };
  useEffect(() => {
    fn_api();
    setRecommData([]);
    fn_api_recomm();
    $("#addCart").removeClass("active");
    $("body").removeClass("modal-opened");
    $("#orderCount").val(1);
  }, [orderCode]);
  useEffect(() => {
    // 말풍선 스크롤시 hide/show
    if (axioData) {
      contGap();
      handleResultText("처음");
      fadeOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axioData]);

  function getMenuObj() {
    let add_obj = {
      menu_code: String(orderCode),
      store_code: String(storeCode),
      quantity: Number($("#orderCount").val()),
      price: Number($("#totalPrice").data("allprice")),
      size: $('input[name="orderSize"]:checked').val() ? String($('input[name="orderSize"]:checked').val()) : "",
      cup: $('input[name="orderCup"]:checked').val() ? String($('input[name="orderCup"]:checked').val()) : "",
      menu_type: $('input[name="orderType"]:checked').val() ? String($('input[name="orderType"]:checked').val()) : "",
      coffee_bean: "",
      add_espresso_shot: $('input[name="shot"]').val() ? Number($('input[name="shot"]').val()) : "",
      add_vanilla_syrup: $('input[name="vanilla"]').val() ? Number($('input[name="vanilla"]').val()) : "",
      add_hazelnut_syrup: $('input[name="hazelnut"]').val() ? Number($('input[name="hazelnut"]').val()) : "",
      control_honey: $('input[name="honey"]:checked').val() ? $('input[name="honey"]:checked').val() : null,
      is_remove_whipping_cream: String($('input[name="whippingCreamRemove"]').is(":checked")),
      is_add_whipping_cream: String($('input[name="whippingCream"]').is(":checked")),
    };
    return add_obj;
  }

  const submitOrder = () => {
    if ($('input[name="orderSize"]:checked').val() === undefined && axioData?.res1_data.menu?.size) {
      alert("size를 선택해주세요.");
      return false;
    }

    let add_obj = getMenuObj();
    axios
      .all([axios.post(`${SERVER_DALKOMM}/app/api/v2/menu/to/order`, add_obj, header_config)])
      .then(
        axios.spread((res1) => {
          if (res1.data.meta.code === 20000) {
            history.push(`/order/final/${res1.data.data.smartorder_orderinfo_id}`);
          } else {
            alert(res1.data.meta.msg);
          }
        })
      )
      .catch((res) => alert("관리자에 문의 바랍니다."));
  };

  const handleSubmitCart = (event) => {
    let add_obj = getMenuObj();

    axios
      .all([axios.post(`${SERVER_DALKOMM}/app/api/v2/smartorder/cart/add`, add_obj, header_config)])
      .then(axios.spread((res1) => {}))
      .catch((res) => {
        $("#addCart").removeClass("active");
        $("body").removeClass("modal-opened");
        alert("관리자에 문의 바랍니다.");
      });
  };

  const otherMenu = () => {
    $("body").removeClass("modal-opened");
    history.push(`/order/menu/${storeCode}`);
  };
  const fn_select_size = (axioData) => {
    let return_result = "R";
    if (axioData.menu.size === "REGULAR") {
      return_result = "R";
    } else if (axioData.menu.size === "LARGE") {
      return_result = "L";
    } else if (axioData.menu.size === "BIG") {
      return_result = "B";
    } else {
      return_result = "R";
    }
    return return_result;
  };
  const handleResultText = (type, trigger) => {
    handleFrontSize(axioData?.res1_data?.menu, type, axioData?.res1_data?.store_menu);
    handleDefaultPrice(trigger);
    handleOptionText(type, trigger);

    if (trigger === "타입선택") {
      $('input[name="orderSize"]').eq(0).click();
    }
  };
  const handleFrontSize = (res1_data, start, store_menu) => {
    let option_type = $('input[name="orderType"]:checked').attr("text");
    let option_price = 0;
    let cupsize = "";
    let option_size;

    option_size = $('input[name="orderSize"]').eq(0).val();

    if (start === "처음" && ["HOT", "BOTH"].indexOf(res1_data?.type) > -1) {
      if (
        flagFn(store_menu?.store_hot_big_price) &&
        flagFn(store_menu?.store_hot_large_price) &&
        flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_hot_simple_regular_price,
          cupsize: "BOTH",
        });
      } else if (
        !flagFn(store_menu?.store_hot_big_price) &&
        flagFn(store_menu?.store_hot_large_price) &&
        flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        if (res1_data?.size === "LARGE") {
          setFront({
            defaultPrice: store_menu?.store_hot_large_price,
            cupsize: "LARGE",
          });
        } else {
          setFront({
            defaultPrice: store_menu?.store_hot_simple_regular_price,
            cupsize: "BOTH",
          });
        }
      } else if (
        !flagFn(store_menu?.store_hot_big_price) &&
        !flagFn(store_menu?.store_hot_large_price) &&
        flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_hot_simple_regular_price,
          cupsize: "REGULAR",
        });
      } else if (
        !flagFn(store_menu?.store_hot_big_price) &&
        flagFn(store_menu?.store_hot_large_price) &&
        !flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_hot_large_price,
          cupsize: "LARGE",
        });
      } else if (
        flagFn(store_menu?.store_hot_big_price) &&
        !flagFn(store_menu?.store_hot_large_price) &&
        !flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_hot_big_price,
          cupsize: "BIG",
        });
      }
    } else if (start === "처음" && res1_data?.type === "ICE") {
      if (flagFn(store_menu?.store_ice_big_price) && flagFn(store_menu?.store_ice_large_price) && flagFn(store_menu?.store_ice_regular_price)) {
        setFront({
          defaultPrice: store_menu?.store_ice_regular_price,
          cupsize: "ALL",
        });
      } else if (
        !flagFn(store_menu?.store_ice_big_price) &&
        flagFn(store_menu?.store_ice_large_price) &&
        flagFn(store_menu?.store_ice_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_ice_regular_price,
          cupsize: "BOTH",
        });
      } else if (
        !flagFn(store_menu?.store_ice_big_price) &&
        !flagFn(store_menu?.store_ice_large_price) &&
        flagFn(store_menu?.store_ice_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_ice_regular_price,
          cupsize: "REGULAR",
        });
      } else if (
        !flagFn(store_menu?.store_ice_big_price) &&
        flagFn(store_menu?.store_ice_large_price) &&
        !flagFn(store_menu?.store_ice_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_ice_large_price,
          cupsize: "LARGE",
        });
      } else if (
        flagFn(store_menu?.store_ice_big_price) &&
        !flagFn(store_menu?.store_ice_large_price) &&
        !flagFn(store_menu?.store_ice_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_ice_big_price,
          cupsize: "BIG",
        });
      }
    } else if (start === "처음" && res1_data?.type === null) {
      //베이커리 분기

      if (
        flagFn(store_menu?.store_hot_big_price) &&
        flagFn(store_menu?.store_hot_large_price) &&
        flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_hot_simple_regular_price,
          cupsize: "ALL",
        });
      } else if (
        !flagFn(store_menu?.store_hot_big_price) &&
        flagFn(store_menu?.store_hot_large_price) &&
        flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_hot_simple_regular_price,
          cupsize: "BOTH",
        });
      } else if (
        !flagFn(store_menu?.store_hot_big_price) &&
        !flagFn(store_menu?.store_hot_large_price) &&
        flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_hot_simple_regular_price,
          cupsize: "REGULAR",
        });
      } else if (
        !flagFn(store_menu?.store_hot_big_price) &&
        flagFn(store_menu?.store_hot_large_price) &&
        !flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_hot_large_price,
          cupsize: "LARGE",
        });
      } else if (
        flagFn(store_menu?.store_hot_big_price) &&
        !flagFn(store_menu?.store_hot_large_price) &&
        !flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        setFront({
          defaultPrice: store_menu?.store_hot_big_price,
          cupsize: "BIG",
        });
      }
    } else if (start === "중간" && option_type === "HOT") {
      if (
        flagFn(store_menu?.store_hot_big_price) &&
        flagFn(store_menu?.store_hot_large_price) &&
        flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        if (res1_data?.size === "LARGE") {
          cupsize = "LARGE";
        } else {
          cupsize = "BOTH";
        }
      } else if (
        !flagFn(store_menu?.store_hot_big_price) &&
        flagFn(store_menu?.store_hot_large_price) &&
        flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        if (res1_data?.size === "LARGE") {
          cupsize = "LARGE";
        } else {
          cupsize = "BOTH";
        }
      } else if (
        !flagFn(store_menu?.store_hot_big_price) &&
        !flagFn(store_menu?.store_hot_large_price) &&
        flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        cupsize = "REGULAR";
      } else if (
        !flagFn(store_menu?.store_hot_big_price) &&
        flagFn(store_menu?.store_hot_large_price) &&
        !flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        cupsize = "LARGE";
      } else if (
        flagFn(store_menu?.store_hot_big_price) &&
        !flagFn(store_menu?.store_hot_large_price) &&
        !flagFn(store_menu?.store_hot_simple_regular_price)
      ) {
        cupsize = "BIG";
      }

      if (option_size === "L") {
        option_price = store_menu?.store_hot_large_price;
      } else if (option_size === "R") {
        option_price = store_menu?.store_hot_simple_regular_price;
      } else if (option_size === "B") {
        option_price = store_menu?.store_hot_big_price;
      }
      setFront({
        defaultPrice: option_price,
        cupsize: cupsize,
      });
    } else if (start === "중간" && option_type === "ICE") {
      if (flagFn(store_menu?.store_ice_big_price) && flagFn(store_menu?.store_ice_large_price) && flagFn(store_menu?.store_ice_regular_price)) {
        cupsize = "ALL";
      } else if (
        !flagFn(store_menu?.store_ice_big_price) &&
        flagFn(store_menu?.store_ice_large_price) &&
        flagFn(store_menu?.store_ice_regular_price)
      ) {
        if (res1_data?.size === "LARGE") {
          cupsize = "LARGE";
        } else {
          cupsize = "BOTH";
        }
      } else if (
        !flagFn(store_menu?.store_ice_big_price) &&
        !flagFn(store_menu?.store_ice_large_price) &&
        flagFn(store_menu?.store_ice_regular_price)
      ) {
        cupsize = "REGULAR";
      } else if (
        !flagFn(store_menu?.store_ice_big_price) &&
        flagFn(store_menu?.store_ice_large_price) &&
        !flagFn(store_menu?.store_ice_regular_price)
      ) {
        cupsize = "LARGE";
      } else if (
        flagFn(store_menu?.store_ice_big_price) &&
        !flagFn(store_menu?.store_ice_large_price) &&
        !flagFn(store_menu?.store_ice_regular_price)
      ) {
        cupsize = "BIG";
      }

      if (option_size === "L") {
        option_price = store_menu?.store_ice_large_price;
      } else if (option_size === "R") {
        option_price = store_menu?.store_ice_regular_price;
      } else if (option_size === "B") {
        option_price = store_menu?.store_ice_big_price;
      }
      setFront({
        defaultPrice: option_price,
        cupsize: cupsize,
      });
    }
  };
  const handleDefaultPrice = (trigger) => {
    let menu_size =
      $('input[name="orderSize"]:checked').val() === undefined ? fn_select_size(axioData?.res1_data) : $('input[name="orderSize"]:checked').val();
    let type = $('input[name="orderType"]:checked').val();
    if (trigger === "타입선택") {
      if ($('input[name="orderSize"]:checked').val()) {
        menu_size = $('input[name="orderSize"]').eq(0).val();
      } else {
        menu_size = "R";
      }
    }
    let select_price = 0;
    if (type === "I") {
      $("#orderImg").attr("src", axioData?.res1_data?.menu?.detail_image_ice);
      if (menu_size === "R") {
        select_price = axioData?.res1_data?.store_menu?.store_ice_regular_price;
      } else if (menu_size === "L") {
        select_price = axioData?.res1_data?.store_menu?.store_ice_large_price;
      } else if (menu_size === "B") {
        select_price = axioData?.res1_data?.store_menu?.store_ice_big_price;
      }
    } else {
      $("#orderImg").attr("src", axioData?.res1_data?.menu?.detail_image_hot_simple);
      if (menu_size === "R") {
        select_price = axioData?.res1_data?.store_menu?.store_hot_simple_regular_price;
      } else if (menu_size === "L") {
        select_price = axioData?.res1_data?.store_menu?.store_hot_large_price;
      } else if (menu_size === "B") {
        select_price = axioData?.res1_data?.store_menu?.store_hot_big_price;
      }
    }
    handleResultPrice(select_price, trigger);
  };

  const handleResultPrice = (defaultPrice, trigger) => {
    let total_price = Number(defaultPrice);
    let menu_size;
    if (trigger === "타입선택") {
      if ($('input[name="orderSize"]:checked').val()) {
        menu_size = $('input[name="orderSize"]').eq(0).val();
      } else {
        menu_size = "R";
      }
    }
    let price_menu = {
      menu_type: $('input[name="orderType"]:checked').val(),
      menu_size: menu_size,
      menu_cup: $('input[name="orderCup"]:checked').val(),
      shot: $('input[name="shot"]').val() ? Number($('input[name="shot"]').val()) : "",
      hazelnut: $('input[name="hazelnut"]').val() ? Number($('input[name="hazelnut"]').val()) : "",
      vanilla: $('input[name="vanilla"]').val() ? Number($('input[name="vanilla"]').val()) : "",
      whippingCream: $('input[name="whippingCream"]').is(":checked"),
      orderCount: Number($("#orderCount").val()),
    };

    if (price_menu.menu_cup === "P") {
      total_price -= 300;
    }
    if (price_menu.shot > 0) {
      total_price = total_price + price_menu.shot * 500;
    }
    if (price_menu.hazelnut > 0) {
      total_price += 500;
    }
    if (price_menu.vanilla > 0) {
      total_price += 500;
    }
    if (price_menu.whippingCream !== false) {
      total_price += 500;
    }
    total_price = total_price * price_menu.orderCount;

    $("#totalPrice span")
      .text(total_price?.toLocaleString("ko-KR") + "원")
      .attr("data-allprice", total_price);
  };

  const handleOptionText = (type, trigger) => {
    let menu_type = $('input[name="orderType"]:checked').attr("text");

    let menu_size = "";
    if (type === "처음") {
      menu_size = axioData?.res1_data?.menu?.size;

      if (axioData?.res1_data?.menu?.size === "ALL" || axioData?.res1_data?.menu?.size === "BOTH" || axioData?.res1_data?.menu?.size === "REGULAR") {
        menu_size = "Regular";
      } else if (axioData?.res1_data?.menu?.size === "LARGE") {
        menu_size = "Large";
      } else if (axioData?.res1_data?.menu?.size === "BIG") {
        menu_size = "Big";
      }
    } else if (type === "중간") {
      menu_size = $('input[name="orderSize"]:checked').attr("text") === undefined ? "Regular" : $('input[name="orderSize"]:checked').attr("text");
      if (trigger === "타입선택") {
        if ($('input[name="orderSize"]:checked').val()) {
          menu_size = $('input[name="orderSize"]').eq(0).attr("text");
        } else {
          menu_size = "Regular";
        }
      }
    }
    let menu_cup = $('input[name="orderCup"]:checked').attr("text");

    let option_array = [
      {
        text: $('input[name="shot"]').attr("text"),
        value: $('input[name="shot"]').val(),
      },
      {
        text: $('input[name="hazelnut"]').attr("text"),
        value: $('input[name="hazelnut"]').val(),
      },
      {
        text: $('input[name="vanilla"]').attr("text"),
        value: $('input[name="vanilla"]').val(),
      },
      {
        text: $('input[name="whippingCream"]').attr("text"),
        value: $('input[name="whippingCream"]').is(":checked"),
      },
      {
        text: $('input[name="whippingCreamRemove"]').attr("text"),
        value: $('input[name="whippingCreamRemove"]').is(":checked"),
      },
      {
        text: $('input[name="honey"]:checked').attr("text"),
        value: $('input[name="honey"]:checked').attr("data-text"),
      },
    ];

    let returnText = "";

    menu_type !== undefined && $(".en.option.menutype").text(menu_type + ",");
    $(".en.option.size").text(menu_size + ",");
    $(".option.cup").text(menu_cup);
    $(".addopion").remove();

    option_array.forEach((element, index) => {
      if (element.value !== "0" && element.value !== false && element.value !== undefined) {
        if (element.text === "휘핑 크림") {
          returnText += `<span class="addopion" text="${element.text}">${element.text}, </span>`;
        } else if (element.text === "휘핑 크림 제거") {
          returnText += `<span class="addopion" text="${element.text}" >${element.text}, </span>`;
        } else if (element.text === "꿀양") {
          returnText += `<span class="addopion" text="${element.value}">${element.value}, </span>`;
        } else if (element.text === "샷") {
          returnText += `<span class="addopion" text="${element.text} ${element.value}">, ${element.text} ${element.value}, </span>`;
        } else {
          returnText += `<span class="addopion" text="${element.text} ${element.value}">${element.text} ${element.value}, </span>`;
        }
      }
    });
    returnText = returnText.slice(0, -9) + "</span>";
    $(".text.option").append(returnText);
  };
  const handleOption = (e, flag, type) => {
    let count;
    if (flag === "plus") {
      count = Number($(e).prev("input").val());
      if (count < 10) {
        if (type === "헤이즐럿" || type === "바닐라") {
          if (count > 1) {
            return false;
          }
        }
        $(e)
          .prev("input")
          .val(count + 1);
        if (type === "샷") {
          $(e).parents("li").addClass("adding");
          $(e)
            .parent()
            .siblings(".speech-bubble")
            .text(`+ ${(count + 1) * 500} ₩`);
        } else if (type === "헤이즐럿" || type === "바닐라") {
          if (count < 1) {
            $(e).parents("li").addClass("adding");
          }
        }
      }
    } else if (flag === "minus") {
      count = Number($(e).next("input").val());
      if (count > 0) {
        if (type === "주문수량" && count === 1) {
          return false;
        }
        count === 1 && $(e).parents("li").removeClass("adding");
        $(e)
          .next("input")
          .val(count - 1);
        if (type === "샷") {
          $(e)
            .parent()
            .siblings(".speech-bubble")
            .text(`+ ${(count - 1) * 500} ₩`);
        }
      }
    } else if (flag === "휘핑크림") {
      if (type === "휘핑크림") {
        $(e).is(":checked") ? $(e).parents("li").addClass("adding") : $(e).parents("li").removeClass("adding");
      }
    }
    handleResultText("중간");
  };

  const handleFavoriteShow = () => {
    let menu_type = $('input[name="orderType"]:checked').val();
    let menu_size = $('input[name="orderSize"]:checked').attr("text");
    let menu_cup = $('input[name="orderCup"]:checked').attr("text");
    let option_text = "";
    $(".addopion").each(function (i, e) {
      if (i === 0) {
        option_text += $(e).attr("text");
      } else {
        option_text += ", " + $(e).attr("text");
      }
    });
    $("#faSize").text(menu_size);
    $("#faOption").text(option_text);
    $("#faCup").text(menu_cup);
    if (menu_type === "I") {
      $("#favoriteImg").attr("src", axioData?.res1_data?.menu?.thumbnail_image_ice);
      $("#faType").text("ICE");
    } else {
      $("#faType").text("HOT");
      $("#favoriteImg").attr("src", axioData?.res1_data?.menu?.thumbnail_image_hot_simple);
    }
  };
  const handleFavorite = () => {
    let add_obj = getMenuObj();
    axios
      .all([axios.post(`${SERVER_DALKOMM}/app/api/v2/favorite/menu/add`, add_obj, header_config)])
      .then(
        axios.spread((res1) => {
          res1.data.meta.code === 20000 ? alert("해당 메뉴가 즐겨찾기에 추가되었습니다.") : alert(res1.data.meta.msg);
        })
      )
      .catch((res) => alert("관리자에 문의 바랍니다."));
  };
  const handleDetail = (link, soldout) => {
    if (!soldout) {
      history.push(link);
    } else {
      return false;
    }
  };
  if (axioData) {
    return (
      <React.Fragment>
        <GoContents />

        <div id="wrap" className="wrap">
          <div id="container" className="container">
            {/* 사파리 이슈사항으로 강제이동시킴 */}
            <header id="header" className="header only-button-header">
              <h1>
                <span className="blind">메뉴상세</span>
              </h1>
              <button
                type="button"
                className="btn back"
                onClick={() =>
                  history.push({
                    pathname: `/order/menu/${storeCode}`,
                    scrollValue: scrollValue,
                    cateType: cateType,
                  })
                }
              >
                <i className="ico back">
                  <span className="blind">뒤로</span>
                </i>
              </button>
            </header>

            <div id="content" className="drink detail fade-in">
              <section className="section">
                <div className="item drink-info">
                  <div className="img-wrap">
                    <img
                      id="orderImg"
                      src={
                        axioData?.res1_data?.menu?.type === "ICE"
                          ? axioData?.res1_data?.menu?.detail_image_ice
                          : axioData?.res1_data?.menu?.detail_image_hot_simple
                      }
                      alt={axioData?.res1_data?.menu?.name_eng}
                    />
                  </div>
                  <div className="detail-wrap">
                    <div className="text-box">
                      <p className="type en fc-orange"> </p>
                      <p className="name">
                        <span id="orderName">{axioData?.res1_data?.menu?.name_kor}</span>
                        <span className="en">{axioData?.res1_data?.menu?.name_eng}</span>
                      </p>
                      <p className="text">{axioData?.res1_data?.menu?.desc}</p>
                    </div>
                    <p className="price">{frontData?.defaultPrice?.toLocaleString("ko-KR")}원</p>
                  </div>
                </div>
                <form className="form">
                  <fieldset className="fieldset">
                    <div className="field">
                      {axioData?.res1_data?.menu?.type === "ICE" ? (
                        <div className="select-group col-1 checking">
                          <input
                            type="radio"
                            id="orderType01"
                            name="orderType"
                            value="I"
                            text="ICE"
                            defaultChecked={true}
                            onChange={() => handleResultText("중간", "타입선택")}
                          />
                          <label htmlFor="orderType01" className="btn normal small">
                            <strong className="en">ICE</strong>
                          </label>
                        </div>
                      ) : axioData?.res1_data?.menu?.type === "HOT" ? (
                        <div className="select-group col-1 checking">
                          <input
                            type="radio"
                            id="orderType02"
                            defaultChecked={true}
                            name="orderType"
                            value="H"
                            text="HOT"
                            onChange={() => handleResultText("중간", "타입선택")}
                          />
                          <label htmlFor="orderType02" className="btn normal small">
                            <strong className="en">HOT</strong>
                          </label>
                        </div>
                      ) : (
                        axioData?.res1_data?.menu?.type === "BOTH" && (
                          <div className="select-group col-2 checking">
                            <input
                              type="radio"
                              id="orderType02"
                              defaultChecked={true}
                              name="orderType"
                              value="H"
                              text="HOT"
                              onChange={() => handleResultText("중간", "타입선택")}
                            />
                            <label htmlFor="orderType02" className="btn normal small">
                              <strong className="en">HOT</strong>
                            </label>
                            <input
                              type="radio"
                              id="orderType01"
                              name="orderType"
                              value="I"
                              text="ICE"
                              onChange={() => handleResultText("중간", "타입선택")}
                            />
                            <label htmlFor="orderType01" className="btn normal small">
                              <strong className="en">ICE</strong>
                            </label>
                          </div>
                        )
                      )}
                    </div>

                    <div className="w-inner">
                      {axioData?.res1_data?.menu?.size !== null && (
                        <div className="field">
                          <span className="label en">Size</span>
                          {frontData?.cupsize === "BOTH" ? (
                            <div className="select-group col-2 checking">
                              <input
                                type="radio"
                                id="orderSize01"
                                name="orderSize"
                                value="R"
                                text="Regular"
                                defaultChecked={true}
                                onClick={() => handleResultText("중간")}
                              />
                              <label htmlFor="orderSize01" className="btn bdr medium">
                                <p className="text">
                                  <strong className="en">Regular</strong>
                                  {/* <span className="en">375ml</span> */}
                                </p>
                              </label>
                              <input type="radio" id="orderSize02" name="orderSize" value="L" text="Large" onClick={() => handleResultText("중간")} />
                              <label htmlFor="orderSize02" className="btn bdr medium">
                                <p className="text">
                                  <strong className="en">Large</strong>
                                  {/* <span className="en">591ml</span> */}
                                </p>
                              </label>
                            </div>
                          ) : frontData?.cupsize === "ALL" ? (
                            <div className="select-group col-3 checking">
                              <input
                                type="radio"
                                id="orderSize01"
                                name="orderSize"
                                value="R"
                                text="Regular"
                                defaultChecked={true}
                                onClick={() => handleResultText("중간")}
                              />
                              <label htmlFor="orderSize01" className="btn bdr medium">
                                <p className="text">
                                  <strong className="en">Regular</strong>
                                  {/* <span className="en">375ml</span> */}
                                </p>
                              </label>
                              <input type="radio" id="orderSize02" name="orderSize" value="L" text="Large" onClick={() => handleResultText("중간")} />
                              <label htmlFor="orderSize02" className="btn bdr medium">
                                <p className="text">
                                  <strong className="en">Large</strong>
                                  {/* <span className="en">591ml</span> */}
                                </p>
                              </label>
                              <input type="radio" id="orderSize03" name="orderSize" value="B" text="Big" onClick={() => handleResultText("중간")} />
                              <label htmlFor="orderSize03" className="btn bdr medium">
                                <p className="text">
                                  <strong className="en">Big</strong>
                                  {/* <span className="en">591ml</span> */}
                                </p>
                              </label>
                            </div>
                          ) : frontData?.cupsize === "LARGE" ? (
                            <div className="select-group col-1 checking">
                              <input
                                type="radio"
                                defaultChecked={true}
                                id="orderSize02"
                                name="orderSize"
                                value="L"
                                text="Large"
                                onClick={() => handleResultText("중간")}
                              />
                              <label htmlFor="orderSize02" className="btn bdr medium">
                                <p className="text">
                                  <strong className="en">Large</strong>
                                  {/* <span className="en">591ml</span> */}
                                </p>
                              </label>
                            </div>
                          ) : frontData?.cupsize === "REGULAR" ? (
                            <div className="select-group col-1 checking">
                              <input
                                type="radio"
                                id="orderSize01"
                                name="orderSize"
                                value="R"
                                text="Regular"
                                defaultChecked={true}
                                onClick={() => handleResultText("중간")}
                              />
                              <label htmlFor="orderSize01" className="btn bdr medium">
                                <p className="text">
                                  <strong className="en">Regular</strong>
                                  {/* <span className="en">375ml</span> */}
                                </p>
                              </label>
                            </div>
                          ) : (
                            frontData?.cupsize === "BIG" && (
                              <div className="select-group col-1 checking">
                                <input
                                  type="radio"
                                  id="orderSize03"
                                  name="orderSize"
                                  value="B"
                                  text="Big"
                                  defaultChecked={true}
                                  onClick={() => handleResultText("중간")}
                                />
                                <label htmlFor="orderSize03" className="btn bdr medium">
                                  <p className="text">
                                    <strong className="en">Big</strong>
                                    {/* <span className="en">591ml</span> */}
                                  </p>
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      {axioData?.res1_data?.menu?.cup !== null && (
                        <div className="field">
                          <span className="label en">Cup</span>
                          {axioData?.res1_data?.menu?.cup === "ALL" ? (
                            <div className="select-group col-3 checking">
                              <input
                                type="radio"
                                id="orderCup01"
                                name="orderCup"
                                value="M"
                                text="매장용 컵"
                                defaultChecked={true}
                                onClick={() => handleResultText("중간")}
                              />
                              <label htmlFor="orderCup01" className="btn bdr medium">
                                <strong>매장용</strong>
                              </label>
                              <input
                                type="radio"
                                id="orderCup02"
                                name="orderCup"
                                value="I"
                                text="일회용 컵"
                                onClick={() => handleResultText("중간")}
                              />
                              <label htmlFor="orderCup02" className="btn bdr medium">
                                <strong>일회용</strong>
                              </label>
                              <input type="radio" id="orderCup03" name="orderCup" value="P" text="개인 컵" onClick={() => handleResultText("중간")} />
                              <label htmlFor="orderCup03" className="btn bdr medium">
                                <strong>개인</strong>
                                <span className="speech-bubble small en">- 300 &#8361;</span>
                              </label>
                            </div>
                          ) : axioData?.res1_data?.menu?.cup === "BOTH" ? (
                            <div className="select-group col-2 checking">
                              <input
                                type="radio"
                                id="orderCup01"
                                name="orderCup"
                                value="M"
                                text="매장용 컵"
                                defaultChecked={true}
                                onClick={() => handleResultText("중간")}
                              />
                              <label htmlFor="orderCup01" className="btn bdr medium">
                                <strong>매장용</strong>
                              </label>
                              <input
                                type="radio"
                                id="orderCup02"
                                name="orderCup"
                                value="I"
                                text="일회용 컵"
                                onClick={() => handleResultText("중간")}
                              />
                              <label htmlFor="orderCup02" className="btn bdr medium">
                                <strong>일회용</strong>
                              </label>
                            </div>
                          ) : axioData?.res1_data?.menu?.cup === "MUG" ? (
                            <div className="select-group col-1 checking">
                              <input
                                type="radio"
                                id="orderCup01"
                                name="orderCup"
                                value="M"
                                text="매장용 컵"
                                defaultChecked={true}
                                onClick={() => handleResultText("중간")}
                              />
                              <label htmlFor="orderCup01" className="btn bdr medium">
                                <strong>매장용</strong>
                              </label>
                            </div>
                          ) : axioData?.res1_data?.menu?.cup === "INSTANT" ? (
                            <div className="select-group col-1 checking">
                              <input
                                defaultChecked={true}
                                type="radio"
                                id="orderCup02"
                                name="orderCup"
                                value="I"
                                text="일회용 컵"
                                onClick={() => handleResultText("중간")}
                              />
                              <label htmlFor="orderCup02" className="btn bdr medium">
                                <strong>일회용</strong>
                              </label>
                            </div>
                          ) : axioData?.res1_data?.menu?.cup === "PRIVATE" ? (
                            <div className="select-group col-1 checking">
                              {" "}
                              <input
                                defaultChecked={true}
                                type="radio"
                                id="orderCup03"
                                name="orderCup"
                                value="P"
                                text="개인 컵"
                                onClick={() => handleResultText("중간")}
                              />
                              <label htmlFor="orderCup03" className="btn bdr medium">
                                <strong>개인</strong>
                                <span className="speech-bubble small en">- 300 &#8361;</span>
                              </label>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                      {axioData?.res1_data?.menu?.available_add_espresso_shot ||
                      axioData?.res1_data?.menu?.available_add_hazelnut_syrup ||
                      axioData?.res1_data?.menu?.available_add_vanilla_syrup ||
                      axioData?.res1_data?.menu?.available_add_whipping_cream ||
                      axioData?.res1_data?.menu?.available_control_honey ||
                      axioData?.res1_data?.menu?.available_remove_whipping_cream ||
                      axioData?.res1_data?.menu?.available_select_coffee_bean ? (
                        <div className="field">
                          <span className="label en">Option</span>
                          <ul className="data-list option-list">
                            {axioData?.res1_data?.menu?.available_add_espresso_shot && (
                              <li>
                                {" "}
                                {/* [D] 옵션 추가시 adding 클래스 활성화 */}
                                <div className="item options">
                                  <label>샷 추가</label>
                                  <div className="amount-wrap">
                                    <p className="uio-amount">
                                      <button
                                        type="button"
                                        className="btn amount"
                                        onClick={(event) => handleOption(event.currentTarget, "minus", "샷")}
                                      >
                                        <i className="ico decrease"></i>
                                        <span className="blind">감소</span>
                                      </button>
                                      <input type="number" name="shot" text="샷" defaultValue={0} className="ea" disabled /> {/* [D] 디폴트 값 0 */}
                                      <button
                                        type="button"
                                        className="btn amount"
                                        onClick={(event) => handleOption(event.currentTarget, "plus", "샷")}
                                      >
                                        <i className="ico increase"></i>
                                        <span className="blind">증가</span>
                                      </button>
                                    </p>
                                    <span className="speech-bubble small en"> {/* [D] 수량 증가 시 금액 증가 */}+ 500 &#8361;</span>
                                  </div>
                                </div>
                              </li>
                            )}
                            {axioData?.res1_data?.menu?.available_add_hazelnut_syrup && (
                              <li>
                                <div className="item options">
                                  <label>헤이즐럿 시럽 추가</label>
                                  <div className="amount-wrap">
                                    <p className="uio-amount">
                                      <button
                                        type="button"
                                        className="btn amount"
                                        onClick={(event) => handleOption(event.currentTarget, "minus", "헤이즐럿")}
                                      >
                                        <i className="ico decrease"></i>
                                        <span className="blind">감소</span>
                                      </button>
                                      <input type="number" name="hazelnut" text="헤이즐럿 시럽" defaultValue={0} className="ea" disabled />{" "}
                                      {/* [D] 디폴트 값 0 */}
                                      <button
                                        type="button"
                                        className="btn amount"
                                        onClick={(event) => handleOption(event.currentTarget, "plus", "헤이즐럿")}
                                      >
                                        <i className="ico increase"></i>
                                        <span className="blind">증가</span>
                                      </button>
                                    </p>
                                    <span className="speech-bubble small en"> {/* [D] 수량 증가 시 금액 증가 */}+ 500 &#8361;</span>
                                  </div>
                                </div>
                              </li>
                            )}
                            {axioData?.res1_data?.menu?.available_add_vanilla_syrup && (
                              <li>
                                <div className="item options">
                                  <label>바닐라 시럽 추가</label>
                                  <div className="amount-wrap">
                                    <p className="uio-amount">
                                      <button
                                        type="button"
                                        className="btn amount"
                                        onClick={(event) => handleOption(event.currentTarget, "minus", "바닐라")}
                                      >
                                        <i className="ico decrease"></i>
                                        <span className="blind">감소</span>
                                      </button>
                                      <input type="number" name="vanilla" text="바닐라 시럽" defaultValue={0} className="ea" disabled />{" "}
                                      {/* [D] 디폴트 값 0 */}
                                      <button
                                        type="button"
                                        className="btn amount"
                                        onClick={(event) => handleOption(event.currentTarget, "plus", "바닐라")}
                                      >
                                        <i className="ico increase"></i>
                                        <span className="blind">증가</span>
                                      </button>
                                    </p>
                                    <span className="speech-bubble small en"> {/* [D] 수량 증가 시 금액 증가 */}+ 500 &#8361;</span>
                                  </div>
                                </div>
                              </li>
                            )}
                            {axioData?.res1_data?.menu?.available_add_whipping_cream && (
                              <li>
                                <div className="item options">
                                  <label htmlFor="whippingCream">휘핑 크림</label>
                                  {/* [D] 211014 .amount-wrap 추가 */}
                                  <div className="amount-wrap">
                                    <input
                                      type="checkbox"
                                      className="checkbox"
                                      defaultChecked={false}
                                      name="whippingCream"
                                      id="whippingCream"
                                      text="휘핑 크림"
                                      onClick={(event) => handleOption(event.currentTarget, "휘핑크림", "휘핑크림")}
                                    />
                                    <span className="speech-bubble small en"> {/* [D] 수량 증가 시 금액 증가 */}+ 500 &#8361;</span>
                                  </div>
                                  {/* // [D] 211014 .amount-wrap 추가 */}
                                </div>
                              </li>
                            )}
                            {axioData?.res1_data?.menu?.available_remove_whipping_cream && (
                              <li>
                                <div className="item options">
                                  <label htmlFor="whippingCream">휘핑 크림 제거</label>
                                  {/* [D] 211014 .amount-wrap 추가 */}
                                  <div className="amount-wrap">
                                    <input
                                      type="checkbox"
                                      className="checkbox"
                                      defaultChecked={false}
                                      name="whippingCreamRemove"
                                      id="whippingCreamRemove"
                                      text="휘핑 크림 제거"
                                      onClick={(event) => handleOption(event.currentTarget, "휘핑크림제거", "휘핑크림제거")}
                                    />
                                  </div>
                                  {/* // [D] 211014 .amount-wrap 추가 */}
                                </div>
                              </li>
                            )}
                            {axioData?.res1_data?.menu?.available_control_honey && (
                              <li>
                                <div className="item options">
                                  <label htmlFor="whippingCream">꿀양</label>
                                  <div className="amount-wrap">
                                    <div className="check-box">
                                      <label htmlFor="amountRemove">제거</label>
                                      <input
                                        type="radio"
                                        defaultChecked={false}
                                        className="checkbox"
                                        name="honey"
                                        id="amountRemove"
                                        text="꿀양"
                                        data-text="꿀양 제거"
                                        defaultValue={0}
                                        onClick={(event) => handleOption(event.currentTarget, "꿀양")}
                                      />
                                    </div>
                                    <div className="check-box">
                                      <label htmlFor="amountLittle">조금</label>
                                      <input
                                        type="radio"
                                        defaultChecked={false}
                                        className="checkbox"
                                        name="honey"
                                        id="amountLittle"
                                        text="꿀양"
                                        data-text="꿀양 조금"
                                        defaultValue={1}
                                        onClick={(event) => handleOption(event.currentTarget, "꿀양")}
                                      />
                                    </div>
                                    <div className="check-box">
                                      <label htmlFor="amountNormal">보통</label>
                                      <input
                                        type="radio"
                                        defaultChecked={true}
                                        className="checkbox"
                                        name="honey"
                                        id="amountNormal"
                                        text="꿀양"
                                        data-text="꿀양 보통"
                                        defaultValue={2}
                                        onClick={(event) => handleOption(event.currentTarget, "꿀양")}
                                      />
                                    </div>
                                    <div className="check-box">
                                      <label htmlFor="amountAdd">많이</label>
                                      <input
                                        type="radio"
                                        defaultChecked={false}
                                        className="checkbox"
                                        name="honey"
                                        id="amountAdd"
                                        text="꿀양"
                                        data-text="꿀양 많이"
                                        defaultValue={3}
                                        onClick={(event) => handleOption(event.currentTarget, "꿀양")}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )}
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </fieldset>
                </form>
                {axioData?.res1_data?.menu?.memo !== "<p>&nbsp;</p>" && (
                  <ul className="data-list toggle-wrap">
                    <li className="active">
                      <div className="item info-detail">
                        <div className="title-wrap toggle-switch">
                          <p className="title">영양 성분 정보</p>
                        </div>
                        <div className="detail-wrap toggle-cont" style={{ display: "none" }}>
                          {/* <p className="text">
                          <span>
                            1회 제공량 <em>{axioData?.res1_data?.menu?.detail_info_ice_regular_size}</em>
                          </span>
                          <span>
                            열량{" "}
                            <em>
                              {axioData?.res1_data?.menu?.detail_info_ice_regular_cal}
                              (kcal)
                            </em>
                          </span>
                        </p>
                        <br /> */}
                          <div className="table-wrap">
                            <div
                              className="markup"
                              dangerouslySetInnerHTML={{
                                __html: axioData?.res1_data?.menu?.memo,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                )}
              </section>

              {/* 충전 후 금액 / 결제하기 영역 */}
              <div id="orderState" className="fixed-con active">
                <div className="popup">
                  <div className="popup-wrap">
                    <div className="popup-body">
                      <ul className="data-list">
                        <li>
                          <div className="item info-order">
                            <dl className="flex-both w-inner">
                              <dt className="title">주문 수량</dt>
                              <dd className="price">
                                <p className="uio-amount">
                                  <button
                                    type="button"
                                    className="btn amount"
                                    onClick={(event) => handleOption(event.currentTarget, "minus", "주문수량")}
                                  >
                                    <i className="ico decrease"></i>
                                    <span className="blind">감소</span>
                                  </button>
                                  <input type="number" defaultValue={1} className="ea" disabled id="orderCount" />
                                  <button
                                    type="button"
                                    className="btn amount"
                                    onClick={(event) => handleOption(event.currentTarget, "plus", "주문수량")}
                                  >
                                    <i className="ico increase"></i>
                                    <span className="blind">증가</span>
                                  </button>
                                </p>
                              </dd>
                            </dl>
                          </div>
                        </li>

                        {/* [D] 211013 li.option 수정 */}
                        {axioData?.res1_data?.menu?.cup !== null && axioData?.res1_data?.menu?.size !== null && (
                          <li className="option">
                            <div className="item info-order">
                              <dl className="flex-both w-inner">
                                <dt className="title">옵션</dt>
                                <dd className="text option">
                                  <span className="en option menutype"></span>
                                  <span className="en option size"></span>
                                  <span className="option cup"></span>
                                </dd>
                              </dl>
                            </div>
                          </li>
                        )}
                        {/* // [D] 211013 li.option 수정 */}
                      </ul>
                      {/* <div className="item info-order">
                        <dl className="flex-both w-inner">
                          <dt className="title">주문 금액</dt> 
                          <dd
                            className="price fc-orange"
                            id="totalPrice"
                            data-allprice={axioData?.res1_data?.menu?.detail_info_hot_simple_regular_price}
                          >
                            {frontData.defaultPrice?.toLocaleString("ko-KR")}원
                          </dd>
                        </dl>
                      </div> */}
                    </div>
                    <div className="btn-area col-2">
                      <div className="btn-various btn-area col-2">
                        <button
                          type="button"
                          className="btn x-large light-g add-bookmark open-pop"
                          pop-target="#addBookmark"
                          onClick={() => handleFavoriteShow()}
                        >
                          <i className="ico heart">
                            <span>즐겨찾기</span>
                          </i>
                        </button>
                        <button type="button" className="btn x-large normal open-pop" pop-target="#addCart" onClick={() => handleSubmitCart()}>
                          <i className="ico cart">
                            <span>장바구니 담기</span>
                          </i>
                        </button>
                      </div>
                      <button
                        id="totalPrice"
                        data-allprice={axioData?.res1_data?.menu?.detail_info_hot_simple_regular_price}
                        className="btn x-large dark"
                        onClick={() => submitOrder()}
                      >
                        <span>{frontData?.defaultPrice?.toLocaleString("ko-KR")}원</span>
                        &nbsp;주문하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 충전 후 금액 / 결제하기 영역 */}

              {/* [D] 211021 즐겨찾는 메뉴 팝업 추가*/}
              <div id="addBookmark" className="fixed-con layer-pop dimm">
                <div className="popup">
                  <div className="popup-wrap">
                    <button type="button" className="btn btn-close">
                      <i className="ico close">
                        <span>close</span>
                      </i>
                    </button>
                    <div className="popup-body">
                      <div className="item message">
                        <p className="text">
                          다음 메뉴를
                          <br /> 즐겨 찾는 메뉴에 추가하시겠습니까?
                        </p>
                      </div>

                      <div className="content-wrap">
                        <div className="item order">
                          <div className="img-wrap">
                            <img id="favoriteImg" src="/@resource/images/@temp/product_14.jpg" alt={axioData?.res1_data?.menu?.name_kor} />
                          </div>
                          <div className="detail-wrap">
                            <div className="order-info">
                              <p className="title" id="faTitle">
                                {axioData?.res1_data?.menu?.name_kor}
                              </p>
                              <p className="info">
                                <span className="en" id="faType">
                                  ICE
                                </span>
                                <span className="en" id="faSize">
                                  Regular
                                </span>
                                <span id="faCup">매장용 컵</span>
                              </p>
                              <p className="option flex-both">
                                <span id="faOption"></span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* // [D] 추천 메뉴 있을 시 노출 */}
                      <div className="btn-area col-2">
                        <button type="button" className="btn x-large normal btn-close">
                          취소하기
                        </button>
                        <button type="button" className="btn x-large dark btn-close add-menu" onClick={() => handleFavorite()}>
                          추가하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* // [D] 211021 즐겨찾는 메뉴 팝업 추가 */}

              {/* 장바구니 추가 완료 팝업 영역 */}
              <div id="addCart" className="fixed-con layer-pop dimm">
                <div className="popup">
                  <div className="popup-wrap">
                    <button type="button" className="btn btn-close">
                      <i className="ico close">
                        <span>close</span>
                      </i>
                    </button>
                    <div className="popup-body">
                      <div className="item message">
                        <p className="text">
                          <span className="en fc-orange">THANK YOU!</span>
                          <strong>장바구니에 추가 되었습니다.</strong>
                        </p>
                      </div>

                      {/* [D] 추천 메뉴 있을 시 노출 */}
                      <div className="recommend-wrap">
                        <p className="text ta-c">함께하면 2배 더 달콤한 베이커리 추천 드려요!</p>
                        <Swiper
                          id="recommendMenu"
                          className="swiper-container section-slider"
                          slidesPerView={"auto"}
                          freeMode={false}
                          observer={true}
                          observeParents={true}
                        >
                          <ul className="swiper-wrapper data-list" slot="container-start">
                            {recommData?.map((e, i) => (
                              <li
                                className="swiper-slide"
                                key={i}
                                onClick={() => handleDetail(`/order/detail/${storeCode}/${e?.menuCode}`, e.soldOut)}
                              >
                                <div className={`item menu ${e.soldOut ? "sold-out" : ""}`}>
                                  <div className="img-wrap">
                                    <img src={e?.thum} alt="크루아상" />
                                  </div>
                                  <div className="detail-wrap">
                                    <p className="title">
                                      {e?.name_kor}
                                      <span className="en">{e?.name_eng}</span>
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </Swiper>
                      </div>
                      {/* // [D] 추천 메뉴 있을 시 노출 */}
                      <div className="btn-area col-2">
                        <Link to="#" className="btn x-large normal" onClick={() => otherMenu()}>
                          다른 메뉴 더 담기
                        </Link>
                        <Link to={`/mypage/cart/${storeCode}`} className="btn x-large dark btn-close">
                          장바구니 바로가기
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* // 장바구니 추가 완료 팝업 영역 */}

              <button type="button" id="moveScrollTop" className="btn scroll-top">
                <i className="ico arr-top"></i>
              </button>
            </div>
            {/* // #content */}
          </div>
          {/* // #container */}
        </div>
        {/* // #wrap */}
      </React.Fragment>
    );
  } else return <React.Fragment></React.Fragment>;
}
