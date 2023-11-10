import { estypes } from '@elastic/elasticsearch'
import { is } from 'ramda'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTotalHits = (object: any): object is estypes.TotalHits => {
    if (is(Object, object) && is(Number, object.value)) {
        return true
    }

    return false
}
