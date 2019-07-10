import { Exception, Fn, Maybe, Result, These } from "@platform/prelude";

import * as GraphQL from ".";

export interface Operation<Variables = Maybe<DefaultVariables>> {
  readonly document: GraphQL.DocumentNode;
  readonly variables?: Variables;
}

export interface DefaultVariables {
  readonly [name: string]: unknown;
}

export type Task<A> = Result.Task<These.These<Errors, A>>;
export type Errors = ReadonlyArray<GraphQL.GraphQLError>;

export type Executable = ReturnType<typeof fromExecutableSchema>;
export type Failable<A> = A | Error;

export const fromExecutableSchema = <Context = unknown>(
  executableSchema: GraphQL.Schema.Executable<Context>
) => <A = unknown, Variables = Maybe<DefaultVariables>>(
  operation: Operation<Variables>
): Task<A> => execute(executableSchema, operation);

export const execute = <
  A = unknown,
  Variables = Maybe<DefaultVariables>,
  Context = unknown
>(
  { schema, context }: GraphQL.Schema.Executable<Context>,
  { document, variables }: Operation<Variables>
): Task<A> =>
  Result.taskTryCatch(() =>
    GraphQL.graphql<A>(
      schema,
      GraphQL.print(document),
      undefined,
      context,
      variables
    )
  ).chain(({ data, errors }) =>
    These.fromNullables(errors, data).fold(
      Result.taskFail("`data` or `errors` are required in GraphQL responses"),
      Result.taskOK
    )
  );

export const runUnsafe = <A>(operation: Task<A>): Promise<A> =>
  runMapUnsafe(operation, Fn.identity);

export const runMapUnsafe = <A, B>(
  operation: Task<A>,
  map: (data: A) => B
): Promise<B> =>
  Result.taskRunUnsafe(
    operation.map(result => result.fold(Exception.crash, map, Exception.crash))
  );
