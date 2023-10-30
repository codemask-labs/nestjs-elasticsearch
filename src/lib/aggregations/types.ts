import { Document } from 'lib/common'
import { AvgAggregation } from './get-avg'
import { DateHistogramAggregation } from './get-date-histogram'
import { MissingValueAggregation } from './get-missing-value'
import { PercentileAggregation } from './get-percentile'
import { RangeAggregation } from './get-range'
import { SumAggregation } from './get-sum'
import { TermsAggregation } from './get-terms'
import { ValueCountAggregation } from './get-value-count'
import { CompositeAggregation } from './get-composite'
import { TopHitsAggregation } from './get-top-hits'
import { MaxAggregation } from './get-max'
import { CardinalityAggregation } from './get-cardinality'

export type AggregationList<TDocument extends Document> =
    | AvgAggregation<TDocument>
    | MaxAggregation<TDocument>
    | SumAggregation<TDocument>
    | DateHistogramAggregation<TDocument>
    | MissingValueAggregation<TDocument>
    | PercentileAggregation<TDocument>
    | RangeAggregation<TDocument>
    | TermsAggregation<TDocument>
    | ValueCountAggregation<TDocument>
    | CompositeAggregation<TDocument>
    | TopHitsAggregation<TDocument>
    | CardinalityAggregation<TDocument>

export type AggregationsContainer<TDocument extends Document> = Record<string, Aggregations<TDocument>>

export type AggregationsBody<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    [Key in keyof TAggregationsBody]: TAggregationsBody[Key]
}

export type Aggregations<TDocument extends Document> = AggregationList<TDocument> & {
    aggs?: AggregationsBody<TDocument, AggregationsContainer<TDocument>>
    aggregations?: AggregationsBody<TDocument, AggregationsContainer<TDocument>>
}

