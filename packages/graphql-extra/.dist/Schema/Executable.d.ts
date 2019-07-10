import { Either } from "@platform/prelude";
import * as Schema from ".";
import * as GraphQL from "..";
import * as Config from "./Config";
export interface Executable<DynamicContext = unknown> {
    readonly context: DynamicContext;
    readonly schema: GraphQL.GraphQLSchema;
}
export declare const executable: <StaticContext, DynamicContext>(options: {
    readonly schema: Config.UserDefinition<StaticContext, import("./Resolvers").Resolvers, import("./Resolvers").Resolvers>;
    readonly context: {
        readonly static: StaticContext;
        readonly dynamic: DynamicContext;
    };
}) => Either.Either<Error, Schema.Executable<DynamicContext>>;
