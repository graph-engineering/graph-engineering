import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import { resolvers, typeDefs } from '.'

new ApolloServer({ schema: makeExecutableSchema({ typeDefs, resolvers }) })
	.listen()
	.then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`)
	})
