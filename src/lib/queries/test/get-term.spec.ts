import { ResponseError } from 'lib/common'
import { HomeDocument, PropertyType } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getTermQuery } from '../get-term'
import { getBoolQuery } from '../get-bool'
import { getMustQuery } from '../get-must'

describe('getTermQuery', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema fields', () => {
        const query = getTermQuery<HomeDocument>('address', 'test')

        expect(query).toEqual({
            term: {
                address: {
                    value: 'test'
                }
            }
        })
    })

    it('returns null when null or undefined value is being passed', () => {
        const queryWithNull = getTermQuery<HomeDocument>('address', null)
        const queryWithUndefined = getTermQuery<HomeDocument>('address', undefined)

        expect(queryWithNull).toEqual(null)
        expect(queryWithUndefined).toEqual(null)
    })

    it('accepts only schema fields and case sensitive option', () => {
        const query = getTermQuery<HomeDocument>('address', 'test', {
            case_insensitive: true
        })

        expect(query).toEqual({
            term: {
                address: {
                    value: 'test',
                    case_insensitive: true
                }
            }
        })
    })

    it(`should query elasticsearch for term query for a field which is 'keyword' type`, async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getTermQuery('propertyType.keyword', PropertyType.Flat)))
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.propertyType).toBe(PropertyType.Flat))
    })

    it('should query elasticsearch for term query for a boolean field', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getTermQuery('hasProperty', true)))
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.hasProperty).toBe(true))
    })

    it('should query elasticsearch for term query for a number field', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getTermQuery('builtInYear', 2015)))
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.builtInYear).toBe(2015))
    })

    it('should query elasticsearch for term query with case insensitive', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery(
                    getTermQuery('address.keyword', '36025 ChuRcH WAlK', {
                        case_insensitive: true
                    })
                )
            )
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.address).toBe('36025 Church Walk'))
    })

    it('should query elasticsearch for term query which supports boost option', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery(
                    getTermQuery('propertyType.keyword', PropertyType.Flat, {
                        boost: 0.5
                    })
                )
            )
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.address).toBeDefined())
    })

    it('should return an error when passing an invalid parameter', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 10,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
                query: getBoolQuery(getMustQuery(getTermQuery('hasProperty', 'test' as any)))
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception')
                expect(error.message).toContain('query_shard_exception')
                expect(error.message).toContain(`failed to create query: Can't parse boolean value [test], expected [true] or [false]`)
            })
    })
})
