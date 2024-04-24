import { HomeDocument } from 'test/module'
import { getSearchRequest } from '..'
import { getStatsBucketAggregation } from './get-stats-bucket'

describe('getRangeAggregation', () => {
    it('accepts only schema field', () => {
        const query = getStatsBucketAggregation('address')

        expect(query).toEqual({
            // eslint-disable-next-line camelcase
            stats_bucket: {
                // eslint-disable-next-line camelcase
                buckets_path: 'address'
            }
        })
    })

    it('accepts in get request', () => {
        const request = getSearchRequest(HomeDocument, {
            aggregations: {
                test: {
                    ...getStatsBucketAggregation('address')
                }
            }
        })

        expect(request).toEqual({
            index: 'homes',
            aggregations: {
                test: {
                    // eslint-disable-next-line camelcase
                    stats_bucket: {
                        // eslint-disable-next-line camelcase
                        buckets_path: 'address'
                    }
                }
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
