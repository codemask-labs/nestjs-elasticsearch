import { estypes } from '@elastic/elasticsearch'
import { AggregationsContainer } from 'lib/aggregations'
import { TransformedAggregations } from 'lib/transformers'
import { Document } from './document'

export type Result<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    hits: estypes.HitsMetadata<TDocument>
    aggregations?: TransformedAggregations<TDocument, TAggregationsBody>
}
