import { ResponseError } from '@elastic/elasticsearch/lib/errors.js'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getGeoCentroidAggregation } from '../get-geo-centroid'

describe('getGeoCentroidAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts only schema field', () => {
        const query = getGeoCentroidAggregation<HomeDocument>('location')

        expect(query).toEqual({
            // eslint-disable-next-line camelcase
            geo_centroid: {
                field: 'location'
            }
        })
    })

    it('should query elasticsearch for geo-centroid aggregation', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                geoCentroidAggregation: getGeoCentroidAggregation('location')
            }
        })

        expect(result.aggregations.geoCentroidAggregation.count).not.toEqual(0)
        expect(result.aggregations.geoCentroidAggregation.location).toEqual(
            expect.objectContaining({
                lat: expect.any(Number),
                lon: expect.any(Number)
            })
        )
    })

    it('should return an error after passing field which is not geo point type', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    result: getGeoCentroidAggregation('propertyType')
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception')
                expect(error.message).toContain('illegal_argument_exception')
                expect(error.message).toContain(
                    'Text fields are not optimised for operations that require per-document field data like aggregations and sorting, so these operations are disabled by default.'
                )
                expect(error.message).toContain('Please use a keyword field instead.')
            })

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    result: getGeoCentroidAggregation('builtInYear')
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('search_phase_execution_exception')
                expect(error.message).toContain('illegal_argument_exception')
                expect(error.message).toContain('Field [builtInYear] of type [long] is not supported for aggregation [geo_centroid]')
            })
    })
})
