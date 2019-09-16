import { Array, Eq, Monoid, Semigroup } from "@grapheng/prelude";
import * as GraphQL from "graphql";

export namespace ObjectType {
  type ObjectType = GraphQL.ObjectTypeDefinitionNode & {
    readonly fields: Fields;
  };

  export type Fields = readonly Field[];
  export type Field = GraphQL.FieldDefinitionNode;

  export const is = (a: any): a is ObjectType =>
    "kind" in a && a.kind === "ObjectTypeDefinition";

  export const concat: Semigroup.Semigroup<ObjectType>["concat"] = (x, y) => ({
    ...y,
    fields: Monoid.fold(fields)([x.fields, y.fields])
  });

  const fields: Monoid.Monoid<Fields> = {
    empty: [],
    concat: (x, y) => Array.uniq(field)([...x, ...y])
  };

  const field: Eq.Eq<Field> = {
    equals: (x, y) => x.name.value === y.name.value
  };
}

export type TypeDefinition = GraphQL.TypeDefinitionNode;
export const is = (a: any): a is TypeDefinition => "name" in a;

export const concat: Semigroup.Semigroup<TypeDefinition>["concat"] = (x, y) =>
  ObjectType.is(x) && ObjectType.is(y) ? ObjectType.concat(x, y) : y;
