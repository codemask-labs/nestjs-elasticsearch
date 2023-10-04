import { describe } from 'node:test'
import { ExampleDocument } from 'nestjs/examples'
import { getSumAggregation } from './get-sum.aggregation'

describe('getSumAggregation', () => {
    it('accepts only schema fields', () => {
        const query = getSumAggregation<ExampleDocument>('field')

        expect(query).toEqual({
            term: {
                field: {
                    value: 'test'
                }
            }
        })
    })

    it('accepts only schema fields with keyword', () => {
        const query = getSumAggregation<ExampleDocument>('field.keyword')

        expect(query).toEqual({
            term: {
                field: {
                    value: 'test'
                }
            }
        })
    })
})
