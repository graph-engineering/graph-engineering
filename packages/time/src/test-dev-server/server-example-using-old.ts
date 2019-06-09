import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from "graphql";
import { FormattedDate } from "../graphql";
import { getTwoHoursAgo, runApolloServer } from "./utils";

export const schemaTogether = new GraphQLObjectType({
  name: "Query",
  fields: {
    twoHoursAgo: {
      type: new GraphQLNonNull(FormattedDate.FormattedDate),
      resolve: getTwoHoursAgo
    }
  }
});

runApolloServer(new GraphQLSchema({ query: schemaTogether }));
