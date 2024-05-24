import { Range } from 'lib/common'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getRangeAggregation } from './get-range'
import { getTermsAggregation } from '.'

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

    it('queries es for range aggregation with nested aggregation', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 10,
            aggregations: {
                test: {
                    ...getRangeAggregation('propertyAreaSquared', ranges),
                    aggregations: {
                        test2: getTermsAggregation('address.keyword', 1)
                    }
                }
            }
        })

        expect(result.aggregations.test).toStrictEqual({
            buckets: [
                {
                    // eslint-disable-next-line camelcase
                    doc_count: 0,
                    key: '*-25.0',
                    to: 25,
                    test2: {
                        buckets: [],
                        // eslint-disable-next-line camelcase
                        doc_count_error_upper_bound: 0,
                        // eslint-disable-next-line camelcase
                        sum_other_doc_count: 0
                    }
                },
                {
                    // eslint-disable-next-line camelcase
                    doc_count: 19,
                    key: '10.0-*',
                    from: 10,
                    test2: {
                        buckets: [
                            {
                                // eslint-disable-next-line camelcase
                                doc_count: 1,
                                key: '1510 Jordon Meadow'
                            }
                        ],
                        // eslint-disable-next-line camelcase
                        doc_count_error_upper_bound: 0,
                        // eslint-disable-next-line camelcase
                        sum_other_doc_count: 18
                    }
                },
                {
                    // eslint-disable-next-line camelcase
                    doc_count: 0,
                    key: '15.0-20.0',
                    from: 15,
                    to: 20,
                    test2: {
                        buckets: [],
                        // eslint-disable-next-line camelcase
                        doc_count_error_upper_bound: 0,
                        // eslint-disable-next-line camelcase
                        sum_other_doc_count: 0
                    }
                }
            ]
        })
    })

    test.todo('accepts only schema field with keyword')
})
