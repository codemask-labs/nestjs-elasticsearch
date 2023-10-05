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

    it('accepts only schema field with keyword', () => {
        const query = getSumAggregation<HomeDocument>('address.keyword')

        expect(query).toEqual({
            sum: {
                field: 'address.keyword'
            }
        })
    })
})
