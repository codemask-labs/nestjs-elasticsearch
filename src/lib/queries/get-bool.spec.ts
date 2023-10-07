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
                getTermQuery('id.keyword', id),
                getTermQuery('id', id),
                getTermsQuery('propertyType', [PropertyType.Apartment]),
                getBoolQuery({
                    must: {
                        term: { address: { value: 'test' } }
                    }
                })
            ]
        })

        expect(query).toEqual({
            bool: {
                should: [
                    { term: { 'id.keyword': { value: id } } },
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
})
