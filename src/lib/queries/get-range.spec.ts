import { getRangeQuery } from './get-range'

describe('getRangeQuery', () => {
    it('accepts optional term queries', () => {
        const query = getRangeQuery('propertyAreaSquared', {
            gte: 150,
            lte: 250
        })

        expect(query).toEqual({
            range: {
                propertyAreaSquared: { gte: 150, lte: 250 }
            }
        })
    })
})
