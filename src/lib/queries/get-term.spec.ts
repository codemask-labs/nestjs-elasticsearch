import { HomeDocument } from 'test/module'
import { getTermQuery } from './get-term'

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
})
