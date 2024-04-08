import { HomeDocument } from 'test/module'
import { getTopHitsAggregation } from './get-top-hits'
import { Order } from '..'

describe('getTopHitsAggregation', () => {
    it('accepts only schema field', () => {
        const query = getTopHitsAggregation<HomeDocument>(1, {
            from: 0,
            includes: ['address', 'city', 'fullName'],
            sort: [
                { address: { order: Order.ASC } }
            ]
        })

        expect(query).toEqual({
            // eslint-disable-next-line camelcase
            top_hits: {
                size: 1,
                from: 0,
                sort: [
                    { address: { order: Order.ASC } }
                ],
                _source: {
                    includes: ['address', 'city', 'fullName']
                }
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
