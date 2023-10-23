import { estypes } from '@elastic/elasticsearch'
import { Aggregations } from 'lib/aggregations'
import { TransformedAggregations } from 'lib/transformers'
import { Document } from './document'

export type Result<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    hits: estypes.HitsMetadata<TDocument>
    aggregations?: TransformedAggregations<TDocument, TAggregationsBody>
}
