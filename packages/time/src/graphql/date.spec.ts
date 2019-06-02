// import Moment from 'moment'
import * as Date from './date'

describe('formatted duration', () => {
	//

	it('should work', () => {
		// console.log('---', Date.scalar.parseValue('2019-05-26T04:03:11.455Z'))
		const date = Date.scalar.parseValue('2019-05-26T04:03:11.455Z')
		expect(date.toISOString()).toEqual('2019-05-26T04:03:11.455Z')
	})
})
