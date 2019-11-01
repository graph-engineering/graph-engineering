import { ApolloServer } from "apollo-server";
import { GraphQLSchema } from "graphql";

import { query } from "./query";

// tslint:disable
new ApolloServer({
  schema: new GraphQLSchema({ query })
})
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
// tslint:enable
