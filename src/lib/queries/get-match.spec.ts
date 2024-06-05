import { ResponseError } from '@elastic/elasticsearch/lib/errors.js'
import { HomeDocument } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getMatchQuery } from './get-match'
import { getBoolQuery } from './get-bool'
import { getMustQuery } from './get-must'

describe('getMatchQuery', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts field and value of a document', () => {
        const query = getMatchQuery<HomeDocument>('address', 'avenue')

        expect(query).toEqual({
            match: {
                address: {
                    query: 'avenue'
                }
            }
        })
    })

    it('should query elasticsearch for match query', async () => {
        const service = app.get(ElasticsearchService)

        const query = 'church'
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getMatchQuery('address', query)))
        })

        result.documents.forEach(document => expect(document.address.toLowerCase()).toContain(query.toLowerCase()))
    })

    it(`should query elasticsearch for match query when passing string field with 'keyword'`, async () => {
        const service = app.get(ElasticsearchService)

        const query = 'church'
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getMatchQuery('city.keyword', query)))
        })

        expect(result.total).toEqual(expect.any(Number))
    })

    it('should query elasticsearch for match query with fuzzinness', async () => {
        const service = app.get(ElasticsearchService)

        const queryWithTypo = 'dhurch'
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(
                getMustQuery(
                    getMatchQuery('address', queryWithTypo, {
                        fuzziness: '1'
                    })
                )
            )
        })

        result.documents.forEach(document => expect(document.address).toBeDefined())
    })
})
