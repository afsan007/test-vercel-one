import React from 'react';
import { NextPage } from 'next';
import { withApollo } from '$withApollo';
import Grid from '@material-ui/core/Grid';
import { RoundedButton, LoadingData } from 'bp-components';
import { GET_CHILDREN } from '$queries';
import { useQuery } from '@apollo/react-hooks';
import { getChildren, getChildrenVariables } from '$gqlQueryTypes/getChildren';

const About: NextPage = () => {
  const { loading, error, data } = useQuery<getChildren, getChildrenVariables>(GET_CHILDREN, {
    variables: {
      parentId: '000000000000000000000000',
      offset: 0,
      limit: 10,
    }
  });

  const onClick = () => {
    console.log(' Button clicked ');
  };

  return (
    <LoadingData loading={loading} error={error}>
      {() => {
        return (
          <>
            <Grid container justify="flex-start">
              <Grid item style={{padding: '30px'}}>
                <p>Items</p>
                <ul>
                  {data?.search.items.map(item => (<li key={item._id}>{item.title}</li>))}
                </ul>
              </Grid>
            </Grid>
            <Grid container alignItems="center" direction="column" justify="flex-start">
              <Grid item>
                <Grid container direction="row" justify="space-around">
                  <Grid item lg={5} md={5} sm={5}>
                    <p style={{textAlign: 'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  </Grid>
                  <Grid item lg={5} md={5} sm={5}>
                    <p style={{textAlign: 'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <RoundedButton onClick={onClick} label="Add menu" variant="outlined"/>
              </Grid>
            </Grid>
          </>
        );
      }}
    </LoadingData>
  );
};

export default withApollo(About);
