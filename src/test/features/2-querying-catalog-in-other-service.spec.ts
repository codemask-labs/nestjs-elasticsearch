import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'nestjs/elasticsearch.module'
import { HomeDocument, PropertyType } from 'test/module'
import { getBoolQuery, getTermQuery } from 'lib/queries'
import { validateSync } from 'class-validator'
import { getCatalogInjectionToken } from 'nestjs/utils'
import { Catalog } from 'nestjs/injectables'

describe('Making a search', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: 'http://localhost:9200'
            }),
            ElasticsearchModule.forFeature([
                HomeDocument
            ])
        ]
    })

    it('has catalog available', () => {
        const catalog = app.get<Catalog<HomeDocument>>(getCatalogInjectionToken('homes'))

        expect(catalog).toBeDefined()
    })

    it('makes a test search query', async () => {
        const catalog = app.get<Catalog<HomeDocument>>(getCatalogInjectionToken('homes'))
        const result = await catalog.search({
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
