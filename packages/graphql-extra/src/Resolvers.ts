import { Array, Monoid, pipe, Record } from "@grapheng/prelude";

namespace TypeResolver {
  export interface TypeResolver {
    readonly [fieldName: string]: unknown;
  }

  export const empty: Monoid.Monoid<TypeResolver>["empty"] = {};
  export const concat: Monoid.Monoid<TypeResolver>["concat"] = (x, y) => ({
    ...x,
    ...y
  });
}

export interface Resolvers {
  readonly [typeName: string]: TypeResolver.TypeResolver;
}

export const empty: Monoid.Monoid<Resolvers>["empty"] = {};
export const concat: Monoid.Monoid<Resolvers>["concat"] = (x, y) =>
  pipe(
    [x, y],
    Array.map(
      Record.collect(
        (
          typeName,
          typeResolver
        ): readonly [string, TypeResolver.TypeResolver] => [
          typeName,
          typeResolver
        ]
      )
    ),
    Array.flatten,
    Record.fromFoldable(TypeResolver, Array.array)
  );
