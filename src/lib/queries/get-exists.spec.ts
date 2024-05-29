import { Document } from 'lib/common'
import { HomeDocument } from 'test/module'
import { setupNestApplication } from 'test/toolkit'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getExistsQuery } from './get-exists'

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

    it('queries es for range aggregation with nested aggregation', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 2,
            query: {
                bool: {
                    must: getExistsQuery('propertyAreaSquared')
                }
            }
        })

        result.documents.forEach(document => {
            expect(document.propertyAreaSquared).toBeDefined()
        })
    })
})
