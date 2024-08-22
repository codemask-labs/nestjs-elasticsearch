import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getNestedAggregation } from './get-nested'

describe('getNestedAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only an array of objects schema field', () => {
        const query = getNestedAggregation<HomeDocument>('animals')

        expect(query).toEqual({
            nested: {
                path: 'animals'
            }
        })
    })

    it('should query elasticsearch for nested aggregation ', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                nestedAggregation: getNestedAggregation('animals')
            }
        })

        expect(result.aggregations.nestedAggregation.doc_count).toBeDefined()
        expect(result.aggregations.nestedAggregation.doc_count).not.toEqual(0)
    })

    it('should return doc_count 0 after passing string field which is not an array of objects type', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                nestedAggregation: getNestedAggregation('address' as any)
            }
        })

        expect(result.aggregations.nestedAggregation.doc_count).toBeDefined()
        expect(result.aggregations.nestedAggregation.doc_count).toEqual(0)
    })
})
