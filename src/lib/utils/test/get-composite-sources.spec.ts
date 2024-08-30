import { HomeDocument } from 'test/module'
import { getTermsAggregation } from 'lib/aggregations'
import { getCompositeSources } from '../get-composite-sources'

describe('getCompositeSources', () => {
    it('returns composite sources', () => {
        const sources = getCompositeSources<HomeDocument>([{ city: getTermsAggregation('city') }, { address: getTermsAggregation('address') }])

        expect(sources).toEqual([
            {
                city: { terms: { field: 'city' } }
            },
            {
                address: { terms: { field: 'address' } }
            }
        ])
    })
})
