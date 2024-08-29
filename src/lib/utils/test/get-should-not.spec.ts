import { HomeDocument } from 'test/module'
import { getTermQuery } from 'lib/queries'
import { getShouldNotQuery } from '../get-should-not'

describe('getShouldNotQuery', () => {
    it('accepts optional term queries', () => {
        const query = getShouldNotQuery<HomeDocument>({
            ...getTermQuery('hasProperty', true)
        })

        expect(query).toEqual({
            should: {
                bool: {
                    must_not: {
                        term: { hasProperty: { value: true } }
                    }
                }
            }
        })
    })
})
