/* eslint-disable camelcase */
import { HomeDocument } from 'test/module'
import { getMaxAggregation } from './get-max'

describe('getMaxAggregation', () => {
    it('accepts only schema field', () => {
        const query = getMaxAggregation<HomeDocument>('address')

        expect(query).toEqual({
            max: {
                field: 'address'
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
