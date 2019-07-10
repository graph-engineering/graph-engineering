import * as GraphQL from "graphql";
import { Maybe } from "@platform/prelude";
import * as Schema from ".";
import * as Resolvers from "./Resolvers";
import * as Root from "./Root";
export interface Config<StaticContext, SchemaResolvers extends Resolvers.Resolvers = Resolvers.Resolvers, RootResolvers extends Resolvers.Resolvers = Resolvers.Resolvers> extends Schema.UserDefinition<SchemaResolvers> {
    readonly root?: Maybe<Root.UserDefinition<RootResolvers>>;
    readonly prefix?: Maybe<string>;
    readonly schemas?: Maybe<ReadonlyArray<(staticContext: StaticContext) => Schema.Schema>>;
}
export declare type UserDefinition<StaticContext = unknown, SchemaResolvers extends Resolvers.Resolvers = Resolvers.Resolvers, RootResolvers extends Resolvers.Resolvers = Resolvers.Resolvers> = ConfigFromStaticContext<StaticContext, SchemaResolvers, RootResolvers> | Config<StaticContext, SchemaResolvers, RootResolvers> | GraphQL.DocumentNode;
declare type ConfigFromStaticContext<StaticContext, SchemaResolvers extends Resolvers.Resolvers = Resolvers.Resolvers, RootResolvers extends Resolvers.Resolvers = Resolvers.Resolvers> = (staticContext: StaticContext) => Config<StaticContext, SchemaResolvers, RootResolvers>;
export declare const toSchema: <StaticContext = unknown, SchemaResolvers extends Resolvers.Resolvers = Resolvers.Resolvers, RootResolvers extends Resolvers.Resolvers = Resolvers.Resolvers>(staticContext: StaticContext, userDefinition: UserDefinition<StaticContext, SchemaResolvers, RootResolvers>) => Schema.Schema;
export {};
