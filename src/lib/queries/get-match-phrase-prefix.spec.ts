import { ResponseError } from '@elastic/elasticsearch/lib/errors.js'
import { HomeDocument } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getMatchPhrasePrefixQuery } from './get-match-phrase-prefix'
import { getBoolQuery } from './get-bool'
import { getMustQuery } from './get-must'

describe('getMatchPhrasePrefixQuery', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts field and value of a document', () => {
        const query = getMatchPhrasePrefixQuery<HomeDocument>('address', 'avenue')

        expect(query).toEqual({
            // eslint-disable-next-line camelcase
            match_phrase_prefix: {
                address: {
                    query: 'avenue'
                }
            }
        })
    })

    it('should query elasticsearch for match phrase prefix query', async () => {
        const service = app.get(ElasticsearchService)

        const query = 'ave'
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery(getMustQuery(getMatchPhrasePrefixQuery('address', query)))
        })

        result.documents.forEach(document => {
            const words = document.address.toLowerCase().split(' ')
            const hasWordStartingWithAve = words.some(word => word.startsWith(query.toLowerCase()))

            expect(hasWordStartingWithAve).toBe(true)
        })
    })

    it(`should return an error after passing string field with 'keyword'`, async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                query: getBoolQuery(getMustQuery(getMatchPhrasePrefixQuery('address.keyword' as any, 'avenue')))
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception: [query_shard_exception]')
                expect(error.message).toContain(
                    'Reason: failed to create query: Can only use phrase prefix queries on text fields - not on [address.keyword] which is of type [keyword]'
                )
            })
    })
})
