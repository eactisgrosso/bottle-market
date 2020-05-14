import React from "react";
import { useAuth } from "contexts/auth/useAuth";
import { NextPage } from "next";
import Router from "next/router";

interface Props {}

const Auth0CallbackPage: NextPage<Props> = () => {
  const { handleAuthentication } = useAuth();

  React.useEffect(() => {
    handleAuthentication();
    Router.push("/");
  }, [handleAuthentication]);

  return <div></div>;
};

export default Auth0CallbackPage;
