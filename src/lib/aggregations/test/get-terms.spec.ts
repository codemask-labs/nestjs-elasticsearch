import { MissingOrder, Order } from 'lib/enums'
import { ResponseError } from 'lib/common'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { HomeDocument } from 'test/module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { getTermsAggregation } from '../get-terms'
import { getNestedAggregation } from '../get-nested'

describe('getTermsAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema field with default size', () => {
        const query = getTermsAggregation<HomeDocument>('address.keyword')

        expect(query).toEqual({
            terms: {
                field: 'address.keyword'
            }
        })
    })

    it('accepts only schema field with default size and supports the nested array of objects', () => {
        const query = getTermsAggregation<HomeDocument>('animals.type.keyword')

        expect(query).toEqual({
            terms: {
                field: 'animals.type.keyword'
            }
        })
    })

    it('accepts only schema field with passed size', () => {
        const query = getTermsAggregation<HomeDocument>('address.keyword', 15)

        expect(query).toEqual({
            terms: {
                field: 'address.keyword',
                size: 15
            }
        })
    })

    it('accepts only schema field with passed size and order', () => {
        const query = getTermsAggregation<HomeDocument>('address.keyword', 15, {
            order: {
                path: Order.ASC
            }
        })

        expect(query).toEqual({
            terms: {
                field: 'address.keyword',
                size: 15,
                order: {
                    path: Order.ASC
                }
            }
        })
    })

    it('accepts only schema field with passed size, missing_bucket and missing_order', () => {
        const query = getTermsAggregation<HomeDocument>('address.keyword', 15, {
            missing_order: MissingOrder.First,
            missing_bucket: true
        })

        expect(query).toEqual({
            terms: {
                field: 'address.keyword',
                size: 15,
                missing_order: MissingOrder.First,
                missing_bucket: true
            }
        })
    })

    it('queries elasticsearch for terms aggregation with size', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            aggregations: {
                result: getTermsAggregation('city.keyword', 10)
            }
        })

        result.aggregations.result.buckets.forEach(bucket => {
            expect(bucket).toStrictEqual({
                doc_count: expect.any(Number),
                key: expect.any(String)
            })
        })
    })

    it('queries elasticsearch for terms aggregation and supports the nested array of objects', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                nestedAggregation: {
                    ...getNestedAggregation('animals'),
                    aggregations: {
                        result: getTermsAggregation('animals.type.keyword')
                    }
                }
            }
        })

        expect(result.aggregations.nestedAggregation.doc_count).not.toEqual(0)
        expect(result.aggregations.nestedAggregation.result.buckets).not.toEqual(0)
        result.aggregations.nestedAggregation.result.buckets.forEach(bucket => {
            expect(bucket).toStrictEqual({
                doc_count: expect.any(Number),
                key: expect.any(String)
            })
        })
    })

    it('throws error when terms aggregation is queried with field instead of keyword', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                aggregations: {
                    result: getTermsAggregation('city', 10)
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

    it('throws error when terms aggregation is queried with composite aggregation options', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                aggregations: {
                    result: getTermsAggregation('city', undefined, {
                        missing_bucket: true
                    })
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('x_content_parse_exception')
                expect(error.message).toContain('[terms] unknown field [missing_bucket]')
            })
    })

    it('throws error when terms aggregation is queried with composite aggregation options', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                aggregations: {
                    result: getTermsAggregation('city', undefined, {
                        missing_order: MissingOrder.First
                    })
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('x_content_parse_exception')
                expect(error.message).toContain('[terms] unknown field [missing_order]')
            })
    })
})
