import { HomeDocument } from 'test/module'
import { getBoolQuery } from './get-bool'
import { getTermQuery } from './get-term'

describe('getBoolQuery', () => {
    it('accepts optional must query', () => {
        const query = getBoolQuery<HomeDocument>({
            should: getTermQuery('address.keyword', 123)
        })

        console.log(query)
    })

    test.todo('accepts optional should query')
})
