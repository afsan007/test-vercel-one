import React from 'react';
import { LoadingData } from './LoadingData';
import { ApolloError } from 'apollo-client';
import { Card, CardContent } from '@material-ui/core';

export default {
  title: 'Atoms | Progress / LoadingData',
  component: LoadingData,
};

const Children = () => (
  <Card>
    <CardContent>This is the loaded DATA!</CardContent>
  </Card>
);

export const loading = () => {
  return <LoadingData loading>{() => <Children />}</LoadingData>;
};

export const error = () => {
  return (
    <LoadingData loading={false} error={new Error('Error Fetching Data') as ApolloError}>
      {() => <Children />}
    </LoadingData>
  );
};

export const loaded = () => {
  return <LoadingData loading={false}>{() => <Children />}</LoadingData>;
};
