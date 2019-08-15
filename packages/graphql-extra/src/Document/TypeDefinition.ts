import { Array, Eq, Monoid, Semigroup } from "@grapheng/prelude";
import * as GraphQL from "graphql";

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
      concat: (x, y) => Array.uniq(Field.instance)([...x, ...y])
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
    ObjectType.is(x) && ObjectType.is(y) ? ObjectType.instance.concat(x, y) : y
};
