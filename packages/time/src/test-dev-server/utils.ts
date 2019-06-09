import { ApolloServer } from "apollo-server";
import { GraphQLSchema } from "graphql";

export const runApolloServer = (schema: GraphQLSchema): void => {
  new ApolloServer({ schema }).listen().then(({ url }) => {
    // tslint:disable-next-line:no-console
    console.log(`🚀 Server ready at ${url}`);
  });
};
