import { HomeDocument } from 'test/module'
import { getAggregations } from './get-aggregations'

describe('getAggregations', () => {
    it('is type safe way of passing document type', () => {
        const aggregations = getAggregations(HomeDocument, {
            hello: {
                avg: {
                    field: 'animals.year'
                },
                aggregations: getAggregations(HomeDocument, {
                    world: {
                        max: {
                            field: 'propertyAreaSquared'
                        }
                    }
                })
            }
        })

        expect(aggregations).toEqual({
            hello: {
                avg: {
                    field: 'animals.year'
                },
                aggregations: {
                    world: {
                        max: {
                            field: 'propertyAreaSquared'
                        }
                    }
                }
            }
        })
    })
})
