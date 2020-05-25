import React, { useContext, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  LOGIN,
  CALLBACK,
  PRODUCTS,
  CATEGORY,
  DASHBOARD,
} from "./settings/constants";
import { useAuth, useRefreshToken } from "@bottle-market/common";

import { InLineLoader } from "./components/InlineLoader/InlineLoader";
const Products = lazy(() => import("./containers/Products/Products"));
const AdminLayout = lazy(() => import("./containers/Layout/Layout"));
const Dashboard = lazy(() => import("./containers/Dashboard/Dashboard"));
const Category = lazy(() => import("./containers/Category/Category"));
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
        isAuthenticated ? (
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
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Dashboard />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path={PRODUCTS}>
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Products />
            </Suspense>
          </AdminLayout>
        </PrivateRoute>
        <PrivateRoute path={CATEGORY}>
          <AdminLayout>
            <Suspense fallback={<InLineLoader />}>
              <Category />
            </Suspense>
          </AdminLayout>
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
