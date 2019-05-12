import * as FormattedDate from './formatted-date'
import { expectSimpleObjectType } from './utils'

describe('formatted duration', () => {
	const twoHoursAgoDate = new Date()
	twoHoursAgoDate.setHours(twoHoursAgoDate.getHours() - 2)

	test('that a basic case works', () => {
		return expectSimpleObjectType(
			FormattedDate.FormattedDate,
			twoHoursAgoDate,
			`
			{
				humanized
				iso
				unix {
					seconds
				}
				formatted(template: "YYYY-MM-DD", timezone: "GMT")
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
