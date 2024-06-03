import { Document, NumericField } from 'lib/common'

export type HistogramAggregationBody<TDocument extends Document> = {
    field: NumericField<TDocument>
    interval: number
    min_doc_count?: number
}

export type HistogramAggregation<TDocument extends Document> = {
    histogram: HistogramAggregationBody<TDocument>
}

export const getHistogramAggregation = <TDocument extends Document>(
    field: NumericField<TDocument>,
    interval: number,
    min_doc_count?: number
): HistogramAggregation<TDocument> => ({
    histogram: {
        field,
        interval,
        min_doc_count
    }
})
