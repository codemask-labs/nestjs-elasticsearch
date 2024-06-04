import { HomeDocument } from 'test/module'
import { getSumAggregation } from './get-sum'

describe('getSumAggregation', () => {
    it('accepts only schema field', () => {
        const query = getSumAggregation<HomeDocument>('address')

        expect(query).toEqual({
            sum: {
                field: 'address'
            }
        })
    })

    it('accepts script as option', () => {
        const query = getSumAggregation<HomeDocument>({
            script: 'hello'
        })

        expect(query).toEqual({
            sum: {
                script: 'hello'
            }
        })
    })
})
