import { Range } from 'lib/common'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getRangeAggregation } from './get-range'

describe('getRangeAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    const ranges: Array<Range> = [
        {
            from: 10
        },
        {
            from: 15,
            to: 20
        },
        {
            to: 25
        }
    ]

    it('accepts only schema field', () => {
        const query = getRangeAggregation<HomeDocument>('address', ranges)

        expect(query).toEqual({
            range: {
                field: 'address',
                ranges: [{ from: 10 }, { from: 15, to: 20 }, { to: 25 }]
            }
        })
    })

    it('queries es for range aggregation', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 10,
            aggregations: {
                test: getRangeAggregation('propertyAreaSquared', ranges)
            }
        })

        expect(result.aggregations.test).toStrictEqual({
            buckets: [
                {
                    // eslint-disable-next-line camelcase
                    doc_count: 0,
                    key: '*-25.0',
                    to: 25
                },
                {
                    // eslint-disable-next-line camelcase
                    doc_count: 19,
                    key: '10.0-*',
                    from: 10
                },
                {
                    // eslint-disable-next-line camelcase
                    doc_count: 0,
                    key: '15.0-20.0',
                    from: 15,
                    to: 20
                }
            ]
        })
    })

    test.todo('accepts only schema field with keyword')
})
