import { describe } from 'node:test'
import { ExampleDocument } from 'nestjs/examples'
import { getTermQuery } from './get-term.query'

describe('getTermQuery', () => {
    it('accepts only schema fields', () => {
        const query = getTermQuery<ExampleDocument>('field', 'test')

        expect(query).toEqual({
            term: {
                field: {
                    value: 'test'
                }
            }
        })
    })

    it('accepts only schema fields with keyword', () => {
        const query = getTermQuery<ExampleDocument>('field.keyword', 'test')

        expect(query).toEqual({
            term: {
                'field.keyword': {
                    value: 'test'
                }
            }
        })
    })
})
