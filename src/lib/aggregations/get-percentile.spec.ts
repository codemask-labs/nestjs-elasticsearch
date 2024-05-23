import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getPercentileAggregation } from './get-percentile'

describe('getPercentileAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema field and passed percentiles', () => {
        const query = getPercentileAggregation<HomeDocument>('address', [5, 10, 15])

        expect(query).toEqual({
            percentiles: {
                field: 'address',
                percents: [5, 10, 15]
            }
        })
    })

    it('queries es for percentile aggregation', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 10,
            aggregations: {
                test: getPercentileAggregation('propertyAreaSquared', [25, 50, 75])
            }
        })

        expect(result.aggregations.test).toStrictEqual({
            values: {
                '25.0': 508117,
                '50.0': 610779,
                '75.0': 762076.25
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
