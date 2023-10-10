import { HomeDocument } from 'test/module'
import { getTermsAggregation } from './get-terms'

describe('getTermsAggregation', () => {
    it('accepts only schema field with default size', () => {
        const query = getTermsAggregation<HomeDocument>('address.keyword')

        expect(query).toEqual({
            terms: {
                field: 'address.keyword',
                size: 10
            }
        })
    })

    it('accepts only schema field with passed size', () => {
        const query = getTermsAggregation<HomeDocument>('address.keyword', 15)

        expect(query).toEqual({
            terms: {
                field: 'address.keyword',
                size: 15
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
