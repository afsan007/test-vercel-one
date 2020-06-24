import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-unfetch';

/**
 * Apollo Client can only have 1 “terminating” Apollo Link that sends the GraphQL requests
 * so we use apollo-upload-client instead of 'apollo-link-http'
 */
import { createUploadLink } from 'apollo-upload-client';

type ICreateApolloClient = (
  ...args: [NormalizedCacheObject, string]
) => ApolloClient<NormalizedCacheObject>;

/**
 * Creates and configures an isomorphic ApolloClient
 * @returns the created ApolloClient instance
 */
export const createApolloClient: ICreateApolloClient = (
  initialState = {},
  orgId,
) => {
  const authLink = setContext((request, previousContext) => {
    const { headers } = previousContext;
    
    let host = process.env.SERVER_ADDRESS;
    if (typeof window === 'undefined' && process.env.SERVERSIDE_SERVER_ADDRESS) {
      host = process.env.SERVERSIDE_SERVER_ADDRESS;
    }

    return {
      headers: {
        ...headers,
        // authorization: ''
      },
      uri: `${host}/api/v1/${orgId}/graphql`,
    };
  });

  const errorLink = onError(({ operation, graphQLErrors, networkError }) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('--- ', 'failed to run operation: ', operation.operationName, ' ---');
      if (networkError) {
        console.log(`[Network Error]:`, networkError.message);
      }
      if (graphQLErrors) {
        graphQLErrors.forEach((error) => {
          console.log(`[GraphQL Error]:`, error.message);
          console.log('[GraphQL Error Details]:', error);
        });
      }
    }
  });

  const uploadLink = createUploadLink({
    credentials: 'same-origin',
    fetch,
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([authLink, errorLink, uploadLink]),
    cache: new InMemoryCache().restore(initialState),
  });
};
