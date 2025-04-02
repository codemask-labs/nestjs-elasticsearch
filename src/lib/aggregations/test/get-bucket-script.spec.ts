import { ResponseError } from 'lib/common'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getTermsAggregation } from '../get-terms'
import { getValueCountAggregation } from '../get-value-count'
import { getSumAggregation } from '../get-sum'
import { getBucketScriptAggregation } from '../get-bucket-script'

describe('getBucketScriptAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE,
            }),
        ],
    })

    it('accepts object with string values for each field', () => {
        const query = getBucketScriptAggregation('params.myVar1 / params.myVar2', {
            myVar1: 'theSum',
            myVar2: 'theValueCount',
        })

        expect(query).toEqual({
            bucket_script: {
                buckets_path: {
                    myVar1: 'theSum',
                    myVar2: 'theValueCount',
                },
                script: 'params.myVar1 / params.myVar2',
            },
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
                        script: getBucketScriptAggregation('params.myVar1 / params.myVar2', {
                            myVar1: 'sum',
                            myVar2: 'count',
                        }),
                    },
                },
            },
        })

        expect(result.aggregations.date.buckets.length).toBeGreaterThan(0)

        result.aggregations.date.buckets.forEach(bucket => {
            expect(bucket.script).toEqual(
                expect.objectContaining({
                    value: expect.any(Number),
                }),
            )

            expect(bucket.script.value).toEqual(bucket.sum.value / bucket.count.value)
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
                    script: getBucketScriptAggregation('params.myVar1 / params.myVar2', {
                        myVar1: 'sum',
                        myVar2: 'count',
                    }),
                },
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
                    script: getBucketScriptAggregation('params.myVar1 / params.myVar2', {
                        myVar1: 'sumAggregation',
                        myVar2: 'count',
                    }),
                },
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('action_request_validation_exception')
                expect(error.message).toContain('No aggregation found for path [sumAggregation]')
            })
    })
})
