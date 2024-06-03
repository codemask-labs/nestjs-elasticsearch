import { Document, NumericField } from 'lib/common'

export type HistogramAggregationOptions = {
    min_doc_count?: number // eslint-disable-line camelcase
}

export type HistogramAggregationBody<TDocument extends Document> = {
    field: NumericField<TDocument>
    interval: number
}

export type HistogramAggregation<TDocument extends Document> = {
    histogram: HistogramAggregationBody<TDocument>
}

export const getHistogramAggregation = <TDocument extends Document>(
    field: NumericField<TDocument>,
    interval: number,
    options?: HistogramAggregationOptions
): HistogramAggregation<TDocument> => ({
    histogram: {
        field,
        interval,
        ...options
    }
})
