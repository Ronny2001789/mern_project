import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // get token from storage
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // add Authorization header
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
