import { is } from 'ramda'
import { SearchHitsMetadata } from '@elastic/elasticsearch/lib/api/types'
import { Document } from 'lib/common'
import { isTotalHits } from 'lib/utils'

/**
 * Extracts the total hit count from Elasticsearch `hits` metadata as a plain number.
 * Handles both the legacy `number` format and the modern `TotalHits` object format
 * (introduced in ES 7+). Returns `0` if the total is absent or unrecognised.
 *
 * @param hits - The `hits` metadata object from the raw Elasticsearch search response.
 * @returns The total number of matching documents as a plain `number`.
 */
export const getTransformedTotal = <TDocument extends Document>({ total }: SearchHitsMetadata<TDocument>): number =>
    is(Number, total) ? total : isTotalHits(total) ? total.value : 0
