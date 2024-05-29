import { faker } from '@faker-js/faker'
import { getMinimumShouldMatchParameter } from 'lib/parameters'
import { HomeDocument, PropertyType } from 'test/module'
import { getBoolQuery } from './get-bool'
import { getRangeQuery } from './get-range'
import { getShouldQuery } from './get-should'
import { getTermQuery } from './get-term'
import { getTermsQuery } from './get-terms'
import { getExistsQuery } from './get-exists'

describe('getBoolQuery', () => {
    it('accepts optional must query', () => {
        const id = faker.string.uuid()
        const query = getBoolQuery<HomeDocument>({
            ...getMinimumShouldMatchParameter(1),
            ...getShouldQuery([
                getTermQuery('id.keyword', id),
                getTermQuery('id', id),
                getTermsQuery('propertyType', [PropertyType.Apartment]),
                getBoolQuery({
                    must: {
                        term: { address: { value: 'test' } }
                    }
                }),
                getRangeQuery('propertyAreaSquared', {
                    gte: 500,
                    lte: 1000
                }),
                getExistsQuery('address'),
                getExistsQuery('id.keyword')
            ])
        })

        expect(query).toEqual({
            bool: {
                // eslint-disable-next-line camelcase
                minimum_should_match: 1,
                should: [
                    { term: { 'id.keyword': { value: id } } },
                    { term: { id: { value: id } } },
                    { terms: { propertyType: [PropertyType.Apartment] } },
                    {
                        bool: {
                            must: { term: { address: { value: 'test' } } }
                        }
                    },
                    {
                        range: {
                            propertyAreaSquared: { gte: 500, lte: 1000 }
                        }
                    },
                    {
                        exists: { field: 'address' }
                    },
                    {
                        exists: { field: 'id.keyword' }
                    }
                ]
            }
        })
    })
})
