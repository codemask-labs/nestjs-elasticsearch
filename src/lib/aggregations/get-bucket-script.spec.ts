import { ResponseError } from 'lib/common'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getTermsAggregation } from './get-terms'
import { getValueCountAggregation } from './get-value-count'
import { getSumAggregation } from './get-sum'
import { getBucketScriptAggregation,  } from './get-bucket-script'

describe('getBucketScriptAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts object with string values for each field', () => {
        const query = getBucketScriptAggregation(
            {
                my_var1: 'the_sum',
                my_var2: 'the_value_count'
            },
            'params.my_var1 / params.my_var2'
        )

        expect(query).toEqual({
            bucket_script: {
                buckets_path: {
                    my_var1: 'the_sum',
                    my_var2: 'the_value_count' 
                },
                script: 'params.my_var1 / params.my_var2'
            }
        })
    })

    it('should query elasticsearch for bucket script aggregation', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                date: {
                    ...getTermsAggregation('contractDate'),
                    aggregations: {
                        sum: getSumAggregation('builtInYear'),
                        count: getValueCountAggregation('id.keyword'),
                        script: getBucketScriptAggregation(
                            {
                                my_var1: 'sum',
                                my_var2: 'count'
                            },
                            'params.my_var1 / params.my_var2'
                        )
                    }
                }
            }
        })

        result.aggregations.date.buckets.forEach(bucket => {
            expect(bucket.script).toEqual(
                expect.objectContaining({
                    value: expect.any(Number)
                })
            )
        })
    })

    it('should return an error if bucket script aggregation is not inside another aggregation', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    sum: getSumAggregation('builtInYear'),
                    count: getValueCountAggregation('id.keyword'),
                    script: getBucketScriptAggregation(
                        {
                            my_var1: 'sum',
                            my_var2: 'count'
                        },
                        'params.my_var1 / params.my_var2'
                    )
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('action_request_validation_exception')
                expect(error.message).toContain('bucket_script aggregation [script] must be declared inside of another aggregation')
            })
    })

    it(`should return an error if bucket script tries to use non existing aggregation path`, async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    sum: getSumAggregation('builtInYear'),
                    count: getValueCountAggregation('id.keyword'),
                    script: getBucketScriptAggregation(
                        {
                            my_var1: 'sumAggregation',
                            my_var2: 'count'
                        },
                        'params.my_var1 / params.my_var2'
                    )
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('action_request_validation_exception')
                expect(error.message).toContain('No aggregation found for path [sumAggregation]')
            })
    })
})
