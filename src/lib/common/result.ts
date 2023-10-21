import { estypes } from '@elastic/elasticsearch'
import { Aggregations, AggregationsBody } from 'lib/aggregations'
import { Document } from './document'

export type Result<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    hits: estypes.HitsMetadata<TDocument>
    aggregations?: AggregationsBody<TDocument, TAggregationsBody>
}
