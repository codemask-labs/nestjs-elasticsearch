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

    it('accepts only schema fields with keyword', () => {
        const query = getTermQuery('address.keyword', 'test')

        expect(query).toEqual({
            term: {
                'address.keyword': {
                    value: 'test'
                }
            }
        })
    })
})
