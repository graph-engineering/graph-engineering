import { ApolloServer } from "apollo-server";
import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";

import * as AllTypes from ".";

const schema = makeExecutableSchema({
  typeDefs: gql`
    ${AllTypes.typeDefs}

    type Query {
      distance(millimetersInput: Float!): DistanceAdapter!
    }
  `,
  resolvers: {
    ...AllTypes.resolvers,
    Query: {
      distance: (_, args) => args.millimetersInput
    }
  }
});

// tslint:disable
new ApolloServer({ schema }).listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
// tslint:enable
