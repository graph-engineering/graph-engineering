import { pipe } from '@grapheng/prelude'
import { graphql, GraphQLFieldResolver, GraphQLObjectType, GraphQLSchema, printType } from 'graphql'
import gql from 'graphql-tag'
import { RatioTableWithNumbersOrRelationshipFunctions, RatioTableWithOnlyRelationshipFunctions } from './types'

export const extractResolvers = (object: GraphQLObjectType): { readonly [fieldName: string]: GraphQLFieldResolver<any, any> } =>
	Object.entries(object.getFields()).reduce((previous, [name, field]) => ({ ...previous, [name]: field.resolve }), {})

export function expectSimpleObjectType(graphQLObjectType: GraphQLObjectType, value: any, queryString: string): jest.Matchers<Promise<any>> {
	const schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',
			fields: {
				arbitraryRootField: {
					type: graphQLObjectType,
					resolve: () => value
				}
			}
		})
	})

	return expect(
		graphql(schema, `{ arbitraryRootField ${queryString} }`).then(
			response => {
				// tslint:disable-next-line:no-if-statement
				if (response.errors) throw new Error(response.errors[0].message)
				else return response.data && response.data.arbitraryRootField
			}
			// response.errors
			//   ? fail(new Error(response.errors[0].message))
			//   : response.data && response.data.arbitraryRootField
		)
	)
}

export const createGraphQLExports = (graphQLType: GraphQLObjectType) => ({
	typeDefs: gql`
		${printType(graphQLType)}
	`,
	resolvers: extractResolvers(graphQLType),
	rawType: graphQLType
})

export const getObjectKeysAsSelection = (type: object): string =>
	pipe(
		Object.keys(type).join(' '),
		fields => `{ ${fields} }`
	)

export const makeTableAsFunctions = (table: RatioTableWithNumbersOrRelationshipFunctions): RatioTableWithOnlyRelationshipFunctions =>
	Object.entries(table).reduce(
		(previous, [key, value]) => ({
			...previous,
			[key]:
				typeof value === 'number'
					? {
							toBaseUnit: (num: number) => num * value,
							fromBaseUnit: (num: number) => num / value
					  }
					: value
		}),
		// tslint:disable-next-line:no-object-literal-type-assertion
		{} as RatioTableWithOnlyRelationshipFunctions
	)
