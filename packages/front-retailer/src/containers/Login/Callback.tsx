import React, { useEffect } from "react";
import { useAuth } from "@bottle-market/common/auth";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGN_ME_UP } from "../../graphql/mutation/user.mutation";

const Callback: React.FC<RouteComponentProps> = ({ history }) => {
  const {
    handleAuthentication,
    isAuthenticated,
    user,
    renewSession,
  } = useAuth();
  const [signMeUpMutation] = useMutation(SIGN_ME_UP);

  useEffect(() => {
    handleAuthentication();
  }, [handleAuthentication]);

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        if (!user.id) {
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
          renewSession();
        }
        history.push("/");
      })();
    }
  }, [isAuthenticated]);

  return <div></div>;
};

export default withRouter(Callback);
