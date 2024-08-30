import { ResponseError } from '@elastic/elasticsearch/lib/errors.js'
import { HomeDocument } from 'test/module'
import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { getTermsAggregation } from '../get-terms'
import { getSumAggregation } from '../get-sum'
import { getBucketSelectorAggregation } from '../get-bucket-selector'

describe('getBucketSelectorAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('accepts object with string values for each field', () => {
        const query = getBucketSelectorAggregation('params.myVar1 > 5', {
            myVar1: 'theSum'
        })

        expect(query).toEqual({
            bucket_selector: {
                buckets_path: {
                    myVar1: 'theSum'
                },
                script: 'params.myVar1 > 5'
            }
        })
    })

    it('should query elasticsearch for bucket selector aggregation', async () => {
        const service = app.get(ElasticsearchService)

        const selectorFilterValue = 5

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                date: {
                    ...getTermsAggregation('contractDate'),
                    aggregations: {
                        sum: getSumAggregation('builtInYear'),
                        selector: getBucketSelectorAggregation(`params.myVar1 > ${selectorFilterValue}`, {
                            myVar1: 'sum'
                        })
                    }
                }
            }
        })

        expect(result.aggregations.date.buckets.length).toBeGreaterThan(0)

        result.aggregations.date.buckets.forEach(bucket => {
            expect(bucket.sum).toEqual(
                expect.objectContaining({
                    value: expect.any(Number)
                })
            )

            expect(bucket.sum.value).toBeGreaterThan(selectorFilterValue)
        })
    })

    it('should return an error if bucket selector aggregation is not inside another aggregation', async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    sum: getSumAggregation('builtInYear'),
                    selector: getBucketSelectorAggregation('params.myVar1 > 5', {
                        myVar1: 'sum'
                    })
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('action_request_validation_exception')
                expect(error.message).toContain('bucket_selector aggregation [selector] must be declared inside of another aggregation')
            })
    })

    it(`should return an error if bucket selector tries to use non existing aggregation path`, async () => {
        const service = app.get(ElasticsearchService)

        await service
            .search(HomeDocument, {
                size: 0,
                aggregations: {
                    sum: getSumAggregation('builtInYear'),
                    selector: getBucketSelectorAggregation('params.myVar1 > 5', {
                        myVar1: 'sumAggregation'
                    })
                }
            })
            .catch(error => {
                expect(error).toBeInstanceOf(ResponseError)
                expect(error.message).toContain('action_request_validation_exception')
                expect(error.message).toContain('No aggregation found for path [sumAggregation]')
            })
    })
})
