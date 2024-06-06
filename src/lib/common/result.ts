// import { estypes } from '@elastic/elasticsearch'
import { AggregationsContainer } from 'lib/aggregations'
import { TransformedAggregations } from 'lib/transformers'
import { Document } from './document'
import { SearchHitsMetadata } from '@elastic/elasticsearch/lib/api/types'

export type Result<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    hits: SearchHitsMetadata<TDocument>
    aggregations?: TransformedAggregations<TDocument, TAggregationsBody>
}
