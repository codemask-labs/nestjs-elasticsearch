import { HomeDocument } from 'test/module'
import { getAggregations } from './get-aggregations'
import { getTermsAggregation } from './get-terms'

describe('getAvgAggregation', () => {
    it('accepts only schema field', () => {
        const query = getAggregations<HomeDocument>({
            test: getTermsAggregation('address.keyword')
        })

        expect(query).toEqual({
            test: {
                terms: { field: 'address.keyword' }
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
