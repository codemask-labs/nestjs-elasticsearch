/* eslint-disable camelcase */
import { getSumAggregation, getTermsAggregation } from 'lib/aggregations'
import { HomeDocument } from 'test/module'
import { Order } from 'lib/enums'
import { getSearchRequest } from './get-search-request'

describe('getSearchRequest', () => {
    it('returns a search request', () => {
        const request = getSearchRequest(HomeDocument, {
            aggregations: {
                test: {
                    ...getTermsAggregation('address.keyword'),
                    aggregations: {
                        value: getSumAggregation('builtInYear')
                    }
                }
            }
        })

        expect(request).toEqual({
            index: 'homes',
            aggregations: {
                test: {
                    terms: { field: 'address.keyword' },
                    aggregations: {
                        value: {
                            sum: { field: 'builtInYear' }
                        }
                    }
                }
            }
        })
    })

    it('should add sort to the search request if added in the request', () => {
        const request = getSearchRequest(HomeDocument, {
            sort: {
                'address.keyword': {
                    order: Order.DESC
                }
            }
        })

        expect(request).toEqual({
            index: 'homes',
            sort: {
                'address.keyword': {
                    order: 'desc'
                }
            }
        })
    })

    it('should support search_after if added in the request', () => {
        const request = getSearchRequest(HomeDocument, {
            sort: {
                'address.keyword': {
                    order: Order.DESC
                }
            },
            search_after: ['1']
        })

        expect(request).toEqual({
            index: 'homes',
            sort: {
                'address.keyword': {
                    order: 'desc'
                }
            },
            search_after: ['1']
        })
    })
})
