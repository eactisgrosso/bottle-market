import { useEffect } from "react";
import { useAuth } from "contexts/auth/useAuth";
import { NextPage } from "next";
import Router from "next/router";
import { withApollo } from "helper/apollo";
import { useMutation } from "@apollo/client";
import { SIGN_ME_UP } from "graphql/mutation/me";

interface Props {}

const Auth0CallbackPage: NextPage<Props> = () => {
  const [signMeUpMutation] = useMutation(SIGN_ME_UP);
  const { handleAuthentication, isAuthenticated, user } = useAuth();

  useEffect(() => {
    handleAuthentication();
  }, [handleAuthentication]);

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        if (!user.id)
          await signMeUpMutation({
            variables: {
              signUpInput: {
                sub: user.sub,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
              },
            },
          });
      })();
    }
  }, [isAuthenticated]);

  return <div></div>;
};

export default withApollo(Auth0CallbackPage);
