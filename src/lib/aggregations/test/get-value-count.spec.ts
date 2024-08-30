import { ResponseError } from '@elastic/elasticsearch/lib/errors.js'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getValueCountAggregation } from '../get-value-count'

describe('getValueCountAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema field', () => {
        const query = getValueCountAggregation<HomeDocument>('address')

        expect(query).toEqual({
            value_count: {
                field: 'address'
            }
        })
    })

    it('accepts only schema field with keyword', () => {
        const query = getValueCountAggregation<HomeDocument>('address.keyword')

        expect(query).toEqual({
            value_count: {
                field: 'address.keyword'
            }
        })
    })

    it('should query elasticsearch for value count aggregation ', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                result: getValueCountAggregation('address.keyword')
            }
        })

        expect(result.aggregations.result.value).toBeDefined()
    })

    it('should return an error after passing string field which is keyword type', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    result: getValueCountAggregation('address')
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception: [illegal_argument_exception]')
                expect(error.message).toContain(
                    'Text fields are not optimised for operations that require per-document field data like aggregations and sorting, so these operations are disabled by default.'
                )
                expect(error.message).toContain('Please use a keyword field instead.')
            })
    })
})
