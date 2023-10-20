import { HomeDocument } from 'test/module'
import { getCardinalityAggregation } from './get-cardinality'

describe('getCardinalityAggregation', () => {
    it('accepts only schema field', () => {
        const query = getCardinalityAggregation<HomeDocument>('address')

        expect(query).toEqual({
            // eslint-disable-next-line camelcase
            cardinality: {
                field: 'address'
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
