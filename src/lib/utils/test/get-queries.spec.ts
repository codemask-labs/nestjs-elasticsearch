import { getTermQuery, getTermsQuery } from 'lib/queries'
import { getQueries } from '../get-queries'
import { HomeDocument } from 'test/module'

describe('getQueries', () => {
    it('accepts only non optional queries', () => {
        const queries = getQueries<HomeDocument>([
            getTermQuery('address.keyword', 'test'),
            getTermQuery('builtInYear.keyword', undefined),
            getTermQuery('builtInYear.keyword', null),
            getTermsQuery('city.keyword', null),
            getTermsQuery('city.keyword', undefined)
        ])

        expect(queries).toBe([])
    })
})
