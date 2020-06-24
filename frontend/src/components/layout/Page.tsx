import React, { FC } from 'react';
import Head from 'next/head';
import { bool, node, InferProps } from 'prop-types';

type PropTypes = InferProps<typeof propTypes>;

const Page: FC<PropTypes> = (props) => (
  <div>
    {props.headless ? null : (
      <Head>
        <title>Boilerplate</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
    )}
    {props.children}
  </div>
);

const propTypes = {
  headless: bool,
  children: node,
};

Page.propTypes = propTypes;

export default Page;
