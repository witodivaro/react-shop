import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloClient, createHttpLink, ApolloProvider } from '@apollo/client';

import App from './App';
import { store } from './redux/store';
import cache from './graphql/cache';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com',
});

const client = new ApolloClient({
  link: httpLink,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.querySelector('#root')
);
