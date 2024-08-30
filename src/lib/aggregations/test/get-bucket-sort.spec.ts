import { ResponseError } from '@elastic/elasticsearch/lib/errors.js'
import { Order } from 'lib/enums'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getTermsAggregation } from '../get-terms'
import { getSumAggregation } from '../get-sum'
import { getBucketSortAggregation } from '../get-bucket-sort'

describe('getBucketSortAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts all parameters', () => {
        const query = getBucketSortAggregation({
            sort: [
                { somePath: { order: Order.ASC } }
            ],
            from: 0,
            size: 3
        })

        expect(query).toEqual({
            bucket_sort: {
                sort: [
                    { somePath: { order: Order.ASC } }
                ],
                from: 0,
                size: 3
            }
        })
    })

    it('accepts no parameters', () => {
        // note: it will of course throw error while quering elastic
        const query = getBucketSortAggregation({})

        expect(query).toEqual({
            bucket_sort: {}
        })
    })

    it('accepts no arguments', () => {
        // note: it will of course throw error while quering elastic
        const query = getBucketSortAggregation()

        expect(query).toEqual({
            bucket_sort: {}
        })
    })

    it('should query elasticsearch for bucket sort aggregation', async () => {
        const service = app.get(ElasticsearchService)

        const size = 3

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                date: {
                    ...getTermsAggregation('contractDate'),
                    aggregations: {
                        sum: getSumAggregation('builtInYear'),
                        bucketSort: getBucketSortAggregation({
                            sort: [
                                { sum: { order: Order.ASC } }
                            ],
                            from: 0,
                            size
                        })
                    }
                }
            }
        })

        expect(result.aggregations.date.buckets.length).toEqual(size)

        result.aggregations.date.buckets.forEach(bucket => {
            expect(bucket.sum).toEqual(
                expect.objectContaining({
                    value: expect.any(Number)
                })
            )
        })

        const [firstBucket, secondBucket, thirdBucket] = result.aggregations.date.buckets

        expect(firstBucket.sum.value).toBeLessThanOrEqual(secondBucket.sum.value)
        expect(secondBucket.sum.value).toBeLessThanOrEqual(thirdBucket.sum.value)
    })

    it('should return an error if bucket sort aggregation is not inside another aggregation', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    sum: getSumAggregation('builtInYear'),
                    bucketSort: getBucketSortAggregation({
                        sort: [
                            { sum: { order: Order.ASC } }
                        ]
                    })
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('action_request_validation_exception')
                expect(error.message).toContain('bucket_sort aggregation [bucketSort] must be declared inside of another aggregation')
            })
    })

    it(`should return an error if bucket sort tries to use non existing aggregation path`, async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    sum: getSumAggregation('builtInYear'),
                    bucketSort: getBucketSortAggregation({
                        sort: [
                            { sumAggregation: { order: Order.ASC } }
                        ]
                    })
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('action_request_validation_exception')
                expect(error.message).toContain('No aggregation found for path [sumAggregation]')
            })
    })

    it(`should return an error if bucket sort paramters object is empty`, async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    date: {
                        ...getTermsAggregation('contractDate'),
                        aggregations: {
                            sum: getSumAggregation('builtInYear'),
                            bucketSort: getBucketSortAggregation({})
                        }
                    }
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('action_request_validation_exception')
                expect(error.message).toContain('[bucketSort] is configured to perform nothing. Please set either of [sort, size, from] to use bucket_sort')
            })
    })
})
