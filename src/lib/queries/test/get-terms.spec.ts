import { ResponseError } from '@elastic/elasticsearch/lib/errors.js'
import { HomeDocument, PropertyType } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getTermsQuery } from '../get-terms'
import { getBoolQuery } from '../get-bool'
import { getMustQuery } from '../get-must'

describe('getTermsQuery', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema fields', () => {
        const query = getTermsQuery<HomeDocument>('address', ['one', 'two', 'three'])

        expect(query).toEqual({
            terms: {
                address: ['one', 'two', 'three']
            }
        })
    })

    it(`should query elasticsearch for terms query for a field which is 'keyword' type`, async () => {
        const service = app.get(ElasticsearchService)

        const values = [PropertyType.Flat, PropertyType.Apartment]
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getTermsQuery('propertyType.keyword', values)))
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(values).toContain(document.source.propertyType))
    })

    it('should query elasticsearch for terms query for a boolean field', async () => {
        const service = app.get(ElasticsearchService)

        const values = [true, false]
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getTermsQuery('hasProperty', values)))
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(values).toContain(document.source.hasProperty))
    })

    it('should query elasticsearch for terms query for a number field', async () => {
        const service = app.get(ElasticsearchService)

        const values = [2005, 2010, 2012, 2015]
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getTermsQuery('builtInYear', values)))
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(values).toContain(document.source.builtInYear))
    })

    it('should query elasticsearch for terms query which supports boost option', async () => {
        const service = app.get(ElasticsearchService)

        const values = [PropertyType.Flat, PropertyType.Apartment]
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery(
                    getTermsQuery('propertyType.keyword', values, {
                        boost: 0.5
                    })
                )
            )
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(values).toContain(document.source.propertyType))
    })

    it('should return an error when passing an invalid parameter', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 10,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                query: getBoolQuery(getMustQuery(getTermsQuery('hasProperty', true as any)))
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('x_content_parse_exception: [parsing_exception] ')
                expect(error.message).toContain(`Reason: [terms] query does not support [hasProperty]`)
            })
    })
})
