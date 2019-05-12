import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	printType
} from 'graphql'
import Moment from 'moment-timezone'
import { FormattedDuration } from './formatted-duration'
import { extractResolvers } from './utils'

// TODO: I'm not immediately sure why this can't be used below.
// interface FormattedFieldArgs {
// 	template: string
// 	timezone: string
// }

export const FormattedDate = new GraphQLObjectType({
	name: 'FormattedDate',
	fields: () => ({
		unix: {
			type: new GraphQLNonNull(FormattedDuration),
			resolve: (date: Date) => Moment.duration(date.valueOf(), 'ms')
		},
		iso: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: (date: Date) => date.toISOString()
		},
		humanized: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: (date: Date) => Moment(date).fromNow()
		},
		formatted: {
			type: new GraphQLNonNull(GraphQLString),
			args: {
				template: { type: new GraphQLNonNull(GraphQLString) },
				timezone: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: (date: Date, args: any) =>
				Moment(date)
					.tz(args.timezone)
					.format(args.template)
		}
	})
})

export const resolvers = extractResolvers(FormattedDate)

export const typeDefs = printType(FormattedDate)
