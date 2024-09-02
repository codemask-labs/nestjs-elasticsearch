import { getSearchRequest } from 'lib/requests'
import { HomeDocument } from 'test/module'
import { getAggregations } from './get-aggregations'

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

        const aggregations = getAggregations(schema, {
            hello: {
                avg: {
                    field
                }
                // avg: {
                //     field: ''
                // },
                // aggregations: getAggregations(HomeDocument, {
                //     world: {
                //         max: {
                //             field: 'propertyAreaSquared'
                //         }
                //     }
                // })
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
