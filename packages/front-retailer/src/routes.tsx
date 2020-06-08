import React, { useContext, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  LOGIN,
  CALLBACK,
  PRODUCTS,
  DELIVERY,
  STORES,
  DASHBOARD,
} from "./settings/constants";
import { useAuth, useRefreshToken } from "@bottle-market/common/auth";

import { InLineLoader } from "./components/InlineLoader/InlineLoader";
const Products = lazy(() => import("./containers/Products/Products"));
const RetailerLayout = lazy(() => import("./containers/Layout/Layout"));
const Dashboard = lazy(() => import("./containers/Dashboard/Dashboard"));
const Stores = lazy(() => import("./containers/Stores/Stores"));
const Delivery = lazy(() => import("./containers/Delivery/Delivery"));
const Login = lazy(() => import("./containers/Login/Login"));
const Callback = lazy(() => import("./containers/Login/Callback"));
const NotFound = lazy(() => import("./containers/NotFound/NotFound"));

/**
 *
 *  A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 *
 */

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const Routes = () => {
  useRefreshToken();

  return (
    <Suspense fallback={<InLineLoader />}>
      <Switch>
        <PrivateRoute exact={true} path={DASHBOARD}>
          <RetailerLayout>
            <Suspense fallback={<InLineLoader />}>
              <Dashboard />
            </Suspense>
          </RetailerLayout>
        </PrivateRoute>
        <PrivateRoute path={STORES}>
          <RetailerLayout>
            <Suspense fallback={<InLineLoader />}>
              <Stores />
            </Suspense>
          </RetailerLayout>
        </PrivateRoute>
        <PrivateRoute path={PRODUCTS}>
          <RetailerLayout>
            <Suspense fallback={<InLineLoader />}>
              <Products />
            </Suspense>
          </RetailerLayout>
        </PrivateRoute>
        <PrivateRoute path={DELIVERY}>
          <RetailerLayout>
            <Suspense fallback={<InLineLoader />}>
              <Delivery />
            </Suspense>
          </RetailerLayout>
        </PrivateRoute>
        <Route path={LOGIN}>
          <Login />
        </Route>
        <Route path={CALLBACK}>
          <Callback />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
