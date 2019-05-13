import gql from 'graphql-tag'
import { HumanResolvers } from '../__generated__'
import { makeConnection } from '../src/first-gen-connection-maker'
import { loadHumanById, projectLoader } from './loaders'

// take connection stuff out
export const typeDefs = gql`
	type Project {
		id: String!
	}

	type PageInfo {
		hasPreviousPage: Boolean!
		hasNextPage: Boolean!
		startCursor: String
		endCursor: String
	}

	interface Connection {
		pageInfo: PageInfo!
		totalCount: Int!
	}

	interface ConnectionEdge {
		cursor: String!
	}

	type Human {
		id: String!
		name: Name!
		projectsConnection(first: Int, after: String): HumanProjectConnection!
		relativesConnection(first: Int, after: String): HumanRelativeConnection!
		friendsConnection(first: Int, after: String): HumanFriendConnection!
	}

	type Name {
		first: InitialFull
		middle: [InitialFull!]
		family: InitialFull
		nickname: String
	}

	type InitialFull {
		initial: String!
		full: String!
	}

	type HumanProjectConnection implements Connection {
		totalCount: Int!
		pageInfo: PageInfo!
		edges: [HumanProjectEdge!]!
	}

	type HumanProjectEdge implements ConnectionEdge {
		cursor: String!
		node: Project!
	}

	type HumanFriendConnection implements Connection {
		totalCount: Int!
		pageInfo: PageInfo!
		edges: [HumanFriendEdge!]!
	}

	type HumanFriendEdge implements ConnectionEdge {
		cursor: String!
		node: Human!
	}

	type HumanRelativeConnection implements Connection {
		totalCount: Int!
		pageInfo: PageInfo!
		edges: [HumanRelativeEdge!]!
	}

	enum FamilialRelationshipType {
		FATHER
		STEP_FATHER

		MOTHER
		STEP_MOTHER

		BROTHER
		STEP_BROTHER

		SISTER
		STEP_SISTER
	}

	type HumanRelativeEdge implements ConnectionEdge {
		cursor: String!
		node: Human!
		familialRelationship: FamilialRelationshipType!
	}

	type Query {
		me: Human!
	}
`

export const humanResovlers: HumanResolvers = {
	friendsConnection: (source, { first, after }) =>
		makeConnection(source.friends.map(node => ({ node })), first, after),
	relativesConnection: (source, { first, after }) =>
		makeConnection<any, any>(
			source.relatives.map(node => ({
				node,
				additionalEdgeProperties: { familialRelationship: 'BROTHER' }
			})),
			first,
			after
		),
	projectsConnection: async (source, { first, after }) =>
		makeConnection(
			(await projectLoader(source.id)).map(project => ({ node: project })),
			first,
			after
		)
}
export const queryResolvers = {
	me: () => loadHumanById(123) || null
}

export const resolvers = {
	Human: humanResovlers,
	Query: queryResolvers
}

// for codegen
export const schema = typeDefs
