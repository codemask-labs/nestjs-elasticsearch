import { ResponseError } from '@elastic/elasticsearch/lib/errors.js'
import { Range } from 'lib/common'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getRangeAggregation } from './get-range'
import { getTermsAggregation } from './get-terms'

describe('getRangeAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    const ranges: Array<Range> = [
        {
            from: 10
        },
        {
            from: 15,
            to: 20
        },
        {
            to: 25
        }
    ]

    it('accepts only schema numeric field', () => {
        const query = getRangeAggregation<HomeDocument>('propertyAreaSquared', ranges)

        expect(query).toEqual({
            range: {
                field: 'propertyAreaSquared',
                ranges: [{ from: 10 }, { from: 15, to: 20 }, { to: 25 }]
            }
        })
    })

    it('should queries elasticsearch for range aggregation ', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                testAggregation: getRangeAggregation('propertyAreaSquared', ranges)
            }
        })

        const expectedResponseShape = [
            {
                key: '*-25.0',
                to: 25,
                doc_count: expect.any(Number)
            },
            {
                key: '10.0-*',
                from: 10,
                doc_count: expect.any(Number)
            },
            {
                key: '15.0-20.0',
                from: 15,
                to: 20,
                doc_count: expect.any(Number)
            }
        ]

        expect(result.aggregations.testAggregation.buckets).toEqual(expectedResponseShape)
    })

    it('should queries elasticsearch for range aggregation with nested aggregation', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 10,
            aggregations: {
                testAggregation: {
                    ...getRangeAggregation('propertyAreaSquared', ranges),
                    aggregations: {
                        testAggregation2: getTermsAggregation('address.keyword', 1)
                    }
                }
            }
        })

        const expectedResponseShape = [
            {
                doc_count: expect.any(Number),
                key: '*-25.0',
                to: 25,
                testAggregation2: {
                    buckets: expect.any(Array),
                    doc_count_error_upper_bound: expect.any(Number),
                    sum_other_doc_count: expect.any(Number)
                }
            },
            {
                doc_count: expect.any(Number),
                key: '10.0-*',
                from: 10,
                testAggregation2: {
                    buckets: expect.any(Array),
                    doc_count_error_upper_bound: expect.any(Number),
                    sum_other_doc_count: expect.any(Number)
                }
            },
            {
                doc_count: expect.any(Number),
                key: '15.0-20.0',
                from: 15,
                to: 20,
                testAggregation2: {
                    buckets: expect.any(Array),
                    doc_count_error_upper_bound: expect.any(Number),
                    sum_other_doc_count: expect.any(Number)
                }
            }
        ]

        expect(result.aggregations.testAggregation.buckets).toEqual(expectedResponseShape)
    })

    it('should return an error after passing string field', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    testAggregation: getRangeAggregation('address' as any, ranges)
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception: [illegal_argument_exception]')
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
                    testAggregation: getRangeAggregation('address.keyword' as any, ranges)
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception: [illegal_argument_exception]')
                expect(error.message).toContain('Field [address.keyword] of type [keyword] is not supported for aggregation [range]')
            })
    })
})
