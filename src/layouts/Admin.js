import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
const Home = lazy(() => import("../pages/admin/product"));
const Promo = lazy(() => import("../pages/admin/promo"));
const Dashboard = lazy(() => import("../pages/admin/dashboard"));
const Order = lazy(() => import("../pages/admin/order/order"));
// components

export default function Admin() {
  const renderLoader = () => <p>Loading</p>;

  return (
    <>
      <Suspense fallback={renderLoader()}>
        <Switch>
          <Route path="/admin/order" exact component={Order}/>
          <Route path="/admin/product" exact component={Home} />
          <Route path="/admin/product/:id" exact component={Home} />
          <Route path="/admin/promo" exact component={Promo} />
          <Route path="/admin/promo/:id" exact component={Promo} />
          <Route path="/admin/dashboard" exact component={Dashboard} />
          <Redirect from="/admin" to="/admin/product" />
        </Switch>
      </Suspense>
    </>
  );
}
