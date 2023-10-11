import { Document } from '..'
import { AvgAggregation } from './get-avg'
import { DateHistogramAggregation } from './get-date-histogram'
import { MissingValueAggregation } from './get-missing-value'
import { PercentileAggregation } from './get-percentile'
import { RangeAggregation } from './get-range'
import { SumAggregation } from './get-sum'
import { TermsAggregation } from './get-terms'
import { ValueCountAggregation } from './get-value-count'

export type AggregationsBody<TDocument extends Document> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: Aggregations<TDocument> & (
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

export type Aggregations<TDocument extends Document, TAggregationsBody extends AggregationsBody<TDocument> = AggregationsBody<TDocument>> = {
    aggregations?: TAggregationsBody
}

export const getAggregations = <TDocument extends Document, TAggregationsBody extends AggregationsBody<TDocument> = AggregationsBody<TDocument>>(
    aggregations: TAggregationsBody
): Aggregations<TDocument, TAggregationsBody> => ({
    aggregations
})
