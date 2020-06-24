import { createApolloClient } from './createApolloClient';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

let apolloClient: ApolloClient<NormalizedCacheObject>;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @returns apollo client
 */
export const getApolloClient: typeof createApolloClient = (...args) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(...args);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(...args);
  }

  return apolloClient;
};
