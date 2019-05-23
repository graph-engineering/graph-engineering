import gql from 'graphql-tag'
import { FamilialRelationshipType, HumanResolvers } from '../__generated__'
import * as Connection from '../src'
import { loadHumanById, projectLoader } from './loaders'

// take connection stuff out
export const typeDefs = gql`
	${Connection.typeDefs}

	type Project {
		id: String!
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

// TODO: make sure typegen will guard against putting wrong familial relationships in

export const humanResovlers: HumanResolvers = {
	friendsConnection: (source, { first, after }) =>
		Connection.makeConnection(
			source.friends.map(node => ({ node, additionalEdgeProperties: {} })),
			first,
			after
		),
	relativesConnection: (source, { first, after }) =>
		Connection.makeConnection(
			source.relatives.map(node => ({
				node,
				additionalEdgeProperties: {
					familialRelationship: FamilialRelationshipType.Brother
				}
			})),
			first,
			after
		),
	projectsConnection: async (source, { first, after }) =>
		Connection.makeConnection(
			(await projectLoader(source.id)).map(project => ({
				node: project,
				additionalEdgeProperties: {}
			})),
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
