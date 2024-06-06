/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import { ResponseError } from 'lib/common'
import { Order } from 'lib/enums'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getTopHitsAggregation } from './get-top-hits'
import { getTermsAggregation } from './get-terms'

describe('getTopHitsAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema field', () => {
        const query = getTopHitsAggregation<HomeDocument>(1, {
            from: 0,
            includes: ['address', 'city', 'fullName'],
            sort: [{ address: { order: Order.ASC } }]
        })

        expect(query).toEqual({
            top_hits: {
                size: 1,
                from: 0,
                sort: [{ address: { order: Order.ASC } }],
                _source: {
                    includes: ['address', 'city', 'fullName']
                }
            }
        })
    })

    it('accepts only schema field with keyword', () => {
        const query = getTopHitsAggregation<HomeDocument>(1, {
            from: 0,
            includes: ['address', 'city', 'fullName'],
            sort: [{ 'address.keyword': { order: Order.ASC } }]
        })

        expect(query).toEqual({
            top_hits: {
                size: 1,
                from: 0,
                sort: [{ 'address.keyword': { order: Order.ASC } }],
                _source: {
                    includes: ['address', 'city', 'fullName']
                }
            }
        })
    })

    it('should query elasticsearch for top hits aggregation', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getTopHitsAggregation()
            }
        })

        expect(result.aggregations.result.hits).toEqual(
            expect.objectContaining({
                total: expect.objectContaining({
                    value: expect.any(Number),
                    relation: expect.any(String)
                }),
                max_score: expect.any(Number),
                hits: expect.any(Array)
            })
        )
    })

    it('should query elasticsearch for nested top hits aggregation', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: {
                    ...getTermsAggregation('address.keyword'),
                    aggregations: {
                        innerResult: getTopHitsAggregation()
                    }
                }
            }
        })

        const responseBuckets = result.aggregations.result.buckets

        responseBuckets.map(bucket =>
            expect(bucket.innerResult.hits).toEqual(
                expect.objectContaining({
                    total: expect.objectContaining({
                        value: expect.any(Number),
                        relation: expect.any(String)
                    }),
                    max_score: expect.any(Number),
                    hits: expect.any(Array)
                })
            )
        )
    })

    it('should query elasticsearch for nested top hits aggregation with size', async () => {
        const service = app.get(ElasticsearchService)
        const size = 5

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: {
                    ...getTermsAggregation('propertyType.keyword'),
                    aggregations: {
                        innerResult: getTopHitsAggregation(size)
                    }
                }
            }
        })

        const responseBuckets = result.aggregations.result.buckets

        responseBuckets.forEach(bucket => expect(bucket.innerResult.hits.hits.length).toBeLessThanOrEqual(size))
    })

    it('should query elasticsearch for nested top hits aggregation with includes option', async () => {
        const service = app.get(ElasticsearchService)
        const size = 5

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: {
                    ...getTermsAggregation('propertyType.keyword'),
                    aggregations: {
                        innerResult: getTopHitsAggregation(size, {
                            includes: ['city']
                        })
                    }
                }
            }
        })

        const responseBuckets = result.aggregations.result.buckets

        responseBuckets.forEach(bucket => bucket.innerResult.hits.hits.forEach(hit => expect(hit._source).toHaveProperty('city')))
    })

    it('should query elasticsearch for nested top hits aggregation with sort option', async () => {
        const service = app.get(ElasticsearchService)
        const size = 5

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: {
                    ...getTermsAggregation('propertyType.keyword', 1),
                    aggregations: {
                        innerResult: getTopHitsAggregation(size, {
                            sort: [
                                {
                                    contractDate: {
                                        order: Order.ASC
                                    }
                                }
                            ],
                            includes: ['contractDate']
                        })
                    }
                }
            }
        })

        const responseBuckets = result.aggregations.result.buckets

        responseBuckets.forEach(bucket => {
            const responseHits = bucket.innerResult.hits.hits
            const contractDates = responseHits.map(({ _source }) => ({
                contractDate: _source?.contractDate ? new Date(_source?.contractDate) : null
            }))

            const firstContractDate = contractDates.at(0)?.contractDate?.getTime()
            const lastContractDate = contractDates.at(-1)?.contractDate?.getTime()

            if (!firstContractDate || !lastContractDate) {
                expect(firstContractDate).toBeDefined()
                expect(lastContractDate).toBeDefined()

                return
            }

            expect(lastContractDate).toBeGreaterThan(firstContractDate)
        })
    })

    it('should return an error when size is greater than 100', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    result: getTopHitsAggregation(1000)
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception')
                expect(error.message).toContain('illegal_argument_exception')
                expect(error.message).toContain(
                    `Top hits result window is too large, the top hits aggregator [result]'s from + size must be less than or equal to: [100] but was [1000].`
                )
            })
    })

    it('should return an error when size and from option are greater than 100', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    result: getTopHitsAggregation(97, {
                        from: 10
                    })
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception')
                expect(error.message).toContain('illegal_argument_exception')
                expect(error.message).toContain(
                    `Top hits result window is too large, the top hits aggregator [result]'s from + size must be less than or equal to: [100] but was [107].`
                )
            })
    })
})
