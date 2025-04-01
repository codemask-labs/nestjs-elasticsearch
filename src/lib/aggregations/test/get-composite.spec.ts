import { ResponseError } from 'lib/common'
import { Order } from 'lib/enums'
import { getCompositeSources } from 'lib/utils'
import { HomeDocument } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { getCompositeAggregation } from '../get-composite'
import { getTermsAggregation } from '../get-terms'
import { getTopHitsAggregation } from '../get-top-hits'

describe('getCompositeAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE,
            }),
        ],
    })

    it('accepts only schema fields', () => {
        const sources = getCompositeSources<HomeDocument>([
            { first: getTermsAggregation('address.keyword') },
            { second: getTermsAggregation('city.keyword') },
        ])

        const query = getCompositeAggregation<HomeDocument>(sources, {
            after: {
                address: 'test address',
                city: 'test city',
            },
        })

        expect(query).toEqual({
            composite: {
                sources,
                after: {
                    address: 'test address',
                    city: 'test city',
                },
            },
        })
    })

    it('queries for composite aggregation that returns address and city keys', async () => {
        const service = app.get(ElasticsearchService)
        const sources = getCompositeSources<HomeDocument>([
            { address: getTermsAggregation('address.keyword') },
            { city: getTermsAggregation('city.keyword') },
        ])

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getCompositeAggregation(sources),
            },
        })

        result.aggregations.result.buckets.forEach(bucket => {
            expect(bucket).toStrictEqual({
                doc_count: expect.any(Number),
                key: {
                    address: expect.any(String),
                    city: expect.any(String),
                },
            })
        })
    })

    it('queries for composite aggregation that returns address and city keys', async () => {
        const service = app.get(ElasticsearchService)
        const sources = getCompositeSources<HomeDocument>([
            { address: getTermsAggregation('address.keyword') },
            { city: getTermsAggregation('city.keyword') },
        ])

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: {
                    ...getCompositeAggregation(sources),
                    aggregations: {
                        innerResult: getTopHitsAggregation(1),
                    },
                },
            },
        })

        result.aggregations.result.buckets.forEach(bucket => {
            expect(bucket).toStrictEqual({
                doc_count: expect.any(Number),
                key: {
                    address: expect.any(String),
                    city: expect.any(String),
                },
                innerResult: {
                    hits: {
                        hits: expect.arrayContaining([
                            {
                                _index: 'homes',
                                _id: expect.any(String),
                                _score: 1,
                                _source: expect.any(Object),
                            },
                        ]),
                        max_score: 1,
                        total: {
                            relation: 'eq',
                            value: 1,
                        },
                    },
                },
            })
        })
    })

    it('queries for composite aggregation that returns address and city keys with undefined size and sorting', async () => {
        const service = app.get(ElasticsearchService)
        const sources = getCompositeSources<HomeDocument>([
            {
                address: getTermsAggregation('address.keyword', undefined, {
                    order: Order.ASC,
                }),
            },
            { city: getTermsAggregation('city.keyword') },
        ])

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getCompositeAggregation(sources),
            },
        })

        result.aggregations.result.buckets.forEach(bucket => {
            expect(bucket).toStrictEqual({
                doc_count: expect.any(Number),
                key: {
                    address: expect.any(String),
                    city: expect.any(String),
                },
            })
        })
    })

    it('throws error in composite aggregation when source terms specified size', async () => {
        const service = app.get(ElasticsearchService)
        const sources = getCompositeSources<HomeDocument>([
            {
                address: getTermsAggregation('address.keyword', 10),
            },
        ])

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    result: getCompositeAggregation(sources),
                },
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('x_content_parse_exception')
                expect(error.message).toContain('[terms] unknown field [size]')
            })
    })

    it('queries for composite aggregation that returns enum keys', async () => {
        enum SourceKey {
            Address = 'address',
            City = 'city',
        }

        const service = app.get(ElasticsearchService)
        const sources = getCompositeSources<HomeDocument>([
            { [SourceKey.Address]: getTermsAggregation('address.keyword') },
            { [SourceKey.City]: getTermsAggregation('city.keyword') },
        ])

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getCompositeAggregation(sources),
            },
        })

        result.aggregations.result.buckets.forEach(bucket => {
            expect(bucket).toStrictEqual({
                doc_count: expect.any(Number),
                key: {
                    [SourceKey.Address]: expect.any(String),
                    [SourceKey.City]: expect.any(String),
                },
            })
        })
    })
})
