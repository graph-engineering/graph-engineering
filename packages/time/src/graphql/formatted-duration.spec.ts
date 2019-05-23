import Moment from 'moment-timezone'
import * as FormattedDuration from './formatted-duration'
import { expectSimpleObjectType } from './utils'

describe('formatted duration', () => {
	const ten = Moment.duration(5, 'minutes')

	test('that a basic case works', () => {
		return expectSimpleObjectType(
			FormattedDuration.FormattedDuration,
			ten,
			`{
        humanized
        milliseconds
        seconds
        minutes
        hours
        days
        weeks
        months
        years
			}`
		).resolves.toEqual({
			days: 0.003472222222222222,
			hours: 0.08333333333333333,
			humanized: '5 minutes',
			milliseconds: 300000,
			minutes: 5,
			months: 0.00011407945862452114,
			seconds: 300,
			weeks: 0.000496031746031746,
			years: 0.000009506621552043427
		})
	})
})
