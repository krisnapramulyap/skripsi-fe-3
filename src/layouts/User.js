import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Payment from "../pages/main/payment";
import Profile from "../pages/main/profile";
import History from "../pages/main/profile/history";
const Home = lazy(() => import("../pages/main/home"));
const Product = lazy(() => import("../pages/main/product"));
// const LandingPage = lazy(() => import("../pages/landingpage"));

// components

export default function User() {
  const renderLoader = () => <p>Loading</p>;

  return (  
    <>
      <Suspense fallback={renderLoader()}>
        <Switch>
          <Route path="/main/home" exact component={Home} />
          <Route path="/main/product/:id" exact component={Product} />
          <Route path="/main/payment" exact component={Payment} />
          <Route path="/main/profile" exact component={Profile} />
          <Route path="/main/profile/history" exact component={History} />
          {/* <Redirect from="/main" to="/main" /> */}
        </Switch>
      </Suspense>
    </>
  );
}
