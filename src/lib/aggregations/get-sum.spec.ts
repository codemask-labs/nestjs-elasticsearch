import { HomeDocument } from 'test/module'
import { getSumAggregation } from './get-sum'

describe('getSumAggregation', () => {
    it('accepts only schema field', () => {
        const query = getSumAggregation<HomeDocument>('address')

        expect(query).toEqual({
            sum: {
                field: 'address'
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
