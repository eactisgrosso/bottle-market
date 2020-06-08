import React, { useEffect } from "react";
import { useAuth } from "@bottle-market/common/auth";
import { Redirect } from "react-router-dom";

type CallbackProps = {};

const Callback: React.FC<CallbackProps> = ({}) => {
  const { handleAuthentication, isAuthenticated, user } = useAuth();

  useEffect(() => {
    handleAuthentication();
  }, [handleAuthentication]);

  if (isAuthenticated) {
    // if (!user.id)
    //   await signMeUpMutation({
    //     variables: {
    //       signUpInput: {
    //         sub: user.sub,
    //         email: user.email,
    //         firstname: user.firstname,
    //         lastname: user.lastname,
    //       },
    //     },
    //   });
    return <Redirect to={{ pathname: "/" }} />;
  }

  return <div></div>;
};

export default Callback;
