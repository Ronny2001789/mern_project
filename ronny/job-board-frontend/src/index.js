import React from 'react';
import ReactDOM from 'react-dom/client';  // change here
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // create root
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
