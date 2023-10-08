import { validateSync } from 'class-validator'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'nestjs/elasticsearch.module'
import { ElasticsearchService } from 'nestjs/elasticsearch.service'
import { HomeDocument, PropertyType } from 'test/module'
import { getBoolQuery, getTermQuery } from 'lib/queries'

describe('Making a search', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: 'http://localhost:9200'
            })
        ]
    })

    it('has service available', () => {
        const service = app.get(ElasticsearchService)

        expect(service).toBeDefined()
    })

    it('makes a test search query', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 10,
            body: {
                query: getBoolQuery({
                    must: [
                        getTermQuery('propertyType.keyword', PropertyType.Flat)
                    ]
                })
            }
        })

        const allDocumentsAreValid = result.documents.every(document => {
            const errors = validateSync(document)

            return !errors.length
        })

        expect(allDocumentsAreValid).toBe(true)
    })
})
