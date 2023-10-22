import { estypes } from '@elastic/elasticsearch'
import { Document } from 'lib/common'
import { isTotalHits } from 'lib/utils'

export const getTransformedTotal = <TDocument extends Document>({ total }: estypes.HitsMetadata<TDocument>): number => {
    if (isTotalHits(total)) {
        return total.value
    }

    return total
}
