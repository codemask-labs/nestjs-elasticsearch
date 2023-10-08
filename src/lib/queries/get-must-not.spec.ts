import { HomeDocument } from 'test/module'
import { getMustNotQuery } from './get-must-not'
import { getTermQuery } from './get-term'

describe('getMustNotQuery', () => {
    it('accepts optional term queries', () => {
        const query = getMustNotQuery<HomeDocument>({
            ...getTermQuery('hasProperty', true)
        })

        expect(query).toEqual({
            // eslint-disable-next-line camelcase
            must_not: {
                term: { hasProperty: { value: true } }
            }
        })
    })
})
