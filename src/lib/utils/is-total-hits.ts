import { is } from 'ramda'
import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types'

/**
 * Type guard that returns `true` if the given value is a `SearchTotalHits` object
 * (i.e. `{ value: number, relation: string }`) as returned by Elasticsearch 7+
 * when `rest_total_hits_as_int` is not set. Returns `false` for plain number totals.
 *
 * @param object - The raw `total` value from an Elasticsearch `hits` metadata object.
 * @returns `true` if `object` is a `SearchTotalHits` instance, `false` otherwise.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTotalHits = (object: any): object is SearchTotalHits => {
    if (is(Object, object) && is(Number, object.value)) {
        return true
    }

    return false
}
