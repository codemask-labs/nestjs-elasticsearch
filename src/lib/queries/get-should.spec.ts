import { getMinimumShouldMatchParameter } from 'lib/parameters'
import { HomeDocument, PropertyType } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getShouldQuery } from './get-should'
import { getTermQuery } from './get-term'
import { getBoolQuery } from './get-bool'
import { getTermsQuery } from './get-terms'
import { getExistsQuery } from './get-exists'
import { getRangeQuery } from './get-range'
import { getMatchPhrasePrefixQuery } from './get-match-phrase-prefix'
import { getMatchQuery } from './get-match'

describe('getShouldQuery', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts optional term queries', () => {
        const query = getShouldQuery<HomeDocument>({
            ...getTermQuery('hasProperty', true)
        })

        expect(query).toEqual({
            should: {
                term: {
                    hasProperty: {
                        value: true
                    }
                }
            }
        })
    })

    it('should query elasticsearch for should query with term query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getShouldQuery({
                    ...getTermQuery('hasProperty', true)
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.hasProperty).toBe(true))
    })

    it('should query elasticsearch for should query with an array of term queries', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getShouldQuery([getTermQuery('hasProperty', true), getTermQuery('propertyType.keyword', PropertyType.Flat)]),
                ...getMinimumShouldMatchParameter(2)
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => {
            expect(document.source.hasProperty).toBe(true)
            expect(document.source.propertyType).toBe(PropertyType.Flat)
        })
    })

    it('should query elasticsearch for should query with terms query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getShouldQuery({
                    ...getTermsQuery('propertyType.keyword', [PropertyType.Flat, PropertyType.Apartment])
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect([PropertyType.Flat, PropertyType.Apartment]).toContain(document.source.propertyType))
    })

    it('should query elasticsearch for should query with bool query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getShouldQuery({
                    ...getBoolQuery({
                        ...getShouldQuery({
                            ...getTermQuery('hasProperty', false)
                        })
                    })
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.hasProperty).toBe(false))
    })

    it('should query elasticsearch for should query with exists query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getShouldQuery({
                    ...getExistsQuery('propertyAreaSquared')
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.propertyAreaSquared).toBeDefined())
    })

    it('should query elasticsearch for should query with range query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getShouldQuery([
                    getExistsQuery('propertyAreaSquared'),
                    getRangeQuery('propertyAreaSquared', {
                        gte: 500000,
                        lte: 900000
                    })
                ]),
                ...getMinimumShouldMatchParameter(2)
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.propertyAreaSquared).toBeGreaterThanOrEqual(500000))
        result.documents.forEach(document => expect(document.source.propertyAreaSquared).toBeLessThanOrEqual(900000))
    })

    it('should query elasticsearch for nested should query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getShouldQuery([
                    getTermQuery('hasProperty', true),
                    getBoolQuery({
                        ...getShouldQuery({
                            ...getTermQuery('propertyType.keyword', PropertyType.Flat)
                        })
                    })
                ])
            )
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => {
            expect(document.source.hasProperty).toBe(true)
            expect(document.source.propertyType).toBe(PropertyType.Flat)
        })
    })

    it('should query elasticsearch for different queries in should query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getShouldQuery([
                    getExistsQuery('propertyAreaSquared'),
                    getTermQuery('propertyType.keyword', PropertyType.Flat),
                    getRangeQuery('propertyAreaSquared', { lte: 900000 })
                ]),
                ...getMinimumShouldMatchParameter(3)
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => {
            expect(document.source.propertyAreaSquared).toBeDefined()
            expect(document.source.propertyType).toBe(PropertyType.Flat)
            expect(document.source.propertyAreaSquared).toBeLessThanOrEqual(900000)
        })
    })

    it('should query elasticsearch for should query which supports match query', async () => {
        const service = app.get(ElasticsearchService)

        const query = 'Street'
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getShouldQuery({
                    ...getMatchQuery('address', query)
                })
            })
        })

        expect(result.total).toEqual(expect.any(Number))
    })

    it('should query elasticsearch for should query which supports match phrase prefix query', async () => {
        const service = app.get(ElasticsearchService)

        const query = 'str'
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getShouldQuery({
                    ...getMatchPhrasePrefixQuery('address', query)
                })
            })
        })

        expect(result.total).toEqual(expect.any(Number))
    })
})
