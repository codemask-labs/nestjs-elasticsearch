import { Document, NumericField } from 'lib/common'

export type HistogramAggregationBody<TDocument extends Document> = {
    field: NumericField<TDocument>
    interval: number
    min_doc_count?: number // eslint-disable-line camelcase
}

export type HistogramAggregation<TDocument extends Document> = {
    histogram: HistogramAggregationBody<TDocument>
}

export const getHistogramAggregation = <TDocument extends Document>(
    field: NumericField<TDocument>,
    interval: number,
    min_doc_count?: number // eslint-disable-line camelcase
): HistogramAggregation<TDocument> => ({
    histogram: {
        field,
        interval,
        min_doc_count // eslint-disable-line camelcase
    }
})
