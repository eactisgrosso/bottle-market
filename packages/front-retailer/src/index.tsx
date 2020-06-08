import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import {
  ApolloProvider,
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/link-error";
import { setContext } from "@apollo/link-context";
import { theme } from "./theme";
import Routes from "./routes";
import * as serviceWorker from "./serviceWorker";
import "./theme/global.css";
import { AuthProvider } from "@bottle-market/common";
import { LoadScript } from "@react-google-maps/api";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([
    authLink,
    errorLink,
    new HttpLink({
      uri: process.env.REACT_APP_API_URL,
      credentials: "same-origin",
    }),
  ]),
  cache: new InMemoryCache(),
});

const mapsLibraries = ["places"];

function App() {
  const engine = new Styletron();

  return (
    <ApolloProvider client={client as any}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          <BrowserRouter>
            <AuthProvider
              domain={process.env.REACT_APP_AUTH0_DOMAIN}
              clientId={process.env.REACT_APP_AUTH0_CLIENTID}
              callback={process.env.REACT_APP_AUTH0_CALLBACK}
            >
              <LoadScript
                googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}
                libraries={mapsLibraries}
              >
                <Routes />
              </LoadScript>
            </AuthProvider>
          </BrowserRouter>
        </BaseProvider>
      </StyletronProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
