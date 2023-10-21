import 'expect-more-jest'
import { setupNestApplication } from 'test/toolkit'
import { HomeDocument, TestService } from 'test/module'
import { ElasticsearchModule } from 'module/elasticsearch.module'

describe('Making a search', () => {
    const { app } = setupNestApplication({
        providers: [TestService],
        imports: [
            ElasticsearchModule.register({
                node: 'http://localhost:9200'
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
            a: {
                // eslint-disable-next-line camelcase
                doc_count_error_upper_bound: expect.any(Number),
                // eslint-disable-next-line camelcase
                sum_other_doc_count: expect.any(Number),
                buckets: expect.arrayContaining([
                    {
                        // eslint-disable-next-line camelcase
                        doc_count: expect.any(Number),
                        key: expect.any(String)
                    }
                ])
            },
            b: {
                // eslint-disable-next-line camelcase
                doc_count_error_upper_bound: expect.any(Number),
                // eslint-disable-next-line camelcase
                sum_other_doc_count: expect.any(Number),
                buckets: expect.arrayContaining([
                    {
                        // eslint-disable-next-line camelcase
                        doc_count: expect.any(Number),
                        key: expect.any(String),
                        averageSquareMeters: {
                            value: expect.toBeNullableOf(expect.any(Number))
                        }
                    }
                ])
            },
            homes: {
                // eslint-disable-next-line camelcase
                doc_count_error_upper_bound: expect.any(Number),
                // eslint-disable-next-line camelcase
                sum_other_doc_count: expect.any(Number),
                buckets: expect.arrayContaining([
                    {
                        // eslint-disable-next-line camelcase
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
