import * as GraphQL from "graphql";
import { Maybe, Option } from "@platform/prelude";
import * as Config from "./Config";
import * as Resolvers from "./Resolvers";
export * from "./Executable";
export interface Schema {
    readonly document: Option.Option<GraphQL.DocumentNode>;
    readonly resolvers: Option.Option<Resolvers.Resolvers>;
}
export interface UserDefinition<Resolvers extends Resolvers.Resolvers = Resolvers.Resolvers> {
    readonly document?: Maybe<GraphQL.DocumentNode>;
    readonly resolvers?: Maybe<Resolvers>;
}
export declare const empty: Schema;
export declare const section: <StaticContext = unknown>() => <SchemaResolvers extends Resolvers.Resolvers = Resolvers.Resolvers, RootResolvers extends Resolvers.Resolvers = Resolvers.Resolvers>(userDefinition: Config.UserDefinition<StaticContext, SchemaResolvers, RootResolvers>) => (staticContext: StaticContext) => Schema;
export declare const merge: (a: Schema, b: Schema) => Schema;
