import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, createHttpLink, ApolloProvider } from "@apollo/client";

import App from "./App";
import cache from "./graphql/cache";

const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com",
});

const client = new ApolloClient({
  link: httpLink,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.querySelector("#root")
);
