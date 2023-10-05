import { getTermsQuery } from './get-terms'
import { HomeDocument } from 'test/module'

describe('getTermsQuery', () => {
    it('accepts only schema fields', () => {
        const query = getTermsQuery<HomeDocument>('address', ['one', 'two', 'three'])

        expect(query).toEqual({
            terms: {
                address: ['one', 'two', 'three']
            }
        })
    })

    it('accepts only schema field with keyword', () => {
        const query = getTermsQuery<HomeDocument>('address.keyword', ['one', 'two', 'three'])

        expect(query).toEqual({
            terms: {
                'address.keyword': ['one', 'two', 'three']
            }
        })
    })
})
