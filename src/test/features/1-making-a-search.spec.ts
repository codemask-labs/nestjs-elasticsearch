import { validateSync } from 'class-validator'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { HomeDocument, PropertyType } from 'test/module'
import { getBoolQuery, getTermQuery } from 'lib/queries'
import { getQueries } from 'lib/utils'

describe('Making a search', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE,
            }),
        ],
    })

    it('has service available', () => {
        const service = app.get(ElasticsearchService)

        expect(service).toBeDefined()
    })

    it('makes a test search query', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 10,
            query: getBoolQuery({
                must: getQueries([
                    getTermQuery('propertyType.keyword', PropertyType.Apartment),
                    getTermQuery('propertyType.keyword', null),
                    getTermQuery('propertyType.keyword', undefined),
                ]),
            }),
        })

        const allDocumentsAreValid = result.documents.every(document => {
            const errors = validateSync(document)

            return !errors.length
        })

        expect(allDocumentsAreValid).toBe(true)
    })
})
