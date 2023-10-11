import { Document } from '..'
import { AvgAggregation } from './get-avg'
import { DateHistogramAggregation } from './get-date-histogram'
import { MissingValueAggregation } from './get-missing-value'
import { PercentileAggregation } from './get-percentile'
import { RangeAggregation } from './get-range'
import { SumAggregation } from './get-sum'
import { TermsAggregation } from './get-terms'
import { ValueCountAggregation } from './get-value-count'

export type Aggregations<TDocument extends Document, TAggregationKeys extends string = string> = {
    aggs?: AggregationsBody<TDocument, TAggregationKeys>
    aggregations?: AggregationsBody<TDocument, TAggregationKeys>
}

export type AggregationsBody<TDocument extends Document, TAggregationKeys extends string> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [Key in TAggregationKeys]: Aggregations<TDocument> & (
        AvgAggregation<TDocument> |
        DateHistogramAggregation<TDocument> |
        MissingValueAggregation<TDocument> |
        PercentileAggregation<TDocument> |
        RangeAggregation<TDocument> |
        SumAggregation<TDocument> |
        TermsAggregation<TDocument> |
        ValueCountAggregation<TDocument>
    )
}

export const getAggregations = <
    TDocument extends Document,
    TAggregationKeys extends string = string
>(aggregations: AggregationsBody<TDocument, TAggregationKeys>): AggregationsBody<TDocument, TAggregationKeys> => aggregations as AggregationsBody<TDocument, TAggregationKeys>
