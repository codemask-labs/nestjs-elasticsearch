import { HomeDocument, PropertyType } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getMustQuery } from './get-must'
import { getTermQuery } from './get-term'
import { getBoolQuery } from './get-bool'
import { getTermsQuery } from './get-terms'
import { getExistsQuery } from './get-exists'
import { getRangeQuery } from './get-range'
import { getMatchPhrasePrefixQuery } from './get-match-phrase-prefix'
import { getMatchQuery } from './get-match'

describe('getMustQuery', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts optional term queries', () => {
        const query = getMustQuery<HomeDocument>({
            ...getTermQuery('hasProperty', true)
        })

        expect(query).toEqual({
            must: {
                term: { hasProperty: { value: true } }
            }
        })
    })

    it('should query elasticsearch for must query with term query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustQuery({
                    ...getTermQuery('hasProperty', true)
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.hasProperty).toBe(true))
    })

    it('should query elasticsearch for must query with an array of term queries', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustQuery([getTermQuery('hasProperty', true), getTermQuery('propertyType.keyword', PropertyType.Flat)])
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => {
            expect(document.hasProperty).toBe(true)
            expect(document.propertyType).toBe(PropertyType.Flat)
        })
    })

    it('should query elasticsearch for must query with terms query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustQuery({
                    ...getTermsQuery('propertyType.keyword', [PropertyType.Flat, PropertyType.Apartment])
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect([PropertyType.Flat, PropertyType.Apartment]).toContain(document.propertyType))
    })

    it('should query elasticsearch for must query with bool query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustQuery({
                    ...getBoolQuery({
                        ...getMustQuery({
                            ...getTermQuery('hasProperty', false)
                        })
                    })
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.hasProperty).toBe(false))
    })

    it('should query elasticsearch for must query with exists query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustQuery({
                    ...getExistsQuery('propertyAreaSquared')
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.propertyAreaSquared).toBeDefined())
    })

    it('should query elasticsearch for must query with range query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustQuery(getExistsQuery('propertyAreaSquared')),
                ...getMustQuery(
                    getRangeQuery('propertyAreaSquared', {
                        gte: 500000,
                        lte: 900000
                    })
                )
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.propertyAreaSquared).toBeGreaterThanOrEqual(500000))
        result.documents.forEach(document => expect(document.propertyAreaSquared).toBeLessThanOrEqual(900000))
    })

    it('should query elasticsearch for nested must query ', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery([
                    getTermQuery('hasProperty', true),
                    getBoolQuery({
                        ...getMustQuery({
                            ...getTermQuery('propertyType.keyword', PropertyType.Flat)
                        })
                    })
                ])
            )
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => {
            expect(document.hasProperty).toBe(true)
            expect(document.propertyType).toBe(PropertyType.Flat)
        })
    })

    it('should query elasticsearch for different queries in must query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery([
                    getExistsQuery('propertyAreaSquared'),
                    getTermQuery('propertyType.keyword', PropertyType.Flat),
                    getRangeQuery('propertyAreaSquared', {
                        lte: 900000
                    })
                ])
            )
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => {
            expect(document.propertyAreaSquared).toBeDefined()
            expect(document.propertyType).toBe(PropertyType.Flat)
            expect(document.propertyAreaSquared).toBeLessThanOrEqual(900000)
        })
    })

    it('should query elasticsearch for must query which supports match query', async () => {
        const service = app.get(ElasticsearchService)

        const query = 'Street'
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustQuery({
                    ...getMatchQuery('address', query)
                })
            })
        })

        expect(result.total).toEqual(expect.any(Number))
    })

    it('should query elasticsearch for must query which supports match phrase prefix query', async () => {
        const service = app.get(ElasticsearchService)

        const query = 'c'
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMustQuery({
                    ...getMatchPhrasePrefixQuery('address', query)
                })
            })
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.address).toBeDefined())
    })
})
