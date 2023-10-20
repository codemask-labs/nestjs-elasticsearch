import { HomeDocument } from 'test/module'
import { getTermQuery } from './get-term'

describe('getTermQuery', () => {
    it('accepts only schema fields', () => {
        const query = getTermQuery<HomeDocument>('address', 'test')

        expect(query).toEqual({
            term: {
                address: {
                    value: 'test'
                }
            }
        })
    })

    it('accepts only schema fields and case sensitive option', () => {
        const query = getTermQuery<HomeDocument>('address', 'test', {
            // eslint-disable-next-line camelcase
            case_insensitive: true
        })

        expect(query).toEqual({
            term: {
                address: {
                    value: 'test',
                    // eslint-disable-next-line camelcase
                    case_insensitive: true
                }
            }
        })
    })
})
