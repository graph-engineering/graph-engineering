import {
  graphql,
  GraphQLFieldResolver,
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";

export const getMillisForTwoHoursAgo = (): number => {
  const d = new Date();
  // tslint:disable-next-line:no-expression-statement
  d.setHours(d.getHours() - 2);
  return d.getTime();
};

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
    graphql(
      schema,
      `
					{
						arbitraryRootField ${queryString}
					}
				`
    ).then(response => {
      // tslint:disable-next-line:no-if-statement
      if (response.errors) throw new Error(response.errors[0].message);
      return response.data && response.data.arbitraryRootField;
    })
  );
}
