import { useCallback } from "react";
import { useAuthContext } from "./auth.context";

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

  //   const renewSession = useCallback(() => {
  //     auth0.checkSession({}, (err, authResult) => {
  //       if (authResult && authResult.accessToken && authResult.idToken) {
  //         setSession(authResult);
  //       } else if (err) {
  //         logout();
  //         console.error(
  //           `Could not get a new token (${err.error}: ${err.error_description}).`
  //         );
  //         sendMessage("Hubo un problema, volvé a iniciar sesión.", "warning");
  //       }
  //     });
  //   }, []);

  const handleAuthentication = useCallback(() => {
    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        localStorage.setItem("access_token", authResult.accessToken);
        authDispatch({
          type: "SIGNIN_SUCCESS",
          payload: {
            email: authResult.idTokenPayload.email,
            sub: authResult.idTokenPayload.sub,
            username: authResult.idTokenPayload.preferred_username,
            fullname: authResult.idTokenPayload.name,
            firstname: authResult.idTokenPayload.given_name,
            picture: authResult.idTokenPayload.picture,
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
