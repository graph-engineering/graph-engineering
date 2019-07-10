import * as GraphQL from "graphql";
import * as Schema from ".";
import * as Resolvers from "./Resolvers";
export declare type UserDefinition<Resolvers extends Resolvers.Resolvers = Resolvers.Resolvers> = GraphQL.DocumentNode | Schema.UserDefinition<Resolvers>;
export declare const addToSchema: (userDefinition: UserDefinition<Resolvers.Resolvers>, schema: Schema.Schema) => Schema.Schema;
