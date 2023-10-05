import { describe } from 'node:test'
import { getTermQuery } from './get-term'
import { ExampleCatalogDocument } from 'test/module'

describe('getTermQuery', () => {
    it('accepts only schema fields', () => {
        const query = getTermQuery<ExampleCatalogDocument>('field', 'test')

        expect(query).toEqual({
            term: {
                field: {
                    value: 'test'
                }
            }
        })
    })

    it('accepts only schema fields with keyword', () => {
        const query = getTermQuery<ExampleCatalogDocument>('field.keyword', 'test')

        expect(query).toEqual({
            term: {
                'field.keyword': {
                    value: 'test'
                }
            }
        })
    })
})
