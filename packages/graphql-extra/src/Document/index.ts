import {
  Array,
  Either,
  Eq,
  Error,
  flow,
  Fn,
  JSON,
  Monoid,
  Ord,
  pipe,
  Record,
  Semigroup
} from "@grapheng/prelude";

import * as GraphQL from "graphql";

export module TypeDefinition {
  export module ObjectType {
    module Fields {
      module Field {
        export type Field = GraphQL.FieldDefinitionNode;
        export const instance: Eq.Eq<Field> = {
          equals: (x, y) => x.name.value === y.name.value
        };
      }

      export type Fields = readonly GraphQL.FieldDefinitionNode[];
      export const instance: Monoid.Monoid<Fields> = {
        empty: [],
        concat: (x, y) => hole()
      };
    }

    type ObjectType = GraphQL.ObjectTypeDefinitionNode & {
      readonly fields: readonly GraphQL.FieldDefinitionNode[];
    };

    export const is = (a: any): a is ObjectType =>
      "kind" in a && a.kind === "ObjectTypeDefinition";

    export const instance: Semigroup.Semigroup<ObjectType> = {
      concat: (x, y) => ({
        ...y,
        fields: Monoid.fold(Fields.instance)([x.fields, y.fields])
      })
    };
  }

  export type TypeDefinition = GraphQL.TypeDefinitionNode;
  export const is = (a: any): a is TypeDefinition => "name" in a;
  export const instance: Semigroup.Semigroup<TypeDefinition> = {
    concat: (x, y) =>
      ObjectType.is(x) && ObjectType.is(y)
        ? ObjectType.instance.concat(x, y)
        : y
  };
}

export const empty: typeof instance["empty"] = {
  kind: "Document",
  definitions: []
};

export const concat: typeof instance["concat"] = (x, y) => ({
  ...y,
  definitions: pipe(
    [...x.definitions, ...y.definitions],
    Array.partitionMap(
      flow(
        Either.fromPredicate(TypeDefinition.is, Fn.identity),
        Either.map<
          TypeDefinition.TypeDefinition,
          readonly [string, TypeDefinition.TypeDefinition]
        >(typeDefinition => [typeDefinition.name.value, typeDefinition])
      )
    ),
    ({ left: nonTypeDefinitions, right: typeDefinitions }) => [
      ...nonTypeDefinitions,
      ...pipe(
        typeDefinitions,
        Record.fromFoldable(TypeDefinition.instance, Array.array),
        Record.collect((_name, definition) => definition)
      )
    ]
  )
});

export const compare: typeof instance["compare"] = (x, y) =>
  instance.equals(x, y)
    ? 0
    : x.definitions.length > y.definitions.length
    ? 1
    : -1;

export const equals: typeof instance["equals"] = (x, y) =>
  toString(x) === toString(y);

const toString = (document: Document): string =>
  pipe(
    GraphQL.visit(document, { enter: node => ({ ...node, loc: null }) }),
    JSON.Stringify.Always.short
  );

export type Document = GraphQL.DocumentNode;
export const instance: Monoid.Monoid<Document> & Ord.Ord<Document> = {
  empty,
  concat,
  compare,
  equals
};
