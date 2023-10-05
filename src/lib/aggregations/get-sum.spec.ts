import { describe } from 'node:test'
import { ExampleCatalogDocument } from 'test/module'
import { getSumAggregation } from './get-sum'

describe('getSumAggregation', () => {
    it('accepts only schema fields', () => {
        const query = getSumAggregation<ExampleCatalogDocument>('field')

        expect(query).toEqual({
            sum: {
                field: 'field'
            }
        })
    })

    it('accepts only schema fields with keyword', () => {
        const query = getSumAggregation<ExampleCatalogDocument>('field.keyword')

        expect(query).toEqual({
            sum: {
                field: 'field.keyword'
            }
        })
    })
})
