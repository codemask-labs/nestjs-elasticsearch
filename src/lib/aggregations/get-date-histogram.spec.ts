/* eslint-disable camelcase */
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { CalendarIntervalName, CalendarIntervalQuantity } from 'lib/enums'
import { ResponseError } from 'lib/common'
import { getDateHistogramAggregation } from './get-date-histogram'

describe('getDateHistogramAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema field with calendar interval name', () => {
        const query = getDateHistogramAggregation<HomeDocument>('contractDate', CalendarIntervalName.DAY)

        expect(query).toEqual({
            date_histogram: {
                field: 'contractDate',
                calendar_interval: 'day'
            }
        })
    })

    it('accepts only schema field with calendar interval quantity', () => {
        const query = getDateHistogramAggregation<HomeDocument>('contractDate', CalendarIntervalQuantity.DAY)

        expect(query).toEqual({
            date_histogram: {
                field: 'contractDate',
                calendar_interval: '1d'
            }
        })
    })

    it('accepts custom enum that extends same keys', () => {
        enum SelectedTimePeriod {
            DAY = 'day'
        }

        const query = getDateHistogramAggregation<HomeDocument>('contractDate', SelectedTimePeriod.DAY)

        expect(query).toEqual({
            date_histogram: {
                field: 'contractDate',
                calendar_interval: 'day'
            }
        })
    })

    it('should query elasticsearch for date histogram aggregation', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getDateHistogramAggregation('contractDate', CalendarIntervalName.DAY)
            }
        })

        const responseBuckets = result.aggregations.result.buckets

        responseBuckets.forEach(bucket =>
            expect(bucket).toEqual(
                expect.objectContaining({
                    key_as_string: expect.any(String),
                    key: expect.any(Number),
                    doc_count: expect.any(Number)
                })
            )
        )
    })

    it('should query elasticsearch for date histogram aggregation with min doc count', async () => {
        const service = app.get(ElasticsearchService)
        const minDocCount = 1

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getDateHistogramAggregation('contractDate', CalendarIntervalName.DAY, {
                    min_doc_count: minDocCount
                })
            }
        })

        const responseBuckets = result.aggregations.result.buckets
        responseBuckets.forEach(bucket => expect(bucket.doc_count).toBeGreaterThanOrEqual(minDocCount))
    })

    it('should return an error after passing field which is text', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    histogram: getDateHistogramAggregation('propertyAreaSquaredAsString', CalendarIntervalName.DAY)
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception')
                expect(error.message).toContain('illegal_argument_exception')
                expect(error.message).toContain(
                    'Text fields are not optimised for operations that require per-document field data like aggregations and sorting, so these operations are disabled by default.'
                )
            })
    })

    it(`should return an error after passing string field with 'keyword'`, async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    result: getDateHistogramAggregation('address.keyword' as any, CalendarIntervalName.DAY)
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception')
                expect(error.message).toContain('illegal_argument_exception')
                expect(error.message).toContain('Field [address.keyword] of type [keyword] is not supported for aggregation [date_histogram]')
            })
    })
})
