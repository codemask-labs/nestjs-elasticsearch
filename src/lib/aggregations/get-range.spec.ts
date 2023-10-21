import { HomeDocument } from 'test/module'
import { Range } from 'lib/common'
import { getRangeAggregation } from './get-range'

describe('getRangeAggregation', () => {
    const ranges: Array<Range> = [
        {
            from: 10
        },
        {
            from: 15,
            to: 20
        },
        {
            to: 25
        }
    ]

    it('accepts only schema field', () => {
        const query = getRangeAggregation<HomeDocument>('address', ranges)

        expect(query).toEqual({
            range: {
                field: 'address',
                ranges: [{ from: 10 }, { from: 15, to: 20 }, { to: 25 }]
            }
        })
    })

    test.todo('accepts only schema field with keyword')
})
