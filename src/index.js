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

//mypage page
import MyCoupon from "Pages/Mypage/MyCoupon";
import MyGift from "Pages/Mypage/MyGift";
import MyGiftRecipt from "Pages/Mypage/MyGiftRecipt";

//story page
import StoryList from "Pages/Story/StoryList";
import StoryDetail from "Pages/Story/StoryDetail";

import PrivateRoute from "PrivateRoute";
import reportWebVitals from "./reportWebVitals";

import ContextStore from "./ContextApi/Context";

ReactDOM.render(
  <ContextStore>
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={() => <Main />} />
        <PrivateRoute exact path="/pay">
          <Pay />
        </PrivateRoute>

        <PrivateRoute exact path="/order">
          <Order />
        </PrivateRoute>
        <PrivateRoute path="/order/menu">
          <OrderMenu />
        </PrivateRoute>
        <PrivateRoute path="/order/detail/:id">
          <OrderDetail />
        </PrivateRoute>

        <PrivateRoute exact path="/mypage">
          <MyPage />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/coupon">
          <MyCoupon />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/gift">
          <MyGift />
        </PrivateRoute>
        <PrivateRoute exact path="/mypage/giftRecipt">
          <MyGiftRecipt />
        </PrivateRoute>

        <PrivateRoute exact path="/menu">
          <Menu />
        </PrivateRoute>

        <Route exact path="/story/list" component={() => <StoryList />} />
        <Route path="/story/detail/:id" component={() => <StoryDetail />} />

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
