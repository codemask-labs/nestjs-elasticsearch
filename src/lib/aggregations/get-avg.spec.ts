import { HomeDocument } from 'test/module'
import { getAvgAggregation } from './get-avg'

describe('getAvgAggregation', () => {
    it('accepts only schema field', () => {
        const query = getAvgAggregation<HomeDocument>('address')

        expect(query).toEqual({
            avg: {
                field: 'address'
            }
        })
    })

    it('accepts only schema field with keyword', () => {
        const query = getAvgAggregation<HomeDocument>('address.keyword')

        expect(query).toEqual({
            avg: {
                field: 'address.keyword'
            }
        })
    })
})
