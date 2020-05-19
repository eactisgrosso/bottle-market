import { useReducer } from "react";
import { AuthContext } from "./auth.context";
import { WebAuth } from "auth0-js";

const isBrowser = typeof window !== "undefined";
const INITIAL_STATE = {
  expiresAt:
    isBrowser && !!localStorage.getItem("expiresAt")
      ? parseInt(JSON.parse(localStorage.getItem("expiresAt")))
      : null,
  user:
    isBrowser && !!localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  auth0: new WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENTID,
    redirectUri: process.env.AUTH0_CALLBACK,
    responseType: "token id_token",
    scope: "openid profile email offline_access",
    audience: `http://localhost:4000/api`,
    prompt: "login",
  }),
};

function reducer(state: any, action: any) {
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
}

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
