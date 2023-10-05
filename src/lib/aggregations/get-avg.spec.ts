import { describe } from 'node:test'
import { ExampleCatalogDocument } from 'test/module'
import { getAvgAggregation } from './get-avg'

describe('getAvgAggregation', () => {
    it('accepts only schema fields', () => {
        const query = getAvgAggregation<ExampleCatalogDocument>('field')

        expect(query).toEqual({
            avg: {
                field: 'field'
            }
        })
    })

    it('accepts only schema fields with keyword', () => {
        const query = getAvgAggregation<ExampleCatalogDocument>('field.keyword')

        expect(query).toEqual({
            avg: {
                field: 'field.keyword'
            }
        })
    })
})
