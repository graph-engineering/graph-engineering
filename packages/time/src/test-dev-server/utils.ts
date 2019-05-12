import { GraphQLSchema } from 'graphql'
import { ApolloServer } from 'apollo-server'

export function getTwoHoursAgo(): Date {
	const d = new Date()
	d.setHours(d.getHours() - 2)
	return d
}

export function runApolloServer(schema: GraphQLSchema): void {
	new ApolloServer({ schema }).listen().then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`)
	})
}
