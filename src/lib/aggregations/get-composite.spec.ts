import { getCompositeSources } from 'lib/utils'
import { HomeDocument } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { getCompositeAggregation } from './get-composite'
import { getTermsAggregation } from './get-terms'

describe('getCompositeAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema field', () => {
        const sources = getCompositeSources<HomeDocument>([
            { first: getTermsAggregation('address.keyword') },
            { second: getTermsAggregation('city.keyword') }
        ])

        const query = getCompositeAggregation<HomeDocument>(sources, {
            after: {
                address: 'test address',
                city: 'test city'
            }
        })

        expect(query).toEqual({
            composite: {
                sources,
                after: {
                    address: 'test address',
                    city: 'test city'
                }
            }
        })
    })

    it('returns composite aggregation returns address and city keys', async () => {
        const service = app.get(ElasticsearchService)

        const sources = getCompositeSources<HomeDocument>([
            { address: getTermsAggregation('address.keyword') },
            { city: getTermsAggregation('city.keyword') }
        ])

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getCompositeAggregation(sources)
            }
        })

        result.aggregations.result.buckets.forEach(bucket => {
            expect(bucket).toStrictEqual({
                // eslint-disable-next-line camelcase
                doc_count: expect.any(Number),
                key: {
                    address: expect.any(String),
                    city: expect.any(String)
                }
            })
        })
    })

    it('returns composite aggregation returns enum keys', async () => {
        enum SourceKey {
            Address = 'address',
            City = 'city'
        }

        const service = app.get(ElasticsearchService)

        const sources = getCompositeSources<HomeDocument>([
            { [SourceKey.Address]: getTermsAggregation('address.keyword') },
            { [SourceKey.City]: getTermsAggregation('city.keyword') }
        ])

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getCompositeAggregation(sources)
            }
        })

        result.aggregations.result.buckets.forEach(bucket => {
            expect(bucket).toStrictEqual({
                // eslint-disable-next-line camelcase
                doc_count: expect.any(Number),
                key: {
                    [SourceKey.Address]: expect.any(String),
                    [SourceKey.City]: expect.any(String)
                }
            })
        })
    })
})
