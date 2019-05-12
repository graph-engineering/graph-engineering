import { makeExecutableSchema } from 'graphql-tools'
import gql from 'graphql-tag'

import { getTwoHoursAgo, runApolloServer } from './utils'
import * as MoarTypes from '../graphql'

runApolloServer(
	makeExecutableSchema({
		typeDefs: gql`
			${MoarTypes.typeDefs}
			type Query {
				twoHoursAgo: FormattedDate!
			}
		`,
		resolvers: {
			...MoarTypes.resolvers,
			Query: {
				twoHoursAgo: getTwoHoursAgo
			}
		}
	})
)
