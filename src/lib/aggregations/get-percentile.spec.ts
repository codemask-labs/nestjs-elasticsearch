import { ResponseError } from 'lib/common'
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

    it('accepts only schema numeric field and passed percentiles', () => {
        const query = getPercentileAggregation<HomeDocument>('propertyAreaSquared', [5, 10, 15])

        expect(query).toEqual({
            percentiles: {
                field: 'propertyAreaSquared',
                percents: [5, 10, 15]
            }
        })
    })

    it('should query elasticsearch for percentile aggregation', async () => {
        const service = app.get(ElasticsearchService)
        const result = await service.search(HomeDocument, {
            size: 10,
            aggregations: {
                result: getPercentileAggregation('propertyAreaSquared', [25, 50, 75])
            }
        })

        expect(result.aggregations.result).toStrictEqual({
            values: {
                '25.0': expect.any(Number),
                '50.0': expect.any(Number),
                '75.0': expect.any(Number)
            }
        })
    })

    it('should return an error after passing string field', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    result: getPercentileAggregation('address' as any, [25, 50, 75])
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception')
                expect(error.message).toContain('illegal_argument_exception')
                expect(error.message).toContain(
                    'Text fields are not optimised for operations that require per-document field data like aggregations and sorting, so these operations are disabled by default.'
                )
            })
    })

    it(`should return an error after passing string field with 'keyword'`, async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    result: getPercentileAggregation('address.keyword' as any, [25, 50, 75])
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception')
                expect(error.message).toContain('illegal_argument_exception')
                expect(error.message).toContain('Field [address.keyword] of type [keyword] is not supported for aggregation [percentiles]')
            })
    })
})
