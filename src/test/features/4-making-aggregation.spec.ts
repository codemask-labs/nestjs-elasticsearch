/* eslint-disable camelcase */
import { setupNestApplication } from 'test/toolkit'
import { HomeDocument, TestService } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { ElasticsearchModule } from 'module/elasticsearch.module'

describe('Making a search', () => {
    const { app } = setupNestApplication({
        providers: [TestService],
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            }),
            ElasticsearchModule.forFeature([HomeDocument])
        ]
    })

    it('has index available', () => {
        expect(app.get(TestService)).toBeDefined()
    })

    it('makes a aggregation with nested average area squared or null aggregation', async () => {
        const service = app.get(TestService)
        const result = await service.getTopAddressesWithHighestAverageAreaSquared()

        expect(result.documents).toEqual([])
        expect(result.aggregations).toEqual({
            cities: {
                doc_count_error_upper_bound: expect.any(Number),
                sum_other_doc_count: expect.any(Number),
                buckets: expect.arrayContaining([
                    {
                        doc_count: expect.any(Number),
                        key: expect.any(String)
                    }
                ])
            },
            citiesWithAverageAreaSquared: {
                doc_count_error_upper_bound: expect.any(Number),
                sum_other_doc_count: expect.any(Number),
                buckets: expect.arrayContaining([
                    {
                        doc_count: expect.any(Number),
                        key: expect.any(String),
                        averageSquareMeters: {
                            value: expect.toBeNullableOf(expect.any(Number))
                        }
                    }
                ])
            },
            homes: {
                doc_count_error_upper_bound: expect.any(Number),
                sum_other_doc_count: expect.any(Number),
                buckets: expect.arrayContaining([
                    {
                        doc_count: expect.any(Number),
                        key: expect.any(String),
                        averageSquareMeters: {
                            value: expect.toBeNullableOf(expect.any(Number))
                        }
                    }
                ])
            }
        })
    })
})
