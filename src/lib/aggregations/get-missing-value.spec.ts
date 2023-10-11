import { HomeDocument } from 'test/module'
import { getMissingValueAggregation } from './get-missing-value'

describe('getMissingValueAggregation', () => {
    it('accepts only schema field', () => {
        const query = getMissingValueAggregation<HomeDocument>('address')

        expect(query).toEqual({
            missing: {
                field: 'address'
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
