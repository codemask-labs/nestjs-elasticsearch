import { describe } from 'node:test'
import { ExampleDocument } from 'nestjs/examples'
import { getTermsQuery } from './get-terms.query'

describe('getTermsQuery', () => {
    it('accepts only schema fields', () => {
        const query = getTermsQuery<ExampleDocument>('field', ['one', 'two', 'three'])

        expect(query).toEqual({
            terms: {
                field: ['one', 'two', 'three']
            }
        })
    })

    it('accepts only schema field with keyword', () => {
        const query = getTermsQuery<ExampleDocument>('field.keyword', ['one', 'two', 'three'])

        expect(query).toEqual({
            terms: {
                'field.keyword': ['one', 'two', 'three']
            }
        })
    })
})
