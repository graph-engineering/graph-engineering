import { GraphQLScalarType } from 'graphql'

export default new GraphQLScalarType({
	name: 'GraphengMS',
	serialize: (val: number) => val
})
