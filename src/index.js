import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";

import ScrollToTop from "./ScrollToTop";
import DevTest from "Pages/DevTest";

import Main from "Pages/Main";
import Login from "Pages/Login";
import MyPage from "Pages/Mypage";
import Pay from "Pages/Pay";
import Order from "Pages/Order";
import Menu from "Pages/Menu";

import Event from "Pages/Event/index";

//order page
import OrderMenu from "Pages/Order/OrderMenu";
import OrderStoreSearch from "Pages/Order/OrderStoreSearch";
import OrderInfoDetail from "Pages/Order/OrderInfoDetail";
import OrderDetail from "Pages/Order/OrderDetail";
import OrderSearch from "Pages/Order/OrderSearch";
import OrderFinal from "Pages/Order/OrderFinal";
import OrderMembership from "Pages/Order/OrderMembership";
import OrderFavorite from "Pages/Order/OrderFavorite";
import OrderInfo from "Pages/Order/OrderInfo";

//join page
import JoinStep1 from "Pages/Join/JoinStep1";
import JoinStep2 from "Pages/Join/JoinStep2";
import JoinStep3 from "Pages/Join/JoinStep3";
import FindId from "Pages/Join/Find_id";
import FindPw from "Pages/Join/Find_pw";

//mypage page
import MyCoupon from "Pages/Mypage/MyCoupon";
import MyCouponSend from "Pages/Mypage/MyCouponSend";
import MyCouponRecipt from "Pages/Mypage/MyCouponRecipt";
import MyGiftSend from "Pages/Mypage/MyGiftSend";
import MyGiftSendRecipt from "Pages/Mypage/MyGiftSendRecipt";
import MyGiftRecipt from "Pages/Mypage/MyGiftRecipt";
import MyGiftCharge from "Pages/Mypage/GiftCharge";
import MyCart from "Pages/Mypage/MyCart";
import MyStamp from "Pages/Mypage/MyStamp";
import MyStampRecipt from "Pages/Mypage/MyStampRecipt";
import MyOrderRecipt from "Pages/Mypage/MyOrderRecipt";
import MyModify from "Pages/Mypage/MyModify";
import MyOption from "Pages/Mypage/MyOption";
import MyMembershipPolicy from "Pages/Mypage/MyMembershipPolicy";
import MyMembershipRecipt from "Pages/Mypage/MyMembershipRecipt";

//story page
import StoryList from "Pages/Story/StoryList";
import StoryDetail from "Pages/Story/StoryDetail";

//support page
import NoticeList from "Pages/Support/NoticeList";
import NoticeDetail from "Pages/Support/NoticeDetail";
import Faq from "Pages/Support/Faq";
import PrivacyPolicy from "Pages/Support/PrivacyPolicy";
import TermList from "Pages/Support/TermList";
import TermLocation from "Pages/Support/TermLocation";
import Terms from "Pages/Support/Terms";
import Company from "Pages/Support/Company";
import CustomerService from "Pages/Support/CustomerService";

import PrivateRoute from "PrivateRoute";
import reportWebVitals from "./reportWebVitals";

import ContextStore from "./ContextApi/Context";

ReactDOM.render(
  <ContextStore>
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={() => <Main />} />
        <Route exact path="/dev" component={() => <DevTest />} />

        <Route exact path="/join/step1" component={() => <JoinStep1 />} />
        <Route exact path="/join/step2/:join_token" component={() => <JoinStep2 />} />
        <Route exact path="/join/step3" component={() => <JoinStep3 />} />
        <Route exact path="/join/findId" component={() => <FindId />} />
        <Route exact path="/join/findPw" component={() => <FindPw />} />

        <PrivateRoute exact path="/event/:tu_email/:tu_phone/:tu_nick/:tu_birthday">
          <Event />
        </PrivateRoute>

        <PrivateRoute exact path="/pay">
          <Pay />
        </PrivateRoute>

        <Route exact path="/order" component={() => <Order />} />
        <Route exact path="/order/storeSearch" component={() => <OrderStoreSearch />} />
        <Route exact path="/order/menu/:storeCode" component={() => <OrderMenu />} />
        <Route exact path="/order/menuSearch/:storeCode" component={() => <OrderSearch />} />
        <Route exact path="/order/infoDetail/:menuCode" component={() => <OrderInfoDetail />} />
        <PrivateRoute path="/order/favorite/:storeCode">
          <OrderFavorite />
        </PrivateRoute>
        <PrivateRoute path="/order/info/:orderCode">
          <OrderInfo />
        </PrivateRoute>
        <PrivateRoute path="/order/detail/:storeCode/:orderCode">
          <OrderDetail />
        </PrivateRoute>
        <PrivateRoute path="/order/final/:smartOrderSeq">
          <OrderFinal />
        </PrivateRoute>
        <PrivateRoute path="/order/membership/:smartOrderSeq">
          <OrderMembership />
        </PrivateRoute>

        <PrivateRoute exact path="/mypage">
          <MyPage />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/modify">
          <MyModify />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/cart/:storeCode">
          <MyCart />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/coupon">
          <MyCoupon />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/couponSend">
          <MyCouponSend />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/couponRecipt">
          <MyCouponRecipt />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/stamp">
          <MyStamp />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/stampRecipt">
          <MyStampRecipt />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/giftSend">
          <MyGiftSend />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/giftRecipt/:giftnum">
          <MyGiftRecipt />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/giftSendRecipt">
          <MyGiftSendRecipt />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/orderRecipt">
          <MyOrderRecipt />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/giftCharge/:giftnum">
          <MyGiftCharge />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/option">
          <MyOption />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/membershipRecipt">
          <MyMembershipRecipt />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/membershipPolicy">
          <MyMembershipPolicy />
        </PrivateRoute>

        {/* <PrivateRoute exact path="/menu">
          <Menu />
        </PrivateRoute> */}
        <Route exact path="/menu" component={() => <Menu />} />

        <Route exact path="/story/list" component={() => <StoryList />} />
        <Route exact path="/story/detail/:id" component={() => <StoryDetail />} />

        <Route exact path="/support/notice/list" component={() => <NoticeList />} />
        <Route exact path="/support/notice/detail/:id" component={() => <NoticeDetail />} />
        <Route exact path="/support/faq" component={() => <Faq />} />
        <Route exact path="/support/termList" component={() => <TermList />} />
        <Route exact path="/support/terms" component={() => <Terms />} />
        <Route exact path="/support/termLocation" component={() => <TermLocation />} />
        <Route exact path="/support/policy" component={() => <PrivacyPolicy />} />
        <Route exact path="/support/company" component={() => <Company />} />
        <Route exact path="/support/customerService" component={() => <CustomerService />} />
        <Route exact path="/login" component={() => <Login />} />
      </Switch>
    </Router>
  </ContextStore>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
