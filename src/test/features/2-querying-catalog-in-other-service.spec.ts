import { validateSync } from 'class-validator'
import { setupNestApplication } from 'test/toolkit'
import { HomeDocument, TestService } from 'test/module'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'

describe('Making a search', () => {
    const { app } = setupNestApplication({
        providers: [TestService],
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE,
            }),
            ElasticsearchModule.forFeature([HomeDocument]),
        ],
    })

    it('has index available', () => {
        expect(app.get(TestService)).toBeDefined()
    })

    it('makes a test search query', async () => {
        const service = app.get(TestService)
        const result = await service.getHomeDocuments()
        const allDocumentsAreValid = result.documents.every(document => {
            const errors = validateSync(document)

            return Array.isArray(errors) && errors.length === 0
        })

        expect(allDocumentsAreValid).toBe(true)
        expect(result.aggregations).toEqual({})
    })
})
