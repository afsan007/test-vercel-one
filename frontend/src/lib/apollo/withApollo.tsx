import React from 'react';
import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';
import { ApolloProvider } from '@apollo/react-hooks';
import { getApolloClient } from './getApolloClient';
import { IPage } from './IPage';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

const orgId = process.env.ORG_ID || 'null';

interface IOptions {
  ssr?: boolean;
}

interface IWithApolloProps {
  apolloClient?: ReturnType<typeof getApolloClient>;
  apolloState?: NormalizedCacheObject;
  [key: string]: any;
}

export function withApollo(
  PageComponent: NextPage<any, any>,
  { ssr = true }: IOptions = {},
): IPage<IWithApolloProps> {
  const WithApollo: IPage<IWithApolloProps> = ({
    apolloClient, // this is sent from getDataFromTree render (We use its cache later)
    apolloState, // this is sent when we render in server
    ...pageProps
  }) => {
    let client: ApolloClient<any>;
    if (apolloClient) {
      client = apolloClient;
    } else if (apolloState) {
      client = getApolloClient(apolloState, orgId);
    } else {
      throw new Error('no apollo client or state provided');
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    // Find correct display name
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const apolloClient = (ctx.apolloClient = getApolloClient({}, orgId));

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {};

      // Only on the server
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        // We bypass typecheck here
        if (ctx.res && ctx.res.finished) {
          return {};
        }
        // Run all GraphQL queries in the component tree
        // and extract the resulting data
        // finally store it in the apolloClient's cache
        getApolloDataInServer(ctx, ssr, apolloClient, pageProps);
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}

const getApolloDataInServer = async (
  ctx: NextPageContext,
  ssr: boolean,
  apolloClient: ApolloClient<any>,
  pageProps: any,
) => {
  const { AppTree } = ctx;

  if (ssr) {
    try {
      // Run all GraphQL queries
      const { getDataFromTree } = await import('@apollo/react-ssr');

      await getDataFromTree(
        <AppTree
          pageProps={{
            ...pageProps,
            apolloClient,
          }}
        />,
      );
    } catch (error) {
      // Prevent Apollo Client GraphQL errors from crashing SSR.
      // Handle them in components via the data.error prop:
      // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
      console.error('Error while running `getDataFromTree`', error);
    }
  }

  // getDataFromTree does not call componentWillUnmount
  // head side effect therefore need to be cleared manually
  Head.rewind();
};
