import { ResponseError } from '@elastic/elasticsearch/lib/errors.js'
import { HomeDocument } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getExistsQuery } from '../get-exists'
import { getBoolQuery } from '../get-bool'
import { getMustQuery } from '../get-must'
import { getMustNotQuery } from '../get-must-not'

describe('getExistsQuery', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema fields', () => {
        const query = getExistsQuery<HomeDocument>('address')

        expect(query).toEqual({
            exists: {
                field: 'address'
            }
        })
    })

    it('accepts only schema fields with keyword', () => {
        const query = getExistsQuery<HomeDocument>('address.keyword')

        expect(query).toEqual({
            exists: {
                field: 'address.keyword'
            }
        })
    })

    it('should query elasticsearch for exists query', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getExistsQuery('address')))
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.address).toBeDefined())
    })

    it(`should query elasticsearch for exists query when passing string field with 'keyword'`, async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getExistsQuery('address.keyword')))
        })

        expect(result.total).toBeGreaterThan(0)
        result.documents.forEach(document => expect(document.source.address).toBeDefined())
    })

    it('should query elasticsearch for exists query for documents that are missing an indexed values', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustNotQuery(getExistsQuery('propertyAreaSquared')))
        })

        expect(result.total).toBeGreaterThan(0)
    })

    it('should return an error when passing empty string', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 10,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                query: getBoolQuery(getMustQuery(getExistsQuery('' as any)))
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('x_content_parse_exception: [x_content_parse_exception]')
                expect(error.message).toContain('[bool] failed to parse field [must]')
            })
    })
})
