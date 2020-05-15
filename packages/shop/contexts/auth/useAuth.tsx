import { useCallback } from "react";
import { useAuthContext } from "./auth.context";
import jwt_decode from "jwt-decode";

export const useAuth = () => {
  const { auth0, authState, authDispatch } = useAuthContext();

  const signIn = useCallback(() => {
    authDispatch({
      type: "SIGNIN",
    });
  }, []);

  const loginSocial = useCallback(
    (provider) => {
      auth0.authorize({
        connection: provider,
      });
    },
    [auth0]
  );

  const isAuthenticated = authState.isAuthenticated;
  const user = authState.user;

  const logout = useCallback(
    (returnUrl = "") => {
      localStorage.removeItem("access_token");
      authDispatch({ type: "SIGN_OUT" });

      auth0.logout({
        returnTo: window.location.origin + returnUrl,
      });
    },
    [auth0]
  );

  // const renewSession = useCallback(() => {
  //   auth0.checkSession({}, (err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //     } else if (err) {
  //       logout();
  //       console.error(
  //         `Could not get a new token (${err.error}: ${err.error_description}).`
  //       );
  //     }
  //   });
  // }, []);

  const handleAuthentication = useCallback(() => {
    auth0.parseHash(async (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        localStorage.setItem("access_token", authResult.accessToken);

        const user = authResult.idTokenPayload;
        const userInfo = jwt_decode(authResult.accessToken);
        const metadata = userInfo["https://app.bottlemarket.com.ar/userinfo"];

        authDispatch({
          type: "SIGNIN_SUCCESS",
          payload: {
            id: metadata ? metadata.bottleId : "",
            email: user.email,
            sub: user.sub,
            username: user.preferred_username,
            fullname: user.name,
            firstname: user.given_name,
            lastname: user.family_name,
            picture: user.picture,
          },
        });
      } else if (err) {
        console.error(
          `Error: ${err.error}. Check the console for further details.`
        );
        logout();
      }
    });
  }, []);

  return {
    signIn,
    loginSocial,
    logout,
    handleAuthentication,
    isAuthenticated,
    user,
  };
};
