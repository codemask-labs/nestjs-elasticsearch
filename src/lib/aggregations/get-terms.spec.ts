/* eslint-disable camelcase */
import { MissingOrder, Order } from 'lib/enums'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { HomeDocument } from 'test/module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { getTermsAggregation } from './get-terms'
import { ResponseError } from '@elastic/elasticsearch/lib/errors.js'

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
                expect(error.message).toContain('search_phase_execution_exception: [illegal_argument_exception]')
                expect(error.message).toContain(
                    'Reason: Text fields are not optimised for operations that require per-document field data like aggregations and sorting, so these operations are disabled by default.'
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
                expect(error.message).toContain(
                    'x_content_parse_exception: [x_content_parse_exception] Reason: [1:52] [terms] unknown field [missing_bucket]'
                )
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
                expect(error.message).toContain(
                    'x_content_parse_exception: [x_content_parse_exception] Reason: [1:52] [terms] unknown field [missing_order]'
                )
            })
    })
})
