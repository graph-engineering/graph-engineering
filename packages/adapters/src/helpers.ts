import {
  graphql,
  GraphQLFieldResolver,
  GraphQLObjectType,
  GraphQLSchema,
  printType
} from "graphql";
import gql from "graphql-tag";

export const extractResolvers = (
  object: GraphQLObjectType
): { readonly [fieldName: string]: GraphQLFieldResolver<any, any> } =>
  Object.entries(object.getFields()).reduce(
    (previous, [name, field]) => ({ ...previous, [name]: field.resolve }),
    {}
  );

export function expectSimpleObjectType(
  graphQLObjectType: GraphQLObjectType,
  value: any,
  queryString: string
): jest.Matchers<Promise<any>> {
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: {
        arbitraryRootField: {
          type: graphQLObjectType,
          resolve: () => value
        }
      }
    })
  });

  return expect(
    graphql(schema, `{ arbitraryRootField ${queryString} }`).then(response =>
      response.errors
        ? fail(new Error(response.errors[0].message))
        : response.data && response.data.arbitraryRootField
    )
  );
}

export const createGraphQLExports = (graphQLType: GraphQLObjectType) => ({
  typeDefs: gql`
    ${printType(graphQLType)}
  `,
  resolvers: extractResolvers(graphQLType),
  rawType: graphQLType
});
