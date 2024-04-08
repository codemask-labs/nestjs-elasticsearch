import { getTermsAggregation } from 'lib/aggregations'
import { HomeDocument } from 'test/module'
import { getSearchRequest } from './get-search-request'

describe('getSearchRequest', () => {
    it('returns a search request', () => {
        const request = getSearchRequest(HomeDocument, {
            aggregations: {
                test: {
                    ...getTermsAggregation('address.keyword')
                }
            }
        })

        expect(request).toEqual({
            index: 'homes',
            aggregations: {
                test: {
                    terms: { field: 'address.keyword' }
                }
            }
        })
    })
})
