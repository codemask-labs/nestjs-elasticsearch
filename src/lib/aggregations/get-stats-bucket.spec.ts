import { ResponseError } from 'lib/common'
import { CalendarIntervalName } from 'lib/enums'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getStatsBucketAggregation } from './get-stats-bucket'
import { getTermsAggregation } from './get-terms'
import { getDateHistogramAggregation } from './get-date-histogram'
import { getSumAggregation } from './get-sum'

describe('getStatsBucketAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema field', () => {
        const query = getStatsBucketAggregation('address')

        expect(query).toEqual({
            stats_bucket: {
                buckets_path: 'address'
            }
        })
    })

    it('should query elasticsearch for stats bucket aggregation', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getTermsAggregation('address.keyword', 100),
                statsResult: getStatsBucketAggregation('result._count')
            }
        })

        expect(result.aggregations.statsResult).toEqual(
            expect.objectContaining({
                count: expect.any(Number),
                min: expect.any(Number),
                max: expect.any(Number),
                avg: expect.any(Number),
                sum: expect.any(Number)
            })
        )
    })

    it('should query elasticsearch for stats bucket aggregation with nested aggregation', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: {
                    ...getDateHistogramAggregation('contractDate', CalendarIntervalName.MONTH),
                    aggregations: {
                        innerResult: getSumAggregation('propertyAreaSquared')
                    }
                },
                statsResult: getStatsBucketAggregation('result>innerResult')
            }
        })

        expect(result.aggregations.statsResult).toEqual(
            expect.objectContaining({
                count: expect.any(Number),
                min: expect.any(Number),
                max: expect.any(Number),
                avg: expect.any(Number),
                sum: expect.any(Number)
            })
        )
    })

    it('should return an error after passing field name instead of an aggregation name', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    result: getStatsBucketAggregation('address')
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('action_request_validation_exception')
                expect(error.message).toContain('No aggregation found for path [address]')
            })
    })

    it(`should return an error after passing field with 'keyword' instead of an aggregation name`, async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    result: getStatsBucketAggregation('address.keyword')
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('action_request_validation_exception')
                expect(error.message).toContain('No aggregation found for path [address.keyword]')
            })
    })
})
