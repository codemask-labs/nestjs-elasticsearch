import { Document } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { TransformedAggregations } from './types'
import { AggregateName, AggregationsAggregate } from '@elastic/elasticsearch/lib/api/types'

/**
 * Casts the raw Elasticsearch aggregations response into the typed `TransformedAggregations` shape
 * inferred from the `TAggregationsBody` passed to the search request. This provides full type safety
 * on aggregation result access without runtime transformation overhead.
 *
 * @param aggregations - The raw aggregations map from the Elasticsearch response. Defaults to an empty object.
 * @returns The same aggregations object cast to `TransformedAggregations<TDocument, TAggregationsBody>`.
 */
export const getTransformedAggregations = <TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
    aggregations: Record<AggregateName, AggregationsAggregate> = {},
): TransformedAggregations<TDocument, TAggregationsBody> => aggregations as TransformedAggregations<TDocument, TAggregationsBody>
