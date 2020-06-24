import { NextPageContext, NextComponentType } from 'next';
import { getApolloClient } from './getApolloClient';
import { ComponentType } from 'react';

interface IExtendedContext extends NextPageContext {
  apolloClient: ReturnType<typeof getApolloClient>;
}

export type IPage<Props = {}, IntialProps = Props> = NextComponentType<
  IExtendedContext,
  IntialProps,
  Props
> & {
  propTypes?: ComponentType['propTypes'];
};
