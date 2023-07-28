import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HeaderComponent } from "../components/modules";
// components

export default function Auth() {
  const Login = lazy(() => import("../pages/auth/login"));
  const Register = lazy(() => import("../pages/auth/register"));

  const renderLoader = () => <p>Loading</p>;

  return (
    <>
    <HeaderComponent />
      <Suspense fallback={renderLoader()}>
        <Switch>
          <Route path="/auth/login" exact component={Login} />
          <Route path="/auth/register" exact component={Register} />
          <Redirect from="/auth" to="/auth/login" />
        </Switch>
      </Suspense>
    </>
  );
}
