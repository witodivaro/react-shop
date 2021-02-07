import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import App from './App';
import { store, persistor } from './redux/store';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      {
        collections {
          title
          id
          items {
            name
            id
            price
            imageUrl
          }
        }
      }
    `,
  })
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.querySelector('#root')
);
