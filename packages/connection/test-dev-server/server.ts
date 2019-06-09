import { ApolloServer, makeExecutableSchema } from "apollo-server";
import { resolvers, typeDefs } from ".";

new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers })
})
  .listen()
  .then(({ url }) => {
    // tslint:disable-next-line:no-console
    console.log(`🚀 Server ready at ${url}`);
  });
