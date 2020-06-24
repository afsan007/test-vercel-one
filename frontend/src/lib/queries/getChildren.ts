import gql from 'graphql-tag';

export const GET_CHILDREN = gql`
  query getChildren($parentId: ObjectId!, $offset: Int!, $limit: Int!) {
    search(query: { match: { parentId: $parentId } }, offset: $offset, limit: $limit) {
      items {
        _id
        title
        isCollection
        schema {
          name
        }
      }
      total
    }
  }
`;