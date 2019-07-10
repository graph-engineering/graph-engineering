import { Maybe, Result, These } from "@platform/prelude";
import * as GraphQL from ".";
export interface Operation<Variables = Maybe<DefaultVariables>> {
    readonly document: GraphQL.DocumentNode;
    readonly variables?: Variables;
}
export interface DefaultVariables {
    readonly [name: string]: unknown;
}
export declare type Task<A> = Result.Task<These.These<Errors, A>>;
export declare type Errors = ReadonlyArray<GraphQL.GraphQLError>;
export declare type Executable = ReturnType<typeof fromExecutableSchema>;
export declare type Failable<A> = A | Error;
export declare const fromExecutableSchema: <Context = unknown>(executableSchema: GraphQL.Schema.Executable<Context>) => <A = unknown, Variables = Maybe<GraphQL.Execute.DefaultVariables>>(operation: GraphQL.Execute.Operation<Variables>) => import("fp-ts/lib/TaskEither").TaskEither<Error, These.These<readonly GraphQL.GraphQLError[], A>>;
export declare const execute: <A = unknown, Variables = Maybe<GraphQL.Execute.DefaultVariables>, Context = unknown>({ schema, context }: GraphQL.Schema.Executable<Context>, { document, variables }: GraphQL.Execute.Operation<Variables>) => import("fp-ts/lib/TaskEither").TaskEither<Error, These.These<readonly GraphQL.GraphQLError[], A>>;
export declare const runUnsafe: <A>(operation: import("fp-ts/lib/TaskEither").TaskEither<Error, These.These<readonly GraphQL.GraphQLError[], A>>) => Promise<A>;
export declare const runMapUnsafe: <A, B>(operation: import("fp-ts/lib/TaskEither").TaskEither<Error, These.These<readonly GraphQL.GraphQLError[], A>>, map: (data: A) => B) => Promise<B>;
