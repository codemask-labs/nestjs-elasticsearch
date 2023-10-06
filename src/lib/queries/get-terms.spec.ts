import { getTermsQuery } from './get-terms'

describe('getTermsQuery', () => {
    it('accepts only schema fields', () => {
        const query = getTermsQuery('address', ['one', 'two', 'three'])

        expect(query).toEqual({
            terms: {
                address: ['one', 'two', 'three']
            }
        })
    })

    it('accepts only schema field with keyword', () => {
        const query = getTermsQuery('address.keyword', ['one', 'two', 'three'])

        expect(query).toEqual({
            terms: {
                'address.keyword': ['one', 'two', 'three']
            }
        })
    })
})
