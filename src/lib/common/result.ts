import { estypes } from '@elastic/elasticsearch'
import { AggregationsContainer } from 'lib/aggregations'
import { TransformedAggregations } from 'lib/transformers'
import { Document } from './document'

interface HitsMetadata<TDocument> extends estypes.HitsMetadata<TDocument> {
    sort?: Array<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type Result<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    hits: HitsMetadata<TDocument>
    aggregations?: TransformedAggregations<TDocument, TAggregationsBody>
}
