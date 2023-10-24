/* eslint-disable camelcase */
import { HomeDocument } from 'test/module'
import { getCardinalityAggregation } from './get-cardinality'

describe('getCardinalityAggregation', () => {
    it('accepts only schema field', () => {
        const query = getCardinalityAggregation<HomeDocument>('address', {
            precision_threshold: 1000
        })

        expect(query).toEqual({
            cardinality: {
                field: 'address',
                precision_threshold: 1000
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
