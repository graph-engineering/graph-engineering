import { Option } from "@platform/prelude";

import * as Document from "../Document";

export interface Resolvers {
  readonly [typeName: string]: unknown;
}

/*
  For every resolver in a resolver map, add the module name, i.e.
  `{ Query: { ... } }` becomes `{ SomePrefix__Query: { ... } }`
*/
export const prefix = (prefix: string, resolvers: Resolvers): Resolvers =>
  Object.entries(resolvers).reduce(
    (previous, [typeName, fields]) => ({
      ...previous,
      [Document.prefixName(prefix, typeName)]: fields
    }),
    {}
  );

export const merge = (first: Resolvers, second: Resolvers): Resolvers =>
  [...Object.entries(first), ...Object.entries(second)].reduce<Resolvers>(
    (previous, [typeName, resolvers]) => ({
      ...previous,
      [typeName]: Option.fromNullable(previous[typeName]).fold(
        resolvers,
        previousResolvers => ({ ...previousResolvers, ...resolvers })
      )
    }),
    {}
  );
