import { HomeDocument } from 'test/module'
import { getTermsQuery } from './get-terms'

describe('getTermsQuery', () => {
    it('accepts only schema fields', () => {
        const query = getTermsQuery<HomeDocument>('address', ['one', 'two', 'three'])

        expect(query).toEqual({
            terms: {
                address: ['one', 'two', 'three']
            }
        })
    })
})
