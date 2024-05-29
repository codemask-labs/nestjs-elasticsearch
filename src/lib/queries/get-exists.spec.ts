import { HomeDocument } from 'test/module'
import { getExistsQuery } from './get-exists'

describe('getExistsQuery', () => {
    it('accepts only schema fields', () => {
        const query = getExistsQuery<HomeDocument>('address')

        expect(query).toEqual({
            exists: {
                field: 'address'
            }
        })
    })
})
