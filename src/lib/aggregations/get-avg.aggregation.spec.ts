import { describe } from 'node:test'
import { ExampleDocument } from 'nestjs/examples'
import { getAvgAggregation } from './get-avg.aggregation'

describe('getAvgAggregation', () => {
    it('accepts only schema fields', () => {
        const query = getAvgAggregation<ExampleDocument>('field')

        expect(query).toEqual({
            avg: {
                field: 'field'
            }
        })
    })

    it('accepts only schema fields with keyword', () => {
        const query = getAvgAggregation<ExampleDocument>('field.keyword')

        expect(query).toEqual({
            avg: {
                field: 'field.keyword'
            }
        })
    })
})
