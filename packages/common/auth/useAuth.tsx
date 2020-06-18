import { useCallback, useEffect, useMemo } from "react";
import { useAuthContext } from "./auth.context";
import jwt_decode from "jwt-decode";

const useIsAuthenticated = (expiresAt) => {
  return useMemo(() => {
    return new Date().getTime() < expiresAt;
  }, [expiresAt]);
};

export const useRefreshToken = () => {
  const { isAuthenticated, expiresAt, renewSession } = useAuth();

  useEffect(() => {
    let timerForWebRefresh = null;

    const TWO_MINUTES = 2 * 60 * 1000;
    let timeToExpire = 0;
    if (expiresAt > 0) {
      timeToExpire = expiresAt - new Date().getTime();
      timeToExpire =
        timeToExpire > TWO_MINUTES ? timeToExpire - TWO_MINUTES : 0;
    }

    timerForWebRefresh = setTimeout(() => {
      if (isAuthenticated) {
        renewSession();
      }
    }, timeToExpire);

    return () => clearTimeout(timerForWebRefresh);
  }, [isAuthenticated, expiresAt, renewSession]);
};

export const useAuth = () => {
  const { authState, authDispatch } = useAuthContext();
  const { auth0, expiresAt, user } = authState;

  const isAuthenticated = useIsAuthenticated(
    expiresAt ? expiresAt : new Date().getTime()
  );

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

  const logout = useCallback(
    async (returnUrl = "") => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      localStorage.removeItem("expiresAt");
      await auth0.logout({
        returnTo: window.location.origin + returnUrl,
      });
      authDispatch({ type: "SIGN_OUT" });
    },
    [auth0]
  );

  const setSession = useCallback((authResult) => {
    localStorage.setItem("access_token", authResult.accessToken);

    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    localStorage.setItem("expiresAt", expiresAt.toString());

    const user = authResult.idTokenPayload;
    const userInfo = jwt_decode(authResult.accessToken);
    const metadata = userInfo["https://app.bottlemarket.com.ar/userinfo"];

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: metadata ? metadata.bottleId : "",
        picture: user.picture,
        fullname: user.name,
      })
    );
    authDispatch({
      type: "SIGNIN_SUCCESS",
      payload: {
        expiresAt: expiresAt,
        user: {
          id: metadata ? metadata.bottleId : "",
          email: user.email,
          sub: user.sub,
          username: user.preferred_username,
          fullname: user.name,
          firstname: user.given_name,
          lastname: user.family_name,
          picture: user.picture,
        },
      },
    });
  }, []);

  const renewSession = useCallback(() => {
    auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
      } else if (err) {
        logout();
        console.error(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }, []);

  const handleAuthentication = useCallback(() => {
    auth0.parseHash(async (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
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
    renewSession,
    isAuthenticated,
    expiresAt,
    user,
  };
};
