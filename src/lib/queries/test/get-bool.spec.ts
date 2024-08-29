import { faker } from '@faker-js/faker'
import { getMinimumShouldMatchParameter } from 'lib/parameters'
import { HomeDocument, PropertyType } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getBoolQuery } from '../get-bool'
import { getRangeQuery } from '../get-range'
import { getShouldQuery } from '../get-should'
import { getTermQuery } from '../get-term'
import { getTermsQuery } from '../get-terms'
import { getExistsQuery } from '../get-exists'
import { getMustQuery } from '../get-must'
import { getMustNotQuery } from '../get-must-not'

describe('getBoolQuery', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts optional must query', () => {
        const id = faker.string.uuid()
        const query = getBoolQuery<HomeDocument>({
            ...getMinimumShouldMatchParameter(1),
            ...getShouldQuery([
                getTermQuery('id.keyword', id),
                getTermQuery('id', id),
                getTermsQuery('propertyType', [PropertyType.Apartment]),
                getBoolQuery({
                    must: getTermQuery('address', 'test')
                }),
                getRangeQuery('propertyAreaSquared', {
                    gte: 500,
                    lte: 1000
                }),
                getExistsQuery('address'),
                getExistsQuery('id.keyword')
            ])
        })

        expect(query).toEqual({
            bool: {
                minimum_should_match: 1,
                should: [
                    { term: { 'id.keyword': { value: id } } },
                    { term: { id: { value: id } } },
                    { terms: { propertyType: [PropertyType.Apartment] } },
                    {
                        bool: {
                            must: { term: { address: { value: 'test' } } }
                        }
                    },
                    {
                        range: {
                            propertyAreaSquared: { gte: 500, lte: 1000 }
                        }
                    },
                    {
                        exists: { field: 'address' }
                    },
                    {
                        exists: { field: 'id.keyword' }
                    }
                ]
            }
        })
    })

    it('supports must query', async () => {
        const service = app.get(ElasticsearchService)

        const fullName = 'Stephanie Becker'
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getTermQuery('fullName.keyword', fullName)))
        })

        result.documents.forEach(document => expect(document.source.fullName).toBe(fullName))
    })

    it('supports must not query', async () => {
        const service = app.get(ElasticsearchService)

        const city = 'Port Marcia'
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustNotQuery(getTermQuery('city.keyword', city)))
        })

        result.documents.forEach(document => expect(document.source.fullName).not.toBe(city))
    })

    it('supports should query', async () => {
        const service = app.get(ElasticsearchService)

        const fullName = 'Stephanie Becker'
        const city = 'Johnson City'
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getShouldQuery([getTermQuery('city.keyword', city), getTermQuery('fullName.keyword', fullName)]))
        })

        result.documents.forEach(document => {
            const isMatch = document.source.fullName === fullName || document.source.city === city

            expect(isMatch).toBe(true)
        })
    })

    it('supports minimum should match parameter query', async () => {
        const service = app.get(ElasticsearchService)

        const fullName = 'Irma Kilback'
        const city = 'Johnson City'

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                ...getMinimumShouldMatchParameter(2),
                ...getShouldQuery([getTermQuery('city.keyword', city), getTermQuery('fullName.keyword', fullName)])
            })
        })

        result.documents.forEach(document => {
            const isMatch = document.source.fullName === fullName && document.source.city === city

            expect(isMatch).toBe(true)
        })
    })
})
