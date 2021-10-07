import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";

import ScrollToTop from "./ScrollToTop";

import Main from "Pages/Main";
import Login from "Pages/Login";
import MyPage from "Pages/Mypage";
import Pay from "Pages/Pay";
import Order from "Pages/Order";
import Menu from "Pages/Menu";

//order page
import OrderMenu from "Pages/Order/OrderMenu";
import OrderDetail from "Pages/Order/OrderDetail";
import OrderSearch from "Pages/Order/OrderSearch";
import OrderFinal from "Pages/Order/OrderFinal";

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
import MyOrderRecipt from "Pages/Mypage/MyOrderRecipt";
import MyModify from "Pages/Mypage/MyModify";
import MyOption from "Pages/Mypage/MyOption";

//story page
import StoryList from "Pages/Story/StoryList";
import StoryDetail from "Pages/Story/StoryDetail";

//support page
import NoticeList from "Pages/Support/NoticeList";
import NoticeDetail from "Pages/Support/NoticeDetail";
import Faq from "Pages/Support/Faq";

import PrivateRoute from "PrivateRoute";
import reportWebVitals from "./reportWebVitals";

import ContextStore from "./ContextApi/Context";

ReactDOM.render(
  <ContextStore>
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={() => <Main />} />

        <Route exact path="/join/step1" component={() => <JoinStep1 />} />
        <Route exact path="/join/step2" component={() => <JoinStep2 />} />
        <Route exact path="/join/step3" component={() => <JoinStep3 />} />
        <Route exact path="/join/findId" component={() => <FindId />} />
        <Route exact path="/join/findPw" component={() => <FindPw />} />

        <PrivateRoute exact path="/pay">
          <Pay />
        </PrivateRoute>

        <Route exact path="/order" component={() => <Order />} />
        <Route exact path="/order/menu/:storeCode" component={() => <OrderMenu />} />
        <Route exact path="/order/menuSearch/:storeCode" component={() => <OrderSearch />} />
        <PrivateRoute path="/order/detail/:orderCode">
          <OrderDetail />
        </PrivateRoute>
        <PrivateRoute path="/order/final">
          <OrderFinal />
        </PrivateRoute>

        <PrivateRoute exact path="/mypage">
          <MyPage />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/modify">
          <MyModify />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/cart">
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
        <PrivateRoute exact path="/mypage/giftSend">
          <MyGiftSend />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/giftRecipt">
          <MyGiftRecipt />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/giftSendRecipt">
          <MyGiftSendRecipt />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/orderRecipt">
          <MyOrderRecipt />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/giftCharge">
          <MyGiftCharge />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/option">
          <MyOption />
        </PrivateRoute>

        {/* <PrivateRoute exact path="/menu">
          <Menu />
        </PrivateRoute> */}
        <Route exact path="/menu" component={() => <Menu />} />

        <PrivateRoute exact path="/story/list">
          <StoryList />
        </PrivateRoute>
        <PrivateRoute exact path="/story/detail/:id">
          <StoryDetail />
        </PrivateRoute>

        <Route exact path="/support/notice/list" component={() => <NoticeList />} />
        <Route exact path="/support/notice/detail/:id" component={() => <NoticeDetail />} />
        <Route exact path="/support/faq" component={() => <Faq />} />

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
