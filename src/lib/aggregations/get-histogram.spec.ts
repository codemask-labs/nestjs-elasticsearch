import { HomeDocument } from 'test/module'
import { getHistogramAggregation } from './get-histogram'

describe('getHistogramAggregation', () => {
    it('accepts only schema field', () => {
        const query = getHistogramAggregation<HomeDocument>('city', 5)

        expect(query).toEqual({
            histogram: {
                field: 'city',
                interval: 5
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
