import { HomeDocument, PropertyType } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getMustNotQuery } from './get-must-not'
import { getTermQuery } from './get-term'
import { getBoolQuery } from './get-bool'
import { getTermsQuery } from './get-terms'
import { getMustQuery } from './get-must'
import { getExistsQuery } from './get-exists'
import { getRangeQuery } from './get-range'

describe('getMustNotQuery', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts optional term queries', () => {
        const query = getMustNotQuery<HomeDocument>({
            ...getTermQuery('hasProperty', true)
        })

        expect(query).toEqual({
            // eslint-disable-next-line camelcase
            must_not: {
                term: { hasProperty: { value: true } }
            }
        })
    })

    it('should query elasticsearch for must not query with term query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustNotQuery({
                    ...getTermQuery('hasProperty', false)
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.hasProperty).not.toBe(false))
    })

    it('should query elasticsearch for must not query with an array of term queries', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustNotQuery([getTermQuery('hasProperty', false), getTermQuery('propertyType.keyword', PropertyType.Flat)])
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => {
            expect(document.hasProperty).not.toBe(false)
            expect(document.propertyType).not.toBe(PropertyType.Flat)
        })
    })

    it('should query elasticsearch for must not query with terms query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustNotQuery({
                    ...getTermsQuery('propertyType.keyword', [PropertyType.Flat, PropertyType.Apartment])
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => {
            expect(document.propertyType).not.toBe(PropertyType.Flat)
            expect(document.propertyType).not.toBe(PropertyType.Apartment)
        })
    })

    it('should query elasticsearch for must not query with bool query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustNotQuery({
                    ...getBoolQuery({
                        ...getMustQuery({
                            ...getTermQuery('hasProperty', false)
                        })
                    })
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.hasProperty).not.toBe(false))
    })

    it('should query elasticsearch for must not query with exists query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustNotQuery({
                    ...getExistsQuery('propertyAreaSquared')
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.propertyAreaSquared).toBeNull())
    })

    it('should query elasticsearch for must not query with range query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustQuery({
                    ...getExistsQuery('propertyAreaSquared')
                }),
                ...getMustNotQuery({
                    ...getRangeQuery('propertyAreaSquared', {
                        lte: 10000
                    })
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.propertyAreaSquared).toBeGreaterThanOrEqual(10000))
    })

    it('should query elasticsearch for nested must not query ', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery([
                    getTermQuery('hasProperty', true),
                    getBoolQuery({
                        ...getMustNotQuery({
                            ...getTermQuery('propertyType.keyword', PropertyType.Flat)
                        })
                    })
                ])
            )
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => {
            expect(document.hasProperty).toBe(true)
            expect(document.propertyType).not.toBe(PropertyType.Flat)
        })
    })
})
