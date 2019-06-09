import { getTwoHoursAgo } from '../test-dev-server/utils'
import * as FormattedDate from './formatted-date'
import { expectSimpleObjectType } from './utils'

describe('formatted duration', () => {
	const twoHoursAgo = getTwoHoursAgo()
	const twoHoursAgoDate = new Date(twoHoursAgo)

	test('that a basic case works', () => {
		return expectSimpleObjectType(
			FormattedDate.FormattedDate,
			twoHoursAgo,
			`
			{
				humanized
				iso
				unix {
					seconds
				}
				formatted(template: "YYYY-MM-DD")
			}`
		).resolves.toEqual({
			humanized: '2 hours ago',
			iso: twoHoursAgoDate.toISOString(),
			unix: {
				seconds: twoHoursAgoDate.getTime() / 1000
			},
			formatted: twoHoursAgoDate.toISOString().slice(0, 10)
		})
	})
})
