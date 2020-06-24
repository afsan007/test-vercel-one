import React from 'react';
import { NextPage } from 'next';
import Page from '$components/layout/Page';

const Home: NextPage<{ test: string }> = () => {
  return (
    <Page>
      <h1 className="container">Welcome to NextJS boilerplates</h1>
    </Page>
  );
};

export default Home;
