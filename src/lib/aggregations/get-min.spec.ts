/* eslint-disable camelcase */
import { HomeDocument } from 'test/module'
import { getMinAggregation } from './get-min'

describe('getMinAggregation', () => {
    it('accepts only schema field', () => {
        const query = getMinAggregation<HomeDocument>('address')

        expect(query).toEqual({
            min: {
                field: 'address'
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
