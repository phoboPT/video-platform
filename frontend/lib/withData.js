import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Home/Cart/Cart';
import { LOCAL_LOGIN_QUERY } from '../components/Authentication/LoginPage';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // LocalData
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache

            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            let data;
            if (cartOpen === variables.cartOpen) {
              data = { data: { cartOpen: 0 } };
            } else {
              // Write the cart State to the opposite
              data = { data: { cartOpen: variables.cartOpen } };
            }
            cache.writeData(data);
            return data;
          },
          toggleLogin(_, variables, { cache }) {
            // read the cartOpen value from the cache

            const { loginOpen } = cache.readQuery({
              query: LOCAL_LOGIN_QUERY,
            });

            // Write the cart State to the opposite
            const data = { data: { loginOpen: !loginOpen } };

            cache.writeData(data);
            return data;
          },
          toggleSidebar(_, variables, { cache }) {
            // Write the cart State to the opposite
            const data = { data: { sidebarState: variables.sidebarState } };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartOpen: 0,
        loginOpen: false,
        sidebarState: 3,
      },
    },
  });
}

export default withApollo(createClient);
