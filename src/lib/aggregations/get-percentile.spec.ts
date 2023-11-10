import { HomeDocument } from 'test/module'
import { getPercentileAggregation } from './get-percentile'

describe('getPercentileAggregation', () => {
    it('accepts only schema field and passed percentiles', () => {
        const query = getPercentileAggregation<HomeDocument>('address', [5, 10, 15])

        expect(query).toEqual({
            percentiles: {
                field: 'address',
                percentiles: [5, 10, 15]
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
