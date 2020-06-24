import React, { FC, ReactElement } from 'react';
import { CircularProgress, Grid, Card, CardHeader, Box } from '@material-ui/core';
import { ApolloError } from 'apollo-client';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';

export interface Props {
  loading: boolean;
  error?: ApolloError;
  children(): ReactElement<any>;
}

export const LoadingData: FC<Props> = (props) => {
  if (props.loading || props.error) {
    return (
      <Grid container justify="center">
        <Box m={4}>
          {props.loading ? (
            <CircularProgress />
          ) : props.error ? (
            <Card>
              <CardHeader
                avatar={<ErrorRoundedIcon fontSize="large" color="error" />}
                title={props.error.message || 'Could not load data'}
              />
            </Card>
          ) : null}
        </Box>
      </Grid>
    );
  }
  return <>{props.children()}</>;
};
