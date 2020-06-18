import { useEffect } from "react";
import { useAuth } from "@bottle-market/common/auth";
import { NextPage } from "next";
import Router from "next/router";
import { withApollo } from "helper/apollo";
import { useMutation } from "@apollo/client";
import { SIGN_ME_UP } from "graphql/mutation/me";
import { getCookie } from "helper/session";

interface Props {}

const Auth0CallbackPage: NextPage<Props> = () => {
  const [signMeUpMutation] = useMutation(SIGN_ME_UP, {
    update(cache, { data: { signMeUp } }) {
      console.log(signMeUp);
      setId(signMeUp.id);
    },
  });
  const { handleAuthentication, isAuthenticated, user, setId } = useAuth();

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
        const returnUrl = getCookie("returnUrl");
        Router.push(returnUrl ? returnUrl : "/");
      })();
    }
  }, [isAuthenticated]);

  return <div></div>;
};

export default withApollo(Auth0CallbackPage);
