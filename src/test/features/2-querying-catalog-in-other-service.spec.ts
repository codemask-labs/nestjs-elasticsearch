import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'nestjs/elasticsearch.module'
import { HomeDocument, TestService } from 'test/module'
import { validateSync } from 'class-validator'

describe('Making a search', () => {
    const { app } = setupNestApplication({
        providers: [TestService],
        imports: [
            ElasticsearchModule.register({
                node: 'http://localhost:9200'
            }),
            ElasticsearchModule.forFeature([
                HomeDocument
            ])
        ]
    })

    it('has index available', () => {
        expect(app.get(TestService)).toBeDefined()
    })

    it('makes a test search query', async () => {
        const service = app.get(TestService)
        const result = await service.getHomeDocuments()
        const allDocumentsAreValid = result.documents.every(document => {
            const errors = validateSync(document)

            return !errors.length
        })

        expect(allDocumentsAreValid).toBe(true)
    })
})
