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
})
