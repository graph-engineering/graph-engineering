import gql from "graphql-tag";

export { makeConnection } from "./first-gen-connection-maker";

export const typeDefs = gql`
  type PageInfo {
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
    startCursor: String
    endCursor: String
  }

  interface Connection {
    pageInfo: PageInfo!
    totalCount: Int!
  }

  interface ConnectionEdge {
    cursor: String!
  }
`;
