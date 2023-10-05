import { getTermQuery } from './get-term'
import { HomeDocument } from 'test/module'

describe('getTermQuery', () => {
    it('accepts only schema fields', () => {
        const query = getTermQuery<HomeDocument>('address', 'test')

        expect(query).toEqual({
            term: {
                address: {
                    value: 'test'
                }
            }
        })
    })

    it('accepts only schema fields with keyword', () => {
        const query = getTermQuery<HomeDocument>('address.keyword', 'test')

        expect(query).toEqual({
            term: {
                'address.keyword': {
                    value: 'test'
                }
            }
        })
    })
})
