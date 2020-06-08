import React, { useReducer } from "react";
import { AuthContext } from "./auth.context";
import { WebAuth } from "auth0-js";

const isBrowser = typeof window !== "undefined";
const INITIAL_STATE = {
  expiresAt:
    isBrowser && !!localStorage.getItem("expiresAt")
      ? parseInt(JSON.parse(localStorage.getItem("expiresAt") ?? "{}"))
      : null,
  user:
    isBrowser && !!localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") ?? "{}")
      : null,
};

const reducer = (state: any, action: any) => {
  console.log(state, "auth");

  switch (action.type) {
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        expiresAt: action.payload.expiresAt,
        user: action.payload.user,
      };
    case "SIGN_OUT":
      return {
        ...state,
        expiresAt: 0,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ domain, clientId, callback, children }) => {
  INITIAL_STATE["auth0"] = new WebAuth({
    domain: domain,
    clientID: clientId,
    redirectUri: callback,
    responseType: "token id_token",
    scope: "openid profile email offline_access",
    audience: `http://localhost:4000/api`,
  });

  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
