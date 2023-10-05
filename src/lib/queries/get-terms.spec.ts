import { describe } from 'node:test'
import { getTermsQuery } from './get-terms'
import { ExampleCatalogDocument } from 'test/module'

describe('getTermsQuery', () => {
    it('accepts only schema fields', () => {
        const query = getTermsQuery<ExampleCatalogDocument>('field', ['one', 'two', 'three'])

        expect(query).toEqual({
            terms: {
                field: ['one', 'two', 'three']
            }
        })
    })

    it('accepts only schema field with keyword', () => {
        const query = getTermsQuery<ExampleCatalogDocument>('field.keyword', ['one', 'two', 'three'])

        expect(query).toEqual({
            terms: {
                'field.keyword': ['one', 'two', 'three']
            }
        })
    })
})
