import { faker } from '@faker-js/faker'
import { HomeDocument, PropertyType } from 'test/module'
import { getBoolQuery } from './get-bool'
import { getTermQuery } from './get-term'
import { getTermsQuery } from './get-terms'

describe('getBoolQuery', () => {
    it('accepts optional must query', () => {
        const id = faker.string.uuid()
        const query = getBoolQuery<HomeDocument>({
            should: [
                getTermQuery('id', id),
                getTermsQuery('propertyType', [PropertyType.Apartment]),
                getBoolQuery<HomeDocument>({
                //          ^
                // note: weird bug when Generic Type is not being passed
                    must: {
                        term: { address: { value: 'test' } }
                    }
                })
            ]
        })

        expect(query).toEqual({
            bool: {
                should: [
                    { term: { id: { value: id } } },
                    { terms: { propertyType: [PropertyType.Apartment] } },
                    {
                        bool: {
                            must: { term: { address: { value: 'test' } } }
                        }
                    }
                ]
            }
        })
    })

    test.todo('accepts optional should query')
})
