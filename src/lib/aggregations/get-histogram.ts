import { Document, Key } from 'lib/common'

export type HistogramAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
    interval: number
}

export type HistogramAggregation<TDocument extends Document> = {
    histogram: HistogramAggregationBody<TDocument>
}

export const getHistogramAggregation = <TDocument extends Document>(field: Key<TDocument>, interval: number): HistogramAggregation<TDocument> => ({
    histogram: { field, interval }
})
