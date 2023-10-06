import { HomeDocument } from 'test/module'
import { getMustQuery } from './get-must'
import { getTermQuery } from './get-term'

describe('getMustQuery', () => {
    it('accepts optional term query', () => {
        const query = getMustQuery<HomeDocument>({
            ...getTermQuery('hasProperty', true)
        })

        expect(query).toEqual({
            must: {
                term: { hasProperty: { value: true } }
            }
        })
    })
})
