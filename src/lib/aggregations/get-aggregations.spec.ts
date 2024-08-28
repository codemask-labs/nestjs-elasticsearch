import { HomeDocument } from 'test/module'
import { getAggregations } from './get-aggregations'
import { getSearchRequest } from 'lib/requests'
import { ClassConstructor } from 'lib/common'

class OtherDocument {
    readonly hello: string
    readonly world: number
}

const getMultipleSchemas = (isHomeDocument: boolean) => {
    if (isHomeDocument) {
        return HomeDocument
    }

    return OtherDocument
}

describe('getAggregations', () => {
    it('is type safe way of passing document type', () => {
        const schema = getMultipleSchemas(true)
        const type = {} as ClassConstructor<typeof schema>

        const aggregations = getAggregations(schema, {
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

        const request = getSearchRequest(HomeDocument, {
            aggregations
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
