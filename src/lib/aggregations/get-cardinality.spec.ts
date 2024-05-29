import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getCardinalityAggregation } from './get-cardinality'

describe('getCardinalityAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema field', () => {
        const query = getCardinalityAggregation<HomeDocument>('address', {
            precision_threshold: 1000
        })

        expect(query).toEqual({
            cardinality: {
                field: 'address',
                precision_threshold: 1000
            }
        })
    })

    it('should queries elasticsearch for cardinality aggregation with specific field', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                testAggregation: getCardinalityAggregation('address.keyword')
            }
        })

        expect(result.aggregations.testAggregation.value).toBeDefined()
    })

    it('should queries elasticsearch for cardinality aggregation with specific field and precision control', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                testAggregation: getCardinalityAggregation('address.keyword', {
                    precision_threshold: 1
                })
            }
        })

        expect(result.aggregations.testAggregation.value).toBeDefined()
    })

    it('should queries elasticsearch for cardinality aggregation with script', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                testAggregation: getCardinalityAggregation({
                    script: "doc['address.keyword'].value"
                })
            }
        })

        expect(result.aggregations.testAggregation.value).toBeDefined()
    })

    it('should queries elasticsearch for cardinality aggregation with script and precision control', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                testAggregation: getCardinalityAggregation(
                    {
                        script: "doc['address.keyword'].value"
                    },
                    {
                        precision_threshold: 1
                    }
                )
            }
        })

        expect(result.aggregations.testAggregation.value).toBeDefined()
    })
})
