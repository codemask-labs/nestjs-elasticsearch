import { HomeDocument } from 'test/module'
import { getCompositeAggregation } from './get-composite'
import { getTermsAggregation } from '.'

describe('getCompositeAggregation', () => {
    it('accepts only schema field', () => {
        const sources = [getTermsAggregation<HomeDocument>('address.keyword'), getTermsAggregation<HomeDocument>('city.keyword')]

        const query = getCompositeAggregation<HomeDocument>(sources, {
            after: {
                address: 'test address',
                city: 'test city'
            }
        })

        expect(query).toEqual({
            composite: {
                sources,
                after: {
                    address: 'test address',
                    city: 'test city'
                }
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
