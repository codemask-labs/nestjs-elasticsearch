import { is } from 'ramda'
import { SearchHitsMetadata } from '@elastic/elasticsearch/lib/api/types'
import { Document } from 'lib/common'
import { isTotalHits } from 'lib/utils'

export const getTransformedTotal = <TDocument extends Document>({ total }: SearchHitsMetadata<TDocument>): number =>
    is(Number, total) ? total : isTotalHits(total) ? total.value : 0
