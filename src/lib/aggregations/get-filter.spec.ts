import { TEST_ELASTICSEARCH_NODE } from 'test/constants'
import { setupNestApplication } from 'test/toolkit'
import { HomeDocument, PropertyType } from 'test/module'
import { getBoolQuery, getMustQuery, getRangeQuery, getTermQuery } from 'lib/queries'
import { ElasticsearchService } from 'module/elasticsearch.service'
import { ElasticsearchModule } from 'module/elasticsearch.module'
import { getFilterAggregation } from './get-filter'
import { getSumAggregation } from './get-sum'

describe('getTermsAggregation', () => {
    const { app } = setupNestApplication({
        imports: [
            ElasticsearchModule.register({
                node: TEST_ELASTICSEARCH_NODE
            })
        ]
    })

    it('should accept term query', () => {
        const query = getFilterAggregation<HomeDocument>(getTermQuery('address.keyword', 'test'))

        expect(query).toEqual({
            filter: {
                term: {
                    'address.keyword': {
                        value: 'test'
                    }
                }
            }
        })
    })

    it('should accept range query', () => {
        const query = getFilterAggregation<HomeDocument>(
            getRangeQuery('builtInYear', {
                gt: 1000
            })
        )
        expect(query).toEqual({
            filter: {
                range: {
                    builtInYear: {
                        gt: 1000
                    }
                }
            }
        })
    })

    it('should accept bool query', () => {
        const query = getFilterAggregation<HomeDocument>(getBoolQuery(getMustQuery(getTermQuery('propertyType.keyword', PropertyType.Flat))))

        expect(query).toEqual({
            filter: {
                bool: {
                    must: {
                        term: {
                            'propertyType.keyword': {
                                value: 'Flat'
                            }
                        }
                    }
                }
            }
        })
    })

    it('queries elasticsearch with term query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                filterAggregation: getFilterAggregation(getTermQuery('propertyType.keyword', PropertyType.Flat))
            }
        })

        expect(result.aggregations.filterAggregation.doc_count).not.toEqual(0)
    })

    it('queries elasticsearch with range query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                filterAggregation: getFilterAggregation(
                    getRangeQuery('propertyAreaSquared', {
                        gt: 20000
                    })
                )
            }
        })

        expect(result.aggregations.filterAggregation.doc_count).not.toEqual(0)
    })

    it('queries elasticsearch with bool query', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                filterAggregation: getFilterAggregation(
                    getBoolQuery(getMustQuery([getTermQuery('hasProperty', true), getTermQuery('propertyType.keyword', PropertyType.Flat)]))
                )
            }
        })

        expect(result.aggregations.filterAggregation.doc_count).not.toEqual(0)
    })

    it('queries elasticsearch with term query and nested sum aggregation', async () => {
        const service = app.get(ElasticsearchService)

        const result = await service.search(HomeDocument, {
            size: 0,
            aggregations: {
                filterAggregation: {
                    ...getFilterAggregation(getTermQuery('propertyType.keyword', PropertyType.Flat)),
                    aggregations: {
                        sumAggregation: getSumAggregation('propertyAreaSquared')
                    }
                }
            }
        })

        expect(result.aggregations.filterAggregation.doc_count).not.toEqual(0)
        expect(result.aggregations.filterAggregation.sumAggregation.value).not.toEqual(0)
    })
})
