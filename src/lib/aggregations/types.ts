import { Document } from '..'
import { AvgAggregation } from './get-avg'
import { DateHistogramAggregation } from './get-date-histogram'
import { MissingValueAggregation } from './get-missing-value'
import { PercentileAggregation } from './get-percentile'
import { RangeAggregation } from './get-range'
import { SumAggregation } from './get-sum'
import { TermsAggregation } from './get-terms'
import { ValueCountAggregation } from './get-value-count'

export type AggregationList<TDocument extends Document> =
    | AvgAggregation<TDocument>
    | DateHistogramAggregation<TDocument>
    | MissingValueAggregation<TDocument>
    | PercentileAggregation<TDocument>
    | RangeAggregation<TDocument>
    | SumAggregation<TDocument>
    | TermsAggregation<TDocument>
    | ValueCountAggregation<TDocument>

export type AggregationsBody<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    [Key in keyof TAggregationsBody]: TAggregationsBody[Key]
}

export type Aggregations<TDocument extends Document> = AggregationList<TDocument> & {
    aggs?: AggregationsBody<TDocument, Record<string, Aggregations<TDocument>>>
    aggregations?: AggregationsBody<TDocument, Record<string, Aggregations<TDocument>>>
}
