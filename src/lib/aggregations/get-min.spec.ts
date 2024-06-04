import { ResponseError } from '@elastic/elasticsearch/lib/errors.js'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getMinAggregation } from './get-min'

describe('getMinAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema numeric field', () => {
        const query = getMinAggregation<HomeDocument>('propertyAreaSquared')

        expect(query).toEqual({
            min: {
                field: 'propertyAreaSquared'
            }
        })
    })

    it('should query elasticsearch for min aggregation', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getMinAggregation('propertyAreaSquared')
            }
        })

        expect(result.aggregations.result.value).toBeDefined()
    })

    it('should query elasticsearch for min aggregation with script', async () => {
        const service = app.get(ElasticsearchService)

        const script = `
            if (params._source.containsKey('propertyAreaSquared') && params._source.propertyAreaSquared != null) {
                return params._source.propertyAreaSquared * 0.8
            } else {
                return null
            }`

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getMinAggregation({
                    script
                })
            }
        })

        expect(result.aggregations.result.value).toBeDefined()
    })

    it('should return an error after passing string field', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    result: getMinAggregation('propertyAreaSquaredAsString' as any)
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception: [illegal_argument_exception]')
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
                    result: getMinAggregation('address.keyword' as any)
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception: [illegal_argument_exception]')
                expect(error.message).toContain('Field [address.keyword] of type [keyword] is not supported for aggregation [min]')
            })
    })
})
