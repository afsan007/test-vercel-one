/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getChildren
// ====================================================

export interface getChildren_search_items_schema {
  __typename: "Schema";
  name: string;
}

export interface getChildren_search_items {
  __typename: "Collection" | "Book" | "Journal" | "Article" | "Paper" | "Certificate" | "Testttttt" | "Test" | "Ababa" | "Joon" | "Ba" | "Honey" | "JoonBaba" | "Shaftalo" | "_BaseItem";
  _id: GraphQLObjectId;
  title: string;
  isCollection: boolean;
  schema: getChildren_search_items_schema;
}

export interface getChildren_search {
  __typename: "SearchResults";
  items: getChildren_search_items[];
  total: number;
}

export interface getChildren {
  search: getChildren_search;
}

export interface getChildrenVariables {
  parentId: GraphQLObjectId;
  offset: number;
  limit: number;
}
