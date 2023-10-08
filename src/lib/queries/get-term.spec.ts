import { getTermQuery } from './get-term'

describe('getTermQuery', () => {
    it('accepts only schema fields', () => {
        const query = getTermQuery('address', 'test')

        expect(query).toEqual({
            term: {
                address: {
                    value: 'test'
                }
            }
        })
    })
})
