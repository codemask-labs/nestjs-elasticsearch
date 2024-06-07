import { is } from 'ramda'
import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTotalHits = (object: any): object is SearchTotalHits => {
    if (is(Object, object) && is(Number, object.value)) {
        return true
    }

    return false
}
