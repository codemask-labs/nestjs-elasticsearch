import { isTotalHits } from '../is-total-hits'

describe('Util / isTotalHits', () => {
    it('returns true when object contains relation and value number', () => {
        const object = {
            relation: 'any',
            value: 10,
        }

        expect(isTotalHits(object)).toBe(true)
    })

    it('returns false when object contains relation and value is string', () => {
        const object = {
            relation: 'any',
            value: 'string',
        }

        expect(isTotalHits(object)).toBe(false)
    })

    it('returns false when object contains relation and value is undefined', () => {
        const object = {
            relation: 'any',
            value: undefined,
        }

        expect(isTotalHits(object)).toBe(false)
    })

    it('returns false when object contains relation and value is null', () => {
        const object = {
            relation: 'any',
            value: null,
        }

        expect(isTotalHits(object)).toBe(false)
    })
})
