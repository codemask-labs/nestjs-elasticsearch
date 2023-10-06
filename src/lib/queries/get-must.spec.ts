import { HomeDocument } from 'test/module'
import { getMustQuery } from './get-must'

describe('getMustQuery', () => {
    it('accepts optional term query', () => {
        const query = getMustQuery<HomeDocument>({
            term: {}
        })

        console.log(query)
    })

    test.todo('accepts optional terms query')
})
