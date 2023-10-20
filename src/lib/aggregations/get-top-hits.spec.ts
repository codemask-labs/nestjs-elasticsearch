import { HomeDocument } from 'test/module'
import { getTopHitsAggregation } from './get-top-hits'

describe('getTopHitsAggregation', () => {
    it('accepts only schema field', () => {
        const query = getTopHitsAggregation<HomeDocument>(1, {
            includes: ['address', 'city', 'fullName']
        })

        expect(query).toEqual({
            // eslint-disable-next-line camelcase
            top_hits: {
                size: 1,
                _source: {
                    includes: ['address', 'city', 'fullName']
                }
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
