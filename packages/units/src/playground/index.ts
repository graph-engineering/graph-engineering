import { ApolloServer } from "apollo-server";
import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";

import * as Units from "../";
import * as Example from "./example";
import { exampleQuery } from "./example-query";

export const schema = makeExecutableSchema({
  typeDefs: gql`
    ${Units.allTypeDefs}
    ${Example.typeDefs}
  `,
  resolvers: {
    ...Units.allResolvers,
    ...Example.resolvers
  } as any
});

// tslint:disable
new ApolloServer({
  schema,
  playground: {
    tabs: [
      {
        endpoint: "http://localhost:4000/graphql",
        query: exampleQuery
      }
    ]
  }
})
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
// tslint:enable
