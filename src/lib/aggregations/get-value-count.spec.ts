import { HomeDocument } from 'test/module'
import { getValueCountAggregation } from './get-value-count'

describe('getValueCountAggregation', () => {
    it('accepts only schema field', () => {
        const query = getValueCountAggregation<HomeDocument>('address')

        expect(query).toEqual({
            value_count: {
                field: 'address'
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
