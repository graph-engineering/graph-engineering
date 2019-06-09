import { ApolloServer } from 'apollo-server'
import { GraphQLSchema } from 'graphql'

export const getTwoHoursAgo = (): number => {
	const d = new Date()
	d.setHours(d.getHours() - 2)
	return d.getTime()
}

export const runApolloServer = (schema: GraphQLSchema): void => {
	new ApolloServer({ schema }).listen().then(({ url }) => {
		// tslint:disable-next-line:no-console
		console.log(`🚀 Server ready at ${url}`)
	})
}
