import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull } from 'graphql'
import { getTwoHoursAgo, runApolloServer } from './utils'
import { FormattedDate } from '../graphql'

export const schemaTogether = new GraphQLObjectType({
	name: 'Query',
	fields: {
		twoHoursAgo: {
			type: new GraphQLNonNull(FormattedDate.FormattedDate),
			resolve: getTwoHoursAgo
		}
	}
})

runApolloServer(new GraphQLSchema({ query: schemaTogether }))
