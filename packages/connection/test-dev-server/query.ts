import { GraphQLID, GraphQLObjectType } from "graphql";

import * as Human from "./human";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    getHumanByID: {
      args: { id: { type: GraphQLID } },
      type: Human.GraphQLType,
      resolve: (_, { id }) => Human.getByID(id)
    }
  })
});
