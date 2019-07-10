import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from "graphql";

import { FormattedDate } from "../graphql";
import { getMillisForTwoHoursAgo } from "../graphql/utils";
import { runApolloServer } from "./utils";

export const schemaTogether = new GraphQLObjectType({
  name: "Query",
  fields: {
    twoHoursAgo: {
      type: new GraphQLNonNull(FormattedDate.FormattedDate),
      resolve: getMillisForTwoHoursAgo
    }
  }
});

runApolloServer(new GraphQLSchema({ query: schemaTogether }));
